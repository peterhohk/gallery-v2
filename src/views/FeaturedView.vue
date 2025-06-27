<script setup lang="ts">
import { computed, onActivated, onDeactivated, onMounted, ref } from "vue";

import { useArtworks } from "@/data/use";

const artworks = useArtworks();
const featuredArtworks = artworks.filter((artwork) => artwork.isFeatured);

const slideshowTimeoutId = ref<number>(0);
const slideshowArtworkIndex = ref<number>(0);
const slideshowArtwork = computed(() => {
  return featuredArtworks[slideshowArtworkIndex.value];
});

function goToSlide(index: number) {
  slideshowArtworkIndex.value = index;
  clearTimeout(slideshowTimeoutId.value);
  slideshowTimeoutId.value = setTimeout(goToNextSlide, 10000);
}
function goToNextSlide() {
  if (slideshowArtworkIndex.value === featuredArtworks.length - 1) {
    goToSlide(0);
  } else {
    goToSlide(slideshowArtworkIndex.value + 1);
  }
}
function goToPrevSlide() {
  if (slideshowArtworkIndex.value === 0) {
    goToSlide(featuredArtworks.length - 1);
  } else {
    goToSlide(slideshowArtworkIndex.value - 1);
  }
}
function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowLeft":
      goToPrevSlide();
      break;
    case "ArrowRight":
      goToNextSlide();
      break;
  }
}

onMounted(() => {
  slideshowArtworkIndex.value = Math.floor(Math.random() * featuredArtworks.length);
});
onActivated(() => {
  slideshowTimeoutId.value = setTimeout(goToNextSlide, 10000);
  document.addEventListener("keydown", handleKeydown);
});
onDeactivated(() => {
  clearTimeout(slideshowTimeoutId.value);
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <section>
    <h2>Featured Artworks</h2>
    <div class="slideshow">
      <button
        type="button"
        aria-label="Previous featured artwork"
        class="slideshow__nav-button slideshow__nav-button--prev round-button"
        @click="goToPrevSlide"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <Transition name="fade-in" mode="out-in">
        <figure class="slideshow__artwork-figure" :key="slideshowArtwork.id">
          <img
            :src="slideshowArtwork.imageSrc.full"
            :alt="slideshowArtwork.title"
            class="slideshow__artwork-image"
          >
          <figcaption class="slideshow__artwork-title">
            {{ slideshowArtwork.title }}
          </figcaption>
        </figure>
      </Transition>
      <button
        type="button"
        aria-label="Next featured artwork"
        class="slideshow__nav-button slideshow__nav-button--next round-button"
        @click="goToNextSlide"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
    <div class="slideshow-pagination">
      <button
        v-for="(_, n) in featuredArtworks"
        type="button"
        class="slideshow-pagination__button round-button"
        :class="{ 'slideshow-pagination__button--active': slideshowArtworkIndex === n }"
        @click="goToSlide(n)"
      >
      </button>
    </div>
  </section>
</template>

<style scoped>
.slideshow {
  display: grid;
  grid-template-columns: auto minmax(auto, 40rem) auto;
  justify-content: center;
  align-items: center;
  gap: 0.75rem 1rem;
}
.slideshow__nav-button {
  font-size: 2rem;
  width: 1em;
  height: 1em;
}
.slideshow__artwork-figure {
  position: relative;
  display: grid;
  place-items: center;
}
.slideshow__artwork-image {
  aspect-ratio: 1;
  box-shadow: var(--bshadow);
}
.slideshow__artwork-title {
  position: absolute;
  inset: 0;
  margin: auto auto 0.5em auto;
  width: fit-content;
  height: fit-content;
  padding: 0.25em 1em;
  border-radius: 1em;
  background-color: color-mix(in srgb, var(--light-blue) 90%, transparent);
  color: var(--dark-blue);
  text-align: center;
  box-shadow: var(--bshadow);
}
.slideshow-pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}
.slideshow-pagination__button {
  width: 1rem;
  height: 1rem;
}
.slideshow-pagination__button--active {
  background-color: var(--blue);
}
</style>