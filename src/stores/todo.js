import { defineStore } from "pinia";
import { reactive, watch, toRef } from "vue";
import { getTodos, setTodos } from "../services/todo";

export const useTodoStore = defineStore("todo", () => {
  const state = reactive({
    todos: getTodos(),
  });
  const todos = toRef(state, "todos");

  watch(state, () => setTodos(todos.value)); // save a copy in local storage on any change

  const create = (todo) => state.todos.push(todo);
  const remove = (index) => state.todos.splice(index, 1);
  const update = (index, todo) => state.todos.splice(index, 1, todo);

  const getTodoByIndex = (index) => state.todos[index];

  return {
    create,
    remove,
    update,
    todos,
    getTodoByIndex,
  };
});
