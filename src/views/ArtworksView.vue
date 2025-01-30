<script setup lang="ts">
import { computed, ref } from "vue";
import CatalogueArtworkButton from "@/components/CatalogueArtworkButton.vue";
import CatalogueYearIndicator from "@/components/CatalogueYearIndicator.vue";
import ArtworkLightbox from "@/components/ArtworkLightbox.vue";

import type { Artwork, ArtworkCategory, CharacterId } from "@/data/types";
import { useArtworks } from "@/data/use";

type FilterOptions = {
  isFeaturedOnly: boolean,
  includeCharacterIds: CharacterId[],
  excludeCharacterIds: CharacterId[],
  category: ArtworkCategory | "all" | "outfit-all" | "outfit-scw-all",
  isShowYearIndicators: boolean,
};
type ArtworkButtonData = {
  type: "artwork-button",
  artwork: Artwork,
  artworkIndex: number,
};
type YearIndicatorData = {
  type: "year-indicator",
  year: number,
}
type CatalogueItemData = ArtworkButtonData | YearIndicatorData;

const artworks = useArtworks();

const filters = ref<FilterOptions>({
  isFeaturedOnly: false,
  includeCharacterIds: [],
  excludeCharacterIds: [],
  category: "all",
  isShowYearIndicators: false,
});
const filteredArtworks = computed(() => {
  const output = [] as Artwork[];
  for (const artwork of artworks) {
    if (filters.value.isFeaturedOnly && !artwork.isFeatured) {
      continue;
    }
    if (!filters.value.includeCharacterIds.every((characterId) => artwork.characters.includes(characterId))) {
      continue;
    }
    if (filters.value.excludeCharacterIds.some((characterId) => artwork.characters.includes(characterId))) {
      continue;
    }
    if (filters.value.category !== "all") {
      if (filters.value.category === "outfit-all") {
        if (!artwork.category.startsWith("outfit")) {
          continue;
        }
      } else if (filters.value.category === "outfit-scw-all") {
        if (!artwork.category.startsWith("outfit-scw")) {
          continue;
        }
      } else {
        if (artwork.category !== filters.value.category) {
          continue;
        }
      }
    }
    output.push(artwork);
  }
  return output;
});
const catalogueItems = computed(() => {
  const output = [] as CatalogueItemData[];
  if (filteredArtworks.value.length === 0) {
    return output;
  }
  let indicatorYear = Infinity;
  for (const [index, artwork] of filteredArtworks.value.entries()) {
    if (filters.value.isShowYearIndicators) {
      const artworkYear = new Date(artwork.date).getFullYear();
      if (artworkYear !== indicatorYear) {
        indicatorYear = artworkYear;
        output.push({ type: "year-indicator", year: indicatorYear });
      }
    }
    output.push({ type: "artwork-button", artwork: artwork, artworkIndex: index });
  }
  return output;
});
const isLightboxActive = ref<boolean>(false);
const lightboxArtworkIndex = ref<number>(0);

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
        <dt class="artwork-filter__label">Must include:</dt>
        <dd>
          <ul class="artwork-filter__inline-list">
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="ada"> Ada</label></li>
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="bella"> Bella</label></li>
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="celia"> Celia</label></li>
            <li><label><input type="checkbox" v-model="filters.includeCharacterIds" value="davina"> Davina</label></li>
          </ul>
        </dd>
        <dt class="artwork-filter__label">Must exclude:</dt>
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
        <dt class="artwork-filter__label">View</dt>
        <dd>
          <label><input type="checkbox" v-model="filters.isShowYearIndicators"> Show year indicators</label>
        </dd>
      </dl>
    </form>
    <div class="artwork-catalogue">
      <span
        v-if="catalogueItems.length === 0"
        class="artwork-catalogue__empty-message"
      >
        No artwork found.
      </span>
      <template v-else>
        <template v-for="item in catalogueItems">
          <CatalogueYearIndicator
            v-if="item.type === 'year-indicator'"
            :year="item.year"
          />
          <CatalogueArtworkButton
            v-if="item.type === 'artwork-button'"
            :tabindex="isLightboxActive ? -1 : 0"
            :artwork="item.artwork"
            @click="openLightbox(item.artworkIndex)"
          />
        </template>
      </template>
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