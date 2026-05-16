const rounds = [
  {
    category: "理解細節",
    question: "劉姥姥第一次進入大觀園時，哪些地方最能看出她「沒見過世面」？請舉出兩個細節。",
    answer: "可從她對環境、器物、飲食、人物排場的驚奇反應回答。重點不在嘲笑她，而是看見大觀園的富貴華麗與階層差距。",
    hint: "從她看見的物、吃到的東西、遇到的人三個方向找。"
  },
  {
    category: "敘事觀點",
    question: "作者為什麼要安排劉姥姥這樣一位鄉下老婦進入大觀園？她的眼光有什麼作用？",
    answer: "劉姥姥像外來觀察者，能凸顯賈府生活的奢華、禮數與人物性格。她的樸拙反應也讓讀者更容易看出大觀園的特殊與荒唐。",
    hint: "想想：如果換成賈府中人來看大觀園，讀者會少看到什麼？"
  },
  {
    category: "多元判讀",
    question: "劉姥姥在眾人面前出糗時，你認為她是單純被取笑，還是也展現了生存智慧？請說明理由。",
    answer: "她確實成為眾人取樂的對象，但她懂得配合氣氛、放低身段，也藉此維持關係並獲得實際幫助，展現底層人物的彈性與智慧。",
    hint: "可以同時承認兩邊：被取笑，也懂得利用場合。"
  },
  {
    category: "人物比較",
    question: "從賈母、王熙鳳等人對劉姥姥的態度，可以看出她們各自什麼性格？請至少比較兩人。",
    answer: "賈母可看出喜熱鬧、享受被逗樂，也帶有上位者的寬厚；王熙鳳精明會掌控場面，懂得安排笑料與人情。答案須扣回具體行為。",
    hint: "比較時不要只寫形容詞，要指出她們做了什麼。"
  },
  {
    category: "情感辨析",
    question: "課文中的笑聲是善意、惡意，還是兩者都有？請找出你判斷的依據。",
    answer: "笑聲有複雜性：有熱鬧、親近、娛樂，也有階級距離與優越感。判斷需說明人物為何而笑、誰被看見或被消費。",
    hint: "觀察誰在笑、笑誰、為什麼笑。"
  },
  {
    category: "社會觀察",
    question: "如果把大觀園看成一個「豪門社會的縮影」，劉姥姥的出現揭露了哪些社會現象？",
    answer: "可談貧富差距、階級不平等、人情往來、權力關係、奢華生活與底層求生。劉姥姥的視角讓這些現象更明顯。",
    hint: "從貧富、權力、人情、求生四個詞挑兩個發展。"
  },
  {
    category: "角色層次",
    question: "文中哪些描寫讓劉姥姥顯得可笑？哪些描寫又讓她顯得可敬或可憐？請各舉一例。",
    answer: "可笑處多在言行與大觀園規矩不合；可敬處在她坦率、能忍、懂人情；可憐處在她因貧困而必須求助。好答案能同時看到喜劇與悲憫。",
    hint: "答案要有層次：不要只說她可笑。"
  },
  {
    category: "寫作手法",
    question: "作者使用誇張、對比或反差製造趣味。請選一種手法，說明它如何讓情節更生動。",
    answer: "例如以劉姥姥的樸拙對比大觀園的精緻奢華，形成反差；或用誇張反應製造喜劇效果。重點是說出手法與效果的關聯。",
    hint: "先選手法，再說文本例子，最後說效果。"
  },
  {
    category: "角色表達",
    question: "如果你是劉姥姥，離開大觀園後會如何向家人描述這一天？請用第一人稱寫三到五句。",
    answer: "答案重點在能用劉姥姥的身分口吻，呈現驚奇、尷尬、感謝或感慨。可加入具體場景，不只寫空泛心得。",
    hint: "用「我」開頭，加入一個大觀園裡的具體場面。"
  },
  {
    category: "立場論述",
    question: "讀完〈劉姥姥逛大觀園〉，你認為作品最值得討論的是「好笑」還是「辛酸」？請選一邊並提出兩個理由。",
    answer: "兩邊皆可成立。選好笑可談情節安排、語言反差、人物互動；選辛酸可談貧富差距、被取樂處境、求助的無奈。關鍵是理由完整且能回到文本。",
    hint: "立場只能先選一邊，但理由可以承認另一邊存在。"
  }
];

