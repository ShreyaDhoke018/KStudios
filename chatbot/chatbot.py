from flask import Flask, request, jsonify
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   #For working with frontend eg. React

# ===== Intent patterns =====
INTENTS = {
    # Intent and key words
    "greet": [r"\bhi\b", r"\bhello\b", r"\bhey\b"],
    "Rohan": [r"\bRohan\b"],
    "Shakti": [r"\bShakti\b"],
    "about": [r"\babout\b", r"\bservices?\b", r"\binformation\b"],
    "rent": [r"\brent\b", r"\bbook\b", r"\bstudio\b"],
    "class info": [r"\bclasses?\b", r"\bclass info\b"],
    "kathak": [r"\bkathak\b", r"\bkathak info\b", r"\bkathak schedule\b"],
    "tabla": [r"\btabla\b", r"\btabla info\b"],
    "karaoke": [r"\bkaraoke\b", r"\bkaraoke info\b"],
    "fees": [r"\bfees?\b", r"\bprice\b", r"\bcost\b"],
    "schedule": [r"\bschedule\b", r"\btiming\b", r"\btime\b", r"\btimings\b"],
    "ok": [r"\bok\b", r"\bthank you\b", r"\bthanks\b", r"\bthanks for helping\b", r"\bthanks for the help\b", r"\bthank you for helping\b", r"\bokay\b"],
    "no":[r"\bno\b"],
    "yes":[r"\byes\b"],
    "bye": [r"\bbye\b", r"\bgoodbye\b", r"\bsee you\b"],
    
}

# ===== Responses =====
RESPONSES = {
    # Intent and their responses
    "greet": "👋 Hello! Welcome to KStudios.Choose any one assistant for your help:\n1.Rohan\n2.Shakti.",
    "Rohan": "👋 Hello! Welcome to KStudios, I am Rohan 👨. I’m here to guide you through classes, fees, and schedules. How can I assist you today?",
    "Shakti": "👋 Hello! Welcome to KStudios, I am Shakti 👩. I’d love to help you with classes, fees, and schedules. What would you like to know?",
    "about": "🏫 KStudios offers Kathak, Tabla, and Karaoke classes, as well as studio rentals for practice or events.",
    "rent": "💵 Studio rent is ₹1500/hour. Would you like to proceed with booking?",
    "class info": "🎶 We offer the following classes:\n1. Kathak\n2. Tabla\n3. Karaoke\nWhich one are you interested in?",
    "kathak": "💃 Kathak Classes:\n- Days: Tuesday & Friday\n- Timings: 6–7 PM (Special Kids Batch), 7–8 PM (1st Year)\nDo you want to know fees or schedule?",
    "tabla": "🥁 Tabla Classes:\n- Days: Monday & Thursday\n- Timings: 5–6 PM\nDo you want to know fees or schedule?",
    "karaoke": "🎤 Karaoke sessions available on weekends.\n- Charges: ₹800/hour\nDo you want to know fees or schedule?",
    "fees": {
        "fees":"💰 All classes have different fees, please mention the classes!",
        "kathak": "💰 Kathak fees start from ₹1200/month.\nVisit: https://www.kashikathakkendra.com/",
        "tabla": "💰 Tabla fees start from ₹1000/month.",
        "karaoke": "💰 Karaoke fees start from ₹500/hour."
    },
    "schedule": {
        "kathak": "📅 Kathak schedule: Tuesday & Friday, 6–7 PM (Kids), 7–8 PM (1st Year)",
        "tabla": "📅 Tabla schedule: Monday & Thursday, 5–6 PM",
        "karaoke": "📅 Karaoke schedule: Weekends, timings flexible"
    },
    "bye": "👋 Goodbye! Hope to see you soon at KStudios.",
    "ok": "👍 Ok! Is there anything else I can help you with?",
    "no": "👋 Ok, Thank you. Goodbye! Hope to see you soon at KStudios",
    "yes": "🤔 What else can I help you with?",
    "fallback": "🤔 Sorry, I didn't understand that. Could you please rephrase?",
}

# ===== Conversation state =====
user_states = {}  # user_id -> {current_class: None}

def detect_intent(message):
    for intent, patterns in INTENTS.items():
        for p in patterns:
            if re.search(p, message, re.IGNORECASE):
                return intent
    return None

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_id = data.get("user_id", "default")
    message = data.get("message", "").strip()

    state = user_states.get(user_id, {"current_class": None, "selected_assistant": None})
    new_intent = detect_intent(message)

    # Example: assistant selection
    if new_intent in ["Rohan", "Shakti"]:
        state["selected_assistant"] = new_intent
        user_states[user_id] = state
        return jsonify({"reply": RESPONSES[new_intent], "sender": new_intent, "options":["Fees", "Classes", "Schedule"]})

    # Bye based on assistant
    if new_intent == "bye":
        selected_assistant = state.get("selected_assistant")
        state["current_class"] = None
        user_states[user_id] = state
        if selected_assistant == "Rohan":
            return jsonify({"reply": "👋 Goodbye from Rohan! Hope to see you soon at KStudios.", "sender": "Rohan"})
        elif selected_assistant == "Shakti":
            return jsonify({"reply": "👋 Bye! Shakti here, hope to see you soon at KStudios.", "sender": "Shakti"})
        else:
            return jsonify({"reply": RESPONSES["bye"], "sender": "bot"})

    # Fallback with assistant awareness
    if new_intent is None:
        selected_assistant = state.get("selected_assistant")
        if selected_assistant == "Rohan":
            return jsonify({"reply": "🤔 Rohan didn’t understand that. Could you please rephrase?", "sender": "Rohan"})
        elif selected_assistant == "Shakti":
            return jsonify({"reply": "🤔 Shakti didn’t understand that. Could you please rephrase?", "sender": "Shakti"})
        else:
            return jsonify({"reply": RESPONSES["fallback"], "sender": "bot"})


    
    # Handle greeting, about, rent, bye
    if new_intent in ["greet", "about", "rent", "ok","no"]:
        if new_intent == "bye":
            state["current_class"] = None
            user_states[user_id] = state

        return jsonify({"reply": RESPONSES[new_intent]})

    # Handle class info request
    if new_intent == "class info":
        state["current_class"] = None  # reset previous class
        user_states[user_id] = state
        return jsonify({"reply": RESPONSES["class info"], "options":["Kathak", "Tabla", "Karaoke"]})

    # Handle class selection
    if new_intent in ["kathak", "tabla", "karaoke"]:
        state["current_class"] = new_intent
        user_states[user_id] = state
        return jsonify({"reply": RESPONSES[new_intent] + "\nYou can now ask about fees or schedule.", "options":["Fees", "Schedule"]})

    # Handle fees or schedule based on selected class
    if new_intent in ["fees", "schedule"]:
        selected_class = state.get("current_class")
        if selected_class:
            return jsonify({"reply": RESPONSES[new_intent][selected_class]})
        else:
            return jsonify({"reply": "Please specify which class you want the fees or schedule for (Kathak, Tabla, Karaoke).", "options":["Kathak", "Tabla", "Karaoke"]})

    # Default fallback
    return jsonify({"reply": RESPONSES["fallback"]})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
