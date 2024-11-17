import authorizeAxiosInstance from "../hooks/authorizeAxiosInstance";

export async function addProductToCart(cartDetails, acccountId){

    try {
        let response = await authorizeAxiosInstance.post(`/cart-detail/add-product-to-cart/${acccountId}`, cartDetails);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}

export async function getCartByAccountId(acccountId){

    try {
        let response = await authorizeAxiosInstance.get(`/cart/get-cart-by-account/${acccountId}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}