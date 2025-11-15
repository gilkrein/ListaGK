// js/funcoes.js

/**
 * Armazena a lista de tarefas pessoais e o filtro ativo
 */
const estado = {
    tarefas: [],      
    filtroAtual: 'todas' 
};


function renderizarListaPessoal() {
    const listaTarefasElemento = app.listaPessoal.listaTarefas;
    
    listaTarefasElemento.innerHTML = '';

   
    const tarefasFiltradas = estado.tarefas.filter(tarefa => {
        if (estado.filtroAtual === 'pendentes') {
            return !tarefa.concluida;
        }
        if (estado.filtroAtual === 'concluidas') {
            return tarefa.concluida;
        }
        return true; 
    });

    const tarefasHtml = tarefasFiltradas.map(tarefa => {
    const classeConcluida = tarefa.concluida ? 'concluida' : '';

    const iconeCheck = tarefa.concluida ? 'assets/check-cheio.png' : 'assets/check-vazio.png';

    return `
        <li class="tarefa-item ${classeConcluida}" data-id="${tarefa.id}">

            <img src="${iconeCheck}" class="btn-toggle icone-acao">

            <span class="texto-tarefa">${tarefa.texto}</span>

            <div class="botoes-tarefa">
                <img src="assets/lixeira.png" class="btn-excluir icone-acao">
            </div>
        </li>
    `;
}).join(''); 

    listaTarefasElemento.innerHTML = tarefasHtml;
}

/**
 * Renderiza os dados buscados da API na tela.
 * @param {Array} tarefasApi - Um array de tarefas vindo do JSONPlaceholder
 */
function renderizarListaApi(tarefasApi) {
    const listaApiElemento = app.listaApi.lista;
        if (tarefasApi.length === 0) {
        listaApiElemento.innerHTML = '<li>Nenhuma tarefa encontrada.</li>';
        return;
    }
    const tarefasHtml = tarefasApi.map(tarefa => {
        const classeConcluida = tarefa.completed ? 'concluida-api' : '';
        return `
            <li class="${classeConcluida}">
                (ID: ${tarefa.id}) - ${tarefa.title}
            </li>
        `;
    }).join('');

    listaApiElemento.innerHTML = tarefasHtml;
}


function salvarTarefasNoStorage() {
    localStorage.setItem('listaGK_tarefas', JSON.stringify(estado.tarefas));
}

function carregarTarefasDoStorage() {
    const tarefasSalvas = localStorage.getItem('listaGK_tarefas');
    if (tarefasSalvas) {
     
        estado.tarefas = JSON.parse(tarefasSalvas);
    }
}



/**
 * Adiciona uma nova tarefa ao estado.
 * @param
 */
function adicionarTarefa(texto) {
    const novaTarefa = new Tarefa(texto);
    
    estado.tarefas.unshift(novaTarefa);
    
    salvarTarefasNoStorage();
    renderizarListaPessoal();
}

/**
 * Alterna o estado de 'concluida' de uma tarefa.
 * @param 
 */
function toggleTarefa(id) {
    const tarefa = estado.tarefas.find(t => t.id == id);
    
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        
        salvarTarefasNoStorage();
        renderizarListaPessoal();
    }
}

/**
 * Exclui uma tarefa do estado.
 * @param
 */
function excluirTarefa(id) {
    estado.tarefas = estado.tarefas.filter(t => t.id != id);
    
    salvarTarefasNoStorage();
    renderizarListaPessoal();
}

async function manipularBuscaApi() {
    const listaApiElemento = app.listaApi.lista;
    listaApiElemento.innerHTML = '<li>Carregando...</li>';
    
    const dados = await api.buscarTarefasExemplo();
    
    renderizarListaApi(dados);
}

function configurarFormularioLista() {
    app.listaPessoal.form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        
        const textoTarefa = app.listaPessoal.input.value.trim();
        
        if (textoTarefa) {
            adicionarTarefa(textoTarefa);
            app.listaPessoal.input.value = ''; 
            app.listaPessoal.input.focus(); 
        }
    });
}


function configurarEventosLista() {
    app.listaPessoal.listaTarefas.addEventListener('click', (evento) => {
        const elementoClicado = evento.target;
        const itemLi = elementoClicado.closest('.tarefa-item');
        
        if (!itemLi) return; 

        const idTarefa = itemLi.dataset.id;

        if (elementoClicado.classList.contains('btn-excluir')) {
            excluirTarefa(idTarefa);
      } else if (elementoClicado.classList.contains('texto-tarefa') || elementoClicado.classList.contains('btn-toggle')) {
    toggleTarefa(idTarefa);
}
    });
}

function configurarFiltros() {
    app.listaPessoal.filtros.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'BUTTON' && evento.target.dataset.filtro) {
            const novoFiltro = evento.target.dataset.filtro;
            estado.filtroAtual = novoFiltro;
            
            document.querySelectorAll('#filtros-lista button').forEach(btn => {
                btn.classList.remove('active');
            });
            evento.target.classList.add('active');
            
            renderizarListaPessoal();
        }
    });
}


function configurarBotaoApi() {
    app.listaApi.btnBuscar.addEventListener('click', manipularBuscaApi);
}


function inicializarApp() {
    configurarFormularioLista();
    configurarEventosLista();
    configurarFiltros();
    configurarBotaoApi();
    
    carregarTarefasDoStorage();
    renderizarListaPessoal();
}