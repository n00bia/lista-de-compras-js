document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
}); 

    function addTarefa(){
        
        const inputTarefa = document.getElementById("campo");
        const listaTarefa = document.getElementById("lista");

        if(inputTarefa.value === ''){
            alert("Uma tarefa precisa ser informada!");
            return;
        }

        const tarefa = document.createElement('li');
        tarefa.setAttribute('class', 'list-group-item list-group-item-action');

        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = inputTarefa.value;

        const botaoEditar = document.createElement('button');
        botaoEditar.setAttribute('class', 'btn-next-right btn btn-primary');

        const botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('class', 'btn-right btn btn-primary');

        botaoEditar.textContent = 'Editar';
        botaoEditar.addEventListener('click', () => editar(textoTarefa));

        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', () => excluir(tarefa));

        tarefa.appendChild(textoTarefa);
        tarefa.appendChild(botaoEditar);
        tarefa.appendChild(botaoExcluir)

        listaTarefa.appendChild(tarefa);
        
        salvarDadosNoStorage();

        inputTarefa.value = '';

    }

    function editar(textoTarefa){
        const textoAtt = prompt('Editar Tarefa:', textoTarefa.textContent);
        if(textoAtt !== null){
            textoTarefa.textContent = textoAtt;
            salvarDadosNoStorage();
        }
    }

    function excluir(tarefa){
        const confirmDelete = confirm('Tem certeza de que deseja excluir esta tarefa?');
        if (confirmDelete) {
        tarefa.parentNode.removeChild(tarefa);
        salvarDadosNoStorage();
        }
    }

    function salvarDadosNoStorage(){
        const listaTarefa = document.getElementById("lista");
        const tarefas = Array.from(listaTarefa.children).map(tarefa => ({
            text: tarefa.querySelector('span').textContent
        }));
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function carregarTarefas(){        
        const listaTarefa = document.getElementById("lista");
        const tarefasSalvas = localStorage.getItem('tarefas');

        if(tarefasSalvas){
            const tarefas = JSON.parse(tarefasSalvas);

            tarefas.forEach(element => {
                const tarefa = document.createElement('li');
                tarefa.setAttribute('class', 'list-group-item list-group-item-action');

                const textoTarefa = document.createElement('span');
                textoTarefa.textContent = element.text;

                const botaoEditar = document.createElement('button');
                botaoEditar.setAttribute('class', 'btn-next-right btn btn-primary');

                const botaoExcluir = document.createElement('button');
                botaoExcluir.setAttribute('class', 'btn-right btn btn-primary');

                botaoEditar.textContent = 'Editar';
                botaoEditar.addEventListener('click', () => editar(textoTarefa));

                botaoExcluir.textContent = 'Excluir';
                botaoExcluir.addEventListener('click', () => excluir(tarefa));

                tarefa.appendChild(textoTarefa);
                tarefa.appendChild(botaoEditar);
                tarefa.appendChild(botaoExcluir)

                listaTarefa.appendChild(tarefa);
            });
        }
        
    }