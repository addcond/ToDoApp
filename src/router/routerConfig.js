import ListComponent from "../Components/ListComponent.js";
import LoginComponent from "../Components/LoginComponent.js";
import store from "../store/index.js";
import RegisterComponent from "../Components/RegisterComponent.js";
import CountersComponent from "../Components/Counters.js";

export default {
    'login': {
        data: { route: 'login' },
        url: 'login',
        component: [LoginComponent],
        settings: {
            handleLogIn: () => store.dispatch('login'),
        }
    },
    'list': {
        data: { route: 'list' },
        url: 'list',
        component: [ListComponent, CountersComponent],
        settings: {}
    },
    'register' : {
        data : { route: 'register'},
        url: 'register',
        component: [RegisterComponent],
        settings: {},
    }
}