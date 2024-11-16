
import { useState, useEffect } from 'react';
import './Payment.scss';
import image from '../images/product6.webp';
import { toast } from 'react-toastify';
import { getCities, getDistricts, getWards } from "../../../../Service/ApiProvincesService";
import { Formik } from 'formik';
import * as yup from 'yup';

const Payment = () => {

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    // Lấy danh sách tỉnh/thành phố
    useEffect(() => {
        getCities().then((data) => {
            setCities(data);
        });
    }, []);

    // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity).then((data) => {
                setDistricts(data);
                setWards([]); // Xóa danh sách phường/xã khi thay đổi tỉnh/thành phố
            });
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedCity]);

    // Lấy danh sách phường/xã dựa trên quận/huyện được chọn
    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict).then((data) => {
                setWards(data);
            });
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    // Hàm tìm kiếm theo mã và trả về tên
    function findByCode(code, data) {
        const result = data.find(item => String(item.code) === String(code)); // Chuyển mã thành chuỗi để so sánh chính xác
        return result ? result.name_with_type : "";
    }

    const [voucherCode, setVoucherCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isVoucherApplied, setIsVoucherApplied] = useState(false); // State to track if voucher is applied
    const productsPerPage = 3;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        phone: '',
        specificAddress: '',
        notes: '',
        paymentMethod: 'cod',
        totalPrice: 90000, // Default total price for demonstration
        shippingFee: 91301,
        voucherDiscount: 0
    });

    const products = [
        { name: 'Giày MLB Chunky Wide New York [Đen - 39]', type: 'Cao su', quantity: 1, originalPrice: 100000, discountedPrice: 90000, totalPrice: 90000, imageUrl: image },
        { name: 'Giày Adidas Ultra Boost [Trắng - 40]', type: 'Vải dệt', quantity: 2, originalPrice: 250000, discountedPrice: 200000, totalPrice: 400000, imageUrl: image },
        { name: 'Nike Air Max [Đen - 42]', type: 'Cao su tổng hợp', quantity: 1, originalPrice: 300000, discountedPrice: 270000, totalPrice: 270000, imageUrl: image },
        { name: 'Converse Classic [Trắng - 38]', type: 'Vải canvas', quantity: 3, originalPrice: 150000, discountedPrice: 135000, totalPrice: 405000, imageUrl: image }
    ];

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleApplyVoucher = () => {
        console.log('Applying voucher code:', voucherCode);
        if (voucherCode) {
            setIsVoucherApplied(true); // Display voucher details if a code is entered
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    // Schema kiểm tra tính hợp lệ của form
    const validationSchema = yup.object().shape({

    });
    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);

            // Tạo địa chỉ đầy đủ
            const fullAddress = `${values.addressDetail}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;

        } catch (error) {
            toast.error("Lỗi . Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="payment-container">
            <div className="row">
                <div className="col-lg-6 col-md-12 p-5">

                    <h4>Trang thanh toán</h4>
                    <p className="text-custom-color">Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển phù hợp</p>
                    {/* Display products */}
                    {currentProducts.map((product, index) => (
                        <div key={index} className="payment-card">
                            <table className="product-table">
                                <tbody>
                                    <tr>
                                        <td rowSpan="4" className="product-image-cell">
                                            <img src={product.imageUrl} alt={product.name} className="img-fluid" style={{ width: '150px' }} />
                                        </td>
                                        <td colSpan="2"><h3>{product.name}</h3></td>
                                    </tr>
                                    <tr><td>Loại đế: <span className="highlight">{product.type}</span></td></tr>
                                    <tr><td>Số lượng: {product.quantity}</td></tr>
                                    <tr>
                                        <td>
                                            Giá: <span className="original-price">{product.originalPrice.toLocaleString()} VND</span>{' '}
                                            <span className="discounted-price">{product.discountedPrice.toLocaleString()} VND</span>
                                        </td>
                                        <td colSpan="2" style={{ textAlign: 'right' }}>
                                            Thành tiền: <span className="highlight">{product.totalPrice.toLocaleString()} VND</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="dotted-line" />
                        </div>
                    ))}

                    {/* Pagination controls */}
                    <div className="pagination-controls">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-button">-</button>
                        <span className="page-indicator"> {currentPage} / {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">+</button>
                    </div>

                    {/* Voucher Application */}
                    <div className="voucher-container">
                        <h3>ÁP DỤNG MÃ GIẢM GIÁ</h3>
                        <div className="voucher-input-container">
                            <input
                                type="text"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="Nhập mã voucher tại đây"
                                className="voucher-input"
                            />
                            <button onClick={handleApplyVoucher} className="voucher-apply-button">Áp dụng</button>
                        </div>
                        {isVoucherApplied && (
                            <div className="voucher-display">
                                <div className="voucher-card">
                                    <span className="voucher-code">Nhập mã <strong>VBS01</strong></span>
                                    <p>Giảm 10%</p>
                                    <p>Cho đơn hàng từ: 100,000 VND</p>
                                    <p>Thời gian áp dụng từ: 18:00 16/12/2023</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment Details */}
                <div className="col-lg-6 col-md-12 p-5">

                    <h4>Chi tiết thanh toán</h4>
                    <p className="text-custom-color">Hoàn thành đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh toán của bạn.</p>
                    <div className='p-4'>
                        <Formik
                            initialValues={{
                                name: '',
                                phoneNumber: '',
                                city: '',
                                district: '',
                                ward: '',
                                addressDetail: '',
                                node: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmitCreate}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                                <form className="payment-details-form row">
                                    <div className="form-group col-6">
                                        <p className='plabel'>Nhập họ và tên</p>
                                        <input
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="form-control"
                                        />
                                        {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                    </div>
                                    <div className="form-group col-6">
                                        <p>Nhập số điện thoại</p>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="form-control"
                                            placeholder='Nhập số điện thoại'
                                        />
                                        {touched.phoneNumber && errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                    </div>
                                    <div className="form-group col-6">
                                        <p className='plabel'>Nhập Tỉnh/Thành Phố</p>
                                        <select
                                            className="form-control"
                                            name="city"
                                            value={values.city}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setSelectedCity(e.target.value);
                                                setFieldValue("district", ""); // Reset district khi thay đổi thành phố
                                                setFieldValue("ward", ""); // Reset ward khi thay đổi thành phố
                                            }}
                                            onBlur={handleBlur}
                                            isInvalid={touched.city && !!errors.city}
                                        >
                                            <option value="">Chọn Tỉnh/Thành Phố</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={city.code}>{city.name_with_type}</option>
                                            ))}
                                        </select>
                                        <div className="text-danger">{errors.city}</div>
                                    </div>
                                    <div className="form-group col-6">
                                        <p className='plabel'>Nhập Quận/Huyện</p>
                                        <select
                                            name="district"
                                            value={values.district}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setSelectedDistrict(e.target.value);
                                                setFieldValue("ward", ""); // Reset ward khi thay đổi quận/huyện
                                            }}
                                            onBlur={handleBlur}
                                            isInvalid={touched.district && !!errors.district}
                                            disabled={!selectedCity}
                                            className="form-control"
                                        >
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districts.map((district, index) => (
                                                <option key={index} value={district.code}>{district.name_with_type}</option>
                                            ))}
                                        </select>
                                        <div className="text-danger">{errors.district}</div>
                                    </div>
                                    <div className="form-group col-6">
                                        <p className='plabel'>Nhập Phường/Xã</p>
                                        <select
                                            name="ward"
                                            value={values.ward}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setSelectedWard(e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            isInvalid={touched.ward && !!errors.ward}
                                            disabled={!selectedDistrict}
                                            className="form-control">
                                            <option value="">Chọn Phường/Xã</option>
                                            {wards.map((ward, index) => (
                                                <option key={index} value={ward.code}>{ward.name_with_type}</option>
                                            ))}
                                        </select>
                                        <div className="text-danger">{errors.ward}</div>
                                    </div>
                                    <div className="form-group col-6">
                                        <p className='plabel'>Nhập địa chỉ cụ thể</p>
                                        <input
                                            type="text"
                                            name="addressDetail"
                                            value={values.addressDetail}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.addressDetail && !!errors.addressDetail}
                                            className="form-control" />
                                        <div className="text-danger">{errors.addressDetail}</div>
                                    </div>
                                    <div className="form-group col-6">
                                        <p className='plabel'>Lời nhắn</p>
                                        <textarea
                                            name="note"
                                            value={values.note}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.note && !!errors.note}
                                            className="form-control"
                                        />
                                        <div className="text-danger">{errors.note}</div>
                                    </div>
                                    <div>
                                        <p className='plabel'>Chọn phương thức thanh toán</p>
                                        <div className="custom-radio-container">
                                            <label>
                                                <input 
                                                type="radio" 
                                                name="paymentMethod" 
                                                value="cod" 
                                                checked={formData.paymentMethod === 'cod'} 
                                                onChange={handleInputChange} />
                                                <span className="custom-radio"></span>Thanh toán khi nhận hàng
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>

                    {/* Payment Summary */}
                    <hr className="dotted-line" />
                    <div className="payment-summary">
                        <div className="summary-row">
                            <span>Tổng tiền hàng</span>
                            <span>{(formData.totalPrice || 90000).toLocaleString()} VND</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển</span>
                            <span>{(formData.shippingFee || 91301).toLocaleString()} VND</span>
                        </div>
                        <div className="summary-row">
                            <span>Giảm giá voucher</span>
                            <span>- {formData.voucherDiscount ? formData.voucherDiscount.toLocaleString() : '0'} VND</span>
                        </div>
                        <hr className="dotted-line" />
                        <div className="summary-row total">
                            <span>Tổng thanh toán</span>
                            <span className="highlight">{((formData.totalPrice || 90000) + (formData.shippingFee || 91301) - (formData.voucherDiscount || 0)).toLocaleString()} VND</span>
                        </div>
                        <button className="btn btn-primary place-order-btn">Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
