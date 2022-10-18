import { games } from './mock-game-data';

let users = [
  {
    id: 1,
    gamertag: "TheLizardKing25",
    preferredPlatform: "Xbox",
    gamesList: games,
  },
  {
    id: 2,
    gamertag: "HappyKitty",
    preferredPlatform: "Xbox",
    gamesList: games,
  },
  {
    id: 3,
    gamertag: "GreatMate",
    preferredPlatform: "PlayStation",
    gamesList: games,
  },
  {
    id: 4,
    gamertag: "WildWind43",
    preferredPlatform: "Xbox",
    gamesList: [],
  },
];

export { users }