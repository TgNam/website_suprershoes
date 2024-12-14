import authorizeAxiosInstance from "../hooks/authorizeAxiosInstance";

export async function addProductToCart(cartDetails, acccountId) {

    try {
        let response = await authorizeAxiosInstance.post(`/cart-detail/add-product-to-cart/${acccountId}`, cartDetails);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }

}
export async function createCartDetailByCartLocal(cartDetails, acccountId) {

    try {
        let response = await authorizeAxiosInstance.post(`/cart-detail/add-cartlocal-to-cart/${acccountId}`, cartDetails);
        return response;
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
        return response;
    } catch (error) {
        return Promise.reject(error);
    }

}
export async function getCartDetailByAccountIdAndListIdCartDetail(accountId, idCartDetail) {

    try {
        let response = await authorizeAxiosInstance.get(`/cart-detail/get-cartDetail-by-accountAndListCartDetail?accountId=${accountId}&idCartDetail=${idCartDetail}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }

}
export async function plusCartDetail(idCartDetail) {
    try {
        let response = await authorizeAxiosInstance.post(`/cart-detail/plusCartDetail?idCartDetail=${encodeURIComponent(idCartDetail)}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
export async function subtractCartDetail(idCartDetail) {
    try {
        let response = await authorizeAxiosInstance.post(`/cart-detail/subtractCartDetail?idCartDetail=${encodeURIComponent(idCartDetail)}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
export async function deleteCartDetail(idCartDetail) {
    try {
        let response = await authorizeAxiosInstance.delete(`/cart-detail/deleteCartDetail?idCartDetail=${encodeURIComponent(idCartDetail)}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}