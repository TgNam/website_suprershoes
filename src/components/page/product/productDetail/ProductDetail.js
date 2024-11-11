import React, { useState } from "react";
import "./ProductDetail.scss";
import AsNavFor from './AsNavFor/AsNavFor';

function ProductDetail() {
  
  const product = [
    {
      name: "Sample Product",
      brand: "NEM",
      price: 250000,
      size: ["37", "38", "39", "40"],
      color: ["Red", "Blue", "Green"],
      stock: 10,
    },
  ];

  const [sizeSelect, setSizeSelect] = useState(null);
  const [colorSelect, setColorSelect] = useState(null);
  const [numberSelect, setNumberSelect] = useState(1);

  const handleSelectSize = (size) => {
    setSizeSelect(size);
  };

  const handleSelectColor = (color) => {
    setColorSelect(color);
  };

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

  return (
    <div id="product-detail" className="inner p-5 bg-white">
      <div className="grid">
        <div className="row">
        <div className="col-6">
            {product.length && <AsNavFor product={product} />}
          </div>
          <div className="product-detail__information col-6">
            <h1 className="product-detail__name">{product[0].name}</h1>
            <p className="product-detail__brand">
              Thương hiệu: {product[0].brand || "NEM"}
            </p>
            <h2 className="product-detail__price">
              {formatCash(product[0].price)}₫
            </h2>

            <div className="product-detail__select-watch">
              <h3>Kích thước</h3>
              <ul>
                {product[0].size?.map((size, index) => (
                  <li key={index}>
                    <button
                      className={`select-size ${
                        sizeSelect === size ? "active" : ""
                      }`}
                      onClick={() => handleSelectSize(size)}
                    >
                      {size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-detail__select-watch">
              <h3>Màu sắc</h3>
              <ul>
                {product[0].color?.map((color, index) => (
                  <li key={index}>
                    <button
                      className={`select-color ${
                        colorSelect === color ? "active" : ""
                      }`}
                      onClick={() => handleSelectColor(color)}
                    >
                      {color}
                    </button>
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
