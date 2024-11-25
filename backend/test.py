from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import cv2
import numpy as np
# import tensorflow as tf
# from tensorflow.keras.models import load_model
import os
import base64, ssl, json
import binascii


app = Flask(__name__)

def ascii_to_hex(f):
    print(str(f)[:100])
    return binascii.hexlify(bytes(str(f),'ascii')) #utf-8

@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload():
    data=json.loads(request.data)
    decoded_video_data = base64.b64decode(data["video"])
    decoded_video_data = ascii_to_hex(decoded_video_data)
    print(decoded_video_data[:100])
    return "su"


# SSL=ssl.SSLContext(ssl.PROTOCOL_TLS)
# SSL.load_cert_chain(certfile='cert.pem', keyfile='key.pem')
CORS(app, resources={r"*": {"origins": "*"}})
# app.run(host='0.0.0.0', port=4000, ssl_context=SSL, debug=True)
app.run(host='0.0.0.0', port=5000, debug=True)