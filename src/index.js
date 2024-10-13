import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Home from './components/page/Home';
import Admin from './components/admin/Admin'
import ManageBill from './components/admin/Content/bill/ManageBill';
import ModalDetailBill from './components/admin/Content/bill/ModalDetailBill';
import ManageBillByEmployee from './components/admin/Content/billByEmployee/ManageBillByEmployee';
import ManagePromotion from './components/admin/Content/discount/sale/ManagePromotion';
import ModelCreatePromotion from './components/admin/Content/discount/sale/ModelCreatePromotion';
import ManageVoucher from './components/admin/Content/discount/voucher/ManageVoucher';
import ModelCreateVoucher from './components/admin/Content/discount/voucher/ModelCreateVoucher';
import ManageBrand from './components/admin/Content/product/brand/ManageBrand';
import ManageCategory from './components/admin/Content/product/category/ManageCategory';
import ManageColor from './components/admin/Content/product/color/ManageColor';
import ManageMaterial from './components/admin/Content/product/material/ManageMaterial';
import ManageShoe from './components/admin/Content/product/shoe/ManageShoe';
import ModelCreateProduct from './components/admin/Content/product/shoe/ModelCreateProduct';
import ManageShoeSole from './components/admin/Content/product/shoe_sole/ManageShoeSole';
import ManageSize from './components/admin/Content/product/size/ManageSize';
import ManageStatistical from './components/admin/Content/statistical/ManageStatistical';
import ManageAccountCustomer from './components/admin/Content/account/customer/ManageAccountCustomer';
// import ManageCreateAccount from './components/admin/Content/account/ModalCreateAccount';

import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import store from './redux/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<Home />} />
          </Route>
          <Route path="/admins" element={<Admin />} >
            <Route path='manage-bill' element={<ManageBill />} />
            <Route path="/admins/manage-bill-detail/:codeBill" element={<ModalDetailBill />} />
            <Route path='manage-billByEmployee' element={<ManageBillByEmployee />} />
            <Route path='manage-promotion' element={<ManagePromotion />} />
            <Route path='manage-promotion-create' element={<ModelCreatePromotion />} />
            <Route path='manage-voucher' element={<ManageVoucher />} />
            <Route path='manage-voucher-create' element={<ModelCreateVoucher />} />
            <Route path='manage-brand' element={<ManageBrand />} />
            <Route path='manage-category' element={<ManageCategory />} />
            <Route path='manage-color' element={<ManageColor />} />
            <Route path='manage-material' element={<ManageMaterial />} />
            <Route path='manage-shoe' element={<ManageShoe />} />
            <Route path='manage-create-shoe' element={<ModelCreateProduct />} />
            <Route path='manage-shoe-sole' element={<ManageShoeSole />} />
            <Route path='manage-size' element={<ManageSize />} />
            <Route path='manage-statistical' element={<ManageStatistical />} />
            <Route path='manage-account-customer' element={<ManageAccountCustomer />} />
            {/* <Route path='manage-createAccount' element={<ManageCreateAccount />} /> */}
          </Route>
        </Routes>
        <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);