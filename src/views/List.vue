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
        height: 100%;
        width: 1100px;
        display: flex;
        padding: 20px;
        margin: 0 auto;
        overflow: visible;
        background-color: transparent;
        justify-content: space-between;
    }
</style>
