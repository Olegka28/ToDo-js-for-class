'use strict'

// Делаем список todo:

// - у нас текстовое поле, списк и кнопка, при сохранении новой задачи она появляется в списке ниже
// - рядом с каждой задачей есть чекбокс, если его нажать, то задача становится выполненной и текст должен быть зачеркнутым
// - также рядом с каждой задачей есть крестик, при клике на который задача удаляется из списка

class TodoController {
    constructor() {
        this.state = new TodoState();
        this.view = new TodoView();

        this.view.buttonAddItem.addEventListener('click', this.addNewItem, this.state.addTodo);
        document.addEventListener('click', this.deleteTodoById)
    }

    addNewItem = (e) => {
        if(this.view.input.value === '') {
            alert("Поле не может быть пустым");
            return
        }

        this.view.input.value = '';

        this.buttonRemoveItem = document.createElement('button');
        this.textContentInput = document.createElement('p');
        this.containerTodoItems = document.createElement('div');
        this.checked = document.createElement('input');

        this.containerTodoItems.className = 'todo_container_items';
        this.containerTodoItems.setAttribute('data-id', Math.random() * 10);

        this.checked.setAttribute('type', 'checkbox');
        this.checked.className = 'input_checked';
        this.buttonRemoveItem.innerHTML = '&times';
        this.buttonRemoveItem.className = 'button_remove_item';
        this.textContentInput.className = 'text_todo';


        this.containerTodoItems.append(this.checked);
        this.containerTodoItems.append(this.textContentInput);
        this.containerTodoItems.append(this.buttonRemoveItem);

        this.view.containerTodo.append(this.containerTodoItems);

        this.state.items = {};
        this.state.items.label = this.view.valueInput;
        this.state.items.id = this.containerTodoItems.getAttribute('data-id');
        this.state.items.checked = false;

        this.textContentInput.textContent = this.view.valueInput;
        this.view.input.value = '';

        this.checked.addEventListener('click', this.toggleItem);
        this.state.addTodo();
        console.log(this.state.state)
    }

    toggleItem = (e) => {  
        for(let i = 0; i < this.state.state.length; i++) {
            if(e.path[1].getAttribute('data-id') === this.state.state[i].id) {
                this.state.state[i].checked = e.target.checked;
                document.querySelectorAll('.text_todo')[i].classList.toggle('remove_item');
                // e.path[1].classList.toggle('remove_item');
            }
        }
    }

    deleteTodoById = (e) => {
        if(e.target.closest('.button_remove_item')) {
            for(let i = 0; i < this.state.state.length; i++) {
                if(e.path[1].getAttribute('data-id') === this.state.state[i].id) {
                    this.state.state[i].checked = e.target.checked;
                    e.path[1].parentNode.removeChild(e.path[1]);
                    this.state.removeToById(e.path[1].getAttribute('data-id'));
                    console.log(this.state.state)
                }
            }
        } 
    }
}

class TodoState{
    constructor() {
        this.item = new TodoItem();
        this.items = this.item.item;
        this.state = [];
    }

    addTodo() {
        this.state.push(this.items);
    }

    removeToById(id) {
        this.state.forEach((el, index) => {
            if(el.id === id) {
                this.state.splice(index, 1);
            }
        })
    }
}

class TodoItem {
    constructor() {
        this.item;     
    }
}

class TodoView {
    constructor(){
        this.containerTodo = document.querySelector('.todo_container');
        this.input = document.createElement('input');
        this.buttonAddItem = document.createElement('button');
        this.containerTodoHeader = document.createElement('div');

        this.valueInput;

        this.input.setAttribute('placeholder', 'What need to be done?');
        this.input.className = 'container_input';
        this.buttonAddItem.textContent = "Add Item";
        this.buttonAddItem.className = "conteiner_button_add";
        this.containerTodoHeader.className = 'container_header';

        this.containerTodoHeader.append(this.input);
        this.containerTodoHeader.append(this.buttonAddItem);
        this.containerTodo.append(this.containerTodoHeader);

        this.input.addEventListener('input', this.listeInput);
    }

    listeInput = (e) => {
        this.valueInput = e.target.value;
    }

}

const todo = new TodoController();

document.addEventListener('onload', todo);