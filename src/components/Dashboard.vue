<template>
    <div>
        <Modal v-if="modalOpen == 1" @close="closeModal">
            <template v-slot:content>
                <h1 class="mb-5">You sure?</h1>
                <button class="btn btn-success" @click="deleteSubmit">Yes</button>
                <button class="btn btn-danger ml-4" @click="decline">Cancel</button>
            </template>
        </Modal>
        <div class="container">
            <div class="row">
                <div class="col-12 text-left">
                    <router-link to="/add">
                        <button class="btn btn-primary">Add todo</button>
                    </router-link>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-4" v-for="(todo, i) in todos" :key="i">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ todo.name }}</h5>
                        </div>

                        <div class="col-12">
                            <ul class="list-group">
                                <li v-for="(list, k) in todoList(todo.list)" :key="k"
                                    class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="row align-items-center w-100">
                                        <div class="col-10 text-left">
                                            {{ list.text }}
                                        </div>
                                        <div class="col-2 text-right">
                                            <input type="checkbox" class="form-control" :checked="list.checked"
                                                   disabled>
                                        </div>
                                    </div>

                                </li>

                            </ul>

                            <strong v-if="Object.keys(todo.list).length > 3">...</strong>
                        </div>

                        <div class="card-body">
                            <router-link :to="`/edit/${i}`"><button class="btn btn-dark">Edit</button></router-link>
                            <button class="btn btn-danger ml-4" @click="deleteTodo(i)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {store, storeMutations} from '../store/index.js'
    import Modal from './Modal'

    export default {
        data() {
            return {
                todos: {},
                delete: null,
                modalOpen: 0,
            }
        },
        mounted() {
            this.todos = store.todos;
        },
        methods: {
            todoList(list) {
                let result = [];
                for (let i = 0; i < 3; i++) {
                    if(typeof list[i] != 'object') {
                        continue;
                    }
                    result.push(list[i]);
                }
                return result;

            },
            deleteTodo(index) {
                this.delete = index;

                this.openModal();
            },
            deleteSubmit() {
                storeMutations.removeByIndex(this.delete);
                this.delete = 0;
                this.closeModal()
            },
            openModal() {
                this.modalOpen = 1;
            },
            decline() {
                this.delete = null;
                this.modalOpen = 0;
                this.closeModal();
            },
            closeModal() {
                this.modalOpen = 0;
            }
        },
        components: {
            Modal
        }
    }
</script>