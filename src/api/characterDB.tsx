import axios from 'axios';

interface listProps {
    page?: number,
    filter?: string,
}

export const characterList = ({ page = 2, filter = "" }: listProps) => {
    return axios.create({
        baseURL: 'https://rickandmortyapi.com/api/',
        params: {
            page: page,
            name: filter
        }
    });
}

