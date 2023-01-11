CREATE TABLE games (
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(100),
year_published SMALLINT,
date_added timestamp not null default CURRENT_TIMESTAMP,
quantity SMALLINT,
minimum_players SMALLINT,
maximum_players SMALLINT,
category TEXT [],
duration SMALLINT,
difficulty VARCHAR(12),
minimum_age SMALLINT,
description TEXT,
packaging_image_url TEXT,
artwork_image_url TEXT,
rules TEXT,
skus TEXT [],
barcode TEXT,
location TEXT,
video_rules TEXT
);

INSERT INTO games (title, year_published, quantity, minimum_players, maximum_players, category, duration, difficulty, minimum_age, description, packaging_image_url, artwork_image_url, rules, skus, barcode, location, video_rules)
VALUES ('Scrabble',
1948,
2,
2,
4,
ARRAY ['word game'], 90, 'easy', 10, 'The classic word-on-word showdown. Use your letters to score points and challenge your family and friends. A double or triple letter or word space will let you earn big points. It`s your word against theirs!', 'https://m.media-amazon.com/images/I/81OjLGNO5VL.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoW3wCChVdvez12HtvTJIuv8z6ruNZHwGdZUhcPBjSVNYmrQTUbL17onn0j9D4BhkDaL4&usqp=CAU', 'You should have a game board, 100 letter tiles, a letter bag, and four racks.

Before the game begins, all players should agree upon the dictionary that they will use, in case of a challenge. All words labeled as a part of speech (including those listed of foreign origin, and as archaic, obsolete, colloquial, slang, etc.) are permitted with the exception of the following: words always capitalized, abbreviations, prefixes and suffixes standing alone, words requiring a hyphen or an apostrophe.

Place all letters in the pouch, or facedown beside the board, and mix them up. Draw for first play. The player with the letter closest to "A" plays first. A blank tile beats any letter. Return the letters to the pool and remix. All players draw seven new letters and place them on their racks. Source: https://scrabble.hasbro.com/en-us/rules', ARRAY [
        '2149229990',
        'Y9592',
        '48977 #0191',
        '653569973720',
        'G1022_SCRABTRA_SH',
        '2149020164',
        '2148411494',
        '2149089842',
        '2149105996',
        '2149110341',
        '2148956710',
        '2149110337',
        '2148629489',
        '2149049017',
        '2149091592',
        '2148288148',
        '2149110363',
        '2149153667',
        '2148288160',
        '2148896184',
        '746775260682',
        'MAGY9592',
        'MATY9592',
        '27954',
        '98612',
        '630509254576',
        'A8166',
        'HBGA8166',
        '2149126613',
        '44413 #0122',
        '47326 #0152',
        '48203 #0302',
        '887961104776',
        'BG-000875-001',
        'HASA8769',
        'HBGA8166000',
        'HBGA8769079',
        'HSBA8166',
        'MATCJT11',
        '200121138',
        'MAT-SCR-DELUXE',
        '5300001K',
        '65967867',
        '2149179901',
        'WIN1115'
      ], '653569887447', 'Shelf S, Number 13', 'https://www.youtube.com/watch?v=swlg3vQXboE'),
      ('Scattergories',
1988,
1,
2,
6,
ARRAY ['party game'], 30, 'easy', 12, 'Scattergories is a multi-player word game where the objective is to earn the most points by making a list of words that all begin with the same letter. There are a set of category cards and letter cards.', 'https://target.scene7.com/is/image/Target/GUEST_847fae64-840e-4a43-af64-a5e2449688d7?wid=488&hei=488&fmt=pjpeg', 'https://m.media-amazon.com/images/I/51qjqNSBm-L._AC_SY580_.jpg', 'In the time allotted, each player must attempt to think of and write down, in the first column on the pad, a word or term that fits each of the 12 categories and starts with the rolled letter. Any number of words in the answer is allowed, as long as the first word starts with the correct letter. Source: https://static.libnet.info/images/pdfs/shasta/2020/Scattergories_Rules.pdf', ARRAY [
        'HSBA5226'
      ], '653569887447', 'Shelf S, Number 4', 'https://www.youtube.com/watch?v=WgRm_auxt_w'), 
