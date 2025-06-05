from flask import Blueprint, request, jsonify
from datetime import datetime

chat_bp = Blueprint('chat', __name__)

# For demonstration purposes, this route mocks chatbot logic
@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    timestamp = datetime.now().isoformat()

    if 'cheap' in message:
        reply = "You can search for low-priced items using keywords like 'budget' or 'discount'."
    elif 'hello' in message.lower():
        reply = "Hi! How can I help you today?"
    else:
        reply = "I'm not sure I understand. Please try searching for a product."

    return jsonify({'reply': reply, 'timestamp': timestamp})
