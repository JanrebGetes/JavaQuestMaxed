JAVA QUEST — MAXED EDITION
==========================

This is a copy of Java Quest where EVERYTHING is already finished:
  - all 24 lessons cleared, all 6 bosses defeated (all Gates open, S-Rank)
  - Level 50 with every stat point spent (LOGIC/SYNTAX/STRUCTURE/DEBUG ~38 each)
  - the Daily Quest is still available, and every lesson and boss can still be
    replayed (boss rematches pay reduced XP, as in the normal app)
It is the normal app plus a different starting point, so everything else
(saving, install, backup files) works the same way.

Good to know:
  - It has its OWN save slot, so it never touches your real progress in the
    normal Java Quest app, even if both run on the same address.
  - "RESTORE MAXED STATE" (Status tab) puts everything back to maxed.
  - Want a different level? Change MAXED_LEVEL near the top of the MAXED
    EDITION section in script.js (the game has no level cap; 50 keeps the XP
    numbers readable).
  - If you run it next to the normal app on your own computer, use a different
    port (e.g. python3 -m http.server 8081) so the two don't share an address.
  - Its icon is gold with "MAX" so you can tell it apart when installed.

----------------------------------------------------------------------------
(The rest of this file is the normal Java Quest README.)
----------------------------------------------------------------------------

JAVA QUEST — installable PWA
=========================================

This is a Progressive Web App (PWA). That means it can be installed like a
real app (own icon, own window, works offline) straight from a browser —
no app store needed. To get the "Install" button to appear, the app needs
to be served over http/https (not opened directly as a file), because
that's a browser security requirement for installable apps.

FASTEST WAY TO TRY IT (no install needed):
  Just double-click index.html to open it in your browser. Everything
  works except the "Install App" button and offline caching.

TO ACTUALLY INSTALL IT AS AN APP:

Option A — Run it locally (takes 30 seconds):
  1. Open a terminal in this folder.
  2. Run:  python3 -m http.server 8080
  3. Open  http://localhost:8080  in Chrome, Edge, or Android Chrome.
  4. Click the "⬇ INSTALL" button in the top bar (or the install
     icon in the browser's address bar). On iPhone/iPad Safari, use
     Share → "Add to Home Screen" instead.

Option B — Put it online so you can share a LINK (recommended):
  Hosting gives you a real https:// address. Anyone who opens it can play,
  and the INSTALL button works for them. Share that address, not the zip.
  The app is just static files, so any free static host works:

  Netlify Drop (fastest, about 1 minute):
    1. Unzip java-quest-app.zip so you have a folder containing index.html.
    2. Go to https://app.netlify.com/drop and drag that FOLDER onto the page.
    3. You get a random https://something.netlify.app link right away.
    4. IMPORTANT: sign up (free) and "claim" the site. An unclaimed site is
       deleted automatically after a short time (reported as about an hour).
    5. To update later, drag the new folder onto the site's Deploys page.

  GitHub Pages (permanent, free, good for sharing):
    1. Create a free GitHub account and a new PUBLIC repository.
    2. Upload the files from the unzipped folder (index.html etc. must be at
       the top level of the repo, not inside a sub-folder).
    3. Repo Settings -> Pages -> Source: "Deploy from a branch", branch main,
       folder / (root) -> Save.
    4. After a minute your link is https://YOUR-USERNAME.github.io/REPO-NAME/

  Want people to download the zip instead? Upload java-quest-app.zip to
  Google Drive / Dropbox / a GitHub Release and share that link. They'd then
  need to unzip it and serve it (Option A) to install it, so the hosted link
  above is much easier for them.

  Note: each address keeps its own saved progress, so progress made at
  localhost:8080 is separate from progress at your hosted link (use
  Export/Import Backup to move it).

GAMEPLAY NOTES:
  Lessons  — read the lesson, then do a PRACTICE DRILL: 3 questions where you
             read real Java code and say what it prints, TYPE the missing piece
             of a snippet, or spot why code breaks. All correct = quest cleared.
  Dungeons — each Gate ends in a BOSS BATTLE with HP bars: correct answers damage
             the boss, wrong answers cost you HP. Level up for more HP and spend
             stat points on DEBUG to take less damage. Boss questions are quick
             multiple choice, separate from the lesson drills.

STATS (you get 3 points per level; spend them in the Status tab):
  Every stat starts at 1 (no bonus). Each one does a different real thing:
  🧠 LOGIC     — ANALYZE: 1 charge per 2 points. A charge crosses out 2 wrong
                 answers on a multiple-choice question (boss fights AND drills).
  ⚡ SYNTAX    — CRITICAL HITS: +5% chance per point (max 40%) that a right
                 answer in a boss fight hits for DOUBLE damage. Crits still pay
                 full XP, they just end the fight sooner.
  🛡 STRUCTURE — MAX HP: +10 HP per point in boss fights (levels add +5 each).
  🐞 DEBUG     — RESILIENCE: -2 damage from every wrong answer per point
                 (a mistake never hurts less than 5).
  The Status tab shows what each stat does, its current effect, and what the
  next point would change.

BUTTONS (top bar, always visible):
  💾 SAVE     — saves your progress now (it also auto-saves after every change)
  ⬇ INSTALL  — installs the app if your browser allows it; otherwise it shows
               step-by-step instructions for your browser/device. It shows
               "INSTALLED" once you're running the installed app.

FILES:
  index.html              — page structure/markup only
  style.css               — all styling (theme, layout, animations)
  script.js               — all app logic (state, XP, boss battles, quiz engine, saving)
  drills.js               — the lesson practice-drill questions (24 lessons x 3)
  manifest.webmanifest    — tells the browser this is an installable app
  sw.js                   — service worker, caches the app for offline use
  icon-192.png / icon-512.png / icon-maskable-512.png — app icons

SAVING YOUR PROGRESS:
  Progress saves automatically to your device (browser localStorage) after
  every change — closing or reopening the app keeps your level, XP, cleared
  quests, boss clears, and stats. The Daily Quest resets each new day.
  The Status screen has a "Save Data" panel (and there's a 💾 SAVE button in
  the top bar) with:
    SAVE NOW        — force a save right now
    EXPORT BACKUP   — downloads a java-quest-save-DATE.json file to your device
    IMPORT BACKUP   — restores progress from one of those files
    RESET PROGRESS  — erases everything and starts over (asks first)
  Things to know:
    - Saves are tied to the address you open the app from. localhost:8080 and
      your Netlify URL are separate, so use Export/Import to move between them.
    - Clearing your browser's site data deletes the save, so export a backup
      now and then. There is no account system or cloud sync.
