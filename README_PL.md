# VYNX MENU — wersja Vercel

Publiczny sklep po polsku, formularz z **obowiązkowym nickiem Discord**, produkty, ręczna płatność po kontakcie z administracją, baza zamówień Supabase i powiadomienie Discord webhook. Panel: `/admin.html`.

## 1. Supabase (bezpłatny projekt)

1. Załóż projekt na https://supabase.com/dashboard.
2. Otwórz **SQL Editor** i wykonaj zawartość `supabase.sql`.
3. Z panelu Supabase skopiuj **Project URL** i **secret API key** (albo starszy `service_role` key). Nie ujawniaj klucza ani nie dodawaj go do frontendu.

## 2. Discord

Na prywatnym kanale, np. `order-logs`, wybierz **Edytuj kanał → Integracje → Webhooki → Nowy webhook** i skopiuj adres. Nie publikuj adresu webhooka.

## 3. Vercel

1. Utwórz prywatne repozytorium na https://github.com i wrzuć do niego pliki projektu (zawartość folderu `vynx_vercel`, nie sam folder).
2. Wejdź na https://vercel.com/new, podłącz GitHub, wybierz repo i kliknij **Import**.
3. Framework Preset: **Other**. Root Directory: katalog z `package.json`. Nie ustawiaj Build Command ani Output Directory; są to pliki statyczne + funkcje `api/`.
4. W **Environment Variables** dodaj:
   - `SUPABASE_URL` — adres projektu Supabase.
   - `SUPABASE_SECRET_KEY` — tajny klucz Supabase (server-only).
   - `ADMIN_PASSWORD` — własne silne hasło min. 16 znaków.
   - `DISCORD_WEBHOOK_URL` — adres webhooka z prywatnego kanału.
5. Kliknij **Deploy**. Zmiany zmiennych wymagają ponownego deployu.
6. Domyślny adres to np. `vynx-menu.vercel.app` — dokładna nazwa zależy od wolnych subdomen i ustawień projektu. Możesz zmienić go w **Project Settings → Domains**.

## 4. Test

1. Otwórz główną stronę, kliknij **Zamów teraz**, wpisz username Discord i wyślij.
2. Sprawdź powiadomienie na prywatnym Discordzie.
3. Wejdź na `/admin.html`, wpisz `ADMIN_PASSWORD`, kliknij **Pokaż zamówienia**, zmień status.
4. Testuj też przypadek pustego nicku i niedozwolonych znaków.

## Ważne

- **Klient nie płaci na stronie**. Administracja uzgadnia płatność ręcznie po kontakcie z zamawiającym. Status `paid` nadaje administrator po samodzielnej weryfikacji płatności.
- Hasło admina jest sprawdzane serwerowo przy każdym zapytaniu; nie trafia do plików publicznych.
- Zamówienia przechowywane są w Supabase, nie w plikach Vercel.
- `products.json` zawiera **przykładowe** trzy plany i ceny `Cena po kontakcie`. Zmień nazwy i opisy przed sprzedażą zgodnie ze swoją ofertą. Sprawdź zgodność oferty z warunkami usług hostingowych i płatniczych.
- Na poważny publiczny start dodaj ochronę antyspamową/rate limiting (np. Turnstile), politykę prywatności oraz wymagane informacje sprzedawcy i warunki sprzedaży. Obecna wersja to działający szkielet MVP, nie audytowany system e-commerce.
- Klienci muszą pozwalać na kontakt przez Discord. Sam nick nie zapewnia możliwości wysłania wiadomości prywatnej.
