import ModelCreateShoeSole from "./ModelCreateShoeSole";
import TableShoeSole from './TableShoeSole'
const ManageShoeSole = () => {
    return (
        <div className="manage-cart-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Đế giày</h3>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="cart-content">
                                <div className='shoe-content-hender'>
                                    <label for="nameShoe" className="form-label">Tên chất liệu đế giày</label>
                                    <div className='shoe-search-add row'>
                                        <div className="shoe-search mb-3 col-9">
                                            <input type="email" className="form-control" id="nameShoe" placeholder="Tìm kiếm chất liệu sản phẩm theo tên...." />
                                        </div>
                                        <div className='shoe-add mb-3 col-3'>
                                            <ModelCreateShoeSole />
                                        </div>
                                        <div className='shoe-content-body mt-3'>
                                            <TableShoeSole />
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
export default ManageShoeSole;