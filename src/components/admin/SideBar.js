import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaUser, FaMoneyBillAlt, FaShoePrints, FaUserAstronaut, FaUsers } from 'react-icons/fa';
import { FaChartPie, FaBoxesPacking } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { GiConverseShoe, GiPresent, GiRunningShoe, GiMaterialsScience } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidDiscount, BiCategory } from "react-icons/bi";
import { IoMdColorFill, IoIosResize } from "react-icons/io";
import { TbBrandArc } from "react-icons/tb";
import './SideBar.scss';
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image';
import imageLogo from './logoPage.jpg';
import logoMini from './logoMini.jpg';
import { useSelector } from "react-redux";
const SideBar = (props) => {
    const { show, handleToggleSidebar } = props;
    const {user} = useSelector(state => state.auth);

    return (
        <div>
            <ProSidebar
                collapsed={!show}
                toggled={show}
                breakPoint="md"  // Sidebar ẩn khi màn hình nhỏ hơn 768px
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {show ? (
                            <Image
                                src={imageLogo}
                                className="text-center"
                                style={{ maxWidth: '90%' }}
                            />
                        ) : (
                            <Image
                                src={logoMini}
                                className="text-center"
                                style={{ maxWidth: '100%' }}
                            />
                        )}

                    </div>

                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaChartPie />} suffix={<span className="badge red">New</span>}>
                            Thống kê <Link to="/admins/manage-statistical" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaMoneyBillAlt />}>
                            Bán hàng <Link to="/admins/manage-billByEmployee" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdOutlinePayment />}>
                            Quản lý hóa đơn <Link to="/admins/manage-bill" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu icon={<FaUsers />} title="Quản lý tài khoản">
                            <MenuItem icon={<FaUser />}>Quản lý khách hàng<Link to="/admins/manage-account-customer" /></MenuItem>
                            {user.role === "ADMIN" && <MenuItem icon={<FaUserAstronaut />}>Quản lý nhân viên<Link to="/admins/manage-account-employee" /></MenuItem>}
                        </SubMenu>
                    </Menu>
                   {user.role === "ADMIN" && <Menu iconShape="circle">
                        <SubMenu icon={<FaBoxesPacking />} title="Quản lý sản phẩm">
                            <MenuItem icon={<GiConverseShoe />}>Sản phẩm<Link to="/admins/manage-shoe" /></MenuItem>
                            <SubMenu icon={<GiRunningShoe />} title="Thuộc tính sản phẩm">
                                <MenuItem icon={<FaShoePrints />}>Đế giày<Link to="/admins/manage-shoe-sole" /></MenuItem>
                                <MenuItem icon={<IoMdColorFill />}>Màu sắc<Link to="/admins/manage-color" /></MenuItem>
                                <MenuItem icon={<BiCategory />}>Doanh mục<Link to="/admins/manage-category" /></MenuItem>
                                <MenuItem icon={<TbBrandArc />}>Thương hiệu<Link to="/admins/manage-brand" /></MenuItem>
                                <MenuItem icon={<IoIosResize />}>Kích cỡ<Link to="/admins/manage-size" /></MenuItem>
                                <MenuItem icon={<GiMaterialsScience />}>Chất liệu<Link to="/admins/manage-material" /></MenuItem>
                            </SubMenu>
                        </SubMenu>
                    </Menu>}
                    {user.role === "ADMIN" && <Menu iconShape="circle">
                        <SubMenu
                            icon={<GiPresent />}
                            title="Quản lý giảm giá"
                        >
                            <MenuItem icon={<RiDiscountPercentFill />}>Quản lý đợt giảm giá<Link to="/admins/manage-promotion" /></MenuItem>
                            <MenuItem icon={<BiSolidDiscount />}>Quản lý phiếu giảm giá<Link to="/admins/manage-voucher" /></MenuItem>
                        </SubMenu>
                    </Menu>}
                </SidebarContent>
            </ProSidebar>
        </div>
    )
}
export default SideBar;