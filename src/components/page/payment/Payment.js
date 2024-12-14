
import { useState, useEffect } from 'react';
import './Payment.scss';
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import { getCities, getDistricts, getWards } from "../../../Service/ApiProvincesService";
import { Formik } from 'formik';
import * as yup from 'yup';
import { payBillOnline, payBillOnlinev2 } from '../../../Service/ApiBillService';
import { getCartDetailByAccountIdAndListIdCartDetail } from '../../../Service/ApiCartSevice';
import { findListPayProductDetail } from '../../../Service/ApiProductDetailService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ListImageProduct from '../../../image/ListImageProduct'
import { getAccountLogin } from "../../../Service/ApiAccountService";
import { findAccountAddress } from "../../../Service/ApiAddressService";
import ModalAddVoucher from './applyVoucher/ModalAddVoucher';
import EventListener from '../../../event/EventListener'
import swal from 'sweetalert';
import { initialize } from '../../../redux/action/authAction';
import { Pagination } from 'react-bootstrap';
const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const IdCartDetail = (location.state?.selectedCartDetails || []).join(",");
    const method = location.state?.method ?? false;
    const listProductDetails = location.state?.listProductDetails || [];
    const [voucher, setVoucher] = useState({});

    const [currentItems, setCurrentItems] = useState([]);
    const [payProductDetail, setPayProductDetail] = useState([]);
    const [totalMerchandise, setTotalMerchandise] = useState(0);//Tổng tiền hàng đã mua
    const [priceDiscount, setPriceDiscount] = useState(0);//Giảm giá
    const [totalAmount, setTotalAmount] = useState(0);//Tổng tiền hàng đã bao gồm giảm giá
    const [address, setAddress] = useState({});
    const [idUser, setIdUser] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate total pages
    const totalPages = Math.ceil(currentItems.length / itemsPerPage);

    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = currentItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const checkLogin = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            try {
                toast.info("chua login")
                findCartDetailPayNowAndLocal()
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng local:", error);
            }
            dispatch(initialize({ isAuthenticated: false, user: null }))
        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    setIdUser(data.id)
                    if (method) {
                        findCartDetailOfAccount(data)
                    } else {
                        findCartDetailPayNowAndLocal()
                    }
                    try {
                        const response = await findAccountAddress(data.id);
                        if (response.status === 200) {
                            const dataAddress = response.data;
                            setAddress(dataAddress);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    dispatch(initialize({ isAuthenticated: true, data }))
                } else {
                    dispatch(initialize({ isAuthenticated: false, user: null }))
                }
            } catch (error) {
                dispatch(initialize({ isAuthenticated: false, user: null }))
                console.error(error);
            }
        }
    }
    const findCartDetailOfAccount = async (user) => {
        if (IdCartDetail && IdCartDetail.length > 0) {
            try {
                let response = await getCartDetailByAccountIdAndListIdCartDetail(user.id, IdCartDetail);
                if (response.status === 200) {
                    setCurrentItems(response.data);
                    if (response.data.length <= 0) {
                        toast.error("Không có sản phẩm trong giỏ hàng")
                        navigate('/cart')
                    }
                }
            } catch (error) {
                console.error(error);
                navigate('/cart')
            }
        } else {
            toast.error("Không có sản phẩm cần thanh toán")
            navigate('/cart')
        }
    }
    const findCartDetailPayNowAndLocal = async () => {
        if (listProductDetails && listProductDetails.length > 0) {
            try {
                let response = await findListPayProductDetail(listProductDetails);
                if (response.status === 200) {
                    const validProducts = response.data.filter((product) => !product.error);
                    setCurrentItems(validProducts);
                    const productDetailPromoRequests = validProducts.map((product) => ({
                        idProductDetail: product.idProductDetail,
                        quantity: product.quantityBuy,
                    }));

                    setPayProductDetail(productDetailPromoRequests);
                    const invalidProducts = response.data.filter((product) => product.error);
                    if (listProductDetails && listProductDetails.length > 0) {
                        console.error("Invalid products:", invalidProducts);
                        invalidProducts.forEach((product) => {
                            toast.error(product.error);
                        });
                    }
                    if (validProducts.length <= 0) {
                        toast.error("Không có sản phẩm cần thanh toán")
                        navigate('/')
                    }
                }
            } catch (error) {
                console.error(error);
                navigate('/')
            }
        } else {
            toast.error("Không có sản phẩm cần thanh toán")
            navigate('/')
        }
    }
    useEffect(() => {
        checkLogin()
    }, [dispatch]);

    function findAddressDetail(address) {
        if (address) {
            // Tách chuỗi thành một mảng các phần tử
            const addressParts = address.split(", ");

            // Lấy các phần tử từ đầu đến trước 4 phần tử cuối cùng
            const resultParts = addressParts.slice(0, -4);

            // Kết hợp lại thành chuỗi
            const resultAddress = resultParts.join(", ");

            return resultAddress ? resultAddress : "";
        }
    }
    //Dữ liệu thanh toán hóa đơn
    useEffect(() => {
        //Tính tổng tiền hàng
        let total = calculateTotalCartPriceForSelected();
        setTotalMerchandise(total);
    }, [currentItems, totalMerchandise, voucher]);

    const calculateTotalCartPriceForSelected = () => {
        // Tính tổng giá các sản phẩm được chọn
        return currentItems.reduce((total, productDetail) => {
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
    const handlers = {
        UPDATE_PAYMENT: checkLogin
    };

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        if (address) {
            setSelectedCity(address?.codeCity || '');
            setSelectedDistrict(address?.codeDistrict || '');
        }
    }, [address]);
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
        const {
            productDetailPrice,
            quantityCartDetail,
            quantityBuy,
            quantityPromotionDetail,
            value
        } = productDetail;

        // Áp dụng điều kiện để chọn số lượng phù hợp
        const quantity = method ? quantityCartDetail : quantityBuy;
        if (!value) {
            // Nếu không có khuyến mãi
            return productDetailPrice * quantity;
        } else if (quantity <= quantityPromotionDetail) {
            // Nếu có khuyến mãi và số lượng <= số lượng được áp dụng khuyến mãi
            return productDetailPrice * (1 - value / 100) * quantity;
        } else {
            // Nếu có khuyến mãi và số lượng > số lượng được áp dụng khuyến mãi
            return (
                productDetailPrice * (1 - value / 100) * quantityPromotionDetail +
                productDetailPrice * (quantity - quantityPromotionDetail)
            );
        }
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
        address: yup.string().required('Địa chỉ cụ thể là bắt buộc.'),
        note: yup.string().max(250, 'Lời nhắn không được vượt quá 250 ký tự.')
    });
    const payBill = async (IdCartDetail, codeVoucher, idAccount, name, phoneNumber, address, note) => {
        try {
            const response = await payBillOnline(IdCartDetail, codeVoucher, idAccount, name, phoneNumber, address, note)
            if (response.status === 200) {
                toast.success("Thanh toán thành công!");
                return true;
            }
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            return false;
        }
    }
    const payBillv2 = async (productDetailPromoRequests, codeVoucher, idAccount, name, phoneNumber, address, note) => {
        try {
            const response = await payBillOnlinev2(productDetailPromoRequests, codeVoucher, idAccount, name, phoneNumber, address, note)
            if (response.status === 200) {
                toast.success("Thanh toán thành công!");
                return true;
            }
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            return false;
        }
    }

    const handleSubmitCreate = async (values) => {

        try {

            if ((totalAmount) > 100000000) {
                swal({
                    title: "Tổng thanh toán vượt quá giới hạn!",
                    text: "Tổng thanh toán không được vượt quá 100.000.000 VND. Vui lòng liên hệ đến hotline +84 888 888 888.",
                    icon: "error",
                    button: "OK",
                });


                return; // Dừng quá trình nếu vượt quá giới hạn
            }


            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);
            const nameCustomer = values?.name || '';
            const phoneNumber = values?.phoneNumber || '';
            const note = values?.note || '';
            // Tạo địa chỉ đầy đủ
            const fullAddress = `${values.address}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;
            swal({
                title: "Bạn có muốn thanh toán sản phẩm?",
                text: `Thanh toán sản phẩm!`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    if (method) {
                        // Gửi yêu cầu thanh toán
                        const isSuccess = await payBill(IdCartDetail, voucher.codeVoucher, idUser || '', nameCustomer, phoneNumber, fullAddress, note);

                        if (isSuccess) {
                            // Nếu thành công
                            swal("Thanh toán thành công!", {
                                icon: "success",
                            });
                            navigate('/cart')
                        } else {
                            // Nếu thất bại
                            swal("Thanh toán thất bại!", {
                                icon: "error",
                            });
                        }
                    } else {
                        const isSuccess = await payBillv2(payProductDetail, voucher.codeVoucher, idUser || '', nameCustomer, phoneNumber, fullAddress, note);

                        if (isSuccess) {
                            // Nếu thành công
                            swal("Thanh toán thành công!", {
                                icon: "success",
                            });
                            navigate('/')
                        } else {
                            // Nếu thất bại
                            swal("Thanh toán thất bại!", {
                                icon: "error",
                            });
                        }
                    }
                } else {
                    // Người dùng hủy thanh toán
                    swal("Hủy thanh toán!", {
                        icon: "info",
                    });
                }
            });
        } catch (error) {
            toast.error("Lỗi . Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="payment-container p-5 row">
            <EventListener handlers={handlers} />
            <div className="col-lg-6 col-md-12 p-5">
                <h4>Trang thanh toán</h4>
                <p className="text-custom-color">Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển phù hợp</p>
                <div className="product-list">
                    {currentProducts.map((item) => (
                        <div key={item.idCartDetail} className="payment-card">
                            <table className="product-table">
                                <tbody>
                                    <tr>
                                        <td rowSpan="4" className="product-image-cell">
                                            <ListImageProduct
                                                id={item.idProductDetail}
                                                maxWidth="150px"
                                                maxHeight="150px"
                                            />
                                        </td>
                                        <td colSpan="2"><h3>{item.nameProduct}</h3></td>
                                    </tr>
                                    <tr><td>Màu: {item.nameColor} - Kích cỡ: {item.nameSize}</td></tr>
                                    <tr><td>Số lượng: {(method ? item.quantityCartDetail : item.quantityBuy)}</td></tr>
                                    <tr>
                                        {item.value ? (
                                            <td>
                                                <p className='text-danger'>
                                                    {formatCurrency((item.productDetailPrice || 0) * (1 - (item.value / 100)))} VND
                                                </p>
                                                <p className="text-decoration-line-through">
                                                    {formatCurrency(item.productDetailPrice || 0)} VND
                                                </p>
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

                    <Pagination className="justify-content-center mt-4">
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>


                {/* Voucher Application */}
                <div className="voucher-container">
                    <h3>ÁP DỤNG MÃ GIẢM GIÁ</h3>
                    <div className="voucher-input-container">
                        <input
                            type="text"
                            value={voucher.codeVoucher}
                            placeholder="Nhập mã voucher tại đây"
                            className="voucher-input"
                            readOnly
                        />
                        <ModalAddVoucher totalMerchandise={totalMerchandise} setVoucher={setVoucher} />
                    </div>
                </div>
            </div>
            <Formik
                initialValues={{
                    name: address?.nameAccount || "",
                    phoneNumber: address?.phoneNumber || "",
                    city: address?.codeCity || "",
                    district: address?.codeDistrict || "",
                    ward: address?.codeWard || "",
                    address: findAddressDetail(address?.address || ""),
                    note: "",
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmitCreate}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Form noValidate onSubmit={handleSubmit} className="col-lg-6 col-md-12 p-5">
                        <h4>Chi tiết thanh toán</h4>
                        <p className="text-custom-color">
                            Hoàn thành đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh toán của
                            bạn.
                        </p>
                        <div className="p-4">
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nhập họ và tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Nhập họ và tên"
                                        isInvalid={touched.name && !!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nhập số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Nhập số điện thoại"
                                        isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phoneNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Chọn Tỉnh/Thành Phố</Form.Label>
                                    <Form.Select
                                        name="city"
                                        value={values.city}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setSelectedCity(e.target.value);
                                            setFieldValue("district", "");
                                            setFieldValue("ward", "");
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.city && !!errors.city}
                                    >
                                        <option value="">Chọn Tỉnh/Thành Phố</option>
                                        {cities.map((city, index) => (
                                            <option key={index} value={city.code}>
                                                {city.name_with_type}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="6">
                                    <Form.Label>Chọn Quận/Huyện</Form.Label>
                                    <Form.Select
                                        name="district"
                                        value={values.district}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setSelectedDistrict(e.target.value);
                                            setFieldValue("ward", "");
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.district && !!errors.district}
                                        disabled={!selectedCity}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map((district) => (
                                            <option key={district.code} value={district.code}>
                                                {district.name_with_type}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.district}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Chọn Phường/Xã</Form.Label>
                                    <Form.Select
                                        name="ward"
                                        value={values.ward}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.ward && !!errors.ward}
                                        disabled={!selectedDistrict}
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map((ward) => (
                                            <option key={ward.code} value={ward.code}>
                                                {ward.name_with_type}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ward}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nhập địa chỉ cụ thể</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.address && !!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Lời nhắn</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="note"
                                    value={values.note}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.note && !!errors.note}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.note}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="radio"
                                    name="paymentMethod"
                                    label="Thanh toán khi nhận hàng"
                                    value="cod"
                                    defaultChecked
                                    onChange={handleChange}
                                />
                            </Form.Group>

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
                                    <span>- {priceDiscount ? priceDiscount.toLocaleString() : "0"} VND</span>
                                </div>
                                <hr className="dotted-line" />
                                <div className="summary-row total">
                                    <span>Tổng thanh toán</span>
                                    <span className="highlight">
                                        {((totalAmount || 0)).toLocaleString()} VND
                                    </span>
                                </div>
                                <Button variant="primary" type="submit" className="btn btn-primary place-order-btn">
                                    Đặt hàng
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>;
        </div>
    );
};

export default Payment;
