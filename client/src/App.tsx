import { useState, useEffect, useRef } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
};

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! Ask me about products." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Call backend to search products
  async function searchProducts(query: string) {
    if (!query.trim()) return;

    setMessages((msgs) => [...msgs, { from: "user", text: query }]);
    setInput("");

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/products?search=${encodeURIComponent(query)}`
      );
      const products: Product[] = await res.json();

      if (products.length === 0) {
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: "No products found for that query." },
        ]);
      } else {
        const productList = products
          .map(
            (p) =>
              `${p.name} (${p.category}) - $${p.price}\n${p.description}`
          )
          .join("\n\n");

        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: `Found ${products.length} products:\n\n${productList}` },
        ]);
      }
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Error fetching products. Please try again." },
      ]);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(input);
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 flex flex-col bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center select-none">
        🛍️ E-commerce Chatbot
      </h1>

      <div
        className="flex-grow overflow-y-auto border border-gray-300 p-4 rounded-lg bg-white shadow-inner mb-4 space-y-3"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm shadow-md max-w-[75%] break-words ${msg.from === "user"
              ? "bg-blue-500 text-white self-end ml-auto animate-slide-in-right"
              : "bg-gray-100 text-gray-800 self-start mr-auto animate-slide-in-left"
              }`}
          >
            {msg.from === "bot" && msg.text.includes("Found") ? (
              <div className="space-y-2">
                <p className="font-semibold text-lg text-gray-800">
                  {msg.text.split("\n\n")[0]}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
                  {msg.text
                    .split("\n\n")
                    .slice(1)
                    .map((productBlock, idx) => {
                      const lines = productBlock.split("\n").map(line => line.trim());
                      const name = lines[0] || "Unnamed";
                      const category = lines.find(l => l.toLowerCase().startsWith("category:"))?.split(":")[1]?.trim();
                      const description = lines.find(l => l.toLowerCase().startsWith("description:"))?.split(":")[1]?.trim();
                      const price = lines.find(l => l.toLowerCase().startsWith("price:"))?.split(":")[1]?.trim();

                      return (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-1 hover:shadow-md transition"
                        >
                          <p className="font-semibold text-gray-900">{name}</p>
                          {description && <p className="text-sm text-gray-700">{description}</p>}
                          {category && <p className="text-xs text-blue-600">{category}</p>}
                          {price && <p className="text-sm font-bold text-green-700">₹{price}</p>}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask me about a product..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
          disabled={!input.trim()}
        >
          🚀 Send
        </button>
      </form>
    </div>
  );
}
