import React from 'react';
import { StyleSheet, View, Button, Pressable, Image, Text } from "react-native";

import { squads } from "../../mock-data/mock-squad-data";

let squadCounter = 0;
let memberCounter = 0;
let playerColor = ['#000', '#0000FF', '#FF0000', '#00FF00', '#FFFF00']
let index = 0;
let competitive;

let mySquads = squads.map(squad => {
  index = 0;
  squadCounter++;
  let playerIcons = squad.members.map(member => {
    squad.competitive === true ? competitive = 'Competitive' : competitive = 'Casual'
    memberCounter++
    index++
    return (
      <Text
        key={memberCounter}
        style={{
          textAlign: 'center',
          height: '95%',
          width: '15%',
          fontSize: 25,
          paddingTop: 10,
          borderWidth: 2,
          borderColor: playerColor[index],
          borderRadius: 25
        }}
      >
        {member.gamertag[0]}
      </Text>
  )})
  return (
    <View
      key={squadCounter}
      style={{
        alignItems: 'center',
        height: '20%',
        width: '90%',
        borderWidth: 1,
        borderColor: "#3AE456",
        borderRadius: 50,
      }}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', height: '40%', width: '90%'}}>
        {playerIcons}
      </View>
      <View>
        <Text>{squad.game}</Text>
        <Text>{`${squad.day} - ${squad.time}`}</Text>
        <Text>{competitive}</Text>
      </View>
    </View>
  )
})

const MySquads = () => {
  return (
    <View style={styles.container}>
      <Text>MySquads Screen</Text>
      {mySquads}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#352540",
    alignItems: 'center'
  },
})

export default MySquads;
