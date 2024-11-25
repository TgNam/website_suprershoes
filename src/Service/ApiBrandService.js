import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewBrand = async (newBrand) => {
    return await authorizeAxiosInstance.post('/brand/create-brand', newBrand);
};
const findBrandActive = async () => {
    const response = await authorizeAxiosInstance.get('/brand/list-brandActive')
    return response;
};
const findBrand = async () => {
    const response = await authorizeAxiosInstance.get('/brand/list-brand')
    return response;
};
const findByName = async (searchName) => {
    const response = await authorizeAxiosInstance.get(`/brand/list-brand-search?search=${searchName}`)
    return response;
};
const updateStatusBrand = (idBrand, aBoolean) => {
    return authorizeAxiosInstance.put(`/brand/update-status?id=${idBrand}&aBoolean=${aBoolean}`);
};

export { findBrand, updateStatusBrand, postCreateNewBrand, findByName,findBrandActive };
