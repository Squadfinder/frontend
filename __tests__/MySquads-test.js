import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import MySquads from "../src/components/MySquads";
import data from "./mock-props-data/GameDetailsScreen-mock-data.json";

describe("<MySquads />", () => {
  it("Should render a list of the user's squads", async () => {
      render(
        <NavigationContainer>
          <MySquads userID={data.userID} />
        </NavigationContainer>
        )
      
      expect(screen.getByTestId("squad-list")).toBeVisible();
      expect(screen.findByText("Fall Guys: Ultimate Knockout")).toBeTruthy();
      expect(screen.findByText("League of Legends")).toBeTruthy();
      expect(screen.findByText("Fall Guys: Ultimate Knockout")).toBeTruthy();
      expect(screen.findByText("Fall Guys: Ultimate Knockout")).toBeTruthy();
      expect(screen.findByText("Fall Guys: Ultimate Knockout")).toBeTruthy();
      expect(screen.findByText("PlayerUnknown’s Battlegrounds")).toBeTruthy();
      
      expect(screen.findByTestId("squad-card-13")).toBeTruthy();
      expect(screen.findByTestId("squad-card-18")).toBeTruthy();
      expect(screen.findByTestId("squad-card-25")).toBeTruthy();
      expect(screen.findByTestId("squad-card-28")).toBeTruthy();
      expect(screen.findByTestId("squad-card-44")).toBeTruthy();
      expect(screen.findByTestId("squad-card-56")).toBeTruthy();
    });
  });