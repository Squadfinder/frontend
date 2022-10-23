import * as React from 'react';
import { render, screen } from '@testing-library/react-native';

import GameDetailsScreen from "../src/components/GameDetailsScreen";
import data from "./mock-data/GameDetailsScreen-mock-data.json";

describe("<GameDetailsScreen />", () => {
    it("renders a game's title", () => {
        render(<GameDetailsScreen game={data.game} userGames={data.userGames} userID={data.userID} />);
        expect(screen.getByText("Animal Crossing: New Horizons")).toBeVisible();
    }) 
})