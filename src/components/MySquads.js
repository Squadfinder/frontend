import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  FlatList,
  Modal,
} from "react-native";
import SquadMemberScreen from "./SquadMemberScreen";

import { getUserSquad, getSingleUser, deleteSquad } from "../apiCalls";
import style from "react-native-modal-picker/style";

let counter = 0;
let color;

const assignColor = () => {
  if (counter === 1) {
    color = "#054890";
  } else if (counter === 2) {
    color = "#8F0000";
  } else if (counter === 3) {
    color = "#068246";
  } else if (counter === 4) {
    color = "#A5AB00";
  }
};

const MySquads = ({ userID }) => {
  const [userSquads, setUserSquads] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [error, setError] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getUserSquad(userID)
        .then(({ data }) => {
          const filteredSquads = data.filter(squad => {
            return squad.attributes.squad.members.some(member => member.id.toString() === userID.toString())
          })
          const squads = filteredSquads.map((attribute) => {
            return {
              id: attribute.id,
              competitive: attribute.attributes.squad.competitive
                ? "Competitive"
                : "Casual",
              eventTime: attribute.attributes.squad["event_time"],
              game: attribute.attributes.squad.game,
              members: attribute.attributes.squad.members,
              numberPlayers: attribute.attributes.squad["number_players"],
            };
          });
          setUserSquads(squads);
        })
        .catch(() => {
          setError("Something went wrong, please try again.");
        });
    }, [])
  );

  const memberIconClickHandler = (id) => {
    setSelectedUser({});
    getSingleUser(id)
      .then((data) => {
        setSelectedUser(data.data);
      })
      .then(() => setModalVisible(true));
  };

  const deleteSquadHandler = (userID, squadID) => {
    deleteSquad(userID, squadID)
      .then((response) => {
        // leaving in these logs since there isn't built in error handling yet
        console.log(response.ok);
        const updateUserSquads = userSquads.filter(
          (squad) => squad.id !== squadID
        );
        setUserSquads(updateUserSquads);
      })
      .catch(() => {
        setError("Something went wrong. You did not leave this squad.");
      });
  };

  return error ? (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SquadMemberScreen
          user={selectedUser}
          setModalVisible={setModalVisible}
        />
      </Modal>
      <FlatList
        data={userSquads}
        contentContainerStyle={{ paddingBottom: 200 }}
        keyExtractor={(squadData) => squadData.id}
        renderItem={(squadData) => {
          counter = 0;
          return (
            <View style={styles.squadCard}>
              <FlatList
                data={squadData.item.members}
                contentContainerStyle={styles.memberIcons}
                horizontal={true}
                keyExtractor={(memberData) =>
                  memberData.gamertag + Math.random() * 100
                }
                renderItem={(memberData) => {
                  counter++;
                  assignColor();
                  return (
                    <Pressable
                      onPress={() => memberIconClickHandler(memberData.item.id)}
                    >
                      <Text style={[styles.icon, { borderColor: color }]}>
                        {memberData.item.gamertag[0]}
                      </Text>
                    </Pressable>
                  );
                }}
              />
              <View style={styles.lowerContainer}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.squadDetails}>{squadData.item.game}</Text>
                  <Text style={styles.squadDetails}>
                    {new Date(squadData.item.eventTime).toLocaleTimeString([], {
                      timeStyle: "short",
                    })}{" "}
                    - {new Date(squadData.item.eventTime).toLocaleDateString()}
                  </Text>
                  <Text style={styles.squadDetails}>
                    {squadData.item.competitive}
                  </Text>
                </View>
                <Pressable
                  onPress={() => deleteSquadHandler(userID, squadData.item.id)}
                  style={styles.notGoing}
                >
                  <Text style={styles.notGoingText}>Not Going</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#201626",
    alignItems: "center",
  },
  error: {
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 20
  },
  squadCard: {
    width: "95%",
    alignItems: "center",
    marginLeft: 7,
    marginTop: 30,
    backgroundColor: "#352540",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
  },
  memberIcons: {
    justifyContent: "space-evenly",
    width: "80%",
    marginTop: 10,
  },
  icon: {
    padding: 3,
    aspectRatio: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    borderWidth: 2,
    borderRadius: 23,
  },
  lowerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
  },
  detailsContainer: {
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#393051",
    borderRadius: 30,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#000",
  },
  squadDetails: {
    padding: 5,
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  notGoing: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#393051",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
  },
  notGoingText: {
    color: "#fff",
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default MySquads;
