import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Swiper from "react-native-swiper";

const HomeScreen = ({ user, myGames }) => {
  const navigation = useNavigation();

  let games = myGames.map((game) => {
    return (
      <View
        style={{ justifyContent: "center", alignItems: "center" }}
        key={game.id}
      >
        <Pressable
          style={styles.swiperSlide}
          onPress={() => imageClickHandler(game)}
        >
          <Image
            source={{ uri: game.image_url }}
            style={{ height: "100%", width: "100%", borderRadius: 20 }}
          ></Image>
          <Text style={styles.gameTitle}>{game.game_title}</Text>
        </Pressable>
      </View>
    );
  });

  if (user.attributes) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>SquadFinder</Text>
        <View style={styles.info}>
          <Text style={styles.userInfo}>{user.attributes.gamertag}</Text>
          <Text style={styles.userInfo}>{user.attributes.platform}</Text>
        </View>
        <Text style={styles.userInfo}>My Games:</Text>
        <View style={styles.swiper}>
          <Swiper showsButtons={true} showsPagination={false}>
            {games}
          </Swiper>
        </View>
        <Pressable
          style={styles.editButton}
          title="Edit My Games"
          onPress={() => navigation.navigate("My Games")}
        >
          <Text style={{ color: "#fff" }}>Edit My Games List</Text>
        </Pressable>
        <Text style={styles.rawg}>Powered by RAWG</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201626",
    alignItems: "center",
  },
  header: {
    height: "8%",
    width: "100%",
    fontSize: 35,
    backgroundColor: "#483F6D",
    color: "#3AE456",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
  },
  info: {
    height: "12%",
    backgroundColor: "#483F6D",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 50,
    marginBottom: 10,
  },
  userInfo: {
    color: "#fff",
    marginTop: 5,
    fontSize: 20,
  },
  swiper: {
    height: "55%",
  },
  swiperSlide: {
    height: "90%",
    width: "70%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
  },
  gameTitle: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,.6)',
    overflow: 'hidden'
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "6%",
    width: "40%",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    backgroundColor: "#483F6D",
    marginTop: 10,
  },
  rawg: {
    height: "5%",
    marginTop: 20,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
  },
});

export default HomeScreen;
