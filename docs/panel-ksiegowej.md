# Panel księgowej

Panel jest obszarem pracy biura. Księgowa wybiera sprawę lub zadanie, sprawdza materiały klienta i decyduje o ujęciu pozycji. Sprawa trafia do panelu dopiero po przekazaniu jej przez klienta. [Przekazanie sprawy](portal-klienta.md#5-weryfikacja)

## Klienci i rozliczenia

Kolejka pokazuje nazwę klienta, numer sprawy, status, następną decyzję i datę przekazania. **Otwórz sprawę** lub kliknięcie klienta przechodzi do szczegółów. Wyszukiwarka przyjmuje fragment imienia, nazwiska lub numeru sprawy. Wyszukiwanie i filtr statusu działają łącznie. Karty nad tabelą liczą wszystkie przekazane sprawy według grupy statusu.

| Stan sprawy w tabeli | Warunek | Filtr |
| --- | --- | --- |
| **Do sprawdzenia** | Co najmniej jedna otwarta pozycja jest po stronie księgowej. | **Do sprawdzenia** |
| **Do zatwierdzenia** | Wszystkie pozycje mają rozstrzygnięcie albo sprawa nie miała zadań. | **Do sprawdzenia** |
| **Czeka na klienta** | Są otwarte pozycje i każda z nich ma pytanie oczekujące na odpowiedź. | **Czeka na klienta** |
| **Zatwierdzona** | Księgowa potwierdziła kontrolę końcową. | **Zatwierdzone** |

Filtr **Wszystkie** pokazuje całą kolejkę. Kolumna **Następna decyzja** wybiera najpierw zadanie dostępne dla księgowej, a przy jego braku pierwsze oczekujące. W sprawie z kompletem decyzji prowadzi do sprawdzenia sum, a po zatwierdzeniu pokazuje zakończoną kontrolę. [Statusy](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L479-L490) · [Kolejka i filtry](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L904-L938)

## Zadania do sprawdzenia

Druga pozycja w nawigacji zbiera wszystkie nierozstrzygnięte zadania z przekazanych spraw. Każdy wiersz wskazuje sprawę, konkretną pozycję i to, po czyjej stronie jest następny ruch. **Otwórz zadanie** przechodzi bezpośrednio do jego szczegółów. Po rozstrzygnięciu znika ono z tej kolejki, a w sprawie pozostaje z materiałami i podstawą decyzji. [Kolejka zadań](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L939-L950)

## Widok sprawy

Nagłówek pokazuje klienta, numer i rok sprawy, status, szacowany lub zatwierdzony podatek, czas i limit ochrony w planie oraz liczbę operacji i źródeł. Sprawa z otwartymi pozycjami otwiera się na karcie **Zadania**, a sprawa z zakończonymi decyzjami na karcie **Rozliczenie**. Z kolejki zadań otwiera się wskazana pozycja. **Klienci i rozliczenia** wraca do kolejki spraw.

| Karta | Dostępne działania |
| --- | --- |
| **Zadania** | Wybrać pozycję, odczytać powód zadania, odpowiedź klienta i dowody, poprosić o uzupełnienie albo rozstrzygnąć pozycję. Licznik w nazwie karty obejmuje otwarte pozycje. Gdy licznik wynosi zero, ekran daje przejście do kontroli końcowej. |
| **Operacje** | Przełączyć grupy i listę, wyszukać i filtrować zapisy oraz otworzyć szczegóły. Widok korzysta z tego samego rejestru co portal klienta. |
| **Rozliczenie** | Sprawdzić warunki zatwierdzenia, sumy, metody i liczbę zapisów z poszczególnych źródeł, opłacony plan i osobne opłaty za import. Po zatwierdzeniu otworzyć pakiet. |
| **Dokumenty** | Otworzyć podglądy źródeł i załączników oraz pakiet po zatwierdzeniu. |
| **Historia sprawy** | Odczytać zdarzenia od najnowszego, w tym przekazanie sprawy, pytania, odpowiedzi i rozstrzygnięcia. |

[Zakładki sprawy](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1019-L1036) · [Operacje i dokumenty](operacje-i-dowody.md)

## Praca nad pozycją

| Stan zadania | Co widzi i może zrobić księgowa |
| --- | --- |
| **Do sprawdzenia** | Dane operacji, powód zadania, odpowiedź z kreatora i dowód, jeśli jest. Może wybrać **Poproś o uzupełnienie** albo **Zapisz decyzję**. |
| **Czeka na klienta** | Wysłane pytanie i dotychczasowy wątek. Do czasu odpowiedzi nie ma przycisków do ponownego pytania i rozstrzygnięcia. W kolejce zadań następny ruch jest po stronie klienta. |
| **Klient odpowiedział** | Odpowiedź i opcjonalny plik w tym samym wątku. Może rozstrzygnąć pozycję lub zadać kolejne pytanie. |
| **Rozstrzygnięte** | Wybrane ujęcie, podstawa decyzji i data. Pozycja pozostaje w sprawie do wglądu. |

**Poproś o uzupełnienie** otwiera dane operacji i edytowalne pytanie dobrane do rodzaju braku. **Wyślij pytanie** wymaga tekstu do 1500 znaków. Po wysłaniu klient widzi pytanie w portalu przy tej samej pozycji. Odpowiedź z tekstem lub plikiem wraca do jej wątku. Na pozycję przypada najwyżej jedno oczekujące pytanie. Kilka różnych pozycji może jednocześnie czekać na klienta. [Okno pytania](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1181-L1186) · [Widok klienta](portal-klienta.md#6-rozliczenie)

**Zapisz decyzję** otwiera dostępne ujęcia, obecny podatek i podgląd podatku dla poszczególnych ujęć, gdy da się go policzyć z dostępnej kwoty. Przy braku kwoty podgląd jest dostępny dla ujęcia poza wyliczeniem. Księgowa podaje podstawę decyzji do 1500 znaków i potwierdzoną kwotę, jeśli ujęcie wpływa na wyliczenie, a pozycja nie ma jeszcze kwoty. Wystarczalność dowodu ocenia księgowa, a formularz sprawdza wybór, podstawę i wymaganą kwotę. **Anuluj** lub **Zamknij** wychodzi z okna bez zapisu. Potwierdzenie zamyka pozycję i przelicza sumy. Zapisana decyzja pozostaje do odczytu. [Okno decyzji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1187-L1205) · [Ujęcia dla każdego rodzaju pozycji](operacje-i-dowody.md#pytania-i-decyzje-przy-pozycjach)

## Kontrola końcowa

| Pozycja kontroli | Kiedy ma stan **Gotowe** |
| --- | --- |
| **Dane przekazane przez klienta** | Zapisano datę przekazania sprawy do biura. |
| **Plan opłacony** | Zapisano potwierdzenie płatności za plan. |
| **Weryfikacja tożsamości i AML** | Weryfikacja zakończyła się w portalu klienta. |
| **Historia z deklarowanych źródeł** | Wszystkie wybrane źródła zostały uzupełnione lub mają potwierdzone 0 operacji, a łącznie istnieje co najmniej jedna operacja. |
| **Otwarte decyzje** | Wszystkie pozycje zostały rozstrzygnięte. |

Przy niespełnionym warunku karta oznacza brak i oferuje powrót do zadań. **Zatwierdź rozliczenie** otwiera sumy oraz pole potwierdzenia kontroli danych, decyzji i końcowego wyliczenia. **Potwierdź zatwierdzenie** wymaga zaznaczenia pola i ponownie sprawdza warunki. Zapis aktualizuje status po obu stronach, dodaje datę i wpis w historii, a także udostępnia pakiet rozliczenia. Złożenie deklaracji zachowuje status **brak potwierdzenia**. [Lista kontroli](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L999-L1018) · [Zapis zatwierdzenia](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1610-L1616)
