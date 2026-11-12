# KryptoPIT — prototyp diagnozy podatkowej 2026

Działająca demonstracja **pomysłu na produkt**, nie aplikacja do obliczania podatku.

**Hipoteza:** zanim zbudujemy kosztowny silnik rozliczeń kryptowalut, warto sprawdzić, czy użytkownicy potrzebują diagnozy złożoności, jaki mają profil aktywności i za jaką dalszą pomoc mogliby zapłacić.

## Co można pokazać znajomym

1. Landing page wyjaśnia koncepcję i trzy etapy potencjalnego produktu.
2. Kontekstowa ankieta obejmuje do sześciu pytań: rezydencja, operacje z 2026 roku, źródła transakcji, przypadki specjalne, wcześniejsze zakupy i dostępność historii.
3. Użytkownik może pominąć każde pytanie, wrócić, zmienić wybór lub zresetować ankietę.
4. Brak aktywności w 2026 r. pomija pytania o źródła i nietypowe operacje w tym roku. Inne wskazania wywołują kontekstowe podpowiedzi.
5. Raport rozdziela **zakres podatkowy** i **złożoność operacji**, pokazuje sygnały ryzyka oraz kroki do wykonania. Można pobrać samodzielny plik HTML lub wydrukować/zapisać PDF.
6. Przycisk **Zobacz przykładowy raport** otwiera demonstracyjny scenariusz z giełdami, DeFi, NFT, derywatami, wcześniejszymi zakupami bez PIT-38 i niepełnymi danymi.
7. Formularz **Zostaw e-mail** jest wyraźnie oznaczoną makietą: niczego nie wysyła i nie zapisuje.

## Architektura

Zero zależności i zero procesu builda. Wystarczy statyczny serwer:

- index.html — semantyczny układ i treści strony.
- styles.css — responsywny wygląd, obsługa druku.
- assessment.mjs — definicje pytań, kontekstowy wybór pytań, reguły diagnozy, przykładowy scenariusz.
- app.mjs — nawigacja, widok pytań i raportu, lokalny eksport HTML, makieta formularza.
- tests/assessment.test.mjs — testy reguł klasyfikacji.

Uruchomienie testów (Node.js 20+):

    node --test tests/assessment.test.mjs

Brak cookies, localStorage, kont, analityki, zewnętrznych API i bazy danych. Odpowiedzi istnieją tylko w pamięci otwartej karty i znikają po odświeżeniu lub resecie. Nawet wpisany e-mail **nie jest przesyłany ani utrwalany**.

## GitHub Pages

1. Wejdź w **Settings → Pages** tego repozytorium.
2. W **Build and deployment** ustaw **Source: Deploy from a branch**.
3. Wybierz **Branch: main**, **Folder: /(root)** i zapisz.
4. Po opublikowaniu: https://adamskrodzki.github.io/crypto-tax-mvp/

Repozytorium jest publiczne; sama strona też jest publiczna. Hosting GitHub Pages może standardowo rejestrować dane techniczne połączenia (np. IP), ale kod aplikacji nie przesyła odpowiedzi z ankiety.

## Granice prototypu

**Nie zaimplementowano:** logowania, gromadzenia leadów, integracji Kryptos Connect, importów z giełd, weryfikacji sald, kalkulacji podatku ani składania PIT-38. Strona nie mierzy też jeszcze popytu — do rzeczywistego eksperymentu potrzebne będą osobne, jawne mechanizmy pomiaru i zgody.

Ocena ma charakter **heurystyczny i poglądowy**. Nie determinuje obowiązku podatkowego, nie liczy wartości zobowiązania, nie zastępuje doradcy. Punktem odniesienia w ogólnych zasadach jest [Ministerstwo Finansów: Zbycie kryptowalut](https://www.podatki.gov.pl/podatki-osobiste/pit/informacje-podstawowe/co-jest-opodatkowane/zbycie-kryptowalut). Przed produkcyjnym użyciem treść i logikę trzeba zweryfikować z polskim specjalistą podatkowym oraz aktualnymi przepisami na rozliczenie za 2026 r.

## Cel kolejnych iteracji

1. Sprawdzić zainteresowanie darmową diagnozą.
2. Zbadać deklarowany profil aktywności i dostępność danych.
3. Zaproponować wybranym segmentom integrację źródeł, płatne rozliczenie lub konsultację księgową.

W obecnym demo to **plan produktu**, a nie działające zbieranie danych.
