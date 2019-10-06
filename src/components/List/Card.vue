<template>
    <router-link to="/">
        <article>
            <picture>
                <!--            <source media="(min-width: 650px)" srcset="img_pink_flowers.jpg">-->
                <!--            <source media="(min-width: 465px)" srcset="img_white_flower.jpg">-->
                <img alt="Flowers" src="../../assets/logo.png">
            </picture>
            <div>
                <h1>Title</h1>
                <ul>
                    <li>Genre 1</li>
                    <li>Genre 2</li>
                </ul>
                <p>
                    Some text
                </p>

            </div>
        </article>
    </router-link>
</template>

<script>
    export default {
        name: "Card",
        props: {
            item: Object
        }
    }
</script>

<style lang="scss" scoped>
    a {
        text-decoration: none;
    }

    article {
        width: 100%;
        color: $color;
        display: flex;
        overflow: hidden;
        border: 1px solid $color;
        border-radius: $border-radius;

        img {
            display: block;
            width: 140px !important;
            height: 229px !important;
            background-color: $color;
        }
    }
</style>
