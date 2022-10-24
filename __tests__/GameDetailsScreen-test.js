import * as React from "react";
import { render, screen } from "@testing-library/react-native";

import GameDetailsScreen from "../src/components/GameDetailsScreen";
import data from "./mock-props-data/GameDetailsScreen-mock-data.json";

const onPressMock = jest.fn();
const eventData = {
  userID: data.userID,
  gameID: data.game.id,
  imageURL: data.image,
  gameTitle: data.game.title,
};

describe("<GameDetailsScreen />", () => {
  it("renders a game's title", () => {
    render(
      <GameDetailsScreen
        game={data.game}
        userGames={data.userGames}
        userID={data.userID}
      />
    );
    expect(screen.getByText("Animal Crossing: New Horizons")).toBeVisible();
  });

  it("renders a game's image", () => {
    render(
      <GameDetailsScreen
        game={data.game}
        userGames={data.userGames}
        userID={data.userID}
      />
    );
    expect(screen.getByTestId("gameDetailsScreenImg")).toHaveProp("source", {
      uri: data.game.image,
    });
  });

  it("renders game genres", () => {
    render(
      <GameDetailsScreen
        game={data.game}
        userGames={data.userGames}
        userID={data.userID}
      />
    );
    expect(screen.getByText("Simulation")).toBeVisible();
  });

  it("renders game consoles", () => {
    render(
      <GameDetailsScreen
        game={data.game}
        userGames={data.userGames}
        userID={data.userID}
      />
    );
    expect(screen.getByText("Nintendo")).toBeVisible();
  });

  it("renders button to favorite game", () => {
    render(
      <GameDetailsScreen
        game={data.game}
        userGames={data.userGames}
        userID={data.userID}
      />
    );
    expect(screen.getByText("Favorite Game")).toBeVisible();
  });
});
