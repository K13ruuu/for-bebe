# 🌹 A Birthday Surprise

An interactive birthday site: three questions, a gift box she taps open,
then three surprises to discover — a card with a song, a photo collage,
and a video — and finally a cake she blows a candle out on. Plain
HTML/CSS/JS — no build tools, no dependencies, works straight on GitHub
Pages.

**[See it live once deployed →](#4-turn-on-github-pages)**

---

## How the experience flows

1. **Three quick questions** ("Hey, why are you here?" etc.)
2. **A gift box** — tap it 3 times to open it
3. **Three surprises**, opened in any order:
   - 💌 **Your Card** — click the card to flip it open; the birthday song plays, and stops when the card is closed
   - 🖼️ **Our Moments** — a photo collage
   - 🎥 **Camera Roll** — your video
4. Once all three are opened, **a cake appears** — she can blow into her
   microphone to blow out the candle, or press-and-hold the button below it
   if mic access isn't available
5. The candle goes out and the final message appears: *"Happy Birthday, Bebe — I love you."*

Rose petals drift continuously in the background **and** foreground through
every screen.

---

## 1. Add your own content

| What | Where |
|---|---|
| Her name & the handwritten card message | `script.js` (top) and `index.html` (`.handwritten` block) |
| Photos | `assets/photos/photo1.jpg` … `photo6.jpg` |
| Video | `assets/video/message.mp4` |
| Birthday song | `assets/music/birthday-song.mp3` |
| Final message | `index.html` — search for `closing-title` / `closing-sub` |

Each `assets/*` folder has its own short README with the exact filename to use.
**The site works fine with nothing added** — it'll just show friendly
"add your file here" placeholders until you drop the real files in.

### Change her name
Open `script.js` and edit the top of the file:

```js
const CONFIG = {
  herName: "Her Name",   // 👈 change this
  ...
```

### Change the handwritten message
Open `index.html`, search for `class="handwritten"`, and edit the text inside.

### Change the colors
Open `style.css` and edit the values at the very top under `:root` — everything
on the site references these, so changing e.g. `--rose` updates it everywhere.

### About the microphone
The candle-blowing step asks for microphone access so she can literally blow
it out. If she declines or the browser blocks it, the "hold to blow" button
underneath still works — nothing is required to complete the experience.

---

## 2. Preview it on your computer

No install needed — just open `index.html` in a browser. (Some browsers block
local video/audio loading from a plain double-click; if the video/music don't
preview locally, that's fine, they'll work once deployed — see below, or run
a tiny local server: `python3 -m http.server` in this folder, then visit
`http://localhost:8000`.)

---

## 3. Create the GitHub repository

If you don't already have one:

1. Go to [github.com/new](https://github.com/new)
2. Name it something like `happy-birthday` (repo names can't have spaces)
3. Keep it **Public** if you want GitHub Pages to work on a free account
   (or **Private** if you have GitHub Pro/Team/Enterprise)
4. Don't initialize with a README (you already have one) — click **Create repository**

Then, from inside this folder:

```bash
git init
git add .
git commit -m "birthday surprise 🌹"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## 4. Turn on GitHub Pages

1. On GitHub, open your repo → **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to `Deploy from a branch`
3. Set **Branch** to `main` and folder to `/ (root)` → **Save**
4. Wait ~1 minute, then refresh — GitHub will show your live URL, usually:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

That's the link you send her. 🌹

> **Heads up on privacy:** a public GitHub Pages site is visible to anyone
> with the link (it won't show up in Google unless linked from elsewhere, but
> it is technically public). If you'd rather it not be discoverable at all,
> use a private repo with GitHub Pro/Team, or host it somewhere with
> access control.

---

## 5. Updating it later

Any time you change a file:

```bash
git add .
git commit -m "add more photos"
git push
```

GitHub Pages redeploys automatically within a minute or two.

---

## File structure

```
index.html          the page structure
style.css            all styling & colors (edit --rose etc. here)
script.js            interactions + the CONFIG block (name, photo list)
assets/photos/       her photos (photo1.jpg – photo6.jpg)
assets/video/        message.mp4
assets/music/        birthday-song.mp3
```
