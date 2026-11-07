const screens = ['welcome', 'surprise', 'letter', 'cake', 'final'];
const dots = [...document.querySelectorAll('.dots span')];
const hearts = document.getElementById('hearts');
const confetti = document.getElementById('confetti');
const letterText = `
Хэдийгээр төрсөн өдөр тань өнгөрсөн ч гэсэн
танд чин сэтгэлийн мэндчилгээ хүргэхийг хүслээ.

Бид саяхан танилцсан ч гэсэн танд зориулж
нэгэн жижигхэн, дурсамжтай зүйл бэлдэхийг хичээлээ.

Таны амьдрал үргэлж аз жаргал, инээд хөөр,
сайхан дурсамжаар дүүрэн байгаасай.

Зорьсон бүхэн тань биелж, өдөр бүр шинэ боломж,
сайхан үйл явдлаар дүүрэн байхыг хүсэн ерөөе. 💗`;
let typingTimer = null;
let heartTimer = null;
let currentScreen = 'welcome';
function showScreen(id) {
  if (!screens.includes(id)) return;
  currentScreen = id;
  screens.forEach((screen, index) => {
    const element = document.getElementById(screen);
    element.hidden = screen !== id;
    element.classList.toggle('active', screen === id);
    dots[index].classList.toggle('selected', screen === id);
  });
  window.scrollTo({top:0,behavior:'smooth'});
  if (id === 'final') burstConfetti(130);
}
document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.next)));
function typeLetter() {
  const output = document.getElementById('typedLetter');
  const signature = document.getElementById('signature');
  const next = document.getElementById('letterNext');
  output.textContent = '';
  signature.hidden = true;
  next.hidden = true;
  clearInterval(typingTimer);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    output.textContent = letterText; signature.hidden = false; next.hidden = false; return;
  }
  let index = 0;
  typingTimer = setInterval(() => {
    output.textContent += letterText.slice(index, index + 3);
    index += 3;
    if (index >= letterText.length) {
      clearInterval(typingTimer);
      signature.hidden = false;
      next.hidden = false;
    }
  }, 35);
}
document.getElementById('envelope').addEventListener('click', () => {
  const envelope = document.getElementById('envelope');
  envelope.classList.add('open');
  envelope.setAttribute('aria-expanded', 'true');
  envelope.hidden = true;
  document.getElementById('letterHint').hidden = true;
  document.getElementById('letterPaper').hidden = false;
  typeLetter();
});
const candles = [...document.querySelectorAll('.candle')];
candles.forEach(candle => candle.addEventListener('click', () => {
  if (candle.classList.contains('out')) return;
  candle.classList.add('out');
  candle.setAttribute('aria-label', 'Унтарсан лаа');
  const count = document.querySelectorAll('.candle.out').length;
  document.getElementById('candleStatus').textContent = count === 3 ? 'Хүсэл чинь заавал биелэг! ✨' : `${count} / 3 лаа унтарлаа 🕯️`;
  if (count === 3) { document.getElementById('finalButton').hidden = false; burstConfetti(65); }
}));
function burstConfetti(amount) {
  const colors = ['#f19cbb','#d76c9a','#ffd77d','#fff','#b68bc9'];
  for (let i=0; i<amount; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random()*100}%`;
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.animationDuration = `${2.5+Math.random()*2.5}s`;
    piece.style.animationDelay = `${Math.random()*.9}s`;
    confetti.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove(), {once:true});
  }
}
function spawnHeart() {
  if (document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = Math.random() > .5 ? '♡' : '♥';
  heart.style.left = `${Math.random()*100}%`;
  heart.style.fontSize = `${13+Math.random()*19}px`;
  heart.style.animationDuration = `${6+Math.random()*6}s`;
  hearts.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove(), {once:true});
}
heartTimer = setInterval(spawnHeart, 700);
document.getElementById('replay').addEventListener('click', () => {
  clearInterval(typingTimer);
  candles.forEach(candle => { candle.classList.remove('out'); candle.setAttribute('aria-label','Лааг унтраах'); });
  document.getElementById('candleStatus').textContent = '0 / 3 лаа унтарлаа 🕯️';
  document.getElementById('finalButton').hidden = true;
  const envelope = document.getElementById('envelope');
  envelope.hidden = false;
  envelope.classList.remove('open');
  envelope.setAttribute('aria-expanded','false');
  document.getElementById('letterHint').hidden = false;
  document.getElementById('letterPaper').hidden = true;
  document.getElementById('letterNext').hidden = true;
  showScreen('welcome');
});

// Start quiet looping music when the visitor clicks “Бэлгээ нээх”.
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.16;
backgroundMusic.loop = true;
document.querySelector('[data-next="surprise"]').addEventListener('click', () => {
  // Keep play() directly inside the click handler for mobile browser support.
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(error => {
      console.warn('Background music could not play. Check music/kikis-delivery-piano.mp3', error);
    });
  }
});
