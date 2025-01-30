import type { Artwork, Character } from "./types";
import _characters from "./characters.json";
import _artworks from "./artworks.json";

const characters = _characters as Character[];
export function useCharacters() {
  return characters;
}

const artworks = _artworks as Artwork[];
artworks.reverse();
export function useArtworks() {
  return artworks;
}
