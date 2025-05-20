<script setup lang="ts">
import { computed, ref } from "vue";
import CharacterDetails from "@/components/CharacterDetails.vue";
import CharacterDetailsDefault from "@/components/CharacterDetailsDefault.vue";

import type { CharacterId } from "@/data/models";
import { useCharacters } from "@/data/use";

const characters = useCharacters();

const selectedCharacterId = ref<CharacterId | null>(null);
const selectedCharacter = computed(() => {
  return characters.find((character) => character.id === selectedCharacterId.value) ?? null;
});

function switchToCharacter(id: CharacterId) {
  selectedCharacterId.value = id;
}
</script>

<template>
  <section>
    <h2>Character Introduction</h2>
    <Transition name="fade-in" mode="out-in">
      <CharacterDetailsDefault
        v-if="selectedCharacterId === null || selectedCharacter === null"
      />
      <CharacterDetails
        v-else
        :selected-character="selectedCharacter"
        :key="selectedCharacterId"
      />
    </Transition>
    <div class="character-nav">
      <button
        type="button"
        class="character-nav__button character-nav__button--ada"
        @click="switchToCharacter('ada')"
      >
        <img src="@/assets/img/characters/thumb-ada.png" alt="Select character Ada" class="character-nav__button-thumb">
      </button>
      <button
        type="button"
        class="character-nav__button character-nav__button--bella"
        @click="switchToCharacter('bella')"
      >
        <img src="@/assets/img/characters/thumb-bella.png" alt="Select character Bella" class="character-nav__button-thumb">
      </button>
      <button
        type="button"
        class="character-nav__button character-nav__button--celia"
        @click="switchToCharacter('celia')"
      >
        <img src="@/assets/img/characters/thumb-celia.png" alt="Select character Celia" class="character-nav__button-thumb">
      </button>
      <button
        type="button"
        class="character-nav__button character-nav__button--davina"
        @click="switchToCharacter('davina')"
      >
        <img src="@/assets/img/characters/thumb-davina.png" alt="Select character Davina" class="character-nav__button-thumb">
      </button>
    </div>
  </section>
</template>

<style scoped>
.character-nav {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  gap: 0.25rem;
}
.character-nav__button {
  aspect-ratio: 1;
  max-width: 8rem;
  border: 0.25rem solid;
  border-radius: 50%;
  transition: translate 0.4s
}
.character-nav__button--ada {
  border-color: var(--img-ada3);
}
.character-nav__button--bella {
  border-color: var(--img-bella3);
}
.character-nav__button--celia {
  border-color: var(--img-celia3);
}
.character-nav__button--davina {
  border-color: var(--img-davina3);
}
.character-nav__button:is(:hover, :focus-visible) {
  translate: 0 -1rem;
}
.character-nav__button-thumb {
  border-radius: 50%;
}
</style>
