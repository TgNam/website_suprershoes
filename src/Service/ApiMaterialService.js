import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewMaterial = async (newMaterial) => {
    return await authorizeAxiosInstance.post('/material/create-material', newMaterial);
};

const findByStatusActiveFromMaterial = async () => {
    const response = await authorizeAxiosInstance.get('/material/list-material')
    return response;

};
const findByName = async (searchName) => {
    const response = await authorizeAxiosInstance.get(`/material/list-material-search?search=${searchName}`)
    return response;

};
const updateStatusMaterial = (idMaterial, aBoolean) => {
    return authorizeAxiosInstance.put(`/material/update-status?id=${idMaterial}&aBoolean=${aBoolean}`);
};

export { findByStatusActiveFromMaterial, updateStatusMaterial, postCreateNewMaterial, findByName };