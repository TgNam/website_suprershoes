import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ModelCreateSize from "./ModelCreateSize";
import TableSize from './TableSize'
const ManageSize = () => {
    return (
        <div className="manage-cart-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Kích cỡ</h3>
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
                                            <ModelCreateSize />
                                        </div>
                                        <div className='shoe-content-body mt-3'>
                                            <TableSize />
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
export default ManageSize;