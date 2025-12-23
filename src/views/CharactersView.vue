<script setup lang="ts">
import { computed, ref } from "vue";
import CharacterDetails from "@/components/CharacterDetails.vue";
import CharacterDetailsDefault from "@/components/CharacterDetailsDefault.vue";

import { useCharacters } from "@/data/use";

const characters = useCharacters();

const selectedCharacterIndex = ref<number | null>(null);
const selectedCharacter = computed(() => {
  if (selectedCharacterIndex.value === null) {
    return null;
  }
  return characters[selectedCharacterIndex.value];
});

function switchToCharacter(index: number): void {
  selectedCharacterIndex.value = index;
}
</script>

<template>
  <section>
    <h2>Character Introduction</h2>
    <Transition
      v-for="character in [...characters, null]"
      :key="character?.id ?? 'null'"
      v-show="character === selectedCharacter"
      name="fade-in"
      mode="out-in"
    >
      <CharacterDetailsDefault
        v-if="character === null"
      />
      <CharacterDetails
        v-else
        :selected-character="character"
      />
    </Transition>
    <div class="character-nav">
      <button
        v-for="(character, index) in characters"
        :key="character.id"
        type="button"
        class="character-nav__button"
        :class="`character-nav__button--${character.id}`"
        @click="switchToCharacter(index)"
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
  width: 8rem;
  aspect-ratio: 1;
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