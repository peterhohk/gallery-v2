<script setup lang="ts">
import { computed, onActivated, onDeactivated, ref } from "vue";

import { Artwork } from "@/data/models";
import { useArtworks } from "@/data/use";
import { howLongAgo } from "@/util";

const props = defineProps<{
  lightboxArtworkIndex: number,
  lightboxArtworks: Artwork[],
}>();
const emit = defineEmits<{
  (e: "close"): void,
  (e: "next"): void,
  (e: "prev"): void,
}>();

const artworks = useArtworks();

const lightboxArtwork = computed(() => {
  return props.lightboxArtworks[props.lightboxArtworkIndex];
});
const isInfoExpanded = ref<boolean>(false);

function toggleInfoExpanded() {
  isInfoExpanded.value = !isInfoExpanded.value;
}
function openOriginal() {
  window.open(lightboxArtwork.value.imageSrc.full);
}
function handleClick(event: MouseEvent) {
  if (event.target === document.querySelector(".lightbox") || event.target === document.querySelector(".lightbox__artwork-figure")) {
    emit("close");
  }
}
function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowLeft":
      emit("prev");
      break;
    case "ArrowRight":
      emit("next");
      break;
    case "i":
    case "I":
      toggleInfoExpanded();
      break;
    case "o":
    case "O":
      openOriginal();
      break;
    case "Escape":
      emit("close");
      break;
  }
}

onActivated(() => {
  document.addEventListener("keydown", handleKeydown);
});
onDeactivated(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="lightbox" @mousedown="handleClick">
    <figure class="lightbox__artwork-figure" :key="lightboxArtwork.id">
      <img
        :src="lightboxArtwork.imageSrc.full"
        :alt="lightboxArtwork.title"
        loading="lazy"
        class="lightbox__artwork-image"
      >
      <figcaption
        class="lightbox__artwork-info"
        :class="{ 'lightbox__artwork-info--expanded': isInfoExpanded }"
      >
        <h3 class="lightbox__artwork-title">{{ lightboxArtwork.title }}</h3>
        <p><i class="bi bi-hash"></i> {{ lightboxArtwork.orderNumber }}/{{ artworks.length }}</p>
        <p><i class="bi bi-calendar4-event"></i> {{ lightboxArtwork.date }}</p>
        <p><i class="bi bi-clock-history"></i> {{ howLongAgo(new Date(lightboxArtwork.date)) }}</p>
        <hr>
        <p>{{ lightboxArtwork.caption }}</p>
      </figcaption>
    </figure>
    <div v-if="lightboxArtworks.length > 1" class="lightbox__button-wrapper lightbox__button-wrapper--prev">
      <button
        type="button"
        class="lightbox__button round-button"
        @click="emit('prev')"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <span class="lightbox__button-label lightbox__button-label--prev">
        Newer Artwork (Left)
      </span>
    </div>
    <div v-if="lightboxArtworks.length > 1" class="lightbox__button-wrapper lightbox__button-wrapper--next">
      <button
        type="button"
        class="lightbox__button round-button"
        @click="emit('next')"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
      <span class="lightbox__button-label lightbox__button-label--next">
        Older Artwork (Right)
      </span>
    </div>
    <div class="lightbox__button-wrapper lightbox__button-wrapper--info">
      <button
        type="button"
        class="lightbox__button round-button"
        @click="toggleInfoExpanded"
      >
        <i class="bi bi-file-earmark-text"></i>
      </button>
      <span class="lightbox__button-label lightbox__button-label--info">
        Artwork Info (I)
      </span>
    </div>
    <div class="lightbox__button-wrapper lightbox__button-wrapper--orig">
      <button
        type="button"
        class="lightbox__button round-button"
        @click="openOriginal"
      >
        <i class="bi bi-arrows-angle-expand"></i>
      </button>
      <span class="lightbox__button-label lightbox__button-label--orig">
        Open Original (O)
      </span>
    </div>
    <div class="lightbox__button-wrapper lightbox__button-wrapper--close">
      <button
        type="button"
        class="lightbox__button round-button"
        @click="emit('close')"
      >
        <i class="bi bi-x-lg"></i>
      </button>
      <span class="lightbox__button-label lightbox__button-label--close">
        Close Lightbox (Esc)
      </span>
    </div>
  </div>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: grid;
  grid-template-areas:
    ".    .     close"
    "prev image next"
    "info .     orig";
  grid-template-columns: 3rem minmax(0, 1fr) 3rem;
  grid-template-rows: 3rem minmax(0, 1fr) 3rem;
  place-items: center;
  background-color: hsl(0 0% 0% / 0.8);
}
.lightbox__artwork-figure {
  grid-area: image;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.lightbox__artwork-info {
  position: absolute;
  bottom: -0.125rem;
  left: -0.125rem;
  width: min(32rem, calc(100% + 0.25rem));
  padding: 1rem 1rem 2rem 1rem;
  border-radius: 2rem 2rem 2rem 0;
  background-color: color-mix(in srgb, var(--xlight-green) 90%, transparent);
  box-shadow: var(--bshadow);
  visibility: hidden;
  scale: 0;
  transform-origin: bottom left;
  transition: visibility 0.4s, scale 0.4s;
}
.lightbox__artwork-info::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: -0.5rem;
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: color-mix(in srgb, var(--xlight-green) 90%, transparent);
  clip-path: polygon(50% 0%, 50% 50%, 100% 50%, 12.5% 87.5%);
}
.lightbox__artwork-info--expanded {
  visibility: visible;
  scale: none;
}
.lightbox__artwork-title {
  width: fit-content;
  padding: 0.25em 0.5em;
  border-radius: 1em;
  background-color: var(--dark-green);
  color: var(--xlight-green);
  font-size: 1.25rem;
  font-weight: normal;
  line-height: 1;
}
.lightbox__button-wrapper {
  position: relative;
}
.lightbox__button-wrapper--prev {
  grid-area: prev;
}
.lightbox__button-wrapper--next {
  grid-area: next;
}
.lightbox__button-wrapper--info {
  grid-area: info;
}
.lightbox__button-wrapper--orig {
  grid-area: orig;
}
.lightbox__button-wrapper--close {
  grid-area: close;
}
.lightbox__button {
  font-size: 2.5rem;
  width: 1em;
  height: 1em;
  opacity: 0.3;
  box-shadow: var(--bshadow);
  transition: background-color 0.4s, color 0.4s, opacity 0.4s;
}
.lightbox__button:is(:hover, :focus-visible) {
  opacity: 1;
}
.lightbox__button-label {
  position: absolute;
  inset: 0 auto;
  margin: auto;
  width: max-content;
  height: fit-content;
  padding: 0.5em 1em;
  border-radius: 1000em;
  background-color: var(--dark-green);
  color: var(--xlight-green);
  box-shadow: var(--bshadow);
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.4s, opacity 0.4s;
}
.lightbox__button-label--prev,
.lightbox__button-label--info {
  left: calc(100% + 0.25rem);
}
.lightbox__button-label--next,
.lightbox__button-label--orig,
.lightbox__button-label--close {
  right: calc(100% + 0.25rem);
}
.lightbox__button:is(:hover, :focus-visible) + .lightbox__button-label {
  visibility: visible;
  opacity: 1;
}
</style>