<template>
    <div>
        <h1>
            <router-link :to="{ name: 'main' }">Movies</router-link>
        </h1>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
