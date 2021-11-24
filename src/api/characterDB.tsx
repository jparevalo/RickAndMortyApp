import axios from 'axios';

interface listProps {
    page?: string,
    filter?: string,
}

export const characterList = ({ page = "1", filter = "" }: listProps) => {
    return axios.create({
        baseURL: 'https://rickandmortyapi.com/api/',
        params: {
            page: page,
            name: filter
        }
    });
}

