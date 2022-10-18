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
        gamertag: 'Tom',
        preferredPlatform: 'Xbox',
        gamesList: [userGames[0], userGames[1], userGames[2]]
      },
      {
        gamertag: 'Nick',
        preferredPlatform: 'PC',
        gamesList: [userGames[1], userGames[3], userGames[4]]
      },
      {
        gamertag: 'Anna',
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
        gamertag: 'Mike',
        preferredPlatform: 'Xbox',
        gamesList: [userGames[0], userGames[13], userGames[2]]
      },
      {
        gamertag: 'Thomas',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[3], userGames[4]]
      },
      {
        gamertag: 'Blake',
        prefferedPlatform: 'Switch',
        gamesList: [userGames[13], userGames[5], userGames[6]]
      },
      {
        gamertag: 'Wes',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[14], userGames[0]]
      }
    ]
  },
  {
    game: 'PUBG',
    day: '10/18/2022',
    time: '2:00pm MT',
    numPlayers: 4,
    competitive: true,
    members: [
      {
        gamertag: 'Mike',
        preferredPlatform: 'Xbox',
        gamesList: [userGames[0], userGames[13], userGames[2]]
      },
      {
        gamertag: 'Blake',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[3], userGames[4]]
      },
      {
        gamertag: 'Tom',
        prefferedPlatform: 'Switch',
        gamesList: [userGames[13], userGames[5], userGames[6]]
      },
      {
        gamertag: 'Thomas',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[14], userGames[0]]
      }
    ]
  },
  {
    game: 'Grounded',
    day: '11/1/2022',
    time: '8:00pm MT',
    numPlayers: 4,
    competitive: false,
    members: [
      {
        gamertag: 'Tom',
        preferredPlatform: 'Xbox',
        gamesList: [userGames[0], userGames[13], userGames[2]]
      },
      {
        gamertag: 'Mike',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[3], userGames[4]]
      },
    ]
  },
  {
    game: 'Halo Infinite',
    day: '10/22/2022',
    time: '4:20pm MT',
    numPlayers: 4,
    competitive: false,
    members: [
      {
        gamertag: 'Blake',
        preferredPlatform: 'Xbox',
        gamesList: [userGames[0], userGames[13], userGames[2]]
      },
      {
        gamertag: 'Anna',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[3], userGames[4]]
      },
      {
        gamertag: 'Mike',
        prefferedPlatform: 'Switch',
        gamesList: [userGames[13], userGames[5], userGames[6]]
      },
      {
        gamertag: 'Nick',
        preferredPlatform: 'PC',
        gamesList: [userGames[13], userGames[14], userGames[0]]
      }
    ]
  }
]

export { squads }