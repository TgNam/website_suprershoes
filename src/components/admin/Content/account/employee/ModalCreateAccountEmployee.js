
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getCities, getDistricts, getWards } from "../../../../../Service/ApiProvincesService";
import { createNewEmployee } from '../../../../../redux/action/AccountAction';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { Formik } from 'formik';

function ModalCreateAccountEmployee() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [loading, setLoading] = useState(false);
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
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    // Yup validation schema
    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Tên là bắt buộc')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Tên không được vượt quá 50 ký tự')
            .matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên không được chứa số hoặc ký tự đặc biệt'),
        email: yup
            .string()
            .email('Email không hợp lệ')
            .required('Email là bắt buộc'),
        phoneNumber: yup
            .string()
            .required('Số điện thoại là bắt buộc')
            .test('isValidPhone', 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số', (value) =>
                /^0[0-9]{9,10}$/.test(value)
            )
            .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
            .max(11, 'Số điện thoại không được quá 11 chữ số'),
        gender: yup
            .string()
            .required('Giới tính là bắt buộc'),
        birthday: yup
            .date()
            .required('Ngày sinh là bắt buộc')
            .max(minAge, 'Bạn phải ít nhất 18 tuổi'),
        status: yup
            .string()
            .required('Trạng thái tài khoản là bắt buộc'),
        city: yup.string().required('Tỉnh/Thành phố là bắt buộc'),
        district: yup.string().required('Quận/Huyện là bắt buộc'),
        ward: yup.string().required('Phường/Xã là bắt buộc'),
        addressDetail: yup.string().required('Địa chỉ chi tiết là bắt buộc').min(2, 'Địa chỉ chi tiết phải chứa ít nhất 2 ký tự').max(100, 'Địa chỉ chi tiết không được vượt quá 100 ký tự')
    });

    const handleSubmitCreate = async (values, { resetForm }) => {
        setLoading(true); // Bắt đầu hiển thị spinner
        try {
            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);
    
            // Tạo địa chỉ đầy đủ
            const fullAddress = `${values.addressDetail}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;
    
            const addressRequest = {
                codeCity: selectedCity || "",
                codeDistrict: selectedDistrict || "",
                codeWard: selectedWard || "",
                address: fullAddress || ""
            };
    
            const accountRequest = {
                name: values.name || "",
                email: values.email || "",
                phoneNumber: values.phoneNumber || "",
                gender: values.gender || "",
                birthday: values.birthday || "",
                role: 'EMPLOYEE',
                status: 'ACTIVE',
            };
    
            // Dispatch action tạo nhân viên
            await dispatch(createNewEmployee({ addressRequest, accountRequest }));
    
            // Hiện thông báo thành công
            // toast.success("", {
            //     autoClose: 2000, // Hiển thị trong 2 giây
            // });
    
            // Đóng modal ngay lập tức
            handleClose();
            resetForm(); // Reset form
        } catch (error) {
            // Hiện thông báo lỗi nếu xảy ra
            toast.error("Lỗi khi thêm người dùng. Vui lòng thử lại sau.");
        } finally {
            setLoading(false); // Tắt spinner
        }
    };

    if (loading) {
        return (
            <div className="spinner-wrapper">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm nhân viên mới
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhân viên mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phoneNumber: '',
                            gender: 1,
                            birthday: '',
                            status: 'ACTIVE',
                            city: '',
                            district: '',
                            ward: '',
                            addressDetail: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitCreate}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className="container rounded bg-white mt-5 mb-5">
                                    <div className="d-flex justify-content-center mb-3">
                                        <h4 className="text-right">Thêm nhân viên mới</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 border-right">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                <img
                                                    className="rounded-circle mt-5"
                                                    width="150px"
                                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                                    alt="profile"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-5 border-right">
                                            <div className="p-3 py-5">
                                                <div className="row mt-2">
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Họ và tên của người dùng:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Tên người dùng"
                                                            name="name"
                                                            maxLength={50}
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Số điện thoại của người dùng:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Số điện thoại"
                                                            name="phoneNumber"
                                                            maxLength={11}
                                                            value={values.phoneNumber}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.phoneNumber && errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Giới tính:</label>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="gender"
                                                                id="nam"
                                                                value="1"
                                                                checked={values.gender === 1}
                                                                onChange={() => setFieldValue('gender', 1)}
                                                            />
                                                            <label className="form-check-label" htmlFor="nam">
                                                                Nam
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="gender"
                                                                id="nu"
                                                                value="2"
                                                                checked={values.gender === 2}
                                                                onChange={() => setFieldValue('gender', 2)}
                                                            />
                                                            <label className="form-check-label" htmlFor="nu">
                                                                Nữ
                                                            </label>
                                                        </div>
                                                        {touched.gender && errors.gender && <div className="text-danger">{errors.gender}</div>}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Địa chỉ email của người dùng:</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="NguyenVanA@gmail.com"
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Ngày sinh:</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            name="birthday"
                                                            value={values.birthday}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.birthday && errors.birthday && <div className="text-danger">{errors.birthday}</div>}
                                                    </div>
                                                    <br />
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Trạng thái tài khoản:</label>
                                                        <select
                                                            className="form-select"
                                                            name="status"
                                                            value={values.status}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        >
                                                            <option value="ACTIVE">Kích hoạt</option>
                                                            <option value="INACTIVE">Khóa</option>
                                                        </select>
                                                        {touched.status && errors.status && <div className="text-danger">{errors.status}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-3 py-5">

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Thành phố</Form.Label>
                                                    <Form.Select
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
                                                        <option value="">Tỉnh/Thành phố</option>
                                                        {cities.map((city) => (
                                                            <option key={city.code} value={city.code}>
                                                                {city.name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.city}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Quận/Huyện</Form.Label>
                                                    <Form.Select
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
                                                    >
                                                        <option value="">Quận/Huyện</option>
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

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Phường/Xã</Form.Label>
                                                    <Form.Select
                                                        name="ward"
                                                        value={values.ward}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setSelectedWard(e.target.value)
                                                        }}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.ward && !!errors.ward}
                                                        disabled={!selectedDistrict}
                                                    >
                                                        <option value="">Phường/Xã</option>
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

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Địa chỉ chi tiết:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="addressDetail"
                                                        value={values.addressDetail}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.addressDetail && !!errors.addressDetail}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.addressDetail}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Đóng
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Lưu thông tin nhân viên
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalCreateAccountEmployee;
