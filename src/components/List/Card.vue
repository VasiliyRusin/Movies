<template>
    <router-link :to="{ name: 'item',  params: { id: item.id }}">
        <article>
            <picture>
                <img :alt="name" :src="`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${ item.poster_path }`"
                     v-if="item.poster_path">
                <img :alt="name" src="" v-else>
            </picture>
            <div>
                <h1>{{ name }}</h1>
                <ul>
                    <li :key="genre" v-for="genre in genres">{{ genre }}</li>
                </ul>
                <p>{{ item.overview }}</p>

            </div>
        </article>
    </router-link>
</template>

<script>
    export default {
        name: "Card",
        props: {
            item: Object
        },

        computed: {
            genres () {
                const genres = [];
                for (let id of this.item.genre_ids) {
                    genres.push(this.$store.getters.genre(id).name)
                }
                return genres
            },

            name () {
                return this.item.name || this.item.title
            }
        }
    }
</script>

<style lang="scss" scoped>
    a {
        text-decoration: none;
    }

    article {
        width: 100%;
        flex-grow: 1;
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

        div {
            width: 100%;
            padding: 20px;
            max-width: 229px;

            h1 {
                margin-top: 0;
                max-height: 58px;
                overflow: hidden;
                margin-bottom: 18px;
            }

            ul {
                overflow: auto;
                margin-right: -8px;
                white-space: nowrap;
                @include ul-normalize;

                li {
                    padding: 0 8px;
                    font-size: 90%;
                    font-weight: bold;
                    display: inline-block;
                    border: 2px solid $color;
                    border-radius: $border-radius-round;

                    &:not(:last-child) {
                        margin-right: 8px;
                    }
                }
            }

            p {
                max-height: 60px;
                overflow: hidden;
            }
        }
    }
</style>
