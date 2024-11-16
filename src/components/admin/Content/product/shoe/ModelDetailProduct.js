import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import authorizeAxiosInstance from '../../../../../hooks/authorizeAxiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosEye } from "react-icons/io";
import ModelAddQuanityPrice from './ModelAddQuanityPrice';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
const ModalViewProductDetail = ({ idProduct }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        productCode: '',
        description: '',
        idBrand: '',
        idCategory: '',
        idMaterial: '',
     
        idShoeSole: '',
        productSizes: [],
        productColors: [],
        imageBytes: []
    });
    const [Products, setProducts] = useState([]); // Thêm state để lưu sản phẩm
    const [productDetails, setProductDetails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [shoeSoles, setShoeSoles] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null); // Chỉ số sản phẩm được chọn
    // const [initialFormData, setInitialFormData] = useState({});
    // const [initialProductDetails, setInitialProductDetails] = useState([]);
    const navigate = useNavigate();
    const handleShow = () => {
        setShow(true);
    };
    
    const handleClose = () => {
        setShow(false);
    };
    
    const [errors, setErrors] = useState({});
    // Lấy danh sách các lựa chọn cho sản phẩm (thương hiệu, danh mục, chất liệu, đế giày)
    // Định nghĩa fetchProductDetail bên ngoài useEffect
    const fetchProductDetail = async () => {
        if (idProduct) {
            try {
                const response = await authorizeAxiosInstance.get(`/productDetail/list-productDetail?productId=${idProduct}`);
                const productDetails = response.data.DT.content;
                // console.log("ad", productDetails);
                setProductDetails(productDetails);
                setFormData({
                    id: productDetails[0]?.idProduct || '',
                    name: productDetails[0]?.nameProduct || '',
                    description: productDetails[0]?.description || '',
                    productCode: productDetails[0]?.productCode || '',
                    idBrand: productDetails[0]?.idBrand || '',
                    idCategory: productDetails[0]?.idCategory || '',
                    idMaterial: productDetails[0]?.idMaterial || '',
                    idShoeSole: productDetails[0]?.idShoeSole || '',
                    productSizes: response.data.DT.sizes || [],
                    productColors: response.data.DT.colors || [],
                    imageBytes: productDetails[0]?.imageBytes || []
                }); 
    
            } catch (error) {
                toast.error('Failed to load product detail');
            }
        }
    };

    // useEffect để gọi fetchProductDetail khi idProduct thay đổi
    useEffect(() => {
        const fetchProductOptions = async () => {
            try {
                const [categoriesRes, brandsRes, materialsRes, shoeSolesRes] = await Promise.all([
                    authorizeAxiosInstance.get('/category/list-category'),
                    authorizeAxiosInstance.get('/brand/list-brand'),
                    authorizeAxiosInstance.get('/material/list-material'),
                    authorizeAxiosInstance.get('/shoeSole/list-shoeSole')
                ]);
                setCategories(categoriesRes.data);
                setBrands(brandsRes.data);
                setMaterials(materialsRes.data);
                setShoeSoles(shoeSolesRes.data);
            } catch (error) {
                toast.error('Failed to load product options');
            }
        };

        fetchProductOptions();
        fetchProductDetail(); // Gọi fetchProductDetail khi idProduct thay đổi
    }, [idProduct]);

    const validateFields = () => {
        let errors = {};

        // Validate Tên sản phẩm
        if (!formData.name.trim()) {
            errors.name = "Tên sản phẩm không được để trống.";
        }

        // Validate Mô tả
        if (!formData.description.trim()) {
            errors.description = "Mô tả không được để trống.";
        }

        // Validate Thương hiệu
        if (!formData.idBrand) {
            errors.idBrand = "Vui lòng chọn thương hiệu.";
        }

        // Validate Danh mục
        if (!formData.idCategory) {
            errors.idCategory = "Vui lòng chọn danh mục.";
        }

        // Validate Đế giày
        if (!formData.idMaterial) {
            errors.idMaterial = "Vui lòng chọn đế giày.";
        }

        // Validate Chất liệu
        if (!formData.idShoeSole) {
            errors.idShoeSole = "Vui lòng chọn chất liệu.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const handleStatusChange = (item) => {
        const updatedStatus = item.status === "ACTIVE" ? "STOPPED" : "ACTIVE";
        if (item && item.id) {
            updateProductStatus(item.id, updatedStatus);
        } else {
            console.error('Item or Item ID is undefined');
        }
    };
    const updateProductStatus = async (productId, newStatus) => {
        const url = `http://localhost:8080/api/v1/productDetail/updateStatus/${productId}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi cập nhật trạng thái sản phẩm');
            }
            await  fetchProductDetail(); // Làm mới danh sách sản phẩm sau khi cập nhật
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái sản phẩm:', error);
        }
    };

    // Hàm xử lý khi thay đổi lựa chọn
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleProductSelect = (index) => {
        setSelectedProducts((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
        console.log("Selected products:", selectedProducts);
    };


    const handleQuantityChange = (e, index) => {
        const { value } = e.target;
        const newDetails = [...productDetails];
        if (value <= 1) { // Kiểm tra số lượng
            toast.error('Số lượng phải lớn hơn 1')
            return;
        }
        newDetails[index].quantity = value; // Cập nhật số lượng
        setProductDetails(newDetails);
    };

    // Xử lý thay đổi giá
    const handlePriceChange = (e, index) => {
        const { value } = e.target;
        const newDetails = [...productDetails];
        if (value <= 100000) { // Kiểm tra giá
            toast.error('Giá phải lớn hơn 100,000')
            return;
        }
        newDetails[index].price = value; // Cập nhật giá
        setProductDetails(newDetails);
    };

    // Hàm cập nhật sản phẩm
    const handleUpdateProduct = async () => {
        if (productDetails.length === 0) {
            alert('Không có sản phẩm nào để cập nhật.');
            return;
        }
        console.log("formData.id:", formData.id);  // Log formData.id để kiểm tra
        if (!formData.id) {
            console.error('ID sản phẩm chưa được xác định.');
            alert('Không tìm thấy ID sản phẩm. Vui lòng thử lại.');
            return;
        }
    
        const dataToSend = {
            ...formData,
            brand: { id: formData.idBrand },
            category: { id: formData.idCategory },
            material: { id: formData.idMaterial },
            shoeSole: { id: formData.idShoeSole },
            description: formData.description,
            productCode: formData.productCode,
            status: formData.status,
        };
    
        try {
            // Gửi dữ liệu cập nhật sản phẩm đến API
            const response = await authorizeAxiosInstance.put(`/product/update/${formData.id}`, dataToSend);
            const idProduct = response?.data?.DT?.id;
            console.log("ID sản phẩm:", idProduct);
    
            if (!idProduct) {
                throw new Error('idProduct is undefined');
            }
            console.log("Product details:", productDetails);
    
            // Lặp qua từng sản phẩm để cập nhật chi tiết
            for (const item of productDetails) {
                if (!item || !item.id) {
                    console.error("Phần tử trong productDetails bị thiếu hoặc không có id:", item);
                    continue;  // Bỏ qua phần tử nếu nó không hợp lệ
                }
                const productDetail = {
                    product: { id: idProduct },
                    quantity: item.quantity,
                    price: item.price,
                    description: formData.description,
                    imageBytes: item.imageBytes,
                    status: formData.status,
                };
    
                try {
                    const productDetailUpdateResponse = await authorizeAxiosInstance.put(`/productDetail/update/${item.id}`, productDetail);
                    console.log("Product detail update response:", productDetailUpdateResponse?.data?.DT);
                } catch (error) {
                    console.error('Error updating product detail:', error.response ? error.response.data : error.message);
                }
            }
    
            const selectedItems = productDetails.filter((_, index) => selectedProducts.includes(index));
            if (selectedItems.length === 0) {
                alert('No products selected.');
                return;
            }
    
            try {
                // Lặp qua các sản phẩm đã chọn để cập nhật hình ảnh
                const updatePromises = selectedItems.map(async (item) => {
                    const { id, imageBytes } = item; // Sử dụng 'id' từ item thay cho 'idProductDetail'
                    console.log("Checking item for image update:", { id, imageBytes });
    
                    if (id && imageBytes && imageBytes.length > 0) {
                        const imageUpdateUrl = `/image/updateImages2`;
    
                        console.log("Sending image update for product detail:", {
                            idProductDetail: id,
                            imageBytes,
                        });
    
                        try {
                            const imageUpdateResponse = await authorizeAxiosInstance.post(imageUpdateUrl, {
                                idProductDetail: id, // Sử dụng 'id' làm 'idProductDetail'
                                imageBytes,
                            });
                            console.log('Images updated successfully:', imageUpdateResponse.data);
                        } catch (error) {
                            console.error('Error updating images:', error.response ? error.response.data : error.message);
                        }
                    } else {
                        console.warn('Skipping image update for item due to missing id or imageBytes:', { id, imageBytes });
                    }
                });
    
                await Promise.all(updatePromises);
            } catch (error) {
                console.error('Failed to update selected items:', error);
            }
    
            toast.success('Sản phẩm và chi tiết sản phẩm đã được cập nhật thành công!');
            handleClose();
            await fetchProductDetail(); // Đảm bảo hàm fetchProductDetail được gọi ngay lập tức
    
        } catch (error) {
            toast.error('Failed to update product');
            console.error(error.response ? error.response.data : error.message);
        }
    };
    
    
    

    
    const updateQuantityAndPriceForAll = (selectedIndexes, quantity, price) => {
        console.log("Updating selected products with quantity:", quantity, "and price:", price);
        console.log("Selected indexes:", selectedIndexes);

        // Cập nhật số lượng và giá cho các sản phẩm được chọn
        setProductDetails((prevDetails) => {
            const updatedDetails = prevDetails.map((item, index) => {
                if (selectedIndexes.includes(index)) {
                    return { ...item, quantity, price }; // Cập nhật quantity và price
                }
                return item;
            });
            console.log("Updated product details:", updatedDetails); // Log sản phẩm đã cập nhật
            return updatedDetails;
        });
    };
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        validateFields(); // Gọi hàm validate để kiểm tra lỗi
    };
    const [touched, setTouched] = useState({
        name: false,
        description: false,
        idBrand: false,
        idCategory: false,
        idMaterial: false,
        idShoeSole: false,
    });

    const handleImageUpload = (e, index) => {
        const files = e.target.files;
        const maxFiles = 5; // Giới hạn tối đa 5 tệp
        if (files.length === 0) {
            console.warn("No files selected");
            return;
        }
        if (files.length > maxFiles) {
            toast.error("Bạn chỉ có thể chọn tối đa 5 hình ảnh. Vui lòng chọn lại.");
            e.target.value = ""; // Xóa giá trị đã chọn để người dùng phải chọn lại
            return; // Dừng hàm nếu vượt quá giới hạn
        }
    
        const readers = Array.from(files).map(file => {
            if (!file.type.startsWith("image/")) {
                console.error(`File ${file.name} is not an image.`);
                return Promise.reject(`File ${file.name} is not an image.`);
            }
    
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result.replace("data:", "").replace(/^.+,/, "")); // Base64 encoding
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });
    
        Promise.all(readers)
            .then(base64Images => {
                setProductDetails(prevProductDetails => {
                    const updatedProducts = [...prevProductDetails];
                    const currentProduct = updatedProducts[index];
                  
    
                    // Cập nhật hình ảnh cho sản phẩm hiện tại
                    updatedProducts[index] = {
                        ...currentProduct,
                        imageBytes: base64Images,
                    };
    
                    // // Chỉ cập nhật hình ảnh cho các sản phẩm có cùng màu hiện tại
                    // updatedProducts.forEach((product, i) => {
                      
                    //         // Kiểm tra xem hình ảnh mới đã có trong sản phẩm này chưa
                    //         const newImages = base64Images.filter(img => !product.imageBytes?.includes(img));
                    //         product.imageBytes = [...(product.imageBytes || []), ...newImages]; // Thêm hình ảnh mới không trùng lặp
                        
                    // });
    
                    return updatedProducts;
                });
                console.log("Images uploaded successfully!");
            })
            .catch(error => console.error("Error uploading images:", error));

            
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
            <MdOutlineSystemUpdateAlt /> 
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            {/* Các trường thông tin sản phẩm */}
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tên sản phẩm</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            readOnly
                                            onBlur={handleBlur} // Thêm handleBlur
                                            className={touched.name && errors.name ? "is-invalid" : ""} // Kiểm tra và thêm lớp lỗi
                                        />
                                        {touched.name && errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div> // Hiển thị lỗi
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>chi tiết sản phẩm</Form.Label>
                                        <Form.Control
                                            type="textarea"
                                            name="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData(prevData => ({
                                                ...prevData,
                                                description: e.target.value
                                            }))} // Cập nhật giá trị khi người dùng nhập
                                            onBlur={handleBlur} // Thêm handleBlur
                                            className={touched.description && errors.description ? "is-invalid" : ""} // Kiểm tra và thêm lớp lỗi
                                        />
                                        {touched.description && errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div> // Hiển thị lỗi
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Thương hiệu</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="idBrand"
                                            value={formData.idBrand}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur} // Thêm handleBlur
                                            className={touched.idBrand && errors.idBrand ? "is-invalid" : ""} // Kiểm tra và thêm lớp lỗi
                                        >
                                            <option value="">Chọn thương hiệu...</option>
                                            {brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {touched.idBrand && errors.idBrand && (
                                            <div className="invalid-feedback">{errors.idBrand}</div> // Hiển thị lỗi
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Danh mục</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="idCategory"
                                            value={formData.idCategory}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur} // Thêm handleBlur
                                            className={touched.idCategory && errors.idCategory ? "is-invalid" : ""} // Kiểm tra và thêm lớp lỗi
                                        >
                                            <option value="">Chọn danh mục...</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {touched.idCategory && errors.idCategory && (
                                            <div className="invalid-feedback">{errors.idCategory}</div> // Hiển thị lỗi
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Chất liệu</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="idMaterial"
                                            value={formData.idMaterial}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur} // Thêm handleBlur
                                            className={touched.idMaterial && errors.idMaterial ? "is-invalid" : ""} // Kiểm tra và thêm lớp lỗi
                                        >
                                            <option value="">Chọn chất liệu...</option>
                                            {materials.map((material) => (
                                                <option key={material.id} value={material.id}>
                                                    {material.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {touched.idMaterial && errors.idMaterial && (
                                            <div className="invalid-feedback">{errors.idMaterial}</div> // Hiển thị lỗi
                                        )}
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Đế giày</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="idShoeSole"
                                            value={formData.idShoeSole}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur} // Thêm handleBlur
                                            className={touched.idShoeSole && errors.idShoeSole ? "is-invalid" : ""} // Kiểm tra và thêm lớp lỗi
                                        >
                                            <option value="">Chọn đế giày...</option>
                                            {shoeSoles.map((shoeSole) => (
                                                <option key={shoeSole.id} value={shoeSole.id}>
                                                    {shoeSole.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {touched.idShoeSole && errors.idShoeSole && (
                                            <div className="invalid-feedback">{errors.idShoeSole}</div> // Hiển thị lỗi
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="add-button text-end">
                                <ModelAddQuanityPrice
                                    // Gọi onUpdate với selectedIndexes, quantity, và price
                                    onUpdate={(selectedIndexes, quantity, price) =>
                                        updateQuantityAndPriceForAll(selectedIndexes, quantity, price)
                                    }
                                    selectedIndexes={selectedProducts} // Danh sách các sản phẩm được chọn
                                    className="mx-4 p-2"
                                />

                                <Button className="mx-3" onClick={handleUpdateProduct}>Hoàn tất</Button>
                            </div>


                            {/* Bảng hiển thị các chi tiết sản phẩm */}
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                        <th>Kích cỡ</th>
                                        <th>Màu sắc</th>
                                        <th></th>
                                        <th>Ảnh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productDetails.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(index)}
                                                    onChange={() => handleProductSelect(index)}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.nameProduct}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(e, index)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={item.price}
                                                    onChange={(e) => handlePriceChange(e, index)}
                                                />
                                            </td>
                                            <td>{item.nameSize}</td>
                                            <td>{item.nameColor}</td>
                                            <td>
                                    {item.status === "ACTIVE" ? "Đang bán" : item.status === "STOPPED" ? "Hết hàng" : item.status || 'N/A'}
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={item.status === "ACTIVE"}
                                            onChange={() => handleStatusChange(item)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                            <td>
                                            <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(e) => handleImageUpload(e, index)} // Pass index to associate with the correct product
                                                />
                                                {item.selectedImage ? (
                                                    <img
                                                        src={item.selectedImage}
                                                        alt="Selected Preview"
                                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                    />
                                                ) : (
                                                    item.imageBytes && Array.isArray(item.imageBytes) ? (
                                                        item.imageBytes.map((image, i) => (
                                                            <img
                                                                key={i}
                                                                src={`data:image/jpeg;base64,${image}`}
                                                                alt="Uploaded Image"
                                                                style={{ width: '100px', height: '100px', margin: '5px' }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <span>No Images</span>
                                                    )
                                                )}
                                            </td>




                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewProductDetail;
