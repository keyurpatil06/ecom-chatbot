# 🛍️ E-commerce Sales Chatbot

A chatbot system built for e-commerce platforms to assist users in searching, exploring, and interacting with product data through a conversational interface. This system includes a modern React-based frontend and a Flask-based RESTful backend simulating a product inventory system.

---

## 📌 Project Summary

This project demonstrates a chatbot-driven e-commerce interface that:

- Provides product search via a chat interface.
- Uses a mock backend server to simulate inventory data.
- Follows modular, scalable architecture and clean code practices.
- Offers full responsiveness across devices.

---

## ⚙️ Project Setup

### Clone the Repository

```bash
git clone https://github.com/keyurpatil06/ecom-chatbot
cd ecom-chatbot

cd client (terminal 1)
npm install
npm run dev

cd server (terminal 2)
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```

**Frontend:** React, Vite, TypeScript, TailwindCSS, React Hooks for state management

**Backend:** Flask (Python), mock JSON-based inventory, Faker for data generation