import { Button } from "react-bootstrap";
import { fetchBillByCode } from "../../../../Service/ApiBillService";
import { findBillDetailByEmployeeByCodeBill } from "../../../../Service/ApiBillDetailByEmployeeService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const PrintBillButton = ({codeBill = "HD791203-d5493fa8-f3c7-41d3-ab26-d3e6ad1596d7"})=>{
    
    const [bill, setBill] = useState(null)
    const [billDetals, setBillDetals] = useState(null)
    
    useEffect(()=>{
        if(!codeBill) return;
        (async () =>{
            try {
                let resBill = await fetchBillByCode(codeBill);
                setBill(resBill.data);
                let resBillDetails = await findBillDetailByEmployeeByCodeBill(codeBill);
                setBillDetals(resBillDetails.data);
            } catch (error) {
                toast.error(error)
            }
        })()
    },[codeBill])

    useEffect(()=>{
        console.log(bill);
        console.log(billDetals);
    },[bill, billDetals])

    // const generatePDF = () => {
    //     const doc = new jsPDF();
    
    //     // Thêm nội dung vào PDF
    //     doc.setFont("helvetica", "bold");
    //     doc.setFontSize(20);
    //     doc.text("Hóa đơn thanh toán", 20, 20);
    
    //     doc.setFontSize(12);
    //     doc.text("Tên khách hàng: Nguyễn Văn A", 20, 40);
    //     doc.text("Số điện thoại: 0123456789", 20, 50);
    //     doc.text("Ngày: 28/11/2024", 20, 60);
    
    //     doc.text("Sản phẩm:", 20, 80);
    //     doc.text("1. Laptop - 20,000,000 VND", 20, 90);
    //     doc.text("2. Chuột máy tính - 500,000 VND", 20, 100);
    
    //     doc.text("Tổng cộng: 20,500,000 VND", 20, 120);
    
    //     // Lưu file PDF
    //     doc.save("bill.pdf");
    //   };

    return(
        <Button>In hóa đơn</Button>
    )
}
export default PrintBillButton;