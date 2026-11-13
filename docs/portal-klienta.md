# Portal klienta

Kreator ma sześć kroków. Nagłówek pokazuje rok, numer sprawy i postęp. Bieżący krok jest dostępny w nawigacji. Przed zakupem można wrócić do **Źródeł**, do **Historii** po wyborze źródeł i do **Uzupełnień** po zebraniu wymaganej historii. Pozostałe kroki otwierają się po wykonaniu czynności w kreatorze. Z boku, gdy istnieje co najmniej jedna operacja, dostępne są **Historia operacji**, **Dokumenty** i **Historia sprawy**. Z każdego z tych widoków prowadzi powrót do aktualnego kroku. Na wąskim ekranie boczne skróty do danych są ukryte, a nawigacja kroków jest pozioma. [Kod nawigacji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1038-L1063)

**Zamknij** zamyka podgląd lub okno dialogowe. **Anuluj** w formularzu dialogowym pozostawia sprawę bez zmian. [Okna i potwierdzenia](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1101-L1114)

## 1. Źródła

| Pole | Wybory | Skutek |
| --- | --- | --- |
| Rok rozliczenia | **2025**, **2024** | Rok określa numer sprawy, zakres importów, dopuszczalne daty operacji ręcznych i poprzedni rok używany dla zadania o PIT-38. Marta zaczyna z rokiem 2025. |
| Giełdy | **Binance**, **Coinbase**, **Kraken** | Każda zaznaczona giełda dostaje osobną pozycję z metodami importu. |
| Własne portfele | **Ethereum**, **Bitcoin** | Każda zaznaczona sieć dostaje osobną pozycję z publicznym adresem portfela i metodami importu. |
| Inne źródła | **Kantor lub bitomat**, **Płatności kartą krypto** | Każde zaznaczenie otwiera osobny formularz operacji, których klient nie ma w historii giełdy. |
| Czy w poprzednich latach rozliczałeś kryptowaluty w PIT-38? | **Tak**, **Nie**, **Nie pamiętam** | **Tak** i **Nie pamiętam** otwierają dalsze pytanie o deklarację i koszty. **Nie** pomija je. |

Źródła są niezależnymi polami wielokrotnego wyboru. **Przejdź do dodawania historii** wymaga co najmniej jednego źródła, roku z listy i jednej odpowiedzi o PIT-38. Na ekranie historii pojawiają się pozycje odpowiadające zaznaczeniom. [Formularz źródeł](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L578-L591)

**Zmień listę źródeł** wraca do formularza. Odznaczenie źródła wyłącza jego dane z widocznej historii i wyceny, a ponowne zaznaczenie w tym samym roku przywraca zapisany import. Zmiana roku czyści importy, uzupełnienia, wcześniejszy PIT i zdarzenia. Zmiana odpowiedzi o poprzednich latach czyści powiązaną odpowiedź i zadanie. Każdy zapis ustawień kasuje wybrany plan. Zarejestrowane opłaty za import są przypisane do roku i pozostają w zapisie sprawy. [Zapis wyborów](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1295-L1319)

## 2. Historia

Górna karta liczy giełdy, sieci portfela i inne źródła. Komunikat zapowiada porównanie zapisów, gdy są giełdy i portfele, sprawdzenie potwierdzeń, gdy są inne źródła, uporządkowanie historii przy kilku giełdach albo ocenę po dodaniu historii w pozostałych przypadkach. Ta kolejność rozstrzyga, który komunikat pojawi się przy kilku spełnionych warunkach. Licznik **Uzupełniono N z M** dotyczy zadeklarowanych źródeł. [Reguły pierwszego rozpoznania](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L460-L471)

Lista zawiera wszystkie zaznaczone źródła. Klient sam wybiera, które otworzyć jako pierwsze. Obok listy pojawia się formularz lub podsumowanie wybranego źródła. Na węższym ekranie szczegóły układają się pod listą. [Układ ekranu historii](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L674-L689)

### Metody dla wybranego źródła

