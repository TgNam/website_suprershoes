import ModalCreateUser from './ModalCreateCustomer';
import TableUser from './TableCustomer';

const ManageUser = () => {
    return (
        <div className="manage-user-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Quản lý khách hàng</h3>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="users-content">
                                <div className='create-user mb-3'>
                                    <ModalCreateUser />
                                </div>
                                <div className='table-user'>
                                    <TableUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ManageUser;