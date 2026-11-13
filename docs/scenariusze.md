# Scenariusze i dane przykładowe

Otwórz plik HTML w przeglądarce. Pasek **Makieta** nad aplikacją zawiera **Portal klienta**, **Panel księgowej**, wybór scenariusza w portalu, **Wstaw dane przykładowe** przy dostępnych formularzach i **Przywróć dane**. Przełączenie roli pokazuje ten sam stan spraw. Otwarcie sprawy w panelu ustawia odpowiadający jej scenariusz klienta. Wstawienie przykładu uzupełnia formularz. Klient nadal wybiera akcję, która zapisze dane. Przywrócenie stanu początkowego wymaga potwierdzenia i dotyczy wszystkich trzech spraw. [Makieta](../working/kryptotax-mockupy.html) · [Sterowanie prezentacją](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L223-L234)

Makieta zapisuje stan spraw w pamięci lokalnej przeglądarki. Po ponownym otwarciu wybiera portal Marty i wczytuje ostatni zapis, jeśli jest dostępny. Zmiany danych w drugiej karcie odświeżają widok, gdy obie karty korzystają z tego samego zapisu i przeglądarka przekazuje zdarzenia pamięci lokalnej. Pasek jest sterowaniem prezentacją obu ról. W usłudze portal klienta i obszar pracy biura mają różne zadania i dostęp. [Zapis i wczytanie](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L524-L547) · [Aktualizacja z drugiej karty](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1641-L1647)

## Stan początkowy

| Scenariusz | Stan klienta | Stan w panelu księgowej |
| --- | --- | --- |
| **Marta Wiśniewska · KT-2025-104** | Otwarty pierwszy krok, domyślnie rok 2025, bez wybranych źródeł i odpowiedzi o wcześniejszym PIT-38. | Sprawa pojawi się po przekazaniu. |
| **Piotr Nowak · KT-2025-102** | Przekazano 20.02.2026. Coinbase, Ethereum i płatność kartą. Plan rozszerzony opłacony 19.02.2026, weryfikacja zakończona. | **Do sprawdzenia**. Jedna otwarta pozycja **Płatność kartą krypto** o ID `KARTA-039`, numerze `CARD-912-039` i kwocie 189,90 zł. Transfer Coinbase → Ethereum jest dopasowany. |
| **Anna Zielińska · KT-2024-101** | Zatwierdzono 15.02.2025. Historia Kraken z CSV, bez zadania o wcześniejszych kosztach. Plan standardowy opłacony 12.02.2025, sprawa przekazana 13.02.2025. | **Zatwierdzona**. Można przejrzeć trzy operacje, zatwierdzone wyliczenie 760 zł podatku i pakiet PIT-38. Status złożenia to **brak potwierdzenia**. |

Na początku kolejka ma jedną sprawę do sprawdzenia i jedną zatwierdzoną. Kolejka zadań zawiera pozycję karty Piotra. [Dane początkowe](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L491-L523)

## Co wstawia przycisk przykładu

| Formularz | Wstawiane dane |
| --- | --- |
| Źródła | Coinbase, Ethereum, Kantor lub bitomat i **Nie** dla wcześniejszych lat. Zachowuje aktualny rok w formularzu. |
| CSV giełdy | Plik `<nazwa giełdy>_<rok>.csv`. |
| Portfel | Adres przykładowy dla wybranej sieci i plik `<nazwa sieci>_<rok>.csv`. Klient nadal wybiera CSV lub agregator. |
| Operacja w kantorze | 4 października wybranego roku, 8 400 zł, Kantor Kraków, `KW-104/10`, `Potwierdzenie_wyplaty_KW-104.pdf`. |
| Operacja kartą | 12 września wybranego roku, 189,90 zł, Karta Coinbase · zakupy w sklepie, `CARD-912-039`, `Wyciag_karty_0912.pdf`. |
| Wcześniejszy PIT-38 | **Mam dane do sprawdzenia**, 1 200 zł, `PIT-38_<poprzedni rok>.pdf`. |
| Pytanie systemu o kantor | **Wymieniłem kryptowaluty na gotówkę w kantorze**, wyjaśnienie o BTC i `Potwierdzenie_wyplaty.pdf`. |
| Pytanie systemu o kartę | **Nie wiem**, opis widocznej kwoty w PLN i `Potwierdzenie_platnosci.pdf`. |
| Pytanie systemu o transfer | Odpowiedź o własnym portfelu lub giełdzie, opis własnego transferu i `Potwierdzenie_transferu.pdf`. |
| Odpowiedź na pytanie księgowej o kantor | Potwierdzenie odrębnej wymiany z numerem operacji i `Potwierdzenie_wymiany.pdf`. |
| Odpowiedź na pytanie księgowej o kartę | Wyjaśnienie o odrębnej wymianie z salda BTC, identyfikator i kwota z pozycji, `Potwierdzenie_wymiany_karta.pdf`. |
| Odpowiedź na pytanie księgowej o transfer | Opis własnego portfela i tego samego hasha w drugim źródle, `Potwierdzenie_transferu.pdf`. |
| Odpowiedź na pytanie księgowej o PIT-38 | Informacja o kwocie w poprzednim PIT-38, `Wczesniejszy_PIT-38.pdf`. |

Przykładowy CSV zawiera nagłówek. To symulowany import dostarcza operacje z poniższej tabeli. [Wstawianie danych](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1218-L1275)

## Zapisy dostarczane przez import

