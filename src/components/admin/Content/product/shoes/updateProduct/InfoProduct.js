import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Form, Container, Row, Col } from 'react-bootstrap';
import uploadFile from './pngegg.png'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllBrandActive } from '../../../../../../redux/action/brandAction';
import { fetchAllCategoryActive } from '../../../../../../redux/action/categoryAction';
import { fetchAllMaterialActive } from '../../../../../../redux/action/materialAction';
import { fetchAllShoeSoleActive } from '../../../../../../redux/action/shoeSoleAction';
const InfoProduct = ({ product, setProduct, formErrors, setFormErrors }) => {
    const dispatch = useDispatch();

    const brands = useSelector((state) => state.brand.listBrand);
    const categorys = useSelector((state) => state.category.listCategory);
    const materials = useSelector((state) => state.material.listMaterial);
    const shoeSoles = useSelector((state) => state.shoeSole.listShoeSole);

    useEffect(() => {
        dispatch(fetchAllBrandActive());
        dispatch(fetchAllCategoryActive());
        dispatch(fetchAllMaterialActive());
        dispatch(fetchAllShoeSoleActive());
    }, [dispatch]);

    const [previewImage, setPreviewImage] = useState("");

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const arrayBuffer = e.target.result;
            const bytes = new Uint8Array(arrayBuffer);
            setProduct((prev) => ({ ...prev, image: Array.from(bytes) }));// Lưu byte[]
        };
        reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
        setPreviewImage(URL.createObjectURL(file)); // Xem trước ảnh
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRowClick = () => {
        document.getElementById("uploadFileInput").click();
    };
    const validateForm = (fieldName, fieldValue) => {
        const errors = {};

        if (fieldName === "name") {
            if (!fieldValue.trim()) {
                errors.name = "Tên sản phẩm là bắt buộc";
            } else if (fieldValue.trim().length < 2) {
                errors.name = "Tên sản phẩm phải có ít nhất 2 ký tự";
            } else if (fieldValue.trim().length > 100) {
                errors.name = "Tên sản phẩm không được vượt quá 100 ký tự";
            } else {
                errors.name = null;
            }
        } else {
            errors.name = null;
        }

        if (fieldName === "idBrand" && !fieldValue) {
            errors.idBrand = "Vui lòng chọn thương hiệu";
        } else {
            errors.idBrand = null;
        }

        if (fieldName === "idCategory" && !fieldValue) {
            errors.idCategory = "Vui lòng chọn danh mục";
        } else {
            errors.idCategory = null;
        }

        if (fieldName === "idMaterial" && !fieldValue) {
            errors.idMaterial = "Vui lòng chọn đế giày";
        } else {
            errors.idMaterial = null;
        }

        if (fieldName === "idShoeSole" && !fieldValue) {
            errors.idShoeSole = "Vui lòng chọn chất liệu";
        } else {
            errors.idShoeSole = null;
        }

        if (fieldName === "previewImage" && !fieldValue) {
            errors.previewImage = "Vui lòng upload hình ảnh";
        } else {
            errors.previewImage = null;
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === "true" ? true : value === "false" ? false : value;

        // Cập nhật dữ liệu
        setProduct((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        // Xác thực ngay khi thay đổi
        const newError = validateForm(name, newValue);
        setFormErrors((prev) => ({
            ...prev,
            ...newError,
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Cập nhật dữ liệu
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Xác thực ngay khi thay đổi
        const newError = validateForm(name, value);
        setFormErrors((prev) => ({
            ...prev,
            ...newError,
        }));
    };
    return (
        <Container fluid>
            <Form.Group className="m-3">
                <Form.Label>Tên sản phẩm:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={formErrors?.name}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col className="m-3">
                    <Form.Group>
                        <Form.Label>Thương hiệu</Form.Label>
                        <Form.Select
                            name="idBrand"
                            value={product.idBrand}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={formErrors.idBrand}
                        >
                            <option value="">Chọn thương hiệu...</option>
                            {brands?.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formErrors.idBrand}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Danh mục</Form.Label>
                        <Form.Select
                            name="idCategory"
                            value={product.idCategory}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={formErrors.idCategory}
                        >
                            <option value="">Chọn danh mục...</option>
                            {categorys?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formErrors.idCategory}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col className="m-3">
                    <Form.Group>
                        <Form.Label>Đế giày</Form.Label>
                        <Form.Select
                            name="idMaterial"
                            value={product.idMaterial}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={formErrors.idMaterial}
                        >
                            <option value="">Chọn đế giày...</option>
                            {shoeSoles?.map((shoeSole) => (
                                <option key={shoeSole.id} value={shoeSole.id}>
                                    {shoeSole.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formErrors.idMaterial}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Chất liệu</Form.Label>
                        <Form.Select
                            name="idShoeSole"
                            value={product.idShoeSole}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={formErrors.idShoeSole}
                        >
                            <option value="">Chọn chất liệu...</option>
                            {materials?.map((material) => (
                                <option key={material.id} value={material.id}>
                                    {material.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formErrors.idShoeSole}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="m-3">
                <Form.Label>Giới tính:</Form.Label>
                <div>
                    <Form.Check
                        inline
                        type="radio"
                        id="male"
                        name="gender"
                        label="Nam"
                        value="true" // Chuỗi
                        onChange={handleChange}
                        checked={product.gender === true} // So sánh với boolean
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="female"
                        name="gender"
                        label="Nữ"
                        value="false" // Chuỗi
                        onChange={handleChange}
                        checked={product.gender === false} // So sánh với boolean
                    />
                </div>
            </Form.Group>

            <input
                type="file"
                id="uploadFileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept='image/*'
            />
            <Row
                className="preview-image justify-content-center text-center p-3"
                onClick={handleRowClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "LightGray",
                    minHeight: "100px"
                }}
            >
                <Col>
                    {previewImage ? (
                        <img src={previewImage} alt="Preview" style={{ maxWidth: '20%' }} />
                    ) : (
                        <>
                            <img
                                src={`data:image/jpeg;base64,${product?.imageByte}`}
                                alt="Product"
                                style={{ maxWidth: '20%' }}
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/150x150"; // Đổi nguồn ảnh khi lỗi
                                }}
                            />
                            <p className='p-3'>Kéo thả file hoặc nhấn vào đây để upload</p>
                        </>
                    )}
                </Col>
            </Row>

        </Container >
    );
};

export default InfoProduct;
