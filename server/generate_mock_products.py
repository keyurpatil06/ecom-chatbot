import json
import random
from faker import Faker

fake = Faker()

CATEGORIES = ['Electronics', 'Books', 'Textiles', 'Home', 'Toys']

BRANDS = [
    "Logitech", "Samsung", "Nike", "Sony", "Apple", "Asus", "Dell",
    "HP", "Adidas", "Xiaomi", "Canon", "Reebok", "Lenovo", "Philips"
]

PRODUCT_TYPES = {
    "Electronics": ["Wireless Mouse", "Bluetooth Speaker", "Smartphone", "Tablet", "Laptop", "Headphones"],
    "Books": ["Python Programming Guide", "Mystery Novel", "Self-Help Book", "Cookbook", "Historical Biography"],
    "Textiles": ["Cotton T-Shirt", "Denim Jeans", "Silk Scarf", "Wool Sweater", "Running Shorts"],
    "Home": ["LED Lamp", "Ceramic Vase", "Blender", "Microwave Oven", "Wall Clock"],
    "Toys": ["RC Car", "Building Blocks", "Doll Set", "Puzzle Game", "Stuffed Animal"]
}

MODIFIERS = ["Pro", "Max", "X", "Lite", "Advance", "Series 5", "Edition 2025"]

def generate_products(n=100):
    products = []
    for i in range(1, n + 1):
        category = random.choice(CATEGORIES)
        brand = random.choice(BRANDS)
        product_type = random.choice(PRODUCT_TYPES[category])
        modifier = random.choice(MODIFIERS)

        product = {
            "id": i,
            "name": f"{brand} {product_type} {modifier}",
            "category": category,
            "price": round(random.uniform(10, 500), 2),
            "description": fake.sentence()
        }
        products.append(product)
    return products

if __name__ == "__main__":
    with open("app/data/products.json", "w") as f:
        json.dump(generate_products(100), f, indent=2)
    print("✅ products.json with 100 realistic e-commerce items generated.")
