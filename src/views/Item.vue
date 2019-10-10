<template>
    <div class="wrapper">
        <article>
            <header>
                <h1 class="year">
                    {{ year }}
                </h1>
                <div class="poster">
                    <img :alt="name" :src="src" :srcset="srcset" v-if="item.poster_path">
                    <img :alt="name" src="" v-else>
                    <div @click="isOpenTrailer = true"></div>
                </div>
                <div>
                    <h1>
                        {{ name }}
                    </h1>
                    <ul>
                        <li :key="genre.id" v-for="genre in item.genres">{{ genre.name }}</li>
                    </ul>
                    <p>
                        {{ item.overview }}
                    </p>
                </div>
            </header>
        </article>
        <aside>
            <ul>
                <li>
                    <h2>Оригинальное название</h2>
                    <p>{{ original_name }}</p>
                </li>

                <li>
                    <h2>Статус</h2>
                    <p>{{ item.status }}</p>
                </li>

                <li v-if="type === 'tv'">
                    <h2>Информация о релизе</h2>
                    <p>{{ item.type }}</p>
                </li>

                <li>
                    <h2>Язык оригинала</h2>
                    <p>{{ item.original_language }}</p>
                </li>

                <li>
                    <h2>Длительность</h2>
                    <p>
                        {{ runtime }}
                    </p>
                </li>

                <li v-if="type === 'movie'">
                    <h2>Бюджет</h2>
                    <p>{{ item.budget | money }}</p>
                </li>

                <li v-if="type === 'movie'">
                    <h2>Сборы</h2>
                    <p>{{ item.revenue | money }}</p>
                </li>
            </ul>
        </aside>
        <Modal :is-open.sync="isOpenTrailer">
            <template v-slot>
                <iframe :src="`http://www.youtube.com/embed/${ trailer.key }?autoplay=1`" allowfullscreen height="360"
                        style="margin: auto; display: block; border: none"
                        width="640"></iframe>
            </template>
        </Modal>
    </div>
</template>

<script>
    import { movie, tv, videos } from "@/api";
    import Modal from "@/components/Modal";

    export default {
        name: "Item",
        components: { Modal },
        beforeMount () {
            switch (this.type) {
                case 'tv':
                    tv(this.$route.params.id).then(response => this.item = response);
                    break;

                case 'movie':
                    movie(this.$route.params.id).then(response => this.item = response);
                    break;
            }

            videos(this.type, this.$route.params.id).then(response => this.trailer = response.results[0]);
        },

        data () {
            return {
                isOpenTrailer: false,
                trailer: {},
                item: {}
            }
        },

        computed: {
            runtime () {
                return (this.item.episode_run_time || []).map(el => `${ el }m`).join(', ')
            },

            name () {
                return this.item.name || this.item.title
            },

            year () {
                return (new Date(this.item.first_air_date || this.item.release_date)).getFullYear()
            },

            original_name () {
                return this.item.original_name || this.item.original_title
            },

            type () {
                return this.$route.params.type
            },

            src () {
                return `https://image.tmdb.org/t/p/w185_and_h278_bestv2${ this.item.poster_path }`
            },

            srcset () {
                return `https://image.tmdb.org/t/p/w185_and_h278_bestv2${ this.item.poster_path } 1x, https://image.tmdb.org/t/p/w370_and_h556_bestv2${ this.item.poster_path } 2x`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 900px;
        height: 100%;
        display: flex;
        margin: 20px auto;
        overflow: visible;
        background-color: transparent;
        justify-content: space-between;

        article {
            width: 100%;
            padding: 40px;
            overflow: hidden;
            max-width: 600px;
            position: relative;

            header {
                display: flex;

                .year {
                    top: -25px;
                    right: -8px;
                    opacity: 0.2;
                    color: $color;
                    font-size: 4.5em;
                    position: absolute;
                }

                .poster {
                    width: 140px;
                    height: 229px;
                    flex-shrink: 0;
                    overflow: hidden;
                    position: relative;
                    margin-right: 40px;
                    border-radius: $border-radius;

                    &:hover {
                        div {
                            opacity: 0.6;
                        }
                    }

                    div {
                        top: 0;
                        left: 0;
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        transition: all 300ms;
                        background-color: rgb(0, 0, 0);

                        &:before, &:after {
                            content: '';
                            display: block;
                        }

                        &:before {
                            $size: 30px;

                            top: 50%;
                            left: 50%;
                            width: $size;
                            height: $size;
                            position: absolute;
                            border-radius: 50%;
                            border: 4px solid white;
                            transform: translate(-60%, -60%);
                        }

                        &:after {
                            top: 50%;
                            left: 50%;
                            width: 4px;
                            height: 20px;
                            position: absolute;
                            border-radius: 4px;
                            background-color: white;
                            transform: translate(50%, 50%) rotateZ(-20deg);
                        }
                    }

                    img {
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: absolute;
                    }
                }


                h1 {
                    margin-top: 5px;
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
                    font-size: 90%;
                    letter-spacing: 0.04em;
                }
            }
        }

        aside {
            width: 100%;
            max-width: 280px;

            ul {
                @include ul-normalize;

                padding: 20px;

                li {
                    h2 {
                        margin-bottom: 0;
                    }

                    p {
                        margin-top: 0.5em;
                    }

                    &:first-child {
                        h2 {
                            margin-top: 0;
                        }
                    }
                }
            }
        }

        article, aside {
            color: $color;
            border: 1px solid $color;
            border-radius: $border-radius;
        }
    }

</style>
