# NTUTEC 網站專案指引

## 在開始任何設計或開發工作之前，必須先讀取 design.md

**`design.md` 是本專案唯一的設計 Single Source of Truth。**
所有新頁面、新 section、任何樣式決定都必須遵循它，不得自行引入新的色彩、字型、spacing 或元件規格。

---

## 技術架構

- React 18 + Babel standalone（in-browser，無 build step）
- 每個頁面是獨立 `.html` 檔，透過 `<script type="text/babel" src="shared.jsx?v=2">` 載入共用元件
- Dev server：`npm run dev`（port 5173，使用 `npx serve`）

## 共用元件（shared.jsx）

- `SharedNav` — 頂部導覽列，mega menu click-to-open
- `SharedSocialSidebar` — 右側社群連結（手機隱藏）
- `SharedFooter` — 頁腳
- `useIsMobile(bp = 768)` — 響應式斷點 hook

## 現有頁面

| 檔案 | 說明 |
|------|------|
| `index.html` | 首頁 |
| `angels.html` | 台大天使會 |
| `corporate-partners.html` | 企業合作 |
| `accelerator.html` | 台大加速器計畫 |

## 新增頁面時的必做清單

1. 讀取 `design.md` 確認色彩、字型、spacing 規格
2. 參考現有頁面（angels.html 或 corporate-partners.html）的 Hero 結構
3. 在 `shared.jsx` 的 `SHARED_MEGA` 和 footer `cols` 中補上對應連結
4. Hero 使用 clip-path hexagon + SVG offwhite 三角形 + 負 margin stats 卡
5. 所有標題使用 `--serif`（Noto Sans TC）weight 600，不超過 600
6. Section label 使用 `--mono`，內文使用 `--sans` weight 300

## 內容來源

新頁面的內容從 `ntutec-design-handoff/components/public/` 對應的 `*PageClient.tsx` 提取。
