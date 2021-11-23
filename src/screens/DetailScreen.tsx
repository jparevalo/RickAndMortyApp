import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import CharacterDetail from '../components/CharacterDetail'


// no importa que tan grande es la pantalla siempre voy a tomar el 100% height
const screenHeight = Dimensions.get('screen').height;
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{

}
const DetailScreen = ({ route, navigation}: Props) => {
  // console.log(route.params)
  const selectedCharacter = route.params;
  const uri = selectedCharacter.image;

  // Just calling the detail API to prove nested API behaviour (Character interface from list already has all data)
  const {isLoading, character} = useCharacterDetails(selectedCharacter.id);
 
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.characterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.characterName}>{selectedCharacter.name}</Text>
      </View>

      {
        isLoading? <ActivityIndicator size={35} color="grey" style={{ marginTop: 20}}/>: <CharacterDetail character={character!}/>
      }
    </ScrollView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight *0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden', // para que ningun hijo se salga de sus bordes
  },
  characterImage: {
    flex: 1
  },
  marginContainer:{
    marginTop: 20,
    marginHorizontal: 20
  },
  characterName: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold'
  },
})