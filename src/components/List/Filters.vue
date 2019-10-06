<template>
    <aside>
        <ul>
            <li>
                <h2>Год</h2>
                <div class="year-pair">
                    <label>
                        <input max="2030" min="1800" type="number">
                    </label>
                    —
                    <label>
                        <input max="2030" min="1800" type="number">
                    </label>
                </div>
            </li>
            <li>
                <h2>Сортировать по</h2>
                <label>
                    <select></select>
                </label>
            </li>
            <li>
                <h2>Жанры</h2>
                <label>
                    <input type="text">
                </label>
                <ul>
                    <li></li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
    export default {
        name: "Filters"
    }
</script>

<style lang="scss" scoped>
    aside {
        width: 280px;
        height: 100%;
        color: $color;
        display: flex;
        padding: 20px;
        font-weight: bold;
        align-self: stretch;
        border-radius: $border-radius;
        border: 1px solid hsl(222, 13%, 77%);

        input, select {
            @include input;

            width: 100%;
            font-size: em(14px);
        }

        & > ul {
            @include ul-normalize;

            width: 100%;

            li {
                overflow: hidden;

                &:first-child {
                    h2 {
                        margin-top: 0 !important;
                    }
                }

                h2 {
                    margin: 1em 0 0.48em;
                }

                ul {
                    @include ul-normalize;

                    margin-top: 1em;

                    li {
                        padding: 5px 8px;
                        display: inline-block;
                        border: 2px solid $color;
                        border-radius: $border-radius-round;
                    }
                }

                .year-pair {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
