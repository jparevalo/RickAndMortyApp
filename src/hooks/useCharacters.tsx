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
  const [filter, setFilter] = useState('');
  
  const getCharacters = async (clear = false) => {
    try {
      const characterListPromise = await characterList({page: currentCharacterPage, filter: filter}).get<CharacterListResponse>('/character');
  
      const response = await Promise.all([characterListPromise]);
      const nextPage = response[0].data.info.next;

      let characterResults = response[0].data.results;
      if (!clear){
        characterResults = [...characterState.characters, ...characterResults]
      }

      setCharacterState({
        characters: characterResults,
        nextCharacterPage: nextPage ? nextPage.split('page=')[1].split('&')[0] : nextPage
      });
      setIsLoadingCharacters(false);

    } catch (error) {
      console.log(error);
      setCharacterState({
        characters: [],
        nextCharacterPage: ""
      });
    }
  }
  // useEffect
  useEffect( () => {
    getCharacters();
  }, [])

  useEffect( () => {
    getCharacters();
  }, [currentCharacterPage, filter])

  useEffect( () => {
    setCurrentCharacterPage("1");
    getCharacters(true);
  }, [filter])

  return {
    isLoadingCharacters,
    ...characterState,
    setCurrentCharacterPage,
    setFilter
  }
}