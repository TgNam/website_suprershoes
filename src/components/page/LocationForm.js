import React, { useState, useEffect } from "react";
import { getCities, getDistricts, getWards } from "../../Service/ApiService";

const LocationForm = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWards, setSelectedWards] = useState("");
    // Lấy danh sách tỉnh/thành phố khi component được mount
    useEffect(() => {
        getCities().then((data) => {
            setCities(data);
        });
    }, []);

    // Khi thay đổi tỉnh/thành phố, gọi API lấy danh sách quận/huyện
    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity).then((data) => {
                setDistricts(data);
                setWards([]); // Reset danh sách phường/xã khi thay đổi quận/huyện
            });
        } else {
            setDistricts([]);
        }
    }, [selectedCity]);

    // Khi thay đổi quận/huyện, gọi API lấy danh sách phường/xã
    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict).then((data) => {
                setWards(data);
            });
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    function findByCode(code, data) {
        const result = data.find(item => {
            return item.code === Number(code);
        });
        return result.name;
    }


    const handleSubmit = () => {
        console.log("Thành phố: " + findByCode(selectedCity, cities) + ", Huyện: " + findByCode(selectedDistrict, districts) + ", Xã: " + findByCode(selectedWards, wards))
    }
    return (
        <div className="cart-section-right">
            <div className="cart-section-right-select">
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

                <select
                    id="district"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedCity}
                >
                    <option value="">Quận/huyện</option>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name}
                        </option>
                    ))}
                </select>

                <select id="ward" disabled={!selectedDistrict} onChange={(e) => setSelectedWards(e.target.value)}>
                    <option value="">Phường/xã</option>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="main-btn" onClick={handleSubmit}>Gửi Đơn Hàng</button>
        </div>
    );
};

export default LocationForm;
