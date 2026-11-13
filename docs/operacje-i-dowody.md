# Operacje, dowody i decyzje

Historia łączy zapisy z aktualnie wybranych źródeł. Każdy zapis ma identyfikator, źródło, datę, rodzaj i opis. Zapis z kwotą ma wartość w PLN, a transfer na blockchainie ma sieć, aktywo, ilość, kierunek, adres nadawcy i odbiorcy oraz hash. W szczegółach transferu widać też godzinę UTC. Przy operacji ręcznej można podać numer z potwierdzenia, który pojawia się obok danych operacji i w wątku. [Model operacji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L292-L347) · [Szczegóły operacji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L554-L576)

## Kiedy system otwiera zadanie

| Zapis lub informacja | Co robi makieta |
| --- | --- |
| Zakup kryptowalut z salda PLN z giełdy | Ujmuje kwotę jako **Koszt**. |
| Sprzedaż za PLN z giełdy | Ujmuje kwotę jako **Przychód**. |
| Wypłata z giełdy i wpływ na portfel przypisany klientowi | Jeżeli zapisy dają się dopasować, oba mają status **Transfer dopasowany** i pozostają poza sumami. W historii są dwa zapisy, a w podsumowaniu jedna para. |
| Wpływ albo wypłata bez dopasowanej drugiej strony | Otwiera zadanie o transferze. Pokazuje ilość w ETH albo BTC, adresy i hash. Kwota w PLN pozostaje do ustalenia, jeżeli księgowa uzna, że była odrębna wymiana. |
| Wypłata w kantorze lub bitomacie | Po ręcznym dodaniu operacji otwiera zadanie o tym, czy wypłata była osobną wymianą. |
| Płatność kartą krypto | Po ręcznym dodaniu operacji otwiera zadanie o tym, jakie saldo obciążył wystawca karty. |
| Wcześniejszy PIT-38 | Odpowiedź **Mam dane do sprawdzenia** lub **Nie mogę teraz ustalić** tworzy osobną pozycję kosztową do decyzji, oznaczoną `PIT-<poprzedni rok>`. **Brak kosztów do uwzględnienia** i odpowiedź **Nie** w pierwszym kroku pomijają zadanie. |

Makieta szuka pary w dwóch różnych źródłach. Wymaga zgodnej sieci, hasha, aktywa, ilości i obu adresów, przeciwnego kierunku oraz odbiorcy zgodnego z publicznym adresem przypisanym do portfela klienta. Adres Ethereum porównuje z pominięciem wielkości liter, a adres Bitcoin dokładnie. Sam hash nie wystarcza. Po dodaniu drugiej strony system przelicza dopasowanie. Gdy znajdzie parę, otwarta pozycja przestaje być potrzebna. [Reguła dopasowania i lista zadań](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L331-L366)

## Pytania i decyzje przy pozycjach

| Pozycja | Pytanie systemu do klienta | Wszystkie odpowiedzi |
| --- | --- | --- |
| Kantor lub bitomat | **Skąd pochodziły środki wypłacone w kantorze?** Potwierdzenie wypłaty podaje datę i kwotę. Trzeba ustalić, czy przy wypłacie nastąpiła wymiana. | **Wymieniłem kryptowaluty na gotówkę w kantorze** · **Odebrałem środki po wcześniejszej sprzedaży** · **Nie wiem** |
| Karta krypto | **Z jakiego salda opłacono tę transakcję?** Potwierdzenie płatności w PLN nie rozstrzyga, czy karta pobrała saldo w walucie tradycyjnej. | **Przy płatności wymieniono kryptowaluty** · **Płatność zeszła z salda w walucie tradycyjnej** · **Nie wiem** |
| Wypłata bez dopasowania | **Czy adres odbiorcy należy do Ciebie?** W historii brakuje odpowiadającego wpływu. Link z pytania kieruje do wyboru źródeł z sugestią dodania sieci portfela. | **To mój portfel** · **Transfer z udziałem innej osoby lub podmiotu** · **Nie wiem** |
| Wpływ bez dopasowania | **Skąd przyszedł ten transfer na Twój portfel?** W historii brakuje odpowiadającej wypłaty. Sugestia w makiecie wskazuje Coinbase dla Ethereum albo Binance dla Bitcoin. | **Z innego mojego portfela lub giełdy** · **Transfer z udziałem innej osoby lub podmiotu** · **Nie wiem** |
| Wcześniejszy PIT-38 | **Czy masz wcześniejszą deklarację lub kwotę kosztów do sprawdzenia?** Pojawia się po **Tak** lub **Nie pamiętam** w wyborze źródeł. | **Mam dane do sprawdzenia** · **Brak kosztów do uwzględnienia** · **Nie mogę teraz ustalić** |

