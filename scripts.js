const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-tasks')


let myListItens = []

function addTask() {

if(input.value == ""){
        alert("Digite algo meu usuário maravilhoso!");
}else{
    myListItens.push({ tarefa: input.value, concluida: false });

    input.value = ""

    showTasks();

}

    
}

function showTasks() {

    let newLi = '';

    myListItens.forEach((item, index) => {
        newLi = newLi +

            `
        <li class="task ${item.concluida && "done" }">
            <img  src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${index})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="excluir-lixeira" onclick="deleteItem(${index})">
        </li>

        `
    })
    completeList.innerHTML = newLi

    localStorage.setItem('lista', JSON.stringify(myListItens))

}

function loadItens(){
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    myListItens = JSON.parse(tarefasDoLocalStorage);

    showTasks();
}

loadItens();

function deleteItem(index) {
    myListItens.splice(index, 1)
    showTasks()
}

function concluirTarefa(index) {    
    myListItens[index].concluida = !myListItens[index].concluida
    showTasks();
}


button.addEventListener('click', addTask)

