<template>
    <div id="app">
        <div id="cover"></div>
        <Head></Head>
        <!-- <Todo></Todo> -->
		<router-link to="/app">app</router-link>
		<router-link to="/login">login</router-link>
		<transition name="fade">
			<router-view></router-view>
		</transition>
        <Footer></Footer>
		<router-view name="a"></router-view>
    </div>
</template>

<script>
import Head from './layout/head.vue'
// import Todo from './views/todo/todo.vue'
import Footer from './layout/footer.jsx'

export default {
  components: {
    Head,
    // Todo,
    Footer
  },
  data () {
    return {
      message: 'nihaoa'
    }
  },
  methods: {
    addTodo () {}
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
