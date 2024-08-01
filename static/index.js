const fs = require('fs');

// Mapas de configuração
const levelToSeries = {
    'beginner': 2,
    'intermediate': 3,
    'advanced': 4
};

const typeToReps = {
    'hyper': "Até a falha",
    'resistance': "12 a 20+",
    'strength': '1 até 6',
};

const restBetweenSeries = {
    "hyper": "30s-90s",
    "resistance": "30s-60s",
    "strength": "2m-5m"
};

// Ler o arquivo JSON
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

async function submitForm(event) {
    event.preventDefault();
    const muscleGroups = Array.from(document.querySelectorAll('input[name="muscular-group"]:checked')).map(cb => cb.value);
    const type = document.getElementById('workout-type').value;
    const level = document.getElementById('difficulty').value;

    const response = await fetch('/select_workout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ muscle_groups: muscleGroups, type: type, level: level }),
    });

    const result = await response.json();
    if (result) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        for (const [group, details] of Object.entries(result)) {
            const groupDiv = document.createElement('div');
            const groupTitle = document.createElement('h2');
            groupTitle.textContent = group.charAt(0).toUpperCase() + group.slice(1);
            groupDiv.appendChild(groupTitle);

            // Criar a tabela
            const table = document.createElement('table');
            table.style.borderCollapse = 'collapse';
            table.style.width = '100%';

            // Adicionar o cabeçalho da tabela
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const headers = ['Exercício', 'Séries', 'Repetições', 'Descanso', "Dificuldade", "Risco de Lesão", "Como Fazer"];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Adicionar o corpo da tabela
            const tbody = document.createElement('tbody');

            details.exercises.forEach(exercise => {
                const row = document.createElement('tr');

                row.appendChild(Object.assign(document.createElement('td'), { textContent: exercise.name }));
                row.appendChild(Object.assign(document.createElement('td'), { textContent: details.reps }));
                row.appendChild(Object.assign(document.createElement('td'), { textContent: details.series }));
                row.appendChild(Object.assign(document.createElement('td'), { textContent: details.rest }));
                row.appendChild(Object.assign(document.createElement('td'), { textContent: exercise.difficulty }));
                row.appendChild(Object.assign(document.createElement('td'), { textContent: exercise.risk_of_injury }));
                const videoLink = document.createElement('a');
                videoLink.href = exercise.video_link;
                videoLink.textContent = 'Assistir Vídeo'; // Texto para o link

                const videoCell = document.createElement('td');
                videoCell.appendChild(videoLink);

                row.appendChild(videoCell);
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            groupDiv.appendChild(table);
            resultDiv.appendChild(groupDiv);
        }
    }
}

function filterBy(list, key, value) {
    return list['exercises'].filter(exercise => exercise[key] === value);
}

function build(muscleGroups, type, level) {
    const result = {};
    const numSeries = levelToSeries[level];
    const numReps = typeToReps[type];
    const restTime = restBetweenSeries[type];
    
    muscleGroups.forEach(group => {
        const exerciseList = filterBy(db, 'muscular_group', group);
        if (exerciseList.length > 0) {
            result[group] = {
                "exercises": getRandomElements(exerciseList, Math.max(2, numSeries)),
                "reps": numReps,
                "series": numSeries,
                "rest": restTime
            };
        }
    });
    
    return result;
}

function getRandomElements(arr, count) {
    const shuffled = arr.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[rand]] = [shuffled[rand], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
