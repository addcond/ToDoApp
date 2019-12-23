import routerConfig from "./routerConfig.js";
import {routerObserver} from "./RouterObserver.js";

export default class Router {
    constructor(anchor) {
        this.anchor = anchor;

        window.addEventListener('popState', event => {
            this.changeRoute(event.state.route)
        })
        routerObserver.subscribe('changeRoute',this.changeRoute.bind(this))
    }

    changeRoute(route) {

        const conf = routerConfig[route];
        if (!conf) return;
        if(this.components) {
            this.components.forEach((component) => component.onDestroy());
        }

        window.history.pushState(conf.data, '', conf.url);

        this.components = conf.component.map((component) => new component(this.anchor, conf.settings));
        this.components.forEach((component) => component.render());
    }
}