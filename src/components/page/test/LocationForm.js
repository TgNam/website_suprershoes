
import React, { useState, useEffect } from "react";
import { getCities, getDistricts, getWards } from "../../../Service/ApiProvincesService";

const LocationForm = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    // Fetch cities when the component is mounted
    useEffect(() => {
        getCities().then((data) => {
            setCities(data);
        });
    }, []);

    // Fetch districts when a city is selected
    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity).then((data) => {
                setDistricts(data);
                setWards([]); // Reset wards when city changes
            });
        } else {
            setDistricts([]);
        }
    }, [selectedCity]);

    // Fetch wards when a district is selected
    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict).then((data) => {
                setWards(data);
            });
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    // Find location name by code
    function findByCode(code, data) {
        const result = data.find(item => {
            return item.code === String(code);  // Ensure comparison is between strings
        });
        return result ? result.name_with_type : "";  // Return the name or an empty string if not found
    }

    // Submit form handler
    const handleSubmit = () => {
        console.log("Thành phố: " + selectedCity +
            ", Huyện: " + selectedDistrict +
            ", Xã: " + selectedWard);
        console.log("Thành phố: " + findByCode(selectedCity, cities) +
            ", Huyện: " + findByCode(selectedDistrict, districts) +
            ", Xã: " + findByCode(selectedWard, wards));
    }

    return (
        <div className="cart-section-right">
            <div className="cart-section-right-select">
                {/* City selection */}
                <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="">Tỉnh/Tp</option>
                    {cities.map((city) => (
                        <option key={city.code} value={city.code}>
                            {city.name}
                        </option>
                    ))}
                </select>

                {/* District selection */}
                <select
                    id="district"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedCity}
                >
                    <option value="">Quận/huyện</option>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name_with_type}
                        </option>
                    ))}
                </select>

                {/* Ward selection */}
                <select
                    id="ward"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    disabled={!selectedDistrict}
                >
                    <option value="">Phường/xã</option>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name_with_type}
                        </option>
                    ))}
                </select>
            </div>
            <button className="main-btn" onClick={handleSubmit}>Gửi Đơn Hàng</button>
        </div>
    );
};

export default LocationForm;