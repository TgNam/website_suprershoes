import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import TableCustomer from "./TableCustomer";
import {
  createPrivateVoucher,
  createPublicVoucher,
  fetchEmailsByCustomerIds,
  sendEmail,
} from "../../../../../Service/ApiVoucherService";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVoucherAction } from "../../../../../redux/action/voucherAction";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ModelCreateVoucher.scss";
import * as yup from "yup";
import swal from "sweetalert";
import AuthGuard from "../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../auth/RoleBasedGuard";

function ModelCreateVoucher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customers = useSelector((state) => state.account.listAccountCusomer);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const [voucherDetails, setVoucherDetails] = useState({
    name: "",
    note: "",
    value: "",
    quantity: "",
    maximumDiscount: "",
    minBillValue: "",
    startAt: null,
    endAt: null,
    type: "0",
    status: "upcoming",
    isPrivate: false,
    accountIds: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    let formattedValue = value;

    if (name === "value" && voucherDetails.type === "1") {
      const numberValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
      formattedValue = numberValue.toLocaleString("vi-VN");
      if (numberValue > voucherDetails.minBillValue) {
        toast.error(
          "Giá trị giảm không được lớn hơn giá trị đơn hàng tối thiểu."
        );
        return;
      }
      setVoucherDetails({
        ...voucherDetails,
        [name]: numberValue,
        [`${name}Display`]: formattedValue,
      });
    } else if (name === "value" && voucherDetails.type === "0") {
      if (/^\d*$/.test(value)) {
        setVoucherDetails({
          ...voucherDetails,
          [name]: value,
        });
      }
    } else if (name === "maximumDiscount") {
      const numberValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
      formattedValue = numberValue.toLocaleString("vi-VN");
      if (numberValue > voucherDetails.minBillValue) {
        toast.error(
          "Giảm giá tối đa không được lớn hơn giá trị đơn hàng tối thiểu."
        );
        return;
      }
      setVoucherDetails({
        ...voucherDetails,
        [name]: numberValue,
        [`${name}Display`]: formattedValue,
      });
    } else if (name === "minBillValue") {
      const numberValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
      formattedValue = numberValue.toLocaleString("vi-VN");
      setVoucherDetails({
        ...voucherDetails,
        [name]: numberValue,
        [`${name}Display`]: formattedValue,
      });
    } else if (name === "name" || name === "note") {
      setVoucherDetails({
        ...voucherDetails,
        [name]: value.trimStart(),
      });
    } else {
      setVoucherDetails({
        ...voucherDetails,
        [name]: formattedValue,
      });
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;

    setVoucherDetails((prevState) => ({
      ...prevState,
      type: newType,
      maximumDiscount: newType === "1" ? "" : prevState.maximumDiscount,
      value: "",
    }));
  };

  const handleVoucherTypeChange = (isPrivate) => {
    setVoucherDetails((prevState) => ({
      ...prevState,
      isPrivate,
      quantity: isPrivate ? selectedCustomerIds.length : "", // Tự động tính số lượng nếu là riêng tư
    }));
  };

  const validateVoucherDetails = () => {
    if (
      !voucherDetails.name ||
      /^[\s]*$/.test(voucherDetails.name) ||
      voucherDetails.name.length > 255 ||
      !/^[A-Za-zÀ-ỹ0-9\s]+$/.test(voucherDetails.name)
    ) {
      toast.error("Tên phiếu giảm giá không hợp lệ.");
      return false;
    }

    if (
      !voucherDetails.isPrivate &&
      (!voucherDetails.quantity ||
        voucherDetails.quantity < 1 ||
        voucherDetails.quantity > 1000 ||
        !Number.isInteger(Number(voucherDetails.quantity)))
    ) {
      toast.error("Số lượng không hợp lệ (phải là số nguyên từ 1 đến 1000).");
      return false;
    }

    if (
      !voucherDetails.minBillValue ||
      parseFloat(voucherDetails.minBillValue) <= 1000 ||
      parseFloat(voucherDetails.minBillValue) > 10000000
    ) {
      toast.error(
        "Giá trị đơn hàng tối thiểu phải nằm trong khoảng từ 1,000 VND đến 10,000,000 VND."
      );
      return false;
    }

    if (
      (voucherDetails.type === "0" &&
        (voucherDetails.value < 1 ||
          voucherDetails.value > 99 ||
          !/^\d+$/.test(voucherDetails.value))) ||
      (voucherDetails.type === "1" &&
        !/^\d+(\.\d{1,2})?$/.test(voucherDetails.value))
    ) {
      toast.error("Giá trị giảm giá phải nằm trong khoảng 1% - 99%.");
      return false;
    }

    if (
      !voucherDetails.maximumDiscount ||
      parseFloat(voucherDetails.maximumDiscount) <= 1000 ||
      parseFloat(voucherDetails.maximumDiscount) > 2000000 ||
      parseFloat(voucherDetails.maximumDiscount) >
        parseFloat(voucherDetails.minBillValue)
    ) {
      toast.error(
        "Giảm giá tối đa không hợp lệ (phải nằm trong khoảng từ 1,000 VND đến 2,000,000 VND và nhỏ hơn giá trị đơn hàng tối thiểu)."
      );
      return false;
    }

    if (
      !voucherDetails.startAt ||
      new Date(voucherDetails.startAt) < new Date()
    ) {
      toast.error("Ngày bắt đầu phải từ ngày hiện tại trở đi.");
      return false;
    }

    if (
      !voucherDetails.endAt ||
      new Date(voucherDetails.endAt) <= new Date(voucherDetails.startAt) ||
      new Date(voucherDetails.endAt) <= new Date()
    ) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu và ngày hiện tại.");
      return false;
    }

    return true; // Tất cả điều kiện đều hợp lệ
  };

  const handleCreateVoucher = async () => {
    try {
      if (!validateVoucherDetails()) return;

      const confirmCreate = await swal({
        title: "Xác nhận tạo phiếu giảm giá",
        text: "Bạn có chắc chắn muốn thêm phiếu giảm giá này?",
        icon: "warning",
        buttons: ["Hủy bỏ", "Xác nhận"],
        dangerMode: true,
      });

      if (!confirmCreate) return;
      let res;

      const generateEmailContent = ({
        companyName,
        companyPhone,
        companyEmail,
        customerName,
        discountName,
        discountValue,
        minOrderValue,
        expirationDate,
        startDate,
        websiteUrl,
        image,
      }) => {
        const formatCurrency = (amount) =>
          `${amount.toLocaleString("vi-VN")} VND`;

        return `
          Kính gửi Quý khách hàng <strong>${customerName}</strong>,<br>
          Chúng tôi xin gửi lời cảm ơn chân thành đến Quý khách hàng đã tin tưởng và ủng hộ <strong>${companyName}</strong> trong thời gian qua.<br>
          Nhằm tri ân sự ủng hộ của Quý khách, chúng tôi xin trân trọng gửi tới Quý khách một Phiếu giảm giá đặc biệt với thông tin chi tiết như sau:<br>
            • Tên phiếu giảm giá: <strong>${discountName}</strong><br>
            • Giá trị giảm: <strong>${discountValue}%</strong><br>
            • Giá trị đơn hàng tối thiểu: <strong>${formatCurrency(
              minOrderValue
            )}</strong><br>
            • Ngày hết hạn: <strong>${new Date(
              expirationDate
            ).toLocaleDateString("vi-VN")}</strong><br>
          Quý khách có thể sử dụng phiếu giảm giá này cho các đơn hàng mua sắm tại ${websiteUrl} từ ${new Date(
          startDate
        ).toLocaleDateString("vi-VN")} đến ${new Date(
          expirationDate
        ).toLocaleDateString("vi-VN")}.<br>
                    Đừng bỏ lỡ cơ hội sở hữu những sản phẩm chất lượng với ưu đãi hấp dẫn!<br>
                    Nếu cần hỗ trợ, vui lòng liên hệ với chúng tôi qua ${companyEmail} hoặc hotline ${companyPhone}.<br>
                    
                    Trân trọng,<br><br>${companyName}<br><br>
                    <img src="${image}" alt="Company Logo" style="width:200px;height:auto;" />`;
      };

      const handleSuccess = async () => {
        await swal(
          "Thành công!",
          "Phiếu giảm giá đã được tạo thành công.",
          "success"
        );
        dispatch(fetchAllVoucherAction());
        navigate("/admins/manage-voucher");
      };

      const updatedVoucherDetails = {
        ...voucherDetails,

        value:
          voucherDetails.type === "1"
            ? parseFloat(voucherDetails.value.toString().replace(/[^\d]/g, ""))
            : voucherDetails.value,
        maximumDiscount: parseFloat(
          voucherDetails.maximumDiscount.toString().replace(/[^\d]/g, "")
        ),
        minBillValue: parseFloat(
          voucherDetails.minBillValue.toString().replace(/[^\d]/g, "")
        ),
        startAt: voucherDetails.startAt
          ? new Date(voucherDetails.startAt).toISOString()
          : "",
        endAt: voucherDetails.endAt
          ? new Date(voucherDetails.endAt).toISOString()
          : "",
      };

      if (voucherDetails.isPrivate) {
        res = await createPrivateVoucher({
          ...voucherDetails,
          accountIds: selectedCustomerIds,
          quantity: voucherDetails.isPrivate
            ? selectedCustomerIds.length
            : voucherDetails.quantity,
          startAt: voucherDetails.startAt
            ? new Date(voucherDetails.startAt).toISOString()
            : "",
          endAt: voucherDetails.endAt
            ? new Date(voucherDetails.endAt).toISOString()
            : "",
        });

        if (res) {
          console.log("Response from private voucher creation:", res); // Log response
          await handleSuccess();
          const emails = await fetchEmailsByCustomerIds(selectedCustomerIds);
          if (emails && emails.length > 0) {
            for (const email of emails) {
              const customer = customers.find((c) => c.email === email);
              const emailContent = generateEmailContent({
                companyName: "SuperShoes",
                companyPhone: "0909 123 456",
                companyEmail: "namntph33821@gmail.com",
                customerName: customer?.name || "thân mến",
                voucherCode: voucherDetails.codeVoucher,
                discountName: voucherDetails.name,
                discountValue: voucherDetails.value,
                minOrderValue: voucherDetails.minBillValue,
                expirationDate: voucherDetails.endAt,
                startDate: voucherDetails.startAt,
                websiteUrl: "https://SuperShoes.com",
                image:
                  "https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png",
              });
              await sendEmail({
                to: email,
                subject: "Phiếu giảm giá đặc biệt dành cho bạn!",
                body: emailContent,
              });
            }
            toast.success("Email đã được gửi cho khách hàng");
          } else {
            swal("Lỗi", "Có lỗi xảy ra khi tạo phiếu giảm giá.", "error");
          }
        }
      } else {
        res = await createPublicVoucher(updatedVoucherDetails);
        if (res) {
          console.log("Response from public voucher creation:", res); // Log response
          await handleSuccess();
        }
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi tạo phiếu giảm giá:", error); // Log error
    }
  };

  const handleReset = async () => {
    const confirmReset = await swal({
      title: "Xác nhận làm mới",
      text: "Bạn có chắc chắn muốn làm mới tất cả các trường?",
      icon: "warning",
      buttons: ["Hủy bỏ", "Xác nhận"],
      dangerMode: true,
    });

    if (!confirmReset) return;

    setVoucherDetails({
      name: "",
      note: "",
      value: "",
      quantity: "",
      maximumDiscount: "",
      minBillValue: "",
      startAt: "",
      endAt: "",
      type: "0",
      status: "upcoming",
      isPrivate: false,
      accountIds: [],
    });
    setSelectedCustomerIds([]);
  };

  return (
    <AuthGuard>
      <RoleBasedGuard accessibleRoles={["ADMIN"]}>
        <div className="model-create-voucher container voucher-container">
          <div className="row">
            <div className="col-lg-6">
              <h4 className="text-center p-2">Thêm phiếu giảm giá</h4>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Tên phiếu giảm
                        giá
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={voucherDetails.name}
                        onChange={handleChange}
                        isInvalid={
                          !voucherDetails.name ||
                          voucherDetails.name.length > 255 ||
                          /^[\s]*$/.test(voucherDetails.name) ||
                          !/^[A-Za-zÀ-ỹ0-9\s]+$/.test(voucherDetails.name)
                        }
                      />
                      {!voucherDetails.name ||
                      /^[\s]*$/.test(voucherDetails.name) ? (
                        <Form.Control.Feedback type="invalid">
                          Tên phiếu giảm giá là bắt buộc.
                        </Form.Control.Feedback>
                      ) : voucherDetails.name.length > 255 ? (
                        <Form.Control.Feedback type="invalid">
                          Tên không được vượt quá 255 ký tự.
                        </Form.Control.Feedback>
                      ) : (
                        !/^[A-Za-zÀ-ỹ0-9\s]+$/.test(voucherDetails.name) && (
                          <Form.Control.Feedback type="invalid">
                            Tên không được chứa ký tự đặc biệt.
                          </Form.Control.Feedback>
                        )
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Số lượng
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={
                          voucherDetails.isPrivate
                            ? selectedCustomerIds.length
                            : voucherDetails.quantity
                        }
                        onChange={handleChange}
                        disabled={voucherDetails.isPrivate} // Disable input when voucher is private
                        min="1"
                        max="1000"
                        isInvalid={
                          !voucherDetails.isPrivate && // Only validate when input is not disabled
                          (!voucherDetails.quantity ||
                            voucherDetails.quantity < 1 ||
                            voucherDetails.quantity > 1000 ||
                            !Number.isInteger(Number(voucherDetails.quantity)))
                        }
                      />
                      {!voucherDetails.isPrivate && ( // Show validation only for public vouchers
                        <>
                          {!voucherDetails.quantity ? (
                            <Form.Control.Feedback type="invalid">
                              Số lượng là bắt buộc.
                            </Form.Control.Feedback>
                          ) : voucherDetails.quantity < 1 ? (
                            <Form.Control.Feedback type="invalid">
                              Số lượng phải là số nguyên dương từ 1.
                            </Form.Control.Feedback>
                          ) : voucherDetails.quantity > 1000 ? (
                            <Form.Control.Feedback type="invalid">
                              Số lượng không được vượt quá 1000.
                            </Form.Control.Feedback>
                          ) : (
                            !Number.isInteger(
                              Number(voucherDetails.quantity)
                            ) && (
                              <Form.Control.Feedback type="invalid">
                                Số lượng phải là số nguyên.
                              </Form.Control.Feedback>
                            )
                          )}
                        </>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Kiểu giảm giá
                      </Form.Label>
                      <select
                        className="form-select"
                        name="type"
                        value={voucherDetails.type}
                        onChange={handleTypeChange}
                      >
                        <option value="0">Giảm theo %</option>
                        {/* <option value="1">Giảm theo số tiền</option> */}
                      </select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Giá trị đơn hàng
                        tối thiểu
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="minBillValue"
                          value={
                            voucherDetails.minBillValue
                              ? Number(
                                  voucherDetails.minBillValue
                                ).toLocaleString("vi-VN")
                              : ""
                          }
                          onChange={handleChange}
                          isInvalid={
                            !voucherDetails.minBillValue ||
                            parseFloat(voucherDetails.minBillValue) <= 1000 ||
                            parseFloat(voucherDetails.minBillValue) > 10000000
                          }
                        />
                        <InputGroup.Text>VND</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {!voucherDetails.minBillValue
                            ? "Giá trị đơn hàng tối thiểu là bắt buộc."
                            : parseFloat(voucherDetails.minBillValue) <= 1000
                            ? "Giá trị đơn hàng tối thiểu phải từ 1,000 VND."
                            : parseFloat(voucherDetails.minBillValue) > 10000000
                            ? "Giá trị đơn hàng tối thiểu không được vượt quá 10,000,000 VND."
                            : ""}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Giá trị
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="value"
                          value={
                            voucherDetails.type === "1"
                              ? Number(voucherDetails.value).toLocaleString(
                                  "vi-VN"
                                )
                              : voucherDetails.value
                          }
                          onChange={handleChange}
                          isInvalid={
                            !voucherDetails.value ||
                            (voucherDetails.type === "1" &&
                              (voucherDetails.value < 1 ||
                                voucherDetails.value > 2000000 ||
                                voucherDetails.value >
                                  voucherDetails.minBillValue)) ||
                            (voucherDetails.type === "0" &&
                              (voucherDetails.value < 1 ||
                                voucherDetails.value > 99)) ||
                            (voucherDetails.type === "0" &&
                              !/^\d+$/.test(voucherDetails.value)) ||
                            (voucherDetails.type === "1" &&
                              !/^\d+(\.\d{1,2})?$/.test(voucherDetails.value))
                          }
                        />
                        <InputGroup.Text>
                          {String(voucherDetails.type) === "0" ? "%" : "VND"}
                        </InputGroup.Text>
                        {!voucherDetails.value ? (
                          <Form.Control.Feedback type="invalid">
                            Giá trị là bắt buộc.
                          </Form.Control.Feedback>
                        ) : (
                          <>
                            {voucherDetails.type === "1" &&
                              voucherDetails.value < 1 && (
                                <Form.Control.Feedback type="invalid">
                                  Giá trị phải từ 1 VND.
                                </Form.Control.Feedback>
                              )}
                            {voucherDetails.type === "1" &&
                              voucherDetails.value > 2000000 && (
                                <Form.Control.Feedback type="invalid">
                                  Giá trị không được vượt quá 2,000,000 VND.
                                </Form.Control.Feedback>
                              )}
                            {voucherDetails.type === "1" &&
                              voucherDetails.value >
                                voucherDetails.minBillValue && (
                                <Form.Control.Feedback type="invalid">
                                  Giá trị không được lớn hơn giá trị đơn hàng
                                  tối thiểu.
                                </Form.Control.Feedback>
                              )}
                            {voucherDetails.type === "0" &&
                              voucherDetails.value < 1 && (
                                <Form.Control.Feedback type="invalid">
                                  Giá trị phải từ 1%.
                                </Form.Control.Feedback>
                              )}
                            {voucherDetails.type === "0" &&
                              voucherDetails.value > 99 && (
                                <Form.Control.Feedback type="invalid">
                                  Giá trị không được vượt quá 99%.
                                </Form.Control.Feedback>
                              )}
                            {voucherDetails.type === "0" &&
                              !/^\d+$/.test(voucherDetails.value) && (
                                <Form.Control.Feedback type="invalid">
                                  Giá trị không được chứa khoảng trắng hoặc ký
                                  tự đặc biệt.
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
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
                            voucherDetails.maximumDiscount
                              ? Number(
                                  voucherDetails.maximumDiscount
                                ).toLocaleString("vi-VN")
                              : ""
                          }
                          onChange={handleChange}
                          isInvalid={
                            !voucherDetails.maximumDiscount ||
                            parseFloat(voucherDetails.maximumDiscount) <=
                              1000 ||
                            parseFloat(voucherDetails.maximumDiscount) >
                              2000000 ||
                            parseFloat(voucherDetails.maximumDiscount) >
                              parseFloat(voucherDetails.minBillValue)
                          }
                        />
                        <InputGroup.Text>VND</InputGroup.Text>
                        {voucherDetails.type !== "1" && (
                          <Form.Control.Feedback type="invalid">
                            {!voucherDetails.maximumDiscount ||
                            parseFloat(voucherDetails.maximumDiscount) <= 1000
                              ? "Giảm giá tối đa phải lớn hơn 1,000 VND."
                              : parseFloat(voucherDetails.maximumDiscount) >
                                2000000
                              ? "Giảm giá tối đa không được vượt quá 2,000,000 VND."
                              : parseFloat(voucherDetails.maximumDiscount) >
                                parseFloat(voucherDetails.minBillValue)
                              ? "Giảm giá tối đa không được lớn hơn giá trị đơn hàng tối thiểu."
                              : ""}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Ngày bắt đầu
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="startAt"
                        value={voucherDetails.startAt}
                        onChange={handleChange}
                        isInvalid={
                          !voucherDetails.startAt ||
                          new Date(voucherDetails.startAt) < new Date()
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {!voucherDetails.startAt
                          ? "Ngày bắt đầu là bắt buộc."
                          : "Ngày bắt đầu phải từ ngày hiện tại trở đi."}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Ngày kết thúc
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="endAt"
                        value={voucherDetails.endAt}
                        onChange={handleChange}
                        isInvalid={
                          !voucherDetails.endAt ||
                          new Date(voucherDetails.endAt) <=
                            new Date(voucherDetails.startAt) ||
                          new Date(voucherDetails.endAt) <= new Date()
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {!voucherDetails.endAt
                          ? "Ngày kết thúc là bắt buộc."
                          : new Date(voucherDetails.endAt) <=
                            new Date(voucherDetails.startAt)
                          ? "Ngày kết thúc phải sau ngày bắt đầu."
                          : "Ngày kết thúc phải lớn hơn ngày hiện tại."}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Loại phiếu giảm
                        giá
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        label="Công khai"
                        name="isPrivate"
                        value="false"
                        checked={!voucherDetails.isPrivate}
                        onChange={() => handleVoucherTypeChange(false)}
                        inline
                      />
                      <Form.Check
                        type="radio"
                        label="Riêng tư"
                        name="isPrivate"
                        value="true"
                        checked={voucherDetails.isPrivate}
                        onChange={() => handleVoucherTypeChange(true)}
                        inline
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Ghi chú</Form.Label>
                      <Form.Control
                        type="text"
                        name="note"
                        value={voucherDetails.note}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <Button variant="info" onClick={handleCreateVoucher}>
                  Thêm mới
                </Button>{" "}
                <Button variant="secondary" onClick={handleReset}>
                  Làm mới
                </Button>
              </Form>
            </div>

            <div className="p-5 col-lg-6">
              {voucherDetails.isPrivate ? (
                <TableCustomer
                  selectedCustomerIds={selectedCustomerIds}
                  setSelectedCustomerIds={setSelectedCustomerIds}
                  isDisabled={!voucherDetails.isPrivate}
                />
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

export default ModelCreateVoucher;
