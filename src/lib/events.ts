import type { ImageMetadata } from "astro";

export interface Event {
  title: string;
  titleEn?: string;
  year: number;
  path: string;
  thumbnail: ImageMetadata;
  date: string;
}

import takiDiceThumb from "@assets/events/2025/taki-dice/thumbnail.png";
import xmasSweetsThumb from "@assets/events/2025/xmas-sweets/poster.png";
import takiFarmImg from "@assets/events/2025/takipura-farm/poster.png";
import tpgCafeThumb from "@assets/events/2025/tpg-cafe/poster.png";
import takimatsuriThumb from "@assets/events/2025/takimatsuri/takimatsuri_thumbnail.webp";
import stainedglassThumb from "@assets/events/2025/stainedglass/poster.webp";

export const events: Event[] = [
  {
  title: "Taki ダイス",
  titleEn: "Taki Dice",
  year: 2025,
  path: "/2025/taki-dice/",
  thumbnail: takiDiceThumb,
  date: "2025-01-20",
  },
  {
  title: "クリスマススイーツを作ろう！",
  titleEn: "Let's Make Christmas Sweets!",
  year: 2025,
  path: "/2025/xmas-sweets/",
  thumbnail: xmasSweetsThumb,
  date: "2025-12-23",
  },
  {
    title: "工大祭でTPG Cafeを開催！",
    titleEn: "TPG Cafe at Koudaisai!",
    year: 2025,
    path: "/2025/tpg-cafe/",
    thumbnail: tpgCafeThumb,
    date: "2025-11-02",
  },
  {
    title: "Taki Plazaで野菜を育てよう！",
    titleEn: "Let's Grow Vegetables at Taki Plaza!",
    year: 2025,
    path: "/2025/takipura-farm/",
    thumbnail: takiFarmImg,
    date: "2025-10-21",
  },
  {
    title: "Taki Plaza B2Fで滝祭を開催します！",
    titleEn: "Takimatsuri at Taki Plaza B2F!",
    year: 2025,
    path: "/2025/takimatsuri/",
    thumbnail: takimatsuriThumb,
    date: "2025-07-07",
  },
  {
    title: "好きでかたどるガラスパズル",
    titleEn: "Glass Puzzle Shaped by Love",
    year: 2025,
    path: "/2025/stainedglass/",
    thumbnail: stainedglassThumb,
    date: "2025-07-01",
  },
];
