import Vue from "vue";
import Vuex from "vuex";
import { genres } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        genres: {
            tv: [],
            movie: []
        }
    },
    mutations: {
        appendGenres (state, { type, value }) {
            Vue.set(state.genres, type, value);
        }
    },
    actions: {
        getGenres ({ commit }) {
            for (let type of ['tv', 'movie']) {
                genres(type).then(response => commit('appendGenres', { type, value: response.genres }))
            }
        }
    },
    getters: {
        genres (state) {
            return (type) => {
                switch (type) {
                    case 'tv':
                        return state.genres.tv;

                    case 'movie':
                        return state.genres.movie;

                    default:
                        return [...state.genres.tv, ...state.genres.movie];
                }
            }
        },

        genre (_, getters) {
            return (id) => {
                return getters.genres().find(el => el.id === id) || {};
            }
        }
    }
});
