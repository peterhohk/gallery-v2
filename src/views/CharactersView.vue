<script setup lang="ts">
import { ref } from "vue";
import CharacterDetails from "@/components/CharacterDetails.vue";
import CharacterDetailsDefault from "@/components/CharacterDetailsDefault.vue";

import type { Character } from "@/data/models";
import { useCharacters } from "@/data/use";

const characters = useCharacters();

const selectedCharacter = ref<Character | null>(null);

function switchToCharacter(character: Character) {
  selectedCharacter.value = character;
}
</script>

<template>
  <section>
    <h2>Character Introduction</h2>
    <Transition name="fade-in" mode="out-in">
      <CharacterDetailsDefault
        v-if="selectedCharacter === null"
      />
      <CharacterDetails
        v-else
        :selected-character="selectedCharacter"
        :key="selectedCharacter.id"
      />
    </Transition>
    <div class="character-nav">
      <button
        v-for="character in characters"
        type="button"
        class="character-nav__button"
        :class="`character-nav__button--${character.id}`"
        @click="switchToCharacter(character)"
      >
        <img :src="character.assetSrc.thumb" :alt="character.englisgName" class="character-nav__button-thumb">
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
  aspect-ratio: 1;
  border-radius: 50%;
}
</style>