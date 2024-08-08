import ModelCreateMaterial from './ModelCreateMaterial'
import TableMaterial from './TableMaterial';
const ManageMaterial = () => {
    return (
        <div className="manage-cart-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Chất liệu</h3>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="cart-content">
                                <div className='shoe-content-hender'>
                                    <label for="nameShoe" className="form-label">Tên kích cỡ</label>
                                    <div className='shoe-search-add row'>
                                        <div className="shoe-search mb-3 col-10">
                                            <input type="email" className="form-control" id="nameShoe" placeholder="Tìm kiếm kích cỡ theo tên...." />
                                        </div>
                                        <div className='shoe-add mb-3 col-2'>
                                            <ModelCreateMaterial />
                                        </div>
                                        <div className='shoe-content-body mt-3'>
                                            <TableMaterial />
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
export default ManageMaterial;