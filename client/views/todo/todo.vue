<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="next thing you wannna do"
            @keyup.enter="addTodo"
        >
        <item 
            v-for="todo in filterTodos"
            :key="todo.id"
            :todo="todo"
            @deleItem="deleteItem"
         />
         <tab 
            :todos="todos"
            :filter="filter"
            @toggle="toggleFilter"
            @clear="clearAllItem"
         />
    </section>
</template>

<script>
import Item from './item.vue'
import Tab from './tab.vue'

let id = 0
export default {
  components: {
    Item,
    Tab
  },
  data () {
    return {
      todos: [],
      filter: 'all'
      //   filterTodos: []
    }
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else {
        return this.todos.filter(todo => todo.completed)
      }
    }
  },
  methods: {
    addTodo (e) {
      const val = e.target.value
      this.todos.push({
        id: id++,
        value: val.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteItem (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllItem () {
      this.todos = []
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
}

.add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>