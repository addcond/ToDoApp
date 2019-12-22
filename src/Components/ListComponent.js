import Component from "./component.js";
import store from "../store";
import link from "../router/link.js";
import {backend} from "../service/Back.js"

export default class ListComponent extends Component {
    constructor(app, settings) {

        const template = document.getElementById('list').content.cloneNode(true);

        app.append(template);
        super(
            store,
            document.querySelector('.js-items')
        );

        backend.getToDo().then(
            res => store.dispatch('addItems', res)
        )

        const input = document.querySelector('.c-input-field');
        const submit = document.querySelector('.c-button');
        const handleClick = event => {
            event.preventDefault();

            let value = input.value.trim();
            if (value.length) {
                backend.createToDo(value, new Date().toDateString(), false)
                    .then(res => store.dispatch('addItem', res ))
                input.focus();
            }
            input.value= '';
        }
        submit.addEventListener('click', handleClick);
        app.querySelector('#logOut').addEventListener('click', () => {
            localStorage.clear();
            link('login');
        })

        this.initfilterslisteners(app);
    }

    deleteItem(event) {
        const id = event.target.dataset.id;
        backend.deleteTodo(id)
            .then(() => store.dispatch('removeItem', { id }))
    }

    methodForCheck(event) {
        const id = event.target.dataset.id;
        backend.updateTodoChecked(id, event.target.checked)
            .then(() => store.dispatch('toggleCompleted', { id }))
    }

    initfilterslisteners(app) {
        app.querySelector('#filterForChecked' ).addEventListener('click', function(event) {
            this.unabledfilter='checked';
            this.render();
        }.bind(this))
        app.querySelector('#filter_all' ).addEventListener('click', function(event) {
            this.unabledfilter='';
            this.render();
        }.bind(this))
        app.querySelector('#filterForUnChecked' ).addEventListener('click', function(event) {
            this.unabledfilter='unChecked';
            this.render();
        }.bind(this))
    }

    visbut(event) {
        const id = event.target.dataset.id;
        this.anchor.querySelector(`#${CSS.escape(id)}`).style.display = 'block';
    }

    visibleToDoInput(event) {
        const id = event.target.dataset.id;
        const input = this.anchor.querySelector(`#edit-${CSS.escape(id)}`);
        const span = event.target;
        input.value = span.dataset.text;
        span.style.display = 'none';
        input.style.display = 'block';
    }

    editTextInToDoField(event) {
        if (event.keyCode === 13) {
            const id = event.target.dataset.id;
            const input = event.target;
            backend.updateTodoText(id, input.value).then(
                (res) => store.dispatch('updateItem', res),
            )
        }
    }

    render() {
        if (store.state.todo.length === 0) {
            this.anchor.innerHTML = '<div class="wallpaper">No ToDo`s for today, gratz</div>';
            return;
        }
        let todo = store.state.todo;
        if (this.unabledfilter === "checked") {
            todo = store.state.todo.filter( (todoItem) => todoItem.completed);
        }
        if (this.unabledfilter === "unChecked") {
            todo = store.state.todo.filter( (todoItem) => !todoItem.completed);
        }

        this.anchor.innerHTML = `
            <div class="boile">
                  ${
                     todo.map(todoItem => ` <div class="toDos" data-id="${todoItem._id}"> 
                        <span class="redaction  ${todoItem.completed?'underline':""}" data-id="${todoItem._id}" data-text="${todoItem.text}" id="idForSpan">${todoItem.text}  ${todoItem.createDate}</span>
                        <input class="editInput" type="text" data-id="${todoItem._id}" id="edit-${todoItem._id}">
                            <div id="${todoItem._id}">
                                <input type="checkbox" class="checkBox" data-id="${todoItem._id}" ${todoItem.completed?'checked':""}>
                                <button type="button" data-id="${todoItem._id}" class="new-item__button">Remove</button>
                            </div>
                     </div>
                  `).join('') 
                   }
             </div>
        `;

        this.anchor.querySelectorAll('.editInput').forEach( (input) =>
            input.addEventListener('keyup', this.editTextInToDoField.bind(this))
        )

        this.anchor.querySelectorAll('.redaction').forEach( (onClick) =>
            onClick.addEventListener('click', this.visibleToDoInput.bind(this))
        )

        this.anchor.querySelectorAll('.toDos').forEach((onHover) =>
            onHover.addEventListener('mouseover', this.visbut.bind(this))
        )

        this.anchor.querySelectorAll('.checkBox').forEach( (checkBox) =>
            checkBox.addEventListener('click', this.methodForCheck.bind(this))
        )
        this.anchor.querySelectorAll('button').forEach((button) =>
            button.addEventListener('click', this.deleteItem.bind(this))
        )
    }
}