import { api } from '../api';

export const getContainers = async () => {
    const { data } = await api.get('containers');
    return data.data;
}

export const getDataById = async (id) => {
    if (id === 0) {
        return [];
    }
    const { data } = await api.get(`containers/${id}`);
    return data.data;
}