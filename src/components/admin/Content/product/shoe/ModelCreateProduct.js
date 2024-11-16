import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModelCreateProduct.scss';
import ModelAddSize from './ModelAddSize';
import ModelAddColor from './ModelAddColor';
import ModelAddQuanityPrice from './ModelAddQuanityPrice';
import authorizeAxiosInstance from '../../../../../hooks/authorizeAxiosInstance';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';


import { useFormik } from 'formik';
const ModelCreateProduct = () => {
    const [Products, setProducts] = useState([]); // Thêm state để lưu sản phẩm
    const [formData, setFormData] = useState({
        productCode: '',
        name: '',
        description: '',
        gender: false,
        idBrand: Number(''),
        idCategory: Number(''),
        idMaterial: Number(''),
        idShoeSole: Number(''),
        quantity: Number('10'),
        price: Number('100000'),
        status: 'ACTIVE',
        productSizes: [],   // Mảng để lưu danh sách kích cỡ
        productColors: [],  // Mảng để lưu danh sách màu sắc
        imageByte: [] // Thêm mảng để lưu trữ hình ảnh
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [shoeSoles, setShoeSoles] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Lưu trữ ảnh được chọn
    const [selectedIndex, setSelectedIndex] = useState(null); // Chỉ số sản phẩm được chọn



    const validateFields = () => {
        let errors = {};

        // Validate Tên sản phẩm
        if (!formData.name.trim()) {
            errors.name = "Tên sản phẩm không được để trống.";
        }else if (formData.name.trim().length > 50) {
            errors.name = "Tên sản phẩm không được vượt quá 50 ký tự.";
        }

        // Validate Mô tả
        if (!formData.description.trim()) {
            errors.description = "Mô tả không được để trống.";
        }else if (formData.description.trim().length > 500) {
            errors.description = "Mô tả sản phẩm không được vượt quá 500 ký tự.";
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



    const handleImageChange = (e) => {
        const maxSizeInBytes = 1 * 1024 * 1024; // Giới hạn 1MB
        const files = e.target.files;
        const byteArrays = [];

        if (files && files.length > 0) {
            for (const file of files) {
                if (file.size > maxSizeInBytes) {
                    alert("Kích thước file vượt quá 1MB. Vui lòng chọn file nhỏ hơn.");
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result.split(",")[1];
                    const byteArray = base64ToByteArray(base64String); // Chuyển đổi thành mảng byte
                    byteArrays.push(byteArray);

                    console.log("Base64 Image URL:", base64String);

                    // Cập nhật formData để lưu trữ hình ảnh dưới dạng mảng byte
                    setFormData((prevData) => ({
                        ...prevData,
                        imageByte: byteArrays, // Lưu danh sách mảng byte
                        
                    }));
                    console.log("Image Byte Data:", formData.imageByte);
                    console.log("Image Byte byte:",byteArrays);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const base64ToByteArray = (base64String) => {
        const binaryString = window.atob(base64String); // Giải mã Base64 thành chuỗi nhị phân
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return Array.from(bytes); // Trả về một mảng số nguyên
    };







    const handleUpdateSizes = (newSize) => {
        setFormData({
            ...formData,
            productSizes: newSize, // cập nhật từ newSize 
        });
    };
    const handleRemoveSize = (index) => {
        setFormData(prevData => ({
            ...prevData,
            productSizes: prevData.productSizes.filter((_, i) => i !== index)
        }));
    };
    const handleUpdateColors = async (newColors) => {
        setFormData((prevData) => ({
            ...prevData,
            productColors: newColors,
        }));

        // Add product after selecting a color
        const idProduct = await addProduct();
        if (!idProduct) return; // Exit if product creation fails

        // Store idProduct in formData to use in other functions like handleProductSelect
        setFormData((prevData) => ({
            ...prevData,
            idProduct,
        }));

        console.log("Product added with ID:", idProduct);
    };

    const handleRemoveColor = (index) => {
        setFormData(prevData => ({
            ...prevData,
            productColors: prevData.productColors.filter((_, i) => i !== index)
        }));
    };

    // Hàm gọi API để lấy danh sách danh mục
    const fetchCategories = async () => {
        try {
            const response = await authorizeAxiosInstance.get(`/category/list-category`);
            setCategories(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };
    const fetchShoeSoles = async () => {
        try {
            const response = await authorizeAxiosInstance.get(`/shoeSole/list-shoeSole`);
            setShoeSoles(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };

    // Hàm gọi API để lấy danh sách thương hiệu
    const fetchBrands = async () => {
        try {

            const response = await authorizeAxiosInstance.get(`/brand/list-brand`);

            setBrands(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };
    const fetchMaterials = async () => {
        try {

            const response = await authorizeAxiosInstance.get(`/material/list-material`);

            setMaterials(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };

    useEffect(() => {
        fetchCategories(); // Gọi hàm khi component mount hoặc khi cần
        fetchBrands();
        fetchMaterials(); // Gọi hàm khi component mount hoặc khi cần
        fetchShoeSoles();
    }, []);
    useEffect(() => {
        // Ensure this only runs when you explicitly add a product, not every time formData changes
        if (isFormComplete()) {
            const sizesWithColors = formData.productSizes.flatMap(size =>
                formData.productColors.map(color => ({
                    ...formData,
                    idSize: size.id,
                    idColor: color.id,
                    nameSize: size.name,
                    code_Color: color.name,
                    imageUrl: '',  // Khởi tạo thuộc tính imageUrl cho mỗi productDetail
                }))
            );
            // Ensure no duplicate entries are added
            setProducts(prevProducts => {
                // Only add unique products
                const uniqueProducts = sizesWithColors.filter(newProduct =>
                    !prevProducts.some(
                        product => product.idSize === newProduct.idSize && product.idColor === newProduct.idColor
                    )
                );
                return [...prevProducts, ...uniqueProducts];
            });
            console.log("Products:", Products);  // In ra Products khi component được render
        }
    }, [
        formData.name,
        formData.description,
        formData.idBrand,
        formData.idCategory,
        formData.idMaterial,
        formData.idShoeSole,
        formData.productSizes,
        formData.productColors,
    ]);
    const handleCategoryChange = (event) => {
        setFormData({
            ...formData,
            idCategory: event.target.value,

        });
    };
    const handleMaterialChange = (event) => {
        setFormData({
            ...formData,
            idMaterial: event.target.value,

        });
    };
    const handleShoeSoleChange = (event) => {
        setFormData({
            ...formData,
            idShoeSole: event.target.value,

        });
    };

    const handleBrandChange = (event) => {
        setFormData({
            ...formData,
            idBrand: event.target.value,
        });
    };
    // Hàm cập nhật số lượng và giá dựa theo index
    const updateQuantityAndPriceForAll = (selectedIndexes, newQuantity, newPrice) => {
        // Cập nhật số lượng và giá cho các sản phẩm được chọn
        setProducts((prevProducts) =>
            prevProducts.map((product, index) => {
                if (selectedIndexes.includes(index)) { // Chỉ cập nhật sản phẩm có trong danh sách chỉ số đã chọn
                    return {
                        ...product,
                        quantity: newQuantity,
                        price: newPrice,
                    };
                }
                return product; // Giữ nguyên sản phẩm khác
            })
        );
    };
    


    const handleQuantityChange = (e, index) => {
        const { value } = e.target;
        const updatedQuantity = parseInt(value, 10);

        if (value === "" || isNaN(updatedQuantity)) {
            toast.error("Số lượng không hợp lệ.");
            return; // Dừng lại nếu giá trị không hợp lệ
        }
        // Kiểm tra giá trị hợp lệ
        if (updatedQuantity < 1) {
            toast.error("Số lượng phải lớn hơn 1.")
            return; // Dừng lại nếu không hợp lệ
        }
    
        setProducts(prevProducts => {
            const updatedProducts = [...prevProducts];
    
            if (updatedProducts[index].quantity !== updatedQuantity) {
                updatedProducts[index] = {
                    ...updatedProducts[index],
                    quantity: updatedQuantity
                };
                return updatedProducts;
            }
            return prevProducts;
        });
    };
    
    const handlePriceChange = (e, index) => {
        const { value } = e.target;
        const updatedPrice = parseInt(value, 10);
       if (value === "" || isNaN(updatedPrice)) {
            toast.error("Giá tiền không hợp lệ.");
            return; // Dừng lại nếu giá trị không hợp lệ
        }
        // Kiểm tra giá trị hợp lệ
        if (updatedPrice < 100000) {
            toast.error("Giá tiền không được nhỏ hơn 100,000.")
            // return; // Dừng lại nếu không hợp lệ
        }
        

        setProducts(prevProducts => {
            const updatedProducts = [...prevProducts];
    
            if (updatedProducts[index].price !== updatedPrice) {
                updatedProducts[index] = {
                    ...updatedProducts[index],
                    price: updatedPrice
                };
                return updatedProducts;
            }
            return prevProducts;
        });
    };

    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const addProduct = async () => {
        try {
            const productResponse = await authorizeAxiosInstance.post('/product/add', {
                productCode: formData.productCode,
                name: formData.name,
                description: formData.description,
                gender: formData.gender,
                brand: { id: formData.idBrand },
                imageByte: formData.imageByte.flat(),
                category: { id: formData.idCategory },
                material: { id: formData.idMaterial },
                shoeSole: { id: formData.idShoeSole },
                status: 'ACTIVE',
            });
            return productResponse.data.DT.id; // Return product ID if successful
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
            return null;
        }
    };


    const handleProductSelect = async (index) => {
        let updatedSelection = [...selectedProducts];
        const selectedItem = Products[index];

        // Toggle selection state
        if (selectedProducts.includes(index)) {
            updatedSelection = updatedSelection.filter((i) => i !== index);
            setSelectedProducts(updatedSelection);
            return;
        } else {
            updatedSelection.push(index);
            setSelectedProducts(updatedSelection);
        }

        // Use the stored idProduct after color selection
        const idProduct = formData.idProduct;
        if (!idProduct) {
            console.error("No idProduct found. Ensure a product is added after selecting a color.");
            return;
        }

        try {
            const productDetail = {
                product: { id: idProduct },
                size: { id: selectedItem.idSize },
                color: { id: selectedItem.idColor },
                quantity: selectedItem.quantity,
                price: selectedItem.price,
                imageByte: selectedItem.imageByte,
                description: selectedItem.description,
                status: 'ACTIVE',
            };

            const productDetailResponse = await authorizeAxiosInstance.post('/productDetail/add', productDetail);
            const idProductDetail = productDetailResponse.data.DT.id;

            // Update Products with idProductDetail for the selected item
            setProducts((prevProducts) => {
                const updatedProducts = [...prevProducts];
                updatedProducts[index] = { ...updatedProducts[index], idProductDetail };
                return updatedProducts;
            });

            console.log('Product Detail added successfully, ID:', idProductDetail);

        } catch (error) {
            console.error('Error adding product detail:', error.response ? error.response.data : error.message);
        }
    };

    const [touched, setTouched] = useState({
        name: false,
        description: false,
        idBrand: false,
        idCategory: false,
        idMaterial: false,
        idShoeSole: false,
    });
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        validateFields(); // Gọi hàm validate để kiểm tra lỗi
    };
    const [errors, setErrors] = useState({});
    const isFormComplete = () => {
        console.log('Kiểm tra form completeness...');

        // Call the validation function to check for errors
        const isValid = validateFields();
        if (!isValid) return false;

        // Check if all required fields are filled
        return (
            formData.name &&
            formData.description &&
            formData.idBrand &&
            formData.idCategory &&
            formData.idMaterial &&
            formData.idShoeSole &&
            formData.productSizes.length > 0 &&
            formData.productColors.length > 0
        );
    };

    useEffect(() => {
        if (isFormComplete()) {
            // Trigger the desired action, like saving data or generating output
            console.log('Form is complete. Automatically generating...');
            // Your automatic action here
        }
    }, [formData]); // Watch for changes in formData




    const handleCompleteAdd = async () => {
        if (Products.length === 0) {
            alert('No products to update.');
            return;
        }
    
        const selectedItems = Products.filter((_, index) => selectedProducts.includes(index));
        if (selectedItems.length === 0) {
            alert('No products selected.');
            return;
        }
    
        try {
            const updatePromises = selectedItems.map(async (item) => {
                const { idProductDetail, imageBytes, price, quantity } = item;
    
                if (idProductDetail && (imageBytes || price || quantity)) {
                    // Cập nhật hình ảnh
                    if (imageBytes) {
                        const imageUpdateUrl = `/image/updateImages2`;
    
                        console.log("Sending image update for product detail:", {
                            idProductDetail,
                            imageBytes,
                        });
    
                        try {
                            const imageUpdateResponse = await authorizeAxiosInstance.post(imageUpdateUrl, {
                                idProductDetail,
                                imageBytes,
                            });
                            console.log('Images updated successfully:', imageUpdateResponse.data);
                        } catch (error) {
                            console.error('Error updating images:', error.response ? error.response.data : error.message);
                        }
                    }
    
                    // Cập nhật giá và số lượng
                    const productDetailUpdateUrl = `/update/${idProductDetail}`;
    
                    console.log("Sending update for price and quantity:", {
                        idProductDetail,
                        price,
                        quantity,
                    });
    
                    try {
                        const productDetailUpdateResponse = await authorizeAxiosInstance.put(productDetailUpdateUrl, {
                            price,
                            quantity,
                        });
                        console.log('Product details updated successfully:', productDetailUpdateResponse.data);
                    } catch (error) {
                        console.error('Error updating product details:', error.response ? error.response.data : error.message);
                    }
                } else {
                    console.warn('Missing idProductDetail or necessary data for product:', item);
                }
            });
    
            await Promise.all(updatePromises);
    
            toast.success('Sản phẩm và chi tiết sản phẩm đã được thêm thành công!');
            navigate('/admins/manage-shoe');
        } catch (error) {
            console.error('Error updating products:', error.message);
        }
    };
    




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
                setProducts(prevProducts => {
                    const updatedProducts = [...prevProducts];
                    const currentProduct = updatedProducts[index];
                    const currentColor = currentProduct.code_Color; // Giả sử bạn có trường color trong sản phẩm
    
                    // Cập nhật hình ảnh cho sản phẩm hiện tại
                    updatedProducts[index] = {
                        ...currentProduct,
                        imageBytes: base64Images,
                    };
    
                    // Chỉ cập nhật hình ảnh cho các sản phẩm có cùng màu hiện tại
                    updatedProducts.forEach((product, i) => {
                        if (i !== index && product.code_Color === currentColor) {
                            // Kiểm tra xem hình ảnh mới đã có trong sản phẩm này chưa
                            const newImages = base64Images.filter(img => !product.imageBytes?.includes(img));
                            product.imageBytes = [...(product.imageBytes || []), ...newImages]; // Thêm hình ảnh mới không trùng lặp
                        }
                    });
    
                    return updatedProducts;
                });
                console.log("Images uploaded successfully!");
            })
            .catch(error => console.error("Error uploading images:", error));
    };
    




    return (

        <div className="model-create-product container" >
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Thêm sản phẩm</h4>
                <div className="m-3">
                    <label for="exampleFormControlInput1" className="form-label">Tên sản phẩm :</label>
                    <input
                        type="text"
                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="nhập tên sản phẩm"
                    />
                    {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}


                </div>
                <div className="m-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Mô tả : </label>
                    <textarea
                        className={`form-control ${touched.description && errors.description ? "is-invalid" : ""}`}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="nhập nội dung"
                    />
                    {touched.description && errors.description && <div className="invalid-feedback">{errors.description}</div>}

                </div>
                <div className="row">
                    <div className="col m-3">
                        <div className="mb-3">
                            <label for="nameShoe" className="form-label">Thương hiệu</label>
                            <select
                                className={`form-select ${touched.idBrand && errors.idBrand ? "is-invalid" : ""}`}
                                value={formData.idBrand}
                                name="idBrand" // Thêm name để nhận diện trường
                                onChange={handleBrandChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Chọn thương hiệu...</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            {touched.idBrand && errors.idBrand && <div className="invalid-feedback">{errors.idBrand}</div>}

                        </div>
                        <div className="mb-3">
                            <label for="categoryShoe" className="form-label">Danh mục</label>
                            <select
                                className={`form-select ${touched.idCategory && errors.idCategory ? "is-invalid" : ""}`}
                                value={formData.idCategory}
                                name="idCategory"
                                onChange={handleCategoryChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Chọn danh mục...</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {touched.idCategory && errors.idCategory && <div className="invalid-feedback">{errors.idCategory}</div>}

                        </div>

                    </div>
                    <div className="col m-3">
                        <div className="mb-3">
                            <label className="form-label">Đế giày</label>
                            <select
                                className={`form-select ${touched.idMaterial && errors.idMaterial ? "is-invalid" : ""}`}
                                value={formData.idMaterial}
                                name="idMaterial"
                                onChange={handleMaterialChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Chọn đế giày...</option>
                                {materials.map((material) => (
                                    <option key={material.id} value={material.id}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                            {touched.idMaterial && errors.idMaterial && <div className="invalid-feedback">{errors.idMaterial}</div>}

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chất liệu</label>

                            <select
                                className={`form-select ${touched.idShoeSole && errors.idShoeSole ? "is-invalid" : ""}`}
                                value={formData.idShoeSole}
                                name="idShoeSole"
                                onChange={handleShoeSoleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Chọn chất liệu...</option>
                                {shoeSoles.map((shoeSole) => (
                                    <option key={shoeSole.id} value={shoeSole.id}>
                                        {shoeSole.name}
                                    </option>
                                ))}
                            </select>
                            {touched.idShoeSole && errors.idShoeSole && <div className="invalid-feedback">{errors.idShoeSole}</div>}
                        </div>


                    </div>

                    <div className="m-3">
                        <label className="form-label">Giới tính: </label>
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value={false}
                                checked={formData.gender === false}
                              
                                onChange={() => setFormData(prevData => ({ ...prevData, gender: false }))}
                            />
                            <label htmlFor="male" className="me-3">Nam</label>

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value={true}
                                checked={formData.gender === true}
                                onChange={() => setFormData(prevData => ({ ...prevData, gender: true }))}
                            />
                            <label htmlFor="female" className="me-3">Nữ</label>
                        </div>
                    </div>
                    
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                      
                            onChange={handleImageChange} // Gọi hàm handleImageChange
                            style={{ marginBottom: '10px' }} // Thêm khoảng cách giữa input và ảnh
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {formData.imageByte && formData.imageByte.length > 0 ? (
                                formData.imageByte.map((base64String, index) => (
                                    <img
                                        key={index} // Thêm key để tránh cảnh báo React
                                        src={base64String}
                                        alt="product"
                                        style={{ width: '50px', height: '50px' }} // Thêm kiểu dáng cho ảnh
                                    />
                                ))
                            ) : (
                                <p>Không có ảnh nào được chọn.</p>
                            )}
                        </div>






                    </div>


                </div>
            </div>
            <div className="model-create-product-sizecolor p-3 m-3">
                <h4 className="text-center p-3">Thêm kích cỡ và màu sắc</h4>
                <div className="model-create-product-size row mb-5">
                    <h4 className="mx-3 mb-3 col-2 pt-2">Kích cỡ:</h4>
                    <div className="col-12">
                        <div className="product-sizes-container">
                            {Array.isArray(formData.productSizes) && formData.productSizes.map((size, index) => (
                                <div key={index} className="position-relative size-item mx-3">
                                    <div className="border p-2">
                                        {size.name}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveSize(index)} className="badge-button "
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* Thêm kích cỡ */}
                        <div className="mt-3">
                            <ModelAddSize onUpdateSizes={handleUpdateSizes} />
                        </div>
                    </div>
                </div>
                <div className="model-create-product-color row mb-5">
                    <h4 className="mx-3 mb-3 col-2 pt-2">Màu sắc:</h4>
                    <div className="product-color-container">
                        {Array.isArray(formData.productColors) && formData.productColors.map((color, index) => (
                            <div key={index} className="position-relative color-item mx-3">
                                <div className="border p-2" style={{ backgroundColor: color.codeColor }}>
                                    {color.codeColor}
                                </div>
                                <button
                                    onClick={() => handleRemoveColor(index)} className="badge-button "
                                >
                                    -
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="col-1">
                        <ModelAddColor onUpdateColor={handleUpdateColors} />
                    </div>
                </div>
            </div>
            <div className="model-create-product-table p-3 m-3">
                <h4 className="text-center p-3">Chi tiết sản phẩm</h4>
                <div className="add-button text-end">
                <ModelAddQuanityPrice
                                    // Gọi onUpdate với selectedIndexes, quantity, và price
                                    onUpdate={(selectedIndexes, quantity, price) =>
                                        updateQuantityAndPriceForAll(selectedIndexes, quantity, price)
                                    }
                                    selectedIndexes={selectedProducts} // Danh sách các sản phẩm được chọn
                                    className="mx-4 p-2"
                                />

                    <Button className="mx-3" onClick={handleCompleteAdd}>Hoàn tất</Button>
                </div>
                <div className="table-product-detail m-3">
                    <Table striped bordered hover >
                        <thead className='table-info'>
                            <tr>
                                <th></th>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Màu sắc</th>
                                <th>Kích cỡ</th>
                                <th>Giới tính</th>
                                <th>Ảnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products && Products.length > 0 ? (
                                Products.map((item, index) => {
                                    return (
                                        <tr key={`table-product-${index}`}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(index)}  // Hiển thị sáng nếu sản phẩm đã được chọn
                                                    onChange={() => handleProductSelect(index)}  // Thêm hoặc bỏ chọn sản phẩm
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.name || 'N/A'}</td>
                                            {/* <td>{item.quantity || 'N/A'}</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(e, index)}
                                                />
                                            </td>
                                            {/* <td>{item.price || 'N/A'}</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={item.price}
                                                    onChange={(e) => handlePriceChange(e, index)}
                                                />
                                            </td>
                                            <td>{item.code_Color || 'N/A'}</td>
                                            <td>{item.nameSize || 'N/A'}</td>
                                            <td>{item.gender === false ? 'Nam' : 'Nữ'}</td> {/* Mapping gender */}
                                            <td>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(e) => handleImageUpload(e, index)} // Pass index to associate with the correct product
                                                />
                                                {item.imageBytes && item.imageBytes.map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={`data:image/jpeg;base64,${img}`}
                                                        alt="product"
                                                        style={{ width: '50px', height: '50px', margin: '0 5px' }}
                                                    />
                                                ))}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8}>Not found data</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <div className='d-flex justify-content-evenly'>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

export default ModelCreateProduct;