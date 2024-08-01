import ModalCreateShoe from './ModelCreateProduct';
import TableShoe from './TableShoe';
import './ManageShoe.scss'
import Form from 'react-bootstrap/Form';
const ManageShoe = () => {
    return (
        <div className="manage-cart-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h4>Danh sách sản phẩm</h4>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="shoe-content">
                                <div className="shoe-content-hender">
                                    <div className='search-shoe mb-3'>
                                        <ModalCreateShoe />
                                    </div>
                                    <div className='create-shoe mb-3'>
                                        <ModalCreateShoe />
                                    </div>
                                </div>
                                <div className='table-shoe'>
                                    {/* <TableShoe /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ManageShoe;