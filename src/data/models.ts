import { useArtworks } from "./use";

export type CharacterId = "ada" | "bella" | "celia" | "davina";
export type ArtworkCategory = "outfit-vu" | "outfit-scw-spring" | "outfit-scw-summer" | "outfit-scw-autumn" | "outfit-scw-winter" | "outfit-tcw" | "outfit-s" | "outfit-u" | "outfit-v" | "chibi" | "pocky" | "random";

interface CharacterPlain {
  id: string,
  englisgName: string,
  japaneseNameRuby: { kanji: string, kana: string }[],
  japaneseNameRomaji: string,
  age: number,
  height: number,
  weight: number,
  birthday: string,
  bloodType: string,
  about: string,
  likes: string[],
  dislikes: string[],
  quote1: string,
  quote2: string,
  quote3: string,
}
export class Character {
  id: CharacterId;
  englisgName: string;
  japaneseNameRuby: { kanji: string, kana: string }[];
  japaneseNameRomaji: string;
  age: number;
  height: number;
  weight: number;
  birthday: string;
  bloodType: string;
  about: string;
  likes: string[];
  dislikes: string[];
  quote1: string;
  quote2: string;
  quote3: string;
  constructor(data: CharacterPlain) {
    this.id = data.id as CharacterId;
    this.englisgName = data.englisgName;
    this.japaneseNameRuby = data.japaneseNameRuby;
    this.japaneseNameRomaji = data.japaneseNameRomaji;
    this.age = data.age;
    this.height = data.height;
    this.weight = data.weight;
    this.birthday = data.birthday;
    this.bloodType = data.bloodType;
    this.about = data.about;
    this.likes = data.likes;
    this.dislikes = data.dislikes;
    this.quote1 = data.quote1;
    this.quote2 = data.quote2;
    this.quote3 = data.quote3;
  }
  get assetSrc() {
    return {
      portrait: new URL(`../assets/img/characters/portrait-${this.id}.png`, import.meta.url).href,
      expr1: new URL(`../assets/img/characters/expr-${this.id}1.png`, import.meta.url).href,
      expr2: new URL(`../assets/img/characters/expr-${this.id}2.png`, import.meta.url).href,
      expr3: new URL(`../assets/img/characters/expr-${this.id}3.png`, import.meta.url).href,
    };
  }
}

interface ArtworkPlain {
  id: string,
  date: string,
  title: string,
  caption: string,
  characters: string[],
  category: string,
  isFeatured: boolean,
}
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
  get orderNumber() {
    const artworks = useArtworks();
    return artworks.length - artworks.indexOf(this);
  }
  get imageSrc() {
    return {
      full: new URL(`../assets/img/artworks/${this.id}_50.png`, import.meta.url).href,
      thumb: new URL(`../assets/img/artworks/${this.id}_thumb.png`, import.meta.url).href,
    };
  }
}