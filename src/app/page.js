'use client'

import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'

const THEMES = {
  starter: {
    name: "🦒 Starter Animals",
    emojis: ['🦒', '🐘', '🦏', '🦛', '🐪', '🦓', '🦌', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦘', '🦫', '🦣', '🐕', '🐈', '🐁', '🐀', '🦔', '🐹', '🐭', '🐱', '🐶', '🐺', '🦝'],
    bg: 'from-green-400 via-blue-400 to-purple-500',
    unlockLevel: 0,
    unlockDescription: "Available from start"
  },
  animals: {
    name: "🐾 Animal Friends", 
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐵', '🦁', '🐯', '🐨', '🐷', '🐮', '🐺', '🦝', '🦔', '🐧', '🐦'],
    bg: 'from-green-400 via-blue-400 to-purple-500',
    unlockLevel: 1,
    unlockDescription: "Available from start!"
  },
  fruits: {
    name: "🍎 Yummy Fruits",
    emojis: ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍', '🥥', '🍈', '🍉', '🫐', '🍋', '🥑', '🍐', '🥕', '🌽', '🍅'],
    bg: 'from-yellow-400 via-orange-400 to-red-500',
    unlockLevel: 5,
    unlockDescription: "Complete Level 5 to unlock!"
  },
  space: {
    name: "🚀 Space Adventure",
    emojis: ['🚀', '🛸', '👽', '🌟', '⭐', '🌙', '☄️', '🪐', '🌍', '🌕', '🌞', '🛰️', '👨‍🚀', '👩‍🚀', '🔭', '🌌', '☀️', '💫', '🌠', '🌒'],
    bg: 'from-purple-600 via-blue-600 to-black',
    unlockLevel: 6,
    unlockDescription: "Complete Level 6 to unlock!"
  },
  magical: {
    name: "🦄 Magical Animals",
    emojis: ['🦄', '🐉', '🔮', '🧚‍♀️', '🧚‍♂️', '🧙‍♀️', '🧙‍♂️', '🦋', '🐛', '🕷️', '🦢', '🦚', '🐲', '🦅', '🦉', '🦇', '🐺', '🦄', '✨', '⚡'],
    bg: 'from-pink-500 via-purple-500 to-indigo-600',
    unlockLevel: 7,
    unlockDescription: "Complete Level 7 to unlock!"
  },
  gaming: {
    name: "🎮 Gaming Fun",
    emojis: ['🎮', '🕹️', '👾', '🎯', '🏆', '⭐', '💎', '🔥', '⚡', '🚀', '💥', '🎊', '🎉', '🏅', '👑', '🎲', '🃏', '🎪', '🎭', '🎨'],
    bg: 'from-cyan-500 via-blue-500 to-purple-600',
    unlockLevel: 8,
    unlockDescription: "Complete Level 8 to unlock!"
  },
  girly: {
    name: "💖 Princess Dreams",
    emojis: ['💖', '👑', '💎', '🌸', '🎀', '💅', '👗', '🦄', '🌺', '💐', '🎂', '🧚‍♀️', '👸', '💄', '👠', '🌷', '🌹', '💍', '✨', '💕'],
    bg: 'from-pink-400 via-rose-400 to-purple-400',
    unlockLevel: 9,
    unlockDescription: "Complete Level 9 to unlock!"
  }
}

console.log('LEVELS updated with new names:', new Date().toISOString())

const LEVELS = {
  '3-5': [
    { level: 1, pairs: 2, name: "👧🏽🍭👦🏽 Easy", encouragement: "You're doing great!" },
    { level: 2, pairs: 4, name: "👧🏽🍭👦🏽 Challenges Starting", encouragement: "Wow! You're so smart!" },
    { level: 3, pairs: 6, name: "👧🏽🍭👦🏽 Extreme Mode", encouragement: "Amazing job, superstar!" },
    { level: 4, pairs: 8, name: "👧🏽🍭👦🏽 Power Player", encouragement: "You're incredible!" },
    { level: 5, pairs: 10, name: "👧🏽🍭👦🏽 Focus Master", encouragement: "Your brain is super strong!" },
    { level: 6, pairs: 12, name: "👧🏽🍭👦🏽 Level Boss", encouragement: "Magic! You're fantastic!" },
    { level: 7, pairs: 14, name: "👧🏽🍭👦🏽 Champion Level", encouragement: "You're a true champion!" },
    { level: 8, pairs: 16, name: "👧🏽🍭👦🏽 Star Player", encouragement: "Magical! You're unstoppable!" },
    { level: 9, pairs: 18, name: "👧🏽🍭👦🏽 Diamond Rank", encouragement: "You're absolutely brilliant!" },
    { level: 10, pairs: 20, name: "👧🏽🍭👦🏽 Ultimate Gamer", encouragement: "You're the BEST!" }
  ],
  '6-8': [
    { level: 1, pairs: 2, name: "👩🏽🎮🧑🏽‍🦱 Easy", encouragement: "You're doing great!" },
    { level: 2, pairs: 4, name: "👩🏽🎮🧑🏽‍🦱 Challenges Starting", encouragement: "Wow! You're so smart!" },
    { level: 3, pairs: 6, name: "👩🏽🎮🧑🏽‍🦱 Extreme Mode", encouragement: "Amazing job, superstar!" },
    { level: 4, pairs: 8, name: "👩🏽🎮🧑🏽‍🦱 Power Player", encouragement: "You're incredible!" },
    { level: 5, pairs: 10, name: "👩🏽🎮🧑🏽‍🦱 Focus Master", encouragement: "Your brain is super strong!" },
    { level: 6, pairs: 12, name: "👩🏽🎮🧑🏽‍🦱 Level Boss", encouragement: "Magic! You're fantastic!" },
    { level: 7, pairs: 14, name: "👩🏽🎮🧑🏽‍🦱 Champion Level", encouragement: "You're a true champion!" },
    { level: 8, pairs: 16, name: "👩🏽🎮🧑🏽‍🦱 Star Player", encouragement: "Magical! You're unstoppable!" },
    { level: 9, pairs: 18, name: "👩🏽🎮🧑🏽‍🦱 Diamond Rank", encouragement: "You're absolutely brilliant!" },
    { level: 10, pairs: 20, name: "👩🏽🎮🧑🏽‍🦱 Ultimate Gamer", encouragement: "You're the BEST!" }
  ],
  '9-12': [
    { level: 1, pairs: 2, name: "🧔🏽‍♂️💻👱🏽‍♀️ Easy", encouragement: "You're doing great!" },
    { level: 2, pairs: 4, name: "🧔🏽‍♂️💻👱🏽‍♀️ Challenges Starting", encouragement: "Wow! You're so smart!" },
    { level: 3, pairs: 6, name: "🧔🏽‍♂️💻👱🏽‍♀️ Extreme Mode", encouragement: "Amazing job, superstar!" },
    { level: 4, pairs: 8, name: "🧔🏽‍♂️💻👱🏽‍♀️ Power Player", encouragement: "You're incredible!" },
    { level: 5, pairs: 10, name: "🧔🏽‍♂️💻👱🏽‍♀️ Focus Master", encouragement: "Your brain is super strong!" },
    { level: 6, pairs: 12, name: "🧔🏽‍♂️💻👱🏽‍♀️ Level Boss", encouragement: "Magic! You're fantastic!" },
    { level: 7, pairs: 14, name: "🧔🏽‍♂️💻👱🏽‍♀️ Champion Level", encouragement: "You're a true champion!" },
    { level: 8, pairs: 16, name: "🧔🏽‍♂️💻👱🏽‍♀️ Star Player", encouragement: "Magical! You're unstoppable!" },
    { level: 9, pairs: 18, name: "🧔🏽‍♂️💻👱🏽‍♀️ Diamond Rank", encouragement: "You're absolutely brilliant!" },
    { level: 10, pairs: 20, name: "🧔🏽‍♂️💻👱🏽‍♀️ Ultimate Gamer", encouragement: "You're the BEST!" }
  ]
}

const LANGUAGES = {
  en: { flag: '🇺🇸', name: 'English' },
  es: { flag: '🇪🇸', name: 'Español' },
  fr: { flag: '🇫🇷', name: 'Français' },
  de: { flag: '🇩🇪', name: 'Deutsch' },
  it: { flag: '🇮🇹', name: 'Italiano' },
  pt: { flag: '🇧🇷', name: 'Português (BR)' },
  hr: { flag: '🇭🇷', name: 'Hrvatski' },
  ja: { flag: '🇯🇵', name: '日本語' },
  ko: { flag: '🇰🇷', name: '한국어' },
  zh: { flag: '🇨🇳', name: '中文' }
}

const TRANSLATIONS = {
  en: {
    selectLanguage: 'Select Your Language',
    settings: 'Settings',
    resetToLevel1: 'Reset to Level 1',
    resetAllProgress: 'Reset All Progress',
    ageGroup: 'Age Group',
    themeColor: 'Theme & Color',
    sparklyCards: 'Sparkly Cards',
    on: 'ON',
    off: 'OFF',
    close: 'Close',
    backToMenu: 'Back to Menu',
    moves: 'Moves',
    hint: 'Hint',
    youWin: 'YOU WIN!',
    gameOver: 'GAME OVER!',
    youRanOutOfMoves: 'You ran out of moves!',
    tryAgain: 'Try Again',
    nextLevel: 'Next Level',
    resetEverything: 'Reset Everything?',
    thisWillDelete: 'This will delete:',
    allLevels: 'All your levels',
    allThemes: 'All unlocked themes',
    allAchievements: 'All achievements',
    allItems: 'All collected items',
    reallyReset: 'Are you really sure?',
    yesReset: 'Yes, Reset Everything',
    keepProgress: 'Keep My Progress!',
    backpack: 'Backpack',
    achievements: 'Achievements',
    unlocked: 'Unlocked!',
    itemCollected: 'Item Collected!',
    badgeEarned: 'Badge Earned!',
    backToGame: 'Back to Game',
    howOldAreYou: 'How old are you?',
    chooseYourTheme: 'Choose Your Theme!',
    pickCardColor: 'Pick Your Card Color',
    cardStyle: 'Card Style!',
    normal: 'Normal',
    sparkly: 'Sparkly!',
    multiplayerGame: 'Multiplayer Game',
    firstTo10Wins: 'First to 10 Points Wins!',
    eachRoundHas: 'Each round has 4 cards (2 pairs)',
    howManyPlayers: 'How many players? (2-8 players)',
    players: 'players',
    startGame: 'Start Game',
    player: 'Player',
    turn: 'Turn',
    sTurn: "'s turn",
    tie: "It's a tie!",
    wins: 'Wins!',
    reachedTenPointsFirst: 'reached 10 points first!',
    finalScores: 'Final Scores:',
    score: 'Score',
    level: 'Level',
    newUnlocks: 'NEW UNLOCKS!',
    tapMoreTimes: 'Tap',
    moreTimes: 'more time',
    opening: 'Opening...',
    availableFromStart: 'Available from start',
    completeLevel: 'Complete Level',
    toUnlock: 'to unlock!',
    yourProgress: 'Your Progress',
    easyAndFun: 'Easy & Fun!',
    gettingHarder: 'Getting Harder!',
    challengeMode: 'Challenge Mode!',
    years: 'years',
    memoryGame: 'Memory Game',
    triesLeft: 'Tries Left',
    left: 'left!',
    easy: 'Easy',
    challengesStarting: 'Challenges Starting',
    extremeMode: 'Extreme Mode',
    powerPlayer: 'Power Player',
    focusMaster: 'Focus Master',
    levelBoss: 'Level Boss',
    championLevel: 'Champion Level',
    starPlayer: 'Star Player',
    diamondRank: 'Diamond Rank',
    ultimateGamer: 'Ultimate Gamer',
    defaultWhite: 'Default White',
    oceanBlue: 'Ocean Blue',
    magicPurple: 'Magic Purple',
    prettyPink: 'Pretty Pink',
    natureGreen: 'Nature Green',
    sunnyOrange: 'Sunny Orange',
    cherryRed: 'Cherry Red',
    rainbowMagic: 'Rainbow Magic',
    playerNames: 'Player Names',
    dontPutRealName: "Don't put your real name!",
    highestLevelCompleted: 'Highest Level Completed:',
    readyToStart: 'Ready to start your journey! Complete levels to unlock new content.',
    checkSettings: 'Check Settings to use them!',
    startOverLevel1: 'Start Over at Level 1?',
    noWorries: 'No worries! Your unlocks are safe! 😊',
    round: 'Round',
    cardsFindMatches: 'cards - Find matches to score points!',
    youCompleted: 'You completed',
    nextLevelStarting: 'Next level starting in...',
    winner: 'WINNER!',
    keepPlayingFirstTo10: 'Keep playing! First to 10 wins!',
    playAgain: 'Play Again',
    // Achievements
    firstMatchName: 'First Match!',
    firstMatchDesc: 'Made your first match',
    level5HeroName: 'Level 5 Hero',
    level5HeroDesc: 'Reached level 5',
    level10MasterName: 'Level 10 Master',
    level10MasterDesc: 'Reached level 10',
    perfectName: 'Perfect!',
    perfectDesc: 'Got 3 stars on a level',
    firstTreasureName: 'First Treasure',
    firstTreasureDesc: 'Collected your first item',
    collectorName: 'Collector',
    collectorDesc: 'Collected 10 total items',
    hoarderName: 'Hoarder',
    hoarderDesc: 'Collected 50 total items',
    multiplayerChampionName: 'Multiplayer Champion',
    multiplayerChampionDesc: 'Won a multiplayer game',
    speedsterName: 'Speedster',
    speedsterDesc: 'Completed a level in under 10 moves',
    themeCollectorName: 'Theme Collector',
    themeCollectorDesc: 'Unlocked a new theme',
    gemFinderName: 'Gem Finder',
    gemFinderDesc: 'Found 5 gems',
    fishermanName: 'Fisherman',
    fishermanDesc: 'Caught 5 fish'
  },
  es: {
    selectLanguage: 'Selecciona tu idioma',
    settings: 'Configuración',
    resetToLevel1: 'Reiniciar al Nivel 1',
    resetAllProgress: 'Reiniciar Todo el Progreso',
    ageGroup: 'Grupo de Edad',
    themeColor: 'Tema y Color',
    sparklyCards: 'Cartas Brillantes',
    on: 'SÍ',
    off: 'NO',
    close: 'Cerrar',
    backToMenu: 'Volver al Menú',
    moves: 'Movimientos',
    hint: 'Pista',
    youWin: '¡GANASTE!',
    gameOver: '¡JUEGO TERMINADO!',
    youRanOutOfMoves: '¡Te quedaste sin movimientos!',
    tryAgain: 'Intentar de Nuevo',
    nextLevel: 'Siguiente Nivel',
    resetEverything: '¿Reiniciar Todo?',
    thisWillDelete: 'Esto borrará:',
    allLevels: 'Todos tus niveles',
    allThemes: 'Todos los temas desbloqueados',
    allAchievements: 'Todos los logros',
    allItems: 'Todos los artículos coleccionados',
    reallyReset: '¿Estás realmente seguro?',
    yesReset: 'Sí, Reiniciar Todo',
    keepProgress: '¡Mantener Mi Progreso!',
    backpack: 'Mochila',
    achievements: 'Logros',
    unlocked: '¡Desbloqueado!',
    itemCollected: '¡Artículo Coleccionado!',
    badgeEarned: '¡Insignia Ganada!',
    backToGame: 'Volver al Juego',
    howOldAreYou: '¿Cuántos años tienes?',
    chooseYourTheme: '¡Elige Tu Tema!',
    pickCardColor: 'Elige el Color de Tus Cartas',
    cardStyle: '¡Estilo de Carta!',
    normal: 'Normal',
    sparkly: '¡Brillante!',
    multiplayerGame: 'Juego Multijugador',
    firstTo10Wins: '¡El Primero en 10 Puntos Gana!',
    eachRoundHas: 'Cada ronda tiene 4 cartas (2 pares)',
    howManyPlayers: '¿Cuántos jugadores? (2-8 jugadores)',
    players: 'jugadores',
    startGame: 'Iniciar Juego',
    player: 'Jugador',
    turn: 'Turno',
    sTurn: "'s turno",
    tie: "¡Es un empate!",
    wins: '¡Gana!',
    reachedTenPointsFirst: '¡alcanzó 10 puntos primero!',
    finalScores: 'Puntuaciones finales:',
    score: 'Puntuación',
    level: 'Nivel',
    newUnlocks: '¡NUEVOS DESBLOQUEOS!',
    tapMoreTimes: 'Toca',
    moreTimes: 'vez más',
    opening: 'Abriendo...',
    availableFromStart: 'Disponible desde el inicio',
    completeLevel: 'Completa el Nivel',
    toUnlock: 'para desbloquear!',
    yourProgress: 'Tu Progreso',
    easyAndFun: '¡Fácil y Divertido!',
    gettingHarder: '¡Más Difícil!',
    challengeMode: '¡Modo Desafío!',
    years: 'años',
    memoryGame: 'Juego de Memoria',
    triesLeft: 'Intentos Restantes',
    left: '¡quedan!',
    easy: 'Fácil',
    challengesStarting: 'Desafíos Comenzando',
    extremeMode: 'Modo Extremo',
    powerPlayer: 'Jugador Poderoso',
    focusMaster: 'Maestro del Enfoque',
    levelBoss: 'Jefe de Nivel',
    championLevel: 'Nivel Campeón',
    starPlayer: 'Jugador Estrella',
    diamondRank: 'Rango Diamante',
    ultimateGamer: 'Jugador Definitivo',
    defaultWhite: 'Blanco Predeterminado',
    oceanBlue: 'Azul Océano',
    magicPurple: 'Púrpura Mágico',
    prettyPink: 'Rosa Bonito',
    natureGreen: 'Verde Naturaleza',
    sunnyOrange: 'Naranja Soleado',
    cherryRed: 'Rojo Cereza',
    rainbowMagic: 'Magia Arcoíris',
    playerNames: 'Nombres de Jugadores',
    dontPutRealName: '¡No pongas tu nombre real!',
    highestLevelCompleted: 'Nivel más alto completado:',
    readyToStart: '¡Listo para comenzar tu aventura! Completa niveles para desbloquear nuevo contenido.',
    checkSettings: '¡Revisa Configuración para usarlos!',
    startOverLevel1: '¿Comenzar de nuevo en el Nivel 1?',
    noWorries: '¡No te preocupes! ¡Tus desbloqueos están a salvo! 😊',
    round: 'Ronda',
    cardsFindMatches: 'cartas - ¡Encuentra parejas para ganar puntos!',
    youCompleted: 'Completaste',
    nextLevelStarting: 'Siguiente nivel comenzando en...',
    winner: '¡GANADOR!',
    keepPlayingFirstTo10: '¡Sigue jugando! ¡El primero en llegar a 10 gana!',
    playAgain: 'Jugar de Nuevo',
    // Achievements
    firstMatchName: '¡Primera Pareja!',
    firstMatchDesc: 'Hiciste tu primera pareja',
    level5HeroName: 'Héroe del Nivel 5',
    level5HeroDesc: 'Alcanzaste el nivel 5',
    level10MasterName: 'Maestro del Nivel 10',
    level10MasterDesc: 'Alcanzaste el nivel 10',
    perfectName: '¡Perfecto!',
    perfectDesc: 'Obtuviste 3 estrellas en un nivel',
    firstTreasureName: 'Primer Tesoro',
    firstTreasureDesc: 'Recolectaste tu primer objeto',
    collectorName: 'Coleccionista',
    collectorDesc: 'Recolectaste 10 objetos en total',
    hoarderName: 'Acaparador',
    hoarderDesc: 'Recolectaste 50 objetos en total',
    multiplayerChampionName: 'Campeón Multijugador',
    multiplayerChampionDesc: 'Ganaste un juego multijugador',
    speedsterName: 'Veloz',
    speedsterDesc: 'Completaste un nivel en menos de 10 movimientos',
    themeCollectorName: 'Coleccionista de Temas',
    themeCollectorDesc: 'Desbloqueaste un nuevo tema',
    gemFinderName: 'Buscador de Gemas',
    gemFinderDesc: 'Encontraste 5 gemas',
    fishermanName: 'Pescador',
    fishermanDesc: 'Pescaste 5 peces'
  },
  fr: {
    selectLanguage: 'Sélectionnez votre langue',
    settings: 'Paramètres',
    resetToLevel1: 'Recommencer au Niveau 1',
    resetAllProgress: 'Réinitialiser Tout',
    ageGroup: 'Groupe d\'âge',
    themeColor: 'Thème et Couleur',
    sparklyCards: 'Cartes Scintillantes',
    on: 'OUI',
    off: 'NON',
    close: 'Fermer',
    backToMenu: 'Retour au Menu',
    moves: 'Coups',
    hint: 'Indice',
    youWin: 'VICTOIRE!',
    gameOver: 'JEU TERMINÉ!',
    youRanOutOfMoves: 'Vous n\'avez plus de coups!',
    tryAgain: 'Réessayer',
    nextLevel: 'Niveau Suivant',
    resetEverything: 'Tout Réinitialiser?',
    thisWillDelete: 'Cela supprimera:',
    allLevels: 'Tous vos niveaux',
    allThemes: 'Tous les thèmes débloqués',
    allAchievements: 'Tous les succès',
    allItems: 'Tous les objets collectés',
    reallyReset: 'Êtes-vous vraiment sûr?',
    yesReset: 'Oui, Tout Réinitialiser',
    keepProgress: 'Garder Ma Progression!',
    backpack: 'Sac à dos',
    achievements: 'Succès',
    unlocked: 'Débloqué!',
    itemCollected: 'Objet Collecté!',
    badgeEarned: 'Badge Gagné!',
    backToGame: 'Retour au Jeu',
    howOldAreYou: 'Quel âge avez-vous?',
    chooseYourTheme: 'Choisissez Votre Thème!',
    pickCardColor: 'Choisissez la Couleur de Vos Cartes',
    cardStyle: 'Style de Carte!',
    normal: 'Normal',
    sparkly: 'Scintillant!',
    multiplayerGame: 'Jeu Multijoueur',
    firstTo10Wins: 'Le Premier à 10 Points Gagne!',
    eachRoundHas: 'Chaque tour a 4 cartes (2 paires)',
    howManyPlayers: 'Combien de joueurs? (2-8 joueurs)',
    players: 'joueurs',
    startGame: 'Commencer le Jeu',
    player: 'Joueur',
    turn: 'Tour',
    sTurn: " joue",
    tie: "C'est une égalité!",
    wins: 'Gagne!',
    reachedTenPointsFirst: 'a atteint 10 points en premier!',
    finalScores: 'Scores finaux:',
    score: 'Score',
    level: 'Niveau',
    newUnlocks: 'NOUVEAUX DÉBLOCAGES!',
    tapMoreTimes: 'Appuyez',
    moreTimes: 'fois de plus',
    opening: 'Ouverture...',
    availableFromStart: 'Disponible dès le début',
    completeLevel: 'Terminez le Niveau',
    toUnlock: 'pour débloquer!',
    yourProgress: 'Votre Progrès',
    easyAndFun: 'Facile & Amusant!',
    gettingHarder: 'Plus Difficile!',
    challengeMode: 'Mode Défi!',
    years: 'ans',
    memoryGame: 'Jeu de Mémoire',
    triesLeft: 'Essais Restants',
    left: 'restants!',
    easy: 'Facile',
    challengesStarting: 'Défis Commencent',
    extremeMode: 'Mode Extrême',
    powerPlayer: 'Joueur Puissant',
    focusMaster: 'Maître de la Concentration',
    levelBoss: 'Boss de Niveau',
    championLevel: 'Niveau Champion',
    starPlayer: 'Joueur Étoile',
    diamondRank: 'Rang Diamant',
    ultimateGamer: 'Joueur Ultime',
    defaultWhite: 'Blanc Par Défaut',
    oceanBlue: 'Bleu Océan',
    magicPurple: 'Violet Magique',
    prettyPink: 'Rose Joli',
    natureGreen: 'Vert Nature',
    sunnyOrange: 'Orange Ensoleillé',
    cherryRed: 'Rouge Cerise',
    rainbowMagic: 'Magie Arc-en-ciel',
    playerNames: 'Noms des Joueurs',
    dontPutRealName: 'Ne mettez pas votre vrai nom!',
    highestLevelCompleted: 'Niveau le plus élevé complété:',
    readyToStart: 'Prêt à commencer votre voyage! Complétez des niveaux pour débloquer du nouveau contenu.',
    checkSettings: 'Vérifiez les Paramètres pour les utiliser!',
    startOverLevel1: 'Recommencer au Niveau 1?',
    noWorries: 'Pas de souci! Vos déblocages sont en sécurité! 😊',
    round: 'Tour',
    cardsFindMatches: 'cartes - Trouvez des paires pour marquer des points!',
    youCompleted: 'Vous avez terminé',
    nextLevelStarting: 'Prochain niveau commence dans...',
    winner: 'GAGNANT!',
    keepPlayingFirstTo10: 'Continuez à jouer! Le premier à 10 gagne!',
    playAgain: 'Rejouer',
    // Achievements
    firstMatchName: 'Première Paire!',
    firstMatchDesc: 'Fait votre première paire',
    level5HeroName: 'Héros du Niveau 5',
    level5HeroDesc: 'Atteint le niveau 5',
    level10MasterName: 'Maître du Niveau 10',
    level10MasterDesc: 'Atteint le niveau 10',
    perfectName: 'Parfait!',
    perfectDesc: 'Obtenu 3 étoiles sur un niveau',
    firstTreasureName: 'Premier Trésor',
    firstTreasureDesc: 'Collecté votre premier objet',
    collectorName: 'Collectionneur',
    collectorDesc: 'Collecté 10 objets au total',
    hoarderName: 'Accumulateur',
    hoarderDesc: 'Collecté 50 objets au total',
    multiplayerChampionName: 'Champion Multijoueur',
    multiplayerChampionDesc: 'Gagné un jeu multijoueur',
    speedsterName: 'Rapide',
    speedsterDesc: 'Complété un niveau en moins de 10 coups',
    themeCollectorName: 'Collectionneur de Thèmes',
    themeCollectorDesc: 'Débloqué un nouveau thème',
    gemFinderName: 'Chercheur de Gemmes',
    gemFinderDesc: 'Trouvé 5 gemmes',
    fishermanName: 'Pêcheur',
    fishermanDesc: 'Attrapé 5 poissons'
  },
  de: {
    selectLanguage: 'Wähle deine Sprache',
    settings: 'Einstellungen',
    resetToLevel1: 'Zurück zu Level 1',
    resetAllProgress: 'Alles Zurücksetzen',
    ageGroup: 'Altersgruppe',
    themeColor: 'Thema & Farbe',
    sparklyCards: 'Glitzerkarten',
    on: 'AN',
    off: 'AUS',
    close: 'Schließen',
    backToMenu: 'Zurück zum Menü',
    moves: 'Züge',
    hint: 'Hinweis',
    youWin: 'GEWONNEN!',
    gameOver: 'SPIEL VORBEI!',
    youRanOutOfMoves: 'Du hast keine Züge mehr!',
    tryAgain: 'Nochmal Versuchen',
    nextLevel: 'Nächstes Level',
    resetEverything: 'Alles Zurücksetzen?',
    thisWillDelete: 'Dies wird löschen:',
    allLevels: 'Alle deine Level',
    allThemes: 'Alle freigeschalteten Themen',
    allAchievements: 'Alle Erfolge',
    allItems: 'Alle gesammelten Gegenstände',
    reallyReset: 'Bist du wirklich sicher?',
    yesReset: 'Ja, Alles Zurücksetzen',
    keepProgress: 'Fortschritt Behalten!',
    backpack: 'Rucksack',
    achievements: 'Erfolge',
    unlocked: 'Freigeschaltet!',
    itemCollected: 'Gegenstand Gesammelt!',
    badgeEarned: 'Abzeichen Verdient!',
    backToGame: 'Zurück zum Spiel',
    howOldAreYou: 'Wie alt bist du?',
    chooseYourTheme: 'Wähle Dein Thema!',
    pickCardColor: 'Wähle Deine Kartenfarbe',
    cardStyle: 'Kartenstil!',
    normal: 'Normal',
    sparkly: 'Glitzernd!',
    multiplayerGame: 'Mehrspielerspiel',
    firstTo10Wins: 'Erster mit 10 Punkten gewinnt!',
    eachRoundHas: 'Jede Runde hat 4 Karten (2 Paare)',
    howManyPlayers: 'Wie viele Spieler? (2-8 Spieler)',
    players: 'Spieler',
    startGame: 'Spiel Starten',
    player: 'Spieler',
    turn: 'Zug',
    sTurn: " ist dran",
    tie: "Es ist ein Unentschieden!",
    wins: 'Gewinnt!',
    reachedTenPointsFirst: 'hat zuerst 10 Punkte erreicht!',
    finalScores: 'Endergebnisse:',
    score: 'Punktzahl',
    level: 'Level',
    newUnlocks: 'NEUE FREISCHALTUNGEN!',
    tapMoreTimes: 'Tippe',
    moreTimes: 'mal mehr',
    opening: 'Wird geöffnet...',
    availableFromStart: 'Von Anfang an verfügbar',
    completeLevel: 'Schließe Level ab',
    toUnlock: 'zum Freischalten!',
    yourProgress: 'Dein Fortschritt',
    easyAndFun: 'Einfach & Spaß!',
    gettingHarder: 'Wird Schwerer!',
    challengeMode: 'Herausforderung!',
    years: 'Jahre',
    memoryGame: 'Gedächtnisspiel',
    triesLeft: 'Versuche Übrig',
    left: 'übrig!',
    easy: 'Einfach',
    challengesStarting: 'Herausforderungen Beginnen',
    extremeMode: 'Extremer Modus',
    powerPlayer: 'Power-Spieler',
    focusMaster: 'Fokusmeister',
    levelBoss: 'Level-Boss',
    championLevel: 'Champion-Level',
    starPlayer: 'Star-Spieler',
    diamondRank: 'Diamant-Rang',
    ultimateGamer: 'Ultimativer Spieler',
    defaultWhite: 'Standard Weiß',
    oceanBlue: 'Ozean Blau',
    magicPurple: 'Magisches Lila',
    prettyPink: 'Hübsches Rosa',
    natureGreen: 'Natur Grün',
    sunnyOrange: 'Sonniges Orange',
    cherryRed: 'Kirsch Rot',
    rainbowMagic: 'Regenbogen Magie',
    playerNames: 'Spielernamen',
    dontPutRealName: 'Gib nicht deinen echten Namen ein!',
    highestLevelCompleted: 'Höchstes abgeschlossenes Level:',
    readyToStart: 'Bereit, deine Reise zu beginnen! Schließe Level ab, um neue Inhalte freizuschalten.',
    checkSettings: 'Überprüfen Sie die Einstellungen, um sie zu verwenden!',
    startOverLevel1: 'Neustart bei Level 1?',
    noWorries: 'Keine Sorge! Deine Freischaltungen sind sicher! 😊',
    round: 'Runde',
    cardsFindMatches: 'Karten - Finde Paare, um Punkte zu sammeln!',
    youCompleted: 'Du hast abgeschlossen',
    nextLevelStarting: 'Nächstes Level beginnt in...',
    winner: 'GEWINNER!',
    keepPlayingFirstTo10: 'Weiter spielen! Erster zu 10 gewinnt!',
    playAgain: 'Nochmal Spielen',
    // Achievements
    firstMatchName: 'Erstes Paar!',
    firstMatchDesc: 'Erstes Paar gefunden',
    level5HeroName: 'Level 5 Held',
    level5HeroDesc: 'Level 5 erreicht',
    level10MasterName: 'Level 10 Meister',
    level10MasterDesc: 'Level 10 erreicht',
    perfectName: 'Perfekt!',
    perfectDesc: '3 Sterne in einem Level',
    firstTreasureName: 'Erster Schatz',
    firstTreasureDesc: 'Erstes Item gesammelt',
    collectorName: 'Sammler',
    collectorDesc: '10 Items gesammelt',
    hoarderName: 'Hamsterer',
    hoarderDesc: '50 Items gesammelt',
    multiplayerChampionName: 'Mehrspieler Champion',
    multiplayerChampionDesc: 'Mehrspieler-Spiel gewonnen',
    speedsterName: 'Schnelligkeit',
    speedsterDesc: 'Level in unter 10 Zügen',
    themeCollectorName: 'Themen-Sammler',
    themeCollectorDesc: 'Neues Thema freigeschaltet',
    gemFinderName: 'Edelstein-Finder',
    gemFinderDesc: '5 Edelsteine gefunden',
    fishermanName: 'Fischer',
    fishermanDesc: '5 Fische gefangen'
  },
  it: {
    selectLanguage: 'Seleziona la tua lingua',
    settings: 'Impostazioni',
    resetToLevel1: 'Torna al Livello 1',
    resetAllProgress: 'Resetta Tutto',
    ageGroup: 'Fascia d\'età',
    themeColor: 'Tema e Colore',
    sparklyCards: 'Carte Scintillanti',
    on: 'SÌ',
    off: 'NO',
    close: 'Chiudi',
    backToMenu: 'Torna al Menu',
    moves: 'Mosse',
    hint: 'Suggerimento',
    youWin: 'HAI VINTO!',
    gameOver: 'GIOCO FINITO!',
    youRanOutOfMoves: 'Hai finito le mosse!',
    tryAgain: 'Riprova',
    nextLevel: 'Livello Successivo',
    resetEverything: 'Resettare Tutto?',
    thisWillDelete: 'Questo cancellerà:',
    allLevels: 'Tutti i tuoi livelli',
    allThemes: 'Tutti i temi sbloccati',
    allAchievements: 'Tutti i risultati',
    allItems: 'Tutti gli oggetti raccolti',
    reallyReset: 'Sei davvero sicuro?',
    yesReset: 'Sì, Resetta Tutto',
    keepProgress: 'Mantieni il Mio Progresso!',
    backpack: 'Zaino',
    achievements: 'Risultati',
    unlocked: 'Sbloccato!',
    itemCollected: 'Oggetto Raccolto!',
    badgeEarned: 'Distintivo Guadagnato!',
    backToGame: 'Torna al Gioco',
    howOldAreYou: 'Quanti anni hai?',
    chooseYourTheme: 'Scegli il Tuo Tema!',
    pickCardColor: 'Scegli il Colore delle Carte',
    cardStyle: 'Stile della Carta!',
    normal: 'Normale',
    sparkly: 'Scintillante!',
    multiplayerGame: 'Gioco Multigiocatore',
    firstTo10Wins: 'Il Primo a 10 Punti Vince!',
    eachRoundHas: 'Ogni turno ha 4 carte (2 coppie)',
    howManyPlayers: 'Quanti giocatori? (2-8 giocatori)',
    players: 'giocatori',
    startGame: 'Inizia il Gioco',
    player: 'Giocatore',
    turn: 'Turno',
    sTurn: " gioca",
    tie: "È un pareggio!",
    wins: 'Vince!',
    reachedTenPointsFirst: 'ha raggiunto 10 punti per primo!',
    finalScores: 'Punteggi finali:',
    score: 'Punteggio',
    level: 'Livello',
    newUnlocks: 'NUOVI SBLOCCHI!',
    tapMoreTimes: 'Tocca',
    moreTimes: 'volta in più',
    opening: 'Apertura...',
    availableFromStart: 'Disponibile dall\'inizio',
    completeLevel: 'Completa il Livello',
    toUnlock: 'per sbloccare!',
    yourProgress: 'I Tuoi Progressi',
    easyAndFun: 'Facile e Divertente!',
    gettingHarder: 'Più Difficile!',
    challengeMode: 'Modalità Sfida!',
    years: 'anni',
    memoryGame: 'Gioco di Memoria',
    triesLeft: 'Tentativi Rimasti',
    left: 'rimasti!',
    easy: 'Facile',
    challengesStarting: 'Sfide Iniziano',
    extremeMode: 'Modalità Estrema',
    powerPlayer: 'Giocatore Potente',
    focusMaster: 'Maestro della Concentrazione',
    levelBoss: 'Boss di Livello',
    championLevel: 'Livello Campione',
    starPlayer: 'Giocatore Stella',
    diamondRank: 'Rango Diamante',
    ultimateGamer: 'Giocatore Definitivo',
    defaultWhite: 'Bianco Predefinito',
    oceanBlue: 'Blu Oceano',
    magicPurple: 'Viola Magico',
    prettyPink: 'Rosa Grazioso',
    natureGreen: 'Verde Natura',
    sunnyOrange: 'Arancione Soleggiato',
    cherryRed: 'Rosso Ciliegia',
    rainbowMagic: 'Magia Arcobaleno',
    playerNames: 'Nomi Giocatori',
    dontPutRealName: 'Non mettere il tuo vero nome!',
    highestLevelCompleted: 'Livello più alto completato:',
    readyToStart: 'Pronto a iniziare il tuo viaggio! Completa i livelli per sbloccare nuovi contenuti.',
    checkSettings: 'Controlla le Impostazioni per usarli!',
    startOverLevel1: 'Ricominciare dal Livello 1?',
    noWorries: 'Nessun problema! I tuoi sblocchi sono al sicuro! 😊',
    round: 'Round',
    cardsFindMatches: 'carte - Trova coppie per segnare punti!',
    youCompleted: 'Hai completato',
    nextLevelStarting: 'Prossimo livello inizia tra...',
    winner: 'VINCITORE!',
    keepPlayingFirstTo10: 'Continua a giocare! Il primo a 10 vince!',
    playAgain: 'Gioca Ancora',
    // Achievements
    firstMatchName: 'Prima Coppia!',
    firstMatchDesc: 'Fatto la tua prima coppia',
    level5HeroName: 'Eroe del Livello 5',
    level5HeroDesc: 'Raggiunto livello 5',
    level10MasterName: 'Maestro del Livello 10',
    level10MasterDesc: 'Raggiunto livello 10',
    perfectName: 'Perfetto!',
    perfectDesc: 'Ottenuto 3 stelle in un livello',
    firstTreasureName: 'Primo Tesoro',
    firstTreasureDesc: 'Raccolto il tuo primo oggetto',
    collectorName: 'Collezionista',
    collectorDesc: 'Raccolto 10 oggetti totali',
    hoarderName: 'Accumulatore',
    hoarderDesc: 'Raccolto 50 oggetti totali',
    multiplayerChampionName: 'Campione Multigiocatore',
    multiplayerChampionDesc: 'Vinto una partita multigiocatore',
    speedsterName: 'Velocista',
    speedsterDesc: 'Completato un livello in meno di 10 mosse',
    themeCollectorName: 'Collezionista di Temi',
    themeCollectorDesc: 'Sbloccato un nuovo tema',
    gemFinderName: 'Cercatore di Gemme',
    gemFinderDesc: 'Trovato 5 gemme',
    fishermanName: 'Pescatore',
    fishermanDesc: 'Pescato 5 pesci'
  },
  pt: {
    selectLanguage: 'Selecione seu idioma',
    settings: 'Configurações',
    resetToLevel1: 'Voltar ao Nível 1',
    resetAllProgress: 'Resetar Tudo',
    ageGroup: 'Faixa Etária',
    themeColor: 'Tema e Cor',
    sparklyCards: 'Cartas Brilhantes',
    on: 'SIM',
    off: 'NÃO',
    close: 'Fechar',
    backToMenu: 'Voltar ao Menu',
    moves: 'Movimentos',
    hint: 'Dica',
    youWin: 'VOCÊ VENCEU!',
    gameOver: 'FIM DE JOGO!',
    youRanOutOfMoves: 'Você ficou sem movimentos!',
    tryAgain: 'Tentar Novamente',
    nextLevel: 'Próximo Nível',
    resetEverything: 'Resetar Tudo?',
    thisWillDelete: 'Isso vai deletar:',
    allLevels: 'Todos os seus níveis',
    allThemes: 'Todos os temas desbloqueados',
    allAchievements: 'Todas as conquistas',
    allItems: 'Todos os itens coletados',
    reallyReset: 'Você tem certeza?',
    yesReset: 'Sim, Resetar Tudo',
    keepProgress: 'Manter Meu Progresso!',
    backpack: 'Mochila',
    achievements: 'Conquistas',
    unlocked: 'Desbloqueado!',
    itemCollected: 'Item Coletado!',
    badgeEarned: 'Emblema Ganho!',
    backToGame: 'Voltar ao Jogo',
    howOldAreYou: 'Quantos anos você tem?',
    chooseYourTheme: 'Escolha Seu Tema!',
    pickCardColor: 'Escolha a Cor das Cartas',
    cardStyle: 'Estilo da Carta!',
    normal: 'Normal',
    sparkly: 'Brilhante!',
    multiplayerGame: 'Jogo Multijogador',
    firstTo10Wins: 'Primeiro a 10 Pontos Vence!',
    eachRoundHas: 'Cada rodada tem 4 cartas (2 pares)',
    howManyPlayers: 'Quantos jogadores? (2-8 jogadores)',
    players: 'jogadores',
    startGame: 'Iniciar Jogo',
    player: 'Jogador',
    turn: 'Vez',
    sTurn: " joga",
    tie: "É um empate!",
    wins: 'Vence!',
    reachedTenPointsFirst: 'alcançou 10 pontos primeiro!',
    finalScores: 'Pontuações finais:',
    score: 'Pontuação',
    level: 'Nível',
    newUnlocks: 'NOVOS DESBLOQUEIOS!',
    tapMoreTimes: 'Toque',
    moreTimes: 'vez mais',
    opening: 'Abrindo...',
    availableFromStart: 'Disponível desde o início',
    completeLevel: 'Complete o Nível',
    toUnlock: 'para desbloquear!',
    yourProgress: 'Seu Progresso',
    easyAndFun: 'Fácil e Divertido!',
    gettingHarder: 'Ficando Difícil!',
    challengeMode: 'Modo Desafio!',
    years: 'anos',
    memoryGame: 'Jogo de Memória',
    triesLeft: 'Tentativas Restantes',
    left: 'restantes!',
    easy: 'Fácil',
    challengesStarting: 'Desafios Começando',
    extremeMode: 'Modo Extremo',
    powerPlayer: 'Jogador Poderoso',
    focusMaster: 'Mestre do Foco',
    levelBoss: 'Chefe de Nível',
    championLevel: 'Nível Campeão',
    starPlayer: 'Jogador Estrela',
    diamondRank: 'Classificação Diamante',
    ultimateGamer: 'Jogador Definitivo',
    defaultWhite: 'Branco Padrão',
    oceanBlue: 'Azul Oceano',
    magicPurple: 'Roxo Mágico',
    prettyPink: 'Rosa Bonito',
    natureGreen: 'Verde Natureza',
    sunnyOrange: 'Laranja Ensolarado',
    cherryRed: 'Vermelho Cereja',
    rainbowMagic: 'Magia Arco-Íris',
    playerNames: 'Nomes dos Jogadores',
    dontPutRealName: 'Não coloque seu nome real!',
    highestLevelCompleted: 'Nível mais alto completado:',
    readyToStart: 'Pronto para começar sua jornada! Complete níveis para desbloquear novo conteúdo.',
    checkSettings: 'Verifique as Configurações para usá-los!',
    startOverLevel1: 'Recomeçar no Nível 1?',
    noWorries: 'Sem problemas! Seus desbloqueios estão seguros! 😊',
    round: 'Rodada',
    cardsFindMatches: 'cartas - Encontre pares para marcar pontos!',
    youCompleted: 'Você completou',
    nextLevelStarting: 'Próximo nível começando em...',
    winner: 'VENCEDOR!',
    keepPlayingFirstTo10: 'Continue jogando! Primeiro a chegar a 10 ganha!',
    playAgain: 'Jogar Novamente',
    // Achievements
    firstMatchName: 'Primeira Combinação!',
    firstMatchDesc: 'Fez sua primeira combinação',
    level5HeroName: 'Herói do Nível 5',
    level5HeroDesc: 'Alcançou o nível 5',
    level10MasterName: 'Mestre do Nível 10',
    level10MasterDesc: 'Alcançou o nível 10',
    perfectName: 'Perfeito!',
    perfectDesc: 'Conseguiu 3 estrelas em um nível',
    firstTreasureName: 'Primeiro Tesouro',
    firstTreasureDesc: 'Coletou seu primeiro item',
    collectorName: 'Colecionador',
    collectorDesc: 'Coletou 10 itens no total',
    hoarderName: 'Acumulador',
    hoarderDesc: 'Coletou 50 itens no total',
    multiplayerChampionName: 'Campeão Multijogador',
    multiplayerChampionDesc: 'Venceu um jogo multijogador',
    speedsterName: 'Veloz',
    speedsterDesc: 'Completou um nível em menos de 10 jogadas',
    themeCollectorName: 'Colecionador de Temas',
    themeCollectorDesc: 'Desbloqueou um novo tema',
    gemFinderName: 'Descobridor de Gemas',
    gemFinderDesc: 'Encontrou 5 gemas',
    fishermanName: 'Pescador',
    fishermanDesc: 'Pescou 5 peixes'
  },
  hr: {
    selectLanguage: 'Odaberite jezik',
    settings: 'Postavke',
    resetToLevel1: 'Resetiraj na razinu 1',
    resetAllProgress: 'Resetiraj sve',
    ageGroup: 'Dobna skupina',
    themeColor: 'Tema i boja',
    sparklyCards: 'Sjajne kartice',
    on: 'DA',
    off: 'NE',
    close: 'Zatvori',
    backToMenu: 'Natrag na izbornik',
    moves: 'Potezi',
    hint: 'Savjet',
    youWin: 'POBIJEDIO SI!',
    gameOver: 'IGRA GOTOVA!',
    youRanOutOfMoves: 'Potrošio si sve poteze!',
    tryAgain: 'Pokušaj opet',
    nextLevel: 'Sljedeća razina',
    resetEverything: 'Resetirati sve?',
    thisWillDelete: 'Ovo će izbrisati:',
    allLevels: 'Sve tvoje razine',
    allThemes: 'Sve otključane teme',
    allAchievements: 'Sva postignuća',
    allItems: 'Sve prikupljene predmete',
    reallyReset: 'Jesi li siguran?',
    yesReset: 'Da, resetiraj sve',
    keepProgress: 'Zadrži napredak!',
    backpack: 'Ruksak',
    achievements: 'Postignuća',
    unlocked: 'Otključano!',
    itemCollected: 'Predmet prikupljen!',
    badgeEarned: 'Značka zaslužena!',
    backToGame: 'Natrag na igru',
    howOldAreYou: 'Koliko imaš godina?',
    chooseYourTheme: 'Odaberi svoju temu!',
    pickCardColor: 'Odaberi boju kartica',
    cardStyle: 'Stil kartica!',
    normal: 'Normalno',
    sparkly: 'Sjajno!',
    multiplayerGame: 'Igra za više igrača',
    firstTo10Wins: 'Prvi do 10 bodova pobjeđuje!',
    eachRoundHas: 'Svaka runda ima 4 kartice (2 para)',
    howManyPlayers: 'Koliko igrača? (2-8 igrača)',
    players: 'igrača',
    startGame: 'Počni igru',
    player: 'Igrač',
    turn: 'Red',
    sTurn: " je na potezu",
    tie: "Izjednačeno!",
    wins: 'Pobjeđuje!',
    reachedTenPointsFirst: 'je prvi dostigao 10 bodova!',
    finalScores: 'Konačni rezultati:',
    score: 'Rezultat',
    level: 'Razina',
    newUnlocks: 'NOVA OTKLJUČAVANJA!',
    tapMoreTimes: 'Tapni',
    moreTimes: 'još puta',
    opening: 'Otvaranje...',
    availableFromStart: 'Dostupno od početka',
    completeLevel: 'Završi razinu',
    toUnlock: 'za otključavanje!',
    yourProgress: 'Tvoj napredak',
    easyAndFun: 'Lako i zabavno!',
    gettingHarder: 'Postaje teže!',
    challengeMode: 'Način izazova!',
    years: 'godina',
    memoryGame: 'Igra Pamćenja',
    triesLeft: 'Preostali Pokušaji',
    left: 'preostalo!',
    easy: 'Lako',
    challengesStarting: 'Izazovi Počinju',
    extremeMode: 'Ekstremni Način',
    powerPlayer: 'Moćni Igrač',
    focusMaster: 'Majstor Fokusa',
    levelBoss: 'Šef Razine',
    championLevel: 'Razina Prvaka',
    starPlayer: 'Zvjezdani Igrač',
    diamondRank: 'Dijamantski Rang',
    ultimateGamer: 'Ultimativni Igrač',
    defaultWhite: 'Zadana Bijela',
    oceanBlue: 'Ocean Plava',
    magicPurple: 'Čarobna Ljubičasta',
    prettyPink: 'Lijepa Ružičasta',
    natureGreen: 'Prirodna Zelena',
    sunnyOrange: 'Sunčana Narančasta',
    cherryRed: 'Trešnja Crvena',
    rainbowMagic: 'Dužična Čarolija',
    playerNames: 'Imena Igrača',
    dontPutRealName: 'Nemoj pisati svoje pravo ime!',
    highestLevelCompleted: 'Najviša završena razina:',
    readyToStart: 'Spreman za početak putovanja! Završi razine da otključaš novi sadržaj.',
    checkSettings: 'Provjeri Postavke da ih koristiš!',
    startOverLevel1: 'Početi ispočetka na Razini 1?',
    noWorries: 'Nema brige! Tvoja otključavanja su sigurna! 😊',
    round: 'Runda',
    cardsFindMatches: 'kartice - Pronađi parove da osvojiš bodove!',
    youCompleted: 'Završio si',
    nextLevelStarting: 'Sljedeća razina počinje za...',
    winner: 'POBJEDNIK!',
    keepPlayingFirstTo10: 'Nastavi igrati! Prvi do 10 pobjeđuje!',
    playAgain: 'Igraj Ponovno',
    // Achievements
    firstMatchName: 'Prvi Par!',
    firstMatchDesc: 'Napravio si prvi par',
    level5HeroName: 'Heroj 5. Razine',
    level5HeroDesc: 'Dostigao razinu 5',
    level10MasterName: 'Majstor 10. Razine',
    level10MasterDesc: 'Dostigao razinu 10',
    perfectName: 'Savršeno!',
    perfectDesc: 'Dobio 3 zvijezde na razini',
    firstTreasureName: 'Prvo Blago',
    firstTreasureDesc: 'Prikupio si prvi predmet',
    collectorName: 'Sakupljač',
    collectorDesc: 'Prikupio 10 predmeta ukupno',
    hoarderName: 'Gomilač',
    hoarderDesc: 'Prikupio 50 predmeta ukupno',
    multiplayerChampionName: 'Višeigrački Prvak',
    multiplayerChampionDesc: 'Pobijedio u višeigračkoj igri',
    speedsterName: 'Brzinac',
    speedsterDesc: 'Završio razinu u manje od 10 poteza',
    themeCollectorName: 'Sakupljač Tema',
    themeCollectorDesc: 'Otključao novu temu',
    gemFinderName: 'Tražitelj Dragulja',
    gemFinderDesc: 'Pronašao 5 dragulja',
    fishermanName: 'Ribar',
    fishermanDesc: 'Ulovio 5 riba'
  },
  ja: {
    selectLanguage: '言語を選択',
    settings: '設定',
    resetToLevel1: 'レベル1に戻る',
    resetAllProgress: 'すべてリセット',
    ageGroup: '年齢層',
    themeColor: 'テーマと色',
    sparklyCards: 'キラキラカード',
    on: 'オン',
    off: 'オフ',
    close: '閉じる',
    backToMenu: 'メニューに戻る',
    moves: '移動',
    hint: 'ヒント',
    youWin: '勝利！',
    gameOver: 'ゲームオーバー！',
    youRanOutOfMoves: '移動がなくなりました！',
    tryAgain: 'もう一度',
    nextLevel: '次のレベル',
    resetEverything: 'すべてリセット？',
    thisWillDelete: 'これは削除されます：',
    allLevels: 'すべてのレベル',
    allThemes: 'ロック解除されたテーマ',
    allAchievements: 'すべての実績',
    allItems: '収集したアイテム',
    reallyReset: '本当によろしいですか？',
    yesReset: 'はい、すべてリセット',
    keepProgress: '進行状況を保持！',
    backpack: 'バックパック',
    achievements: '実績',
    unlocked: 'ロック解除！',
    itemCollected: 'アイテム収集！',
    badgeEarned: 'バッジ獲得！',
    backToGame: 'ゲームに戻る',
    howOldAreYou: '何歳ですか？',
    chooseYourTheme: 'テーマを選ぼう！',
    pickCardColor: 'カードの色を選ぼう',
    cardStyle: 'カードスタイル！',
    normal: 'ノーマル',
    sparkly: 'キラキラ！',
    multiplayerGame: 'マルチプレイヤーゲーム',
    firstTo10Wins: '先に10ポイント取った人が勝ち！',
    eachRoundHas: '各ラウンドは4枚のカード（2ペア）',
    howManyPlayers: '何人でプレイする？（2〜8人）',
    players: '人',
    startGame: 'ゲーム開始',
    player: 'プレイヤー',
    turn: 'ターン',
    sTurn: "のターン",
    tie: "引き分けです！",
    wins: '勝ち！',
    reachedTenPointsFirst: 'が最初に10ポイントに到達！',
    finalScores: '最終スコア：',
    score: 'スコア',
    level: 'レベル',
    newUnlocks: '新しいアイテム解除！',
    tapMoreTimes: 'タップ',
    moreTimes: '回もっと',
    opening: '開いています...',
    availableFromStart: '最初から利用可能',
    completeLevel: 'レベルをクリア',
    toUnlock: 'で解除！',
    yourProgress: 'あなたの進捗',
    easyAndFun: '簡単で楽しい！',
    gettingHarder: '難しくなる！',
    challengeMode: 'チャレンジモード！',
    years: '歳',
    memoryGame: 'メモリーゲーム',
    triesLeft: '残りの試行回数',
    left: '残り！',
    easy: 'かんたん',
    challengesStarting: 'チャレンジスタート',
    extremeMode: 'エクストリームモード',
    powerPlayer: 'パワープレイヤー',
    focusMaster: '集中マスター',
    levelBoss: 'レベルボス',
    championLevel: 'チャンピオンレベル',
    starPlayer: 'スタープレイヤー',
    diamondRank: 'ダイヤモンドランク',
    ultimateGamer: 'アルティメットゲーマー',
    defaultWhite: 'デフォルトホワイト',
    oceanBlue: 'オーシャンブルー',
    magicPurple: 'マジックパープル',
    prettyPink: 'プリティピンク',
    natureGreen: 'ネイチャーグリーン',
    sunnyOrange: 'サニーオレンジ',
    cherryRed: 'チェリーレッド',
    rainbowMagic: 'レインボーマジック',
    playerNames: 'プレイヤー名',
    dontPutRealName: '本名を入力しないでください！',
    highestLevelCompleted: '最高完了レベル：',
    readyToStart: '冒険を始める準備ができました！レベルをクリアして新しいコンテンツをアンロックしましょう。',
    checkSettings: '設定を確認して使用してください！',
    startOverLevel1: 'レベル1からやり直しますか？',
    noWorries: '心配しないで！アンロックは安全です！😊',
    round: 'ラウンド',
    cardsFindMatches: '枚のカード - ペアを見つけてポイントを獲得！',
    youCompleted: 'クリアしました',
    nextLevelStarting: '次のレベルが始まります...',
    winner: '勝者！',
    keepPlayingFirstTo10: 'プレイを続けよう！最初に10に到達した人が勝ち！',
    playAgain: 'もう一度プレイ',
    // Achievements
    firstMatchName: '初ペア！',
    firstMatchDesc: '最初のペアを作った',
    level5HeroName: 'レベル5ヒーロー',
    level5HeroDesc: 'レベル5に到達',
    level10MasterName: 'レベル10マスター',
    level10MasterDesc: 'レベル10に到達',
    perfectName: 'パーフェクト！',
    perfectDesc: 'レベルで3つ星を獲得',
    firstTreasureName: '最初の宝物',
    firstTreasureDesc: '最初のアイテムを収集',
    collectorName: 'コレクター',
    collectorDesc: '合計10個のアイテムを収集',
    hoarderName: 'ホーダー',
    hoarderDesc: '合計50個のアイテムを収集',
    multiplayerChampionName: 'マルチプレイヤーチャンピオン',
    multiplayerChampionDesc: 'マルチプレイヤーゲームに勝利',
    speedsterName: 'スピードスター',
    speedsterDesc: '10手未満でレベルクリア',
    themeCollectorName: 'テーマコレクター',
    themeCollectorDesc: '新しいテーマをアンロック',
    gemFinderName: 'ジェムファインダー',
    gemFinderDesc: '5つの宝石を発見',
    fishermanName: '漁師',
    fishermanDesc: '5匹の魚を捕獲'
  },
  ko: {
    selectLanguage: '언어 선택',
    settings: '설정',
    resetToLevel1: '레벨 1로 돌아가기',
    resetAllProgress: '모두 초기화',
    ageGroup: '연령대',
    themeColor: '테마 및 색상',
    sparklyCards: '반짝이는 카드',
    on: '켜기',
    off: '끄기',
    close: '닫기',
    backToMenu: '메뉴로 돌아가기',
    moves: '이동',
    hint: '힌트',
    youWin: '승리!',
    gameOver: '게임 오버!',
    youRanOutOfMoves: '이동이 없습니다!',
    tryAgain: '다시 시도',
    nextLevel: '다음 레벨',
    resetEverything: '모두 초기화?',
    thisWillDelete: '삭제됩니다:',
    allLevels: '모든 레벨',
    allThemes: '잠금 해제된 테마',
    allAchievements: '모든 업적',
    allItems: '수집한 아이템',
    reallyReset: '정말 확실합니까?',
    yesReset: '예, 모두 초기화',
    keepProgress: '진행 상황 유지!',
    backpack: '배낭',
    achievements: '업적',
    unlocked: '잠금 해제!',
    itemCollected: '아이템 수집!',
    badgeEarned: '배지 획득!',
    backToGame: '게임으로 돌아가기',
    howOldAreYou: '나이가 몇 살이에요?',
    chooseYourTheme: '테마를 선택하세요!',
    pickCardColor: '카드 색상을 선택하세요',
    cardStyle: '카드 스타일!',
    normal: '일반',
    sparkly: '반짝반짝!',
    multiplayerGame: '멀티플레이어 게임',
    firstTo10Wins: '먼저 10점을 얻는 사람이 승리!',
    eachRoundHas: '각 라운드는 4장의 카드 (2쌍)',
    howManyPlayers: '플레이어 수는? (2-8명)',
    players: '명',
    startGame: '게임 시작',
    player: '플레이어',
    turn: '턴',
    sTurn: "의 차례",
    tie: "무승부입니다!",
    wins: '승리!',
    reachedTenPointsFirst: '가 먼저 10점에 도달했습니다!',
    finalScores: '최종 점수:',
    score: '점수',
    level: '레벨',
    newUnlocks: '새로운 잠금 해제!',
    tapMoreTimes: '탭',
    moreTimes: '번 더',
    opening: '열고 있어요...',
    availableFromStart: '처음부터 사용 가능',
    completeLevel: '레벨 완료',
    toUnlock: '잠금 해제하려면!',
    yourProgress: '진행 상황',
    easyAndFun: '쉽고 재미있어요!',
    gettingHarder: '더 어려워져요!',
    challengeMode: '도전 모드!',
    years: '세',
    memoryGame: '기억력 게임',
    triesLeft: '남은 시도',
    left: '남음!',
    easy: '쉬움',
    challengesStarting: '도전 시작',
    extremeMode: '익스트림 모드',
    powerPlayer: '파워 플레이어',
    focusMaster: '집중력 마스터',
    levelBoss: '레벨 보스',
    championLevel: '챔피언 레벨',
    starPlayer: '스타 플레이어',
    diamondRank: '다이아몬드 랭크',
    ultimateGamer: '얼티밋 게이머',
    defaultWhite: '기본 화이트',
    oceanBlue: '오션 블루',
    magicPurple: '매직 퍼플',
    prettyPink: '프리티 핑크',
    natureGreen: '네이처 그린',
    sunnyOrange: '써니 오렌지',
    cherryRed: '체리 레드',
    rainbowMagic: '레인보우 매직',
    playerNames: '플레이어 이름',
    dontPutRealName: '실명을 입력하지 마세요!',
    highestLevelCompleted: '최고 완료 레벨:',
    readyToStart: '여정을 시작할 준비가 되었습니다! 레벨을 완료하여 새로운 콘텐츠를 잠금 해제하세요.',
    checkSettings: '설정을 확인하여 사용하세요!',
    startOverLevel1: '레벨 1부터 다시 시작하시겠습니까?',
    noWorries: '걱정 마세요! 잠금 해제는 안전합니다! 😊',
    round: '라운드',
    cardsFindMatches: '장의 카드 - 쌍을 찾아 점수를 획득하세요!',
    youCompleted: '완료했습니다',
    nextLevelStarting: '다음 레벨이 시작됩니다...',
    winner: '승자!',
    keepPlayingFirstTo10: '계속 플레이하세요! 먼저 10에 도달하면 승리합니다!',
    playAgain: '다시 플레이',
    // Achievements
    firstMatchName: '첫 매치!',
    firstMatchDesc: '첫 번째 매치를 만들었습니다',
    level5HeroName: '레벨 5 영웅',
    level5HeroDesc: '레벨 5 도달',
    level10MasterName: '레벨 10 마스터',
    level10MasterDesc: '레벨 10 도달',
    perfectName: '완벽!',
    perfectDesc: '레벨에서 별 3개 획득',
    firstTreasureName: '첫 보물',
    firstTreasureDesc: '첫 번째 아이템 수집',
    collectorName: '수집가',
    collectorDesc: '총 10개 아이템 수집',
    hoarderName: '저장가',
    hoarderDesc: '총 50개 아이템 수집',
    multiplayerChampionName: '멀티플레이어 챔피언',
    multiplayerChampionDesc: '멀티플레이어 게임 승리',
    speedsterName: '스피드스터',
    speedsterDesc: '10회 미만으로 레벨 완료',
    themeCollectorName: '테마 수집가',
    themeCollectorDesc: '새로운 테마 잠금 해제',
    gemFinderName: '보석 탐색가',
    gemFinderDesc: '5개의 보석 발견',
    fishermanName: '어부',
    fishermanDesc: '5마리의 물고기 잡음'
  },
  zh: {
    selectLanguage: '选择语言',
    settings: '设置',
    resetToLevel1: '返回第1关',
    resetAllProgress: '重置所有进度',
    ageGroup: '年龄段',
    themeColor: '主题和颜色',
    sparklyCards: '闪亮卡片',
    on: '开',
    off: '关',
    close: '关闭',
    backToMenu: '返回菜单',
    moves: '移动',
    hint: '提示',
    youWin: '你赢了！',
    gameOver: '游戏结束！',
    youRanOutOfMoves: '你用完了所有移动！',
    tryAgain: '再试一次',
    nextLevel: '下一关',
    resetEverything: '重置所有？',
    thisWillDelete: '这将删除：',
    allLevels: '所有关卡',
    allThemes: '已解锁的主题',
    allAchievements: '所有成就',
    allItems: '收集的物品',
    reallyReset: '你确定吗？',
    yesReset: '是的，重置所有',
    keepProgress: '保留我的进度！',
    backpack: '背包',
    achievements: '成就',
    unlocked: '已解锁！',
    itemCollected: '物品已收集！',
    badgeEarned: '徽章已获得！',
    backToGame: '返回游戏',
    howOldAreYou: '你几岁了？',
    chooseYourTheme: '选择你的主题！',
    pickCardColor: '选择你的卡片颜色',
    cardStyle: '卡片样式！',
    normal: '普通',
    sparkly: '闪亮！',
    multiplayerGame: '多人游戏',
    firstTo10Wins: '先到10分者获胜！',
    eachRoundHas: '每轮有4张卡片（2对）',
    howManyPlayers: '几个玩家？（2-8名玩家）',
    players: '名玩家',
    startGame: '开始游戏',
    player: '玩家',
    turn: '回合',
    sTurn: "的回合",
    tie: "平局！",
    wins: '获胜！',
    reachedTenPointsFirst: '首先达到10分！',
    finalScores: '最终得分：',
    score: '得分',
    level: '关卡',
    newUnlocks: '新解锁！',
    tapMoreTimes: '点击',
    moreTimes: '次',
    opening: '正在打开...',
    availableFromStart: '从开始就可用',
    completeLevel: '完成关卡',
    toUnlock: '来解锁！',
    yourProgress: '你的进度',
    easyAndFun: '简单有趣！',
    gettingHarder: '越来越难！',
    challengeMode: '挑战模式！',
    years: '岁',
    memoryGame: '记忆游戏',
    triesLeft: '剩余尝试',
    left: '剩余！',
    easy: '简单',
    challengesStarting: '挑战开始',
    extremeMode: '极限模式',
    powerPlayer: '强力玩家',
    focusMaster: '专注大师',
    levelBoss: '关卡老板',
    championLevel: '冠军级别',
    starPlayer: '明星玩家',
    diamondRank: '钻石段位',
    ultimateGamer: '终极玩家',
    defaultWhite: '默认白色',
    oceanBlue: '海洋蓝',
    magicPurple: '魔法紫',
    prettyPink: '漂亮粉',
    natureGreen: '自然绿',
    sunnyOrange: '阳光橙',
    cherryRed: '樱桃红',
    rainbowMagic: '彩虹魔法',
    playerNames: '玩家名称',
    dontPutRealName: '不要输入真实姓名！',
    highestLevelCompleted: '最高完成关卡：',
    readyToStart: '准备开始你的旅程！完成关卡以解锁新内容。',
    checkSettings: '查看设置以使用它们！',
    startOverLevel1: '从第1关重新开始？',
    noWorries: '不用担心！你的解锁是安全的！😊',
    round: '回合',
    cardsFindMatches: '张卡片 - 找到配对以得分！',
    youCompleted: '你完成了',
    nextLevelStarting: '下一关即将开始...',
    winner: '胜利者！',
    keepPlayingFirstTo10: '继续玩！第一个到达10的获胜！',
    playAgain: '再玩一次',
    // Achievements
    firstMatchName: '首次配对！',
    firstMatchDesc: '完成了你的第一次配对',
    level5HeroName: '第5关英雄',
    level5HeroDesc: '达到第5关',
    level10MasterName: '第10关大师',
    level10MasterDesc: '达到第10关',
    perfectName: '完美！',
    perfectDesc: '在一关获得3颗星',
    firstTreasureName: '首个宝藏',
    firstTreasureDesc: '收集了你的第一个物品',
    collectorName: '收集家',
    collectorDesc: '总共收集了10个物品',
    hoarderName: '囤积者',
    hoarderDesc: '总共收集了50个物品',
    multiplayerChampionName: '多人游戏冠军',
    multiplayerChampionDesc: '赢得了多人游戏',
    speedsterName: '速度之星',
    speedsterDesc: '在10步内完成一关',
    themeCollectorName: '主题收集家',
    themeCollectorDesc: '解锁了新主题',
    gemFinderName: '宝石寻找者',
    gemFinderDesc: '发现了5颗宝石',
    fishermanName: '渔夫',
    fishermanDesc: '捕获了5条鱼'
  }
}

const CARD_COLORS = {
  default: {
    name: "⚪ Default White",
    unflipped: "from-gray-100 to-white",
    flipped: "from-gray-50 to-gray-100",
    unlockLevel: 0,
    unlockDescription: "Available from start"
  },
  blue: { 
    name: "💙 Ocean Blue", 
    unflipped: "from-blue-400 to-blue-600", 
    flipped: "from-blue-100 to-blue-200",
    unlockLevel: 2,
    unlockDescription: "Complete Level 2 to unlock!"
  },
  purple: { 
    name: "💜 Magic Purple", 
    unflipped: "from-purple-400 to-purple-600", 
    flipped: "from-purple-100 to-purple-200",
    unlockLevel: 3,
    unlockDescription: "Complete Level 3 to unlock!"
  },
  pink: { 
    name: "💗 Pretty Pink", 
    unflipped: "from-pink-400 to-pink-600", 
    flipped: "from-pink-100 to-pink-200",
    unlockLevel: 4,
    unlockDescription: "Complete Level 4 to unlock!"
  },
  green: { 
    name: "💚 Nature Green", 
    unflipped: "from-green-400 to-green-600", 
    flipped: "from-green-100 to-green-200",
    unlockLevel: 4,
    unlockDescription: "Complete Level 4 to unlock!"
  },
  orange: { 
    name: "🧡 Sunny Orange", 
    unflipped: "from-orange-400 to-orange-600", 
    flipped: "from-orange-100 to-orange-200",
    unlockLevel: 5,
    unlockDescription: "Complete Level 5 to unlock!"
  },
  red: { 
    name: "❤️ Cherry Red", 
    unflipped: "from-red-400 to-red-600", 
    flipped: "from-red-100 to-red-200",
    unlockLevel: 6,
    unlockDescription: "Complete Level 6 to unlock!"
  },
  rainbow: { 
    name: "🌈 Rainbow Magic", 
    unflipped: "rainbow-animated", 
    flipped: "rainbow-animated-light",
    unlockLevel: 10,
    unlockDescription: "Complete Level 10 to unlock!"
  }
}

export default function MemoryGame() {
  const [gameMode, setGameMode] = useState('single') // Start immediately in single player mode
  const [playerAge, setPlayerAge] = useState('6-8') // Default to 6-8 years old
  const [numPlayers, setNumPlayers] = useState(2) // Number of players for multiplayer
  const [playerNames, setPlayerNames] = useState({}) // Player names for multiplayer
  const [currentTheme, setCurrentTheme] = useState('starter')
  const [cardColor, setCardColor] = useState('default')
  const [isSparkly, setIsSparkly] = useState(false) // Start with normal cards
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [movesUsed, setMovesUsed] = useState(0)
  const [totalMovesAvailable, setTotalMovesAvailable] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [windowSize, setWindowSize] = useState({ width: 400, height: 600 })
  const [countdown, setCountdown] = useState(null)
  const [starsEarned, setStarsEarned] = useState([])
  const [helpUsed, setHelpUsed] = useState(0) // Track how many help hints used
  const [helpRevealed, setHelpRevealed] = useState([]) // Track which pairs are revealed by help
  
  // Multiplayer state
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [playerScores, setPlayerScores] = useState({}) // Dynamic scores for any number of players
  const [gameWinner, setGameWinner] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [highestLevelCompleted, setHighestLevelCompleted] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false) // Track if localStorage has been loaded
  const [newUnlocks, setNewUnlocks] = useState([]) // Track new unlocks to show notifications
  const [showGiftBox, setShowGiftBox] = useState(false) // Show gift box animation
  const [giftBounces, setGiftBounces] = useState(0) // Track bounces
  const [giftOpened, setGiftOpened] = useState(false) // Track if gift is opened
  const [hintCooldown, setHintCooldown] = useState(false) // Track hint cooldown
  const [hintCooldownTime, setHintCooldownTime] = useState(0) // Show countdown seconds
  const [showResetConfirm, setShowResetConfirm] = useState(false) // Show reset to level 1 confirmation
  const [showResetAllConfirm, setShowResetAllConfirm] = useState(false) // Show reset all progress confirmation
  const [language, setLanguage] = useState('en') // Current language
  const [showLanguageSelect, setShowLanguageSelect] = useState(false) // Show language selection screen

  // Inventory system
  const [inventory, setInventory] = useState({
    apples: 0,
    berries: 0,
    fish: 0,
    gems: 0,
    treasures: 0,
    mystery: 0
  })
  const [showItemCollected, setShowItemCollected] = useState(false)
  const [collectedItem, setCollectedItem] = useState(null)
  const [showInventory, setShowInventory] = useState(false) // Show inventory modal

  // Achievements/Badges system
  const [achievements, setAchievements] = useState([])
  const [showBadgeEarned, setShowBadgeEarned] = useState(false)
  const [earnedBadge, setEarnedBadge] = useState(null)
  const [showBadges, setShowBadges] = useState(false) // Show badges modal
  const [lastViewedBadgeCount, setLastViewedBadgeCount] = useState(0) // Track when user last viewed badges

  const timeoutRef = useRef(null)
  const countdownRef = useRef(null)
  const hintCooldownRef = useRef(null)
  

  // Create audio context once
  const audioContextRef = useRef(null)

  // Define all possible achievements
  // Function to get translated badges
  const getAllBadges = () => ({
    firstMatch: { id: 'firstMatch', name: t('firstMatchName'), emoji: '🎯', description: t('firstMatchDesc') },
    level5: { id: 'level5', name: t('level5HeroName'), emoji: '⭐', description: t('level5HeroDesc') },
    level10: { id: 'level10', name: t('level10MasterName'), emoji: '🏆', description: t('level10MasterDesc') },
    perfectLevel: { id: 'perfectLevel', name: t('perfectName'), emoji: '✨', description: t('perfectDesc') },
    firstItem: { id: 'firstItem', name: t('firstTreasureName'), emoji: '💎', description: t('firstTreasureDesc') },
    collector: { id: 'collector', name: t('collectorName'), emoji: '🎒', description: t('collectorDesc') },
    hoarder: { id: 'hoarder', name: t('hoarderName'), emoji: '👑', description: t('hoarderDesc') },
    multiplayerWin: { id: 'multiplayerWin', name: t('multiplayerChampionName'), emoji: '🎮', description: t('multiplayerChampionDesc') },
    speedster: { id: 'speedster', name: t('speedsterName'), emoji: '⚡', description: t('speedsterDesc') },
    unlockTheme: { id: 'unlockTheme', name: t('themeCollectorName'), emoji: '🎨', description: t('themeCollectorDesc') },
    gemFinder: { id: 'gemFinder', name: t('gemFinderName'), emoji: '💍', description: t('gemFinderDesc') },
    fisherman: { id: 'fisherman', name: t('fishermanName'), emoji: '🎣', description: t('fishermanDesc') }
  })

  // Award badge function
  const awardBadge = (badgeId) => {
    if (!achievements.includes(badgeId)) {
      setAchievements(prev => [...prev, badgeId])
      setEarnedBadge(getAllBadges()[badgeId])
      setShowBadgeEarned(true)
      playSound('badge', 0.5)

      setTimeout(() => {
        setShowBadgeEarned(false)
      }, 3000)
    }
  }

  // Helper functions to check unlocks
  const isThemeUnlocked = (themeKey) => {
    return THEMES[themeKey].unlockLevel <= highestLevelCompleted
  }

  const isColorUnlocked = (colorKey) => {
    return CARD_COLORS[colorKey].unlockLevel <= highestLevelCompleted
  }

  const isSparklyUnlocked = () => {
    return highestLevelCompleted >= 4 // Unlock sparkly at level 4
  }

  // During hydration, show everything as locked to match server state
  const getDisplayUnlockStatus = (unlockLevel) => {
    if (!isLoaded) return false // During hydration, show as locked
    return unlockLevel <= highestLevelCompleted
  }

  // Load progress from localStorage on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load highest level
      const saved = localStorage.getItem('memoryGame_highestLevel')
      if (saved) {
        setHighestLevelCompleted(parseInt(saved, 10))
      }

      // Load saved theme, color, and sparkly preferences
      const savedTheme = localStorage.getItem('memoryGame_theme')
      if (savedTheme && THEMES[savedTheme]) {
        setCurrentTheme(savedTheme)
      }

      const savedColor = localStorage.getItem('memoryGame_cardColor')
      if (savedColor && CARD_COLORS[savedColor]) {
        setCardColor(savedColor)
      }

      const savedSparkly = localStorage.getItem('memoryGame_isSparkly')
      if (savedSparkly === 'true') {
        setIsSparkly(true)
      }

      // Load saved age preference
      const savedAge = localStorage.getItem('memoryGame_playerAge')
      if (savedAge && LEVELS[savedAge]) {
        setPlayerAge(savedAge)
      }

      // Load stars earned
      const savedStars = localStorage.getItem('memoryGame_starsEarned')
      if (savedStars) {
        try {
          setStarsEarned(JSON.parse(savedStars))
        } catch (e) {
          console.log('Error loading stars:', e)
        }
      }

      // Load inventory
      const savedInventory = localStorage.getItem('memoryGame_inventory')
      if (savedInventory) {
        try {
          setInventory(JSON.parse(savedInventory))
        } catch (e) {
          console.log('Error loading inventory:', e)
        }
      }

      // Load achievements
      const savedAchievements = localStorage.getItem('memoryGame_achievements')
      if (savedAchievements) {
        try {
          setAchievements(JSON.parse(savedAchievements))
        } catch (e) {
          console.log('Error loading achievements:', e)
        }
      }

      // Load language preference or show language selection for first time
      const savedLanguage = localStorage.getItem('memoryGame_language')
      if (savedLanguage && LANGUAGES[savedLanguage]) {
        setLanguage(savedLanguage)
      } else {
        // First time user - show language selection
        setShowLanguageSelect(true)
      }

      setIsLoaded(true)
    }
  }, [])

  // Save progress to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_highestLevel', highestLevelCompleted.toString())
    }
  }, [highestLevelCompleted, isLoaded])

  // Save theme preference
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_theme', currentTheme)
    }
  }, [currentTheme, isLoaded])

  // Save card color preference
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_cardColor', cardColor)
    }
  }, [cardColor, isLoaded])

  // Save sparkly preference
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_isSparkly', isSparkly.toString())
    }
  }, [isSparkly, isLoaded])

  // Save age preference
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_playerAge', playerAge)
    }
  }, [playerAge, isLoaded])

  // Save stars earned
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_starsEarned', JSON.stringify(starsEarned))
    }
  }, [starsEarned, isLoaded])

  // Save inventory
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_inventory', JSON.stringify(inventory))
    }
  }, [inventory, isLoaded])

  // Save achievements
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_achievements', JSON.stringify(achievements))
    }
  }, [achievements, isLoaded])

  // Save language preference
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('memoryGame_language', language)
    }
  }, [language, isLoaded])

  // Safety check: reset to defaults if current selections are locked (only after loading)
  useEffect(() => {
    if (isLoaded) {
      if (!isThemeUnlocked(currentTheme)) {
        setCurrentTheme('starter')
      }
      if (!isColorUnlocked(cardColor)) {
        setCardColor('default')
      }
      if (isSparkly && !isSparklyUnlocked()) {
        setIsSparkly(false)
      }
    }
  }, [highestLevelCompleted, isLoaded])

  // Helper function to get translated text
  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key
  }

  // Helper function to translate level names
  const translateLevelName = (levelName) => {
    // Extract emoji prefix and level text
    const parts = levelName.split(' ')
    const emoji = parts[0] // First part is emoji
    const levelText = parts.slice(1).join(' ') // Rest is the level name

    // Map level text to translation keys
    const levelMap = {
      'Easy': 'easy',
      'Challenges Starting': 'challengesStarting',
      'Extreme Mode': 'extremeMode',
      'Power Player': 'powerPlayer',
      'Focus Master': 'focusMaster',
      'Level Boss': 'levelBoss',
      'Champion Level': 'championLevel',
      'Star Player': 'starPlayer',
      'Diamond Rank': 'diamondRank',
      'Ultimate Gamer': 'ultimateGamer'
    }

    const translationKey = levelMap[levelText]
    const translatedText = translationKey ? t(translationKey) : levelText

    return `${emoji} ${translatedText}`
  }

  // Helper function to translate card color names
  const translateCardColorName = (colorName) => {
    // Extract emoji and color text
    const parts = colorName.split(' ')
    const emoji = parts[0] // First part is emoji
    const colorText = parts.slice(1).join(' ') // Rest is the color name

    // Map color text to translation keys
    const colorMap = {
      'Default White': 'defaultWhite',
      'Ocean Blue': 'oceanBlue',
      'Magic Purple': 'magicPurple',
      'Pretty Pink': 'prettyPink',
      'Nature Green': 'natureGreen',
      'Sunny Orange': 'sunnyOrange',
      'Cherry Red': 'cherryRed',
      'Rainbow Magic': 'rainbowMagic'
    }

    const translationKey = colorMap[colorText]
    const translatedText = translationKey ? t(translationKey) : colorText

    return `${emoji} ${translatedText}`
  }

  // Function to play sounds using Web Audio API
  const playSound = (soundType, volume = 0.3) => {
    try {
      // Initialize audio context if not already done
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      
      const audioContext = audioContextRef.current
      
      // Resume context if it's suspended (required by browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      // Create oscillator and gain nodes
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Set frequency based on sound type
      let frequency, duration, type = 'sine'
      switch (soundType) {
        case 'flip':
          frequency = 600
          duration = 0.15
          type = 'sine'
          break
        case 'match':
          // Happy chime sound
          frequency = 800
          duration = 0.3
          type = 'triangle'
          // Add a second tone for richness
          setTimeout(() => {
            const osc2 = audioContext.createOscillator()
            const gain2 = audioContext.createGain()
            osc2.connect(gain2)
            gain2.connect(audioContext.destination)
            osc2.frequency.setValueAtTime(1000, audioContext.currentTime)
            osc2.type = 'sine'
            gain2.gain.setValueAtTime(0, audioContext.currentTime)
            gain2.gain.linearRampToValueAtTime(volume * 0.5, audioContext.currentTime + 0.01)
            gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)
            osc2.start(audioContext.currentTime)
            osc2.stop(audioContext.currentTime + 0.3)
          }, 100)
          break
        case 'wrong':
          frequency = 250
          duration = 0.2
          type = 'sawtooth'
          break
        case 'win':
          // Victory fanfare
          frequency = 1000
          duration = 0.5
          type = 'square'
          // Add ascending tones
          setTimeout(() => {
            const osc2 = audioContext.createOscillator()
            const gain2 = audioContext.createGain()
            osc2.connect(gain2)
            gain2.connect(audioContext.destination)
            osc2.frequency.setValueAtTime(1200, audioContext.currentTime)
            osc2.type = 'sine'
            gain2.gain.setValueAtTime(0, audioContext.currentTime)
            gain2.gain.linearRampToValueAtTime(volume * 0.6, audioContext.currentTime + 0.01)
            gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4)
            osc2.start(audioContext.currentTime)
            osc2.stop(audioContext.currentTime + 0.4)
          }, 150)
          break
        case 'click':
          frequency = 450
          duration = 0.1
          type = 'sine'
          break
        case 'collect':
          // Item collection sound - sparkly!
          frequency = 1500
          duration = 0.4
          type = 'triangle'
          // Add shimmer effect
          setTimeout(() => {
            const osc2 = audioContext.createOscillator()
            const gain2 = audioContext.createGain()
            osc2.connect(gain2)
            gain2.connect(audioContext.destination)
            osc2.frequency.setValueAtTime(1800, audioContext.currentTime)
            osc2.type = 'sine'
            gain2.gain.setValueAtTime(0, audioContext.currentTime)
            gain2.gain.linearRampToValueAtTime(volume * 0.4, audioContext.currentTime + 0.01)
            gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)
            osc2.start(audioContext.currentTime)
            osc2.stop(audioContext.currentTime + 0.3)
          }, 100)
          break
        case 'badge':
          // Achievement unlocked sound - triumphant!
          frequency = 1200
          duration = 0.6
          type = 'square'
          // Add multiple tones
          setTimeout(() => {
            const osc2 = audioContext.createOscillator()
            const gain2 = audioContext.createGain()
            osc2.connect(gain2)
            gain2.connect(audioContext.destination)
            osc2.frequency.setValueAtTime(1500, audioContext.currentTime)
            osc2.type = 'triangle'
            gain2.gain.setValueAtTime(0, audioContext.currentTime)
            gain2.gain.linearRampToValueAtTime(volume * 0.7, audioContext.currentTime + 0.01)
            gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)
            osc2.start(audioContext.currentTime)
            osc2.stop(audioContext.currentTime + 0.5)
          }, 150)
          break
        default:
          frequency = 500
          duration = 0.15
          type = 'sine'
      }

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = type

      // Set volume envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

      // Start and stop the oscillator
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
      
    } catch (e) {
      console.log('Sound error:', e)
    }
  }


  const shuffleCards = (level = currentLevel) => {
    const theme = THEMES[currentTheme]
    let pairs
    
    if (gameMode === 'multiplayer') {
      // Start with 2 pairs, add 2 more pairs (4 cards) each round
      pairs = 2 + (level - 1) * 2 // Level 1: 2 pairs (4 cards), Level 2: 4 pairs (8 cards), etc.
    } else {
      // Use level-based pairs for single player
      const ageLevels = LEVELS[playerAge] || LEVELS['6-8']
      const levelConfig = ageLevels[level - 1]
      pairs = levelConfig.pairs
    }
    
    const requiredEmojis = theme.emojis.slice(0, pairs)
    const shuffledCards = [...requiredEmojis, ...requiredEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setIsWon(false)
    setIsGameOver(false)
    setHelpUsed(0)
    setHelpRevealed([])
  }

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  useEffect(() => {
    if (playerAge) {
      // Initial setup - level 1 gets 4 tries
      setTotalMovesAvailable(4) // Level 1 starts with 4 tries
      shuffleCards()
    }
  }, [playerAge])

  useEffect(() => {
    // Only shuffle if not auto-advancing (manual level change)
    if (!isWon) {
      shuffleCards()
    }
  }, [currentLevel])

  useEffect(() => {
    if (flippedCards.length === 2 && cards.length > 0) {
      const [first, second] = flippedCards
      
      // Check if this is a winning match BEFORE checking moves
      const isWinningMatch = cards[first].emoji === cards[second].emoji
      const newMatchedCards = isWinningMatch ? [...matchedCards, first, second] : matchedCards
      const isCompleteWin = newMatchedCards.length === cards.length
      
      setMovesUsed(prev => {
        const newMovesUsed = prev + 1
        // Only trigger game over if not winning and out of moves
        if (newMovesUsed >= totalMovesAvailable && gameMode === 'single' && !isCompleteWin) {
          setIsGameOver(true)
        }
        return newMovesUsed
      })
      
      if (isWinningMatch) {
        // Play match sound
        playSound('match', 0.3)

        const newMatchedCards = [...matchedCards, first, second]
        setMatchedCards(newMatchedCards)
        setFlippedCards([])

        // Award first match badge
        if (matchedCards.length === 0) {
          awardBadge('firstMatch')
        }

        // Award inventory item for perfect match - VERY RARE!
        const isPerfectMatch = Math.random() < 0.05 // Only 5% chance for reward!
        if (isPerfectMatch && gameMode === 'single') {
          const itemTypes = [
            { key: 'apples', emoji: '🍎', name: 'Apple' },
            { key: 'berries', emoji: '🫐', name: 'Berries' },
            { key: 'fish', emoji: '🐟', name: 'Fish' },
            { key: 'gems', emoji: '💎', name: 'Gem' },
            { key: 'treasures', emoji: '🏺', name: 'Treasure' },
            { key: 'mystery', emoji: '🎁', name: 'Mystery Box' }
          ]
          const randomItem = itemTypes[Math.floor(Math.random() * itemTypes.length)]

          setInventory(prev => ({
            ...prev,
            [randomItem.key]: prev[randomItem.key] + 1
          }))

          setCollectedItem(randomItem)
          setShowItemCollected(true)
          playSound('collect', 0.4)

          // Award first item badge
          const totalItems = Object.values(inventory).reduce((sum, count) => sum + count, 0)
          if (totalItems === 0) {
            setTimeout(() => awardBadge('firstItem'), 500)
          }

          // Check for collector badges
          setTimeout(() => {
            const newTotalItems = totalItems + 1
            if (newTotalItems >= 10) awardBadge('collector')
            if (newTotalItems >= 50) awardBadge('hoarder')

            // Check for specific item badges
            const newInventory = { ...inventory, [randomItem.key]: inventory[randomItem.key] + 1 }
            if (newInventory.gems >= 5) awardBadge('gemFinder')
            if (newInventory.fish >= 5) awardBadge('fisherman')
          }, 500)

          setTimeout(() => {
            setShowItemCollected(false)
          }, 2000)
        }

        // In multiplayer, ALWAYS award the point for a match
        if (gameMode === 'multiplayer') {
          setPlayerScores(prev => ({
            ...prev,
            [currentPlayer]: prev[currentPlayer] + 1
          }))
        }

        // Check for immediate win
        if (newMatchedCards.length === cards.length) {
          // Play win sound
          playSound('win', 0.4)
          // Award stars based on performance
          const remainingMoves = totalMovesAvailable - movesUsed - 1
          const totalLevelMoves = currentLevelConfig.pairs * 2
          let starsEarned = 1
          if (remainingMoves >= totalLevelMoves * 0.5) starsEarned = 3
          else if (remainingMoves >= totalLevelMoves * 0.25) starsEarned = 2

          setStarsEarned(prev => [...prev, { level: currentLevel, stars: starsEarned }])

          // Award badges for level completion and performance
          if (gameMode === 'single') {
            if (currentLevel >= 5) awardBadge('level5')
            if (currentLevel >= 10) awardBadge('level10')
            if (starsEarned === 3) awardBadge('perfectLevel')
            if (movesUsed < 10) awardBadge('speedster')
          }

          // Update highest level completed for unlocks (only in single player)
          if (gameMode === 'single' && currentLevel > highestLevelCompleted) {
            const oldLevel = highestLevelCompleted
            const newLevel = currentLevel
            setHighestLevelCompleted(newLevel)

            // Check for new unlocks
            const newUnlocksList = []

            // Check theme unlocks
            Object.keys(THEMES).forEach(themeKey => {
              const theme = THEMES[themeKey]
              if (theme.unlockLevel <= newLevel && theme.unlockLevel > oldLevel) {
                newUnlocksList.push({ type: 'theme', key: themeKey, name: theme.name })
                awardBadge('unlockTheme')
              }
            })

            // Check color unlocks
            Object.keys(CARD_COLORS).forEach(colorKey => {
              const color = CARD_COLORS[colorKey]
              if (color.unlockLevel <= newLevel && color.unlockLevel > oldLevel) {
                newUnlocksList.push({ type: 'color', key: colorKey, name: color.name })
              }
            })

            // Check sparkly unlock (level 4)
            if (newLevel >= 4 && oldLevel < 4) {
              newUnlocksList.push({ type: 'effect', key: 'sparkly', name: '✨ Sparkly Cards' })
            }

            if (newUnlocksList.length > 0) {
              setNewUnlocks(newUnlocksList)
              setShowGiftBox(true)
              setGiftBounces(0)
              setGiftOpened(false)
            }
          }

          if (gameMode === 'multiplayer') {
            // In multiplayer, check if anyone reached 10 points (need to check updated scores)
            // Use setTimeout to let the state update first
            setTimeout(() => {
              // Re-check scores after state updates
              const currentScores = Object.values(playerScores)
              const highestScore = Math.max(...currentScores)

              if (highestScore >= 10) {
                // Someone won! Find the winner
                const scores = Object.entries(playerScores).map(([player, score]) => ({ player: parseInt(player), score }))
                const maxScore = Math.max(...scores.map(p => p.score))
                const winners = scores.filter(p => p.score === maxScore)

                if (winners.length === 1) {
                  setGameWinner(winners[0].player)
                  // Award multiplayer win badge to winner
                  awardBadge('multiplayerWin')
                } else {
                  setGameWinner('tie')
                }
                setIsWon(true)
              } else {
                // Continue playing - add 4 more cards each round
                setCurrentLevel(prev => prev + 1) // Increase level to add more cards
                shuffleCards(currentLevel + 1)
                setCurrentPlayer(1)
              }
            }, 100)
          } else {
            // Single player logic
            setIsWon(true)
            if (true) { // Infinite levels
              // Start countdown at 3
              let currentCount = 3
              setCountdown(currentCount)

              const countdownInterval = setInterval(() => {
                currentCount--

                if (currentCount <= 0) {
                  clearInterval(countdownInterval)
                  setCountdown(null)

                  // Advance to next level
                  const newLevel = currentLevel + 1
                  const remainingMoves = totalMovesAvailable - movesUsed - 1
                  const ageLevels = LEVELS[playerAge] || LEVELS['6-8']

                  if (ageLevels && ageLevels[newLevel - 1]) {
                    const newLevelTries = newLevel * 4
                    const totalMovesForNewLevel = remainingMoves + newLevelTries

                    setCurrentLevel(newLevel)
                    setMovesUsed(0)
                    setTotalMovesAvailable(totalMovesForNewLevel)

                    // Shuffle cards for new level
                    const levelConfig = getCurrentLevelConfig(newLevel)
                    const requiredEmojis = THEMES[currentTheme].emojis.slice(0, levelConfig.pairs)
                    const shuffledCards = [...requiredEmojis, ...requiredEmojis]
                      .sort(() => Math.random() - 0.5)
                      .map((emoji, index) => ({
                        id: index,
                        emoji,
                        isFlipped: false,
                        isMatched: false
                      }))
                    setCards(shuffledCards)
                    setFlippedCards([])
                    setMatchedCards([])
                    setIsWon(false)
                    setIsGameOver(false)
                  }
                } else {
                  setCountdown(currentCount)
                }
              }, 1000)

              countdownRef.current = countdownInterval
            }
          }
        }
      } else {
        // Play wrong match sound
        playSound('wrong', 0.3)
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setFlippedCards([])
          // In multiplayer, switch turns on wrong match
          if (gameMode === 'multiplayer') {
            setCurrentPlayer(currentPlayer >= numPlayers ? 1 : currentPlayer + 1)
          }
        }, 1000)
      }
    }
  }, [flippedCards])


  const nextLevel = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      setCountdown(null)
    }
    if (true) { // Infinite levels
      const newLevel = currentLevel + 1
      const remainingMoves = totalMovesAvailable - movesUsed - 1 // Subtract 1 for the current move
      const newLevelTries = newLevel * 4 // Level 1=4, Level 2=8, Level 3=12, etc.
      
      setCurrentLevel(newLevel)
      setMovesUsed(0)
      setTotalMovesAvailable(remainingMoves + newLevelTries)
      
      // Shuffle cards manually
      const levelConfig = getCurrentLevelConfig(newLevel)
      const requiredEmojis = THEMES[currentTheme].emojis.slice(0, levelConfig.pairs)
      const shuffledCards = [...requiredEmojis, ...requiredEmojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({
          id: index,
          emoji,
          isFlipped: false,
          isMatched: false
        }))
      setCards(shuffledCards)
      setFlippedCards([])
      setMatchedCards([])
      setIsWon(false)
      setIsGameOver(false)
    }
  }

  const prevLevel = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      setCountdown(null)
    }
    if (currentLevel > 1) {
      const newLevel = currentLevel - 1
      const newLevelTries = newLevel * 4 // Level 1=4, Level 2=8, Level 3=12, etc.
      setCurrentLevel(newLevel)
      setMovesUsed(0)
      setTotalMovesAvailable(newLevelTries) // Reset to just this level's tries
      shuffleCards(newLevel)
    }
  }

  const resetLevel = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      setCountdown(null)
    }
    // Reset moves to just this level's allocation
    const levelTries = currentLevel * 4 // Level 1=4, Level 2=8, Level 3=12, etc.
    setMovesUsed(0)
    setTotalMovesAvailable(levelTries)
    shuffleCards()
  }

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index) || isGameOver) {
      return
    }
    
    // Initialize audio context on first click if needed
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume()
        }
      } catch (e) {
        console.log('Audio init error:', e)
      }
    }
    
    // Play flip sound
    playSound('flip', 0.2)
    
    setFlippedCards([...flippedCards, index])
  }

  const useHelp = () => {
    if (cards.length === 0 || hintCooldown) return

    // Set cooldown with countdown
    setHintCooldown(true)
    let timeLeft = 3
    setHintCooldownTime(timeLeft)

    const cooldownInterval = setInterval(() => {
      timeLeft--

      if (timeLeft <= 0) {
        clearInterval(cooldownInterval)
        setHintCooldown(false)
        setHintCooldownTime(0)
      } else {
        setHintCooldownTime(timeLeft)
      }
    }, 1000)

    hintCooldownRef.current = cooldownInterval

    // Check if there's already a flipped card that needs a match
    if (flippedCards.length === 1) {
      const flippedIndex = flippedCards[0]
      const flippedEmoji = cards[flippedIndex].emoji

      // Find the matching card that's not flipped or matched
      const matchingIndex = cards.findIndex((card, index) =>
        card.emoji === flippedEmoji &&
        index !== flippedIndex &&
        !matchedCards.includes(index)
      )

      if (matchingIndex !== -1) {
        // Highlight the matching card
        setHelpRevealed([matchingIndex])
        setHelpUsed(prev => prev + 1)

        // Hide the help after 3 seconds
        setTimeout(() => {
          setHelpRevealed([])
        }, 3000)

        // In multiplayer, switch turns after using help
        if (gameMode === 'multiplayer') {
          setTimeout(() => {
            setCurrentPlayer(currentPlayer >= numPlayers ? 1 : currentPlayer + 1)
          }, 3000)
        }
        return
      }
    }

    // If no card is flipped, highlight a random unmatched pair
    const emojisInPlay = cards.map(card => card.emoji)
    const availableEmojis = [...new Set(emojisInPlay)].filter(emoji => {
      const indices = cards.map((card, index) => card.emoji === emoji ? index : -1).filter(i => i !== -1)
      return !indices.some(i => matchedCards.includes(i))
    })

    if (availableEmojis.length === 0) return

    // Pick the first available emoji and highlight both cards
    const targetEmoji = availableEmojis[0]
    const pairIndices = cards.map((card, index) => card.emoji === targetEmoji ? index : -1).filter(i => i !== -1)

    // Highlight both cards of the pair
    setHelpRevealed(pairIndices)
    setHelpUsed(prev => prev + 1)

    // Hide the help after 3 seconds
    setTimeout(() => {
      setHelpRevealed([])
    }, 3000)

    // In multiplayer, switch turns after using help
    if (gameMode === 'multiplayer') {
      setTimeout(() => {
        setCurrentPlayer(currentPlayer >= numPlayers ? 1 : currentPlayer + 1)
      }, 3000)
    }
  }

  const startSinglePlayer = () => {
    setGameMode('single')
    setCurrentLevel(1)
    setMovesUsed(0)
    setTotalMovesAvailable(4) // Level 1 gets 4 tries
    shuffleCards(1)
  }

  const startMultiplayer = () => {
    setGameMode('multiplayer')
    setCurrentLevel(1)
    setCurrentPlayer(1)
    // Initialize scores for all players
    const initialScores = {}
    for (let i = 1; i <= numPlayers; i++) {
      initialScores[i] = 0
    }
    setPlayerScores(initialScores)
    setGameWinner(null)
    setMovesUsed(0)
    setTotalMovesAvailable(999) // Unlimited moves for multiplayer
    shuffleCards(1)
  }

  const backToMenu = () => {
    setGameMode(null)
    setIsWon(false)
    setIsGameOver(false)
    setGameWinner(null)
  }

  const ageLevels = LEVELS[playerAge] || LEVELS['6-8']
  
  // Generate level config for infinite levels
  const getCurrentLevelConfig = (level) => {
    if (level <= 10 && ageLevels[level - 1]) {
      return ageLevels[level - 1]
    }
    // For levels beyond 10, generate dynamically
    const basePairs = playerAge === '3-5' ? 2 : playerAge === '6-8' ? 15 : 20
    const additionalPairs = Math.floor((level - 1) / 2) * 5 // Add 5 pairs every 2 levels
    return {
      level: level,
      pairs: basePairs + additionalPairs,
      name: `🚀 Level ${level}`,
      encouragement: "Keep going, champion!"
    }
  }
  
  const currentLevelConfig = getCurrentLevelConfig(currentLevel)
  const totalCards = currentLevelConfig.pairs * 2
  
  // Calculate optimal grid dimensions for even distribution
  const getOptimalGrid = (cardCount) => {
    // Prefer layouts that arrange cards in horizontal rows going across
    const layouts = [
      { 4: { cols: 4, rows: 1 } },     // 2 pairs: 4 in one row
      { 6: { cols: 6, rows: 1 } },     // 3 pairs: 6 in one row  
      { 8: { cols: 4, rows: 2 } },     // 4 pairs: 4 per row, 2 rows
      { 10: { cols: 5, rows: 2 } },    // 5 pairs: 5 per row, 2 rows
      { 12: { cols: 4, rows: 3 } },    // 6 pairs: 4 per row, 3 rows
      { 14: { cols: 7, rows: 2 } },    // 7 pairs: 7 per row, 2 rows
      { 16: { cols: 4, rows: 4 } },    // 8 pairs: 4 per row, 4 rows
      { 18: { cols: 6, rows: 3 } },    // 9 pairs: 6 per row, 3 rows
      { 20: { cols: 5, rows: 4 } },    // 10 pairs: 5 per row, 4 rows
      { 24: { cols: 6, rows: 4 } },    // 12 pairs: 6 per row, 4 rows
      { 28: { cols: 7, rows: 4 } },    // 14 pairs: 7 per row, 4 rows
      { 30: { cols: 6, rows: 5 } },    // 15 pairs: 6 per row, 5 rows
      { 32: { cols: 8, rows: 4 } },    // 16 pairs: 8 per row, 4 rows
      { 36: { cols: 6, rows: 6 } },    // 18 pairs: 6 per row, 6 rows
      { 40: { cols: 8, rows: 5 } },    // 20 pairs: 8 per row, 5 rows
      { 44: { cols: 11, rows: 4 } },   // 22 pairs: 11 per row, 4 rows
      { 50: { cols: 10, rows: 5 } },   // 25 pairs: 10 per row, 5 rows
      { 56: { cols: 8, rows: 7 } },    // 28 pairs: 8 per row, 7 rows
      { 60: { cols: 10, rows: 6 } },   // 30 pairs: 10 per row, 6 rows
      { 70: { cols: 10, rows: 7 } },   // 35 pairs: 10 per row, 7 rows
      { 80: { cols: 10, rows: 8 } },   // 40 pairs: 10 per row, 8 rows
      { 90: { cols: 10, rows: 9 } },   // 45 pairs: 10 per row, 9 rows
      { 100: { cols: 10, rows: 10 } }, // 50 pairs: 10 per row, 10 rows
      { 120: { cols: 12, rows: 10 } }  // 60 pairs: 12 per row, 10 rows
    ]
    
    for (const layout of layouts) {
      if (layout[cardCount]) {
        return layout[cardCount]
      }
    }
    
    // Fallback to rectangular layout that ensures no gaps
    const cols = Math.ceil(Math.sqrt(cardCount))
    const rows = Math.ceil(cardCount / cols)
    return { cols, rows }
  }
  
  const { cols, rows } = getOptimalGrid(totalCards)
  const availableHeight = Math.min(windowSize.height * 0.5, 400) // Smaller height for cards
  const availableWidth = Math.min(windowSize.width * 0.85, 550)   // Smaller width for cards
  const cardWidth = (availableWidth - (cols - 1) * 2) / cols
  const cardHeight = (availableHeight - (rows - 1) * 2) / rows
  const cardSize = Math.min(cardWidth, cardHeight, 80) // Max card size of 80px

  // Settings screen - check FIRST before main menu
  if (showSettings) {
    const selectedTheme = THEMES[currentTheme]
    return (
      <>
        {/* Reset All Progress Confirmation Popup - must be here for settings screen */}
        {showResetAllConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-gradient-to-br from-red-300 via-orange-300 to-yellow-300 rounded-3xl p-8 max-w-md text-center shadow-2xl border-4 border-red-600">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-3xl font-bold text-red-800 mb-4">{t('resetEverything')}</h2>
              <p className="text-xl text-red-700 mb-2">{t('thisWillDelete')}</p>
              <p className="text-lg text-red-600 mb-6">
                ⭐ {t('allLevels')}<br/>
                🎨 {t('allThemes')}<br/>
                🏆 {t('allAchievements')}<br/>
                🎒 {t('allItems')}
              </p>
              <p className="text-lg font-bold text-red-800 mb-6">{t('reallyReset')} 🤔</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    // Clear all saved data
                    localStorage.removeItem('memoryGame_highestLevel')
                    localStorage.removeItem('memoryGame_starsEarned')
                    localStorage.removeItem('memoryGame_theme')
                    localStorage.removeItem('memoryGame_cardColor')
                    localStorage.removeItem('memoryGame_isSparkly')
                    localStorage.removeItem('memoryGame_playerAge')
                    localStorage.removeItem('memoryGame_inventory')
                    localStorage.removeItem('memoryGame_achievements')

                    // Reset all state
                    setHighestLevelCompleted(0)
                    setStarsEarned([])
                    setCurrentTheme('starter')
                    setCardColor('default')
                    setIsSparkly(false)
                    setPlayerAge('6-8')
                    setCurrentLevel(1)
                    setMovesUsed(0)
                    setTotalMovesAvailable(4)
                    setInventory({ apples: 0, berries: 0, fish: 0, gems: 0, treasures: 0, mystery: 0 })
                    setAchievements([])
                    setLastViewedBadgeCount(0)
                    setIsWon(false)
                    setIsGameOver(false)
                    setMatchedCards([])
                    setFlippedCards([])

                    playSound('click', 0.2)
                    setShowResetAllConfirm(false)
                    setShowSettings(false)

                    // Shuffle cards to refresh the game
                    shuffleCards(1)
                  }}
                  className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  ✅ {t('yesReset')}
                </button>
                <button
                  onClick={() => {
                    setShowResetAllConfirm(false)
                    playSound('click', 0.2)
                  }}
                  className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  ❌ {t('keepProgress')}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`min-h-screen bg-gradient-to-br ${selectedTheme.bg} p-2 overflow-y-auto`}>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowSettings(false)}
              className="bg-white text-purple-600 font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-100 transition-colors"
            >
              ← {t('backToGame')}
            </button>
            <h1 className="text-3xl font-bold text-white">⚙️ {t('settings')}</h1>
            <div className="w-20"></div>
          </div>

          {/* Age Selection */}
          <div className="text-center bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-black text-lg font-bold mb-2">🎂 {t('howOldAreYou')}</h2>
            <div className="flex justify-center gap-3">
              {[
                { key: '3-5', label: '3-5 years', emoji: '👧🏽🍭👦🏽', desc: 'Easy & Fun!' },
                { key: '6-8', label: '6-8 years', emoji: '👩🏽🎮🧑🏽‍🦱', desc: 'Getting Harder!' },
                { key: '9-12', label: '9-12 years', emoji: '🧔🏽‍♂️💻👱🏽‍♀️', desc: 'Challenge Mode!' }
              ].map(age => (
                <button
                  key={age.key}
                  onClick={() => {
                    playSound('click', 0.2)
                    setPlayerAge(age.key)
                  }}
                  className={`p-2 rounded-xl font-bold text-xs transition-all transform hover:scale-105 ${
                    playerAge === age.key 
                      ? 'bg-yellow-300 text-purple-800 ring-4 ring-white shadow-xl' 
                      : 'bg-white text-purple-600 shadow-lg'
                  }`}
                >
                  <div className="text-xl mb-1">{age.emoji}</div>
                  <div className="text-xs font-bold">{age.key} {t('years')}</div>
                  <div className="text-xs">{age.desc === 'Easy & Fun!' ? t('easyAndFun') : age.desc === 'Getting Harder!' ? t('gettingHarder') : t('challengeMode')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="text-center bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-black text-lg font-bold mb-2">🌍 {t('selectLanguage')}</h2>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(LANGUAGES).map(([code, { flag, name }]) => (
                <button
                  key={code}
                  onClick={() => {
                    playSound('click', 0.2)
                    setLanguage(code)
                  }}
                  className={`p-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 ${
                    language === code
                      ? 'bg-yellow-300 text-purple-800 ring-4 ring-white shadow-xl'
                      : 'bg-white text-purple-600 shadow-lg'
                  }`}
                >
                  <div className="text-3xl mb-1">{flag}</div>
                  <div className="text-xs">{name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div className="text-center bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-black text-lg font-bold mb-2">🎨 {t('chooseYourTheme')}</h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {Object.keys(THEMES).map((themeKey) => {
                const theme = THEMES[themeKey]
                const isUnlocked = getDisplayUnlockStatus(theme.unlockLevel)
                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      if (isUnlocked) {
                        setCurrentTheme(themeKey)
                      }
                    }}
                    disabled={!isUnlocked}
                    className={`p-3 rounded-xl font-bold text-sm transition-all transform ${
                      isUnlocked ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-60'
                    } ${
                      currentTheme === themeKey 
                        ? 'bg-yellow-300 text-purple-800 ring-4 ring-white shadow-xl' 
                        : isUnlocked 
                          ? 'bg-white text-purple-600 shadow-lg'
                          : 'bg-gray-300 text-gray-500 shadow-lg'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {isUnlocked ? theme.emojis.slice(0, 3).join(' ') : '🔒🔒🔒'}
                    </div>
                    <div className="text-xs">
                      {isUnlocked ? theme.name : theme.unlockDescription}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Card Color Selection */}
          <div className="text-center bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-2">
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                🌈 {t('pickCardColor')}
              </span>
            </h2>
            <div className="space-y-2">
              {/* First row: Default, Blue, Purple, Red, Rainbow */}
              <div className="flex justify-center gap-1 flex-wrap">
                {['default', 'blue', 'purple', 'red', 'rainbow'].map((colorKey) => {
                  const color = CARD_COLORS[colorKey]
                  const isUnlocked = getDisplayUnlockStatus(color.unlockLevel)
                  return (
                    <button
                      key={colorKey}
                      onClick={() => {
                        if (isUnlocked) {
                          setCardColor(colorKey)
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`p-1 px-2 rounded-lg font-bold text-xs transition-all transform ${
                        isUnlocked ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-60'
                      } ${
                        cardColor === colorKey 
                          ? 'ring-2 ring-white shadow-xl scale-105' 
                          : 'shadow-lg'
                      } ${
                        !isUnlocked 
                          ? 'bg-gray-300' 
                          : colorKey === 'rainbow' 
                            ? 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400' 
                            : `bg-gradient-to-br ${color.unflipped}`
                      }`}
                    >
                      <div className="text-xs font-bold" style={{ color: !isUnlocked ? '#666' : '#000' }}>
                        {isUnlocked ? translateCardColorName(color.name) : `🔒 ${color.unlockDescription}`}
                      </div>
                    </button>
                  )
                })}
              </div>
              
              {/* Second row: Pink, Green, Orange */}
              <div className="flex justify-center gap-1 flex-wrap">
                {['pink', 'green', 'orange'].map((colorKey) => {
                  const color = CARD_COLORS[colorKey]
                  const isUnlocked = getDisplayUnlockStatus(color.unlockLevel)
                  return (
                    <button
                      key={colorKey}
                      onClick={() => {
                        if (isUnlocked) {
                          setCardColor(colorKey)
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`p-1 px-2 rounded-lg font-bold text-xs transition-all transform ${
                        isUnlocked ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-60'
                      } ${
                        cardColor === colorKey 
                          ? 'ring-2 ring-white shadow-xl scale-105' 
                          : 'shadow-lg'
                      } ${
                        !isUnlocked ? 'bg-gray-300' : `bg-gradient-to-br ${color.unflipped}`
                      }`}
                    >
                      <div className="text-xs font-bold" style={{ color: !isUnlocked ? '#666' : '#000' }}>
                        {isUnlocked ? translateCardColorName(color.name) : `🔒 ${color.unlockDescription}`}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sparkly Effect Toggle */}
          <div className="text-center bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-black text-lg font-bold mb-2">✨ {t('sparklyCards')}</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsSparkly(false)}
                className={`p-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 ${
                  !isSparkly 
                    ? 'bg-yellow-300 text-purple-800 ring-4 ring-white shadow-xl' 
                    : 'bg-white text-purple-600 shadow-lg'
                }`}
              >
                <div className="text-xl mb-1">🟦</div>
                <div className="text-xs">{t('off')}</div>
              </button>
              <button
                onClick={() => {
                  const sparklyUnlocked = getDisplayUnlockStatus(4)
                  if (sparklyUnlocked) {
                    setIsSparkly(true)
                  }
                }}
                disabled={!getDisplayUnlockStatus(4)}
                className={`p-3 rounded-xl font-bold text-sm transition-all transform ${
                  getDisplayUnlockStatus(4) ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-60'
                } ${
                  isSparkly 
                    ? 'bg-yellow-300 text-purple-800 ring-4 ring-white shadow-xl animate-pulse' 
                    : getDisplayUnlockStatus(4)
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'bg-gray-300 text-gray-500 shadow-lg'
                }`}
              >
                <div className="text-xl mb-1">{getDisplayUnlockStatus(4) ? '✨' : '🔒'}</div>
                <div className="text-xs">{getDisplayUnlockStatus(4) ? t('on') : 'Level 4'}</div>
              </button>
            </div>
          </div>

          {/* Multiplayer settings */}
          <div className="text-center bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm max-w-lg mx-auto">
            <h3 className="text-white text-2xl font-bold mb-4">👥 {t('multiplayerGame')}</h3>
            {!playerAge && (
              <div className="mb-4 p-4 bg-yellow-200 bg-opacity-80 rounded-lg">
                <p className="text-purple-800 font-bold">⚠️ {t('howOldAreYou')}</p>
              </div>
            )}
            {playerAge && (
              <>
                <p className="text-black text-lg mb-4">🏆 {t('firstTo10Wins')}</p>
                <p className="text-yellow-200 text-sm mb-4">{t('eachRoundHas')}</p>

                <div className="mb-4">
                  <p className="text-white text-lg font-bold mb-3">{t('howManyPlayers')}</p>
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {[2, 3, 4, 5, 6, 7, 8].map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          playSound('click', 0.2)
                          setNumPlayers(num)
                          // Initialize player names when changing number of players
                          const newNames = {}
                          for (let i = 1; i <= num; i++) {
                            newNames[i] = playerNames[i] || ''
                          }
                          setPlayerNames(newNames)
                        }}
                        className={`w-12 h-12 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                          numPlayers === num
                            ? 'bg-yellow-300 text-purple-800 ring-2 ring-white shadow-xl' 
                            : 'bg-white text-purple-600 shadow-lg'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Player Name Inputs */}
                <div className="mb-6 space-y-2">
                  <p className="text-black text-lg font-bold mb-2">{t('playerNames')}</p>
                  <p className="text-base mb-3">⚠️ <span className="text-black">{t('dontPutRealName')}</span></p>
                  {Array.from({length: numPlayers}, (_, i) => i + 1).map(playerNum => (
                    <input
                      key={playerNum}
                      type="text"
                      placeholder={`Player ${playerNum} nickname`}
                      value={playerNames[playerNum] || ''}
                      onChange={(e) => setPlayerNames(prev => ({
                        ...prev,
                        [playerNum]: e.target.value
                      }))}
                      className="w-full p-3 rounded-lg text-sm text-purple-700 font-bold placeholder-purple-400 border-2 border-transparent focus:border-yellow-300 focus:outline-none"
                      maxLength={15}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    playSound('click', 0.2)
                    setShowSettings(false)
                    startMultiplayer()
                  }}
                  className="w-full bg-yellow-400 text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg text-xl"
                >
                  🎮 Start {numPlayers} Player Game!
                </button>
              </>
            )}
          </div>

          {/* Progress/Unlock Status */}
          <div className="text-center bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="text-black text-lg font-bold mb-2">🏆 {t('yourProgress')}</h3>
            {highestLevelCompleted > 0 ? (
              <p className="text-black text-sm mb-2">{t('highestLevelCompleted')} {highestLevelCompleted}</p>
            ) : (
              <p className="text-black text-sm mb-2">{t('readyToStart')}</p>
            )}

            {/* Show next unlocks */}
            <div className="text-xs space-y-1 mb-4">
              {highestLevelCompleted === 0 ? (
                // Show first few unlocks when starting out
                <>
                  <div className="text-black">🔒 Level 2: 💙 Ocean Blue</div>
                  <div className="text-black">🔒 Level 3: 🐾 Animal Friends + 💜 Magic Purple</div>
                  <div className="text-black">🔒 Level 4: ✨ Sparkly Cards + More Colors!</div>
                </>
              ) : (
                // Show regular upcoming unlocks based on current progress
                <>
                  {Object.entries(THEMES).filter(([key, theme]) => theme.unlockLevel > highestLevelCompleted && theme.unlockLevel <= highestLevelCompleted + 3).map(([key, theme]) => (
                    <div key={key} className="text-black">
                      🔒 Level {theme.unlockLevel}: {theme.name}
                    </div>
                  ))}
                  {Object.entries(CARD_COLORS).filter(([key, color]) => color.unlockLevel > highestLevelCompleted && color.unlockLevel <= highestLevelCompleted + 3).map(([key, color]) => (
                    <div key={key} className="text-black">
                      🔒 Level {color.unlockLevel}: {translateCardColorName(color.name)}
                    </div>
                  ))}
                  {/* Show sparkly unlock */}
                  {highestLevelCompleted < 4 && (
                    <div className="text-black">
                      🔒 Level 4: ✨ Sparkly Cards
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Reset Progress Button */}
            <button
              onClick={() => {
                console.log('Reset button clicked!')
                setShowResetAllConfirm(true)
              }}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              🔄 Reset All Progress
            </button>
          </div>
        </div>
      </div>
      </>
    )
  }



  const selectedTheme = THEMES[currentTheme]
  
  return (
    <div className={`h-screen bg-gradient-to-br ${selectedTheme.bg} p-2 flex flex-col overflow-hidden relative`}>

      {/* Language Selection Screen - First Time Only */}
      {showLanguageSelect && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 text-center shadow-2xl">
            <div className="text-6xl mb-6">🌍</div>
            <h2 className="text-4xl font-bold text-purple-800 mb-8">
              {language === 'en' ? 'Select Your Language' : TRANSLATIONS[language]?.selectLanguage || 'Select Your Language'}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(LANGUAGES).map(([code, { flag, name }]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code)
                    setShowLanguageSelect(false)
                    playSound('click', 0.3)
                  }}
                  className="bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-6 px-4 rounded-2xl text-2xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="text-4xl mb-2">{flag}</div>
                  <div className="text-lg">{name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gift Box Unlock Animation */}
      {showGiftBox && !giftOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          onClick={() => {
            if (giftBounces < 3) {
              setGiftBounces(prev => prev + 1)
              playSound('click', 0.3)
            } else {
              setGiftOpened(true)
              playSound('win', 0.4)
              setTimeout(() => {
                setShowGiftBox(false)
                setNewUnlocks([])
                setGiftBounces(0)
                setGiftOpened(false)
              }, 3000)
            }
          }}
        >
          <div className={`text-center ${giftBounces < 3 ? 'animate-bounce' : ''}`}>
            <div className="text-9xl mb-4">🎁</div>
            <p className="text-white text-2xl font-bold">
              {giftBounces < 3 ? `${t('tapMoreTimes')} ${3 - giftBounces} ${t('moreTimes')}${3 - giftBounces > 1 ? 's' : ''}!` : t('opening')}
            </p>
          </div>
        </div>
      )}

      {/* Opened Gift - Show Unlocks */}
      {showGiftBox && giftOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">🎉 {t('newUnlocks')} 🎉</h2>
            <div className="space-y-3">
              {newUnlocks.map((unlock, index) => (
                <div
                  key={`${unlock.type}-${unlock.key}`}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-800 font-bold p-4 rounded-xl shadow-lg"
                  style={{
                    animation: 'fadeIn 0.5s ease-out',
                    animationDelay: `${index * 0.2}s`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="text-2xl mb-2">
                    {unlock.type === 'theme' ? '🎨' :
                     unlock.type === 'color' ? '🌈' :
                     '✨'}
                  </div>
                  <div className="text-lg font-bold">{unlock.name}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-4 text-sm">{t('checkSettings')}</p>
          </div>
        </div>
      )}

      {/* Item Collected Popup */}
      {showItemCollected && collectedItem && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 shadow-2xl animate-bounce border-4 border-white">
            <div className="text-5xl mb-2">{collectedItem.emoji}</div>
            <p className="text-xl font-bold text-purple-800">+1 {collectedItem.name}!</p>
          </div>
        </div>
      )}

      {/* Badge Earned Popup */}
      {showBadgeEarned && earnedBadge && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-6 shadow-2xl animate-bounce border-4 border-yellow-400">
            <p className="text-white text-2xl font-black mb-2">🏆 ACHIEVEMENT UNLOCKED! 🏆</p>
            <div className="text-7xl mb-3">{earnedBadge.emoji}</div>
            <p className="text-2xl font-bold text-white mb-1">{earnedBadge.name}</p>
            <p className="text-lg text-yellow-200">{earnedBadge.description}</p>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventory && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
          <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl border-4 border-amber-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-amber-900 flex items-center gap-2">
                🎒 My Backpack
              </h2>
              <button
                onClick={() => setShowInventory(false)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { key: 'apples', emoji: '🍎', name: 'Apples' },
                { key: 'berries', emoji: '🫐', name: 'Berries' },
                { key: 'fish', emoji: '🐟', name: 'Fish' },
                { key: 'gems', emoji: '💎', name: 'Gems' },
                { key: 'treasures', emoji: '🏺', name: 'Treasures' },
                { key: 'mystery', emoji: '🎁', name: 'Mystery Boxes' }
              ].map(item => (
                <div
                  key={item.key}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border-4 border-amber-400 hover:scale-105 transition-transform"
                >
                  <div className="text-6xl mb-3">{item.emoji}</div>
                  <p className="text-lg font-bold text-amber-900">{item.name}</p>
                  <div className="text-3xl font-black text-green-600 mt-2">
                    {inventory[item.key]}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-amber-800 text-sm">
                💡 Collect rare items by matching cards perfectly!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Badges Modal */}
      {showBadges && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
          <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl border-4 border-purple-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-purple-900 flex items-center gap-2">
                🏆 {t('achievements')} ({achievements.length}/{Object.keys(getAllBadges()).length})
              </h2>
              <button
                onClick={() => setShowBadges(false)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {Object.values(getAllBadges()).map(badge => {
                const isEarned = achievements.includes(badge.id)
                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl p-4 text-center shadow-lg border-4 transition-all ${
                      isEarned
                        ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 hover:scale-105'
                        : 'bg-gray-300 border-gray-400 opacity-50'
                    }`}
                  >
                    <div className={`text-5xl mb-2 ${!isEarned && 'grayscale'}`}>
                      {badge.emoji}
                    </div>
                    <p className={`text-lg font-bold ${isEarned ? 'text-purple-900' : 'text-gray-600'}`}>
                      {badge.name}
                    </p>
                    <p className={`text-sm ${isEarned ? 'text-purple-700' : 'text-gray-500'}`}>
                      {badge.description}
                    </p>
                    {!isEarned && (
                      <p className="text-xs text-gray-600 mt-1">🔒 Locked</p>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 text-center">
              <p className="text-purple-800 text-sm">
                Keep playing to unlock all achievements! 🎮
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reset to Level 1 Confirmation Popup */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 rounded-3xl p-8 max-w-md text-center shadow-2xl border-4 border-white">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">{t('startOverLevel1')}</h2>
            <p className="text-xl text-purple-700 mb-6">{t('noWorries')}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentLevel(1)
                  setMovesUsed(0)
                  setTotalMovesAvailable(4)
                  setIsWon(false)
                  setIsGameOver(false)
                  if (countdownRef.current) {
                    clearInterval(countdownRef.current)
                    setCountdown(null)
                  }
                  shuffleCards(1)
                  playSound('click', 0.2)
                  setShowResetConfirm(false)
                }}
                className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
              >
                ✅ Yes, Let&apos;s Go!
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false)
                  playSound('click', 0.2)
                }}
                className="bg-red-500 text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
              >
                ❌ Never Mind
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => setShowSettings(true)}
            className="bg-white text-purple-600 font-bold py-1 px-3 rounded text-sm hover:bg-gray-100 transition-colors"
          >
            ⚙️ {t('settings')}
          </button>
          <h1 className="text-xl font-bold text-white">{t('memoryGame')}</h1>
          {gameMode === 'single' && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowInventory(true)}
                className="bg-amber-600 text-white font-bold py-2 px-3 rounded text-lg hover:bg-amber-700 transition-colors shadow-lg"
              >
                🎒
              </button>
              <button
                onClick={() => {
                  setShowBadges(true)
                  setLastViewedBadgeCount(achievements.length)
                }}
                className="bg-purple-600 text-white font-bold py-2 px-3 rounded text-lg hover:bg-purple-700 transition-colors shadow-lg relative"
              >
                🏆
                {achievements.length > lastViewedBadgeCount && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {achievements.length - lastViewedBadgeCount}
                  </span>
                )}
              </button>
            </div>
          )}
          {gameMode !== 'single' && <div className="w-16"></div>}
        </div>


        <div className="text-center mb-2">
          {gameMode === 'single' && (
            <>
              <div className="text-center mb-1">
                <h2 className="text-lg font-bold text-white">{translateLevelName(currentLevelConfig.name)}</h2>
                {/* Progress stars */}
                <div className="flex justify-center gap-1 mt-1">
                  {ageLevels.slice(0, currentLevel).map((_, i) => {
                    const levelStars = starsEarned.find(s => s.level === i + 1)
                    return (
                      <div key={i} className="text-sm">
                        {levelStars ? 
                          Array.from({length: levelStars.stars}, (_, j) => '⭐').join('') : 
                          (i < currentLevel - 1 ? '⭐' : '○')
                        }
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Only show tries for single player */}
              {gameMode === 'single' && (
                <div className="text-center">
                  <p className="text-white text-lg font-bold mb-2">{t('triesLeft')}</p>
                  <div className="flex justify-center gap-1">
                    {[...Array(totalMovesAvailable)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < movesUsed ? 'bg-gray-400' : 'bg-green-400'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-lg font-bold mt-1 ${
                    totalMovesAvailable - movesUsed <= 2 ? 'text-red-300' :
                    totalMovesAvailable - movesUsed <= 5 ? 'text-yellow-300' :
                    'text-green-300'
                  }`}>
                    {totalMovesAvailable - movesUsed} {t('left')}
                  </p>
                </div>
              )}
            </>
          )}
          
          {gameMode === 'multiplayer' && (
            <div className="mb-2">
              <div className="text-center mb-2">
                <h2 className="text-lg font-bold text-black">🏆 {t('firstTo10Wins')} 🏆</h2>
                <p className="text-yellow-200 text-sm">{t('round')} {currentLevel}: {totalCards} {t('cardsFindMatches')}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                {/* Current Turn Display */}
                <div className="text-center">
                  <p className="text-white font-bold text-lg">
                    {gameWinner ?
                      (gameWinner === 'tie' ? t('tie') : `${playerNames[gameWinner] || `${t('player')} ${gameWinner}`} ${t('wins')}`) :
                      `${playerNames[currentPlayer] || `${t('player')} ${currentPlayer}`}${t('sTurn')}`
                    }
                  </p>
                </div>
                
                {/* Players Display - Responsive Layout */}
                <div className={`grid gap-1 w-full max-w-4xl ${
                  numPlayers <= 2 ? 'grid-cols-2' :
                  numPlayers <= 4 ? 'grid-cols-4' :
                  numPlayers <= 6 ? 'grid-cols-6' :
                  'grid-cols-8'
                }`}>
                  {Object.entries(playerScores).map(([player, score]) => {
                    const playerNum = parseInt(player)
                    const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500']
                    const activeColor = colors[(playerNum - 1) % colors.length]
                    
                    return (
                      <div 
                        key={player} 
                        className={`text-center p-1 rounded-lg flex-shrink-0 ${
                          currentPlayer === playerNum ? activeColor : 'bg-gray-500'
                        }`}
                        style={{ minWidth: numPlayers > 6 ? '60px' : '80px' }}
                      >
                        <p className={`text-white font-bold ${numPlayers > 6 ? 'text-xs' : 'text-sm'}`}>
                          {playerNames[player] || `P${player}`}
                        </p>
                        <p className={`text-white font-bold ${numPlayers > 6 ? 'text-sm' : 'text-lg'}`}>
                          {score}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
          
          {isWon && !gameWinner && (
            <div className="text-center mt-2">
              <h2 className="text-4xl font-bold text-yellow-300 animate-bounce mb-2">🎉 {currentLevelConfig.encouragement} 🎉</h2>
              {gameMode === 'single' && (
                <div>
                  <p className="text-white text-2xl font-bold mb-2">{t('youCompleted')} {translateLevelName(currentLevelConfig.name)}!</p>
                  <div className="text-6xl mb-2">⭐ ⭐ ⭐</div>
                </div>
              )}
              {gameMode === 'multiplayer' && !gameWinner && (
                <p className="text-white text-xl">
                  🎯 {t('keepPlayingFirstTo10')}
                </p>
              )}
              {countdown && (
                <div className="text-center mt-4">
                  <p className="text-white text-2xl font-bold mb-2">{t('nextLevelStarting')}</p>
                  <div className="text-8xl font-black text-yellow-300 animate-pulse">
                    {countdown}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {gameWinner && gameMode === 'multiplayer' && (
            <div className="text-center mt-2">
              <h2 className="text-3xl font-bold text-yellow-300 animate-bounce mb-4">🏆 {t('winner')} 🏆</h2>
              <p className="text-white text-xl mb-2">
                {gameWinner === 'tie' ? t('tie') : `${playerNames[gameWinner] || `${t('player')} ${gameWinner}`} ${t('reachedTenPointsFirst')}`}
              </p>
              <div className="text-lg text-yellow-200 mb-4">
                {t('finalScores')} {Object.entries(playerScores).map(([player, score]) => `${playerNames[player] || `${t('player')} ${player}`}: ${score}`).join(' | ')}
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={startMultiplayer}
                  className="mt-2 bg-yellow-400 text-purple-600 font-bold py-2 px-6 rounded-xl text-lg hover:bg-yellow-300 transition-colors transform hover:scale-105"
                >
                  🎮 {t('playAgain')} ({numPlayers} {t('players')})
                </button>
                <button
                  onClick={() => {
                    setGameMode('single')
                    setGameWinner(null)
                    setIsWon(false)
                    setCurrentLevel(1)
                    setMovesUsed(0)
                    setTotalMovesAvailable(4)
                    shuffleCards(1)
                    playSound('click', 0.2)
                  }}
                  className="mt-2 bg-white text-purple-600 font-bold py-2 px-6 rounded-xl text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
                >
                  🏠 Back to Menu
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 flex items-center justify-center relative overflow-auto">
          {isWon && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={300}
              recycle={true}
              gravity={0.2}
              wind={0}
              initialVelocityX={0}
              initialVelocityY={2}
              confettiSource={{
                x: 0,
                y: -50,
                w: windowSize.width,
                h: 50
              }}
            />
          )}
          
          {isGameOver ? (
            <div className="flex items-center justify-center" style={{
              width: `${cardSize * cols + (cols - 1) * 2}px`,
              height: `${cardSize * rows + (rows - 1) * 2}px`
            }}>
              <div className="text-center">
                <h1 className="text-5xl font-bold text-red-400 mb-4">{t('gameOver')}</h1>
                <p className="text-white text-lg">{t('youRanOutOfMoves')}</p>
                <button
                  onClick={() => {
                    if (gameMode === 'single') {
                      setCurrentLevel(1)
                      setMovesUsed(0)
                      setTotalMovesAvailable(4) // Level 1 gets 4 tries
                      shuffleCards(1)
                    } else if (gameMode === 'multiplayer') {
                      setCurrentLevel(1)
                      setMovesUsed(0)
                      setTotalMovesAvailable(999) // Unlimited moves for multiplayer
                      setCurrentPlayer(1)
                      // Reset all player scores
                      const resetScores = {}
                      for (let i = 1; i <= numPlayers; i++) {
                        resetScores[i] = 0
                      }
                      setPlayerScores(resetScores)
                      setGameWinner(null)
                      shuffleCards(1)
                    }
                  }}
                  className="mt-4 bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-600 transition-colors"
                >
                  {t('tryAgain')}
                </button>
              </div>
            </div>
          ) : isWon ? (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              pointerEvents: 'none'
            }}>
              <div className="flex items-center gap-6" style={{ pointerEvents: 'auto' }}>
                <div className="text-6xl animate-pulse">🏆</div>
                <h1 className="text-7xl font-black animate-bounce" style={{
                  background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700, #B8860B)',
                  backgroundSize: '300% 300%',
                  animation: 'gradient 2s ease infinite, bounce 1s infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6)',
                  filter: 'drop-shadow(0 0 10px gold)',
                  isolation: 'isolate'
                }}>
                  {t('youWin')}
                </h1>
                <div className="text-6xl animate-pulse">🏆</div>
              </div>
            </div>
          ) : (
            <div 
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gap: '2px',
                width: `${cardSize * cols + (cols - 1) * 2}px`,
                height: `${cardSize * rows + (rows - 1) * 2}px`
              }}
            >
              {cards.map((card, index) => {
                const selectedColor = CARD_COLORS[cardColor]
                const isRevealed = flippedCards.includes(index) || matchedCards.includes(index)
                const isMatched = matchedCards.includes(index)
                const isHelpRevealed = helpRevealed.includes(index)
                
                return (
                  <div
                    key={card.id}
                    className="card-container cursor-pointer transform hover:scale-105"
                    style={{
                      width: `${cardSize}px`,
                      height: `${cardSize}px`
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className={`card-flip ${isRevealed ? 'card-flipped' : ''} ${
                      isMatched ? 'ring-4 ring-yellow-400' : ''
                    }`}>
                      {/* Card Front (Question Mark Side) */}
                      <div 
                        className={`card-front font-bold shadow-lg ${cardColor === 'default' ? 'text-gray-800' : 'text-white'}`}
                        style={{
                          fontSize: `${Math.max(16, cardSize * 0.4)}px`,
                          background: cardColor === 'rainbow' 
                            ? undefined
                            : `linear-gradient(to bottom right, rgb(${
                                cardColor === 'default' ? '243 244 246' :
                                cardColor === 'blue' ? '96 165 250' :
                                cardColor === 'purple' ? '147 121 254' :
                                cardColor === 'pink' ? '244 114 182' :
                                cardColor === 'green' ? '74 222 128' :
                                cardColor === 'orange' ? '251 146 60' :
                                '248 113 133'
                              }), rgb(${
                                cardColor === 'default' ? '255 255 255' :
                                cardColor === 'blue' ? '37 99 235' :
                                cardColor === 'purple' ? '124 58 237' :
                                cardColor === 'pink' ? '219 39 119' :
                                cardColor === 'green' ? '34 197 94' :
                                cardColor === 'orange' ? '234 88 12' :
                                '220 38 38'
                              }))`,
                          animation: cardColor === 'rainbow' 
                            ? 'rainbow 3s ease-in-out infinite' 
                            : undefined
                        }}
                      >
                        {/* Sparkly Effects for front */}
                        {isSparkly && (
                          <>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                            <div className="absolute top-2 left-2 text-yellow-200 text-lg animate-pulse">✨</div>
                            <div className="absolute top-3 right-3 text-white text-sm animate-ping">⭐</div>
                            <div className="absolute bottom-2 left-3 text-yellow-100 text-xs animate-bounce">💫</div>
                            <div className="absolute bottom-3 right-2 text-blue-200 text-sm animate-pulse" style={{animationDelay: '0.5s'}}>✨</div>
                            <div className="absolute inset-0 rounded-xl overflow-hidden">
                              <div className="absolute w-1 h-1 bg-white rounded-full animate-ping top-4 left-1/2" style={{animationDelay: '0.2s'}}></div>
                              <div className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-bounce top-1/2 right-2" style={{animationDelay: '0.8s'}}></div>
                              <div className="absolute w-1.5 h-1.5 bg-blue-100 rounded-full animate-ping bottom-1/2 left-2" style={{animationDelay: '1.2s'}}></div>
                            </div>
                            <div className="absolute inset-0 rounded-xl opacity-30">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
                            </div>
                          </>
                        )}
                        <span className="text-3xl filter drop-shadow-lg relative z-10">❓</span>
                      </div>

                      {/* Card Back (Emoji Side) */}
                      <div 
                        className="card-back font-bold shadow-lg"
                        style={{
                          fontSize: `${Math.max(16, cardSize * 0.4)}px`,
                          background: cardColor === 'rainbow' 
                            ? undefined
                            : `linear-gradient(to bottom right, rgb(${
                                cardColor === 'default' ? '249 250 251' :
                                cardColor === 'blue' ? '219 234 254' :
                                cardColor === 'purple' ? '237 233 254' :
                                cardColor === 'pink' ? '252 231 243' :
                                cardColor === 'green' ? '220 252 231' :
                                cardColor === 'orange' ? '254 215 170' :
                                '254 205 211'
                              }), rgb(${
                                cardColor === 'default' ? '243 244 246' :
                                cardColor === 'blue' ? '191 219 254' :
                                cardColor === 'purple' ? '221 214 254' :
                                cardColor === 'pink' ? '249 168 212' :
                                cardColor === 'green' ? '187 247 208' :
                                cardColor === 'orange' ? '251 146 60' :
                                '248 113 133'
                              }))`,
                          color: '#374151',
                          animation: cardColor === 'rainbow' 
                            ? 'rainbow-light 3s ease-in-out infinite' 
                            : undefined
                        }}
                      >
                        <span className="relative z-10">{card.emoji}</span>
                      </div>
                    </div>
                    
                    {/* Help Arrow Pointer */}
                    {isHelpRevealed && (
                      <>
                        {/* Arrow pointing from top */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-red-500 animate-pulse"></div>
                          <div className="w-1 h-8 bg-red-500 ml-auto mr-auto animate-pulse"></div>
                        </div>
                        {/* Arrow pointing from left */}
                        <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 z-20">
                          <div className="flex items-center">
                            <div className="w-8 h-1 bg-red-500 animate-pulse"></div>
                            <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-red-500 animate-pulse"></div>
                          </div>
                        </div>
                        {/* Arrow pointing from right */}
                        <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 z-20">
                          <div className="flex items-center">
                            <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-red-500 animate-pulse"></div>
                            <div className="w-8 h-1 bg-red-500 animate-pulse"></div>
                          </div>
                        </div>
                        {/* Arrow pointing from bottom */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-20">
                          <div className="w-1 h-8 bg-red-500 ml-auto mr-auto animate-pulse"></div>
                          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 animate-pulse"></div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
        
        <div className="text-center mt-2 flex justify-center gap-2">
          <button
            onClick={resetLevel}
            className="bg-white text-purple-600 font-bold py-1 px-3 rounded text-sm hover:bg-gray-100 transition-colors"
          >
            🔄 Reset Level
          </button>

          <button
            onClick={() => {
              setShowResetConfirm(true)
            }}
            className="bg-orange-500 text-white font-bold py-1 px-3 rounded text-sm hover:bg-orange-600 transition-colors"
          >
            🏠 Back to Level 1
          </button>

          {/* Help button - only show for 3-5 age group */}
          {playerAge === '3-5' && (
            <button
              onClick={useHelp}
              disabled={hintCooldown}
              className={`font-bold py-1 px-3 rounded text-sm transition-colors ${
                hintCooldown
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              💡 {t('hint')} {hintCooldown ? `(${hintCooldownTime}s)` : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
