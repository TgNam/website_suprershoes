import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewColor = async (newColor) => {
    return await authorizeAxiosInstance.post('/color/create-color', newColor);
};

const findAllColor = async () => {
        const response = await authorizeAxiosInstance.get('/color/list-color')
        return response;
};
const findByStatusActiveFromColor = async () => {
        const response = await authorizeAxiosInstance.get('/color/listColorACTIVE')
        return response;

};
const findByName = async (searchName) => {
        const response = await authorizeAxiosInstance.get(`/color/list-color-search?search=${searchName}`)
        return response;
};
const updateStatusColor = (idColor,aBoolean) => {
    return authorizeAxiosInstance.put(`/color/update-status?id=${idColor}&aBoolean=${aBoolean}`);
};

export { findByStatusActiveFromColor, updateStatusColor, postCreateNewColor ,findByName,findAllColor};
