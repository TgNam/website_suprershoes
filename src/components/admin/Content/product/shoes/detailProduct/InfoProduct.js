import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBrand } from '../../../../../../redux/action/brandAction';
import { fetchAllCategory } from '../../../../../../redux/action/categoryAction';
import { fetchAllMaterial } from '../../../../../../redux/action/materialAction';
import { fetchAllShoeSole } from '../../../../../../redux/action/shoeSoleAction';
const InfoProduct = ({ product }) => {
    const dispatch = useDispatch();

    const brands = useSelector((state) => state.brand.listBrand);
    const categorys = useSelector((state) => state.category.listCategory);
    const materials = useSelector((state) => state.material.listMaterial);
    const shoeSoles = useSelector((state) => state.shoeSole.listShoeSole);

    useEffect(() => {
        dispatch(fetchAllBrand());
        dispatch(fetchAllCategory());
        dispatch(fetchAllMaterial());
        dispatch(fetchAllShoeSole());
    }, [dispatch]);

    return (
        <Container fluid>
            <Form.Group className="m-3">
                <Form.Label>Tên sản phẩm:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    name="name"
                    value={product.name}
                    disabled
                />
            </Form.Group>

            <Row>
                <Col className="m-3">
                    <Form.Group>
                        <Form.Label>Thương hiệu</Form.Label>
                        <Form.Select
                            name="idBrand"
                            value={product.idBrand}
                            disabled
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brands?.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Danh mục</Form.Label>
                        <Form.Select
                            name="idCategory"
                            value={product.idCategory}
                            disabled
                        >
                            <option value="">Chọn danh mục</option>
                            {categorys?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col className="m-3">
                    <Form.Group>
                        <Form.Label>Đế giày</Form.Label>
                        <Form.Select
                            name="idShoeSole"
                            value={product.idShoeSole}
                            disabled
                        >
                            <option value="">Chọn đế giày</option>
                            {shoeSoles?.map((shoeSole) => (
                                <option key={shoeSole.id} value={shoeSole.id}>
                                    {shoeSole.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Chất liệu</Form.Label>
                        <Form.Select
                            name="idMaterial"
                            value={product.idMaterial}
                            disabled
                        >
                            <option value="">Chọn chất liệu</option>
                            {materials?.map((material) => (
                                <option key={material.id} value={material.id}>
                                    {material.name}
                                </option>
                            ))}
                        </Form.Select>
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
                        checked={product?.gender === true}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="female"
                        name="gender"
                        label="Nữ"
                        checked={product?.gender === false}
                    />
                </div>
            </Form.Group>

            <input
                type="file"
                id="uploadFileInput"
                style={{ display: "none" }}
                disabled
            />
            <Row
                className="preview-image justify-content-center text-center p-3"
                style={{
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "LightGray",
                    minHeight: "100px"
                }}
            >
                <Col>
                    {
                        product?.imageByte ? (
                            <img
                                src={`data:image/jpeg;base64,${product.imageByte}`}
                                alt="Product"
                                style={{ maxWidth: '20%' }}
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/150x150"; // Đổi nguồn ảnh khi lỗi
                                }}
                            />
                        ) : (
                            <img
                                src="https://placehold.co/150x150"
                                alt="Placeholder"
                                style={{ maxWidth: '150px', maxHeight: '150px' }}
                            />
                        )
                    }
                </Col>

            </Row>

        </Container >
    );
};

export default InfoProduct;
