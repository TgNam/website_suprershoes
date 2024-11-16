import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewProductDetail = async (newProductDetail) => {
    return await authorizeAxiosInstance.post('/productDetail/create-productDetail', newProductDetail);
};

const findByStatusActiveFromProductDetail = async () => {

    const response = await authorizeAxiosInstance.get('/productDetail/list-productDetail')
    return response;


};

const findByName = async (searchName) => {

    const response = await authorizeAxiosInstance.get(`/productDetail/list-productDetail-search?search=${searchName}`)
    return response;


};
const updateStatusProductDetail = (idProductDetail) => {
    return authorizeAxiosInstance.put(`/productDetail/update-status?id=${idProductDetail}`);
};
// dùng cho sale sản phẩm
const getAllProductDetailByIdProduct = async (listIdProducts) => {

    const response = await authorizeAxiosInstance.get(`/productDetail/listProductDetail?idProducts=${listIdProducts}`)
    return response;


};
const getFilterProductDetailByIdProduct = async (listIdProducts, search, nameSize, nameColor, priceRange) => {

    const response = await authorizeAxiosInstance.get(`/productDetail/filterListProductDetail?idProducts=${listIdProducts}&search=${search}&nameSize=${nameSize}&nameColor=${nameColor}&priceRange=${priceRange}`)
    return response;


};
//dùng cho hiển thị sản phẩm
const getAllProductPromotion = async () => {

    const response = await authorizeAxiosInstance.get(`/productDetail/listProductPromotion`)
    return response;


};

const getAllPriceRangePromotion = async () => {

    const response = await authorizeAxiosInstance.get('/productDetail/productPriceRangePromotion');
    console.log(response)
    return response;

};

const getFilterProductPromotion = async (search, nameSize, nameColor, priceRange) => {

    const response = await authorizeAxiosInstance.get(`/productDetail/filterListProductPromotion?search=${search}&nameSize=${nameSize}&nameColor=${nameColor}&priceRange=${priceRange}`)
    return response;


};
const getProductDetailById = async (idProductDetail) => {
    const response = await authorizeAxiosInstance.get(`/productDetail/findProductDetailByIdProductDetail?idProductDetail=${idProductDetail}`)
    return response;

};
const findProductPromotionByIdProcuctAndIdColorAndIdSize = async (idProduct, idColor, idSize) => {
    const response = await authorizeAxiosInstance.get(`/productDetail/findProductPromotionByIdProcuctAndIdColorAndIdSize?idProduct=${idProduct}&idColor=${idColor}&idSize=${idSize}`)
    return response;
};
export { findProductPromotionByIdProcuctAndIdColorAndIdSize, getProductDetailById, findByStatusActiveFromProductDetail, updateStatusProductDetail, postCreateNewProductDetail, findByName, getAllProductDetailByIdProduct, getFilterProductDetailByIdProduct, getAllProductPromotion, getFilterProductPromotion, getAllPriceRangePromotion };
