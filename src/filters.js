import Vue from "vue";
import { formatMoney } from "accounting-js";

Vue.filter('money', function (value, ...args) {
    return formatMoney(value, ...args);
});
