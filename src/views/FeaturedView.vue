<script setup lang="ts">
import { useArtworks } from "@/data/use";
import { preloadImage } from "@/util";
import { computed, onActivated, onDeactivated, ref, watch } from "vue";

const artworks = useArtworks();
const featuredArtworks = artworks.filter((artwork) => artwork.isFeatured);

const slideshowTimeoutId = ref<number>(0);
const slideshowArtworkIndex = ref<number>(Math.floor(Math.random() * featuredArtworks.length));
const slideshowArtwork = computed(() => {
  return featuredArtworks[slideshowArtworkIndex.value];
});
const prevArtworkIndex = computed(() => {
  return slideshowArtworkIndex.value === 0 ? featuredArtworks.length - 1 : slideshowArtworkIndex.value - 1;
});
const prevArtwork = computed(() => {
  return featuredArtworks[prevArtworkIndex.value];
});
const nextArtworkIndex = computed(() => {
  return slideshowArtworkIndex.value === featuredArtworks.length - 1 ? 0 : slideshowArtworkIndex.value + 1;
});
const nextArtwork = computed(() => {
  return featuredArtworks[nextArtworkIndex.value];
});

function preloadImages(): void {
  preloadImage(slideshowArtwork.value.imageSrc.full);
  preloadImage(prevArtwork.value.imageSrc.full);
  preloadImage(nextArtwork.value.imageSrc.full);
}
function goToSlide(index: number): void {
  slideshowArtworkIndex.value = index;
  clearTimeout(slideshowTimeoutId.value);
  slideshowTimeoutId.value = setTimeout(goToNextSlide, 10000);
}
function goToPrevSlide(): void {
  goToSlide(prevArtworkIndex.value);
}
function goToNextSlide(): void {
  goToSlide(nextArtworkIndex.value);
}
function handleKeydown(event: KeyboardEvent): void {
  switch (event.key) {
    case "ArrowLeft":
      goToPrevSlide();
      break;
    case "ArrowRight":
      goToNextSlide();
      break;
  }
}

watch(slideshowArtworkIndex, () => {
  preloadImages();
});

onActivated(() => {
  preloadImages();
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
      <Transition
        v-for="artwork in featuredArtworks"
        :key="artwork.id"
        v-show="artwork === slideshowArtwork"
        name="fade-in"
        mode="out-in"
      >
        <figure class="slideshow__artwork-figure">
          <img
            :src="artwork.imageSrc.full"
            :alt="artwork.title"
            loading="lazy"
            class="slideshow__artwork-image"
          >
          <figcaption class="slideshow__artwork-title">
            {{ artwork.title }}
          </figcaption>
        </figure>
      </Transition>
      <button
        type="button"
        aria-label="Previous featured artwork"
        class="slideshow__nav-button slideshow__nav-button--prev round-button"
        @click="goToPrevSlide"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
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
        v-for="(artwork, index) in featuredArtworks"
        :key="artwork.id"
        type="button"
        class="slideshow-pagination__button round-button"
        :class="{ 'slideshow-pagination__button--active': slideshowArtworkIndex === index }"
        :aria-label="`Jump to artwork ${artwork.title}`"
        @click="goToSlide(index)"
      >
      </button>
    </div>
  </section>
</template>

<style scoped>
.slideshow {
  display: grid;
  grid-template-columns: auto minmax(auto, 40rem) auto;
  grid-template-areas: "prev figure next";
  justify-content: center;
  align-items: center;
  gap: 0.75rem 1rem;
}
.slideshow__artwork-figure {
  grid-area: figure;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
}
.slideshow__nav-button {
  font-size: 2rem;
  width: 1em;
  height: 1em;
}
.slideshow__nav-button--prev {
  grid-area: prev;
}
.slideshow__nav-button--next {
  grid-area: next;
}
.slideshow__artwork-image {
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
