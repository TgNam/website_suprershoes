import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import './ModelCreateProduct.scss';
import InfoProduct from './InfoProduct';
import SizeAndColor from './SizeAndColor';
import TableProductDetail from './TableProductDetail';

const ModelCreateProduct = () => {
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        gender: true,
        idBrand: '',
        idCategory: '',
        idMaterial: '',
        idShoeSole: '',
        image: null
    });
    const [formErrors, setFormErrors] = useState({});
    const [productDetail, setProductDetail] = useState([]);

    const handleSubmitCreate = async () => {
        console.log(product)
    };
    return (
        <div className="model-create-product container-fluid" >
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Thêm sản phẩm</h4>
                <InfoProduct
                    product={product}
                    setProduct={setProduct}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors} />
            </div>
            <div className="model-create-product-sizecolor p-3 m-3">
                <SizeAndColor
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    product={product}
                    formErrors={formErrors}
                />
            </div>
            <div className="model-create-product-table p-3 m-3">
                <h4 className="text-center p-3">Chi tiết sản phẩm</h4>
                <div className="add-button text-end">
                    {/* <ModelAddQuanityPrice
                        // Gọi onUpdate với selectedIndexes, quantity, và price
                        onUpdate={(selectedIndexes, quantity, price) =>
                            updateQuantityAndPriceForAll(selectedIndexes, quantity, price)
                        }
                        selectedIndexes={selectedProducts} // Danh sách các sản phẩm được chọn
                        className="mx-4 p-2"
                    /> */}

                    <Button className="mx-3" onClick={handleSubmitCreate}>Hoàn tất</Button>
                </div>
                <div className='overflow-x-auto'>
                    <TableProductDetail productDetail={productDetail} setProductDetail={setProductDetail} />
                </div>
            </div>
        </div>
    );
}

export default ModelCreateProduct;