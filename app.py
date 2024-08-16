
from flask import Flask, render_template, request, jsonify
import random
import json

from engine import build

app = Flask(__name__)

@app.route('/')
@app.route('/training')
def training():
    return render_template('training.html', active_tab='training')

@app.route('/calculator')
def calculator():
    return render_template('calculator.html', active_tab='calculator')

@app.route('/diet')
def diet():
    return render_template('diet.html', active_tab='diet')


@app.route('/select_workout', methods=['POST'])
def select_workout():
    data = request.json
    muscle_groups = data.get('muscle_groups')
    type = data.get('type')
    level = data.get('level')
    
    workout_plan = build(muscle_groups, type, level)
    return jsonify(workout_plan)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, Debug=False)