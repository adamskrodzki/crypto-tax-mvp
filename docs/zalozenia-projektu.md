# Założenia projektu KryptoTax

## Usługa i odpowiedzialność biura

KryptoTax to koncepcja usługi rozliczenia aktywności kryptowalutowej w polskim PIT-38. Biuro księgowe jest właścicielem aplikacji, świadczy usługę i ponosi odpowiedzialność zawodową za rozliczenie. Księgowa sprawdza i zatwierdza każdą sprawę przed jej zakończeniem. Klient zleca biuru przygotowanie rozliczenia i przekazuje materiały potrzebne do jego wykonania.

## Wstępna ocena i import historii

Klient przechodzi przez kroki zależne od swojej sytuacji. Podaje rok, używane giełdy, sieci własnych portfeli i pozostałe źródła oraz informację o wcześniejszym rozliczaniu kryptowalut. Każde wskazane źródło można uzupełnić osobno. System ocenia skalę i złożoność na podstawie rodzaju źródeł, dostępnej historii i wykrytych braków.

Bezpłatne rozpoznanie obejmuje import CSV i bezpośredni odczyt historii z giełdy. Klient może też opisać operacje, których brakuje w eksporcie, na przykład wypłaty w kantorze lub płatności kartą krypto. Kosztowny import przez agregator, np. Kryptos.io, jest dostępny w płatnym planie. Klient otrzymuje wstępną ocenę sprawy i akceptuje warunki przed uruchomieniem kosztownego importu. Sposób rozliczenia opłaty za agregator pozostaje do ustalenia z biurem.

## Operacje, dowody i kontrola księgowej

System porządkuje operacje, dopasowuje zapisy własnych transferów między źródłami i wskazuje pozycje, do których potrzebne są dokumenty lub wyjaśnienia. Pytanie odnosi się do konkretnej operacji albo osobnej pozycji, na przykład kosztów z wcześniejszego PIT-38. Odpowiedź klienta i dowód pozostają przy tej pozycji.

Po przekazaniu sprawy księgowa pracuje w kolejce spraw i zadań. Ma dostęp do zebranych danych i może poprosić o uzupełnienie przy tej samej pozycji. Sprawdza, jak ująć otwarte pozycje, oraz zatwierdza końcowe wyliczenie. Automatyzacja służy zebraniu i uporządkowaniu materiału przed kontrolą oraz ograniczeniu ręcznej pracy biura.

## Wycena

Rekomendacja planu opiera się na dwóch czynnikach. Szacowany podatek pomaga określić potencjalną odpowiedzialność biura. Przewidywany czas pracy księgowej odzwierciedla złożoność sprawy, w tym rodzaj źródeł i liczbę pozycji wymagających sprawdzenia. Liczba operacji jest jednym z sygnałów złożoności. Wycena może się zmienić po imporcie kolejnych danych i uzupełnieniu dowodów.

Plan ma obejmować weryfikację tożsamości i AML oraz określać zakres obsługi, limit ochrony w ramach OC biura i czas konsultacji z księgową. Szczegóły cen, limitów oraz zasad dodatkowej konsultacji lub zmiany planu przy bardziej złożonej sprawie wymagają uzgodnienia z biurem.

## Płatność i weryfikacja

Płatność pojawia się przed czynnością generującą koszt dla biura, taką jak płatny import lub weryfikacja, albo przed udostępnieniem klientowi wartościowego wyniku. Rozpoznanie sprawy i bezpłatne metody importu są dostępne wcześniej.

KYC/AML następuje po wyborze planu i musi się zakończyć przed ostatecznym zatwierdzeniem rozliczenia. Możliwość uruchomienia weryfikacji przez księgową pozostaje otwarta.

## Zakres dokumentacji

Repozytorium służy do rozwijania koncepcji i omawiania makiet. Ceny, wzory, progi i dane przykładowe opisane dla makiety służą pokazaniu jej działania. Szczegóły symulowanego przepływu oraz decyzje do uzgodnienia opisują osobne dokumenty. [Dokumentacja makiety](README.md) · [Otwarte decyzje](otwarte-decyzje.md)
