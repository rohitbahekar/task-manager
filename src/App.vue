<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "@/stores/todo";
import TodoList from "@/components/TodoList.vue";
import TodoDetails from "@/components/TodoDetails.vue";
import TodoForm from "@/components/TodoForm.vue";
import BaseButton from "./components/BaseButton.vue";

const todoStore = useTodoStore();

const currentTodoIndex = ref(null);
const currentAction = ref("");
const onAction = (type, index) => {
  currentTodoIndex.value = index;
  currentAction.value = type;
};

const formAttributes = computed(() => {
  const attrs = {};
  const todo = todoStore.getTodoByIndex(currentTodoIndex.value);
  if (currentTodoIndex.value > -1 && todo) {
    attrs.todoToUpdate = {
      index: currentTodoIndex.value,
      todo,
    };
  }
  return attrs;
});

const hideContent = () => (currentAction.value = "");
const onTodoUpdate = (todo, index) => {
  todoStore.update(index, todo);
};
</script>

<template>
  <header>
    <h1 class="title is-1 app-name">Tasks App</h1>
  </header>

  <main class="page">
    <div class="container">
      <div class="container__left">
        <BaseButton
          class="button is-fullwidth is-primary create-btn"
          icon="plus"
          @click="onAction('create', null)"
        >
          <span>Create new task</span>
        </BaseButton>

        <TodoList
          v-if="todoStore.todos.length"
          @show-todo="onAction('show', $event)"
          @edit="onAction('edit', $event)"
        />
        <div v-else class="todo-img box">
          <img
            src="https://static.vecteezy.com/system/resources/previews/013/141/780/non_2x/todo-task-list-check-time-flat-color-icon-free-vector.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="container__right">
        <TodoForm
          v-if="currentAction === 'create' || currentAction === 'edit'"
          class="box"
          v-bind="formAttributes"
          @create="($event) => todoStore.create($event.todo)"
          @update="($event) => onTodoUpdate($event.todo, $event.index)"
          @close="hideContent"
        />
        <TodoDetails
          v-else-if="currentAction === 'show' && currentTodoIndex !== null"
          class="box"
          :todo="todoStore.getTodoByIndex(currentTodoIndex)"
          @updated="($event) => onTodoUpdate($event, currentTodoIndex)"
          @close="hideContent"
        />
      </div>
    </div>
  </main>
</template>

<style>
.page {
  width: 90%;
  margin-inline: auto;
  overflow-y: scroll;
}

.app-name {
  text-align: left;
  padding: 10px 5%;
}

.container {
  display: grid;
  column-gap: 16px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "list actions";
}

.create-btn {
  margin-bottom: 8px;
}
.container__right {
  grid-area: actions;
}

.todo-img {
  height: 300px;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 800px) {
  .container {
    grid-template-columns: 1fr;
    row-gap: 8px;
    grid-template-areas:
      "actions"
      "list";
  }
}
</style>
