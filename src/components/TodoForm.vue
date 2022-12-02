<template>
  <div>
    <h2 class="title is-4">{{ formTitle }}</h2>
    <BaseField label="Title">
      <input
        v-model="state.todo.title"
        class="input"
        type="text"
        placeholder="Enter Title"
        @blur="($e) => validate($e)"
      />
    </BaseField>
    <BaseField label="Priority">
      <div class="select">
        <select v-model="state.todo.priority">
          <option
            v-for="priority in prioritiesList"
            :key="priority.label"
            :value="priority.label"
          >
            {{ priority.label }}
          </option>
        </select>
      </div>
    </BaseField>
    <BaseField label="Subtitle">
      <input
        v-model="state.todo.subTitle"
        class="input"
        type="text"
        placeholder="Enter Subtitle"
      />
    </BaseField>
    <BaseField label="Description">
      <textarea
        v-model="state.todo.description"
        class="textarea"
        placeholder="Enter Description"
      ></textarea>
    </BaseField>
    <BaseField label="Notes">
      <input
        v-model="state.todo.notes"
        class="input"
        type="text"
        placeholder="Enter Notes"
        @keyup.enter="onCreateTodo"
      />
    </BaseField>

    <div class="subtask-list">
      <div class="subtask-list__header">
        <p class="title is-6">Sub Tasks</p>
        <BaseButton class="is-success is-small" icon="plus" @click="addSubTask">
          <span> Add subtask </span></BaseButton
        >
      </div>

      <template v-if="state.todo.subTasks">
        <div
          v-for="(subtask, index) in state.todo.subTasks"
          :key="index"
          class="subtask"
        >
          <input
            v-model="subtask.title"
            type="text"
            class="input"
            placeholder="Enter subtask"
          />
          <BaseButton
            class="is-danger"
            icon="trash"
            @click="onSubtaskDelete"
          ></BaseButton>
        </div>
      </template>
    </div>
    <BaseButton class="is-success mr-2" icon="save" @click="onSaveTodo">
      <span> Save </span></BaseButton
    >
    <BaseButton class="is-secondary" @click="emit('close')"> Close</BaseButton>
  </div>
</template>
<script setup>
import { reactive, defineEmits, watch, computed } from "vue";
import { prioritiesList, blankTodo } from "../services/todo";
import { deepCopy } from "@/utils/deep-copy";
import BaseField from "./BaseField.vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(["close", "update", "create"]);
const props = defineProps({
  todoToUpdate: {
    type: Object,
    required: false,
    default: null,
    validator(val) {
      console.log({ val });
      return val.index > -1 && val.todo;
    },
  },
});

const state = reactive({
  todo: blankTodo(),
});
const addSubTask = () =>
  state.todo.subTasks.push({ title: "", completed: false });
const onSubtaskDelete = (index) => state.todo.subTasks.splice(index, 1);

const onSaveTodo = () => {
  if (!state.todo.title) {
    alert("please enter title");
    return;
  }
  let currentTodo = deepCopy(state.todo);
  currentTodo = removeEmptySubtasks(currentTodo);
  if (props.todoToUpdate?.index > -1) {
    emit("update", {
      todo: currentTodo,
      index: props.todoToUpdate.index,
    });
  } else {
    emit("create", { todo: currentTodo });
    state.todo = blankTodo();
  }
};

const formTitle = computed(() =>
  props.todoToUpdate ? "Update Todo" : "Create Todo"
);

const removeEmptySubtasks = (todo) => {
  todo.subTasks = todo.subTasks.filter((todo) => todo.title);
  return todo;
};

watch(
  () => props.todoToUpdate,
  () => {
    if (props.todoToUpdate) {
      state.todo = deepCopy(props.todoToUpdate.todo);
    } else {
      state.todo = blankTodo();
    }
  },
  { immediate: true }
);

const validate = (event) => {
  if (event.target.value === "") {
    event.target.classList.add("is-danger");
  } else {
    event.target.classList.remove("is-danger");
  }
};
</script>
<style scoped>
.subtask-list__header,
.subtask {
  display: flex;
  justify-content: space-between;
  column-gap: 16px;
  margin: 5px 0;
}
</style>
