<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-6">
                    <form @submit.prevent="add">
                        <div class="form-group">
                            <label for="nameTodo">Name todo</label>
                            <input type="text" class="form-control" required id="nameTodo"  v-model="todoName" placeholder="Enter name">
                        </div>

                        <div class="form-check" v-for="(point,k) in todoPoints" :key="point.id">
                            <div class="row align-items-center mb-3">
                                <div class="col-3">
                                    <input class="form-check-input"  v-model="todoPoints[k].checked" type="checkbox" value="" :id="`todo-${point.id}`">
                                    <label class="mb-0" :for="`todo-${point.id}`">Completed?</label>
                                </div>
                                <div class="col-7">
                                    <input type="text" required class="form-control" name="name" v-model="todoPoints[k].text" placeholder="Name point">
                                </div>
                                <div class="col-2">
                                    <button class="btn btn-danger" @click="removePoint(k)">-</button>
                                </div>
                            </div>

                        </div>

                        <em v-if="!todoPoints.length">Todo list empty</em>


                        <div class="row mt-4 mb-4">
                            <div class="text-center col-12">
                                <button type="button" class="btn btn-success pl-5 pr-5" @click="addEmptyPoint">+</button>
                            </div>
                        </div>


                        <button type="submit" class="pl-5 pr-5 btn btn-primary mr-5">Submit</button>
                        <router-link to="/" >Cancel</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { storeMutations } from '../store/index.js'
    export default {
        data() {
            return {
                todoName: null,
                todoPoints: []
            }
        },
        methods: {
            addEmptyPoint() {
                this.todoPoints.push({
                    id: (this.todoPoints.length ? this.todoPoints[this.todoPoints.length - 1].id + 1 : 0),
                    checked: 0,
                    text: null
                })
            },
            add() {
                if(!this.todoName || this.todoPoints.length == 0) {
                    alert('Name or points empty')
                    return;
                }

                const payload = {};

                payload[this.generateID()] = {
                    name: this.todoName,
                    list: {
                        ...this.todoPoints
                    }
                }


                storeMutations.addTodo(payload);

                this.$router.push('/');

            },
            removePoint(key) {
                this.todoPoints.splice(key, 1);
            },
             generateID() {

                let ts=String(new Date().getTime()), i = 0, out = '';

                for(i=0;i<ts.length;i+=2) {
                    out+=Number(ts.substr(i, 2)).toString(36);
                }
                return ('d'+out);
            }
        },
        name: "Add"
    }
</script>