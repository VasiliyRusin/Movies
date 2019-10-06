<template>
    <div class="wrapper">
        <Cards></Cards>
        <Filters></Filters>
    </div>
</template>

<script>
    import Filters from "@/components/List/Filters";
    import Cards from "@/components/List/Cards";

    export default {
        name: "home",
        components: {Cards, Filters},
    };
</script>

<style lang="scss" scoped>
    .wrapper {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: transparent;
        width: 1100px;
        height: 100%;
        margin: 0 auto;
        overflow: visible;
    }
</style>
