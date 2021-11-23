import React, { useState, useEffect} from 'react'
import { characterList } from '../api/characterDB';
import { Character, CharacterListResponse } from '../interfaces/characterInterface';

interface CharacterState {
  characterList: Character[];
  rickList: Character[],
  mortyList: Character[]
}

export const useCharacters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characterState, setCharacterState] = useState<CharacterState>({
    characterList: [],
    rickList: [],
    mortyList: []
  });
  
  const getCharacters = async () => {
    try {
      const characterListPromise = await characterList({}).get<CharacterListResponse>('/character');
      const rickListPromise = await characterList({filter: 'rick'}).get<CharacterListResponse>('/character');
      const mortyListPromise = await characterList({filter: 'morty'}).get<CharacterListResponse>('/character');
  
      const response = await Promise.all([characterListPromise, rickListPromise, mortyListPromise]);
      setCharacterState({
        characterList: response[0].data.results,
        rickList: response[1].data.results,
        mortyList: response[2].data.results,
      });
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  // useEffect
  useEffect( () => {
    getCharacters();
  }, [])

  return {
    isLoading,
    ...characterState
  }
}