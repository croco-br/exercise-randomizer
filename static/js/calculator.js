

document.querySelector('input[value="cunningham"]').addEventListener('change', function () {
    var leanMassGroup = document.getElementById('lean-mass-group');
    if (this.checked) {
        leanMassGroup.style.display = 'block';
    } else {
        leanMassGroup.style.display = 'none';
    }
});

function calcularCalorias(event) {
    event.preventDefault();
    const methods = Array.from(document.querySelectorAll('input[name="method"]:checked')).map(el => el.value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const leanMass = parseFloat(document.getElementById('lean-mass').value);

    let results = {};

    if (methods.includes('harris-benedict')) {
        let bmr;
        if (gender === 'male') {
            results['Harris-Benedict'] = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            results['Harris-Benedict'] = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    }

    if (methods.includes('mifflin-st-jeor')) {
        if (gender === 'male') {
            results['Mifflin-St Jeor'] = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        }
        else {
            results['Mifflin-St Jeor'] = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

    }

    if (methods.includes('cunningham')) {
        if (!isNaN(leanMass)) {
            results['Cunningham'] = 500 + (22 * leanMass);
        } else {
            alert("Por favor, insira a massa magra para o método Cunningham.");
        }
    }

    document.getElementById('result').innerHTML = `<h2>Resultados</h2>` +
        Object.keys(results).map(method => `<p>${method}: ${results[method].toFixed(2)} calorias/dia</p>`).join('');
}

document.querySelectorAll('input[name="method"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        var leanMassGroup = document.getElementById('lean-mass-group');
        if (this.value === 'cunningham') {
            leanMassGroup.style.display = 'block';
        } else {
            leanMassGroup.style.display = 'none';
        }
    });
});