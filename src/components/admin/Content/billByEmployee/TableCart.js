import Table from 'react-bootstrap/Table';
const TableCart = () => {

    const products = [];
    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ảnh</th>
                    <th>Sản Phẩm</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {products && products.length > 0 ? (
                    products.map((item, index) => (
                        <tr key={`table-user-${index}`}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.address}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6}>Not found data</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}
export default TableCart;