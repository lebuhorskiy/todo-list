<template>
    <div>
        <Modal v-if="modalOpen == 1" @close="closeModal">
            <template v-slot:content>
                <h1 class="mb-5">You sure?</h1>
                <button class="btn btn-success" @click="acceptDecline">Yes</button>
                <button class="btn btn-danger ml-4" @click="closeModal">Cancel</button>
            </template>
        </Modal>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-7">
                    <form @submit.prevent="update">
                        <div class="form-group">
                            <label for="nameTodo">Name todo</label>
                            <input type="text" class="form-control" required id="nameTodo" v-model="todoName"
                                   placeholder="Enter name">
                        </div>

                        <div class="form-check" v-for="(point,k) in todoPoints" :key="point.id">
                            <div class="row align-items-center mb-3">
                                <div class="col-3">
                                    <input class="form-check-input" @change="readHistory($event,'checkbox', point, k)"
                                           v-model="todoPoints[k].checked" type="checkbox" value=""
                                           :id="`todo-${point.id}`">
                                    <label class="mb-0" :for="`todo-${point.id}`">Completed?</label>
                                </div>
                                <div class="col-7">
                                    <input type="text" required class="form-control" name="name"
                                           v-model="todoPoints[k].text" placeholder="Name point">
                                </div>
                                <div class="col-2">
                                    <button class="btn btn-danger" type="button" @click="removePoint(k)">-</button>
                                </div>
                            </div>

                        </div>

                        <em v-if="!todoPoints.length">Todo list empty</em>


                        <div class="row mt-4 mb-4">
                            <div class="text-center col-12">
                                <button type="button" class="btn btn-success pl-5 pr-5" @click="addEmptyPoint">+
                                </button>
                            </div>
                        </div>


                        <button type="submit" class="pl-5 pr-5 btn btn-primary mr-5">Submit</button>
                        <button class="btn btn-link" to="/" type="button" @click="openModal">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {storeMutations} from '../store/index.js'
    import Modal from '../components/Modal'

    export default {
        data() {
            return {
                todoName: null,
                todoPoints: [],
                modalOpen: false,
                historyActions: {
                    checkboxes: [],
                    points: []
                },
            }
        },
        methods: {
            readHistory($event, section, data, key) {
                switch (section) {
                    case 'checkbox':
                        this.historyActions.checkboxes.unshift({
                            oldValue: !this.todoPoints[key].checked,
                            newValue: this.todoPoints[key].checked,
                            id: data.id,
                            key: key,
                        })
                        break;
                }
            },
            openModal() {
                this.modalOpen = 1;
            },
            acceptDecline() {
                this.$router.push('/');
            },
            closeModal() {
                this.modalOpen = 0;
            },
            addEmptyPoint() {
                this.todoPoints.push({
                    id: (this.todoPoints.length ? this.todoPoints[this.todoPoints.length - 1].id + 1 : 0),
                    checked: 0,
                    text: null
                });
            },
            removePoint(key) {
                console.log('remove point');
                let item = this.todoPoints[key];
                item['key'] = key;

                this.historyActions.points.unshift(item);

                this.todoPoints.splice(key, 1);
            },
            update() {

                storeMutations.update(this.$route.params.id, {
                    name: this.todoName,
                    list: this.todoPoints,
                });

                this.$router.push('/');

            },

            back() {
                let actions = this.historyActions;
                for (let key in actions) {
                    if (actions[key].length == 0) continue;

                    switch (key) {
                        case 'checkboxes': {
                            let action = actions[key]

                            for (let k in action) {

                                this.todoPoints[action[k].key].checked = action[k].oldValue;


                                this.historyActions['checkboxes'].splice(k, 1);

                                break;
                            }
                            break;
                        }
                        case 'points':
                        {
                            let action = actions[key]

                            for (let k in action) {

                                this.todoPoints.splice(action[k].key, 0, action[k]);


                                this.historyActions['points'].splice(k, 1);

                                break;
                            }
                            break;
                        }
                    }
                }
            }

        },

        mounted() {
            const todo = storeMutations.getById(this.$route.params.id);

            if (!todo) {
                this.$router.push('/')
                throw new Error('Todo not found');
            }
            this.todoName = todo.name;
            this.todoPoints = Object.values(todo.list);

            document.onkeydown = (e) => {
                let evtobj = window.event ? event : e
                if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
                    this.back();
                }

            }


        },
        components: {
            Modal,
        },
        name: "Edit"
    }
</script>