const teams = [
  { name: "怡紅隊", score: 0 },
  { name: "瀟湘隊", score: 0 },
  { name: "蘅蕪隊", score: 0 },
  { name: "稻香隊", score: 0 }
];

let current = 0;
let seconds = 120;
let timerId = null;
const completed = new Set();

const els = {
  roundNow: document.querySelector("#roundNow"),
  category: document.querySelector("#category"),
  mode: document.querySelector("#mode"),
  questionText: document.querySelector("#questionText"),
  answerBox: document.querySelector("#answerBox"),
  answerText: document.querySelector("#answerText"),
  hintBox: document.querySelector("#hintBox"),
  timer: document.querySelector("#timer"),
  teamList: document.querySelector("#teamList"),
  progressGrid: document.querySelector("#progressGrid"),
  prevBtn: document.querySelector("#prevBtn"),
  nextBtn: document.querySelector("#nextBtn"),
  hintBtn: document.querySelector("#hintBtn"),
  answerBtn: document.querySelector("#answerBtn"),
  startTimer: document.querySelector("#startTimer"),
  pauseTimer: document.querySelector("#pauseTimer"),
  resetTimer: document.querySelector("#resetTimer")
};

function renderRound() {
  const round = rounds[current];
  els.roundNow.textContent = String(current + 1);
  els.category.textContent = round.category;
  els.mode.textContent = "自學 2 分鐘｜小組討論｜全班表達";
  els.questionText.textContent = round.question;
  els.answerText.textContent = round.answer;
  els.answerBox.hidden = true;
  els.hintBox.hidden = true;
  els.hintBox.textContent = "";
  resetTimer();
  renderProgress();
}

function renderTeams() {
  els.teamList.innerHTML = "";
  teams.forEach((team, index) => {
    const row = document.createElement("div");
    row.className = "team";
    row.innerHTML = `
      <strong>${team.name}</strong>
      <div class="score-controls">
        <button type="button" aria-label="${team.name} 減一分">-</button>
        <span class="score">${team.score}</span>
        <button type="button" aria-label="${team.name} 加一分">+</button>
      </div>
    `;
    const buttons = row.querySelectorAll("button");
    buttons[0].addEventListener("click", () => changeScore(index, -1));
    buttons[1].addEventListener("click", () => changeScore(index, 1));
    els.teamList.appendChild(row);
  });
}

function renderProgress() {
  els.progressGrid.innerHTML = "";
  rounds.forEach((_, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dot";
    if (index === current) btn.classList.add("current");
    if (completed.has(index)) btn.classList.add("done");
    btn.textContent = String(index + 1);
    btn.addEventListener("click", () => {
      current = index;
      renderRound();
    });
    els.progressGrid.appendChild(btn);
  });
}

function changeScore(index, delta) {
  teams[index].score = Math.max(0, teams[index].score + delta);
  renderTeams();
}

function showAnswer() {
  els.answerBox.hidden = !els.answerBox.hidden;
  if (!els.answerBox.hidden) completed.add(current);
  renderProgress();
}

function showHint() {
  els.hintBox.textContent = rounds[current].hint;
  els.hintBox.hidden = !els.hintBox.hidden;
}

function moveRound(delta) {
  current = Math.min(rounds.length - 1, Math.max(0, current + delta));
  renderRound();
}

function formatTime(value) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const remainingSeconds = (value % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function renderTimer() {
  els.timer.textContent = formatTime(seconds);
  els.timer.classList.toggle("warning", seconds <= 20);
}

function startTimer() {
  if (timerId) return;
  timerId = window.setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    renderTimer();
    if (seconds === 0) pauseTimer();
  }, 1000);
}

function pauseTimer() {
  window.clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  pauseTimer();
  seconds = 120;
  renderTimer();
}

els.prevBtn.addEventListener("click", () => moveRound(-1));
els.nextBtn.addEventListener("click", () => moveRound(1));
els.answerBtn.addEventListener("click", showAnswer);
els.hintBtn.addEventListener("click", showHint);
els.startTimer.addEventListener("click", startTimer);
els.pauseTimer.addEventListener("click", pauseTimer);
els.resetTimer.addEventListener("click", resetTimer);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") moveRound(1);
  if (event.key === "ArrowLeft") moveRound(-1);
  if (event.key === " ") {
    event.preventDefault();
    showAnswer();
  }
});

renderTeams();
renderRound();