Klient może dopisać opis i dołączyć dowód. Wybrana odpowiedź opisuje stan wiedzy klienta. Zadanie pozostaje otwarte do decyzji księgowej, nawet gdy klient od razu wskazał konkretny rodzaj operacji. Dla wcześniejszego PIT formularz zapisuje zadeklarowaną kwotę i plik, a w zadaniu księgowej umieszcza opis zgłoszenia lub informację, że klient nie mógł ustalić kosztów. [Formularze klienta](portal-klienta.md#3-uzupełnienia)

| Pozycja w biurze | Co księgowa może doprecyzować proponowanym pytaniem | Możliwe decyzje |
| --- | --- | --- |
| Ustalenie, czy wypłata była osobną wymianą | Czy kantor wymienił krypto na gotówkę przy tej wypłacie? Prośba o potwierdzenie wymiany lub jej numer. | **Ujmij udokumentowaną wymianę** jako przychód · **Potwierdź wypłatę wcześniej ujętych środków** poza wyliczeniem |
| Ustalenie źródła środków na płatność kartą | Prośba o potwierdzenie obciążenia salda od wystawcy karty oraz identyfikator wymiany, jeśli wystąpiła przy płatności. | **Ujmij potwierdzoną odrębną wymianę** jako przychód · **Potwierdź płatność z salda PLN lub wcześniej ujętą wymianę** poza wyliczeniem |
| Ustalenie drugiego źródła transferu | Do kogo należał drugi adres? Prośba o potwierdzenie z historii drugiego źródła, jeśli klient je ma. | **Udokumentuj transfer bez odrębnej wymiany** poza wyliczeniem · **Ujmij odrębną wymianę z potwierdzoną wartością** jako przychód |
| Ustalenie kosztów z wcześniejszego rozliczenia | Prośba o ostatni PIT-38 z rozliczeniem kryptowalut i wskazanie kwoty do sprawdzenia. | **Potwierdź udokumentowaną kwotę kosztów** jako koszt · **Zamknij sprawdzenie bez doliczania kosztów** poza wyliczeniem |

Księgowa może użyć treści proponowanej w oknie **Poproś o uzupełnienie** albo ją zmienić. **Zapisz decyzję** wymaga wyboru ujęcia i wskazania podstawy. Jeśli pozycja ma kwotę, makieta używa jej przy ujęciu jako przychód lub koszt. Przy braku kwoty trzeba podać potwierdzoną wartość w PLN, od 0,01 do 1 000 000 zł. Ujęcie poza wyliczeniem nie wymaga kwoty. Zapis przelicza sumy i zamyka zadanie. [Pytania i opcje decyzji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L372-L406) · [Zapis decyzji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1618-L1637)

## Historia operacji

Klient i księgowa korzystają z tej samej listy zapisów. Liczniki pokazują wszystkie operacje, pary transferów i operacje wymagające decyzji. Wcześniejszy PIT-38 jest zadaniem i może wpłynąć na sumę kosztów. Pozostaje osobną pozycją, poza licznikiem operacji.

| Wybór | Działanie |
| --- | --- |
| **Grupy** | Widok domyślny. Grupuje po źródle i rodzaju operacji. Pokazuje liczebność i zakres dat. **Zobacz operacje** ustawia listę, filtr źródła i szukanie po rodzaju operacji, pozostawiając filtr ujęcia. |
| **Lista operacji** | Pokazuje datę, źródło, rodzaj, identyfikator lub skrócony hash, kwotę albo ilość i ujęcie. Wiersze są uporządkowane według daty, potem identyfikatora. Kliknięcie rodzaju otwiera szczegóły. |
| **Pokaż operacje z tego źródła** z ekranu importu | Otwiera listę ograniczoną do tego źródła. |
| **Szukaj w historii** | Filtruje po identyfikatorze wewnętrznym, dacie, rodzaju, źródle, opisie, hashu lub wyświetlonej wartości. |
| **Źródło** | **Wszystkie** albo źródło obecne w historii. |
| **Ujęcie** | **Wszystkie** albo status obecny w historii. Możliwe statusy to **Przychód**, **Koszt**, **Poza wyliczeniem**, **Transfer dopasowany** i **Do wyjaśnienia**. |
| **Wyczyść filtry** | Kasuje wyszukiwanie, źródło i ujęcie oraz wraca do grup. |
| **Szczegóły operacji** | Pokazują fakty z rekordu, ujęcie i, w zależności od przypadku, numer dopasowanego zapisu albo powód otwartego zadania. |

Filtry działają łącznie. Licznik wyników odnosi się do całej historii sprawy. Brak dopasowań i pusta historia mają osobne komunikaty. Ujęcie **Do wyjaśnienia** trwa do zapisania decyzji lub dopasowania transferu. Pytania, odpowiedzi i podstawa decyzji są w zadaniu księgowej. [Wspólny rejestr i filtry](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L815-L880) · [Podgląd operacji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1138-L1146)

## Dokumenty i historia sprawy

| Materiał | Gdzie jest dostępny | Co otwiera podgląd |
| --- | --- | --- |
| Plik CSV przy źródle | **Dokumenty** po obu stronach, w szczegółach źródła widnieje też nazwa pliku | **Podgląd źródła** pokazuje zakres i przykładowe operacje przypisane do importu. |
| Załącznik zapisany z pierwszą odpowiedzią lub wcześniejszym PIT-38 | **Dokumenty** i powiązane zadanie księgowej | **Podgląd** pokazuje nazwę, sprawę i pozycję. Załącznik przykładowy ma podgląd wybranych danych. |
| Załącznik zapisany z odpowiedzią na pytanie księgowej | Wątek tej pozycji i **Dokumenty** | Przykładowe uzupełnienie karty pokazuje m.in. saldo BTC i identyfikator wymiany. |
| Pakiet rozliczenia | Po zatwierdzeniu w **Dokumentach** i na ekranie **Rozliczenie** po obu stronach | Podgląd PIT-38 za dany rok, numer sprawy, zatwierdzone sumy, data i status złożenia. |

Dla plików wskazanych samodzielnie makieta zapisuje nazwy. Widok dokumentów zbiera załączniki przypisane do aktualnie wybranych źródeł i istniejących zadań. Załącznik dodany przy ręcznej operacji trafia do widoku dokumentów po zapisaniu odpowiedzi na pytanie o tę operację. [Lista dokumentów](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L886-L903) · [Podglądy](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1147-L1180)

**Historia sprawy** pokazuje wspólną oś zdarzeń od najnowszego. Zapisuje dodanie źródła, odpowiedź klienta, dane wcześniejszego PIT-38, zakup planu, weryfikację tożsamości, przekazanie do biura, pytanie księgowej, uzupełnienie klienta, decyzję i zatwierdzenie. Wpis ma datę i, gdy jest dostępny, opis, numer operacji lub nazwę źródła. [Oś zdarzeń](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L881-L885)

## Powiązanie danych między rolami

| Klient lub system | Gdzie księgowa widzi te dane | Co wraca do klienta |
| --- | --- | --- |
| Wybrany rok i źródła, importy, operacje ręczne | Nagłówek i metryki sprawy, **Operacje**, **Źródła w sprawie** i dokumenty źródłowe | Ta sama historia, w tym dopasowania i aktualne ujęcie pozycji |
| Odpowiedź przy operacji lub dane wcześniejszego PIT-38 | Powiązane zadanie, kwota z rekordu, materiał klienta i załączniki | Pytanie o ten sam rekord, jeżeli księgowa potrzebuje uzupełnienia |
| Zakup, opłaty za import, potwierdzenie weryfikacji i przekazanie | Warunki kontroli końcowej, zakres opłaconego planu, opłaty i data przekazania | Robocze wyliczenie po zakupie, status weryfikacji i status sprawy |
| Odpowiedź na pytanie księgowej | Wątek zadania, załącznik i status **Klient odpowiedział** | Kolejne oczekujące pytanie albo informacja o kontroli w biurze |
| Rozstrzygnięte pozycje i zamknięta kontrola | Podstawa decyzji w zadaniu, przeliczone sumy i zatwierdzenie | Ujęcie operacji, zatwierdzone wyliczenie i pakiet PIT-38 |

Sprawę identyfikuje numer `KT-<rok>-<numer>`. Pytania, odpowiedzi i decyzje są przypisane do identyfikatora operacji w tej sprawie lub do pozycji wcześniejszego PIT-38. Numer z potwierdzenia pomaga rozpoznać pozycję w obu widokach. [Praca w panelu](panel-ksiegowej.md)
