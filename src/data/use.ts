import { Artwork, Character } from "@/data/models";
import _characters from "@/data/characters.json";
import _artworks from "@/data/artworks.json";

const characters = _characters.map((_character) => new Character(_character));
export function useCharacters() {
  return characters;
}

const artworks = _artworks.map((_artwork) => new Artwork(_artwork));
artworks.reverse();
export function useArtworks() {
  return artworks;
}
