function openTab(event, tabName) {
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

    // Mostrar o conteúdo da aba clicada e adicionar a classe 'active' à aba

    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}
