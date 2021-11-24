import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, ScrollView, Dimensions, Text, TextInput } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCharacters } from '../hooks/useCharacters';
import { useRicks } from '../hooks/useRicks';
import { useMortys } from '../hooks/useMortys';
import CharacterCard from '../components/CharacterCard';
import HorizontalSlider from '../components/HorizontalSlider';
import SearchInput from '../components/SearchInput';

const { width: windowWidth } = Dimensions.get('window');

const HomeScreen = () => {

  const {characters, nextCharacterPage, isLoadingCharacters, setCurrentCharacterPage, setFilter} = useCharacters();
  const {ricks, nextRickPage, isLoadingRicks, setCurrentRickPage} = useRicks();
  const {mortys, nextMortyPage, isLoadingMortys, setCurrentMortyPage} = useMortys();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (val : string) => {
    console.log(val);
    setSearchInput(val);
    setFilter(val);
  }

  const _handleLoadMoreCharacters = () => {
    if(nextCharacterPage){
      setCurrentCharacterPage(nextCharacterPage);
    }
  };

  const _handleLoadMoreRicks = () => {
    if(nextRickPage){
      setCurrentRickPage(nextRickPage);
    }
  };

  const _handleLoadMoreMortys = () => {
    if(nextMortyPage){
      setCurrentMortyPage(nextMortyPage);
    }
  };

  useEffect( () => {
    setFilter(searchInput);
  }, [searchInput])
  
  const { top }  =  useSafeAreaInsets(); // para ios y android
  if(isLoadingCharacters || isLoadingMortys || isLoadingRicks) {
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
        <HorizontalSlider title="Ricks"  characters={ricks} nextPageFunction={_handleLoadMoreRicks}/>
        <HorizontalSlider title="Mortys"  characters={mortys} nextPageFunction={_handleLoadMoreMortys}/>

        {/* All Characters */}
        <View style={{ height: 500 }}>
          <Text style={styles.titulo}>All Characters</Text>
          <SearchInput 
            onChange={handleSearchChange}
            value={searchInput}
          />
          <Carousel 
            data={characters}
            renderItem={({ item }: any) => <CharacterCard character={item}/>}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.8}
            onEndReached={_handleLoadMoreCharacters}
            onEndReachedThreshold={1}
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