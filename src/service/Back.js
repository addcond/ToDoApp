import store from "../store/index.js";

class AuthStorage {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('my-items' )) || {};
    }
    getElement(key) {
        return this.data[key];
    }
    setElement(key, value) {
        this.data[key] = value;
        localStorage.setItem('my-items', JSON.stringify(this.data));
    }
}

class Backend {
    constructor(store, authStorage) {
        this.store = store;
        this.authStorage = authStorage;
        this.url = 'https://todo-app-back.herokuapp.com';
    }

    register(email, password, username) {
        return fetch(this.url+'/register', {
            method: 'POST',
            body: JSON.stringify({
                    email,
                    password,
                    username,
                }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
    }

    login(email, password) {
        return fetch(this.url + '/login', {
            method: 'POST',
            body:
                JSON.stringify({
                    email,
                    password,
                }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res =>{
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
            .then(res => {
                console.log(res);
                this.authStorage.setElement('token', res.token);
                return true;
            })
            .catch(() =>false)
    }

    checkAuth() {
      return fetch(this.url+'/me', {
          method: 'GET',
          headers: {
              'Authorization': this.authStorage.getElement('token'),
          },
      })
          .then(res => {
              if(!res.ok){
                  return Promise.reject('error')
              }
              return Promise.resolve(res.json())
          })
    }

    createToDo(text, createDate, completed) {
        return fetch(this.url+'/todos',{
            method: 'POST',
            body: JSON.stringify( {
                    text,
                    createDate,
                    completed,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            },
        })
            .then(res => {
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
    }

    getToDo() {
        return fetch(this.url+'/todos', {
            method: 'GET',
            headers: {
                'Authorization': this.authStorage.getElement('token'),
            }
        })
            .then(res => {
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
    }

    getToDoById(id) {
        return fetch(this.url+`/todos/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': this.authStorage.getElement('token'),
            }
        })
            .then(res => {
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
    }

    updateTodoText(id, text) {
        return fetch(this.url+`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                    text,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            }
        })
            .then(res => {
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
    }

    updateTodoChecked(id, completed) {
        return fetch(this.url+`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                completed,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            }
        })
            .then(res => {
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
    }

    deleteTodo(id) {
        return fetch(this.url+`/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            }
        })
            .then(res => {
                if(!res.ok){
                    return Promise.reject('error')
                }
                return Promise.resolve(res.json())
            })
    }

    getItems() {
        fetch(this.url, {
            method: 'GET',
            headers: {
                'Authorization': this.authStorage.getElement('token'),
            }
        })
            .then(res => res.json())
            .then(res => this.store.dispatch({ type: 'ADD_ITEMS', payload: items, } ))
    }


    addItem(item) {
    fetch(this.url, {
        method: 'POST',
        headers: {
            'Authorization': this.authStorage.getElement('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(res => res.json())
        .then(responseItem => this.store.dispatch({ type: 'ADD_ITEMS', payload: [responseItem], } ))
    }
}

class AbstractComponent {
    constructor(store, backend) {
        this.store = store
        this.backend = backend
    }
}


const authStorage = new AuthStorage();
export const backend = new Backend(store, authStorage);
