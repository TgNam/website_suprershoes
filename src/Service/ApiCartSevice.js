import authorizeAxiosInstance from "../hooks/authorizeAxiosInstance";

export async function addProductToCart(cartDetails, acccountId) {

    try {
        let response = await authorizeAxiosInstance.post(`/cart-detail/add-product-to-cart/${acccountId}`, cartDetails);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}

export async function getCartByAccountId(acccountId) {

    try {
        let response = await authorizeAxiosInstance.get(`/cart/get-cart-by-account/${acccountId}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}
export async function getCartDetailByAccountId(acccountId) {

    try {
        let response = await authorizeAxiosInstance.get(`/cart-detail/get-cartDetail-by-account/${acccountId}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}
export async function getCartDetailByAccountIdAndListIdCartDetail(accountId,idCartDetail) {

    try {
        let response = await authorizeAxiosInstance.get(`/cart-detail/get-cartDetail-by-accountAndListCartDetail?accountId=${accountId}&idCartDetail=${idCartDetail}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}