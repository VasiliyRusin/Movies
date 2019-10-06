<template>
    <ul>
        <li :key="x" v-for="x in 80">
            <Card :item="{name: x}"></Card>
        </li>
    </ul>
</template>

<script>
    import Card from "@/components/List/Card";

    export default {
        name: "Cards",
        components: {Card}
    }
</script>

<style lang="scss" scoped>
    ul {
        @include ul-normalize;

        gap: 20px;
        width: 100%;
        display: grid;
        max-width: 760px;
        grid-template-columns: 1fr 1fr;
    }
</style>
