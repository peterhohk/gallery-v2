import _characters from "@/data/characters.json";

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

export type CharacterId =
  | "ada"
  | "bella"
  | "celia"
  | "davina";

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
  static list: Character[];
  static {
    this.list = _characters.map((_character) => new Character(_character));
  }
  get assetSrc() {
    return {
      thumb: new URL(`/src/assets/img/characters/thumb-${this.id}.png`, import.meta.url).href,
      portrait: new URL(`/src/assets/img/characters/portrait-${this.id}.png`, import.meta.url).href,
      expr1: new URL(`/src/assets/img/characters/expr-${this.id}1.png`, import.meta.url).href,
      expr2: new URL(`/src/assets/img/characters/expr-${this.id}2.png`, import.meta.url).href,
      expr3: new URL(`/src/assets/img/characters/expr-${this.id}3.png`, import.meta.url).href,
    };
  }
}
