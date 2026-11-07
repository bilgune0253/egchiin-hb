# Амаржаргал эгчдээ 🎀

Зураг болон backend шаардлагагүй, GitHub Pages дээр ажиллах төрсөн өдрийн интерактив мэндчилгээ.

## Ажиллуулах

`index.html` файлыг browser-оор нээхэд хангалттай. Эсвэл VS Code Live Server ашиглаж болно.

## GitHub Pages

1. GitHub дээр public repository үүсгэнэ (жишээ: `amarjargal-birthday`).
2. `index.html`, `style.css`, `script.js` файлуудыг repository-ийн үндсэн хавтсанд upload хийнэ.
3. Repository → **Settings** → **Pages** → **Build and deployment** → **Deploy from a branch**.
4. Branch: **main**, Folder: **/(root)** → **Save**.
5. Deployment дуусмагц `https://USERNAME.github.io/amarjargal-birthday/` хаягаар нээнэ (`USERNAME`-ийг өөрийн GitHub нэрээр солино).

## Өөрчлөх

- Мэндчилгээний бичвэр: `index.html`
- Захидлын текст: `script.js` доторх `letterText`
- Өнгө, дизайн: `style.css`

Google Fonts татахын тулд интернэт холболт хэрэгтэй; интернэтгүй үед fallback фонтоор ажиллана.


## Background music
A quiet, looping background audio player was added (volume 16%). It starts when the visitor clicks **Бэлгээ нээх**, and can be turned on/off via the top-right button. Browsers do not permit reliable sound autoplay before a click.

**Audio not included:** Obtain a recording you have permission to use of the desired piano piece, save it as `music/kikis-delivery-piano.mp3`, and upload the `music` folder with the other files to GitHub Pages. Without the audio file, the website still works but plays no music.


Music starts on the first “Бэлгээ нээх” click at 16% volume. No music toggle is shown. Add a legally obtained MP3 at `music/kikis-delivery-piano.mp3`; audio is not included.
