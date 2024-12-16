import {
    Fetch_Address_Request,
    Fetch_Account_Address_Success,
    Fetch_find_Address_Success,
    Fetch_Address_Success,
    Fetch_Address_Error
} from '../types/addressTypes';
import {
    postCreateNewAddress,
    getAddressByidAccount,
    deleteAddress,
    findAddress,
    updateAddress,
    updateAddressType,
    getAccountAddresses,
    findAccountAddress,
    findEmployeeAddress,
    getSearchAccountAddresses
} from '../../Service/ApiAddressService';
import { toast } from 'react-toastify';

export const fetchAllAddress = (idAccount) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAddressByidAccount(idAccount);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi địa chỉ:", error);
            dispatch(fetchPostsError())
        }

    }
}
export const findAddressByIdAddress = (idAddress) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findAddress(idAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(FetchFindAddressSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi địa chỉ:", error);
            dispatch(fetchPostsError());
        }
    };
};
export const findAccountAddressByIdAccount = (idAccount) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findAccountAddress(idAccount);
            if (response.status === 200) {
                const data = response.data;
                dispatch(FetchFindAddressSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi địa chỉ:", error);
            dispatch(fetchPostsError());
        }
    };
};
export const findEmployeeAddressByIdAccount = (idAccount) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findEmployeeAddress(idAccount);
            if (response.status === 200) {
                const data = response.data;
                dispatch(FetchFindAddressSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi địa chỉ:", error);
            dispatch(fetchPostsError());
        }
    };
};
export const fetchAllAccountAddress = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAccountAddresses();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsAccountAddressSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const fetchSearchAllAccountAddress = (search) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getSearchAccountAddresses(search);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsAccountAddressSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi địa chỉ:", error);
            dispatch(fetchPostsError())
        }

    }
}
export const createNewAddress = (newAddress) => {
    return async (dispatch) => {
        try {
            const response = await postCreateNewAddress(newAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Thêm địa chỉ mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi địa chỉ mới:", error);
            dispatch(fetchPostsError());
        }
    };
};
export const updateAddressFromAccount = (addressId, Address) => {
    return async (dispatch) => {
        try {
            const response = await updateAddress(addressId, Address);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Cập nhật địa chỉ thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật địa chỉ:", error);
            dispatch(fetchPostsError());
        }
    };
};
export const updateAddressTypeByIdAddress = (idAddress) => {
    return async (dispatch) => {
        try {
            const response = await updateAddressType(idAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Cập nhật địa chỉ mặc định thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật địa chỉ mặc định:", error);
            dispatch(fetchPostsError());
        }
    };
};
export const deleteByIdAddress = (idAddress) => {
    return async (dispatch) => {
        try {
            const response = await deleteAddress(idAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Xóa địa chỉ thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa địa chỉ:", error);
            dispatch(fetchPostsError());
        }
    };
};
export const fetchPostsRequest = () => {
    return {
        type: Fetch_Address_Request
    }
}
export const FetchFindAddressSuccess = (payload) => {
    return {
        type: Fetch_find_Address_Success,
        payload
    }
}
export const fetchPostsAccountAddressSuccess = (payload) => {
    return {
        type: Fetch_Account_Address_Success,
        payload
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Address_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Address_Error
    }
}