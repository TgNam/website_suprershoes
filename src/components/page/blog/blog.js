import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './blog.scss';

const Blog = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container">
            <div className="row pt-5">
                {/* Phần trợ giúp */}
                <div className="menu p-5">
                    <div className="help-box">
                        <div className="content">
                            <h3>Nhận trợ giúp về đơn hàng của bạn</h3>
                            <p>
                                Đăng nhập để xem các đơn hàng gần đây, theo dõi trạng thái giao hàng hoặc sắp xếp việc đổi hoặc trả hàng.
                            </p>
                        </div>
                        <Link to="/login" className="login-btn">
                            ĐĂNG NHẬP
                        </Link>
                    </div>
                </div>
            </div>

            {/* Phần câu hỏi thường gặp */}
            <div className="row faq-section">
                <h3 className="faq-title">CÂU HỎI THƯỜNG GẶP</h3>
                <div className="faq-grid">
                    <div className="faq-item">
                        <h4>LÀM CÁCH NÀO TÔI CÓ THỂ TRẢ HÀNG?</h4>
                        <p>Trả Lại Hàng & Hoàn Tiền</p>
                    </div>
                    <div className="faq-item">
                        <h4>Khi nào tôi sẽ được hoàn tiền?</h4>
                        <p>Trả Lại Hàng & Hoàn Tiền</p>
                    </div>
                    <div className="faq-item">
                        <h4>Tại sao đơn hàng trực tuyến của tôi bị hủy?</h4>
                        <p>Đang đặt hàng</p>
                    </div>
                    <div className="faq-item">
                        <h4>Thời gian giao hàng là khi nào?</h4>
                        <p>GIAO HÀNG</p>
                    </div>
                    <div className="faq-item">
                        <h4>Tôi có thể thay đổi địa chỉ giao hàng hoặc thay đơn hàng nếu chưa được giao hàng không?</h4>
                        <p>Đang đặt hàng</p>
                    </div>
                    <div className="faq-item">
                        <h4>Làm thế nào để tôi theo dõi đơn hàng hoặc tình trạng giao hàng của tôi?</h4>
                        <p>GIAO HÀNG</p>
                    </div>
                    <div className="faq-item">
                        <h4>LÀM THẾ NÀO ĐỂ SỬ DỤNG MÃ PHIẾU GIẢM GIÁ?</h4>
                        <p>Khuyến Mãi Và Phiếu Giảm</p>
                    </div>
                    <div className="faq-item">
                        <h4>TẠI SAO PHIẾU GIẢM GIÁ CỦA TÔI KHÔNG SỬ DỤNG ĐƯỢC?</h4>
                        <p>Khuyến Mãi Và Phiếu Giảm</p>
                    </div>
                    <div className="faq-item">
                        <h4>TÔI PHẢI LÀM GÌ NẾU CÂU HỎI CỦA TÔI KHÔNG ĐƯỢC ĐỀ CẬP Ở ĐÂY?</h4>
                        <p>Thông Tin Về Công Ty</p>
                    </div>
                </div>
            </div>

            <div className="row help-categories">
                <h3 className="categories-title">HELP CATEGORIES</h3>
                <div className="categories-grid">
                    {[
                        { icon: '🧥', title: 'Sản phẩm' },
                        { icon: '🔄', title: 'Đang đặt hàng' },
                        { icon: '💸', title: 'Khuyến mãi và phiếu giảm' },
                        { icon: '💳', title: 'Thanh toán' },
                        { icon: '📏', title: 'Hướng dẫn kích thước' },
                        { icon: '🚚', title: 'Giao hàng' },



                    ].map((item, index) => (
                        <div
                            className="category-item"
                            key={index}
                            onClick={() => {
                                if (item.title === 'Hướng dẫn kích thước') {
                                    toggleSidebar(); // Mở sidebar nếu mục là "Hướng dẫn kích thước"
                                }
                            }}
                        >
                            <span className="icon">{item.icon}</span>
                            <h4>{item.title}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="sidebar">
                    <button className="close-btn" onClick={toggleSidebar}>
                        ×
                    </button>
                    <h3>HƯỚNG DẪN KÍCH THƯỚC</h3>
                    <ul>
                        <li>
                            <Link to="/blog/sizenam">PHÍ KÍCH THƯỚC NAM</Link>
                        </li>
                        <li>
                            <Link to="/blog/sizenu">BIỂU ĐỒ KÍCH CỠ NỮ</Link>
                        </li>
                        <li>
                            <Link to="/blog/sizethieunien">BIỂU ĐỒ KÍCH CỠ THIẾU NIÊN</Link>
                        </li>
                        <li>
                            <Link to="/blog/sizetreem">BIỂU ĐỒ KÍCH CỠ TRẺ EM</Link>
                        </li>
                        {/* Bạn có thể thêm các mục khác nếu cần */}
                    </ul>

                </div>
            )}


            <div className="order-tracker">
                <div className="tracker-content">
                    <h4>ĐƠN HÀNG CỦA TÔI Ở ĐÂU?</h4>
                    <p>
                        Đăng nhập hoặc nhập chi tiết đơn hàng của bạn vào trình theo dõi để xem thông tin cụ thể về đơn hàng của bạn. Từ đó, bạn có thể hủy các mặt hàng, theo dõi trạng thái giao hàng hoặc sắp xếp việc đổi hoặc trả hàng.
                    </p>
                </div>
                <Link to="/cart" className="tracker-btn">
                    ORDER TRACKER
                </Link>
            </div>


            <div className="row pb-5">
                {/* Still Can't Find Your Answer */}
                <div className="customer-service">
                    <div className="service-content">
                        <h4>STILL CAN'T FIND YOUR ANSWER?</h4>
                        <p>
                            <strong>DỊCH VỤ KHÁCH HÀNG</strong>
                            <br />
                            <strong>Facebook:</strong> Thứ Hai đến Thứ Bảy (Ngoại trừ Chủ Nhật, ngày Giáng Sinh và ngày Tết Dương Lịch): Từ 9 giờ sáng đến 9 giờ tối.
                            <br />
                            <strong>TRÒ CHUYỆN TRỰC TUYẾN:</strong> Thứ Hai đến Thứ Bảy (Ngoại trừ Chủ Nhật, ngày Giáng Sinh và ngày Tết Dương Lịch): Từ 9 giờ sáng đến 9 giờ tối.
                            <br />
                            <strong>ĐIỆN THOẠI:</strong> +84 888 888 8888
                            <br />
                            Thứ Hai đến Thứ Bảy (Ngoại trừ Chủ Nhật, ngày Giáng Sinh và ngày Tết Dương Lịch): Từ 9 giờ sáng đến 9 giờ tối.
                        </p>
                    </div>
                    <Link to="/contact" className="contact-btn">
                        CONTACT US
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Blog;
