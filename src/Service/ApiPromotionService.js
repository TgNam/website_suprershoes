import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';
export const getAllPromotions = async () => {
        const response = await authorizeAxiosInstance.get(`/promotion/listPromotion`);
        return response;
};
export const findPromotionAndProductPromotion = async (idPromotion) => {
        const response = await authorizeAxiosInstance.get(`/promotion/getPromotionDetailResponse?idPromotion=${idPromotion}`);
        return response;
};
export const findSearchPromotionAndProductPromotion = async (idPromotion, search, nameSize, nameColor, priceRange) => {
        const response = await authorizeAxiosInstance.get(`/promotion/getSearchPromotionDetailResponse?idPromotion=${idPromotion}&search=${search}&nameSize=${nameSize}&nameColor=${nameColor}&priceRange=${priceRange}`);
        return response;
};
export const listSearchPromotion = async (search, status) => {
        const response = await authorizeAxiosInstance.get(`/promotion/listSearchPromotion?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
        return response;
};
export const postCreatePromotion = async (promotionCreationRequest) => {
    return await authorizeAxiosInstance.post('/promotion/createPromotion', promotionCreationRequest);
};
export const updatePromotion = async (promotionUpdatesRequest) => {
    return await authorizeAxiosInstance.put('/promotion/updatePromotion', promotionUpdatesRequest);
};
export const updateStatusPromotion = async (idPromotion, aBoolean) => {
    return await authorizeAxiosInstance.put(`/promotion/updateStatus?id=${idPromotion}&&aBoolean=${aBoolean}`);
};
export async function getPromotionByProductDetailsId (ids){


        try {
                let response = await authorizeAxiosInstance.post("/promotion/get-by-product-details",ids);
                return response.data;
        } catch (error) {
                return Promise.reject(error);
        }
}