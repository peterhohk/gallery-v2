<template>
  <article class="character-details character-details--default" >
    <h3 class="character-details__default-text">Select a character!</h3>
  </article>
</template>

<style scoped>
.character-details {
  position: relative;
  isolation: isolate;
  padding: 1rem;
  margin: auto;
  max-width: 64rem;
  min-height: 37.5rem;
  color: var(--img4);
}
.character-details::before {
  display: block;
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border: 0.25rem dashed var(--img3);
  border-radius: 1rem;
  background-color: var(--img1);
}
.character-details--default {
  --img1: var(--xlight-green);
  --img2: var(--light-green);
  --img3: var(--green);
  --img4: var(--dark-green);
}
.character-details__default-text {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  font-size: 2rem;
  white-space: nowrap;
}
@media (min-width: 48rem) {
  .character-details::before {
    top: 6.5rem;
  }
  .character-details__default-text {
    top: 6rem;
  }
}
</style>