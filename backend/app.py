from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

VAS_REQUIREMENTS = [
    {"id": 1, "requirement_text": "Hang in closed presentation using tucking standard", "step_order": 1},
    {"id": 2, "requirement_text": "Apply appropriate black GS1 standard hanger", "step_order": 2},
    {"id": 3, "requirement_text": "Ensure no material hangs over end of hanger", "step_order": 3},
    {"id": 4, "requirement_text": "Verify side seams remain centered", "step_order": 4}
]

@app.route('/api/skus/1/vas-requirements', methods=['GET'])
def get_vas_requirements():
    return jsonify(VAS_REQUIREMENTS)

@app.route('/api/stores', methods=['GET'])
def get_stores():
    return jsonify([{"id": 1, "name": "Dick's Sporting Goods"}])

@app.route('/api/stores/<int:store_id>', methods=['GET'])
def get_store(store_id):
    return jsonify({"id": store_id, "name": "Dick's Sporting Goods"})

@app.route('/api/stores/<int:store_id>/skus', methods=['GET'])
def get_store_skus(store_id):
    return jsonify([{"id": 1, "name": "Athletic Bottoms - Size M", "store_id": store_id}])

@app.route('/api/skus/<int:sku_id>/vas-requirements/complete', methods=['POST'])
def complete_vas_requirements(sku_id):
    return jsonify({"message": "VAS requirements completed", "sku_id": sku_id})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 