import React, { useState, useEffect } from 'react';
import './about.scss';



const About = () => {


    return (
        // <div className='p-5'>
        //     <div className='p-5 '>
        //    <h2 className='p-5 text-center'>Giới thiệu</h2>
        //    <section>

        //         <p>
        //                 SuperShoes.vn là một công ty thương mại điện tử với mục tiêu trở thành cầu nối giữa nhà bán lẻ và khách
        //             hàng. Với các sản phẩm giày thể thao, giày sneaker và thời trang chính hãng trên toàn quốc. Với định
        //             hướng trở thành một website giúp người dùng trải nghiệm thời trang một cách chân thực nhất cùng
        //             nhiều tính năng đặc biệt trong tương lai, giúp người dùng tương tác tốt hơn với sản phẩm.

        //         </p>

        //         <p>
        //             Ngoài ra, SuperShoes còn hoạt động trong lĩnh vực tạo website và marketing. Các đơn vị thuộc lĩnh vực
        //             này bao gồm <strong>Seo Web Global</strong> và <strong>Sublike</strong>.

        //         </p>

        //     </section>

        //     <section>
        //         <h2 className='p-3'>Lý do SuperShoes ra đời</h2>
        //         <p>
        //             Chúng ta thường gặp khó khăn khi mua sắm trực tuyến, đặc biệt là khi mua sắm các sản phẩm thời
        //             trang. Tại sao? Đơn giản vì trải nghiệm gần như bằng không. Vì vậy, mục tiêu của SuperShoes là giúp
        //             mọi người có trải nghiệm tốt nhất, chân thực nhất khi mua sắm các sản phẩm thời trang.
        //         </p>
        //     </section>

        //     {/* <section>
        //         <h2>Sản phẩm chọn mua trực tuyến - VN & Châu Á TBD</h2>
        //         <div className="chart">
        //             <img
        //                 src="/path-to-your-chart-image.png"
        //                 alt="Biểu đồ so sánh sản phẩm được ưa chuộng ở Việt Nam và Châu Á"
        //             />
        //         </div>
        //     </section> */}

        //     <section>
        //         <h2 className='p-3'>Cam kết của chúng tôi</h2>
        //         <ul>
        //             <li>Đem đến cho khách hàng những sản phẩm tốt nhất</li>
        //             <li>Dịch vụ tuyệt vời</li>
        //             <li>Mức giá phù hợp nhất</li>
        //         </ul>
        //     </section>

        //     {/* <section>
        //         <h2 className='p-3'>Logo</h2>
        //         <p>
        //             Hướng tới sự tinh tế, mạnh mẽ và phát triển, SuperShoes luôn theo đuổi sự đơn giản vì đơn giản nhất
        //             cũng chính là phức tạp nhất. Ban đầu, với hình ảnh tia sét đơn giản nhưng mạnh mẽ, nhiều khách hàng
        //             rất yêu thích. Từ tháng 2 năm 2022, SuperShoes chính thức thay đổi logo tia sét thành logo mới với chữ
        //             "T" cách điệu theo tên SuperShoes, hướng tới sự hoàn hảo cao nhất (GOAT) với hình ảnh chú dê. Từ một
        //             góc nhìn khác, đó cũng là đôi cánh tượng trưng cho niềm tin vào sự bay cao.
        //         </p>
        //     </section> */}

        //     {/* <section className="images">
        //         <h2>Mua sắm trực tuyến</h2>
        //         <div className="image-gallery">
        //             <img
        //                 src="/path-to-your-online-shopping-image-1.png"
        //                 alt="Minh họa mua sắm trực tuyến 1"
        //             />
        //             <img
        //                 src="/path-to-your-online-shopping-image-2.png"
        //                 alt="Minh họa mua sắm trực tuyến 2"
        //             />
        //         </div>
        //     </section> */}
        //    </div>
        // </div>
        <div className="about-2013">
            <div className="year-section">
                <h1 className="year">Giới thiệu</h1>
                <div className="content">
                    <p className="description">
                        SuperShoes.vn là một công ty thương mại điện tử với mục tiêu trở thành cầu nối giữa nhà bán lẻ và khách
                        hàng. Với các sản phẩm giày thể thao, giày sneaker và thời trang chính hãng trên toàn quốc. Với định
                        hướng trở thành một website giúp người dùng trải nghiệm thời trang một cách chân thực nhất cùng
                        nhiều tính năng đặc biệt trong tương lai, giúp người dùng tương tác tốt hơn với sản phẩm.
                    </p>
                </div>
                <div className="product">
                    <div className="shoe">
                        <img
                            src="https://i.imgur.com/G3BrgMJ.jpg"
                            alt="Image"
                            className="image1"
                        />
                        <p className="label"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
