import React from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import Swiper from "react-native-swiper";

const SquadMemberScreen = ({ user, setModalVisible }) => {

  let games = user.attributes.user_games.map((game) => {
    return (
      <View
        style={{ justifyContent: "center", alignItems: "center" }}
        key={game.id}
      >
        <Image
          source={{ uri: game.image_url }}
          style={styles.swiperSlide}
        ></Image>
        <Text style={styles.gameTitle}>{game.game_title}</Text>
      </View>
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.info}>
        <Text style={styles.userInfo}>{user.attributes.gamertag}</Text>
        <Text style={styles.userInfo}>{user.attributes.platform}</Text>
      </View>
      <Text style={[styles.userInfo, { marginTop: 25 }]}>{user.attributes.gamertag}'s Games:</Text>
      <View style={styles.swiper}>
        <Swiper showsButtons={true} showsPagination={false} containerStyle={{ height: 60 }}>
          {games}
        </Swiper>
      </View>
      <Pressable style={styles.close} onPress={() => setModalVisible(false)}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable>
      <Text style={styles.rawg}>Powered by RAWG</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#352540",
    alignItems: "center",
  },
  info: {
    height: "12%",
    backgroundColor: "#483F6D",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3AE456",
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 60,
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
    height: "95%",
    width: "70%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
  },
  gameTitle: {
    position: 'absolute',
    bottom: 30,
    width: '69%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,.6)',
    overflow: 'hidden'
  },
  close: {
    backgroundColor: "#3AE456",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
  closeText: {
    fontWeight: "bold"
  },
  rawg: {
    height: "5%",
    marginTop: 90,
  },
});

export default SquadMemberScreen;