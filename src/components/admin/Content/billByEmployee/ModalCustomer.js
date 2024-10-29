import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ModalAddCustomer from './ModalAddCustomer';
import { useSelector, useDispatch } from 'react-redux';
import { findAccountAddressByIdAccount } from '../../../../redux/action/addressAction';

const ModalCustomer = () => {
    const dispatch = useDispatch();
    const [idAccountAddress, setIdAccountAddress] = useState("");
    const address = useSelector((state) => state.address.address);

    useEffect(() => {
        if (idAccountAddress) {
            dispatch(findAccountAddressByIdAccount(idAccountAddress));
        }
    }, [dispatch, idAccountAddress]);

    return (
        <div className='customer-detail'>
            <div className="d-flex justify-content-between">
                <div className='title'>
                    <h5><FaUser /> Thêm khách hàng</h5>
                </div>
                <div className='add-customer'>
                    <ModalAddCustomer setIdAccountAddress={setIdAccountAddress} />
                </div>
            </div>
            <hr />
            <div>
                {address && Object.keys(address).length > 0 ? (
                    <div>
                        <div className='row mb-3'>
                            <h6 className='col'>Tên khách hàng: </h6>
                            <h6 className='col'>{address.nameAccount || 'Không có tên'}</h6>
                        </div>
                        <div className='row mb-3'>
                            <h6 className='col'>Số điện thoại: </h6>
                            <h6 className='col'>{address.phoneNumber || 'Không có số điện thoại'}</h6>
                        </div>
                        <div className='row mb-3'>
                            <h6 className='col'>Địa chỉ: </h6>
                            <h6 className='col'>{address.address || 'Không có địa chỉ'}</h6>
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
