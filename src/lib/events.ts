import type { ImageMetadata } from "astro";

interface EventBase {
  title: string;
  titleEn?: string;
  year: number;
  thumbnail: ImageMetadata;
  date: string;
  endDate?: string;
  time?: string;
}

type InternalEventLink = {
  path: string;
  externalUrl?: never;
};

type ExternalEventLink = {
  path?: never;
  externalUrl: string;
};

export type Event = EventBase & (InternalEventLink | ExternalEventLink);

import wakabasai2026Thumb from "@assets/events/2026/wakabasai/thumbnail.png";
import takiDiceThumb from "@assets/events/2025/taki-dice/thumbnail.png";
import xmasSweetsThumb from "@assets/events/2025/xmas-sweets/poster.png";
import takiFarmImg from "@assets/events/2025/takipura-farm/poster.png";
import tpgCafeThumb from "@assets/events/2025/tpg-cafe/poster.png";
import takimatsuriThumb from "@assets/events/2025/takimatsuri/takimatsuri_thumbnail.webp";
import stainedglassThumb from "@assets/events/2025/stainedglass/poster.webp";
import freshmanMeetupThumb from "@assets/events/2025/freshman-meetup/thumbnail.png";

export const events: Event[] = [
  {
  title: "若葉祭2026",
  titleEn: "Freshman Meetup",
  year: 2026,
  externalUrl: "https://wakabasai.tpgd.jp",
  thumbnail: wakabasai2026Thumb,
  date: "2026-04-10",
  },
  {
  title: "新入生交流会を開催します！",
  titleEn: "Freshman Meetup",
  year: 2025,
  path: "/2025/freshman-meetup/",
  thumbnail: freshmanMeetupThumb,
  date: "2025-03-30",
  endDate: "2025-03-31",
  time: "10:00~17:00",
  },
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
