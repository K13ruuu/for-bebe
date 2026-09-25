/* ============================================================
   CONFIG — edit this to personalize
   ============================================================ */
const CONFIG = {
  herName: "Bebe",
  photos: [
    { file: "photo1.jpg", caption: "" },
    { file: "photo2.jpg", caption: "" },
    { file: "photo3.jpg", caption: "" },
    { file: "photo4.jpg", caption: "" },
    { file: "photo5.jpg", caption: "" },
    { file: "photo6.jpg", caption: "" },
  ],
  petalCount: 16,
};

document.querySelectorAll(".js-name").forEach(el => el.textContent = CONFIG.herName);

/* PETALS */
function fillPetalLayer(el, count, sizeRange){
  const symbols = ["🌸","🌹","🌷"];
  for (let i = 0; i < count; i++){
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left = Math.random()*100 + "vw";
    p.style.setProperty("--drift", (Math.random()*80-40) + "px");
    const duration = 11 + Math.random()*15;
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = (-Math.random()*duration) + "s";
    p.style.fontSize = (sizeRange[0] + Math.random()*(sizeRange[1]-sizeRange[0])) + "px";
    el.appendChild(p);
  }
}
fillPetalLayer(document.getElementById("petalFieldBack"), CONFIG.petalCount, [12, 24]);
fillPetalLayer(document.getElementById("petalFieldFront"), Math.round(CONFIG.petalCount*0.6), [20, 34]);

/* GATE */
const gate = document.getElementById("gate");
const main = document.getElementById("main");
const gateSteps = Array.from(document.querySelectorAll(".gate-step"));
const dots = Array.from(document.querySelectorAll(".dot"));

let currentGateStep = 0;

function updateDots(){
  dots.forEach((d, i) => {
    d.classList.toggle("done", i < currentGateStep);
    d.classList.toggle("current", i === currentGateStep);
  });
}

function goToGateStep(n){
  const prev = gateSteps[currentGateStep];
  const next = gateSteps[n];
  if (!next) return;
  prev.classList.add("leaving");
  prev.classList.remove("active");
  setTimeout(() => prev.classList.remove("leaving"), 600);
  next.classList.add("active");
  currentGateStep = n;
  updateDots();
}

gateSteps.slice(0, 3).forEach((step) => {
  const options = Array.from(step.querySelectorAll(".q-option"));
  const reaction = step.querySelector(".q-reaction");
  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (options.some(o => o.classList.contains("chosen"))) return;
      btn.classList.add("chosen");
      options.forEach(o => { if (o !== btn) o.classList.add("fade-out"); });
      reaction.textContent = btn.dataset.reaction || "";
      requestAnimationFrame(() => reaction.classList.add("show"));
      setTimeout(() => goToGateStep(currentGateStep + 1), 1100);
    });
  });
});
updateDots();

/* GIFT BOX */
const giftBox = document.getElementById("giftBox");
const tapCountEl = document.getElementById("tapCount");
const giftHint = document.getElementById("giftHint");
const confettiBurst = document.getElementById("confettiBurst");
let tapsLeft = 3;

function spawnConfetti(){
  const colors = ["#B23A54", "#D97D93", "#C79A56", "#F3AFC0", "#6E1F32"];
  for (let i = 0; i < 28; i++){
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 140;
    piece.style.setProperty("--cx", Math.cos(angle) * dist + "px");
    piece.style.setProperty("--cy", Math.sin(angle) * dist - 40 + "px");
    piece.style.setProperty("--cr", (Math.random()*540 - 270) + "deg");
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    piece.style.animationDelay = (Math.random()*80) + "ms";
    confettiBurst.appendChild(piece);
  }
  setTimeout(() => { confettiBurst.innerHTML = ""; }, 1200);
}

giftBox.addEventListener("click", () => {
  if (tapsLeft <= 0) return;
  tapsLeft--;
  giftBox.dataset.taps = 3 - tapsLeft;

  giftBox.classList.remove("tapped");
  void giftBox.offsetWidth;
  giftBox.classList.add("tapped");

  if (tapsLeft > 0){
    tapCountEl.textContent = tapsLeft;
  } else {
    giftHint.textContent = "opening...";
    giftBox.classList.add("opened");
    spawnConfetti();
    setTimeout(() => {
      gate.style.transition = "opacity 700ms ease";
      gate.style.opacity = "0";
      setTimeout(() => {
        gate.classList.add("hidden");
        main.classList.remove("hidden");
      }, 700);
    }, 750);
  }
});

/* MAIN STAGE */
const mainSteps = Array.from(document.querySelectorAll(".main-step"));
let currentMainStep = "menu";

