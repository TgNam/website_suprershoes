import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewShoeSole = async (newShoeSole) => {
    return await authorizeAxiosInstance.post('/shoeSole/create-shoeSole', newShoeSole);
};
const findShoeSoleActive = async () => {
    return await authorizeAxiosInstance.get('/shoeSole/list-shoeSoleActive')
};
const findShoeSole = async () => {
    return await authorizeAxiosInstance.get('/shoeSole/list-shoeSole')
};
const findByName = async (searchName) => {
    return await authorizeAxiosInstance.get(`/shoeSole/list-shoeSole-search?search=${searchName}`)
};
const updateStatusShoeSole = (idShoeSole, aBoolean) => {
    return authorizeAxiosInstance.put(`/shoeSole/update-status?id=${idShoeSole}&aBoolean=${aBoolean}`);
};

export { findShoeSole, updateStatusShoeSole, postCreateNewShoeSole, findByName, findShoeSoleActive };