export type CharacterId = "ada" | "bella" | "celia" | "davina";

export interface Character {
  id: CharacterId,
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

export type ArtworkCategory = "outfit-vu" | "outfit-scw-spring" | "outfit-scw-summer" | "outfit-scw-autumn" | "outfit-scw-winter" | "outfit-tcw" | "outfit-s" | "outfit-u" | "outfit-v" | "chibi" | "pocky" | "random";

export interface Artwork {
  id: string,
  date: string,
  title: string,
  caption: string,
  characters: CharacterId[],
  category: ArtworkCategory,
  isFeatured: boolean,
}