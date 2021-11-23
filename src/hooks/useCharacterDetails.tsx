import { useEffect, useState } from "react";
import { Character } from "../interfaces/characterInterface";
import { characterList } from "../api/characterDB";

interface CharacterDetail {
  isLoading: boolean;
  character?: Character;
}

export const useCharacterDetails = (characterId: number) => {

  const [state, setstate] = useState<CharacterDetail>({
    isLoading: true,
    character: undefined
  });

  const getCharacterDetails = async () => {
    try {
      const characterDetailsPromise = await characterList({}).get<Character>(`/character/${characterId}`);
      const characterDetailsResponse = await Promise.all([characterDetailsPromise]);

      setstate({
        isLoading: false,
        character: characterDetailsResponse[0].data,
      })
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getCharacterDetails();
  }, [])

  return {
    ...state
  }
}