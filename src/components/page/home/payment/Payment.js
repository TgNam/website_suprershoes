
import { useState, useEffect } from 'react';
import './Payment.scss';
import image from '../images/product6.webp';
import { toast } from 'react-toastify';
import { getCities, getDistricts, getWards } from "../../../../Service/ApiProvincesService";
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Code cần sửa lại {
import { getCartByAccountId } from '../../../../Service/ApiCartSevice';
import { getVoucherByCodeVoucher } from '../../../../Service/ApiVoucherService';
import { getProductNameByIds } from '../../../../Service/ApiProductService';
import { payBillOnline } from '../../../../Service/ApiBillService';
import { useNavigate } from 'react-router-dom';
import { getPromotionByProductDetailsId } from '../../../../Service/ApiPromotionService';
//}
import { useSelector } from 'react-redux';

const Payment = () => {
    const navigate = useNavigate();
    //Code cần sửa lại {
    const { user } = useSelector((state) => state.auth)

    const [cartDetails, setCartDetails] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [promotionDetail, setPromotionDetail] = useState({});
    const [voucher, setVoucher] = useState({});
    const [totalMerchandise, setTotalMerchandise] = useState(0);//Tổng tiền hàng đã mua
    const [priceDiscount, setPriceDiscount] = useState(0);//Giảm giá
    const [totalAmount, setTotalAmount] = useState(0);//Tổng tiền hàng đã bao gồm giảm giá
    //Dữ liệu thanh toán hóa đơn
    useEffect(() => {
        //Tính tổng tiền hàng
        let total = 0;
        cartDetails.forEach((item) => {
            total += item.productDetail.price * item.quantity;
        });
        setTotalMerchandise(total);
    }, [cartDetails, totalMerchandise, voucher]);
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
                let response = await getCartByAccountId(user?.id);
                setCartDetails(response.cartDetails);
                const productIds = response.cartDetails.map(cartDetail => cartDetail.productDetail.id);
                const productNameMap = await getProductNameByIds(productIds);
                setProductNames(productNameMap);

                // gọi api giảm giá//

                const promotionMap = await getPromotionByProductDetailsId(productIds);
                setPromotionDetail(promotionMap)

            } catch (error) {

            }

        })();
    }, [])
    //}
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

    const handleApplyVoucher = async () => {
        const voucher = await getVoucherByCodeVoucher(voucherCode);
        setVoucher(voucher);
        console.log(voucher)
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
    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);
            const nameCustomer = values.name;
            const phoneNumber = values.phoneNumber;
            const node = values.node;
            // Tạo địa chỉ đầy đủ
            const fullAddress = `${values.addressDetail}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;
            payBillOnline(voucherCode, user?.id, nameCustomer, phoneNumber, fullAddress, node)
            navigate(`/cart`);
            window.location.reload();
        } catch (error) {
            toast.error("Lỗi . Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="payment-container">
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
                    <Form noValidate onSubmit={handleSubmit} className="row">

                        <div className="col-lg-6 col-md-12 p-5">

                            <h4>Trang thanh toán</h4>
                            <p className="text-custom-color">Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển phù hợp</p>
                            {/* Display products */}
                            {/* {currentProducts.map((product, index) => (
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
                            ))} */}
                            {/* Code cần sửa lại } */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAllChange}
                                                checked={isAllSelected}
                                            />
                                        </th> */}
                                        <th scope="col">#</th>
                                        <th scope="col">Ảnh</th>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody className="cart-list">
                                    {cartDetails.map((item, index) => (
                                        <tr key={item.id}>
                                            {/* <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td> */}
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <img
                                                    src={image}
                                                    alt={productNames[item.productDetail.id]}
                                                    className="img-fluid"
                                                    style={{ width: '50px' }}
                                                />
                                            </td>
                                            <td>
                                                {productNames[item.productDetail.id]}
                                                <br></br>
                                                <span style={{ fontSize: "16px", color: "#333333" }}>Màu: {item.productDetail.color.name}</span> -
                                                <span style={{ fontSize: "16px", color: "#333333" }}>  Size: {item.productDetail.size.name}</span>
                                            </td>
                                            <td>{item.productDetail.price} VND</td>
                                            <td>
                                                {/* <button
                                                            className="btn btn-sm btn-outline-danger me-1"
                                                            onClick={() => handleQuantityChange(item.id, -1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button> */}
                                                {item.quantity}
                                                {/* <button
                                                            className="btn btn-sm btn-outline-success ms-1"
                                                            onClick={() => handleQuantityChange(item.id, 1)}
                                                        >
                                                            +
                                                        </button> */}
                                            </td>
                                            <td>{item.productDetail.price * item.quantity} VND</td>
                                            <td>
                                                {/* <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => setCartDetails(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id))}
                                                        >
                                                            <IoIosTrash size="20px" />
                                                        </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Code cằn sửa } */}
                            {/* Pagination controls */}
                            {/* <div className="pagination-controls">
                                <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-button">-</button>
                                <span className="page-indicator"> {currentPage} / {totalPages}</span>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">+</button>
                            </div> */}

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

                        {/* Payment Details */}
                        <div className="col-lg-6 col-md-12 p-5">

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
