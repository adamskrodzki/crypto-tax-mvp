import { QUESTIONS, EXAMPLE_ANSWERS, activeQuestions, assess, getLabels } from "./assessment.mjs";

const SOURCE_URL = "https://www.podatki.gov.pl/podatki-osobiste/pit/informacje-podstawowe/co-jest-opodatkowane/zbycie-kryptowalut";
const byId = (id) => document.getElementById(id);
const cloneAnswers = (source) => Object.fromEntries(Object.entries(source).map(([key, value]) => [key, [...value]]));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));
const screens = {
  landing: byId("landing-screen"),
  questionnaire: byId("questionnaire-screen"),
  report: byId("report-screen")
};
let answers = {};
let currentQuestion = "residency";
let isExample = false;
let reportMarkup = "";

function showScreen(name) {
  for (const [id, el] of Object.entries(screens)) el.hidden = id !== name;
  window.scrollTo({ top: 0, behavior: "auto" });
  const heading = screens[name].querySelector("h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}
function resetSurvey() {
  answers = {};
  isExample = false;
  currentQuestion = "residency";
  renderQuestion();
  showScreen("questionnaire");
}
function showLanding() { isExample = false; showScreen("landing"); }
function renderQuestion() {
  const flow = activeQuestions(answers);
  if (!flow.some((q) => q.id === currentQuestion)) currentQuestion = flow[0].id;
  const index = flow.findIndex((q) => q.id === currentQuestion);
  const question = flow[index];
  const selected = answers[question.id] ?? [];
  byId("step-label").textContent = "PYTANIE " + (index + 1) + " Z " + flow.length;
  byId("step-percent").textContent = Math.round(((index + 1) / flow.length) * 100) + "%";
  byId("step-progress").setAttribute("aria-valuenow", String(index + 1));
  byId("step-progress").setAttribute("aria-valuemax", String(flow.length));
  byId("progress-fill").style.width = (((index + 1) / flow.length) * 100) + "%";
  byId("question-short").textContent = question.short.toUpperCase();
  byId("question-title").textContent = question.title;
  byId("question-description").textContent = dynamicDescription(question);
  byId("question-why").textContent = question.why;
  const context = contextualTip(question);
  const fieldset = byId("question-options");
  fieldset.innerHTML = '<legend class="visually-hidden">Wybierz odpowiedź</legend>' + (context ? '<p class="context-note">' + escapeHtml(context) + "</p>" : "") +
    question.options.map(([value, label]) => {
      const checked = selected.includes(value);
      return '<label class="option"><input type="' + (question.kind === "multi" ? "checkbox" : "radio") +
        '" name="' + escapeHtml(question.id) + '" value="' + escapeHtml(value) +
        '"' + (checked ? " checked" : "") + '><span>' + escapeHtml(label) + "</span></label>";
    }).join("");
  for (const input of fieldset.querySelectorAll("input")) {
    input.addEventListener("change", () => handleSelection(question, input));
  }
  byId("prev-question").textContent = index === 0 ? "← Strona główna" : "← Wstecz";
  byId("next-question").innerHTML = index === flow.length - 1 ? 'Zobacz mój wynik <span aria-hidden="true">→</span>' : 'Dalej <span aria-hidden="true">→</span>';
  byId("next-question").disabled = selected.length === 0;
}
function dynamicDescription(question) {
  if (question.id === "records" && answers.history?.includes("no"))
    return "Pomyśl o operacjach z 2026 roku. Nie musisz teraz pobierać plików.";
  if (question.id === "records" && answers.history?.some((v) => v !== "no"))
    return "Uwzględnij historię z 2026 roku i wcześniejsze zakupy. Nie musisz teraz pobierać dokumentów.";
  return question.description;
}
function contextualTip(question) {
  if (question.id === "activities" && ["no", "moved", "unsure"].includes(answers.residency?.[0]))
    return "Twoja rezydencja może wymagać osobnej analizy, ale rodzaje operacji nadal pomogą uporządkować sytuację.";
  if (question.id === "sources" && answers.activities?.includes("pay"))
    return "Wskazałeś(-aś) płatności kryptowalutą. Zastanów się także, z jakich portfeli lub aplikacji wychodziły środki.";
  if (question.id === "special" && answers.sources?.includes("defi"))
    return "Wskazałeś(-aś) aplikacje takie jak Uniswap lub Aave. Sprawdź, czy dostawałeś(-aś) nagrody, pożyczałeś(-aś) krypto albo przenosiłeś(-aś) je między sieciami.";
  if (question.id === "special" && answers.sources?.length === 1 && answers.sources[0] === "cex")
    return "Wskazałeś(-aś) tylko giełdy. Sprawdź, czy oprócz zwykłego kupna i sprzedaży korzystałeś(-aś) z kontraktów na cenę krypto lub otrzymywałeś(-aś) nagrody za trzymanie krypto.";
  if (question.id === "history" && answers.activities?.includes("none"))
    return "Ponieważ nie wskazano operacji w 2026 roku, pominęliśmy pytania o miejsca aktywności i nietypowe operacje z tego roku. Wcześniejsze zakupy nadal mogą być istotne.";
  return "";
}
function handleSelection(question, input) {
  if (question.kind === "single") {
    answers[question.id] = [input.value];
  } else {
    const values = new Set(answers[question.id] ?? []);
    if (input.checked) {
      if (question.exclusive === input.value) values.clear();
      else if (question.exclusive) values.delete(question.exclusive);
      values.add(input.value);
    } else values.delete(input.value);
    if (values.size) answers[question.id] = [...values];
    else delete answers[question.id];
  }
  if (question.id === "activities" && answers.activities?.includes("none")) {
    delete answers.sources;
    delete answers.special;
  }
  renderQuestion();
}
function moveForward(skip = false) {
  const question = activeQuestions(answers).find((q) => q.id === currentQuestion);
  if (skip) delete answers[question.id];
  if (!skip && !answers[question.id]?.length) return;
  const flow = activeQuestions(answers);
  const index = flow.findIndex((q) => q.id === currentQuestion);
  if (index >= flow.length - 1) showReport();
  else {
    currentQuestion = flow[index + 1].id;
    renderQuestion();
    byId("question-title").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}
function moveBack() {
  const flow = activeQuestions(answers);
  const index = flow.findIndex((q) => q.id === currentQuestion);
  if (index <= 0) showLanding();
  else {
    currentQuestion = flow[index - 1].id;
    renderQuestion();
    byId("question-title").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}
function showExample() {
  answers = cloneAnswers(EXAMPLE_ANSWERS);
  currentQuestion = "residency";
  isExample = true;
  showReport();
}
function contactCopy(result) {
  if (result.scope.level !== "standard") {
    return {
      kicker: "POMOC W ROZLICZENIU",
      title: "Nie masz pewności, jak rozliczyć krypto w Polsce?",
      description: "Twoja rezydencja podatkowa może wymagać osobnego sprawdzenia. Warto wyjaśnić tę kwestię, zanim zaczniesz przygotowywać deklarację.",
      button: "Chcę skonsultować sytuację →"
    };
  }
  if (result.complexity.level === "high") {
    return {
      kicker: "MOŻEMY POMÓC",
      title: "Wygląda na to, że możesz potrzebować pomocy.",
      description: "W Twoich odpowiedziach pojawiły się operacje lub braki w danych, które warto przeanalizować indywidualnie przed rozliczeniem.",
      button: "Chcę uzyskać pomoc →"
    };
  }
  if (result.complexity.level === "medium") {
    return {
      kicker: "POMOC W ROZLICZENIU",
      title: "Kilka elementów warto jeszcze sprawdzić.",
      description: "Twoje rozliczenie może wymagać dodatkowego uporządkowania danych. Pomoc w zebraniu historii i sprawdzeniu operacji może ułatwić przygotowanie PIT-38.",
      button: "Chcę uzyskać pomoc →"
    };
  }
  if (result.complexity.level === "unknown") {
    return {
      kicker: "POMOC W OCENIE",
      title: "Brakuje kilku informacji o Twojej sytuacji.",
      description: "Możesz wrócić do pominiętych pytań albo poprosić o pomoc w ustaleniu, jakie dane będą potrzebne do rozliczenia.",
      button: "Chcę zapytać o rozliczenie →"
    };
  }
  return {
    kicker: "POMOC W ROZLICZENIU",
    title: "Twoja sytuacja wygląda na stosunkowo prostą.",
    description: "To dobry punkt wyjścia. Jeśli chcesz, możemy pomóc uporządkować historię transakcji i przygotować się do rozliczenia.",
    button: "Chcę uprościć rozliczenie →"
  };
}
function showReport() {
  const result = assess(answers);
  const contact = contactCopy(result);
  byId("contact-kicker").textContent = contact.kicker;
  byId("signup-title").textContent = contact.title;
  byId("signup-description").textContent = contact.description;
  byId("contact-button").textContent = contact.button;
  reportMarkup = buildReport(answers, result, isExample);
  byId("report-content").innerHTML = reportMarkup;
  byId("report-mode").textContent = isExample ? "PRZYKŁADOWY RAPORT · DANE DEMONSTRACYJNE" : "TWÓJ WSTĘPNY RAPORT · 2026";
  byId("email-feedback").hidden = true;
  byId("email").value = "";
  showScreen("report");
}
function buildReport(currentAnswers, result, example) {
  const { complexity, scope, findings, priorities, confidence } = result;
  const titleClass = "result-card__title--" + escapeHtml(complexity.level);
  const activeIds = new Set(activeQuestions(currentAnswers).map((q) => q.id));
  const findingsHtml = findings.map((item) =>
    '<article class="finding finding--' + escapeHtml(item.severity) + '">' +
    '<span class="finding__dot" aria-hidden="true"></span><div>' +
    "<h3>" + escapeHtml(item.title) + "</h3>" +
    "<p>" + escapeHtml(item.detail) + "</p>" +
    '<div class="finding__next">Co zrobić: ' + escapeHtml(item.next) + "</div></div></article>"
  ).join("");
  const rows = QUESTIONS.map((question) => {
    const isInactive = !activeIds.has(question.id);
    const selected = currentAnswers[question.id] ?? [];
    const label = isInactive ? "Nie dotyczy (pominięto na podstawie wcześniejszych odpowiedzi)"
      : selected.length ? getLabels(question, selected).join("; ") : "Pominięto — brak odpowiedzi";
    return '<div class="answer-item' + (isInactive || !selected.length ? " answer-item--skipped" : "") + '">' +
      "<dt>" + escapeHtml(question.short) + "</dt><dd>" + escapeHtml(label) + "</dd></div>";
  }).join("");
  return '<article class="report-shell">' +
    '<header class="report-hero"><div class="report-hero__tag">KRYPTO·PIT / RAPORT WSTĘPNY / 2026</div>' +
    '<h1 id="report-title">' + (example ? "Tak może wyglądać wynik." : "Twój wynik jest gotowy.") + "</h1>" +
    '<p class="report-hero__intro">To orientacyjna ocena złożoności na podstawie deklarowanych rodzajów operacji. Nie oblicza podatku, nie zastępuje doradztwa podatkowego i nie stanowi deklaracji PIT-38.</p>' +
    (example ? '<span class="report-hero__demo">To przykład — nie Twoje dane</span>' : "") + "</header>" +
    '<div class="report-body"><div class="result-grid">' +
    '<section class="result-card"><span class="result-card__eyebrow">Złożoność operacji</span><h2 class="result-card__title ' + titleClass + '">' + escapeHtml(complexity.title) +
    "</h2><p>" + escapeHtml(complexity.note) + "</p></section>" +
    '<section class="result-card"><span class="result-card__eyebrow">Zakres podatkowy</span><h2 class="result-card__title">' + escapeHtml(scope.title) +
    "</h2><p>" + escapeHtml(scope.note) + "</p></section></div>" +
    '<p class="report-lead">Pewność oceny: <strong>' + escapeHtml(confidence) + '</strong>. To wstępna klasyfikacja, nie ocena kompletności dokumentów ani zobowiązania podatkowego.</p>' +
    '<h2 class="report-subhead">Na co zwrócić uwagę?</h2><p class="report-lead">Poniższe punkty wynikają z zaznaczonych odpowiedzi. Nie każda operacja oznacza obowiązek zapłaty podatku.</p>' +
    '<div class="findings">' + findingsHtml + "</div>" +
    '<h2 class="report-subhead">Sugerowane następne kroki</h2><ol class="next-steps">' + priorities.map((item) => "<li>" + escapeHtml(item) + "</li>").join("") + "</ol>" +
    '<h2 class="report-subhead">Twoje odpowiedzi</h2><p class="report-lead">Podsumowanie pomaga wrócić do sprawy później albo omówić ją z księgowym.</p>' +
    '<dl class="answer-list">' + rows + "</dl>" +
    '<div class="report-disclaimer"><strong>Ważne:</strong> Wynik jest wstępną oceną opartą wyłącznie na Twoich odpowiedziach. Nie weryfikuje transakcji, wartości, dokumentów ani wszystkich wyjątków prawa podatkowego. Nie służy do wyliczania lub składania PIT-38. Aktualne zasady sprawdź w ' +
    '<a href="' + SOURCE_URL + '" target="_blank" rel="noopener noreferrer">oficjalnym serwisie Ministerstwa Finansów</a>. Przed złożeniem deklaracji skonsultuj wątpliwości z uprawnionym specjalistą.</div>' +
    "</div></article>";
}
const EXPORT_CSS = [
  "body{margin:0;background:#f5f7f4;color:#182b28;font:15px/1.6 system-ui,Arial,sans-serif}",
  "main{max-width:900px;margin:36px auto;background:#fff;box-shadow:0 15px 60px #203b2d22}",
  ".report-hero{background:#1b3232;color:#fff;padding:38px}.report-hero__tag{color:#d9f46c;font-size:12px;font-weight:bold;letter-spacing:.08em}.report-hero h1{font-size:36px;line-height:1.2;margin:18px 0}.report-hero__intro{color:#d3e0dd;max-width:730px}.report-hero__demo{display:inline-block;background:#36564a;padding:6px 10px;border-radius:20px}",
  ".report-body{padding:35px}.result-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.result-card{background:#f2f7ee;padding:22px;border-radius:12px}.result-card__eyebrow{text-transform:uppercase;font-size:11px;letter-spacing:.08em;color:#5d7460}.result-card__title{font-size:24px;line-height:1.2}.result-card__title--high{color:#ad5d34}.result-card__title--medium{color:#90782b}.result-card__title--low{color:#557d56}.result-card p,.report-lead,.finding p,.answer-item dd{color:#52685a;font-size:13px}",
  ".report-subhead{margin:34px 0 12px;font-size:23px}.findings{display:grid;gap:12px}.finding{display:grid;grid-template-columns:10px 1fr;gap:12px;border:1px solid #dce6dc;padding:15px;border-radius:10px}.finding__dot{width:9px;height:9px;border-radius:50%;background:#709a78;margin-top:7px}.finding--attention .finding__dot{background:#c59e4c}.finding--critical .finding__dot{background:#bf6d4d}.finding h3{margin:0}.finding p{margin:7px 0}.finding__next{font-size:13px;font-weight:650}.next-steps li{margin:9px 0}",
  ".answer-list{border:1px solid #dce5de;border-radius:10px}.answer-item{display:grid;grid-template-columns:200px 1fr;gap:16px;padding:12px 14px;border-bottom:1px solid #dce5de;font-size:13px}.answer-item:last-child{border:0}.answer-item dt{font-weight:bold}.answer-item dd{margin:0}.report-disclaimer{margin-top:30px;background:#f6f7ee;border-radius:10px;padding:18px;font-size:12px}",
  "@media(max-width:650px){main{margin:0}.result-grid{grid-template-columns:1fr}.answer-item{grid-template-columns:1fr;gap:4px}.report-body,.report-hero{padding:24px}}",
  "@media print{body{background:#fff}main{margin:0;box-shadow:none;max-width:none}.finding,.result-card,.answer-item{break-inside:avoid}.report-subhead{break-after:avoid}}"
].join("\n");
function downloadHtmlReport() {
  const file = '<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    "<title>Raport wstępny KryptoPIT 2026</title><style>" + EXPORT_CSS + "</style></head><body>" +
    "<main>" + reportMarkup + "</main></body></html>";
  const blob = new Blob([file], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = isExample ? "kryptopit-przykladowy-raport-2026.html" : "kryptopit-raport-2026.html";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "start") resetSurvey();
  if (action === "example") showExample();
});
byId("brand-link").addEventListener("click", (event) => { event.preventDefault(); showLanding(); });
byId("quit-survey").addEventListener("click", showLanding);
byId("reset-survey").addEventListener("click", resetSurvey);
byId("prev-question").addEventListener("click", moveBack);
byId("skip-question").addEventListener("click", () => moveForward(true));
byId("next-question").addEventListener("click", () => moveForward(false));
byId("edit-answers").addEventListener("click", () => {
  isExample = false;
  currentQuestion = activeQuestions(answers).at(-1).id;
  renderQuestion();
  showScreen("questionnaire");
});
byId("restart-survey").addEventListener("click", resetSurvey);
byId("download-report").addEventListener("click", downloadHtmlReport);
byId("print-report").addEventListener("click", () => window.print());
byId("email-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const feedback = byId("email-feedback");
  feedback.hidden = false;
  feedback.textContent = "Nie możemy jeszcze przyjąć zgłoszenia. Twój adres e-mail nie został zapisany ani wysłany.";
  byId("email").value = "";
});
