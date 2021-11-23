import React from 'react';
import { ActivityIndicator, StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard';
import HorizontalSlider from '../components/HorizontalSlider';

const { width: windowWidth } = Dimensions.get('window');

const HomeScreen = () => {

  const {characterList, rickList, mortyList, isLoading} = useCharacters();
  const { top }  =  useSafeAreaInsets(); // para ios y android
  if(isLoading) {
    return(
      <View style={styles.loading}>
        <ActivityIndicator color="blue" size={80}/>
      </View>
    )
  }
  return (
    <ScrollView>
      <View style={{ marginTop: top + 20 }}>

        {/* Ricks & Mortys */}
        <HorizontalSlider title="Ricks"  characters={rickList} />
        <HorizontalSlider title="Mortys"  characters={mortyList} />

        {/* All Characters */}
        <View style={{ height: 500 }}>
          <Text style={styles.titulo}>All Characters</Text>
          <Carousel 
            data={characterList}
            renderItem={({ item }: any) => <CharacterCard character={item}/>}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.8}
          />
        </View>
        
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  }
})