| Źródło | Akcja i koszt | Wymagane dane i wynik |
| --- | --- | --- |
| Binance, Coinbase, Kraken | **Połącz bezpośrednio**, bezpłatnie | Klient potwierdza **Połącz i pobierz historię** albo zamyka okno. Potwierdzenie symuluje dostęp do odczytu i pobranie historii za wybrany rok, bez podawania kluczy API w makiecie. |
| Binance, Coinbase, Kraken | **Wczytaj CSV**, bezpłatnie | Wymagany jest plik z rozszerzeniem `.csv`. Makieta zapisuje nazwę i wczytuje przykładowe rekordy danej giełdy. |
| Ethereum, Bitcoin | **Wczytaj CSV**, bezpłatnie | Jeden publiczny adres w wybranej sieci i plik `.csv`. Makieta rozpoznaje adres przykładowy i zwraca jego przykładową historię. |
| Ethereum, Bitcoin | **Wybierz płatny import** | Jeden publiczny adres w wybranej sieci. Agregator kosztuje **79 zł** za rok, sieć i adres w danej sprawie. Pierwsze uruchomienie wymaga potwierdzenia **Zapłać i uruchom import**. Powtórka dla tej samej kombinacji korzysta z zapisanej opłaty. |
| Kantor lub bitomat | **Dodaj operację**, bez opłaty | Data, otrzymana kwota w PLN i nazwa kantoru lub operatora. Numer z potwierdzenia i załącznik są opcjonalne. Zapis tworzy wypłatę do wyjaśnienia. |
| Płatności kartą krypto | **Dodaj operację**, bez opłaty | Data, kwota płatności w PLN i wystawca karty lub opis płatności. Numer z potwierdzenia i załącznik są opcjonalne. Zapis tworzy płatność do wyjaśnienia. |

Przy portfelu adres Ethereum ma `0x` i 40 znaków szesnastkowych. Bitcoin dopuszcza formaty rozpoczynające się od `1`, `3` lub małego `bc1`. To sprawdzenie formatu. Przykładowe adresy wstawia pasek makiety. Zakres importu obejmuje cały rok. Wpis ręczny przyjmuje datę z tego roku, kwotę od 0,01 do 1 000 000 zł z dokładnością do grosza, opis do 120 znaków i numer do 100 znaków. Pole potwierdzenia oferuje PDF, JPG, JPEG i PNG. [Formularze i walidacja](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L613-L652) · [Zapis importu i operacji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1322-L1363)

### Stany i dostępne działania

| Stan źródła | Działanie i wynik |
| --- | --- |
| **Do uzupełnienia** | **Dodaj historię** otwiera metody dla wybranej pozycji. |
| **Dodano · N** | **Szczegóły** pokazują metodę, liczbę operacji oraz, zależnie od metody, okres, adres, nazwę pliku i opłatę. **Pokaż operacje z tego źródła** otwiera listę z filtrem na to źródło. W kantorze i karcie **Dodaj kolejną operację** dopisuje nowy wpis. |
| **Sprawdź pusty import** | Reguła przewiduje **Potwierdź brak operacji** lub **Zmień dane portfela** i ponowienie importu. Obecny błąd renderowania blokuje tę część ekranu po wyniku 0 operacji. |
| **Potwierdzono 0 operacji** | W zamierzonej ścieżce potwierdzenie liczy źródło jako uzupełnione. **Zmień dane portfela** ma pozwolić ponowić import. |

**Sprawdź operacje i uzupełnienia** pojawia się, gdy każde zaznaczone źródło ma operacje lub potwierdzony brak operacji i łącznie istnieje co najmniej jedna operacja. Sam komplet potwierdzeń z wynikiem 0 nie wystarcza. Zapis danych kasuje wybór planu. Księgowa zobaczy wybrane źródła dopiero po przekazaniu sprawy. [Warunki gotowości](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L363-L371) · [Ograniczenia importu](otwarte-decyzje.md)

## 3. Uzupełnienia

