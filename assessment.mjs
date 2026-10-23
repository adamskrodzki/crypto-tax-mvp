export const QUESTIONS = [
  {
    id: "residency",
    short: "Rezydencja podatkowa",
    title: "Czy w 2026 roku jesteś polskim rezydentem podatkowym?",
    description: "Nie chodzi wyłącznie o obywatelstwo ani miejsce zameldowania.",
    why: "Rezydencja pomaga ustalić, czy typowe polskie zasady rozliczenia obejmują Twoją sytuację. Wątpliwości transgraniczne trzeba ocenić osobno.",
    kind: "single",
    options: [
      ["yes", "Tak, jestem polskim rezydentem podatkowym"],
      ["no", "Nie"],
      ["moved", "Przeprowadziłem(-am) się do Polski lub z Polski w 2026 roku"],
      ["unsure", "Nie wiem"]
    ]
  },
  {
    id: "activities",
    short: "Rodzaje operacji",
    title: "Co robiłeś(-aś) z kryptowalutami w 2026 roku?",
    description: "Zaznacz wszystkie pasujące odpowiedzi. Nie musisz podawać kwot ani liczby transakcji.",
    why: "Zakup, sprzedaż za zwykłe pieniądze, wymiana krypto–krypto i płatność kryptowalutą mają różne skutki podatkowe. Na razie ustalamy wyłącznie rodzaje operacji.",
    kind: "multi",
    options: [
      ["buy", "Kupowałem(-am) krypto za PLN, EUR, USD lub inną walutę tradycyjną"],
      ["sell", "Sprzedawałem(-am) krypto za PLN, EUR, USD lub inną walutę tradycyjną"],
      ["swap", "Wymieniałem(-am) jedną kryptowalutę na inną"],
      ["pay", "Płaciłem(-am) kryptowalutami za produkty lub usługi"],
      ["transfer", "Przenosiłem(-am) środki między własnymi portfelami lub kontami"],
      ["other", "Robiłem(-am) coś innego"],
      ["none", "Nie wykonywałem(-am) żadnych operacji w 2026 roku"]
    ],
    exclusive: "none"
  },
  {
    id: "sources",
    short: "Źródła transakcji",
    title: "Gdzie korzystałeś(-aś) z kryptowalut w 2026 roku?",
    description: "Wybierz wszystkie miejsca, które dotyczyły Twojej aktywności.",
    why: "Różne źródła oznaczają różne historie operacji. Dane z jednej giełdy zwykle łatwiej skompletować niż historię kilku giełd, portfeli, DEX-ów i transakcji poza nimi.",
    kind: "multi",
    options: [
      ["cex", "Giełdy kryptowalut (np. Binance, Kraken, Coinbase)"],
      ["wallet", "Własne portfele kryptowalutowe"],
      ["defi", "Aplikacje DeFi lub zdecentralizowane giełdy (DEX)"],
      ["exchange", "Kantory kryptowalut lub bitomaty"],
      ["p2p", "Transakcje bezpośrednio z innymi osobami (P2P)"],
      ["nftmarket", "Platformy obrotu NFT"],
      ["other", "Inne miejsca lub nie pamiętam wszystkich źródeł"]
    ]
  },
  {
    id: "special",
    short: "Nietypowe sytuacje",
    title: "Czy dotyczyły Cię któreś z poniższych sytuacji?",
    description: "Nie musisz znać ich klasyfikacji podatkowej. Zaznaczenie operacji nie oznacza, że automatycznie podlega opodatkowaniu.",
    why: "Część operacji wykracza poza zwykły zakup i sprzedaż na giełdzie. Mogą wymagać dodatkowych dokumentów i indywidualnej analizy.",
    kind: "multi",
    options: [
      ["airdrop", "Airdropy, bonusy lub darmowe tokeny"],
      ["staking", "Staking, lending, liquidity mining lub nagrody DeFi"],
      ["mining", "Mining (kopanie kryptowalut)"],
      ["nft", "Kupno, sprzedaż lub tworzenie NFT"],
      ["derivatives", "Futures, perpetuals, margin trading lub dźwignia"],
      ["bridge", "Przenoszenie tokenów przez mosty (bridges) lub wrapping"],
      ["gift", "Darowizny lub dziedziczenie kryptowalut"],
      ["loss", "Utrata środków, scam, kradzież lub upadek giełdy"],
      ["other", "Inne nietypowe operacje"],
      ["none", "Żadna z powyższych"]
    ],
    exclusive: "none"
  },
  {
    id: "history",
    short: "Poprzednie lata",
    title: "Czy kupowałeś(-aś) kryptowaluty przed 2026 rokiem?",
    description: "Nie musisz znać kwot ani szukać deklaracji.",
    why: "Udokumentowane wydatki z wcześniejszych lat i sposób ich wykazania w poprzednich PIT-38 mogą wpływać na bieżące rozliczenie.",
    kind: "single",
    options: [
      ["no", "Nie"],
      ["reported", "Tak, wykazywałem(-am) koszty w poprzednich PIT-38"],
      ["unreported", "Tak, ale nie składałem(-am) wcześniej PIT-38"],
      ["unsure", "Tak, ale nie pamiętam, jak były rozliczane"],
      ["unknown", "Nie wiem / nie pamiętam"]
    ]
  },
  {
    id: "records",
    short: "Dostępność danych",
    title: "Czy masz dostęp do historii swoich transakcji kryptowalutowych?",
    description: "Uwzględnij również zakupy z poprzednich lat. Nie musisz teraz przesyłać dokumentów.",
    why: "Brakujące dane utrudniają ustalenie przychodów i udokumentowanych kosztów, nawet przy niewielkiej liczbie operacji.",
    kind: "single",
    options: [
      ["complete", "Tak, mam kompletną historię"],
      ["mostly", "Mam większość historii, brakuje pojedynczych operacji"],
      ["partial", "Mam tylko część historii transakcji"],
      ["none", "Nie mam historii lub nie wiem, jak ją zdobyć"],
      ["unsure", "Nie wiem, czy historia jest kompletna"]
    ]
  }
];

