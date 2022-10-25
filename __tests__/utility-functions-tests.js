import { sortGames, sortSquads } from "../src/utility-functions";
import games from "./mock-props-data/GameDetailsScreen-mock-data.json";
import squads from "./mock-props-data/user-squads-mock-data.json";

describe("utility-functions", () => {
  it("Should sort game by title in alphabetical order", () => {
    const sortedGames = sortGames(games.userGames);
    expect(sortedGames).toStrictEqual([
      {
        created_at: "2022-10-23T01:33:04.112Z",
        game_id: 699000,
        game_title: ".dog",
        id: 42,
        image_url:
          "https://media.rawg.io/media/screenshots/39d/39daf0eae99c1bb2ac0b011ccc039da4.jpg",
        updated_at: "2022-10-23T01:33:04.112Z",
        user_id: 1,
      },
      {
        created_at: "2022-10-23T01:15:09.626Z",
        game_id: 326243,
        game_title: "Elden Ring",
        id: 38,
        image_url:
          "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg",
        updated_at: "2022-10-23T01:15:09.626Z",
        user_id: 1,
      },
      {
        created_at: "2022-10-22T19:24:48.710Z",
        game_id: 3498,
        game_title: "Grand Theft Auto V",
        id: 33,
        image_url:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        updated_at: "2022-10-22T19:24:48.710Z",
        user_id: 1,
      },
      {
        created_at: "2022-10-19T23:51:11.588Z",
        game_id: 58751,
        game_title: "Halo Infinite",
        id: 1,
        image_url:
          "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg",
        updated_at: "2022-10-19T23:51:11.588Z",
        user_id: 1,
      },
    ]);
  });

  it("Should sort squads by date, closest to farthest away", () => {
    const sortedSquads = sortSquads(squads.data);
    expect(sortedSquads).toStrictEqual([
      {
        id: "2",
        type: "user_squad",
        attributes: {
          squad: {
            game: "Halo: Infinite",
            event_time: "2022-10-25T15:26:50.369Z",
            number_players: 4,
            competitive: false,
            members: [
              {
                id: 1,
                gamertag: "Blake",
                platform: "PC",
                created_at: "2022-10-25T15:26:50.196Z",
                updated_at: "2022-10-25T15:26:50.196Z",
              },
              {
                id: 2,
                gamertag: "Mike",
                platform: "PS5",
                created_at: "2022-10-25T15:26:50.201Z",
                updated_at: "2022-10-25T15:26:50.201Z",
              },
              {
                id: 3,
                gamertag: "Thomas",
                platform: "Xbox",
                created_at: "2022-10-25T15:26:50.205Z",
                updated_at: "2022-10-25T15:26:50.205Z",
              },
              {
                id: 4,
                gamertag: "Wes",
                platform: "Xbox",
                created_at: "2022-10-25T15:26:50.209Z",
                updated_at: "2022-10-25T15:26:50.209Z",
              },
            ],
          },
        },
      },
      {
        id: "10",
        type: "user_squad",
        attributes: {
          squad: {
            game: "Fall Guys: Ultimate Knockout",
            event_time: "2022-10-25T15:26:50.387Z",
            number_players: 2,
            competitive: false,
            members: [
              {
                id: 5,
                gamertag: "Anna",
                platform: "PC",
                created_at: "2022-10-25T15:26:50.212Z",
                updated_at: "2022-10-25T15:26:50.212Z",
              },
              {
                id: 2,
                gamertag: "Mike",
                platform: "PS5",
                created_at: "2022-10-25T15:26:50.201Z",
                updated_at: "2022-10-25T15:26:50.201Z",
              },
            ],
          },
        },
      },
      {
        id: "22",
        type: "user_squad",
        attributes: {
          squad: {
            game: "Fall Guys: Ultimate Knockout",
            event_time: "2022-10-28T19:00:00.000Z",
            number_players: 3,
            competitive: false,
            members: [
              {
                id: 6,
                gamertag: "Tom",
                platform: "PS5",
                created_at: "2022-10-25T15:26:50.231Z",
                updated_at: "2022-10-25T15:26:50.231Z",
              },
              {
                id: 5,
                gamertag: "Anna",
                platform: "PC",
                created_at: "2022-10-25T15:26:50.212Z",
                updated_at: "2022-10-25T15:26:50.212Z",
              },
              {
                id: 1,
                gamertag: "Blake",
                platform: "PC",
                created_at: "2022-10-25T15:26:50.196Z",
                updated_at: "2022-10-25T15:26:50.196Z",
              },
              {
                id: 2,
                gamertag: "Mike",
                platform: "PS5",
                created_at: "2022-10-25T15:26:50.201Z",
                updated_at: "2022-10-25T15:26:50.201Z",
              },
            ],
          },
        },
      },
    ]);
  });
});