System pokazuje po jednej pozycji bez odpowiedzi w kolejności historii. Każde pytanie zawiera dane operacji i powód, dla którego potrzebna jest informacja. Klient wybiera odpowiedź, może dodać opis do 1200 znaków oraz dokument w PDF, JPG, JPEG, PNG albo CSV. Zapis zastępuje wcześniejszą odpowiedź i zachowuje jej plik, jeżeli klient nie wybrał nowego. Przy pierwszej odpowiedzi do ręcznej operacji makieta przejmuje jej potwierdzenie, jeśli klient nie wskazał innego pliku. Przy brakującym transferze **Uzupełnij źródło …** wraca do wyboru źródeł, aby dodać drugą stronę i spróbować dopasowania. [Wszystkie pytania i odpowiedzi](operacje-i-dowody.md#pytania-i-decyzje-przy-pozycjach)

Po odpowiedziach do operacji klient, który zaznaczył **Tak** lub **Nie pamiętam**, dostaje formularz wcześniejszego PIT-38.

| Wybór | Skutek |
| --- | --- |
| **Mam dane do sprawdzenia** | Wymagana jest kwota kosztów albo deklaracja. Tworzy pozycję do sprawdzenia przez księgową. |
| **Brak kosztów do uwzględnienia** | Kwota jest pomijana i sprawa przechodzi bez zadania o wcześniejsze koszty. Ewentualny plik z tego formularza nie pojawia się w dokumentach sprawy. |
| **Nie mogę teraz ustalić** | Pozwala przejść bez kwoty i dokumentu. Tworzy pozycję do sprawdzenia przez księgową. |

Kwota podlega temu samemu zakresowi co wpis ręczny. Pole deklaracji oferuje PDF, JPG, JPEG i PNG. Zadanie wcześniejszego PIT jest oznaczone rokiem poprzednim względem rozliczanego. [Formularz i warunki zapisu](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1377-L1389)

Podsumowanie pokazuje liczbę źródeł, operacji, znalezionych par transferów i pozycji do decyzji księgowej. **Zobacz odpowiedź** ponownie otwiera odpowiedź przy operacji. Pozycja wcześniejszego PIT-38, jeśli powstała, ma znacznik **Zapisano**. Zmiana odpowiedzi o wcześniejszych latach w pierwszym kroku pozwala wyczyścić ten formularz i przejść go ponownie. **Historia operacji** otwiera wspólny rejestr. **Zobacz proponowany plan** wymaga kompletnej historii, odpowiedzi przy każdej wskazanej operacji oraz odpowiedzi o kosztach, jeśli ten formularz obowiązuje. Odpowiedź **Nie wiem** wystarcza do przejścia, pozostawiając decyzję księgowej. [Kolejność pytań i podsumowanie](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L690-L730)

## 4. Plan i płatność

Ekran pokazuje szacowany podatek i czas pracy oraz zakres, limit ochrony i cenę dostępnych planów. Rekomendowany plan jest zaznaczony domyślnie. Klient może wybrać inny plan, jeśli spełnia warunki. **Opłać plan** otwiera potwierdzenie z ceną. **Anuluj** lub **Zamknij** pozostawia wybór bez płatności. **Wróć do historii** umożliwia zmianę danych przed zakupem. Potwierdzenie płatności zapisuje plan i otwiera kolejny krok. [Progi, ceny i zasady wyboru](wycena-i-platnosci.md)

## 5. Weryfikacja

Po zakupie klient widzi robocze wyliczenie z przychodami, kosztami i podatkiem z ujętych pozycji oraz ewentualnym zakresem po otwartych decyzjach. **Rozpocznij weryfikację** otwiera potwierdzenie. Potwierdzenie symuluje zakończenie weryfikacji tożsamości i AML. **Przekaż sprawę księgowej** wymaga zakupu, weryfikacji i spełnionych warunków wyceny. Jest osobną decyzją klienta i zapisuje datę przekazania. Wtedy sprawa pojawia się w kolejce biura. Po zakupie historia i dokumenty pozostają do wglądu, a formularze wcześniejszych kroków są zablokowane. [Ekran weryfikacji i przekazanie](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1495-L1511)

## 6. Rozliczenie

| Stan | Co klient widzi i może zrobić |
| --- | --- |
| Księgowa sprawdza | Datę przekazania, źródła i liczbę operacji oraz dostęp do historii operacji i sprawy. |
| Księgowa oczekuje na odpowiedź | Pierwszą otwartą pozycję z pytaniem, jej danymi i formularzem. **Wyślij odpowiedź** wymaga tekstu do 1500 znaków lub dokumentu w PDF, JPG, JPEG, PNG albo CSV. Odpowiedź trafia do wątku tej pozycji. Ekran pokaże kolejne pytanie albo wróci do oczekiwania. |
| Rozliczenie zatwierdzone | Datę i wynik zatwierdzenia, historię operacji oraz **Otwórz pakiet**. Pakiet zawiera podgląd PIT-38 i status złożenia **brak potwierdzenia**. |

[Widoki po przekazaniu](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L772-L792) · [Praca księgowej nad tą samą sprawą](panel-ksiegowej.md)
