import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewCategory = async (newCategory) => {
    return await authorizeAxiosInstance.post('/category/create-category', newCategory);
};

const findByStatusActiveFromCategory = async () => {
        const response = await authorizeAxiosInstance.get('/category/list-category')
        return response
};
const findByName = async (searchName) => {
        const response = await authorizeAxiosInstance.get(`/category/list-category-search?search=${searchName}`)
        return response;
};
const updateStatusCategory = (idCategory,aBoolean) => {
    return authorizeAxiosInstance.put(`/category/update-status?id=${idCategory}&aBoolean=${aBoolean}`);
};

export { findByStatusActiveFromCategory, updateStatusCategory, postCreateNewCategory ,findByName};