<script setup lang="ts">
import { Artwork } from "@/data/models";

const props = defineProps<{
  artwork: Artwork,
}>();
const emit = defineEmits<{
  (e: "click"): void,
}>();

function handleMiddleClick() {
  window.open(props.artwork.imageSrc.full);
}
</script>

<template>
  <button
    type="button"
    class="artwork-button"
    @click="emit('click')"
    @mousedown.middle.prevent="handleMiddleClick"
  >
    <img
      :src="artwork.imageSrc.thumb"
      :alt="artwork.title"
      loading="lazy"
      class="artwork-button__thumb"
    >
    <div class="artwork-button__overlay">
      <span class="artwork-button__title">{{ artwork.title }}</span>
      <span class="artwork-button__meta">#{{ artwork.orderNumber }}<i class="bi bi-dot"></i>{{ artwork.date }}</span>
      <div class="artwork-button__character-list">
        <i v-if="artwork.characters.includes('ada')" class="artwork-button__character artwork-button__character--ada bi bi-circle-fill"></i>
        <i v-if="artwork.characters.includes('bella')" class="artwork-button__character artwork-button__character--bella bi bi-hexagon-fill"></i>
        <i v-if="artwork.characters.includes('celia')" class="artwork-button__character artwork-button__character--celia bi bi-star-fill"></i>
        <i v-if="artwork.characters.includes('davina')" class="artwork-button__character artwork-button__character--davina bi bi-suit-diamond-fill"></i>
      </div>
    </div>
    <div v-if="artwork.isFeatured" class="artwork-button__feature-wrapper">
      <div class="artwork-button__feature-text-wrapper">
        <span class="artwork-button__feature-text">Featured</span>
      </div>
      <div class="artwork-button__feature-badge-glow"></div>
      <img src="@/assets/img/feature-badge.svg" alt="Featured artwork" class="artwork-button__feature-badge">
    </div>
  </button>
</template>

<style scoped>
.artwork-button {
  position: relative;
  aspect-ratio: 1;
  border: 0.0625rem solid;
  border-radius: 0.5rem;
  transition: translate 0.4s;
}
.artwork-button__thumb {
  width: 100%;
  object-fit: cover;
  border-radius: 0.4375rem;
  pointer-events: none;
}
.artwork-button__overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 0.25rem;
  padding: 0 0.5rem;
  border-radius: 0.4375rem;
  background-color: color-mix(in srgb, var(--dark-green) 70%, transparent);
  color: var(--xlight-green);
  font-weight: bold;
  text-shadow: var(--tshadow);
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.4s, opacity 0.4s;
}
.artwork-button__title {
  line-height: 1;
}
.artwork-button__meta {
  font-size: 0.75rem;
}
.artwork-button__character-list {
  position: absolute;
  inset: auto 0 0.25rem 0;
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  text-shadow:
    0 0.0625rem  var(--xlight-green),
    0 -0.0625rem var(--xlight-green),
    0.0625rem 0  var(--xlight-green),
    -0.0625rem 0 var(--xlight-green);
}
.artwork-button__character--ada {
  color: var(--img-ada3);
}
.artwork-button__character--bella {
  color: var(--img-bella3);
}
.artwork-button__character--celia {
  color: var(--img-celia3);
}
.artwork-button__character--davina {
  color: var(--img-davina3);
}
.artwork-button__feature-wrapper {
  position: absolute;
  inset: 0 0 auto 0;
  pointer-events: none;
}
.artwork-button__feature-text-wrapper {
  position: absolute;
  inset: 0.25rem 2rem auto 0;
  overflow: hidden;
}
.artwork-button__feature-text {
  display: inline-block;
  width: 100%;
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--gold);
  text-transform: uppercase;
  text-shadow: var(--tshadow);
  visibility: hidden;
  translate: -100%;
  transition: visibility 0.4s, translate 0.4s;
}
.artwork-button__feature-badge-glow {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  width: 1rem;
  height: 1rem;
  background-color: var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 1rem 1rem var(--gold);
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.4s, opacity 0.4s;
}
.artwork-button__feature-badge {
  position: absolute;
  top: 0;
  right: 0.25rem;
  width: 2rem;
  height: 2rem;
  max-height: none;
}
.artwork-button:is(:hover, :focus-visible) {
  translate: 0 -1rem;
}
.artwork-button:is(:hover, :focus-visible) .artwork-button__overlay {
  visibility: visible;
  opacity: 1;
}
.artwork-button:is(:hover, :focus-visible) .artwork-button__feature-text {
  visibility: visible;
  translate: none;
}
.artwork-button:is(:hover, :focus-visible) .artwork-button__feature-badge-glow {
  visibility: visible;
  opacity: 1;
}
</style>