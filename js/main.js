// js/main.js


document.addEventListener('DOMContentLoaded', () => {

    console.log('ListaGK Iniciada!');
    
    const navLista = app.nav.lista;
    const navApi = app.nav.api;
    const secaoLista = app.secoes.lista;
    const secaoApi = app.secoes.api;

    /**
     * @param {string} secaoAlvo - O ID da seção para mostrar ('lista' ou 'api').
     */
    function mostrarSecao(secaoAlvo) {
        if (secaoAlvo === 'lista') {
            secaoLista.classList.remove('hidden');
            secaoApi.classList.add('hidden');
            navLista.classList.add('active');
            navApi.classList.remove('active');
        } else if (secaoAlvo === 'api') {
            secaoLista.classList.add('hidden');
            secaoApi.classList.remove('hidden');
            navLista.classList.remove('active');
            navApi.classList.add('active');
        }
    }

    navLista.addEventListener('click', () => {
        mostrarSecao('lista');
    });

    navApi.addEventListener('click', () => {
        mostrarSecao('api');
    });

    
    mostrarSecao('lista');
    
    inicializarApp();
});