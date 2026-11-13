# Wycena, płatności i weryfikacja

Pierwsza ocena pojawia się na ekranie **Historia** i opisuje zakres według typów źródeł. Szacowany podatek i czas pracy pojawiają się po zebraniu historii i zapisaniu odpowiedzi wymaganych w kroku **Uzupełnienia**. Na tej podstawie system proponuje plan. Liczba operacji pomaga zrozumieć zakres historii. Obecny wzór na czas używa liczby źródeł i otwartych pozycji. [Kolejność kroków](portal-klienta.md) · [Założenia cenowe projektu](../AGENTS.md)

## Szacunek podatku

Makieta stosuje wzór `zaokrąglij(0,19 × max(0, przychody − koszty))` do pełnego złotego. Sumy obejmują pozycje sklasyfikowane w historii giełdy i pozycje rozstrzygnięte przez księgową. Dopasowane transfery i pozycje zamknięte poza wyliczeniem mają wpływ zerowy. Otwarte pozycje są wyłączone z roboczych sum przychodów i kosztów.

| Wartość w makiecie | Sposób obliczenia |
| --- | --- |
| **Podatek z ujętych pozycji** | Wzór dla aktualnie ujętych przychodów i kosztów. Po zatwierdzeniu pojawia się etykieta **Zatwierdzony podatek**. |
| Dolna granica szacunku | Do ujętych kosztów dolicza znaną, nadal otwartą kwotę kosztów z wcześniejszego PIT-38. |
| Górna granica szacunku | Do ujętych przychodów dolicza znane kwoty otwartych operacji, które mogą być przychodem. Wycena używa tej granicy do sprawdzenia limitu planu. |
| Otwarta pozycja bez kwoty | Oznacza niepełny szacunek. Pokazana kwota lub zakres obejmują ustalone wartości. Gdy brak ujętych przychodów, ujętych kosztów i dodatniej górnej granicy, makieta pokazuje **Do ustalenia**. |

Równe granice są pokazywane jako jedna kwota. Klient widzi szacunek przed zakupem, a rozbicie na przychody, koszty, podatek i ewentualny zakres po zakupie. Księgowa widzi sumy do kontroli i może sprawdzić wpływ każdej decyzji. Szacunek liczy się ponownie po rozstrzygnięciu pozycji. [Wzór i zakres](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L407-L433) · [Pola wyliczenia](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L731-L738)

## Szacunek czasu i wybór planu

| Składnik czasu | Wartość w makiecie |
| --- | ---: |
| Podstawowa obsługa | 20 min |
| Każde wybrane źródło ponad pierwsze | +10 min |
| Każda otwarta pozycja z załącznikiem | +12 min |
| Każda otwarta pozycja bez załącznika | +22 min |

Do liczby źródeł wchodzi też źródło z potwierdzonym brakiem operacji. Przy ocenie załącznika makieta sprawdza plik z pierwszej odpowiedzi klienta lub z formularza wcześniejszego PIT-38. Współczynniki ilustrują dwa czynniki wyceny. Ich wartości i warunki ochrony wymagają ustalenia z biurem. [Wzór i reguła rekomendacji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L436-L459)

| Plan | Czas pracy | Limit ochrony | Cena |
| --- | ---: | ---: | ---: |
| **Rozliczenie standardowe** | Do 45 min | 2 500 zł | 349 zł |
| **Rozliczenie rozszerzone** | Do 90 min | 10 000 zł | 549 zł |
| **Rozliczenie z dodatkową kontrolą** | Co najmniej 120 min, szacunek zaokrąglony w górę do 30 min | Co najmniej 15 000 zł, górny szacunek podatku zaokrąglony w górę do 5 000 zł | 549 zł + 4 zł za każdą minutę ponad 90 + 1 zł za każde 50 zł limitu ponad 10 000 zł |

Oba progi muszą wystarczyć jednocześnie. Standard jest wyłączony także wtedy, gdy istnieje otwarta pozycja bez kwoty. System rekomenduje pierwszy pasujący plan w kolejności tabeli. Plan z dodatkową kontrolą pojawia się tylko wtedy, gdy dwa stałe plany nie wystarczają. **Zakres poniżej szacunku** wskazuje plan niedostępny do wyboru. Gdy pasują oba stałe plany, klient może pozostać przy rekomendacji albo wybrać rozszerzony. Każdy plan deklaruje weryfikację tożsamości i przygotowanie PIT-38 przez biuro. [Ekran planów](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L740-L762)

Wybór pasującego planu można zmienić przed potwierdzeniem płatności. Zapis ustawień, importu lub odpowiedzi do uzupełnienia odświeża wycenę i czyści wcześniejszy wybór. Zakup zapamiętuje plan, cenę, limit, czas w pakiecie i szacowany czas oraz datę i referencję płatności `KT-P-<numer>`. Późniejsze decyzje księgowej zmieniają wynik rozliczenia. Zakupiony plan pozostaje w sprawie w postaci zapisanej przy płatności. [Zapis zakupu](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1428-L1437)

## Kiedy pojawia się koszt

| Czynność | Moment i skutek w makiecie |
| --- | --- |
| Wybór źródeł, bezpośrednie połączenie z giełdą, CSV, ręczne wpisy i odpowiedzi na pytania systemu | Bezpłatne wstępne rozpoznanie i przygotowanie danych. |
| Import adresu przez agregator | W kroku **Historia** przy Ethereum lub Bitcoin. Klient widzi **79 zł** przed uruchomieniem. **Zapłać i uruchom import** zapisuje opłatę i uruchamia symulację, **Anuluj** kończy dialog bez importu. |
| Zakup planu | Po przedstawieniu szacunku i zakresu. **Potwierdź płatność** uruchamia symulację zakupu i odsłania szczegółowe wyliczenie. |
| Weryfikacja tożsamości i AML | Wliczona w opłacony plan. Klient uruchamia ją po zakupie i potwierdza rozpoczęcie. Wynik w makiecie od razu ustawia stan **Zweryfikowano**. |

Opłata za agregator jest osobna i dotyczy uruchomienia, także gdy import zwraca 0 operacji. Makieta nalicza ją raz dla kombinacji roku, sieci i adresu w danej sprawie. W tym porównaniu Ethereum pomija wielkość liter, Bitcoin porównuje adres dokładnie. Opłaty z bieżącego roku są widoczne oddzielnie od ceny planu i trafiają do panelu po przekazaniu sprawy. Ścieżka agregatora może pojawić się przed wyceną i zakupem planu. [Potwierdzenie opłaty za agregator](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1329-L1345) · [Zapis opłaty](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L1421-L1427) · [Różnica względem założeń projektu](otwarte-decyzje.md#decyzje-produktowe-do-ustalenia)

Zakup planu i weryfikacja są warunkami przekazania sprawy. Sama weryfikacja pozostawia sprawę po stronie klienta do chwili kliknięcia **Przekaż sprawę księgowej**. Księgowa widzi wynik weryfikacji na liście kontroli końcowej. [Przekazanie sprawy](portal-klienta.md#5-weryfikacja) · [Zatwierdzenie przez biuro](panel-ksiegowej.md#kontrola-końcowa)
