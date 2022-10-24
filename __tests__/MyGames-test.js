import { render, screen } from "@testing-library/react-native";

import MyGames from "../src/components/MyGames";
import data from "./mock-props-data/GameDetailsScreen-mock-data.json";

describe("<MyGames />", () => {
  it("Should be able to see a text input for filtering through My Games", () => {
    render(<MyGames userGames={data.userGames} userID={data.userID} />);

    expect(screen.getByTestId("search-bar")).toBeVisible();
  });

  it("Should render game icons for each game the user has favorited", () => {
    render(<MyGames userGames={data.userGames} userID={data.userID} />);

    expect(screen.getByTestId("users-game-icon-1")).toBeVisible();
    expect(screen.getByTestId("users-game-icon-33")).toBeVisible();
    expect(screen.getByTestId("users-game-icon-38")).toBeVisible();
    expect(screen.getByTestId("users-game-icon-42")).toBeVisible();
  });

  it("Should display the title of each game on each icon", () => {
    render(<MyGames userGames={data.userGames} userID={data.userID} />);

    expect(screen.getByText("Halo Infinite")).toBeVisible();
    expect(screen.getByText("Grand Theft Auto V")).toBeVisible();
    expect(screen.getByText("Elden Ring")).toBeVisible();
    expect(screen.getByText(".dog")).toBeVisible();
  });

  it("Should display a game image on each icon", () => {
    render(<MyGames userGames={data.userGames} userID={data.userID} />);

    expect(screen.getByTestId("users-game-icon-1")).toHaveProp("source", {
      uri: "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg",
    });
    expect(screen.getByTestId("users-game-icon-33")).toHaveProp("source", {
      uri: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    });
    expect(screen.getByTestId("users-game-icon-38")).toHaveProp("source", {
      uri: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg",
    });
    expect(screen.getByTestId("users-game-icon-42")).toHaveProp("source", {
      uri: "https://media.rawg.io/media/screenshots/39d/39daf0eae99c1bb2ac0b011ccc039da4.jpg",
    });
  });
});