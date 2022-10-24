import { render, screen } from "@testing-library/react-native";

import HomeScreen from "../src/components/HomeScreen";
import data from "./mock-props-data/HomeScreen-mock-data.json";
import { NavigationContainer } from "@react-navigation/native";

describe("<HomeScreen />", () => {
  it("renders a user's gamertag", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.noError}
        />
      </NavigationContainer>
    );
    expect(screen.getByText("blake")).toBeVisible();
  });

  it("renders a user's preferred console", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.noError}
        />
      </NavigationContainer>
    );
    expect(screen.getByText("PC")).toBeVisible();
  });

  it("renders a 'My Games' prompt", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.noError}
        />
      </NavigationContainer>
    );
    expect(screen.getByText("My Games:")).toBeVisible();
  });

  it("renders a swiper of images for the games that exist in the user's list", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.noError}
        />
      </NavigationContainer>
    );
    expect(screen.getByTestId("gameSwiper")).toBeVisible();
    expect(screen.getAllByTestId("homeScreenImg")[1]).toHaveProp("source", {
      uri: data.userGames[0].image_url,
    });
  });

  it("renders the titles of the games in the swiper", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.noError}
        />
      </NavigationContainer>
    );
    expect(screen.getAllByText("Halo Infinite")[0]).toBeVisible();
  });

  it("renders a button to edit the user's game list", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.noError}
        />
      </NavigationContainer>
    );
    expect(screen.getByText("Edit My Games List")).toBeVisible();
    expect(screen.getByTestId("editGamesBtn")).toHaveProp("onClick")
  });

  it("renders a message crediting RAWG for our source of game data", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.noError}
        />
      </NavigationContainer>
    );
    expect(screen.getByText("Powered by RAWG")).toBeVisible();
  });

  it("renders an error message if there was an issue retrieving the user data", () => {
    render(
      <NavigationContainer>
        <HomeScreen
          user={data.user}
          myGames={data.userGames}
          error={data.error}
        />
      </NavigationContainer>
    );
    expect(screen.getByText("Looks like something went wrong retrieving the user data.")).toBeVisible();
  });
});
