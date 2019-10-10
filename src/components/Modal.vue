<template>
    <div class="modal" v-show="isOpen">
        <div class="modal-wrapper">
            <div class="modal-content">
                <header>
                    <slot :close="close" name="header"></slot>
                </header>

                <article>
                    <slot :close="close"></slot>
                </article>

                <footer>
                    <slot :close="close" name="footer"></slot>
                </footer>
            </div>
            <button @click="close" class="modal-close"></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            isOpen: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            close () {
                this.$emit('update:isOpen', false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        position: fixed;
        align-content: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.85);

        &.small {
            article {
                padding: 1.4em;
                text-align: center;
                font-weight: bolder;
            }

            .modal-wrapper {
                width: auto !important;
                max-width: 400px !important;
                max-height: 300px !important;

                footer {
                    justify-content: space-evenly !important;
                }
            }
        }

        .modal-wrapper {
            width: 100%;
            margin: auto;
            display: flex;
            max-height: 90%;
            max-width: 800px;
            flex-direction: row;

            .modal-content {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: white;
                border-radius: $border-radius;

                footer {
                    display: flex;
                    justify-content: flex-end;

                    button {
                        width: auto;
                        margin: 0 0 0 10px;

                        &:first-child {
                            margin: 0;
                        }
                    }
                }
            }

            .modal-close {
                $size: 48px;

                flex-grow: 0;
                width: $size;
                border: none;
                height: $size;
                flex-shrink: 0;
                cursor: pointer;
                margin-left: 10px;
                position: relative;
                background: transparent;

                &:before, &:after {
                    content: '';
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 4px;
                    margin: auto;
                    position: absolute;
                    border-radius: 2px;
                    height: $size * (5/6);
                    background-color: white;
                }

                &:before {
                    transform: rotateZ(-45deg);
                }

                &:after {
                    transform: rotateZ(45deg);
                }
            }
        }
    }
</style>
