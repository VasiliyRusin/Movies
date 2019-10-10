<template>
    <div>
        <h3 v-show="nothing">
            Ничего не найдено
        </h3>
        <ul>
            <li :key="item.id" v-for="item in cards">
                <Card :item="item"></Card>
            </li>
        </ul>
        <button @click="nextPage()" v-show="more">Загрузить еще...</button>
    </div>
</template>

<script>
    import Card from "@/components/List/Card";
    import { debounce } from "lodash";
    import { discover } from "@/api";

    export default {
        name: "Cards",
        components: { Card },
        props: {
            filters: Object
        },

        beforeMount () {
            this.getCards(this.filters);

            this.addCards = (response) => {
                this.cards = this.cards.concat(response.results);
                this.total_pages = response.total_pages;
            }
        },

        data () {
            return {
                page: 1,
                cards: [],
                total_pages: 1
            }
        },

        computed: {
            sort () {
                return `${ this.filters.sortBy }.${ this.filters.desc ? 'desc' : 'asc' }`
            },

            more () {
                return this.total_pages > this.page
            },

            nothing () {
                return this.total_pages < 1
            }
        },

        methods: {
            getCards: debounce(function (filters) {
                const params = {
                    page: this.page,
                    sort_by: this.sort,
                    with_genres: filters.genres
                };

                if (filters.type === 'tv') {
                    params.first_air_date_year = filters.year;
                    discover(params, filters.type).then(this.addCards)
                } else {
                    params.primary_release_year = filters.year;
                    discover(params, filters.type).then(this.addCards)
                }

            }, 400),

            nextPage () {
                this.page++;
                this.getCards(this.filters);
            }
        },

        watch: {
            filters: {
                deep: true,
                handler: function (filters) {
                    this.page = 1;
                    this.cards = [];
                    this.total_pages = 1;
                    this.getCards(filters);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    div {
        width: 100%;
        max-width: 760px;

        h3 {
            color: $color;
            text-align: center;
        }

        ul {
            @include ul-normalize;

            gap: 20px;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }

        button {
            border: none;
            margin: 20px auto;
            font: inherit;
            display: block;
            font-size: 110%;
            font-weight: 600;
            padding: 10px 20px;
            letter-spacing: 0.04em;
            border-radius: $border-radius-round;
        }
    }
</style>
