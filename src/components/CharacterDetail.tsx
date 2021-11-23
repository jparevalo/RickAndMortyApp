import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Character, Gender, Status} from '../interfaces/characterInterface';

interface Props {
  character: Character;
}

const CharacterDetail = ( {character}: Props) => {
    const uri = character.image;
    return (
        <>
        {/* Detalles */}
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <View style={{ flexDirection: 'column'}}>
                <Text> STATUS: { character.status }</Text>
                <Text> SPECIES: { character.species }</Text>
                <Text> GENDER: { character.gender }</Text>
                <Text> ORIGIN: { character.origin.name }</Text>
                <Text> {character.status == Status.Alive ? 'YOU CAN FIND ' 
                : character.status == Status.Dead ? 'YOU COULD USUALLY FIND ': 'YOU MAY FIND '} 
                { character.gender == Gender.Female ? 'HER ' : 
                character.gender == Gender.Male ? 'HIM ' : 'IT '} 
                @ { character.location.name }</Text>
            </View>
        </View>
        </>
    )
}

export default CharacterDetail

const styles = StyleSheet.create({
})