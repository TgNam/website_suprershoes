import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const findProductResponseById = async (idProduct) => {
    const response = await authorizeAxiosInstance.get(`/product/findProductResponseById?idProduct=${idProduct}`)
    return response;
}
const findProductProductDetailResponse = async () => {
    const response = await authorizeAxiosInstance.get('/product/findProductProductDetailResponse')
    return response;
};
const filterProductProductDetailResponse = async (search, idCategory, idBrand, status) => {
    const response = await authorizeAxiosInstance.get(`/product/filterProductProductDetailResponse?search=${search}&idCategory=${idCategory}&idBrand=${idBrand}&status=${status}`)
    return response;
};
const postCreateNewProduct = async (newProduct) => {
    return await authorizeAxiosInstance.post('/product/addProduct', newProduct);
};
const putUpdateProduct = async (updateProduct) => {
    return await authorizeAxiosInstance.put('/product/updateProduct', updateProduct);
};
export const findByStatusActiveFromProduct = async (filters = {}) => {
    const params = new URLSearchParams();
    // Nếu filters có giá trị và có thuộc tính status thì mới thêm vào params
    if (filters.status) {
        params.append('status', filters.status);
    }


    // Gửi yêu cầu GET đến API với các tham số đã được xây dựng
    const response = await authorizeAxiosInstance.get(`/product/list-product?${params.toString()}`);
    return response;
};
const findImageByIdProduct = async (id) => {
    const response = await authorizeAxiosInstance.get(`/product/productImage?idProduct=${id}`)
    return response;
};

const findByName = async (searchName) => {
    const response = await authorizeAxiosInstance.get(`/product/list-product?name=${searchName}`)
    return response;
};
const updateStatusProduct = (idProduct, aBoolean) => {
    return authorizeAxiosInstance.put(`/product/update-status?id=${idProduct}&aBoolean=${aBoolean}`);
};
const deleteProduct = (idProduct) => {
    return authorizeAxiosInstance.delete(`/product/delete-product?id=${idProduct}`);
};


//Dùng cho sale sản phẩm

const getAllProduct = async () => {
    const response = await authorizeAxiosInstance.get('/product/listProduct')
    return response;
};
const getFindSearch = async (search) => {
    const response = await authorizeAxiosInstance.get(`/product/listProductSearch?search=${search}`)
    return response;
};

const findProductPriceRangePromotion = async (idProduct) => {
    const response = await authorizeAxiosInstance.get(`/product/findProductPriceRangePromotion?idProduct=${idProduct}`)
    return response;
}

export async function getProductNameByIds(listId) {
    try {
        let response = await authorizeAxiosInstance.post("/product/get-name-product-by-id", listId);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export {
    findProductPriceRangePromotion,
    updateStatusProduct,
    postCreateNewProduct,
    findByName,
    deleteProduct,
    getAllProduct,
    getFindSearch,
    findImageByIdProduct,
    findProductProductDetailResponse,
    filterProductProductDetailResponse,
    findProductResponseById,
    putUpdateProduct
};
