<template>
  <div
    v-if="todo"
    class="todo"
    :class="[todo.status === doneStatus ? 'todo--completed' : '']"
  >
    <div class="content">
      <p class="title">
        {{ todo.title.substr(0, 30) }}{{ todo.title.length > 30 ? "..." : "" }}
      </p>

      <p class="subtitle">
        {{ todo.subTitle.substr(0, 40)
        }}{{ todo.subTitle.length > 40 ? "..." : "" }}
      </p>
    </div>
    <div class="select status" @click.stop>
      <select
        @change="
          ($event) => $emit('updated', { ...todo, status: $event.target.value })
        "
      >
        <option
          v-for="status in statusList"
          :key="status"
          :selected="todo.status === status"
        >
          {{ status }}
        </option>
      </select>
    </div>

    <p
      v-if="todo.priority"
      class="tag"
      :style="{ backgroundColor: priorityColor[todo.priority] }"
    >
      {{ todo.priority }}
    </p>

    <div class="field has-addons todo__actions">
      <div class="control">
        <BaseButton
          class="is-medium is-warning"
          icon="edit"
          @click.stop="$emit('edit')"
        ></BaseButton>
      </div>
      <div class="control">
        <BaseButton
          class="is-medium is-danger"
          icon="trash"
          @click.stop="$emit('remove')"
        ></BaseButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { priorityColor, doneStatus, statusList } from "../services/todo";
import BaseButton from "./BaseButton.vue";
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

defineEmits(["updated", "remove", "edit"]);
</script>
<style scoped>
.todo {
  display: grid;
  grid-template-columns: 1fr 120px auto;
  column-gap: 16px;
  background-color: white;
  padding: 5px 20px;
  border-radius: 5px;
  margin-bottom: 8px;
  min-height: 80px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  grid-template-areas:
    "title status actions"
    "title tag actions";
}

.todo--completed .title,
.todo--completed .subtitle {
  text-decoration: line-through;
}
.todo:hover {
  transform: scale(1.01);
}
.todo:active {
  transform: scale(0.99);
}
.subtitle {
  font-size: 14px;
  color: rgb(143, 142, 142);
}
.title {
  font-size: 24px;
  font-weight: 800;
  text-transform: capitalize;
}
.content {
  grid-area: title;
}
.tag {
  grid-area: tag;
}
.status {
  grid-area: status;
}

.todo__actions {
  grid-area: actions;

  align-items: center;
}
@media screen and (max-width: 500px) {
  .todo {
    grid-template-columns: 1fr 120px;
    min-height: 120px;
    grid-template-areas:
      "title actions"
      "title status"
      "title tag";
  }
}
</style>
