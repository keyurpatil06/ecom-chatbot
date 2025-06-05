from flask import Blueprint, request, jsonify
import json
import os

products_bp = Blueprint('products', __name__)
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'products.json')

def load_products():
    with open(DATA_PATH, 'r') as file:
        return json.load(file)

@products_bp.route('/products', methods=['GET'])
def search_products():
    query = request.args.get('search', '').lower()
    products = load_products()
    results = [p for p in products if query in p['name'].lower()]
    return jsonify(results)
