// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom'
// import TableAccount from './TableAccount';
// import Form from 'react-bootstrap/Form';
// import './ManageAccount.scss'
// import Nav from 'react-bootstrap/Nav';
// const ManageAccount = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };
//     return (
//         <div className="manage-account-container">
//             <div className='manage-account-hender'>
//                 <h2 className='text-center'>Quản lý tài khoản</h2>
//             </div>
//             <div className='manage-filter-account'>
//                 <h4>Bộ lọc tài khoản:</h4>
//                 <hr></hr>
//                 <div className='row'>
//                     <div className='col'>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Tìm Kiếm:</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Tìm kiếm mã tên khách hàng..."
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                             />
//                         </Form.Group>
//                     </div>
//                     <div className='col'>
//                         <Form.Label>Trạng thái:</Form.Label>
//                         <Form.Select aria-label="Default select example">
//                             <option value="1">Tất cả</option>
//                             <option value="2">Hoạt động</option>
//                             <option value="3">Dừng hoạt động</option>
//                         </Form.Select>
//                     </div>
//                 </div>
//             </div>
//             <div className="accordion-body">
//                 <div className="Accounts-content">
//                     <h4>Danh sách tài khoản:</h4>
//                     <hr></hr>
//                     <div className='create-account mb-3 text-end'>
//                         <Link to="/admins/manage-createAccount" >
//                             <Button variant="success">
//                                 Thêm khách hàng mới
//                             </Button>
//                         </Link>
//                     </div>
//                     <div className='nav-tab-account mb-3'>
//                         <Nav justify variant="tabs" defaultActiveKey="all" className="my-nav-tabs">
//                             <Nav.Item>
//                                 <Nav.Link eventKey="all">Tất cả</Nav.Link>
//                             </Nav.Item>
//                             <Nav.Item>
//                                 <Nav.Link eventKey="Admin">Quản lý</Nav.Link>
//                             </Nav.Item>
//                             <Nav.Item>
//                                 <Nav.Link eventKey="Employee">Nhân viên</Nav.Link>
//                             </Nav.Item>
//                             <Nav.Item>
//                                 <Nav.Link eventKey="Customer">Khách hàng</Nav.Link>
//                             </Nav.Item>
//                         </Nav>
//                     </div>
//                     <div className='table-account'>
//                         <TableAccount />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default ManageAccount;