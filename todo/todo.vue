<template>
    <section class="real-app">
        <input 
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来想要做什么？"
            @keyup.enter="addTodo"
        >
        <item 
            :todo="todo"
            v-for="todo in filterTodos"
            :key="todo.id"
            @del="deleTodo"
        />
        <tabs 
            @toggle="toggleFilter"
            @clearCompleted="clearAllCompleted"
            :filter="filter"
            :todos="todos"
        />
    </section>
</template>
<script>
import Item from "../todo/item.vue";
import Tabs from "../todo/tabs.vue";
let id = 0;
export default {
  components: {
    Item,
    Tabs
  },
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  computed: {
    filterTodos() {
      if (this.filter === "all") {
        return this.todos;
      }
      const completed = this.filter === "completed"; // 完成为true
      // 返回过滤后的数组，当filter为complted，则说明已完成，返回已完成的数组
      // 当filter为active, 则未完成，返回未完成的数组
      return this.todos.filter(todo => todo.completed === completed);
    }
  },
  methods: {
    addTodo(e) {
      let value = e.target.value.trim();
      if (value) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        });
      }
      e.target.value = "";
    },
    deleTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    },
    toggleFilter(state) {
      this.filter = state;
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => {
        return !todo.completed;
      });
    }
  }
};
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