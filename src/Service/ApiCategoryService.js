import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewCategory = async (newCategory) => {
    return await authorizeAxiosInstance.post('/category/create-category', newCategory);
};
const findCategoryActive = async () => {
    const response = await authorizeAxiosInstance.get('/category/list-categoryActive')
    return response
};
const findCategory = async () => {
    const response = await authorizeAxiosInstance.get('/category/list-category')
    return response
};
const findByName = async (searchName) => {
    const response = await authorizeAxiosInstance.get(`/category/list-category-search?search=${searchName}`)
    return response;
};
const updateStatusCategory = (idCategory, aBoolean) => {
    return authorizeAxiosInstance.put(`/category/update-status?id=${idCategory}&aBoolean=${aBoolean}`);
};

export { findCategory, updateStatusCategory, postCreateNewCategory, findByName,findCategoryActive };