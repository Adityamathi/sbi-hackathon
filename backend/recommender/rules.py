PRODUCTS = {
    "digital_savings": {
        "name": "Digital Savings Account",
        "name_hi": "डिजिटल बचत खाता",
        "name_ta": "டிஜிட்டல் சேமிப்பு கணக்கு",
        "description": "Zero-balance digital savings account with YONO integration",
        "kyc": ["Aadhaar", "PAN", "Selfie"],
        "onboarding_steps": ["Verify Aadhaar", "Submit PAN", "Take selfie", "Set MPIN", "Activate YONO"],
    },
    "savings_plus": {
        "name": "SBI Savings Plus Account",
        "name_hi": "SBI सेविंग्स प्लस खाता",
        "name_ta": "SBI சேமிப்பு பிளஸ் கணக்கு",
        "description": "Full-featured savings account with UPI, investment access",
        "kyc": ["Aadhaar", "PAN", "Photo", "Address Proof", "Signature"],
        "onboarding_steps": ["Fill form", "Submit KYC", "Deposit initial amount", "Activate net banking", "Set up UPI"],
    },
    "basic_savings": {
        "name": "Basic Savings Bank Deposit Account",
        "name_hi": "बेसिक बचत बैंक जमा खाता",
        "name_ta": "அடிப்படை சேமிப்பு வங்கி வைப்பு கணக்கு",
        "description": "No-frills savings account with government scheme access",
        "kyc": ["Aadhaar", "Photo"],
        "onboarding_steps": ["Verify Aadhaar", "Submit photo", "Link PM scheme", "Activate SMS banking"],
    },
    "branch_assisted": {
        "name": "Branch-Assisted Digital Account",
        "name_hi": "शाखा-सहायक डिजिटल खाता",
        "name_ta": "கிளை உதவி டிஜிட்டல் கணக்கு",
        "description": "Branch-facilitated account with simple YONO setup guidance",
        "kyc": ["Aadhaar", "PAN", "Photo", "Address Proof"],
        "onboarding_steps": ["Visit branch", "Fill form", "Submit KYC", "Get welcome kit", "Book YONO setup appointment"],
    },
}


def recommend(profile: dict) -> dict:
    age_band = profile.get("age_band", "25_45")
    profession = profile.get("profession", "salaried")
    area = profile.get("area", "urban")

    if age_band == "under_25" and profession == "student":
        return PRODUCTS["digital_savings"]
    elif age_band == "25_45" and profession == "salaried" and area == "urban":
        return PRODUCTS["savings_plus"]
    elif area == "rural" or profession == "farmer":
        return PRODUCTS["basic_savings"]
    elif age_band == "45_plus":
        return PRODUCTS["branch_assisted"]
    else:
        return PRODUCTS["savings_plus"]


ALL_PRODUCTS = PRODUCTS
