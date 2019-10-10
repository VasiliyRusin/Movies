<template>
    <aside>
        <ul>
            <li>
                <div class="segment">
                    <label>
                        <input name="type" type="radio" v-model="filters.type" value="tv">
                        <span>Сериалы</span>
                    </label>
                    <label>
                        <input name="type" type="radio" v-model="filters.type" value="movie">
                        <span>Фильмы</span>
                    </label>
                </div>
            </li>
            <li>
                <h2>Год</h2>
                <div class="pair">
                    <label>
                        <input :max="maxYear" min="1900" type="number" v-model.number="filters.year">
                    </label>

                    <label>
                        <button @click="filters.year = null">×</button>
                    </label>
                </div>
            </li>
            <li>
                <h2>Сортировать по</h2>
                <div class="pair">
                    <label>
                        <select v-model="filters.sortBy">
                            <option :key="sortType.value" :value="sortType.value" v-for="sortType in sortTypes">
                                {{ sortType.label }}
                            </option>
                        </select>
                    </label>

                    <label>
                        <button @click="filters.desc = !filters.desc">
                            <template v-if="filters.desc">↓</template>
                            <template v-else>↑</template>
                        </button>
                    </label>
                </div>
            </li>
            <li>
                <h2>Жанры</h2>
                <div class="pair">
                    <label>
                        <input list="genres" type="text" v-model="genreName">
                        <datalist id="genres">
                            <option :key="genre.id" :value="genre.name" v-for="genre in genresList"></option>
                        </datalist>
                    </label>

                    <label>
                        <button @click="addGenre()">+</button>
                    </label>
                </div>
                <ul class="selected">
                    <li :key="genre.id" v-for="(genre, index) in genres">
                        {{ genre.name }}
                        <button @click="removeGenre(index)">×</button>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
    export default {
        name: "Filters",

        props: {
            params: Object
        },

        data () {
            const params = this.params;

            return {
                filters: params,
                genreName: '',
                sortTypes: [
                    {
                        label: 'Популярности',
                        value: 'popularity'
                    },
                    {
                        label: 'Рейтингу',
                        value: 'vote_average'
                    },
                    {
                        label: 'Дате выхода',
                        value: 'primary_release_date'
                    },
                    {
                        label: 'Названию',
                        value: 'title'
                    }
                ]
            }
        },

        computed: {
            maxYear () {
                return (new Date()).getFullYear();
            },

            genresList () {
                let genres = this.$store.getters.genres(this.filters.type);
                return genres.filter(el => this.params.genres.findIndex(id => el.id === id) === -1);
            },

            genres () {
                let genres = this.$store.getters.genres(this.filters.type);

                return this.params.genres.map(el => {
                    return genres.find(_el => el === _el.id)
                });
            }
        },

        methods: {
            addGenre () {
                if (this.genreName !== '') {
                    const _genres = this.$store.getters.genres(this.filters.type);
                    const genre = _genres.find(_el => this.genreName === _el.name);

                    this.genreName = '';
                    this.filters.genres = [...this.params.genres, genre.id];
                }
            },

            removeGenre (index) {
                this.filters.genres = this.params.genres.filter((_, _index) => index !== _index);
            }
        },

        watch: {
            filters: {
                deep: true,
                handler: function (filters) {
                    this.$emit('update:params', filters);
                }
            },

            'filters.type' (type, oldType) {
                if (type !== oldType) this.filters.genres = [];
            }
        }
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

        select {
            height: 34.5px;
        }

        button {
            @include input;

            width: 34.5px;
            cursor: pointer;
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
                    margin-right: -8px;
                    margin-bottom: -8px;

                    li {
                        font-size: 90%;
                        margin-right: 8px;
                        margin-bottom: 8px;
                        display: inline-block;
                        border: 2px solid $color;
                        padding: 5px 6px 5px 12px;
                        border-radius: $border-radius-round;

                        button {
                            @include input;

                            width: 19px;
                            padding: 2px;
                            border-radius: 50%;
                            font-size: em(14px);
                        }
                    }
                }

                .segment {
                    @include segment;
                }

                .pair {
                    display: flex;

                    label {
                        &:first-child {
                            width: 100%;
                            margin-right: 8px;
                            display: inline-flex;
                        }

                        &:last-child {
                            width: 34.5px;
                        }
                    }
                }
            }
        }
    }
</style>