| Źródło | Przykładowe operacje w wybranym roku |
| --- | --- |
| **Binance** | `BN-001` 06.02 zakup BTC 7 100 zł, `BN-002` 11.08 sprzedaż BTC 12 300 zł, `BINANCE-BTC-04` 05.07 wypłata 0,0120 BTC |
| **Coinbase** | `CB-001` 04.03 zakup BTC 4 800 zł, `CB-002` 11.04 zakup ETH 5 500 zł, `CB-003` 13.08 sprzedaż BTC 15 600 zł, `COINBASE-ETH-04` 18.06 wypłata 0,4000 ETH |
| **Kraken** | `KR-001` 08.02 zakup BTC 2 400 zł, `KR-002` 25.04 zakup ETH 2 800 zł, `KR-003` 02.10 sprzedaż BTC i ETH 9 200 zł |
| **Bitcoin** | `PORT-BTC-01` 05.07 09:14:32 UTC, wpływ 0,0120 BTC pasujący do wypłaty Binance |
| **Ethereum** | `PORT-ETH-01` 18.06 12:42:18 UTC, wpływ 0,4000 ETH pasujący do wypłaty Coinbase |

Przykładowe adresy to `0x7b36c6a0d4b4a9b19d11b7ea2cdd790bfac84061` dla Ethereum i `1LBkX4RBQ3kweMGUDvjXuw7i2tAw36YwtX` dla Bitcoin. Zapisy transferu dla danej pary używają tych samych adresów i przykładowego hasha z rokiem rozliczenia. Można porównać oba zapisy w szczegółach operacji. Dane dla innych poprawnie sformatowanych adresów dają wynik 0. [Źródło danych](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L263-L330)

## Przejścia do pokazania

### Marta od źródeł do biura

1. Wstaw przykładowy wybór źródeł i zapisz go. Uzupełnij niezależnie Coinbase przez CSV lub bezpośrednie połączenie, Ethereum przez CSV z przykładowym adresem i kantor przez formularz. Na Ethereum można też potwierdzić płatny import. Wtedy na ofercie pojawi się osobna opłata 79 zł.
2. Przejdź do uzupełnień i odpowiedz przy wypłacie 8 400 zł. Historia obejmuje 6 zapisów, z jedną parą transferu i jedną pozycją do decyzji. Wycena po zapisaniu dowodu pokazuje 52 min oraz szacunek podatku 1 007–2 603 zł. Pasuje plan rozszerzony za 549 zł.
3. Opłać plan, rozpocznij weryfikację i przekaż sprawę. W panelu otwórz sprawę Marty, sprawdź odpowiedź, dołączony materiał i obie strony transferu. Ujmij udokumentowaną wymianę lub potwierdź wypłatę wcześniej ujętych środków, podając podstawę. Kwoty w tym przykładzie dają odpowiednio 2 603 zł lub 1 007 zł podatku.

### Piotr i brak informacji o saldzie karty

1. W panelu otwórz zadanie Piotra. W podglądzie `Wyciag_karty_0912.pdf` widać 189,90 zł i brak informacji o źródle środków. W roboczych sumach są przychody 15 600 zł i koszty 10 300 zł, co daje 1 007 zł podatku. Otwarte zadanie podnosi górną granicę do 1 043 zł.
2. Wyślij pytanie o obciążenie salda. Przełącz na portal Piotra i wstaw przykładową odpowiedź. Po wysłaniu wątek w panelu pokaże dokument `Potwierdzenie_wymiany_karta.pdf`, saldo BTC i identyfikator `CB-CONV-912-039`.
3. Zapisz decyzję z podstawą. Ujęcie odrębnej wymiany podnosi przychody do 15 789,90 zł i podatek do 1 043 zł. Ujęcie poza wyliczeniem pozostawia 1 007 zł podatku. Zatwierdź kontrolę końcową i otwórz pakiet z portalu Piotra.

### Pozostałe odgałęzienia

| Co pokazać | Wybory i oczekiwany wynik |
| --- | --- |
| Transfer bez pary | Wybierz tylko Binance albo tylko portfel Bitcoin z przykładowym adresem. W uzupełnieniach pojawi się odpowiednio pytanie o odbiorcę lub źródło wpływu. Dodanie drugiego źródła i import obu zapisów usuwa zadanie. |
| Wybór pomiędzy dwoma planami | Wybierz Kraken i **Nie** przy poprzednich latach. Po imporcie szacunek to 20 min i 760 zł. Można kupić rekomendowany standardowy albo wybrać rozszerzony. |
| Koszty z poprzedniego roku | Wybierz Kraken i **Tak** albo **Nie pamiętam**. Wybór przykładowej deklaracji z kwotą 1 200 zł daje przedział 532–760 zł. Potwierdzenie kosztu przez księgową daje 532 zł, a zamknięcie bez doliczenia 760 zł. Wybór **Nie mogę teraz ustalić** bez kwoty zostawia otwartą pozycję z niepełnym szacunkiem. |
| Plan z dodatkową kontrolą | Wybierz Kraken i kantor, dodaj wypłatę 60 000 zł, odpowiedz na pytanie o wypłatę. Górny szacunek podatku wynosi 12 160 zł. Plan ma 120 min, limit 15 000 zł i cenę 769 zł. |
| Gotowy wynik bez otwartych pozycji | Wybierz Annę w portalu lub otwórz sprawę Anny w panelu. Porównaj sumy, źródło i status pakietu. |
