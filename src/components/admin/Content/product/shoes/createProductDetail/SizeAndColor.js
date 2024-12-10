import ModelAddSize from './ModelAddSize';
import ModelAddColor from './ModelAddColor';
import { useSelector } from 'react-redux';
const SizeAndColor = ({
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors
}) => {
    const colors = useSelector((state) => state.color.listColor);
    const sizes = useSelector((state) => state.size.listSize);

    // Hàm lấy tên size từ danh sách sizes
    const getSizeName = (id) => {
        const size = sizes.find((item) => item.id === id);
        return size ? size.name : id; // Nếu không tìm thấy, trả về id
    };

    // Hàm lấy tên màu từ danh sách colors
    const getColorName = (id) => {
        const color = colors.find((item) => item.id === id);
        return color ? color.name : id; // Nếu không tìm thấy, trả về id
    };

    return (
        <>
            <h4 className="text-center p-3">Thêm kích cỡ và màu sắc</h4>
            <div className="model-create-product-color row mb-5">
                <h4 className="mx-3 mb-3 col-2 pt-2">Màu sắc:</h4>
                <div className="product-color-container">
                    {selectedColors && selectedColors.length > 0 ? (
                        selectedColors.map((id, index) => (
                            <button
                                type="button"
                                className="btn btn-primary m-3"
                                key={id}
                            >
                                {getColorName(id)}
                            </button>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <div className="mt-3">
                    <ModelAddColor
                        selectedColors={selectedColors}
                        setSelectedColors={setSelectedColors}
                    />
                </div>
            </div>
            <div className="model-create-product-size row mb-5">
                <h4 className="mx-3 mb-3 col-2 pt-2">Kích cỡ:</h4>
                <div className="col-12">
                    <div className="product-sizes-container">
                        {selectedSizes && selectedSizes.length > 0 ? (
                            selectedSizes.map((id, index) => (
                                <button
                                    type="button"
                                    className="btn btn-primary m-3"
                                    key={id}
                                >
                                    {getSizeName(id)}
                                </button>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="mt-3">
                        <ModelAddSize
                            selectedSizes={selectedSizes}
                            setSelectedSizes={setSelectedSizes}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SizeAndColor;
