import { fetchBillByCode } from "../../../../Service/ApiBillService";
import { findBillDetailByEmployeeByCodeBill } from "../../../../Service/ApiBillDetailByEmployeeService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Invoice from "./BillPrint/Invoice";
import { pdf } from "@react-pdf/renderer";
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

    const openPDF = async () => {
      if(!bill && !billDetals) return null;
      const blob = await pdf(<Invoice bill={bill} billDetails={billDetals} />).toBlob(); // Tạo file PDF dưới dạng blob
      const url = URL.createObjectURL(blob); // Tạo URL tạm cho blob
      window.open(url, "_blank"); // Mở PDF trong tab mới
    };
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <button
          onClick={openPDF}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Hiển thị hóa đơn
        </button>
      </div>
    );
}
export default PrintBillButton;