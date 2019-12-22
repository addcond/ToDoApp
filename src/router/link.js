import {routerObserver} from "./RouterObserver.js";

export default function link(route) {
    routerObserver.next('changeRoute',route);
}