('Food Chain Magnate',
2015,
1,
2,
5,
ARRAY ['strategy'], 240, 'hard', 14, 'Food Chain Magnate is a heavy strategy game about building a fast food chain. The focus is on building your company using a card-driven (human) resource management system. Players compete on a variable city map through purchasing, marketing and sales, and on a job market for key staff members. The game can be played by 2-5 serious gamers in 2-4 hours.', 'https://cf.geekdo-images.com/671n8Iu6u9xE6XYJ3HV4PQ__imagepage/img/eFeojMWeYtpx-EjR6RQi5jA_FPY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2649623.jpg', 'https://cf.geekdo-images.com/GG4aQ87_eNY-Vo6QJcIi6A__imagepage/img/V9FH9uGBLZ3mZ8WSBSaDDc4nzbw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2783840.jpg', 'Each player starts as a single entrepreneur and builds up a fast food chain. They do this by hiring and training staff, represented by cards and by running the operations of their company, which is done on a variable board. The game continues until the bank runs out of money (twice). The richest player then wins. The game is played in phases. Some phases are played simultaneously, others use turn order. Source: https://www.qugs.org/rules/r175914.pdf', ARRAY [
        '175914'
      ], '859573004393', 'Shelf F, Number 12', 'https://www.youtube.com/watch?v=YP2Bf69ZAiE'),
      ('Azul',
2017,
3,
2,
4,
ARRAY ['family game'], 45, 'easy', 8, 'Introduced by the Moors, azuleijos (originally white and blue ceramic tiles) were fully embraced by the Portuguese when their king Manuel I, on a visit to the Alhambra palace in Southern Spain, was mesmerized by the stunning beauty of the Moorish decorative tiles. The king, awestruck by the interior beauty of the Alhambra, immediately ordered that his own palace in Portugal be decorated with similar wall tiles. As a tile-laying artist, you have been challenged to embellish the walls of the Royal Palace of Evora.', 'https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v1505187261348167540/products/AZU001_3D.png', 'https://cf.geekdo-images.com/kFgzuG2jp8xu19C4ULQprQ__imagepage/img/BSTYuYjsdJwKPrPOiIV_KQ05-c4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3863715.jpg', 'In the game Azul, players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they''ve placed their tiles to decorate the palace. Extra points are scored for specific patterns and completing sets; wasted supplies harm the player''s score. The player with the most points at the end of the game wins. Source: https://www.dicebreaker.com/games/azul/how-to/how-to-play-azul-board-game', ARRAY [
        'HSBA5229'
      ], '826956400202', 'Shelf A, Number 40', 'https://www.youtube.com/watch?v=csJL-78NEPQ'), 
('A Feast for Odin',
2016,
1,
1,
4,
ARRAY ['strategy'], 120, 'intermediate', 12, 'A Feast for Odin is a saga in the form of a board game. You are reliving the cultural achievements, mercantile expeditions, and pillages of those tribes we know as Viking today — a term that was used quite differently towards the end of the first millennium. In this game, you will raid and explore new territories. You will also experience their day-to-day activities: collecting goods to achieve a financially secure position in society. In the end, the player whose possessions bear the greatest value will be declared the winner.', 'https://cf.geekdo-images.com/VO3vWVj0S59pMjWMs_Zibg__imagepage/img/BJbmpXd3zCGTSzMDfFaJuDcB2Ng=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3079801.jpg', 'https://cf.geekdo-images.com/NI2pp6NzQOAEA3Y27a_qIg__imagepage/img/000m147H0stANaNHlmKyhaithlE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3105732.jpg', 'A Feast for Odin is a story that has taken the form of a board game. The story of the Vikings is played out right in front of the players, as they themselves play the roles of the Vikings. The players become explorers, founders of civilizations, and conquerors. The player with the most possessions that bear the greatest value will be declared the winner. Source: https://gamerules.com/rules/a-feast-for-odin/', ARRAY [
        '177736'
      ], '681706716909', 'Shelf A, Number 8', 'https://www.youtube.com/watch?v=hqEPY2XLbYg'),
      ('Eldritch Horror',
2013,
1,
1,
8,
ARRAY ['thematic'], 240, 'intermediate', 14, 'An unknown Elder God approaches the world—and you must solve mysteries to stop it.', 'https://67287.cdn.simplo7.net/static/67287/sku/jogos-de-tabuleiro-e-cardgames-eldritch-horror--p-1649771344274.jpg', 'https://www.fortressofsolitude.co.za/wp-content/uploads/2022/01/Arkham-Horror-Review.jpeg', 'Eldritch Horror is a cooperative game of investigation and
horror inspired by the writings of H. P. Lovecraft. In each
game, one of the Ancient Ones, a being of unimaginable power that predates time itself, is awakening. Players take on the roles of investigators who are attempting to solve mysteries, defend humanity from unimaginable horrors, and ultimately banish the Ancient One from this world. If investigators fail at their task, the Ancient One awakens, and mankind is doomed. Source: https://images-cdn.fantasyflightgames.com/filer_public/c7/d6/c7d6cff6-7025-41f9-8538-bb0626feb4f4/eh01_rulebook.pdf', ARRAY [
        'GALAEHOR'
      ], '841333100537', 'Shelf E, Number 21', 'https://www.youtube.com/watch?v=yDY-1DK9zf8'),
('Twilight Imperium: Third Edition',
2005,
1,
3,
6,
ARRAY ['strategy, thematic'], 240, 'hard', 14, 'Epic empire-building game of interstellar conflict, trade, and struggle for power.', 'https://http2.mlstatic.com/D_NQ_NP_830919-MLB47233543037_082021-O.jpg', 'https://m.media-amazon.com/images/I/51EFjlBbc9L._AC_SY350_.jpg', 'Welcome to a galaxy of epic conquest, interstellar trade, and political intrigue. TWILIGHT IMPERIUM is an exciting board game in which 3-6 players seek to build a galactic empire by the cunning use of strategy, diplomacy, and resource management. By taking on the role of a great interstellar race, players will seek the ultimate goal: to claim the Imperial Throne on Mecatol Rex and lead the galaxy to a new age of glory. But the road to the Imperial Throne is long and the galaxy holds many dangers. Do you have what it takes to lead your race out of the troubled Twilight
Age? Do you have the determination to move your
race forward using a balance of diplomacy, careful
planning, and the use of force? Are you ready to
direct scientific development, military might, and
economic growth for an entire interstellar civilization?
If so, your time has come! Source: https://images-cdn.fantasyflightgames.com/ffg_content/Twilight%20Imperium%203/ti3rules.pdf', ARRAY [
        'FFGTI05'
      ], '9781589942066', 'Shelf T, Number 32', 'https://www.youtube.com/watch?v=12C7gHBAnnI') 
;