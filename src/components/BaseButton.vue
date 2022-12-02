<template>
  <button class="button">
    <span v-if="icon" class="icon"
      ><i class="las" :class="['la-' + icon]"></i
    ></span>
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang=""></style>