function goToMainStep(name){
  const prev = mainSteps.find(s => s.dataset.step === currentMainStep);
  const next = mainSteps.find(s => s.dataset.step === name);
  if (!next || next === prev) return;
  prev.classList.add("leaving");
  prev.classList.remove("active");
  setTimeout(() => prev.classList.remove("leaving"), 600);
  next.classList.add("active");
  currentMainStep = name;
}

/* SURPRISES */
const tileDone = { modalCard:false, modalCollage:false, modalVideo:false };
const modals = {
  modalCard: document.getElementById("modalCard"),
  modalCollage: document.getElementById("modalCollage"),
  modalVideo: document.getElementById("modalVideo"),
};

function allTilesDone(){ return Object.values(tileDone).every(Boolean); }

function openModal(id){
  modals[id].classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(id){
  modals[id].classList.remove("open");
  document.body.style.overflow = "";

  if (id === "modalCard" && !cardAudio.paused){ cardAudio.pause(); cardAudio.currentTime = 0; }
  if (id === "modalVideo" && !video.paused){ video.pause(); }

  if (allTilesDone()){
    setTimeout(() => goToMainStep("cake"), 500);
  }
}

document.querySelectorAll(".menu-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    const id = tile.dataset.modal;
    tileDone[id] = true;
    tile.classList.add("done");
    openModal(id);
  });
});

document.querySelectorAll(".modal-close").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});
Object.entries(modals).forEach(([id, el]) => {
  el.addEventListener("click", (e) => { if (e.target === el) closeModal(id); });
});

/* CARD */
const card3d = document.getElementById("card3d");
const cardFront = document.getElementById("cardFront");
const cardAudio = document.getElementById("cardAudio");
cardFront.addEventListener("click", () => {
  card3d.classList.add("open");
  cardAudio.currentTime = 0;
  cardAudio.play().catch(() => {});
});

/* COLLAGE + LIGHTBOX */
const polaroidField = document.getElementById("polaroidField");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src){
  lightboxImg.src = src;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightboxImg.src = "";
  const anyModalOpen = Object.values(modals).some(m => m.classList.contains("open"));
  if (!anyModalOpen) document.body.style.overflow = "";
}

CONFIG.photos.forEach(({ file, caption }) => {
  const card = document.createElement("div");
  card.className = "polaroid";

  const frame = document.createElement("div");
  frame.className = "frame";
  frame.textContent = `+ add ${file}`;
  card.appendChild(frame);

  const cap = document.createElement("span");
  cap.className = "cap";
  cap.textContent = caption || "";
  card.appendChild(cap);

  const img = new Image();
  img.src = `assets/photos/${file}`;
  img.alt = caption || "our moment";
  img.onload = () => {
    frame.textContent = "";
    frame.style.padding = "0";
    frame.appendChild(img);
  };

  card.addEventListener("click", () => {
    const loadedImg = frame.querySelector("img");
    if (loadedImg) openLightbox(loadedImg.src);
  });

  polaroidField.appendChild(card);
});

document.getElementById("lightboxClose").addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

/* VIDEO */
const video = document.getElementById("birthdayVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");
video.addEventListener("loadeddata", () => videoPlaceholder.classList.add("hidden"));
video.addEventListener("error", () => videoPlaceholder.classList.remove("hidden"));
const videoSource = video.querySelector("source");
fetch(videoSource.src, { method: "HEAD" }).then(r => {
  if (!r.ok) videoPlaceholder.classList.remove("hidden");
}).catch(() => videoPlaceholder.classList.remove("hidden"));

/* CAKE */
const cakeEl = document.getElementById("cakeEl");
const blowBtn = document.getElementById("blowBtn");
let candleBlown = false;

function blowOutCandle(){
  if (candleBlown) return;
  candleBlown = true;
  cakeEl.classList.add("blown");
  setTimeout(() => goToMainStep("final"), 1500);
}

const HOLD_MS = 1100;
let holdTimer = null;
function startHold(){
  if (candleBlown) return;
  blowBtn.classList.add("charging");
  blowBtn.style.setProperty("--hold-duration", HOLD_MS + "ms");
  holdTimer = setTimeout(blowOutCandle, HOLD_MS);
}
function cancelHold(){
  clearTimeout(holdTimer);
  blowBtn.classList.remove("charging");
}
blowBtn.addEventListener("pointerdown", startHold);
blowBtn.addEventListener("pointerup", cancelHold);
blowBtn.addEventListener("pointerleave", cancelHold);
blowBtn.addEventListener("pointercancel", cancelHold);