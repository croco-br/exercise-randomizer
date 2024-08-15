function openTab(event, tabName) {
    // Verificar se o evento e o tabName são válidos
    if (!event || !tabName) {
        console.error('Evento ou nome da aba não fornecido.');
        return;
    }

    // Ocultar todos os conteúdos de abas
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remover classe 'active' de todas as abas
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Verificar se o elemento da aba existe
    var targetTabContent = document.getElementById(tabName);
    if (targetTabContent) {
        targetTabContent.classList.add('active');
    } else {
        console.error('Nenhum elemento encontrado com o ID: ' + tabName);
    }

    // Verificar se currentTarget está definido
    if (event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else {
        console.error('currentTarget não está definido.');
    }

    // Prevenir o comportamento padrão (se aplicável)
    if (event.preventDefault) {
        event.preventDefault();
    }
}
