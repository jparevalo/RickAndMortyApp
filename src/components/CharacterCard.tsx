import React from 'react'
import { StyleSheet, ImageBackground, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { Character } from '../interfaces/characterInterface';
import { CommonActions } from '@react-navigation/routers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

interface Props {
  character: Character,
  height?: number,
  width?: number
}

const CharacterCard = ({ character, height = 420, width = 300 }: Props) => {
  const uri = character.image;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={ () => navigation.dispatch(CommonActions.navigate('DetailScreen', character))} 
      activeOpacity={0.9}
      style={{
          width,
          height,
          marginHorizontal: 8
        }}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri }}
          style={styles.image}
          >
            <Text style={styles.characterName}>{character.name}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    flexGrow: 1,
    borderRadius: 18,
    justifyContent:'flex-end',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    justifyContent: 'center',
    elevation: 12,
  },
  characterName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5
  }
})

export default CharacterCard