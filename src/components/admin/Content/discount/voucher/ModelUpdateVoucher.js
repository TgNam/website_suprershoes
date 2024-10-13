import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import { fetchVoucherById, updateVoucher } from "../../../../../Service/ApiVoucherService"; // Updated import
import { useDispatch } from "react-redux";
import { fetchAllVoucherAction } from "../../../../../redux/action/voucherAction";
import { useNavigate, useParams } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./ModelUpdateVoucher.scss";

function ModelUpdateVoucher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { voucherId } = useParams(); // Get voucher ID from URL

  const [voucherDetails, setVoucherDetails] = useState({
    codeVoucher: "",
    name: "",
    note: "",
    value: 0,
    quantity: 0,
    maximumDiscount: 0,
    type: "",
    minBillValue: 0,
    startAt: "",
    endAt: "",
    status: "upcoming",
    isPrivate: false,
    accountIds: [],
  });

  // Fetch voucher details on component mount
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const res = await fetchVoucherById(voucherId); // Assume this API call fetches voucher by ID
        setVoucherDetails(res.data);
      } catch (error) {
        toast.error("Failed to fetch voucher details.");
      }
    };
    fetchVoucher();
  }, [voucherId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVoucherDetails({ ...voucherDetails, [name]: value });
  };

  const handleUpdateVoucher = async () => {
    try {
      const res = await updateVoucher(voucherId, voucherDetails); // API call to update voucher

      if (res) {
        toast.success("Cập nhật thành công");
        dispatch(fetchAllVoucherAction());
        navigate("/admins/manage-voucher");
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.mess) {
        toast.error(error.response.data.mess);
      } else {
        toast.error("An error occurred while updating the voucher.");
      }
    }
  };

  const handleReset = () => {
    setVoucherDetails({
      codeVoucher: "",
      name: "",
      note: "",
      value: 0,
      quantity: 0,
      maximumDiscount: 0,
      type: "",
      minBillValue: 0,
      startAt: "",
      endAt: "",
      status: "upcoming",
      isPrivate: false,
      accountIds: [],
    });
  };

  return (
    <div className="model-update-voucher container voucher-container">
      <div className="row">
        <div className="col-lg-6">
          <h4>Cập nhật phiếu giảm giá</h4>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Mã phiếu giảm giá</Form.Label>
                  <Form.Control
                    type="text"
                    name="codeVoucher"
                    value={voucherDetails.codeVoucher}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Tên phiếu giảm giá</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={voucherDetails.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={voucherDetails.quantity}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Phần trăm giảm</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="value"
                      value={voucherDetails.value}
                      onChange={handleChange}
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Giảm giá tối đa</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="maximumDiscount"
                      value={voucherDetails.maximumDiscount}
                      onChange={handleChange}
                    />
                    <InputGroup.Text>VND</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="minBillValue"
                      value={voucherDetails.minBillValue}
                      onChange={handleChange}
                    />
                    <InputGroup.Text>VND</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Ngày bắt đầu</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="startAt"
                    value={voucherDetails.startAt}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Ngày kết thúc</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="endAt"
                    value={voucherDetails.endAt}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Loại phiếu giảm giá</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Công khai"
                  name="isPrivate"
                  checked={!voucherDetails.isPrivate}
                  onChange={() =>
                    setVoucherDetails({ ...voucherDetails, isPrivate: false })
                  }
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Riêng tư"
                  name="isPrivate"
                  checked={voucherDetails.isPrivate}
                  onChange={() =>
                    setVoucherDetails({ ...voucherDetails, isPrivate: true })
                  }
                  inline
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                type="text"
                name="note"
                value={voucherDetails.note}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateVoucher}>
              Cập nhật khuyến mãi
            </Button>{" "}
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Form>
        </div>
        <div className="model-table-product col-lg-6">
          <div className="search-product mb-3">
            <label htmlFor="nameShoe" className="form-label">
              Danh sách khách hàng
            </label>
            <input
              type="text"
              className="form-control"
              id="nameShoe"
              placeholder="Tìm kiếm khách hàng theo tên...."
            />
          </div>
          <div className="table-product mb-3">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                {/* Populate with customer data */}
                {[1, 2, 3, 4, 5].map((id) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>Nguyễn Văn A</td>
                    <td>0987654321</td>
                    <td>Tòa Nhà Audi số 8 Phạm Hùng</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-evenly">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelUpdateVoucher;
