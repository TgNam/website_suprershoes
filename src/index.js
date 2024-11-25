import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/page/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/page/home/Home";
import Product from "./components/page/product/Product";
import Cart from "./components/page/cart/Cart";
import Login from "./components/page/login/LoginPage";
import Register from "./components/page/login/RegisterPage";
import Blog from "./components/page/blog/blog";
import SizeName from "./components/page/blog/sidebar/sizeNam";
import SizeNu from "./components/page/blog/sidebar/sizeNu";
import Profile from "./components/page/profile/ProfilePage";
import User from "./components/page/profile/InfoUser";
import ProductDetail from "./components/page/product/productDetail/ProductDetail";
import Contact from "./components/page/contact/contact";
import Admin from "./components/admin/Admin";
import ManageBill from "./components/admin/Content/bill/ManageBill";
import ModalDetailBill from "./components/admin/Content/bill/ModalDetailBill";
import ManageBillByEmployee from "./components/admin/Content/billByEmployee/ManageBillByEmployee";
import ManagePromotion from "./components/admin/Content/discount/sale/ManagePromotion";
import ModelCreatePromotion from "./components/admin/Content/discount/sale/ModelCreatePromotion";
import ModelPromotionDetail from "./components/admin/Content/discount/sale/ModelPromotionDetail";
import ModelUpdatePromotion from "./components/admin/Content/discount/sale/ModelUpdatePromotion";
import ManageVoucher from "./components/admin/Content/discount/voucher/ManageVoucher";
import ModelCreateVoucher from "./components/admin/Content/discount/voucher/ModelCreateVoucher";
import ModelUpdateVoucher from "./components/admin/Content/discount/voucher/ModelUpdateVoucher";
import ModelDetailVoucher from "./components/admin/Content/discount/voucher/ModelDetailVoucher";
import ManageBrand from "./components/admin/Content/product/brand/ManageBrand";
import ManageCategory from "./components/admin/Content/product/category/ManageCategory";
import ManageColor from "./components/admin/Content/product/color/ManageColor";
import ManageMaterial from "./components/admin/Content/product/material/ManageMaterial";

import ManageShoe from "./components/admin/Content/product/shoes/ManageShoe";
import ModelCreateProduct from "./components/admin/Content/product/shoes/createProduct/ModelCreateProduct";

import ManageShoeSole from "./components/admin/Content/product/shoe_sole/ManageShoeSole";
import ManageSize from "./components/admin/Content/product/size/ManageSize";
import ManageStatistical from "./components/admin/Content/statistical/ManageStatistical";
import ManageAccountCustomer from "./components/admin/Content/account/customer/ManageAccountCustomer";
import ManageAccountEmployee from "./components/admin/Content/account/employee/ManageAccountEmployee";
import Logout from "./components/page/logout/Logout";
import Payment from './components/page/payment/Payment';
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Auth from "./components/auth/Auth";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Auth>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/allProducts" element={<Product />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<User />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Blog" element={<Blog />} />
              <Route path="/blog/SizeNam" element={<SizeName />} />
              <Route path="/blog/SizeNu" element={<SizeNu />} />

            </Route>
            <Route path="/admins" element={<Admin />}>
              <Route path="manage-bill" element={<ManageBill />} />
              <Route
                path="/admins/manage-bill-detail/:codeBill"
                element={<ModalDetailBill />}
              />
              <Route
                path="manage-billByEmployee"
                element={<ManageBillByEmployee />}
              />
              <Route path="manage-promotion" element={<ManagePromotion />} />
              <Route
                path="manage-promotion-create"
                element={<ModelCreatePromotion />}
              />
              <Route
                path="manage-promotion-detail"
                element={<ModelPromotionDetail />}
              />
              <Route
                path="manage-promotion-update"
                element={<ModelUpdatePromotion />}
              />

              <Route path="manage-voucher" element={<ManageVoucher />} />
              <Route
                path="manage-voucher-create"
                element={<ModelCreateVoucher />}
              />
              <Route
                path="manage-voucher-update/:voucherId"
                element={<ModelUpdateVoucher />}
              />
              <Route
                path="manage-voucher-detail/:voucherId"
                element={<ModelDetailVoucher />}
              />
              <Route path="manage-brand" element={<ManageBrand />} />

              <Route path="manage-category" element={<ManageCategory />} />

              <Route path="manage-color" element={<ManageColor />} />

              <Route path="manage-material" element={<ManageMaterial />} />

              <Route path="manage-shoe" element={<ManageShoe />} />
              <Route
                path="manage-create-shoe"
                element={<ModelCreateProduct />}
              />


              <Route path="manage-shoe-sole" element={<ManageShoeSole />} />

              <Route path="manage-size" element={<ManageSize />} />

              <Route
                path="manage-statistical"
                element={<ManageStatistical />}
              />

              <Route
                path="manage-account-customer"
                element={<ManageAccountCustomer />}
              />

              <Route
                path="manage-account-employee"
                element={<ManageAccountEmployee />}
              />
            </Route>
          </Routes>
        </Auth>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
