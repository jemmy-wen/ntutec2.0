# NTUTEC 設計規範 Design System

> 本文件是所有頁面的唯一設計來源（Single Source of Truth）。
> 新增頁面時，請遵循此規範，不得自行引入新的色彩、字型或 spacing 邏輯。

---

## 1. 設計哲學

- **學術 × 創業**：用黑體傳遞品牌力量，用 mono/sans 保持科技現代感
- **留白主導**：section 之間呼吸空間充足，避免資訊堆砌
- **動態層次**：clip-path、overlap、bleed 技巧製造視覺深度，而非依靠陰影堆疊
- **Hover 是加分，不是必須**：所有關鍵資訊在靜態狀態下就要可讀

---

## 2. 色彩系統

| Token | 值 | 用途 |
|---|---|---|
| `--navy` | `#1A2E4A` | 主色、標題、深色背景、primary 按鈕底色 |
| `--teal` | `#58A8A0` | 次強調、icon、hover 狀態、底線、active nav |
| `--mint` | `#00D8C8` | 主強調色、CTA 按鈕、selection 高亮、tag 背景 |
| `--white` | `#FAFAF8` | 頁面底色（帶暖調） |
| `--offwhite` | `#F7F5F1` | 次要區塊背景（angels / corporate 頁面底色） |
| `--rule` | `#E0E0DC` | 分隔線 |
| `--text` | `#1A1A18` | 內文正文 |
| `--muted` | `#6C727B` | 輔助說明文字、subtitle |

### 特殊區塊背景
| 用途 | 色值 |
|---|---|
| Ecosystem / About / eco 強調區塊 | `#00C4CC`（mint 深版） |
| 深色 CTA section | `var(--navy)` `#1A2E4A` |
| 淺灰夥伴 section | `#EEEEED` |
| 亮白卡片 | `#ffffff` |

---

## 3. 字型系統

> **原則：全站標題統一使用黑體（Noto Sans TC），以不同 weight 區分層級，不使用任何襯線體。**

### Google Fonts 載入
```
Noto+Sans+TC:wght@300;400;500;600;700
DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700
Space+Mono:wght@400;700
```

### CSS Token
| Token | 字型 | 用途 |
|---|---|---|
| `--serif` | `'Noto Sans TC', sans-serif` | 主標題、卡片標題、品牌感內文（黑體） |
| `--sans` | `'DM Sans', 'Noto Sans TC', sans-serif` | 內文、UI 元素、說明文字、按鈕標籤 |
| `--mono` | `'Space Mono', monospace` | section label、技術感標記 |

> 注意：`--serif` token 名稱保留（為了向後相容程式碼），但實際字型已改為 Noto Sans TC 黑體。

### Weight 分層規則（重要）
| 角色 | Weight | 說明 |
|---|---|---|
| 大標題（H1 hero） | **600** | SemiBold，最大但不過重 |
| Section 標題（H2） | **600** | SemiBold |
| 卡片標題（H3）、UI 標題 | **600** | SemiBold |
| 內文（body） | **300–400** | Light / Regular |
| Section label（mono） | **500** | Medium |
| 按鈕文字 | **500–600** | Medium / SemiBold |

> **不使用 700（Bold）或 900（Black）**，避免中文字形黏連。

### 常用組合
| 角色 | 規格 |
|---|---|
| 大標題（H1 hero） | `--serif` / 58–64px / **weight 600** / `--navy` 或 `#fff` / letter-spacing 0.04em |
| Section 標題（H2） | `--serif` / 32–40px / **weight 600** / `--navy` — 搭配底色方塊（見下方規則） |
| 卡片標題（H3） | `--serif` / 18–24px / **weight 600** / `--navy` |
| Section label | `--mono` / 10–11px / weight 500 / letter-spacing 0.14em / uppercase / `--teal` |
| 內文 | `--sans` / 14–15px / weight 300 / line-height 1.9–2.0 / `--muted` |
| CTA 按鈕文字 | `--sans` / 14–15px / weight 500–600 |
| tag / chip | `--mono` / 11–12px / weight 500 / letter-spacing 0.06em |

