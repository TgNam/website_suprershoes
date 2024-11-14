import React, { useState } from 'react';
import './Payment.scss';
import image from '../images/product6.webp';

const Payment = () => {
    const [voucherCode, setVoucherCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isVoucherApplied, setIsVoucherApplied] = useState(false); // State to track if voucher is applied
    const productsPerPage = 3;
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        phone: '',
        specificAddress: '',
        notes: '',
        paymentMethod: 'cod',
        totalPrice: 90000, // Default total price for demonstration
        shippingFee: 91301,
        voucherDiscount: 0
    });

    const cities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];
    const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5'];
    const wards = ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5'];
    const products = [
        { name: 'Giày MLB Chunky Wide New York [Đen - 39]', type: 'Cao su', quantity: 1, originalPrice: 100000, discountedPrice: 90000, totalPrice: 90000, imageUrl: image },
        { name: 'Giày Adidas Ultra Boost [Trắng - 40]', type: 'Vải dệt', quantity: 2, originalPrice: 250000, discountedPrice: 200000, totalPrice: 400000, imageUrl: image },
        { name: 'Nike Air Max [Đen - 42]', type: 'Cao su tổng hợp', quantity: 1, originalPrice: 300000, discountedPrice: 270000, totalPrice: 270000, imageUrl: image },
        { name: 'Converse Classic [Trắng - 38]', type: 'Vải canvas', quantity: 3, originalPrice: 150000, discountedPrice: 135000, totalPrice: 405000, imageUrl: image }
    ];

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleApplyVoucher = () => {
        console.log('Applying voucher code:', voucherCode);
        if (voucherCode) {
            setIsVoucherApplied(true); // Display voucher details if a code is entered
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="payment-container">
            <div className="row">
            <div className="col-lg-6 col-md-12 p-5">

                    <h4>Trang thanh toán</h4>
                    <p className="text-custom-color">Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển phù hợp</p>
                    {/* Display products */}
                    {currentProducts.map((product, index) => (
                        <div key={index} className="payment-card">
                            <table className="product-table">
                                <tbody>
                                    <tr>
                                        <td rowSpan="4" className="product-image-cell">
                                            <img src={product.imageUrl} alt={product.name} className="img-fluid" style={{ width: '150px' }} />
                                        </td>
                                        <td colSpan="2"><h3>{product.name}</h3></td>
                                    </tr>
                                    <tr><td>Loại đế: <span className="highlight">{product.type}</span></td></tr>
                                    <tr><td>Số lượng: {product.quantity}</td></tr>
                                    <tr>
                                        <td>
                                            Giá: <span className="original-price">{product.originalPrice.toLocaleString()} VND</span>{' '}
                                            <span className="discounted-price">{product.discountedPrice.toLocaleString()} VND</span>
                                        </td>
                                        <td colSpan="2" style={{ textAlign: 'right' }}>
                                            Thành tiền: <span className="highlight">{product.totalPrice.toLocaleString()} VND</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="dotted-line" />
                        </div>
                    ))}

                    {/* Pagination controls */}
                    <div className="pagination-controls">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-button">-</button>
                        <span className="page-indicator"> {currentPage} / {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">+</button>
                    </div>

                    {/* Voucher Application */}
                    <div className="voucher-container">
                        <h3>ÁP DỤNG MÃ GIẢM GIÁ</h3>
                        <div className="voucher-input-container">
                            <input
                                type="text"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="Nhập mã voucher tại đây"
                                className="voucher-input"
                            />
                            <button onClick={handleApplyVoucher} className="voucher-apply-button">Áp dụng</button>
                        </div>
                        {isVoucherApplied && (
                            <div className="voucher-display">
                                <div className="voucher-card">
                                    <span className="voucher-code">Nhập mã <strong>VBS01</strong></span>
                                    <p>Giảm 10%</p>
                                    <p>Cho đơn hàng từ: 100,000 VND</p>
                                    <p>Thời gian áp dụng từ: 18:00 16/12/2023</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment Details */}
                <div className="col-lg-6 col-md-12 p-5">

                    <h4>Chi tiết thanh toán</h4>
                    <p className="text-custom-color">Hoàn thành đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh toán của bạn.</p>
                    <div className='p-4'>
                        <form className="payment-details-form row">
                            <div className="form-group col-6">
                                <p className='plabel'>Nhập họ và tên</p>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <p className='plabel'>Nhập email</p>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <p className='plabel'>Nhập Tỉnh/Thành Phố</p>
                                <select name="city" value={formData.city} onChange={handleInputChange} className="form-control">
                                    <option value="">Chọn Tỉnh/Thành Phố</option>
                                    {cities.map((city, index) => <option key={index} value={city}>{city}</option>)}
                                </select>
                            </div>
                            <div className="form-group col-6">
                                <p className='plabel'>Nhập Quận/Huyện</p>
                                <select name="district" value={formData.district} onChange={handleInputChange} className="form-control">
                                    <option value="">Chọn Quận/Huyện</option>
                                    {districts.map((district, index) => <option key={index} value={district}>{district}</option>)}
                                </select>
                            </div>
                            <div className="form-group col-6">
                                <p className='plabel'>Nhập Phường/Xã</p>
                                <select name="ward" value={formData.ward} onChange={handleInputChange} className="form-control">
                                    <option value="">Chọn Phường/Xã</option>
                                    {wards.map((ward, index) => <option key={index} value={ward}>{ward}</option>)}
                                </select>
                            </div>
                            <div className="form-group col-6">
                                <p className='plabel'>Nhập địa chỉ cụ thể</p>
                                <input type="text" name="specificAddress" value={formData.specificAddress} onChange={handleInputChange} className="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <p></p>
                                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" placeholder='Nhập số điện thoại' />
                            </div>
                            <div className="form-group col-6">
                                <p className='plabel'>Lời nhắn</p>
                                <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="form-control" />
                            </div>
                            <div>
                                <p className='plabel'>Chọn phương thức thanh toán</p>
                                <div className="custom-radio-container">
                                    <label>
                                        <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                                        <span className="custom-radio"></span>Thanh toán khi nhận hàng
                                    </label>
                                    <label>
                                        <input type="radio" name="paymentMethod" value="vnpay" checked={formData.paymentMethod === 'vnpay'} onChange={handleInputChange} />
                                        <span className="custom-radio"></span>Thanh toán vnpay
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Payment Summary */}
                    <hr className="dotted-line" />
                    <div className="payment-summary">
                        <div className="summary-row">
                            <span>Tổng tiền hàng</span>
                            <span>{(formData.totalPrice || 90000).toLocaleString()} VND</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển</span>
                            <span>{(formData.shippingFee || 91301).toLocaleString()} VND</span>
                        </div>
                        <div className="summary-row">
                            <span>Giảm giá voucher</span>
                            <span>- {formData.voucherDiscount ? formData.voucherDiscount.toLocaleString() : '0'} VND</span>
                        </div>
                        <hr className="dotted-line" />
                        <div className="summary-row total">
                            <span>Tổng thanh toán</span>
                            <span className="highlight">{((formData.totalPrice || 90000) + (formData.shippingFee || 91301) - (formData.voucherDiscount || 0)).toLocaleString()} VND</span>
                        </div>
                        <button className="btn btn-primary place-order-btn">Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
