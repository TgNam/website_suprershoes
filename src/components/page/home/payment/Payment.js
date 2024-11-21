
import { useState, useEffect } from 'react';
import './Payment.scss';
import image from '../images/product6.webp';
import { toast } from 'react-toastify';
import { getCities, getDistricts, getWards } from "../../../../Service/ApiProvincesService";
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { payBillOnline } from '../../../../Service/ApiBillService';
import { getCartDetailByAccountIdAndListIdCartDetail } from '../../../../Service/ApiCartSevice';
import { getVoucherByCodeVoucher } from '../../../../Service/ApiVoucherService';
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const IdCartDetail = (location.state?.selectedCartDetails || []).join(",");
    const [voucher, setVoucher] = useState({});
    const { user } = useSelector((state) => state.auth)
    const [cartDetails, setCartDetails] = useState([]);
    const [totalMerchandise, setTotalMerchandise] = useState(0);//Tổng tiền hàng đã mua
    const [priceDiscount, setPriceDiscount] = useState(0);//Giảm giá
    const [totalAmount, setTotalAmount] = useState(0);//Tổng tiền hàng đã bao gồm giảm giá

    //Dữ liệu thanh toán hóa đơn
    useEffect(() => {
        //Tính tổng tiền hàng
        let total = calculateTotalCartPriceForSelected();
        setTotalMerchandise(total);
    }, [cartDetails, totalMerchandise, voucher]);

    const calculateTotalCartPriceForSelected = () => {
        // Tính tổng giá các sản phẩm được chọn
        return cartDetails.reduce((total, productDetail) => {
            return total + calculatePricePerProductDetail(productDetail);
        }, 0);
    };
    useEffect(() => {
        //Tính tiền giảm giá
        let discount = voucher?.value || 0;
        let maximumDiscount = voucher?.maximumDiscount || 0;
        let sale = totalMerchandise * (discount / 100)
        if (maximumDiscount <= sale) {
            setPriceDiscount(maximumDiscount)
        } else {
            setPriceDiscount(sale)
        }

    }, [totalMerchandise, voucher]);

    useEffect(() => {
        //tính tổng tiền bao gồm giảm giá
        setTotalAmount(totalMerchandise - priceDiscount)
    }, [priceDiscount, voucher, totalMerchandise]);
    useEffect(() => {
        (async () => {
            try {
                let response = await getCartDetailByAccountIdAndListIdCartDetail(user?.id, IdCartDetail);
                setCartDetails(response);
            } catch (error) {
                toast.error("Bạn chưa chọn sản phẩm cần thanh toán")
            }
        })();
    }, [IdCartDetail])

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [voucherCode, setVoucherCode] = useState('');
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
    const formatCurrency = (value) => {
        if (!value) return 0;
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value) || 0;
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const calculatePricePerProductDetail = (productDetail) => {
        const { productDetailPrice, quantityCartDetail, quantityPromotionDetail, value } = productDetail;

        if (!value) {
            // Nếu không có khuyến mãi
            return productDetailPrice * quantityCartDetail;
        } else if (quantityCartDetail <= quantityPromotionDetail) {
            // Nếu có khuyến mãi và số lượng trong giỏ <= số lượng được áp dụng khuyến mãi
            return productDetailPrice * (1 - value / 100) * quantityCartDetail;
        } else {
            // Nếu có khuyến mãi và số lượng trong giỏ > số lượng được áp dụng khuyến mãi
            return (
                productDetailPrice * (1 - value / 100) * quantityPromotionDetail +
                productDetailPrice * (quantityCartDetail - quantityPromotionDetail)
            );
        }
    };

    const handleApplyVoucher = async () => {
        if (!voucherCode) {
            toast.error("Vui lòng nhập mã giảm giá!")
            return;
        }
        const voucher = await getVoucherByCodeVoucher(voucherCode);
        setVoucher(voucher);
    };


    // Validation schema
    const validationSchema = yup.object().shape({
        name: yup.string().required('Họ và tên là bắt buộc.'),
        phoneNumber: yup.string()
            .required('Số điện thoại là bắt buộc.')
            .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.'),
        city: yup.string().required('Tỉnh/Thành phố là bắt buộc.'),
        district: yup.string().required('Quận/Huyện là bắt buộc.'),
        ward: yup.string().required('Phường/Xã là bắt buộc.'),
        addressDetail: yup.string().required('Địa chỉ cụ thể là bắt buộc.'),
        note: yup.string().max(500, 'Lời nhắn không được vượt quá 500 ký tự.')
    });
    const handleSubmitCreate = async (values) => {
        try {
            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);
            const nameCustomer = values.name;
            const phoneNumber = values.phoneNumber;
            const node = values.node;
            // Tạo địa chỉ đầy đủ
            const fullAddress = `${values.addressDetail}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;
            await payBillOnline(IdCartDetail, voucherCode, user?.id, nameCustomer, phoneNumber, fullAddress, node)
            navigate(`/cart`);
            window.location.reload();
        } catch (error) {
            toast.error("Lỗi . Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="payment-container row">
            <div className="col-lg-6 col-md-12 p-5">

                <h4>Trang thanh toán</h4>
                <p className="text-custom-color">Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển phù hợp</p>
                {/* Display products */}
                {cartDetails?.map((item, index) => (
                    <div key={item.idCartDetail} className="payment-card">
                        <table className="product-table">
                            <tbody>
                                <tr>
                                    <td rowSpan="4" className="product-image-cell">
                                        <img src={image} alt={item.nameProduct} className="img-fluid" style={{ width: '150px' }} />
                                    </td>
                                    <td colSpan="2"><h3>{item.nameProduct}</h3></td>
                                </tr>
                                <tr><td>Số lượng: {item.quantityCartDetail}</td></tr>
                                <tr>
                                    {item.value ? (
                                        <td>
                                            <p className='text-danger'>
                                                {formatCurrency((item.productDetailPrice || 0) * (1 - (item.value / 100)))} VND
                                            </p>
                                            <p className="text-decoration-line-through">
                                                {formatCurrency(item.productDetailPrice || 0)} VND
                                            </p>
                                            {/* <Countdown endDate={item.endAtByPromotion} /> */}
                                        </td>
                                    ) : (
                                        <td>
                                            <p className=''>{formatCurrency(item.productDetailPrice || 0)} VND</p>
                                        </td>
                                    )}
                                    <td colSpan="2" style={{ textAlign: 'right' }} className='text-danger'>
                                        Thành tiền: {formatCurrency(calculatePricePerProductDetail(item))} VND
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr className="dotted-line" />
                    </div>
                ))}

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
                    {/* {isVoucherApplied && (
        <div className="voucher-display">
            <div className="voucher-card">
                <span className="voucher-code">Nhập mã <strong>VBS01</strong></span>
                <p>Giảm 10%</p>
                <p>Cho đơn hàng từ: 100,000 VND</p>
                <p>Thời gian áp dụng từ: 18:00 16/12/2023</p>
            </div>
        </div>
    )} */}
                </div>
            </div>
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
                    <Form noValidate onSubmit={handleSubmit} className="col-lg-6 col-md-12 p-5">
                        {/* Payment Details */}
                        <div >

                            <h4>Chi tiết thanh toán</h4>
                            <p className="text-custom-color">Hoàn thành đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh toán của bạn.</p>
                            <div className='p-4'>

                                <div className="payment-details-form row">
                                    <div className="form-group col-6">
                                        <p >Nhập họ và tên</p>
                                        <input
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập họ và tên'
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
                                                    checked
                                                    onChange={handleChange} />
                                                <span className="custom-radio"></span>Thanh toán khi nhận hàng
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Payment Summary */}
                            <hr className="dotted-line" />
                            <div className="payment-summary">
                                <div className="summary-row">
                                    <span>Tổng tiền hàng</span>
                                    <span>{(totalMerchandise || 0).toLocaleString()} VND</span>
                                </div>
                                <div className="summary-row">
                                    <span>Phí vận chuyển</span>
                                    <span>0 VND</span>
                                </div>
                                <div className="summary-row">
                                    <span>Giảm giá voucher</span>
                                    <span>- {priceDiscount ? priceDiscount.toLocaleString() : '0'} VND</span>
                                </div>
                                <hr className="dotted-line" />
                                <div className="summary-row total">
                                    <span>Tổng thanh toán</span>
                                    <span className="highlight">{((totalAmount || 0)).toLocaleString()} VND</span>
                                </div>
                                <Button variant="primary" type="submit" className="btn btn-primary place-order-btn">
                                    Đặt hàng
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Payment;
