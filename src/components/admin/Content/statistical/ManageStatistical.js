const ManageStatistical = () => {
    return (
        <div className="manage-cart-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Thống kê</h3>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="cart-content">
                                Content Statistical
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ManageStatistical;