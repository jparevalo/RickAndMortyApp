import React, { useState, useEffect} from 'react'
import { characterList } from '../api/characterDB';
import { Character, CharacterListResponse } from '../interfaces/characterInterface';

interface MortyState {
  mortys: Character[];
  nextMortyPage: string;
}

export const useMortys = () => {
  const [isLoadingMortys, setIsLoadingMortys] = useState(true);
  const [mortyState, setMortyState] = useState<MortyState>({
    mortys: [],
    nextMortyPage: "2"
  });
  const [currentMortyPage, setCurrentMortyPage] = useState("1");
  
  const getMortys = async () => {
    try {
      const mortyListPromise = await characterList({filter: 'morty', page: currentMortyPage}).get<CharacterListResponse>('/character');
  
      const response = await Promise.all([mortyListPromise]);
      const nextPage = response[0].data.info.next
      setMortyState({
        mortys: [...mortyState.mortys, ...response[0].data.results],
        nextMortyPage:  nextPage ? nextPage.split('page=')[1].split('&')[0] : nextPage
      });
      setIsLoadingMortys(false);

    } catch (error) {
      console.log(error);
    }
  }
  // useEffect
  useEffect( () => {
    getMortys();
  }, [])

  // useEffect
  useEffect( () => {
    getMortys();
  }, [currentMortyPage])

  return {
    isLoadingMortys,
    ...mortyState,
    setCurrentMortyPage
  }
}
