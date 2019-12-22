export default function createReducers() {
    return {
        addItem: (payload, state) => ({
            ...state,
            todo: [ ...state.todo, payload ],
        }),
        removeItem : (payload, state) => ({
            ...state,
            todo: [
                ...state.todo.filter(toDoItem => toDoItem._id !== payload.id)
            ]
        }),
        addItems: (payload, state) => ({
            ...state,
            todo: [ ...payload ],
        }),
        toggleCompleted: (payload, state) => ({
            ...state,
            todo: state.todo.map(todoitem => {
                if(todoitem._id === payload.id) {
                    todoitem.completed = !todoitem.completed;
                }
                return todoitem;
            })
        }),
        updateItem: (payload, state) => ({
            ...state,
            todo: state.todo.map(todoitem => {
                if(todoitem._id === payload._id) {
                    return payload;
                }
                return todoitem;
            })
        }),
    }
}