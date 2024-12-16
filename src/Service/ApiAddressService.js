
import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewAddress = async (newAddress) => {
        return await authorizeAxiosInstance.post('/address/createAddress', newAddress);
};

const getAddressByidAccount = async (idAccount) => {
        const response = await authorizeAxiosInstance.get(`/address/getAddressByidAccount?idAccount=${idAccount}`)
        return response;
};
const findAddress = async (idAddress) => {
        const response = await authorizeAxiosInstance.get(`/address/findAddress?idAddress=${encodeURIComponent(idAddress)}`)
        return response;
};
const findAccountAddress = async (idAccount) => {
        const response = await authorizeAxiosInstance.get(`/address/findAccountAddress?idAccount=${encodeURIComponent(idAccount)}`)
        return response;
};
const findEmployeeAddress = async (idAccount) => {
        const response = await authorizeAxiosInstance.get(`/address/findEmployeeAddress?idAccount=${encodeURIComponent(idAccount)}`)
        return response;
};
const getAccountAddresses = async () => {
        const response = await authorizeAxiosInstance.get(`/address/getAccountAddress`)
        return response;
};
const getSearchAccountAddresses = async (search) => {
        const response = await authorizeAxiosInstance.get(`/address/getAccountAddressSearch?search=${search}`)
        return response;
};
const deleteAddress = (addressId) => {
        return authorizeAxiosInstance.delete(`/address/delete?addressId=${addressId}`);
};

const updateAddress = (addressId, updatedAddress) => {
        return authorizeAxiosInstance.put(`/address/updateAddress?addressId=${addressId}`, updatedAddress);
};
const updateAddressType = (addressId) => {
        return authorizeAxiosInstance.put(`/address/updateAddressType?addressId=${addressId}`);
};
export { postCreateNewAddress, findEmployeeAddress, getAddressByidAccount, findAddress, deleteAddress, updateAddress, updateAddressType, getAccountAddresses, findAccountAddress, getSearchAccountAddresses };
