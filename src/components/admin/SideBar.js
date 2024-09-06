import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaUser, FaUsersCog, FaShoePrints } from 'react-icons/fa';
import { FaChartPie, FaCartArrowDown, FaBoxesPacking } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { DiReact } from "react-icons/di";
import { GiConverseShoe, GiPresent, GiRunningShoe, GiMaterialsScience } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidDiscount, BiCategory } from "react-icons/bi";
import { IoMdColorFill, IoIosResize } from "react-icons/io";
import { TbBrandArc } from "react-icons/tb";
import { TbBrandAmongUs } from "react-icons/tb";
import { FaUsersLine } from "react-icons/fa6";
import './SideBar.scss';
import { Link } from 'react-router-dom'
const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <div>
            <ProSidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
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
                        <DiReact size={'3em'} color={"#00bfff"} />
                    </div>

                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaChartPie />} suffix={<span className="badge red">New</span>}>
                            Thống kê <Link to="/admins/manage-statistical" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaCartArrowDown />}>
                            Bán hàng <Link to="/admins/manage-cart" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdOutlinePayment />}>
                            Quản lý hóa đơn <Link to="/admins/manage-bill" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaUsersCog />}
                            title="Quản lý tài khoản"
                        >
                            <MenuItem icon={<FaUser />}>Quản lý khách hàng<Link to="/admins/manage-customer" /></MenuItem>
                            <MenuItem icon={<FaUsersLine />}>Quản lý nhân viên<Link to="/admins/manage-employee" /></MenuItem>
                            <MenuItem icon={<TbBrandAmongUs />}>Quản lý khách lẻ<Link to="/admins/manage-users" /></MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
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
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<GiPresent />}
                            title="Quản lý giảm giá"
                        >
                            <MenuItem icon={<RiDiscountPercentFill />}>Quản lý đợt giảm giá<Link to="/admins/manage-promotion" /></MenuItem>
                            <MenuItem icon={<BiSolidDiscount />}>Quản lý phiếu giảm giá<Link to="/admins/manage-voucher" /></MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    )
}
export default SideBar;