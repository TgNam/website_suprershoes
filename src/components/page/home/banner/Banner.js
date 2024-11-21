
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Banner1 from '../images/banner.png'
import Banner2 from '../images/banner1.png'
import Banner3 from '../images/banner2.png'
const Banner = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Banner1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Banner2}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Banner3}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </>
    );
}
export default Banner;