<script setup lang="ts">
import { computed, onDeactivated, ref } from "vue";
import ArtworkButton from "@/components/ArtworkButton.vue";
import ArtworkLightbox from "@/components/ArtworkLightbox.vue";

import type { ArtworkCategory, CharacterId } from "@/data/models";
import { Artwork } from "@/data/models";
import { useArtworks } from "@/data/use";

type FilterOptions = {
  isFeaturedOnly: boolean,
  includeCharacterIds: CharacterId[],
  excludeCharacterIds: CharacterId[],
  category: ArtworkCategory | "all" | "outfit-all" | "outfit-scw-all",
};
const artworks = useArtworks();

const filters = ref<FilterOptions>({
  isFeaturedOnly: false,
  includeCharacterIds: [],
  excludeCharacterIds: [],
  category: "all",
});
const filteredArtworks = computed(() => {
  return artworks.filter((artwork) => shouldIncludeArtwork(artwork));
});
const isLightboxActive = ref<boolean>(false);
const lightboxArtworkIndex = ref<number>(0);

function shouldIncludeArtwork(artwork: Artwork) {
  if (filters.value.isFeaturedOnly && !artwork.isFeatured) {
    return false;
  }
  if (!filters.value.includeCharacterIds.every((characterId) => artwork.characters.includes(characterId))) {
    return false;
  }
  if (filters.value.excludeCharacterIds.some((characterId) => artwork.characters.includes(characterId))) {
    return false;
  }
  if (filters.value.category !== "all") {
    if (filters.value.category === "outfit-all") {
      if (!artwork.category.startsWith("outfit")) {
        return false;
      }
    } else if (filters.value.category === "outfit-scw-all") {
      if (!artwork.category.startsWith("outfit-scw")) {
        return false;
      }
    } else {
      if (artwork.category !== filters.value.category) {
        return false;
      }
    }
  }
  return true;
}
function resetFilters() {
  filters.value.isFeaturedOnly = false;
  filters.value.includeCharacterIds = [];
  filters.value.excludeCharacterIds = [];
  filters.value.category = "all";
}
function openLightbox(index: number) {
  isLightboxActive.value = true;
  lightboxArtworkIndex.value = index;
}
function closeLightbox() {
  isLightboxActive.value = false;
}
function goToNextSlide() {
  if (lightboxArtworkIndex.value === filteredArtworks.value.length - 1) {
    lightboxArtworkIndex.value = 0;
  } else {
    lightboxArtworkIndex.value = lightboxArtworkIndex.value + 1;
  }
}
function goToPrevSlide() {
  if (lightboxArtworkIndex.value === 0) {
    lightboxArtworkIndex.value = filteredArtworks.value.length - 1;
  } else {
    lightboxArtworkIndex.value = lightboxArtworkIndex.value - 1;
  }
}

onDeactivated(() => {
  closeLightbox();
});
</script>

