import json
from ..config import LLM_PROVIDER, GROQ_API_KEY, OPENAI_API_KEY, LLM_MODEL
from .tools import get_tool_definitions, execute_tool
from ..session import append_history

system_prompt_template = """You are SBI Sahaayak, a multilingual agentic AI assistant for State Bank of India.
Your role is to help customers onboard to SBI digital banking and adopt digital services.

Rules:
- Always respond in the user's selected language: {language}
- Be concise, friendly, and specific to Indian banking
- Use the available tools to progress the conversation
- Ask qualifying questions one at a time
- Guide the user step by step through onboarding
- Suggest digital adoption (YONO, UPI) after onboarding

Available tools and when to use them:
- set_language: When user specifies a language preference
- capture_intent: When user states what they want to do
- collect_profile: When you need user details to recommend products
- recommend_product: When you have enough profile info to recommend
- check_kyc_requirements: After recommendation, to show KYC needs
- start_onboarding: When user is ready to begin onboarding
- suggest_digital_action: After onboarding, to suggest digital adoption
- respond_in_language: To respond to the user in their language
"""


def agent_respond(session: dict, user_message: str) -> str:
    language = session.get("language", "en")
    append_history(session["session_id"], "user", user_message)

    system_prompt = system_prompt_template.format(language=language)

    messages = [
        {"role": "system", "content": system_prompt},
        *session.get("history", []),
    ]

    tools = get_tool_definitions()

    if LLM_PROVIDER == "groq" and GROQ_API_KEY:
        from groq import Groq
        client = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model=LLM_MODEL,
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )
        msg = response.choices[0].message

        if msg.tool_calls:
            for tool_call in msg.tool_calls:
                tool_name = tool_call.function.name
                tool_args = json.loads(tool_call.function.arguments)
                result = execute_tool(tool_name, tool_args, session)
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": result,
                })
                append_history(session["session_id"], "assistant", f"[Tool: {tool_name}] {result}")

            final_response = client.chat.completions.create(
                model=LLM_MODEL,
                messages=messages,
            )
            return final_response.choices[0].message.content
        return msg.content

    elif LLM_PROVIDER == "openai" and OPENAI_API_KEY:
        from openai import OpenAI
        client = OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model=LLM_MODEL,
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )
        msg = response.choices[0].message

        if msg.tool_calls:
            for tool_call in msg.tool_calls:
                tool_name = tool_call.function.name
                tool_args = json.loads(tool_call.function.arguments)
                result = execute_tool(tool_name, tool_args, session)
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": result,
                })
                append_history(session["session_id"], "assistant", f"[Tool: {tool_name}] {result}")

            final_response = client.chat.completions.create(
                model=LLM_MODEL,
                messages=messages,
            )
            return final_response.choices[0].message.content
        return msg.content

    else:
        return _fallback_respond(session, user_message)


def _fallback_respond(session: dict, user_message: str) -> str:
    from ..recommender.rules import recommend
    from ..i18n.translations import t

    language = session.get("language", "en")
    step = session.get("step", "welcome")

    if step == "welcome":
        session["step"] = "intent"
        return t("welcome", language)

    if step == "intent":
        session["step"] = "profile"
        session["intent"] = "open_account"
        return t("ask_age", language)

    if step == "profile":
        profile = session.get("profile", {})
        if "age_band" not in profile:
            session["profile"]["age_band"] = "25_45"
            return t("ask_profession", language)
        if "profession" not in profile:
            session["profile"]["profession"] = "salaried"
            return t("ask_area", language)
        if "area" not in profile:
            session["profile"]["area"] = "urban"
            product = recommend(session["profile"])
            session["step"] = "recommendation"
            return t("product_recommendation", language).format(product=product.get("name", ""))

    if step == "recommendation":
        session["step"] = "kyc"
        return t("kyc_info", language)

    if step == "kyc":
        session["step"] = "onboarding"
        return t("onboarding_ready", language)

    if step == "onboarding":
        session["step"] = "digital_adoption"
        return t("digital_adoption", language)

    if step == "digital_adoption":
        return t("completion", language)

    return t("fallback", language)
