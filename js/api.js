// js/api.js


const api = {
    /**
     * Busca uma lista de tarefas de exemplo da API JSONPlaceholder.
     * @returns 
     */
    buscarTarefasExemplo: async () => {
        try {
            const url = 'https://jsonplaceholder.typicode.com/todos?_limit=10';
            
            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status}`);
            }

            const dados = await resposta.json();
            
            return dados;

        } catch (erro) {
            console.error('Falha ao buscar tarefas da API:', erro);
            return [];
        }
    }
};