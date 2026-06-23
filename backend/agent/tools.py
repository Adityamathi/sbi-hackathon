from typing import Any


def get_tool_definitions():
    return _TOOL_DEFINITIONS


_TOOL_DEFINITIONS = [
    {
        "name": "set_language",
        "description": "Set the user's preferred language",
        "parameters": {
            "type": "object",
            "properties": {
                "language": {
                    "type": "string",
                    "enum": ["en", "hi", "ta"],
                    "description": "Language code",
                }
            },
            "required": ["language"],
        },
    },
    {
        "name": "capture_intent",
        "description": "Capture what the user wants to do",
        "parameters": {
            "type": "object",
            "properties": {
                "intent": {
                    "type": "string",
                    "enum": ["open_account", "explore_products", "start_digital_banking"],
                    "description": "User intent",
                }
            },
            "required": ["intent"],
        },
    },
    {
        "name": "collect_profile",
        "description": "Collect user profile information for qualification",
        "parameters": {
            "type": "object",
            "properties": {
                "age_band": {
                    "type": "string",
                    "enum": ["under_25", "25_45", "45_plus"],
                    "description": "User age band",
                },
                "profession": {
                    "type": "string",
                    "enum": ["student", "salaried", "self_employed", "farmer", "retired", "other"],
                    "description": "User profession",
                },
                "area": {
                    "type": "string",
                    "enum": ["urban", "rural", "semi_urban"],
                    "description": "User area type",
                },
            },
            "required": ["age_band", "profession", "area"],
        },
    },
    {
        "name": "recommend_product",
        "description": "Recommend a suitable SBI product based on profile",
        "parameters": {
            "type": "object",
            "properties": {
                "product_id": {
                    "type": "string",
                    "description": "Recommended product identifier",
                }
            },
            "required": ["product_id"],
        },
    },
    {
        "name": "check_kyc_requirements",
        "description": "Show KYC requirements for the selected product",
        "parameters": {
            "type": "object",
            "properties": {
                "product_id": {"type": "string", "description": "Product identifier"},
            },
            "required": ["product_id"],
        },
    },
    {
        "name": "start_onboarding",
        "description": "Begin the onboarding process",
        "parameters": {
            "type": "object",
            "properties": {
                "step": {
                    "type": "string",
                    "description": "Current onboarding step",
                }
            },
            "required": ["step"],
        },
    },
    {
        "name": "suggest_digital_action",
        "description": "Suggest a digital banking action",
        "parameters": {
            "type": "object",
            "properties": {
                "action": {
                    "type": "string",
                    "enum": ["yono", "upi", "bill_pay", "balance_check"],
                    "description": "Digital action to suggest",
                }
            },
            "required": ["action"],
        },
    },
    {
        "name": "respond_in_language",
        "description": "Respond to the user in their selected language",
        "parameters": {
            "type": "object",
            "properties": {
                "message": {"type": "string", "description": "Message to respond with"},
            },
            "required": ["message"],
        },
    },
]


def execute_tool(tool_name: str, args: dict, session: dict) -> str:
    if tool_name == "set_language":
        session["language"] = args["language"]
        return f"Language set to {args['language']}"
    elif tool_name == "capture_intent":
        session["intent"] = args["intent"]
        return f"Intent captured: {args['intent']}"
    elif tool_name == "collect_profile":
        session["profile"].update(args)
        return f"Profile updated: {args}"
    elif tool_name == "recommend_product":
        session["step"] = "recommendation"
        return f"Recommended product: {args['product_id']}"
    elif tool_name == "check_kyc_requirements":
        session["step"] = "kyc"
        return f"KYC requirements for {args.get('product_id', 'selected product')}"
    elif tool_name == "start_onboarding":
        session["step"] = "onboarding"
        return f"Onboarding started at step: {args.get('step', 'begin')}"
    elif tool_name == "suggest_digital_action":
        session["step"] = "digital_adoption"
        return f"Suggested digital action: {args['action']}"
    elif tool_name == "respond_in_language":
        return args.get("message", "")
    return f"Unknown tool: {tool_name}"
