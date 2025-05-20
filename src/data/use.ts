import { Artwork, Character } from "./models";
import _characters from "./characters.json";
import _artworks from "./artworks.json";

const characters = _characters.map((_character) => new Character(_character));
export function useCharacters() {
  return characters;
}

const artworks = _artworks.map((_artwork) => new Artwork(_artwork));
artworks.reverse();
export function useArtworks() {
  return artworks;
}