### Section 標題底色方塊規則（`.sec-title-hl`）

Section 標題（H2）一律搭配底色方塊，顏色依所在區塊背景決定：

| 區塊背景 | 底色方塊顏色 |
|---|---|
| 白底（`--white` / `--offwhite`） | `var(--mint)`（teal） |
| 深色底（`--navy` / `--teal` / `--mint`） | `#ffffff`（白色） |

```jsx
// 白底區塊
<span className="sec-title-hl">標題文字</span>

// 深色 / teal 底區塊
<span className="sec-title-hl" style={{ background: '#fff' }}>標題文字</span>
```

---

## 4. Spacing 系統

### Section 垂直 padding
| 裝置 | 值 |
|---|---|
| 桌面 | `120px 0` |
| 手機 | `72px 0` |

### 水平 padding（內容區）
| 裝置 | 值 |
|---|---|
| 桌面 | `0 10%` |
| 手機 | `0 6%` |

### 字型大小縮放（桌面 → 手機）
| 角色 | 桌面 | 手機 |
|---|---|---|
| H1 hero | 58–64px | 36–40px |
| H2 section | 34–40px | 26–28px |
| H3 card | 20–24px | 17–19px |
| Section label | 不變 | 不變 |

---

## 5. 按鈕

### Primary（深色底）
- background: `--navy` / color: `--mint` / font: `--sans` weight 600

### Secondary（外框）
- background: transparent / border: `1px solid rgba(26,46,74,0.15)` / color: `--navy`
- hover → background: `--teal` / color: `#fff` / scale(1.1)

### CTA Filled（強調）
- background: `--mint` / color: `--navy` / font: `--sans` weight 600
- hover → background: `#00bfb8`

### Ghost（白底線，用於深色背景）
- border: `1px solid rgba(255,255,255,0.5)` / color: `#fff`
- hover → borderColor: `#fff` / background: `rgba(255,255,255,0.1)`

### More Detail 文字連結
- font: `--mono` / 12.5px / letter-spacing 0.06em / color: `--navy`
- border-bottom: `1px solid --navy` / after: `→`
- hover → color & border: `--teal`

---

## 6. 導覽列（SharedNav）

- **實作於**：`shared.jsx` → `SharedNav`
- 透明底（未 scroll）→ 白底 + blur(20px)（scroll 後）
- 文字色：scroll 前白色 / scroll 後 `--navy`
- Active 項目：`--teal`（scroll 後）/ `--mint`（scroll 前）
- Active 底線：width 20px / height 2px / `--teal`
- Dropdown：白底卡片，featured 欄帶 teal 漸層背景
- **手機**：hamburger 按鈕（右側）→ 右側滑入 drawer（`min(340px, 88vw)`）
  - Drawer 內：accordion 展開子連結 + 底部固定 social links
  - 背景：`rgba(20,36,60,0.55)` + backdrop blur，點外側關閉

---

## 7. Social Sidebar（SharedSocialSidebar）

- **實作於**：`shared.jsx` → `SharedSocialSidebar`
- `position: fixed; right: 0; width: 80px`，桌面垂直置中
- **手機：直接 return null**（social links 改收進 nav drawer）
- 影響：所有頁面主體需加 `paddingRight: isMobile ? 0 : 80`

---

## 8. Footer（SharedFooter）

- **實作於**：`shared.jsx` → `SharedFooter`
- background: `--navy` / padding: 64px 10% 32px（桌面）
- Grid：`1.3fr repeat(4, 1fr)`（桌面）→ `1fr 1fr`（手機，brand 欄 span 全寬）
- 底部列：桌面 flex row / 手機 flex column

---

## 9. Hero Section

### 視覺結構（三層）
1. **底色**：`var(--navy)` 打底（圖片未載入時）
2. **背景圖**：`background-size: cover`，opacity 0.88–0.90
3. **漸層疊加**：
   - 主漸層：左下角 `rgba(navy, 0.90)` → 右上漸層消失（斜向）
   - 側漸層：左側 `rgba(navy, 0.45)` → 透明（強化文字可讀性）
   - 可選：`radial-gradient` mint 暈光（左下角裝飾）

