import axios from "axios";

const host = "https://provinces.open-api.vn/api/";

export const getCities = () => {
  return axios.get(`${host}?depth=1`).then((response) => response.data);
};

export const getDistricts = (cityId) => {
  return axios
    .get(`${host}p/${cityId}?depth=2`)
    .then((response) => response.data.districts);
};

export const getWards = (districtId) => {
  return axios
    .get(`${host}d/${districtId}?depth=2`)
    .then((response) => response.data.wards);
};