export const EXAMPLE_ANSWERS = {
  residency: ["yes"],
  activities: ["buy", "sell", "pay", "other"],
  sources: ["cex", "wallet", "defi", "exchange"],
  special: ["airdrop", "nft", "derivatives", "bridge", "loss"],
  history: ["unreported"],
  records: ["partial"]
};

export function getLabels(question, selected = []) {
  return selected.map((id) => question.options.find(([value]) => value === id)?.[1] ?? id);
}

function has(answers, question, value) {
  return (answers[question] ?? []).includes(value);
}

function any(answers, question, values) {
  return values.some((value) => has(answers, question, value));
}

export function activeQuestions(answers = {}) {
  const inactive2026 = (answers.activities ?? []).includes("none");
  return QUESTIONS.filter(({ id }) => !inactive2026 || !["sources", "special"].includes(id));
}

export function assess(answers = {}) {
  const questions = activeQuestions(answers);
  const skipped = questions.filter(({ id }) => !(answers[id]?.length));
  const answered = questions.length - skipped.length;
  const residency = answers.residency?.[0];
  const scope = residency === "yes"
    ? { level: "standard", title: "Polska rezydencja — typowy zakres", note: "Wskazujesz polską rezydencję. Ocena dotyczy ogólnego scenariusza osoby fizycznej; nie potwierdza obowiązków podatkowych." }
    : residency === "no" || residency === "moved"
      ? { level: "crossborder", title: "Rezydencja wymaga osobnej analizy", note: "Podane informacje mogą oznaczać sytuację transgraniczną. Sam opis operacji krypto nie wystarczy do wskazania właściwego rozliczenia." }
      : { level: "unknown", title: "Zakres podatkowy nieustalony", note: "Bez pewności co do rezydencji nie da się rozstrzygnąć, czy standardowy polski scenariusz ma zastosowanie." };

  const findings = [];
  const add = (id, severity, title, detail, next) => {
    findings.push({ id, severity, title, detail, next });
  };

  const records = answers.records?.[0];
  const history = answers.history?.[0];
  const sources = answers.sources ?? [];
  const special = answers.special ?? [];
  const activities = answers.activities ?? [];
  let score = 0;

  if (has(answers, "activities", "sell") || has(answers, "activities", "pay")) {
    add("disposals", "info", "Sprzedaż lub płatność kryptowalutą", "Sprzedaż krypto za walutę tradycyjną oraz płatność krypto za towary lub usługi mogą stanowić odpłatne zbycie waluty wirtualnej. Potrzebne będą daty i wartości tych operacji.", "Zbierz potwierdzenia sprzedaży i płatności oraz ich wartości w PLN.");
  }
  if (has(answers, "activities", "swap")) {
    add("swap", "info", "Wymiany krypto–krypto", "Zwykła wymiana jednej waluty wirtualnej na inną jest co do zasady neutralna w polskim PIT. Nie należy jednak automatycznie stosować tej zasady do każdego instrumentu lub tokenu.", "Zachowaj historię wymian; sprawdź charakter niestandardowych tokenów.");
  }
  if (has(answers, "activities", "pay")) score += 2;
  if (has(answers, "activities", "other")) {
    score += 1;
    add("activities-other", "attention", "Operacje poza standardową listą", "Wskazałeś(-aś) dodatkowe działania, których ankieta nie klasyfikuje.", "Sporządź krótką listę tych operacji i sprawdź je indywidualnie.");
  }
  if (sources.length > 1) score += 1;
  if (sources.includes("wallet")) score += 1;
  if (sources.includes("defi")) score += 3;
  if (sources.includes("p2p")) score += 2;
  if (sources.includes("nftmarket")) score += 2;
  if (sources.includes("other")) score += 1;
  if (sources.some((id) => ["wallet", "defi", "p2p", "nftmarket", "other"].includes(id))) {
    add("sources", sources.includes("defi") ? "attention" : "info", "Historia z kilku źródeł", "Giełdy, portfele i aplikacje on-chain mogą pokazywać fragmenty tej samej operacji. Trzeba rozróżnić transfery własne od innych zdarzeń.", "Zrób listę giełd, adresów portfeli i aplikacji, z których korzystałeś(-aś).");
  }

  const complexSpecial = ["staking", "mining", "nft", "derivatives", "loss"];
  for (const id of special) {
    if (id === "none") continue;
    score += complexSpecial.includes(id) ? 3 : 2;
  }
  if (special.some((id) => id !== "none")) {
    const labels = getLabels(QUESTIONS[3], special.filter((id) => id !== "none"));
    add("special", "attention", "Operacje wymagające interpretacji", "Zaznaczone przez Ciebie zdarzenia (" + labels.join(", ").toLowerCase() + ") nie powinny być automatycznie rozliczane jak zwykłe transakcje spot. Charakter tokenów, kontraktów i nagród ma znaczenie.", "Przygotuj osobną historię tych operacji do weryfikacji ze specjalistą.");
  }
  if (has(answers, "special", "loss")) {
    add("loss", "critical", "Utrata środków lub zdarzenie nadzwyczajne", "Kradzież, scam czy upadłość platformy nie przesądzają same o możliwości podatkowego odliczenia utraconych kwot. Potrzebne są okoliczności i dokumenty.", "Zabezpiecz dowody, korespondencję i potwierdzenia dotyczące zdarzenia.");
  }

  if (history === "unreported") {
    score += 3;
    add("history", "critical", "Zakupy sprzed 2026 r. bez wcześniejszych PIT-38", "Wydatki na nabycie walut wirtualnych zasadniczo wykazuje się w roku ich poniesienia, nawet bez sprzedaży. Sposób uporządkowania poprzednich lat wymaga sprawdzenia, a nie prostego dopisania wszystkiego do 2026 r.", "Ustal lata i kwoty zakupów, zbierz dowody oraz sprawdź z doradcą potrzebę złożenia zaległych deklaracji lub korekt.");
  } else if (history === "unsure" || history === "unknown") {
    score += 2;
    add("history", "attention", "Niepewne koszty z poprzednich lat", "Historia zakupów i sposób ujęcia kosztów w PIT-38 mogą mieć znaczenie dla bieżącego rozliczenia.", "Sprawdź poprzednie deklaracje PIT-38 i zestawienia zakupów.");
  } else if (history === "reported") {
    score += 1;
    add("history", "info", "Koszty z poprzednich lat", "Wcześniejsze deklaracje mogą zawierać nadwyżkę kosztów do uwzględnienia w kolejnym roku. Jej kwotę trzeba potwierdzić w dokumentach.", "Odszukaj ostatnie deklaracje PIT-38 i potwierdzenia kosztów.");
  }

  if (records === "mostly") score += 1;
  if (records === "partial") score += 3;
  if (records === "none") score += 4;
  if (records === "unsure") score += 1;
  if (["mostly", "partial", "none", "unsure"].includes(records)) {
    add("records", records === "partial" || records === "none" ? "critical" : "attention", "Niekompletna historia transakcji", "Bez kompletnych danych trudno wiarygodnie ustalić wartości przychodów i poniesionych kosztów.", "Najpierw odzyskaj eksporty z giełd i historię portfeli, również dla poprzednich lat.");
  }

  if (scope.level !== "standard") {
    add("scope", "critical", "Niepewna polska rezydencja", scope.note, "Ustal rezydencję podatkową przed wyborem sposobu rozliczenia.");
  }
  if (skipped.length) {
    add("missing", "attention", "Ocena na podstawie części odpowiedzi", "Pominięto " + skipped.length + " z " + questions.length + " pytań. Nieznane okoliczności mogą istotnie zmienić wynik.", "Uzupełnij brakujące odpowiedzi, jeżeli będziesz je znać.");
  }
  if (!findings.length) {
    add("basic", "info", "Standardowy zakres informacji", "Na podstawie zaznaczonych odpowiedzi nie widać szczególnych komplikacji. Nie oznacza to jednak, że nie ma obowiązku złożenia PIT-38.", "Zachowaj dowody nabycia i zbycia walut wirtualnych oraz sprawdź dane za cały rok.");
  }

  const hasKnownComplexity = score >= 8 || (history === "unreported" && ["partial", "none"].includes(records));
  let complexity;
  if (hasKnownComplexity) {
    complexity = { level: "high", title: "Wysoka złożoność", note: "Wskazane elementy mogą wymagać pracy nad danymi i weryfikacji poszczególnych operacji." };
  } else if (answered < 3) {
    complexity = { level: "unknown", title: "Za mało danych do oceny", note: "Za mało odpowiedzi, by przypisać wiarygodny poziom złożoności." };
  } else if (score >= 3) {
    complexity = { level: "medium", title: "Umiarkowana złożoność", note: "Występują elementy wykraczające poza najprostszy scenariusz jednej giełdy." };
  } else {
    complexity = { level: "low", title: "Wstępnie niewielka złożoność", note: "W znanym zakresie sytuacja wygląda na względnie prostą, ale nie jest to potwierdzenie poprawności rozliczenia." };
  }

  const confidence = skipped.length >= 3 ? "niska" : skipped.length > 0 || records === "unsure" ? "ograniczona" : "wstępna";
  const priorities = [];
  if (history === "unreported") priorities.push("Zweryfikuj zakupy i obowiązki deklaracyjne za poprzednie lata.");
  if (records === "partial" || records === "none") priorities.push("Odtwórz brakującą historię transakcji, zaczynając od największych źródeł.");
  if (special.some((id) => id !== "none")) priorities.push("Oddziel zdarzenia nietypowe od zwykłego handlu spot i przygotuj je do indywidualnej analizy.");
  if (sources.some((id) => ["wallet", "defi", "p2p"].includes(id))) priorities.push("Połącz historię giełd i portfeli; rozpoznaj własne transfery między nimi.");
  if (scope.level !== "standard") priorities.push("Ustal zakres obowiązków podatkowych wynikający z rezydencji.");
  if (!priorities.length) priorities.push("Zbierz zestawienie zakupów, sprzedaży i prowizji oraz wcześniejsze PIT-38 (jeżeli były).");
  priorities.push("Przed złożeniem PIT-38 porównaj wynik z dokumentami i aktualnymi informacjami Ministerstwa Finansów.");
  return { scope, complexity, confidence, score, answered, skipped, findings, priorities };
}