### 切角技巧（兩層疊加）
1. **CSS clip-path**（整個圖片區塊）：
   ```css
   clip-path: polygon(0% 22%, 27% 0%, 100% 0%, 100% 78%, 73% 100%, 0% 100%)
   ```
2. **SVG 白色三角形**（頁面背景色填滿，製造切角錯覺）：
   ```jsx
   <svg viewBox="0 0 1200 720" preserveAspectRatio="none" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
     <polygon points="0,0 324,0 0,160" fill="#F7F5F1" />        {/* 左上 */}
     <polygon points="1200,720 876,720 1200,560" fill="#F7F5F1" /> {/* 右下 */}
   </svg>
   ```
   > fill 色需對應頁面底色（index: `#FAFAF8` / angels & corporate: `#F7F5F1`）

### 手機降級
- **clip-path 移除**（`isMobile ? 'none' : 'polygon(...)'`）
- **SVG 三角形保留**（`preserveAspectRatio="none"` 自動縮放，不影響排版）
- 漸層改為垂直：`rgba(navy, 0.75)` → `rgba(navy, 0.55)`
- 版型：雙欄 grid → 單欄，裝飾性右欄隱藏
- `minHeight`: 760px → 480px

### Stats 懸浮卡
- **桌面**：`position: absolute; bottom: 0; left: 10%`，白底卡片懸浮於 hero 下緣
- **手機**：移出 absolute，改成 inline block 直接接在 section 下方
- 卡片規格：`background: #fff` / `box-shadow: 0 12px 56px -8px rgba(26,46,74,0.18)` / flex 橫排
- 數字：`--italic` italic / 40px（桌面）28–32px（手機）/ `--navy`
- 後綴：`--teal`（`+`）/ `--muted`（中文單位）

### CTA 連結（右下三角區）
- 桌面：`position: absolute; bottom: 36px; right: 4%`，落在 SVG 右下三角的 offwhite 區域
- 手機：隱藏（`{!isMobile && <a ...>}`）

---

## 10. Overlap / Bleed 技巧家族

整個網站使用一套「視覺層咬合」技巧製造深度感，而非依靠邊框。

| 技巧 | 實作方式 | 使用位置 |
|---|---|---|
| Hero stats 懸浮 | `position: absolute; bottom: 0` on hero wrapper | 所有頁面 hero |
| Stats 卡往上疊 | `margin-top: -100px; z-index: 10` | index.html stats block |
| 圖片往上咬入 | `marginTop: -80px`（section 外溢） | CollabModels 左圖 |
| 圖文交錯咬合 | image: `marginTop: -96px; marginBottom: 96px` / card: `marginLeft 或 marginRight: -64px` | FeaturedCases CaseCard |
| 斜切白色背景 | `clip-path: polygon(...)` on absolute div | MemberBenefits |

> **手機原則**：所有 overlap/bleed 效果在 `≤768px` 時移除，改為正常 flow 排列，避免重疊造成內容遮蔽。

---

## 11. 格線系統（Grid）

### 桌面 → 手機降級規則
| 版型 | 桌面 | 手機 |
|---|---|---|
| 三欄卡片 | `repeat(3, 1fr)` | `1fr` |
| 兩欄卡片 | `1fr 1fr` | `1fr` |
| 四欄 icon grid | `repeat(4, 1fr)` | `repeat(2, 1fr)` |
| Hero 雙欄 | `1.15fr 1fr` | 單欄（右欄隱藏） |
| Footer | `1.3fr repeat(4, 1fr)` | `1fr 1fr`（brand 欄 span 全寬） |

### gap 縮放
- 桌面：`gap: 24–48px`
- 手機：`gap: 20–32px`

---

## 12. 手機響應式斷點

```js
// useIsMobile hook（實作於 shared.jsx，已 export 至 window）
function useIsMobile(bp = 768) { ... }
```

- 斷點：`768px`
- 所有頁面透過 `shared.jsx` 的 CSS injection 自動獲得：
  ```css
  html, body { overflow-x: hidden; max-width: 100vw; }
  ```
