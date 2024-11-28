import React from 'react';
import './about.scss';

const About = () => {
    return (
        <div className="about-container">
            {/* Section 1: Title and Introduction */}
            <h1>BÁN GIÀY THỂ THAO SNEAKER CHÍNH HÃNG TẠI HÀ NỘI - SUPER STORE GIỚI THIỆU</h1>
            <p>
                Nỗi sợ vì mua phải giày kém chất lượng, giày fake, từ nay không còn lo lắng nữa vì đã có{' '}
                <span className="highlight">#SUPERSTORES.VN</span>: hàng chính hãng nhập trực tiếp từ US, fullbox, nguyên tem.
            </p>
            <ul className="list-items">
                <li>👑 <strong>SUPERSTORES.VN</strong>: 15 Ngày Đổi Hàng / Giao Hàng Miễn Phí / Thanh Toán Khi Nhận Hàng / Bảo Hành Hàng Chính Hãng!!!</li>
            </ul>
            <p>
                Đến với <span className="highlight">"SUPERSTORES.VN"</span> quý khách hàng sẽ có những sản phẩm ưng ý nhất, chất lượng phục vụ tốt và giá thành tốt nhất, cùng những
                <strong> “Chương Trình Khuyến Mãi Đặc Biệt”.</strong>
            </p>

            {/* Section 2: Video Introduction */}
            {/* <h2>Video giới thiệu cửa hàng SUPERSTORES.VN</h2> */}
       
                <div className="image-container">
                    <img
                        src="https://imgur.com/Ar77FxC.jpg"
                        alt="King Shoes Store"
                    />
                </div>
         



            <p>
                ⚡ <strong>SUPERSTORES.VN</strong>: 15 Ngày Đổi Hàng / Giao Hàng Miễn Phí / Thanh Toán Khi Nhận Hàng / Bảo Hành Hàng Chính Hãng Trọn Đời!!!
            </p>
            <div className="image-container">
                <img
                    src="https://imgur.com/hfhHNj5.jpg"
                    alt="King Shoes Store"
                />
            </div>
            <p>
                👑✨ <span className="highlight">SUPERSTORES.VN "You're King In Your Way"</span>!!! 👟💼🌟
            </p>
            <p>

            </p>
            <p>
                Đến với "SUPERSTORES.VN" quý khách hàng sẽ có những sản phẩm ưng ý nhất, chất lượng phục vụ tốt và giá thành tốt nhất, cùng những <strong>Chương Trình Khuyến Mãi Đặc Biệt.</strong>
            </p>
        </div>
    );
};

export default About;
