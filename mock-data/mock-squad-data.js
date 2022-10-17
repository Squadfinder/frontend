import { userGames } from './MockGamesList';

const squads = [
  {
    game: 'Halo 2',
    day: '10/31/2022',
    time: '6:00pm MT',
    numPlayers: 3,
    competitive: true,
    members: [
      {
        gamertag: 'TheLizardKing25',
        preferredPlatform: 'Xbox',
        gamesList: [userGames[0], userGames[1], userGames[2]]
      },
      {
        gamertag: 'Nick2Legit',
        preferredPlatform: 'PC',
        gamesList: [userGames[1], userGames[3], userGames[4]]
      },
      {
        gamertag: 'WiffLord',
        prefferedPlatform: 'Switch',
        gamesList: [userGames[1], userGames[5], userGames[6]]
      }
    ]
  },
  {
    game: 'Fall Guys',
    day: '10/22/2022',
    time: '4:20pm MT',
    numPlayers: 4,
    competitive: false,
    members: [
      {
        gamertag: 'TheLizardKing25',
        preferredPlatform: 'Xbox',
        gamesList: [userGames[0], userGames[13], userGames[2]]
      },
      {
        gamertag: 'Nick2Legit',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[3], userGames[4]]
      },
      {
        gamertag: 'WiffLord',
        prefferedPlatform: 'Switch',
        gamesList: [userGames[13], userGames[5], userGames[6]]
      },
      {
        gamertag: 'Blake',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[14], userGames[0]]
      }
    ]
  }
]

export { squads }