function calculate() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(activity)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Calcular a TMB usando a fórmula para mulheres
    const tmb = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);

    // Ajustar as calorias para o objetivo
    const dailyCalories = goal === 'gain' ? tmb + 500 : tmb - 500;

    // Calcular proteínas
    const proteinIntake = weight * 2; // usando 2 g/kg como exemplo
    const proteinCalories = proteinIntake * 4;

    // Calcular gorduras (25% do total calórico como exemplo)
    const fatCalories = dailyCalories * 0.25;
    const fatIntake = fatCalories / 9;

    // Calcular carboidratos
    const carbCalories = dailyCalories - proteinCalories - fatCalories;
    const carbIntake = carbCalories / 4;

    // Exibir resultados
    document.getElementById('result').innerHTML = `
        <p>Calorias Diárias: ${Math.round(dailyCalories)}</p>
        <p>Proteínas: ${Math.round(proteinIntake)} g (${Math.round(proteinCalories)} calorias)</p>
        <p>Gorduras: ${Math.round(fatIntake)} g (${Math.round(fatCalories)} calorias)</p>
        <p>Carboidratos: ${Math.round(carbIntake)} g (${Math.round(carbCalories)} calorias)</p>
    `;
}