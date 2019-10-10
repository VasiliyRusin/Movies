<template>
    <div class="wrapper">
        <Cards :filters="filters"></Cards>
        <Filters :params.sync="filters"></Filters>
    </div>
</template>

<script>
    import Filters from "@/components/List/Filters";
    import Cards from "@/components/List/Cards";

    export default {
        name: "List",
        components: { Cards, Filters },
        data () {
            return {
                filters: {
                    type: 'tv',
                    year: null,
                    sortBy: 'popularity',
                    desc: true,
                    genres: []
                }
            }
        }
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
