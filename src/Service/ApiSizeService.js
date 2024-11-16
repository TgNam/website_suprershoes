import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewSize = async (newSize) => {
    return await authorizeAxiosInstance.post('/size/create-size', newSize);
};
const findAllSize = async () => {
        const response = await authorizeAxiosInstance.get('/size/list-size')
        return response;

};
const findByStatusActiveFromSize = async () => {
        const response = await authorizeAxiosInstance.get('/size/listSizeACTIVE')
        return response;


};
const findByName = async (searchName) => {
        const response = await authorizeAxiosInstance.get(`/size/list-size-search?search=${searchName}`)
        return response;

};
const updateStatusSize = (idSize, aBoolean) => {
    return authorizeAxiosInstance.put(`/size/update-status?id=${idSize}&aBoolean=${aBoolean}`);
};

export { findByStatusActiveFromSize, updateStatusSize, postCreateNewSize, findAllSize, findByName };
