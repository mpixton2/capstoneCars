from flask import Flask, request, jsonify
# from flask_cors import CORS, cross_origin
import pandas as pd
import json
import pickle
import numpy as np

# Load the model from disk
model = None
enc = None
with open('../data/trained_model.pkl', 'rb') as file:
    model = pickle.load(file)
with open('../data/encoder.pkl', 'rb') as file:
    enc = pickle.load(file)

# Instantiate Flask application
app = Flask(__name__)
# cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return jsonify({})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        df = pd.DataFrame(data, index=[0])

        feature_cols = ['car_year', 'car_used', 'car_mm', 'car_color']
        X = df[feature_cols]

        data_trans = enc.transform(X)
        nn_results = model.kneighbors(data_trans, n_neighbors=3)[1]

        return jsonify(nn_results.tolist())

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)