import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./ProductDetail.scss";
import AsNavFor from './AsNavFor/AsNavFor';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSize } from '../../../../redux/action/sizeAction';
import { fetchAllColor } from '../../../../redux/action/colorAction';
import { findProduct } from '../../../../redux/action/productAction';
import { BsCheck } from "react-icons/bs";
function ProductDetail() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('idProduct');
  const sizes = useSelector((state) => state.size.listSize);
  const colors = useSelector((state) => state.color.listColor);
  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    dispatch(fetchAllSize());
    dispatch(fetchAllColor());
    dispatch(findProduct(idProduct));
  }, [dispatch]);


  const [sizeSelect, setSizeSelect] = useState(null);
  const [colorSelect, setColorSelect] = useState(null);
  const [numberSelect, setNumberSelect] = useState(1);


  const handleAddProductToCart = () => {
    console.log("Product added to cart:", {
      product: product[0],
      size: sizeSelect,
      color: colorSelect,
      quantity: numberSelect,
    });
  };

  const formatCash = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
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
            {product.length && <AsNavFor product={product} />}
          </div>
          <div className="product-detail__information col-6">
            <h1 className="product-detail__name">{product?.nameProduct || ''}</h1>
            <p className="product-detail__brand">
              Thương hiệu: {product?.nameBrand || ""}
            </p>
            <h2 className="product-detail__price">
              {sizeSelect && colorSelect && (formatCurrency(product?.minPrice) - formatCurrency(product?.maxPrice))}
            </h2>

            <div className="product-detail__select-watch">
              <h3>Màu sắc</h3>
              <ul>
                {colors.map((item, index) => (
                  <li key={index}>
                    {colorSelect === item.name ? (
                      <button type="button" className="btn btn-outline-secondary position-relative" onClick={() => setColorSelect("")} >
                        {item.name}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          <BsCheck size={14} />
                        </span>
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setColorSelect(item.name)}>
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
                  <li key={index}>
                    {sizeSelect === item.name ? (
                      <button type="button" className="btn btn-outline-primary position-relative" onClick={() => setSizeSelect("")}>
                        {item.name}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          <BsCheck size={14} />
                        </span>
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-primary" onClick={() => setSizeSelect(item.name)}>
                        {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="product-detail__select-watch select-number">
              <h3>Số lượng:</h3>
              <div>
                <input
                  type="number"
                  min="1"
                  max={product[0].stock}
                  value={numberSelect}
                  onChange={(e) =>
                    setNumberSelect(
                      Math.min(Number(e.target.value), product[0].stock)
                    )
                  }
                />
              </div>
              <p style={{ paddingLeft: "20px" }}>
                {product[0].stock && `Còn ${product[0].stock} sản phẩm`}
              </p>
            </div> */}

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
