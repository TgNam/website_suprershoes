import { fetchBillByCode } from "../../../../Service/ApiBillService";
import { findBillDetailByEmployeeByCodeBill } from "../../../../Service/ApiBillDetailByEmployeeService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Invoice from "./BillPrint/Invoice";
import { pdf } from "@react-pdf/renderer";
import { MdOutlinePrint } from "react-icons/md";
const PrintBillButton = ({ codeBill }) => {
  const [bill, setBill] = useState(null)
  const [billDetals, setBillDetals] = useState(null)

  useEffect(() => {
    if (!codeBill) return;
    (async () => {
      try {
        let resBill = await fetchBillByCode(codeBill);
        setBill(resBill.data);
    
        
        let resBillDetails = await findBillDetailByEmployeeByCodeBill(codeBill);
        setBillDetals(resBillDetails.data);
       
      } catch (error) {
        toast.error(error)
      }
    })()
  }, [codeBill])

  useEffect(() => {

  }, [bill, billDetals])

  const openPDF = async () => {
    if (!bill && !billDetals) return null;
    const blob = await pdf(<Invoice bill={bill} billDetails={billDetals} />).toBlob(); // Tạo file PDF dưới dạng blob
    const url = URL.createObjectURL(blob); // Tạo URL tạm cho blob
    window.open(url, "_blank"); // Mở PDF trong tab mới
  };
  return (
    <div >
      <button className="btn btn-success"
        onClick={openPDF}

      >
        <MdOutlinePrint />
      </button>
    </div>
  );
}
export default PrintBillButton;