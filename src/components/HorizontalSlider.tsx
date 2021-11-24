import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Character } from '../interfaces/characterInterface';
import CharacterCard from './CharacterCard';

interface Props {
  title?: string;
  characters: Character[];
  nextPageFunction: Function;
}
const HorizontalSlider = ({ title, characters, nextPageFunction }: Props ) => {
  
  return (
    <View style={{ height: (title)? 260: 230}} >
      {
        // true && true
        title && <Text style={styles.titulo}>{title}</Text>
      }
      <FlatList 
        data={characters}
        renderItem={({ item }) => (<CharacterCard character={item} width={140} height={200}/>)}
        keyExtractor={(item) => item.id.toString()+'_'+title}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => nextPageFunction()}
        onEndReachedThreshold={1}
      />
    </View>
  )
}

export default HorizontalSlider

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  }
})