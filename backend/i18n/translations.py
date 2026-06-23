import json
import os

_translations: dict[str, dict[str, str]] = {}

_dir = os.path.dirname(os.path.abspath(__file__))
for fname in os.listdir(_dir):
    if fname.endswith(".json"):
        lang = fname.replace(".json", "")
        with open(os.path.join(_dir, fname), encoding="utf-8") as f:
            _translations[lang] = json.load(f)


def t(key: str, language: str = "en") -> str:
    lang_data = _translations.get(language, _translations.get("en", {}))
    return lang_data.get(key, _translations.get("en", {}).get(key, key))
