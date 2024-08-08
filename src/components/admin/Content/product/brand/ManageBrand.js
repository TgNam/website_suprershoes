import ModelCreateBrand from "./ModelCreateBrand";
import TableBrand from "./TableBrand";
const ManageBrand = () => {
    return (
        <div className="manage-cart-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Hãng giày</h3>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="cart-content">
                                <div className='shoe-content-hender'>
                                    <label for="nameShoe" className="form-label">Tên hãng</label>
                                    <div className='shoe-search-add row'>
                                        <div className="shoe-search mb-3 col-9">
                                            <input type="email" className="form-control" id="nameShoe" placeholder="Tìm kiếm hãng theo tên...." />
                                        </div>
                                        <div className='shoe-add mb-3 col-3'>
                                            <ModelCreateBrand />
                                        </div>
                                        <div className='shoe-content-body mt-3'>
                                            <TableBrand />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ManageBrand;