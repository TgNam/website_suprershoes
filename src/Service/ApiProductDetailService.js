import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewProductDetail = async (newProductDetail) => {
    return await authorizeAxiosInstance.post('/productDetail/create-productDetail', newProductDetail);
};

const updateStatusProductDetail = (idProductDetail, aBoolean) => {
    return authorizeAxiosInstance.put(`/productDetail/update-status?id=${idProductDetail}&aBoolean=${aBoolean}`);
};

const findByStatusActiveFromProductDetail = async () => {

    const response = await authorizeAxiosInstance.get('/productDetail/list-productDetail')
    return response;


};

const findByName = async (searchName) => {

    const response = await authorizeAxiosInstance.get(`/productDetail/list-productDetail-search?search=${searchName}`)
    return response;


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
const getAllPriceRangePromotionByQuang = async (
    nameProduct,
    idColor,
    idSize,
    idBrand,
    idCategory,
    minPrice,
    maxPrice
) => {
    try {
        // Build query parameters dynamically
        const params = new URLSearchParams();

        if (nameProduct) params.append("nameProduct", nameProduct);
        if (idColor) params.append("idColor", idColor);
        if (idSize) params.append("idSize", idSize);
        if (idBrand) params.append("idBrand", idBrand);
        if (idCategory) params.append("idCategory", idCategory);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);

        // Construct the full URL
        const url = `/productDetail/productPriceRangePromotionByQuang?${params.toString()}`;

        // Make the API call
        const response = await authorizeAxiosInstance.get(url);
        console.log("API Response:", response);
        return response; // Return only the data portion
    } catch (error) {
        console.error("Error fetching price range promotions:", error);
        throw error; // Propagate the error for handling by the caller
    }
};



const getFilterProductPromotion = async (search, nameSize, nameColor, priceRange) => {

    const response = await authorizeAxiosInstance.get(`/productDetail/filterListProductPromotion?search=${search}&nameSize=${nameSize}&nameColor=${nameColor}&priceRange=${priceRange}`)
    console.log(response)
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
export { findProductPromotionByIdProcuctAndIdColorAndIdSize, getProductDetailById, findByStatusActiveFromProductDetail, updateStatusProductDetail, postCreateNewProductDetail, findByName, getAllProductDetailByIdProduct, getFilterProductDetailByIdProduct, getAllProductPromotion, getFilterProductPromotion, getAllPriceRangePromotion, getAllPriceRangePromotionByQuang };
