import Component from "./component.js";
import store from "../store/index.js";
import link from "../router/link.js";
import {backend} from "../service/Back.js";

export default class LoginComponent extends Component {
    constructor(app, settings) {
        const template = document.getElementById( 'login').content.cloneNode(true);
        app.appendChild(template);
        super(
            store,
            app,
        );
        const emailInput = app.querySelector('#email');
        const passInput = app.querySelector('#password');
        app.querySelector('#toRegister').addEventListener('click', () => {
            link('register');
        });
        app.querySelector('#signIn').addEventListener('click', () => {
            console.log(settings);
            backend.login(emailInput.value, passInput.value).then(
                (res) => {
                    if(res) {
                        link('list');
                    }
                },
            );
        });
    }

    render() {
        console.log('login render');
    }
}