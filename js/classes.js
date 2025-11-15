// js/classes.js

/**
 * Representa uma única tarefa na lista pessoal.
 */
class Tarefa {
    /**
     * Cria uma nova instância de Tarefa.
     * @param
     */
    constructor(texto) {
    
        this.id = Date.now();
        
        this.texto = texto;
        
        this.concluida = false;
    }

    toggle() {
        this.concluida = !this.concluida;
    }
}