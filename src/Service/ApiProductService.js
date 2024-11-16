import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewProduct = async (newProduct) => {
    return await authorizeAxiosInstance.post('/product/create-product', newProduct);
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


const findByName = async (searchName) => {
    const response = await authorizeAxiosInstance.get(`/product/list-product?name=${searchName}`)
    return response;
};
const updateStatusProduct = (idProduct) => {
    return authorizeAxiosInstance.put(`/product/update-status?id=${idProduct}`);
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
export { findProductPriceRangePromotion, updateStatusProduct, postCreateNewProduct, findByName, deleteProduct, getAllProduct, getFindSearch };
