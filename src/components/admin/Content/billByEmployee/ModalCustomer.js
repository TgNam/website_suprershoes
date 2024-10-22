import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ModalAddCustomer from './ModalAddCustomer';
import { useSelector, useDispatch } from 'react-redux';
import { findAccountRequest } from '../../../../redux/action/AccountAction';

const ModalCustomer = () => {
    const dispatch = useDispatch();
    const [idCustomer, setIdCustomer] = useState("");
    const accountDetail = useSelector((state) => state.account.accountDetail);

    useEffect(() => {
        if (idCustomer) {
            dispatch(findAccountRequest(idCustomer));
        }
    }, [dispatch, idCustomer]);

    return (
        <div className='customer-detail'>
            <div className="d-flex justify-content-between">
                <div className='title'>
                    <h5><FaUser /> Thêm khách hàng</h5>
                </div>
                <div className='add-customer'>
                    <ModalAddCustomer idCustomer={idCustomer} setIdCustomer={setIdCustomer} />
                </div>
            </div>
            <hr />
            <div>
                {accountDetail && Object.keys(accountDetail).length > 0 ? (
                    <div>
                        <div className='row mb-3'>
                            <h6 className='col'>Tên khách hàng: </h6>
                            <h6 className='col'>{accountDetail.name || 'Không có tên'}</h6>
                        </div>
                        <div className='row mb-3'>
                            <h6 className='col'>Số điện thoại: </h6>
                            <h6 className='col'>{accountDetail.phoneNumber || 'Không có số điện thoại'}</h6>
                        </div>
                        <div className='row mb-3'>
                            <h6 className='col'>Địa chỉ: </h6>
                            <h6 className='col'>QL37, Lê Lợi, Chí Linh, Hải Dương, Việt Nam</h6>
                        </div>
                    </div>
                ) : (
                    <h6>Tên khách hàng: <span className="badge text-bg-secondary">Khách lẻ</span></h6>
                )}
            </div>
        </div>
    );
};

export default ModalCustomer;
