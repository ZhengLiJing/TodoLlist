<template>
    <div id="app">
        <div id="cover"></div>
        <Head></Head>
        <todo></todo>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from '../todo/head.vue';
import Todo from '../todo/todo.vue';
import Footer from '../todo/footer.jsx';


export default {
    components: {
        Head,
        Todo,
        Footer
    },
    data() {
        return {
            message: 'nihaoa'
        }
    },
    methods: {
        addTodo() {}
    }
}
</script>

<style lang="stylus" scoped>

    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .7
        z-index -1
    }
</style>