
from flask import Flask, render_template, request, jsonify
import random
import json

from engine import build

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/select_workout', methods=['POST'])
def select_workout():
    data = request.json
    muscle_groups = data.get('muscle_groups')
    type = data.get('type')
    level = data.get('level')
    
    workout_plan = build(muscle_groups, type, level)
    return jsonify(workout_plan)

if __name__ == '__main__':
    app.run(debug=True)