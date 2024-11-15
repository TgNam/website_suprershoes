import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./ProductDetail.scss";
import AsNavFor from './AsNavFor/AsNavFor';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSize } from '../../../../redux/action/sizeAction';
import { fetchAllColor } from '../../../../redux/action/colorAction';
import { findProduct } from '../../../../redux/action/productAction';
import { fetchFindProductDetailByIdProduct, fetchPostsFindProductDetailSuccess } from '../../../../redux/action/productDetailAction';
import { BsCheck } from "react-icons/bs";
function ProductDetail() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('idProduct');

  const sizes = useSelector((state) => state.size.listSize);
  const colors = useSelector((state) => state.color.listColor);
  const product = useSelector((state) => state.product.product);
  const productDetail = useSelector((state) => state.productDetail.productDetail);
  useEffect(() => {
    dispatch(fetchAllSize());
    dispatch(fetchAllColor());
    dispatch(findProduct(idProduct));
  }, [dispatch]);


  const [sizeSelect, setSizeSelect] = useState("");
  const [colorSelect, setColorSelect] = useState("");
  const [numberSelect, setNumberSelect] = useState(1);

  useEffect(() => {
    if (sizeSelect && colorSelect) {
      dispatch(fetchFindProductDetailByIdProduct(idProduct, colorSelect, sizeSelect))
    } else {
      dispatch(fetchPostsFindProductDetailSuccess());
    }
    setNumberSelect(1)
  }, [sizeSelect, colorSelect]);
  const handleAddProductToCart = () => {
    console.log(sizeSelect, colorSelect)
    console.log("Product added to cart:", {
      productDetail
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
    <div id="product-detail" className="inner p-5 bg-white">
      <div className="grid">
        <div className="row">
          <div className="col-6">
            {<AsNavFor product={product} />}
          </div>
          <div className="product-detail__information col-6">
            <h1 className="product-detail__name">{product?.nameProduct || ''}</h1>
            <p className="product-detail__brand">
              Thương hiệu: {product?.nameBrand || ""}
            </p>
            <div className="product-detail__price">
              {sizeSelect && colorSelect ? (
                productDetail?.idPromotion ? (
                  <>
                    <h2 className='text-danger'>
                      {formatCurrency((productDetail.productDetailPrice || 0) * (1 - (productDetail.value / 100)))} VND
                    </h2>
                    <h2 className="text-decoration-line-through">
                      {formatCurrency(productDetail.productDetailPrice || 0)} VND
                    </h2>
                  </>
                ) : (
                  productDetail ? (
                    <h2 className="product-sale-price text-danger">
                      {formatCurrency(productDetail?.productDetailPrice || 0)} VND
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
                {colors.map((item, index) => (
                  <li key={item.id}>
                    {colorSelect === item.id ? (
                      <button type="button" className="btn btn-outline-secondary position-relative" onClick={() => setColorSelect("")} >
                        {item.name}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          <BsCheck size={14} />
                        </span>
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setColorSelect(item.id)}>
                        {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-detail__select-watch">
              <h3>Kích thước</h3>
              <ul>
                {sizes.map((item, index) => (
                  <li key={item.id}>
                    {sizeSelect === item.id ? (
                      <button type="button" className="btn btn-outline-primary position-relative" onClick={() => setSizeSelect("")}>
                        {item.name}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          <BsCheck size={14} />
                        </span>
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-primary" onClick={() => setSizeSelect(item.id)}>
                        {item.name}
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
                  max={productDetail?.quantityProductDetail || 1}
                  value={numberSelect}
                  onChange={(e) =>
                    setNumberSelect(
                      Math.min(Number(e.target.value), productDetail?.quantityProductDetail || 1)
                    )
                  }
                />
              </div>
              <p style={{ paddingLeft: "20px" }}>
                {productDetail?.quantityProductDetail && `Còn ${productDetail?.quantityProductDetail || 0} sản phẩm`}
              </p>
            </div>

            <div className="product-detail-button">
              <button
                type="button"
                className="btn btn-outline-success"
                disabled={!colorSelect || !sizeSelect || !numberSelect}
                onClick={handleAddProductToCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                type="button"
                className="btn primary btn-outline-success"
                disabled={!colorSelect || !sizeSelect || !numberSelect}
              >
                Mua ngay
              </button>
            </div>

            <div className="product-detail__description">
              <p>
                Chất liệu: vải tổng hợp cao cấp <br />
                Kiểu dáng: cạp cao, tone màu đen trơn <br />
                Sản phẩm thuộc dòng: NEM NEW <br />
                Thông tin người mẫu: sản phẩm size 2 <br />
                Sản phẩm kết hợp: SM17732
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
