import { IoBagCheckOutline } from "react-icons/io5";
import './ManageStatistical.scss'
const ManageStatistical = () => {
    return (
        <div className="manage-cart-container">
            <div className="row m-3">
                <div className="col-6">
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                </div>
                <div className="col-6"></div>
            </div>
            <div className="row m-3">
                <div className="col"></div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default ManageStatistical;