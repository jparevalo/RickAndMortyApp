import React, { useState, useEffect} from 'react'
import { characterList } from '../api/characterDB';
import { Character, CharacterListResponse } from '../interfaces/characterInterface';

interface CharacterState {
  characters: Character[];
  nextCharacterPage: string;
}

export const useCharacters = () => {
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(true);
  const [characterState, setCharacterState] = useState<CharacterState>({
    characters: [],
    nextCharacterPage: "2"
  });
  const [currentCharacterPage, setCurrentCharacterPage] = useState("1");
  
  const getCharacters = async () => {
    try {
      const characterListPromise = await characterList({page: currentCharacterPage}).get<CharacterListResponse>('/character');
  
      const response = await Promise.all([characterListPromise]);
      const nextPage = response[0].data.info.next
      setCharacterState({
        characters: [...characterState.characters, ...response[0].data.results],
        nextCharacterPage: nextPage ? nextPage.split('page=')[1] : nextPage
      });
      setIsLoadingCharacters(false);

    } catch (error) {
      console.log(error);
    }
  }
  // useEffect
  useEffect( () => {
    getCharacters();
  }, [])

  // useEffect
  useEffect( () => {
    getCharacters();
  }, [currentCharacterPage])

  return {
    isLoadingCharacters,
    ...characterState,
    setCurrentCharacterPage
  }
}