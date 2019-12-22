export default class Component {
    render() {}

    constructor(store, anchor) {
        this.store = store;
        this.anchor = anchor;
        this._render_ = this.render.bind(this);
        this.store.events.subscribe('change', this._render_);
    }
    onDestroy() {
        this.store.events.unsubscribe('change', this._render_);
        document.getElementById('app').innerHTML = '';
    }
}