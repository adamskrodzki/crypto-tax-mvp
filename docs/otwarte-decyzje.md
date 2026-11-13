# Otwarte decyzje i ograniczenia

Makieta pozwala przejść przez rozliczenie i omówić decyzje z biurem. Jej ceny, limity, czasy i uproszczone wyliczenie ilustrują przepływ. [Założenia projektu](zalozenia-projektu.md)

## Decyzje produktowe do ustalenia

| Temat | Wybór pokazany w makiecie | Co wymaga ustalenia |
| --- | --- | --- |
| Moment płatności za agregator | Osobne 79 zł za historię adresu w danym roku. Można zapłacić przed wyborem planu, po rozpoznaniu typów źródeł. | Założeniem projektu jest dostęp do agregatora w płatnym planie. Trzeba ustalić model opłaty, moment dostępu i zakres wstępnej oceny przed uruchomieniem kosztownego importu. |
| Zakres bezpłatnej oceny i płatnej usługi | Typy źródeł i kompletność historii widać na etapie importu. Szacunek podatku i czasu jest przed zakupem, robocze sumy po zakupie. | Czy klient ma dostać przybliżenie kosztu lub pracochłonności także przed płatnym importem i co dokładnie biuro udostępnia bezpłatnie. |
| Limity i cena | Czas pracy księgowej i limit ochrony wyznaczają dostępne plany. Każdy plan obejmuje weryfikację i przygotowanie PIT-38. | Jak ustalać cenę, limit odpowiedzialności i warunki ochrony. Ile czasu obejmuje obsługa sprawy, ile konsultacje dla klienta i jakie czynności wchodzą do pakietu. |
| Sprawa wykracza poza kupiony plan | Dodatkowa kontrola jest dostępna w ofercie przed zakupem. Późniejsze decyzje zmieniają wynik, a zakres zakupionego planu pozostaje zapisany. Zgodność z limitami jest warunkiem zakupu. Kontrola końcowa ma odrębne warunki. | Czy biuro proponuje dopłatę, zmianę planu lub dodatkową konsultację, kto podejmuje decyzję i kiedy klient ją akceptuje. |
| KYC/AML | Klient uruchamia weryfikację po zakupie. Sprawa trafia do biura po potwierdzeniu wyniku i przekazaniu materiałów. | Czy księgowa może zainicjować lub ponowić weryfikację i jak obsłużyć wynik wymagający interwencji. |
| Brak operacji w rozliczanym roku | Kreator wymaga co najmniej jednej operacji, aby przejść do uzupełnień. | Czy usługa obejmuje sprawę dotyczącą wyłącznie wcześniejszych kosztów lub roku bez operacji. |
| Korekty i ponowne otwarcie | Przed zakupem klient może zmienić źródła lub odpowiedź. Po przekazaniu dostarcza nowy materiał w odpowiedzi na pytanie księgowej. Zapisana decyzja kończy pozycję. | Jak klient zgłasza brakujące dane po zakupie i jak biuro koryguje decyzję lub zatwierdzone rozliczenie. |
| Złożenie deklaracji | Zatwierdzenie udostępnia podgląd pakietu. Status złożenia pozostaje **brak potwierdzenia**. | Kiedy biuro składa deklarację i gdzie klient zobaczy potwierdzenie. |

## Ograniczenia obecnej wersji

| Obszar | Zachowanie w kodzie makiety |
| --- | --- |
| Importy i portfele | Plik CSV dostarcza nazwę, a kod podstawia przykładowe rekordy. Połączenie bezpośrednie i agregator też korzystają z tych danych. Dostępny jest jeden portfel na sieć w sprawie. Dodatni wynik importu giełdy lub portfela ma podgląd, bez osobnej akcji ponownego importu. |
| Pusty import portfela | Dla innego poprawnie sformatowanego adresu import zwraca 0 operacji. Szczegóły pustego wyniku odwołują się do niezdefiniowanego `info` w `sourceDetail`. To blokuje renderowanie przy aktywnym źródle i dostęp do przewidzianych akcji **Potwierdź brak operacji** oraz **Zmień dane portfela**. [Kod pustego wyniku](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html#L654-L672) |
| Treść pytań i dowody | Pytania o kantor i kartę mają ten sam opis także bez załącznika. Przy transferze sugestia źródła pochodzi z powiązania w danych przykładowych. Własne pliki są zapisywane jako nazwy, a podglądy przykładowych załączników pochodzą z danych makiety. |
| Ujmowanie wartości | Ujęcie z kwotą korzysta z wartości zapisanej przy operacji lub zgłoszonej przez klienta. Księgowa może wpisać kwotę przy ujęciu tylko wtedy, gdy jej brakuje. Księgowa sprawdza też, czy wymiana związana z kartą lub wypłatą jest już ujęta. Przedział szacunku obejmuje wartości znane. Pozycje bez wyceny mogą zmienić wynik poza pokazanym przedziałem. |
| Operacje i anulowanie | Dostępne są wyłącznie typy źródeł z kreatora. Ręcznie dodane wpisy można dopisywać. Ich edycja i usuwanie, zwroty płatności, wyniki odrzuconej weryfikacji oraz korekty zatwierdzenia nie mają ścieżek w makiecie. |
| Przechowywanie danych | Stan zapisuje przeglądarka, a role przełącza pasek makiety. Wspólny zapis służy pokazaniu zmian w obu widokach. Produkcyjny dostęp do danych, integracje i trwałe przechowywanie wykraczają poza zakres prototypu. |

Dokumentacja odzwierciedla wersję z commita `2867e72`. [Makieta w tej wersji](https://github.com/adamskrodzki/crypto-tax-mvp/blob/2867e726aef7a66ea0392bff90f67d8fc96e284b/working/kryptotax-mockupy.html)
