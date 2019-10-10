<template>
    <header>
        <div>
            <h1>
                <router-link :to="{ name: 'list' }">Movies</router-link>
            </h1>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        background-color: $background-color;

        div {
            $margin: 20px;

            color: $color;
            overflow: hidden;
            border-radius: $border-radius;
            margin: $margin $margin 0 $margin;
            background-color: hsl(222, 18%, 32%);
            box-shadow: 0 0 20px 0 darken(hsl(222, 18%, 32%), 18);
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        h1 {
            $font-size: 26px;
            $margin: em($font-size * 0.825, $font-size);

            margin: $margin 30px;
            font-size: em($font-size);
        }
    }
</style>