<template>
  <section>
    <h2>Artwork Catalogue</h2>
    <form class="artwork-filter">
      <h3 class="artwork-filter__heading"><i class="bi bi-funnel"></i> Filters</h3>
      <dl class="artwork-filter__body">
        <dt class="artwork-filter__label">Featured:</dt>
        <dd>
          <label><input type="checkbox" v-model="filters.isFeaturedOnly"> Show featured artworks only</label>
        </dd>
        <dt class="artwork-filter__label">Include:</dt>
        <dd>
          <ul class="artwork-filter__inline-list">
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="ada"> Ada</label></li>
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="bella"> Bella</label></li>
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="celia"> Celia</label></li>
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="davina"> Davina</label></li>
          </ul>
        </dd>
        <dt class="artwork-filter__label">Exclude:</dt>
        <dd>
          <ul class="artwork-filter__inline-list">
            <li><label><input type="checkbox" v-model="filters.excludeCharacterIds" value="ada"> Ada</label></li>
            <li><label><input type="checkbox" v-model="filters.excludeCharacterIds" value="bella"> Bella</label></li>
            <li><label><input type="checkbox" v-model="filters.excludeCharacterIds" value="celia"> Celia</label></li>
            <li><label><input type="checkbox" v-model="filters.excludeCharacterIds" value="davina"> Davina</label></li>
          </ul>
        </dd>
        <dt class="artwork-filter__label">Category:</dt>
        <dd>
          <select class="artwork-filter__select" v-model="filters.category">
            <option value="all">All</option>
            <optgroup label="Outfit Designs">
              <option value="outfit-all">Outfit Design - All</option>
              <option value="outfit-vu">Outfit Design - Uniform</option>
              <option value="outfit-scw-all">Outfit Design - Seasonal Casual Wear - All Seasons</option>
              <option value="outfit-scw-spring">Outfit Design - Seasonal Casual Wear - Spring</option>
              <option value="outfit-scw-summer">Outfit Design - Seasonal Casual Wear - Summer</option>
              <option value="outfit-scw-autumn">Outfit Design - Seasonal Casual Wear - Autumn</option>
              <option value="outfit-scw-winter">Outfit Design - Seasonal Casual Wear - Winter</option>
              <option value="outfit-tcw">Outfit Design - Themed Casual Wear</option>
              <option value="outfit-s">Outfit Design - Swimsuit</option>
              <option value="outfit-u">Outfit Design - Underwear</option>
              <option value="outfit-v">Outfit Design - Variety</option>
            </optgroup>
            <optgroup label="Other">
              <option value="chibi">Chibi Batch</option>
              <option value="pocky">Pocky Day</option>
              <option value="random">Random</option>
            </optgroup>
          </select>
        </dd>
      </dl>
      <hr>
      <button
        type="button"
        class="artwork-filter__reset-button"
        @click="resetFilters"
      >
        reset
      </button>
    </form>
    <div class="artwork-catalogue">
      <span
        v-if="filteredArtworks.length === 0"
        class="artwork-catalogue__empty-message"
      >
        No artwork found.
      </span>
      <ArtworkButton
        v-else
        v-for="artwork in artworks"
        :key="artwork.id"
        v-show="shouldIncludeArtwork(artwork)"
        :tabindex="isLightboxActive ? -1 : 0"
        :artwork="artwork"
        @view="openLightbox(filteredArtworks.indexOf(artwork))"
      />
    </div>
    <Teleport to="body">
      <Transition name="fade-both" mode="out-in">
        <KeepAlive>
          <ArtworkLightbox
            v-if="isLightboxActive"
            :lightbox-artwork-index="lightboxArtworkIndex"
            :lightbox-artworks="filteredArtworks"
            @close="closeLightbox"
            @next="goToNextSlide"
            @prev="goToPrevSlide"
          />
        </KeepAlive>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.artwork-filter {
  position: relative;
  width: fit-content;
  margin-top: 1rem;
  margin-inline: auto;
  padding: 1rem 0.75rem 0.5rem;
  border: 0.0625rem dashed;
  border-radius: 1rem;
  background-color: var(--xlight-green);
}
.artwork-filter__heading {
  position: absolute;
  top: -0.75rem;
  left: 0.75rem;
  padding: 0.125em 0.5em;
  border-radius: 1em;
  background-color: var(--dark-green);
  color: var(--xlight-green);
  font-size: 1rem;
}
.artwork-filter__body {
  display: grid;
  gap: 0.125rem 1rem;
}
.artwork-filter__label {
  font-weight: bold;
}
.artwork-filter__inline-list {
  display: flex;
  gap: 0.5em;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.artwork-filter__select {
  display: block;
  max-width: 12rem;
  height: 1.25rem;
}
.artwork-filter__reset-button {
  display: block;
  margin-left: auto;
  padding-inline: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  transition: background-color 0.4s, color 0.4s;
}
.artwork-filter__reset-button:is(:hover, :focus-visible) {
  background-color: var(--light-blue);
  color: var(--blue);
}
.artwork-catalogue {
  display: grid;
  grid-template-columns: repeat(auto-fit, 9rem);
  justify-content: center;
  gap: 0.25rem;
  margin: 0.5rem;
}
.artwork-catalogue__empty-message {
  grid-column: 1 / -1;
  margin-block: 1rem;
  font-weight: bold;
  text-align: center;
}
@media (min-width: 36rem) {
  .artwork-filter__body {
    grid-template-columns: repeat(2, auto);
  }
}
</style>