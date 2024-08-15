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
    // Implementar a lógica de cálculo aqui.
    const methods = Array.from(document.querySelectorAll('input[name="metodo"]:checked')).map(el => el.value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const leanMass = parseFloat(document.getElementById('lean-mass').value);

    let results = {};

    if (methods.includes('harris-benedict')) {
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        results['Harris-Benedict'] = bmr;
    }

    if (methods.includes('mifflin-st-jeor')) {
        let bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        results['Mifflin-St Jeor'] = bmr;
    }

    if (methods.includes('cunningham')) {
        if (!isNaN(leanMass)) {
            let bmr = 500 + (22 * leanMass);
            results['Cunningham'] = bmr;
        } else {
            alert("Por favor, insira a massa magra para o método Cunningham.");
        }
    }

    document.getElementById('calorie-result').innerHTML = `<h2>Resultados</h2>` +
        Object.keys(results).map(method => `<p>${method}: ${results[method].toFixed(2)} calorias/dia</p>`).join('');
}

document.querySelectorAll('input[name="metodo"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        var leanMassGroup = document.getElementById('lean-mass-group');
        if (this.value === 'cunningham') {
            leanMassGroup.style.display = 'block';
        } else {
            leanMassGroup.style.display = 'none';
        }
    });
});
