from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Hardcoded VAS requirements data (no database needed)
VAS_REQUIREMENTS = [
    {"id": 1, "requirement_text": "Hang in closed presentation using tucking standard", "step_order": 1},
    {"id": 2, "requirement_text": "Apply appropriate black GS1 standard hanger", "step_order": 2},
    {"id": 3, "requirement_text": "Ensure no material hangs over end of hanger", "step_order": 3},
    {"id": 4, "requirement_text": "Verify side seams remain centered", "step_order": 4}
]

@app.route('/api/skus/1/vas-requirements', methods=['GET'])
def get_vas_requirements():
    """Get VAS requirements for SKU 1 (Athletic Bottoms)"""
    return jsonify(VAS_REQUIREMENTS)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 