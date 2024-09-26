import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModelCreateProduct.scss';
import ModelAddSize from './ModelAddSize';
import ModelAddColor from './ModelAddColor';
import ModelAddQuanityPrice from './ModelAddQuanityPrice';
import axios from 'axios';
const ModelCreateProduct = () => {
    const [Products, setProducts] = useState([]); // Thêm state để lưu sản phẩm
    const [formData, setFormData] = useState({
        name: '',
        productCode: '',
        idBrand: Number(''),
        idCategory: Number(''),
        idMaterial: Number(''),
        idShoeSole: Number(''),
        quantity: Number('10'),
        price: Number('100'),
        status:'ACTIVE',
        productSizes: [],   // Mảng để lưu danh sách kích cỡ
        productColors: [],  // Mảng để lưu danh sách màu sắc
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shoeSoles, setShoeSoles] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [brands, setBrands] = useState([]);

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
    const handleUpdateColors = (newColors) => {
        setFormData({
            ...formData,
            productColors: newColors, // cập nhật từ newSize
        });
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
            const response = await axios.get(`http://localhost:8080/api/category/list-category`);
            setCategories(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };
    const fetchShoeSoles = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/shoeSole/list-shoeSole`);
            setShoeSoles(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };

    // Hàm gọi API để lấy danh sách thương hiệu
    const fetchBrands = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/api/brand/list-brand`);

            setBrands(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };
    const fetchMaterials = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/api/material/list-material`);

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
        if (isFormComplete()) {
            const sizesWithColors = formData.productSizes.flatMap(size =>
                formData.productColors.map(color => ({
                    ...formData,
                    idSize: size.name,
                    idColor: color.code_color
                }))
            );

            setProducts(prevProducts => [...prevProducts, ...sizesWithColors]);
        }
    }, [formData]);
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
    // Xử lý khi thay đổi số lượng của sản phẩm
    const handleInputQAndPChange = (e, index, field) => {
        const { value } = e.target;
        setProducts(prevProducts =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, [field]: value } : product
            )
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleProductSelect = (index) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter(i => i !== index);
            } else {
                return [...prevSelected, index];
            }
        });
    };
    // Hàm để kiểm tra xem tất cả các trường đã được điền chưa
    const isFormComplete = () => {
        return formData.name && formData.productCode && formData.idBrand && formData.idCategory && formData.idMaterial && formData.idShoeSole && formData.productSizes.length > 0 && formData.productColors.length > 0;
    };


    const handleRemoveProduct = (index) => {
        setProducts(Products.filter((_, i) => i !== index));
    };
    const handleCompleteAdd = async () => {
        console.log('Dữ liệu của formData:', formData);
        console.log('Dữ liệu của Products:', Products);
    
        if (Products.length === 0) {
            alert('Không có sản phẩm nào để lưu.');
            return;
        }
    
        const selectedItems = Products.filter((_, index) => selectedProducts.includes(index));
        console.log('Dữ liệu của selectedItems:', selectedItems);
    
        if (selectedItems.length === 0) {
            alert('Chưa chọn sản phẩm nào.');
            return;
        }
    
        // Dữ liệu để gửi đến API thêm sản phẩm
        const dataToSend = {
            ...formData,
            brand: { id: formData.idBrand },
            category: { id: formData.idCategory },
            material: { id: formData.idMaterial },
            shoeSole: { id: formData.idShoeSole },
            status: formData.status,
            quantity: formData.quantity,
            price: formData.price,
        };
    
        console.log('Dữ liệu gửi từ frontend:', JSON.stringify(dataToSend));
    
        try {
            // Gửi dữ liệu sản phẩm đến API
            const response = await axios.post('http://localhost:8080/product/add', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Mã trạng thái HTTP:', response.status);
            console.log('Phản hồi từ server:', response.data);
    
            const idProduct = response.data.DT.id; // Lấy id của sản phẩm từ phản hồi của API
    
            console.log('ID của sản phẩm vừa thêm:', idProduct);
    
            // Lặp qua từng sản phẩm đã chọn
            for (const selectedItem of selectedItems) {
                const sizes = selectedItem.productSizes; // Giả sử đây là mảng
                const colors = selectedItem.productColors; // Giả sử đây là mảng
    
                // Lặp qua từng size
                for (const size of sizes) {
                    // Lặp qua từng color
                    for (const color of colors) {
                        const productDetail = {
                            product: { id: idProduct },
                            size: { id: size.id },       // Gửi từng size
                            color: { id: color.id },     // Gửi từng color
                            quantity: selectedItem.quantity, // Chỉ gửi số lượng từ selectedItem
                            price: selectedItem.price,       // Chỉ gửi giá từ selectedItem
                        };
                        console.log('Dữ liệu chi tiết sản phẩm đang gửi:', productDetail);
        
                        // Gửi từng đối tượng chi tiết sản phẩm đến API
                        try {
                            await axios.post('http://localhost:8080/productDetail/add', productDetail, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            console.log('Dữ liệu chi tiết sản phẩm đã được lưu thành công.');
                        } catch (error) {
                            console.error('Lỗi khi lưu dữ liệu chi tiết sản phẩm:', error);
                        }
                    }
                }
            }
    
            alert('Sản phẩm và chi tiết sản phẩm đã được lưu thành công!');
            setProducts([]);  // Reset danh sách sản phẩm sau khi lưu thành công
            setSelectedProducts([]);  // Reset danh sách sản phẩm được chọn
        } catch (error) {
            if (error.response) {
                console.error('Lỗi phản hồi từ server:', error.response.data);
                alert('Lưu sản phẩm thất bại! Chi tiết lỗi: ' + (error.response.data.message || 'Không có thông tin chi tiết.'));
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
                alert('Lưu sản phẩm thất bại! Không nhận được phản hồi từ server.');
            } else {
                console.error('Lỗi thiết lập yêu cầu:', error.message);
                alert('Lưu sản phẩm thất bại! Chi tiết lỗi: ' + error.message);
            }
        }
    };
    







    return (
        <div className="model-create-product container">
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Thêm sản phẩm</h4>
                <div className="m-3">
                    <label for="exampleFormControlInput1" className="form-label">Tên sản phẩm :</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="nhập tên sản phẩm"
                    />

                </div>
                <div className="m-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Mô tả : </label>
                    <textarea
                        className="form-control"
                        name="productCode"
                        value={formData.productCode}
                        onChange={handleInputChange}
                        placeholder="nhập nội dung"
                    />
                </div>
                <div className="row">
                    <div className="col m-3">
                        <div className="mb-3">
                            <label for="nameShoe" className="form-label">Thương hiệu</label>
                            <select className="form-select" aria-label="Default select example" value={formData.idBrand} onChange={handleBrandChange}>
                                <option value="">Chọn thương hiệu...</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="categoryShoe" className="form-label">Danh mục</label>
                            <select className="form-select" aria-label="Default select example" value={formData.idCategory} onChange={handleCategoryChange}>
                                <option value="">Chọn danh mục...</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="col m-3">
                        <div className="mb-3">
                            <label className="form-label">Đế giày</label>
                            <select className="form-select" aria-label="Default select example" value={formData.idMaterial} onChange={handleMaterialChange}>
                                <option value="">Chọn đế giày...</option>
                                {materials.map((material) => (
                                    <option key={material.id} value={material.id}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chất liệu</label>
                            <select className="form-select" aria-label="Default select example" value={formData.idShoeSole} onChange={handleShoeSoleChange}>
                                <option value="">Chọn chất liệu...</option>
                                {shoeSoles.map((shoeSole) => (
                                    <option key={shoeSole.id} value={shoeSole.id}>
                                        {shoeSole.name}
                                    </option>
                                ))}
                            </select>
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
                                <div className="border p-2" style={{ backgroundColor: color.code_color }}>
                                    {color.code_color}
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
                    <ModelAddQuanityPrice className="mx-4 p-2" />
                    <Button className="mx-3" onClick={handleCompleteAdd}>Hoàn tất</Button>
                </div>
                <div className="table-product-detail m-3">
                    <Table striped bordered hover >
                        <thead className='table-info'>
                            <tr>
                                <th></th>
                                <th>STT</th>
                                <th>Product</th>
                                <th>quantity</th>
                                <th>price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products && Products.length > 0 ? (
                                Products.map((item, index) => {
                                    return (
                                        <tr key={`table-product-${index}`}>
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(index)}
                                                onChange={() => handleProductSelect(index)}
                                            />
                                            <td>{index + 1}</td>
                                            <td>{item.name || 'N/A'}</td>
                                       
                                            {/* <td>{item.quantity || 'N/A'}</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={item.quantity || 'N/A'}
                                                    onChange={(e) => handleInputQAndPChange(e, index, 'quantity')}
                                                />
                                            </td>
                                            {/* <td>{item.price || 'N/A'}</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={item.price || 'N/A'}
                                                    onChange={(e) => handleInputQAndPChange(e, index, 'price')}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleRemoveProduct(index)}
                                                >
                                                    
                                                </Button>
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