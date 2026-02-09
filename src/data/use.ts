import _artworks from "@/data/artworks.json";
import _characters from "@/data/characters.json";
import { Artwork, Character } from "@/data/models";

const characters = _characters.map((_character) => new Character(_character));
export function useCharacters(): Character[] {
  return characters;
}

const artworks = _artworks.map((_artwork) => new Artwork(_artwork));
artworks.reverse();
export function useArtworks(): Artwork[] {
  return artworks;
}
