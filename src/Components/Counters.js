import component from "./component.js";
import store from "../store/index.js";

export default class CountersComponent extends component {
    constructor(app, settings) {
        super(
            store,
            document.querySelector('.counters')
        );
    }

    render() {
        const todoLength = store.state.todo.length;
        const todoCompletedLength = store.state.todo.filter((todoItem) => todoItem.completed).length;
        const todoUnCompletedLength = store.state.todo.filter((todoItem) => !todoItem.completed).length;

        this.anchor.innerHTML = `<div>Number of todos ${todoLength}</div> 
                                <div>Number of uncompleted todos ${todoUnCompletedLength}</div>
                                <div>Number of completed todos ${todoCompletedLength}</div>`
    }
}