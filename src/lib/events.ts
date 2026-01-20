import type { ImageMetadata } from "astro";

export interface Event {
  title: string;
  year: number;
  description: string;
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
  year: 2025,
  description: "TPG イベント班が1月20日（火）に四人組でリアルすごろくをするイベントを開催します！",
  path: "/2025/taki-dice/",
  thumbnail: takiDiceThumb,
  date: "2025-01-20",
  },
  {
  title: "クリスマススイーツを作ろう！",
  year: 2025,
  description: "TPG コミュニティ班が12月23日（火）にクリスマススイーツ作りイベントを開催します！",
  path: "/2025/xmas-sweets/",
  thumbnail: xmasSweetsThumb,
  date: "2025-12-23",
  },
  {
    title: "工大祭でTPG Cafeを開催！",
    year: 2025,
    description:
      "工大祭2025でTPGはボードゲームカフェを開きます！ぜひお越しください！",
    path: "/2025/tpg-cafe/",
    thumbnail: tpgCafeThumb,
    date: "2025-11-02",
  },
  {
    title: "Taki Plazaで野菜を育てよう！",
    year: 2025,
    description:
      "TPGコミュニティ班が、大好評の企画「たきぷら農園　シチュー編」を開催します！",
    path: "/2025/takipura-farm/",
    thumbnail: takiFarmImg,
    date: "2025-10-21",
  },
  {
    title: "Taki Plaza B2Fで滝祭を開催します！",
    year: 2025,
    description:
      'TPGでは今年も滝祭を開催します！七夕の夜に"夏の思い出"を一緒に作りませんか？',
    path: "/2025/takimatsuri/",
    thumbnail: takimatsuriThumb,
    date: "2025-07-07",
  },
  {
    title: "好きでかたどるガラスパズル",
    year: 2025,
    description:
      'TPGでは初のステンドグラス風の作品をつくるイベントを開催します！',
    path: "/2025/stainedglass/",
    thumbnail: stainedglassThumb,
    date: "2025-07-01",
  },
];
