import _artworks from "@/data/artworks.json";
import type { CharacterId } from "@/models/character";

interface ArtworkPlain {
  id: string,
  date: string,
  title: string,
  caption: string,
  characters: string[],
  category: string,
  isFeatured: boolean,
}

export type ArtworkCategory =
  | "outfit-vu"
  | "outfit-scw-spring"
  | "outfit-scw-summer"
  | "outfit-scw-autumn"
  | "outfit-scw-winter"
  | "outfit-tcw"
  | "outfit-s"
  | "outfit-u"
  | "outfit-v"
  | "chibi"
  | "pocky"
  | "un";

export class Artwork {
  id: string;
  date: string;
  title: string;
  caption: string;
  characters: CharacterId[];
  category: ArtworkCategory;
  isFeatured: boolean;
  constructor(data: ArtworkPlain) {
    this.id = data.id;
    this.date = data.date;
    this.title = data.title;
    this.caption = data.caption;
    this.characters = data.characters as CharacterId[];
    this.category = data.category as ArtworkCategory;
    this.isFeatured = data.isFeatured;
  }
  static list: Artwork[];
  static {
    this.list = _artworks.map((_artwork) => new Artwork(_artwork));
    this.list.sort((a, b) => b.date.localeCompare(a.date));
  }
  get orderNumber() {
    return Artwork.list.length - Artwork.list.indexOf(this);
  }
  get imageSrc() {
    return {
      full: new URL(`/src/assets/img/artworks/${this.id}_50.png`, import.meta.url).href,
      thumb: new URL(`/src/assets/img/artworks/${this.id}_thumb.png`, import.meta.url).href,
    };
  }
}
