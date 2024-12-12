import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./ProductDetail.scss";
import { useSelector, useDispatch } from 'react-redux';
import { findProduct } from '../../../../redux/action/productAction';
import { addProductToCart } from '../../../../Service/ApiCartSevice';
import { fetchProductDetailActive } from '../../../../redux/action/productDetailAction';
import { BsCheck } from "react-icons/bs";
import { toast } from 'react-toastify';
import ListImageProduct from '../../../../image/ListImageProduct'
import ImageProduct from '../../../../image/ImageProduct'


function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('idProduct');

  const product = useSelector((state) => state.product.product);
  const { user } = useSelector(state => state.auth);
  const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);
  const listroductDetail = useSelector((state) => state.productDetail.listProductPromotion);
  useEffect(() => {
    dispatch(findProduct(idProduct));
    dispatch(fetchProductDetailActive(idProduct));
  }, [dispatch]);


  const [numberSelect, setNumberSelect] = useState(1);
  const [colorSelect, setColorSelect] = useState("");
  const [sizeSelect, setSizeSelect] = useState("");

  // Lấy danh sách màu sắc
  const colors = [...new Set(listroductDetail.map((item) => item.nameColor))];

  // Lấy danh sách kích cỡ
  const sizes = [...new Set(listroductDetail.map((item) => item.nameSize))];

  // Xác định kích cỡ nào cần disabled khi chọn màu
  const disabledSizes = colorSelect
    ? sizes.filter(
      (size) =>
        !listroductDetail.some(
          (item) => item.nameColor === colorSelect && item.nameSize === size
        )
    )
    : [];

  // Xác định màu nào cần disabled khi chọn kích cỡ
  const disabledColors = sizeSelect
    ? colors.filter(
      (color) =>
        !listroductDetail.some(
          (item) => item.nameSize === sizeSelect && item.nameColor === color
        )
    )
    : [];

  // Tìm sản phẩm chi tiết dựa trên lựa chọn
  const selectedProduct = listroductDetail.find(
    (item) => item.nameColor === colorSelect && item.nameSize === sizeSelect
  );

  const handleAddProductToCart = async () => {
    try {
      if (!isAuthenticated) {
        window.location.href = "/login"
        return;
      }
      let orderDetails = {
        idProductDetail: selectedProduct.idProductDetail,
        quantity: numberSelect
      }
      console.log(orderDetails);
      let response = await addProductToCart(orderDetails, user.id);
      console.log(response)
      if (response.status === 200) {
        navigate(`/cart`);
        toast.success("Thêm vào giỏ hàng thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayNow = async () => {
    let productDetails = {
      idProductDetail: selectedProduct.idProductDetail,
      quantity: numberSelect
    }
    navigate(`/Payment`, {
      state: {
        listProductDetails: [productDetails],
        method: false
      }
    });
  };
  // Hàm làm tròn và định dạng số
  const formatCurrency = (value) => {
    // Làm tròn thành số nguyên
    const roundedValue = Math.round(value);
    // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
    return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div id="product-detail" className="inner p-5 bg-white container-fluid">
      <div className="grid p-5">
        <div className="row">
          <div className="col-md-6">
            {selectedProduct && selectedProduct.idProductDetail ? (
              <ListImageProduct
                id={selectedProduct.idProductDetail}
                maxHeight="1000px"
              />
            ) : (
              <ImageProduct
                id={idProduct}
                maxHeight="1000px"
              />
            )}
          </div>
          <div className="product-detail__information col-md-6">
            <h1 className="product-detail__name">{product?.nameProduct || ''}</h1>
            <p className="product-detail__brand">
              Thương hiệu: {product?.nameBrand || ""}
            </p>
            <div className="product-detail__price">
              {sizeSelect && colorSelect ? (
                selectedProduct?.idPromotion ? (
                  <>
                    <h2 className='text-danger'>
                      {formatCurrency((selectedProduct.productDetailPrice || 0) * (1 - (selectedProduct.value / 100)))} VND
                    </h2>
                    <h2 className="text-decoration-line-through">
                      {formatCurrency(selectedProduct.productDetailPrice || 0)} VND
                    </h2>
                  </>
                ) : (
                  selectedProduct ? (
                    <h2 className="product-sale-price text-danger">
                      {formatCurrency(selectedProduct?.productDetailPrice || 0)} VND
                    </h2>
                  ) : (
                    <h2 className="product-sale-price">
                      Sản Phẩm đã hết hàng
                    </h2>
                  )

                )
              ) : (
                product.minPriceAfterDiscount === product.minPrice && product.maxPriceAfterDiscount === product.maxPrice ? (
                  <h2 className="product-price">{formatCurrency(product.minPrice)} VND</h2>
                ) : (
                  <>
                    <h2 className="product-sale-price text-danger">
                      {formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                    </h2>
                    <h2 className="product-original-price text-decoration-line-through">
                      {formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                    </h2>
                  </>
                )
              )}
            </div>
            <div className="product-detail__select-watch">
              <h3>Màu sắc</h3>
              <ul>
                {colors.map((color) => (
                  <li key={color}>
                    {colorSelect === color ? (
                      <button type="button" className="btn btn-secondary position-relative" onClick={() => setColorSelect("")} >
                        {color}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          <BsCheck size={14} />
                        </span>
                      </button>
                    ) : (
                      <button type="button" className="btn btn-secondary" onClick={() => setColorSelect(color)} disabled={disabledColors.includes(color)}>
                        {color}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-detail__select-watch">
              <h3>Kích thước</h3>
              <ul>
                {sizes.map((size) => (
                  <li key={size}>
                    {sizeSelect === size ? (
                      <button type="button" className="btn btn-primary position-relative" onClick={() => setSizeSelect("")}>
                        {size}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          <BsCheck size={14} />
                        </span>
                      </button>
                    ) : (
                      <button type="button" className="btn btn-primary" onClick={() => setSizeSelect(size)} disabled={disabledSizes.includes(size)}>
                        {size}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="product-detail__select-watch select-number">
              <h3>Số lượng:</h3>
              <div>
                <input
                  type="number"
                  min="1"
                  max={selectedProduct?.quantityProductDetail || 1}
                  value={numberSelect}
                  onChange={(e) =>
                    setNumberSelect(
                      Math.min(Number(e.target.value), selectedProduct?.quantityProductDetail || 1)
                    )
                  }
                />
              </div>
              <p style={{ paddingLeft: "20px" }}>
                {selectedProduct?.quantityProductDetail && `Còn ${selectedProduct?.quantityProductDetail || 0} sản phẩm`}
              </p>
            </div>

            <div className="product-detail-button mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={!colorSelect || !sizeSelect || !numberSelect}
                onClick={handleAddProductToCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                type="button"
                className="btn primary btn-success"
                disabled={!colorSelect || !sizeSelect || !numberSelect}
                onClick={handlePayNow}
              >
                Mua ngay
              </button>
            </div>

            <div className="product-detail__description">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;