import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/productDetail'
});

const postCreateNewProductDetail = async (newProductDetail) => {
    return await apiClient.post('/create-productDetail', newProductDetail);
};

const findByStatusActiveFromProductDetail = async () => {
    try {
        const response = await apiClient.get('/list-productDetail')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};

const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-productDetail-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusProductDetail = (idProductDetail) => {
    return apiClient.put(`/update-status?id=${idProductDetail}`);
};
// dùng cho sale sản phẩm
const getAllProductDetailByIdProduct = async (listIdProducts) => {
    try {
        const response = await apiClient.get(`listProductDetail?idProducts=${listIdProducts}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const getFilterProductDetailByIdProduct = async (listIdProducts, search, nameSize, nameColor, priceRange) => {
    try {
        const response = await apiClient.get(`filterListProductDetail?idProducts=${listIdProducts}&search=${search}&nameSize=${nameSize}&nameColor=${nameColor}&priceRange=${priceRange}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
//dùng cho hiển thị sản phẩm
const getAllProductPromotion = async () => {
    try {
        const response = await apiClient.get(`listProductPromotion`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};

const getAllPriceRangePromotion = async () => {
    try {
        const response = await apiClient.get('productPriceRangePromotion');
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};

const getFilterProductPromotion = async (search, nameSize, nameColor, priceRange) => {
    try {
        const response = await apiClient.get(`filterListProductPromotion?search=${search}&nameSize=${nameSize}&nameColor=${nameColor}&priceRange=${priceRange}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const getProductDetailById = async (idProductDetail) => {
    try {
        const response = await apiClient.get(`findProductDetailByIdProductDetail?idProductDetail=${idProductDetail}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
export { getProductDetailById, findByStatusActiveFromProductDetail, updateStatusProductDetail, postCreateNewProductDetail, findByName, getAllProductDetailByIdProduct, getFilterProductDetailByIdProduct, getAllProductPromotion, getFilterProductPromotion,getAllPriceRangePromotion };
