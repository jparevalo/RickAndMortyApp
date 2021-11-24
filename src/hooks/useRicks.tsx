import React, { useState, useEffect} from 'react'
import { characterList } from '../api/characterDB';
import { Character, CharacterListResponse } from '../interfaces/characterInterface';

interface RickState {
  ricks: Character[];
  nextRickPage: string;
}

export const useRicks = () => {
  const [isLoadingRicks, setIsLoadingRicks] = useState(true);
  const [rickState, setRickState] = useState<RickState>({
    ricks: [],
    nextRickPage: "2"
  });
  const [currentRickPage, setCurrentRickPage] = useState("1");
  
  const getRicks = async () => {
    try {
      const rickListPromise = await characterList({filter: 'rick', page: currentRickPage}).get<CharacterListResponse>('/character');
  
      const response = await Promise.all([rickListPromise]);
      const nextPage = response[0].data.info.next
      setRickState({
        ricks: [...rickState.ricks, ...response[0].data.results],
        nextRickPage:  nextPage ? nextPage.split('page=')[1].split('&')[0] : nextPage
      });
      setIsLoadingRicks(false);

    } catch (error) {
      console.log(error);
    }
  }
  // useEffect
  useEffect( () => {
    getRicks();
  }, [])

  // useEffect
  useEffect( () => {
    getRicks();
  }, [currentRickPage])

  return {
    isLoadingRicks,
    ...rickState,
    setCurrentRickPage
  }
}
