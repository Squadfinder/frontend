import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, FlatList } from "react-native";

import { squads } from "../../mock-data/mock-squad-data";

let competitive;
let counter = 0;
let color;

const assignColor = () => {
  if (counter === 1) {
    color = "#0000FF";
  } else if (counter === 2) {
    color = "#FF0000";
  } else if (counter === 3) {
    color = "#00FF00";
  } else if (counter === 4) {
    color = "#FFFF00";
  }
};

const assignCompetitive = (squad) => {
  if (squad.competitive === true) {
    competitive = "Competitive";
  } else {
    competitive = "Casual";
  }
};

const MySquads = () => {
  const [userSquads, setUserSquads] = useState([]);

  useEffect(() => {
    setUserSquads(squads);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={userSquads}
        contentContainerStyle={styles.cardContainer}
        renderItem={(squadData) => {
          assignCompetitive(squadData.item);
          counter = 0;
          return (
            <View style={styles.squadCard}>
              <FlatList
                data={squadData.item.members}
                contentContainerStyle={styles.memberIcons}
                horizontal={true}
                renderItem={(memberData) => {
                  counter++;
                  assignColor();
                  return (
                    <Pressable>
                      <Text style={[styles.icon, { borderColor: color }]}>
                        {memberData.item.gamertag[0]}
                      </Text>
                    </Pressable>
                  );
                }}
              ></FlatList>
              <View style={styles.lowerContainer}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.squadDetails}>{squadData.item.game}</Text>
                  <Text style={styles.squadDetails}>
                    {squadData.item.time} - {squadData.item.day}
                  </Text>
                  <Text style={styles.squadDetails}>{competitive}</Text>
                </View>
                <Pressable style={styles.notGoing}>
                  <Text style={styles.notGoingText}>Not Going</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#352540",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
  },
  squadCard: {
    height: 150,
    width: "95%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#483F6D",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 50,
  },
  memberIcons: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "90%",
    marginTop: 5,
  },
  icon: {
    height: "95%",
    width: 50,
    textAlign: "center",
    color: "#fff",
    fontSize: 35,
    borderWidth: 2,
    borderRadius: 23,
  },
  lowerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "60%",
    width: "95%",
  },
  detailsContainer: {
    height: "80%",
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 30,
  },
  squadDetails: {
    color: "#fff",
    fontSize: 15,
  },
  notGoing: {
    justifyContent: "center",
    alignItems: "center",
    height: "35%",
    width: "28%",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
  },
  notGoingText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default MySquads;
