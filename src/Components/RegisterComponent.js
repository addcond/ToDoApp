import Component from "./component.js";
import store from "../store";
import link from "../router/link.js";
import {backend} from "../service/Back.js";

export default class RegisterComponent extends Component {
    constructor(app, settings) {
        const template = document.getElementById('register').content.cloneNode(true);
        app.appendChild(template);
        super(
            store,
            app
        );
        const emailInput = app.querySelector('#register-email');
        const passInput = app.querySelector('#register-password');
        const userNameInput = app.querySelector('#register-user-name');
        app.querySelector('#backTologIn').addEventListener('click', () =>
            link('login')
    );

        app.querySelector('#register-button').addEventListener('click', () => {
            console.log(settings);
            backend.register(emailInput.value, passInput.value, userNameInput.value).then(
                () => link('login'),
            );
        });
    }

    render() {
        console.log('login render');
    }
}