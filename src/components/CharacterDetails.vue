<script setup lang="ts">
import { Character } from "@/data/models";

const props = defineProps<{
  selectedCharacter: Character,
}>();
</script>

<template>
  <article
    class="character-details"
    :class="`character-details--${props.selectedCharacter.id}`"
  >
    <img
      :src="props.selectedCharacter.assetSrc.portrait"
      :alt="`${props.selectedCharacter.englisgName} portrait`"
      class="character-details__portrait"
    >
    <div class="character-details__names">
      <h3 class="character-details__name character-details__name--english">{{ props.selectedCharacter.englisgName }}</h3>
      <p class="character-details__name character-details__name--japanese" lang="ja">
        <ruby v-for="ruby in props.selectedCharacter.japaneseNameRuby">
          {{ ruby.kanji }}<rp>(</rp><rt>{{ ruby.kana }}</rt><rp>)</rp>
        </ruby>
      </p>
      <p class="character-details__name character-details__name--romaji">({{ props.selectedCharacter.japaneseNameRomaji }})</p>
    </div>
    <div class="character-details__bio">
      <h4 class="character-details__section-heading"><i class="bi bi-person"></i> Bio</h4>
      <ul class="character-details__bio-list">
        <li class="character-details__bio-item">
          <span class="character-details__bio-item-label">Age</span>
          {{ props.selectedCharacter.age }}
        </li>
        <li class="character-details__bio-item">
          <span class="character-details__bio-item-label">Height</span>
          {{ props.selectedCharacter.height }} cm
        </li>
        <li class="character-details__bio-item">
          <span class="character-details__bio-item-label">Weight</span>
          {{ props.selectedCharacter.weight }} kg
        </li>
        <li class="character-details__bio-item">
          <span class="character-details__bio-item-label">Birthday</span>
          {{ props.selectedCharacter.birthday }}
        </li>
        <li class="character-details__bio-item">
          <span class="character-details__bio-item-label">Blood type</span>
          {{ props.selectedCharacter.bloodType }}
        </li>
      </ul>
    </div>
    <div class="character-details__about">
      <h4 class="character-details__section-heading"><i class="bi bi-question-circle"></i> About</h4>
      <p class="character-details__about-text">{{ props.selectedCharacter.about }}</p>
    </div>
    <div class="character-details__likes">
      <h4 class="character-details__section-heading"><i class="bi bi-heart"></i> Likes</h4>
      <ul>
        <li v-for="like in props.selectedCharacter.likes">{{ like }}</li>
      </ul>
    </div>
    <div class="character-details__dislikes">
      <h4 class="character-details__section-heading"><i class="bi bi-heartbreak"></i> Dislikes</h4>
      <ul>
        <li v-for="dislike in props.selectedCharacter.dislikes">{{ dislike }}</li>
      </ul>
    </div>
    <div class="character-details__expressions">
      <h4 class="character-details__section-heading"><i class="bi bi-emoji-smile"></i> Expressions</h4>
      <div class="character-details__expression-list">
        <div class="character-details__expression-item">
          <img
            :src="props.selectedCharacter.assetSrc.expr1"
            :alt="`${props.selectedCharacter.englisgName} expression 1`"
            class="character-details__expression-image"
          >
          <span class="character-details__expression-quote">{{ props.selectedCharacter.quote1 }}</span>
        </div>
        <div class="character-details__expression-item">
          <img
            :src="props.selectedCharacter.assetSrc.expr2"
            :alt="`${props.selectedCharacter.englisgName} expression 2`"
            class="character-details__expression-image"
          >
          <span class="character-details__expression-quote">{{ props.selectedCharacter.quote2 }}</span>
        </div>
        <div class="character-details__expression-item">
          <img
            :src="props.selectedCharacter.assetSrc.expr3"
            :alt="`${props.selectedCharacter.englisgName} expression 3`"
            class="character-details__expression-image"
          >
          <span class="character-details__expression-quote">{{ props.selectedCharacter.quote3 }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.character-details {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-areas:
    "portrait names names   "
    "portrait bio   bio     "
    "portrait about about   "
    "likes    likes dislikes"
    "expr     expr  expr    ";
  grid-template-columns: 3fr 1fr 4fr;
  grid-template-rows: auto;
  gap: 0.5rem;
  padding: 1rem;
  margin: auto;
  max-width: 64rem;
  min-height: 37.5rem;
  color: var(--img4);
}
.character-details::before {
  display: block;
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border: 0.25rem dashed var(--img3);
  border-radius: 1rem;
  background-color: var(--img1);
}
.character-details--ada {
  --img1: var(--img-ada1);
  --img2: var(--img-ada2);
  --img3: var(--img-ada3);
  --img4: var(--img-ada4);
}
.character-details--bella {
  --img1: var(--img-bella1);
  --img2: var(--img-bella2);
  --img3: var(--img-bella3);
  --img4: var(--img-bella4);
}
.character-details--celia {
  --img1: var(--img-celia1);
  --img2: var(--img-celia2);
  --img3: var(--img-celia3);
  --img4: var(--img-celia4);
}
.character-details--davina {
  --img1: var(--img-davina1);
  --img2: var(--img-davina2);
  --img3: var(--img-davina3);
  --img4: var(--img-davina4);
  text-transform: lowercase;
}
.character-details__section-heading {
  padding: 0.25em 0.5em;
  margin-bottom: 0.25rem;
  width: fit-content;
  border-radius: 1em;
  background-color: var(--img2);
  color: var(--img3);
  font-size: 1.25rem;
  line-height: 1;
  white-space: nowrap;
}
.character-details__portrait {
  grid-area: portrait;
  max-width: 150%;
  margin-top: -1rem;
  margin-inline: -25%;
  filter: drop-shadow(0.25rem 0.25rem var(--img3));
}
.character-details__names {
  grid-area: names;
}
.character-details__name--english {
  font-size: 2.5rem;
  line-height: 1;
}
.character-details__name--japanese,
.character-details__name--romaji {
  margin-block: 0;
  font-size: 1.25rem;
  font-weight: bold;
}
.character-details__bio {
  grid-area: bio;
}
.character-details__bio-list {
  display: grid;
  grid-template-columns: max-content;
  gap: 0.25em 0.5em;
  padding: 0;
  list-style-type: none;
}
.character-details__bio-item:first-child {
  grid-column: 1 / -1;
}
.character-details__bio-item-label {
  display: inline-block;
  padding: 0 0.5em;
  border-radius: 1em;
  background-color: var(--img2);
  font-weight: bold;
}
.character-details__about {
  grid-area: about;
  padding: 0.5rem 0.75rem;
  border: 0.1875rem double var(--img3);
  border-radius: 1rem;
}
.character-details__likes {
  grid-area: likes;
}
.character-details__dislikes {
  grid-area: dislikes;
}
.character-details__expressions {
  grid-area: expr;
}
.character-details__expression-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, max-content));
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.character-details__expression-item {
  position: relative;
  max-width: 8rem;
  justify-self: center;
}
.character-details__expression-image {
  aspect-ratio: 1;
  width: 100%;
  background-color: var(--img2);
  border-radius: 25%;
  transition: rotate 0.4s;
}
.character-details__expression-quote {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% - 1rem);
  display: block;
  padding: 0.5em;
  border-radius: 1em;
  background-color: var(--img2);
  filter: drop-shadow(0 0.125rem 0.125rem var(--img4));
  text-align: center;
  font-style: italic;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  translate: 0 1rem;
  transition: visibility 0.4s, opacity 0.4s, translate 0.4s;
}
.character-details__expression-quote::after {
  content: "";
  position: absolute;
  top: 100%;
  right: 2rem;
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: var(--img2);
  clip-path: polygon(25% 0%, 100% 0%, 0% 100%);
}
.character-details__expression-image:is(:hover, :focus-visible) {
  rotate: 5deg;
}
.character-details__expression-image:is(:hover, :focus-visible) + .character-details__expression-quote {
  visibility: visible;
  opacity: 1;
  translate: none;
}
@media (min-width: 36rem) {
  .character-details {
    grid-template-areas:
      "portrait names bio     "
      "portrait about about   "
      "portrait likes dislikes"
      "portrait expr  expr    ";
    grid-template-columns: 12rem auto auto;
  }
  .character-details__expression-quote {
    left: -25%;
  }
}
@media (min-width: 48rem) {
  .character-details {
    grid-template-areas:
      "portrait .     .        .   "
      "portrait names bio      expr"
      "portrait about about    expr"
      "portrait likes dislikes expr";
    grid-template-columns: 12rem 1fr 1fr 12rem;
    grid-template-rows: 6rem auto auto 1fr;
  }
  .character-details::before {
    top: 6.5rem;
  }
  .character-details__about-text {
    font-size: 1.25rem;
  }
  .character-details__expression-list {
    grid-template-columns: auto;
    align-content: start;
  }
}
@media (min-width: 72rem) {
  .character-details__bio-list {
    grid-template-columns: repeat(2, max-content);
  }
}
</style>