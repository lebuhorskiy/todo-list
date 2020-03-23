<template>
        <div class="modal-wrapper">
            <div class="body-modal" ref="modalBody">
                <div class="close" @click="close">X</div>
                <slot name="content"></slot>
            </div>
        </div>
</template>

<script>
    export default {
        methods: {
            close() {
                this.$emit('close');
            }
        },
    }
</script>


<style scoped>

    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(0,0,0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .body-modal {
        height: auto;
        padding: 30px;
        width: 50vw;
        position: relative;
        background: #fff;
    }
    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 30px;
        color: #000;
        cursor: pointer;
    }
</style>