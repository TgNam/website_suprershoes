import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {toast} from "react-toastify";
import {getVoucherById} from "../../../../../Service/ApiVoucherService";
import {Link, useParams} from "react-router-dom";
import {InputGroup} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./ModelCreateVoucher.scss";
import TableCustomer from "./TableCustomer";
import AuthGuard from "../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../auth/RoleBasedGuard";

function ModelDetailVoucher() {
    const {voucherId} = useParams();

    const [voucherDetails, setVoucherDetails] = useState({
        codeVoucher: "",
        name: "",
        note: "",
        value: 0,
        quantity: 0,
        maximumDiscount: 0,
        type: "0",
        minBillValue: 0,
        startAt: "",
        endAt: "",
        status: "upcoming",
        isPrivate: false,
        accountIds: [],
    });

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const getStatusText = (status) => {
        switch (status) {
            case "ONGOING":
                return "Đang diễn ra";
            case "UPCOMING":
                return "Sắp diễn ra";
            case "EXPIRED":
                return "Đã kết thúc";
            case "ENDED_EARLY":
                return "Kết thúc sớm";
            default:
                return "Không tồn tại";
        }
    };

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const res = await getVoucherById(voucherId);
                if (res) {
                    const formatToLocalDatetime = (dateString) => {
                        if (!dateString) return "";
                        const localDate = new Date(dateString);
                        const date = localDate.toLocaleDateString("sv-SE");
                        const time = localDate.toLocaleTimeString("sv-SE", {hour: '2-digit', minute: '2-digit'});
                        return `${date}T${time}`;
                    };

                    const formattedVoucher = {
                        ...res,
                        startAt: formatToLocalDatetime(res.startAt),
                        endAt: formatToLocalDatetime(res.endAt),
                        quantity: res.quantity || "",
                    };
                    setVoucherDetails(formattedVoucher);
                    setSelectedCustomerIds(res.accountIds || []);
                } else {
                    toast.error("Voucher không tìm thấy hoặc phản hồi không hợp lệ.");
                }
            } catch (error) {
                toast.error(`Lấy chi tiết voucher thất bại: ${error.message}`);
            }
        };
        fetchVoucher();
    }, [voucherId]);

    return (
      <AuthGuard>
        <RoleBasedGuard accessibleRoles={["ADMIN"]}>
          <div className="model-update-voucher container voucher-container">
            <div className="row">
              <div className="col-lg-6">
                <h4 className="text-center p-2">
                  Thông tin chi tiết phiếu giảm giá
                </h4>
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Mã phiếu giảm giá</Form.Label>
                        <Form.Control
                          type="text"
                          name="codeVoucher"
                          value={voucherDetails?.codeVoucher || ""}
                          disabled
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Tên phiếu giảm giá</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={voucherDetails?.name || ""}
                          disabled
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Kiểu giảm giá</Form.Label>
                        <Form.Control
                          type="text"
                          name="type"
                          value={
                            String(voucherDetails?.type) === "0"
                              ? "Giảm theo %"
                              : "Giảm theo số tiền"
                          }
                          disabled
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="minBillValue"
                            value={
                              voucherDetails?.minBillValue
                                ? Number(
                                    voucherDetails.minBillValue
                                  ).toLocaleString("vi-VN")
                                : ""
                            }
                            disabled
                          />
                          <InputGroup.Text>VND</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Giá trị</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="value"
                            value={
                              String(voucherDetails?.type) === "1"
                                ? Number(voucherDetails.value).toLocaleString(
                                    "vi-VN"
                                  )
                                : voucherDetails?.value
                            }
                            disabled
                          />
                          <InputGroup.Text>
                            {String(voucherDetails?.type) === "0" ? "%" : "VND"}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Giảm giá tối đa</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="maximumDiscount"
                            value={
                              voucherDetails?.maximumDiscount
                                ? Number(
                                    voucherDetails.maximumDiscount
                                  ).toLocaleString("vi-VN")
                                : ""
                            }
                            disabled
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
                          value={voucherDetails.startAt || ""}
                          disabled
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="endAt"
                          value={voucherDetails.endAt || ""}
                          disabled
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
                          disabled
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3 mt-2">
                        <Form.Label>Loại phiếu giảm giá</Form.Label>
                        <div>
                          <Form.Check
                            type="radio"
                            label="Công khai"
                            name="isPrivate"
                            checked={!voucherDetails?.isPrivate}
                            readOnly
                            inline
                          />
                          <Form.Check
                            type="radio"
                            label="Riêng tư"
                            name="isPrivate"
                            checked={voucherDetails?.isPrivate}
                            readOnly
                            inline
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control
                          type="text"
                          name="note"
                          value={voucherDetails?.note || ""}
                          disabled
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Control
                          type="text"
                          name="status"
                          value={getStatusText(voucherDetails?.status) || ""}
                          disabled
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <Link to="/admins/manage-voucher">
                    <Button variant="secondary">Quay lại</Button>
                  </Link>
                </Form>
              </div>

              <div className="model-table-product p-5 col-lg-6">
                {voucherDetails.isPrivate ? (
                  <div>
                    <TableCustomer
                      selectedCustomerIds={selectedCustomerIds}
                      setSelectedCustomerIds={setSelectedCustomerIds}
                      showSelectedOnly={true}
                      isUpdateMode={true}
                    />
                  </div>
                ) : (
                  <p className="text-muted">
                    Bảng khách hàng chỉ hiển thị khi phiếu giảm giá là Riêng tư.
                  </p>
                )}
              </div>
            </div>
          </div>
        </RoleBasedGuard>
      </AuthGuard>
    );
}

export default ModelDetailVoucher;
