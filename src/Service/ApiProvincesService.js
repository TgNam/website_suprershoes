// Importing the JSON files
import citys from '../json/city.json';
import districts from '../json/districts.json';
import wards from '../json/wards.json';

// Functions to get cities, districts, and wards data
export const getCities = () => {
    return new Promise((resolve) => {
        resolve(citys.data.data);  // Corrected to access the `data.data` structure from JSON
    });
};

export const getDistricts = (cityCode) => {
    return new Promise((resolve) => {
        const filteredDistricts = districts.data.data.filter(district => district.parent_code === cityCode);
        resolve(filteredDistricts);  // Filter districts based on the parent city code
    });
};

export const getWards = (districtCode) => {
    return new Promise((resolve) => {
        const filteredWards = wards.data.data.filter(ward => ward.parent_code === districtCode);
        resolve(filteredWards);  // Filter wards based on the parent district code
    });
};
