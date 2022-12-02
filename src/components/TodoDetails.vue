<template>
  <div class="content">
    <div class="row">
      <h2 class="title is-3">{{ todo.title }}</h2>
      <BaseButton
        style="margin-left: auto"
        icon="times"
        @click="emit('close')"
      ></BaseButton>
    </div>
    <div class="row">
      <div>
        <h3 class="title is-4 subtitle">{{ todo.subTitle }}</h3>
        <p
          class="tag"
          :style="{ backgroundColor: priorityColor[todo.priority] }"
        >
          {{ todo.priority }}
        </p>
      </div>

      <div class="field">
        <label class="label">Status</label>
        <div class="control select">
          <select @change="onStatusChange">
            <option
              v-for="status in statusList"
              :key="status"
              :selected="todo.status === status"
              :value="status"
            >
              {{ status }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <p>
      {{ todo.description }}
    </p>
    <p>
      <strong>Notes</strong>: {{ todo.notes }}
    </p>
    <strong>Sub tasks</strong>
    <div class="table table-striped">
      <div
        v-for="(subTask, index) in todo.subTasks"
        :key="'subtask' + index"
        class="subtask"
      >
        <p :class="[subTask.completed ? 'subtask--completed' : '']">
          {{ subTask.title }}
        </p>

        <div>
          <button
            class="button is-primary is-icon"
            @click="onToggleSubtask(index)"
          >
            <span class="icon"
              ><i
                class="las"
                :class="[subTask.completed ? 'la-times' : 'la-check']"
              ></i
            ></span>
          </button>
          <button
            class="button is-danger is-icon"
            @click="onDeleteSubtask(index)"
          >
            <span class="icon"><i class="las la-trash"></i></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { priorityColor, statusList } from "../services/todo";
import { deepCopy } from "@/utils/deep-copy";
import BaseButton from "./BaseButton.vue";
const emit = defineEmits(["updated"]);
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const onStatusChange = ($event) =>
  emit("updated", { ...props.todo, status: $event.target.value });

const onToggleSubtask = (index) => {
  const currentTodo = deepCopy(props.todo);
  currentTodo.subTasks[index].completed =
    !currentTodo.subTasks[index].completed;
  emit("updated", currentTodo);
};

const onDeleteSubtask = (index) => {
  const currentTodo = deepCopy(props.todo);
  currentTodo.subTasks.splice(index, 1);
  emit("updated", currentTodo);
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.title,
.subtitle {
  width: 85%;
  margin: 5px 0;
  text-transform: capitalize;
}
.subtask {
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  margin: 3px 0;
  border-bottom: 1px solid lightgrey;
  padding: 3px;
}
.subtask--completed {
  text-decoration: line-through;
}
</style>
