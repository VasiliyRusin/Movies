<template>
    <div id="app">
        <Header></Header>
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import url('https://rsms.me/inter/inter.css');

    html {
        height: 100%;
        font-family: 'Inter', sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-feature-settings: 'tnum' 1, 'case' 1, 'ss03' 1, 'cv02' 1, 'cv03' 1, 'cv04' 1, 'cv05' 1, 'cv07' 1, 'cv08' 1,
        'cv09' 1, 'cv10' 1, 'cv11' 1;
    }

    @supports (font-variation-settings: normal) {
        html {
            font-family: 'Inter var', sans-serif;
        }
    }

    body {
        margin: 0;
        min-height: 100%;
        background-color: $background-color;
    }

    html, body {
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    #app {
        overflow: hidden;
        min-height: 100%;
    }
</style>
<script>
    import Header from "@/components/Header";

    export default {
        components: {Header}
    }
</script>
