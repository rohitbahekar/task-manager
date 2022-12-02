<script setup>
import { defineEmits } from "vue";
import { useTodoStore } from "@/stores/todo";
import TodoSingle from "./TodoSingle.vue";

defineEmits(["edit", "showTodo"]);
const todoStore = useTodoStore();
</script>

<template>
  <div class="todo-list">
    <TodoSingle
      v-for="(todo, index) in todoStore.todos"
      :key="'todoSingle' + index"
      :todo="todo"
      @edit="$emit('edit', index)"
      @click="$emit('showTodo', index)"
      @remove="todoStore.remove(index)"
      @updated="todoStore.update(index, $event)"
    />
  </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
}
</style>