- 所有頁面的 App/Page wrapper 加：
  ```jsx
  <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
  ```
- Sidebar 佔位：`paddingRight: isMobile ? 0 : 80`（main 與 footer wrapper 都要加）

---

## 13. 動畫系統

### Scroll 進場（AnimUp / AnimBlock）
```js
// IntersectionObserver，threshold 0.12
// 觸發後：opacity 0→1 + translateY(28–32px)→0
// transition: 0.7–0.75s cubic-bezier(0.22, 1, 0.36, 1)
// 多元素依序加 delay（每項 +70–100ms）
```

### Hero 進場
- 各元素依序 `opacity 0→1` + `translateY`，delay 遞增（0.1s → 0.2s → 0.3s → 0.36s）
- 用 `setTimeout(() => setLoaded(true), 80)` 觸發

### Stats 數字 Counter（index.html）
- `IntersectionObserver` threshold 0.3
- `requestAnimationFrame` easeOut 滾動至目標值
- duration = `1200 + index * 150` ms

### Scroll Indicator（index.html hero）
- 1px 垂直線：`background: linear-gradient(to bottom, var(--teal), transparent)`
- `scaleY` 0→1，1.5s ease，infinite alternate，`transformOrigin: top`

### Hover 與手機的關係
- Hover 效果（zoom、overlay 顯示）是桌面加分層，手機上不可依賴
- 手機上「最終態」應直接顯示（例：WhyPartner 卡片永遠顯示漸層與文字）

---

## 14. 視覺語言（裝飾元素）

- **Radial gradient 暈光**：mint/teal 色系，用於 hero overlay 與區塊裝飾角落
- **線條**：`--rule` 分隔線 / teal 漸層細線（scroll indicator）
- **選取高亮**：`--mint` 底色 + `--navy` 文字（`::selection`）
- **圖片佔位漸層**：teal 系 `linear-gradient(135deg)`
- **浮水印**：SVG path（問號字形）`opacity: 0.05`，純裝飾，pointer-events none
- **噪點紋理**：`feTurbulence` SVG filter，`opacity: 0.08`，用於 mint 色 section 背景
- **dot grid**：`radial-gradient` 圓點，`opacity: 0.12`，用於 CTA 深色背景
- **十字準星**：`<svg>` 兩條 1.5px teal 線，置中於 2×2 grid 交叉點（MemberBenefits）

---

## 15. 頁面架構

### 共用元件（`shared.jsx`）
所有子頁面載入 `<script type="text/babel" src="shared.jsx?v=2">`，獲得：
- `SharedNav`、`SharedSocialSidebar`、`SharedFooter`
- `useIsMobile` hook

### 現有頁面
| 檔案 | 說明 |
|---|---|
| `index.html` | 首頁，完整生態系介紹 |
| `angels.html` | 台大天使投資俱樂部 |
| `corporate-partners.html` | 企業合作方案 |

### 新頁面建立 Checklist
- [ ] `html { overflow-x: hidden; max-width: 100vw; }` — shared.jsx 的 CSS injection 自動處理
- [ ] 載入 `shared.jsx`，使用 `SharedNav`、`SharedSocialSidebar`、`SharedFooter`
- [ ] Page wrapper：`<div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>`
- [ ] Main + footer wrapper：`paddingRight: isMobile ? 0 : 80`
- [ ] 所有 grid section 加 `isMobile` 條件判斷
- [ ] Hero 的 clip-path 加 `isMobile ? 'none' : 'polygon(...)'`
- [ ] SVG 三角形 fill 色對應頁面底色
- [ ] Stats 卡：桌面 absolute float，手機 inline flow

---

## 附錄：色彩探索歷史

`Color Exploration.html` 保留設計過程的多個配色方案（A 翡翠、B 碧玉等）。
目前正式使用的是各方案之間的折衷：
- mint: `#00D8C8`（比方案 A 的 `#00CE9A` 更偏青藍）
- teal: `#58A8A0`
- eco block: `#00C4CC`
