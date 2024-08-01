import json
import random


level_to_series = {
    'beginner': 2,
    'intermediate': 3,
    'advanced': 4
}

type_to_reps = {
    'hyper': "Até a falha",
    'resistance': "12 a 20+",
    'strength': '1 até 6',
}

rest_between_series = {
    "hyper": "30s-90s",
    "resistance": "30s-60s",
    "strength": "2m-5m"
}

# Open the JSON file
with open('db.json', 'r') as f:
    db = json.load(f)
    
def filter_by(list, key, value):
    result = []
    for exercise in list['exercises']:
       if exercise[key] == value:
           result.append(exercise)
    return result
 
def build(muscle_groups, type, level):
    result = {}
    num_series = level_to_series[level]
    num_reps = type_to_reps[type]
    rest_time = rest_between_series[type]
    
    for group in muscle_groups:
        exercise_list = filter_by(db,'muscular_group', group)
        if exercise_list:
                result[group] = {
                    "exercises": random.sample(exercise_list, max(2, num_series)),
                    "reps": num_reps,
                    "series": num_series,
                    "rest": rest_time
                }
    
    return result
