const PIN_LENGTH   = 2;
  const CORRECT_HASH = "c6f3ac57944a531490cd39902d0f777715fd005efac9a30622d5f5205e7f6894";

  async function hashPin(pin) {
    const buf  = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(pin)));
    const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
    console.log("Hash for", pin, "→", hash);
    return hash;
  }
  window.hashPin = hashPin;

  let entered  = [];
  let locked   = false;
  let attempts = 0;

  const pinDisplay = document.getElementById("pinDisplay");
  const statusMsg  = document.getElementById("statusMsg");
  const lockScreen = document.getElementById("lockScreen");
  const siteContent= document.getElementById("siteContent");

  const heartsContainer = document.getElementById("heartsContainer");
  const heartChars = ["♥", "♡", "❤", "💕", "✿", "❀", "❤️"];
  function spawnHeart() {
    const el = document.createElement("div");
    el.className = "heart-particle";
    el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    el.style.left     = Math.random() * 100 + "vw";
    el.style.fontSize = (10 + Math.random() * 14) + "px";
    el.style.color    = `hsl(${340 + Math.random()*30}, ${60+Math.random()*20}%, ${60+Math.random()*15}%)`;
    const dur = 8 + Math.random() * 10;
    el.style.animationDuration  = dur + "s";
    el.style.animationDelay     = Math.random() * dur + "s";
    heartsContainer.appendChild(el);
    setTimeout(() => el.remove(), (dur * 2) * 1000);
  }
  for (let i = 0; i < 18; i++) spawnHeart();
  setInterval(spawnHeart, 1800);

  function renderDots(mode = "normal") {
    pinDisplay.innerHTML = "";
    for (let i = 0; i < PIN_LENGTH; i++) {
      const dot = document.createElement("div");
      dot.className = "pin-dot";
      if (i < entered.length) dot.classList.add(mode === "error" ? "error" : "filled");
      pinDisplay.appendChild(dot);
    }
  }
  renderDots();

  async function handleInput(val) {
    if (locked) return;

    if (val === "back") {
      entered.pop();
      setStatus("I love you!", "");
      renderDots();
      return;
    }
    if (val === "clear") {
      entered = [];
      setStatus("I love you!", "");
      renderDots();
      return;
    }
    if (entered.length >= PIN_LENGTH) return;

    entered.push(val);
    renderDots();

    if (entered.length === PIN_LENGTH) await checkPin();
  }

  async function checkPin() {
    locked = true;
    const hash = await hashPin(entered.join(""));

    if (hash === CORRECT_HASH) {
      let msg2;
      if (attempts > 6) msg2 = "Finally...";
      else if (attempts > 4) msg2 = "I knew you could do it ❤️"
      else if (attempts > 2) msg2 = "Good job babe ❤️";
      else msg2 = "Good job Babyy! I love youu ❤️";
      setStatus(msg2, "ok");
      renderDots("filled");

      setTimeout(() => {
        lockScreen.classList.add("hide");
        siteContent.classList.add("show");
      }, 700);

    } else {
      attempts++;
      renderDots("error");

      const wait = Math.min(2000 + (attempts - 1) * 500, 6000);
      setStatus(attempts > 2 ? `take ${wait/1000}s to think about your actions.` : "Come on, Sora...", "err");

      setTimeout(() => {
        entered = [];
        locked  = false;
        let msg;
        if (attempts > 6) msg = "Dont make me change my mind..";
        else if (attempts > 4) msg = "Its okay baby you got this";
        else if (attempts > 2) msg = "Okayy I still love you..?";
        else msg = "I love you!";
        setStatus(msg, "");
        renderDots();
      }, wait);
    }
  }

  function setStatus(msg, type) {
    statusMsg.textContent = msg;
    statusMsg.className   = "status-msg" + (type ? " " + type : "");
  }

  document.getElementById("numpad").addEventListener("click", (e) => {
    const btn = e.target.closest(".np-btn");
    if (!btn) return;
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 130);
    handleInput(btn.dataset.val);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") handleInput(e.key);
    if (e.key === "Backspace") handleInput("back");
    if (e.key === "Escape")    handleInput("clear");
    const btn = document.querySelector(`[data-val="${e.key}"]`);
    if (btn) { btn.classList.add("pressed"); setTimeout(() => btn.classList.remove("pressed"), 130); }
  });

  const target = new Date("2026-02-15T22:00:00");

  function updateCountdown() {
    const diff = target - new Date();
    if (diff <= 0) { document.getElementById("countdown1").textContent = "I love you, Sora ❤️"; return; }
    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
    document.getElementById("countdown1").textContent =
      `${h}h ${m}m ${s}s ♥`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

  const target2 = new Date("2026-02-16T22:00:00");

  function updateCountdown2() {
    const diff = target2 - new Date();
    if (diff <= 0) { document.getElementById("countdown2").textContent = "I love you more, Sora ❤️"; return; }
    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
    document.getElementById("countdown2").textContent =
      `${h}h ${m}m ${s}s ♥`;
}
updateCountdown2();
setInterval(updateCountdown2, 1000);

  const target3 = new Date("2026-02-20T22:00:00");

  function updateCountdown3() {
    const diff = target3 - new Date();
    if (diff <= 0) { document.getElementById("countdown3").textContent = "I love you to the moon and back, Sora ❤️"; return; }
    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
    document.getElementById("countdown3").textContent =
      `${h}h ${m}m ${s}s ♥`;
  }
updateCountdown3();
setInterval(updateCountdown3, 1000);