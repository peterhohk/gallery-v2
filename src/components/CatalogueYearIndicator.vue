<script setup lang="ts">
const props = defineProps<{
  year: number,
}>();
</script>

<template>
  <div class="artwork-catalogue__year-indicator">
    <span class="artwork-catalogue__year-indicator-text">{{ props.year }}</span>
  </div>
</template>

<style scoped>
.artwork-catalogue__year-indicator {
  position: relative;
  isolation: isolate;
  aspect-ratio: 1;
}
.artwork-catalogue__year-indicator::before {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0 auto 0 1.25rem;
  margin: auto;
  width: 3.5rem;
  height: 7rem;
  border-radius: 0 3.5rem 3.5rem 0;
  background-color: var(--light-green);
}
.artwork-catalogue__year-indicator-text {
  position: absolute;
  inset: 0 auto 0 1.5rem;
  margin: auto;
  height: fit-content;
  font-size: 3rem;
  font-weight: bold;
}
</style>