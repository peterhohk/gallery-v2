<script setup lang="ts">
import type { Artwork } from "@/models/artwork";
import { RiCircleFill, RiHexagonFill, RiPokerDiamondsFill, RiStarFill } from "@remixicon/vue";

const { artwork } = defineProps<{
  artwork: Artwork,
}>();
const emit = defineEmits<{
  (e: "view"): void,
}>();

function openOriginal(): void {
  window.open(artwork.imageSrc.full);
}
</script>

<template>
  <button
    type="button"
    class="artwork-button"
    @click="emit('view')"
    @mousedown.middle.prevent="openOriginal"
  >
    <img
      :src="artwork.imageSrc.thumb"
      :alt="artwork.title"
      loading="lazy"
      class="artwork-button__thumb"
    >
    <div class="artwork-button__overlay">
      <span class="artwork-button__title">{{ artwork.title }}</span>
      <span class="artwork-button__meta">#{{ artwork.orderNumber }} · {{ artwork.date }}</span>
      <div class="artwork-button__character-list">
        <RiCircleFill v-if="artwork.characters.includes('ada')" color="var(--img-ada3)" class-name="artwork-button__character-item" />
        <RiHexagonFill v-if="artwork.characters.includes('bella')" color="var(--img-bella3)" class-name="artwork-button__character-item" style="rotate: 90deg;" />
        <RiStarFill v-if="artwork.characters.includes('celia')" color="var(--img-celia3)" class-name="artwork-button__character-item" />
        <RiPokerDiamondsFill v-if="artwork.characters.includes('davina')" color="var(--img-davina3)" class-name="artwork-button__character-item" />
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
  padding: 0 0.25rem;
  border-radius: 0.4375rem;
  background-color: alpha(from var(--green-700) / 70%);
  color: var(--green-200);
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
  gap: 0.125rem;
}
.artwork-button__character-item > * {
  stroke-width: 0.125rem;
  stroke: var(--green-200);
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
