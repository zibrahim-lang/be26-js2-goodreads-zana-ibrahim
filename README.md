# Min BokLista - Goodreads

En boklista som jag har gjort i kursen JavaScript 2.

## Funktioner

- Lägga till och ta bort böcker.
- Markera böcker som lästa eller olästa.
- Ge lästa böcker betyg mellan 1 och 5.

Jag har använt HTML, CSS, JavaScript, Vite och Firebase Realtime Database. Koden är uppdelad i moduler och varje bok är en instans av klassen Book.

## Mappstruktur

- src/modules/
  - Book.js // Klassen för böcker och metoder för att ändra och radera dem.
  - firebaserequests.js // Hämtar böcker och sparar nya i Firebase.
  - getbookcard.js // Skapar bok kortet och hanterar knappar och betyg.
- src/
  - main.js // Startar appen och hanterar formuläret.
  - style.css
- index.html
- package.json
- .gitignore
