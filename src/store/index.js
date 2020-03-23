import Vue from 'vue'

export const store = Vue.observable({
    todos: (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : {})
});

export const storeMutations = {
    addTodo(data) {
        store.todos = Object.assign({}, store.todos, data);
        localStorage.setItem('todos', JSON.stringify(store.todos));
    },
    removeByIndex(index) {
        Vue.delete(store.todos, index);
        localStorage.setItem('todos', JSON.stringify(store.todos));
    },
    getById(id) {
        return store.todos[id];
    },
    update(id,data) {
        store.todos[id] = data;

        localStorage.setItem('todos', JSON.stringify(store.todos));


    }
}