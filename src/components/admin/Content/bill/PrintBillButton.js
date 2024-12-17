import { fetchBillByCode } from "../../../../Service/ApiBillService";
import { findBillDetailByEmployeeByCodeBill } from "../../../../Service/ApiBillDetailByEmployeeService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Invoice from "./BillPrint/Invoice";
import { pdf } from "@react-pdf/renderer";
import { MdOutlinePrint } from "react-icons/md";
import { useDispatch } from "react-redux";
import { initialize } from "../../../../redux/action/authAction";
import { getAccountLogin } from "../../../../Service/ApiAccountService";

const PrintBillButton = ({ codeBill }) => {
  const [bill, setBill] = useState(null);
  const [billDetails, setBillDetails] = useState(null);
  const [account, setAccount] = useState(null);

  const dispatch = useDispatch();

  // Fetch account data
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(initialize({ isAuthenticated: false, user: null }));
    } else {
      fetchAccount();
    }
  }, [dispatch]);

  const fetchAccount = async () => {
    try {
      const response = await getAccountLogin();
      if (response.status === 200) {
        const data = response.data;
       
        
        setAccount(data);
        dispatch(initialize({ isAuthenticated: true, data }));
      }
    } catch (error) {
      dispatch(initialize({ isAuthenticated: false, user: null }));
      toast.error("Failed to fetch account data.");
      setAccount(null);
    }
  };

  // Fetch bill and bill details
  useEffect(() => {
    if (!codeBill) return;
    (async () => {
      try {
        const resBill = await fetchBillByCode(codeBill);
        if (resBill.status === 200) {
          setBill(resBill.data);
        }

        const resBillDetails = await findBillDetailByEmployeeByCodeBill(codeBill);
        if (resBillDetails.status === 200) {
          setBillDetails(resBillDetails.data);
        }
      } catch (error) {
        toast.error("Error fetching bill or bill details.");
      }
    })();
  }, [codeBill]);

  // Generate and open PDF
  const openPDF = async () => {
    if (!bill || !billDetails) {
      toast.error("No data available for printing.");
      return;
    }
    try {
      const blob = await pdf(<Invoice bill={bill} billDetails={billDetails}  account={account}/>).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      toast.error("Failed to generate PDF.");
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={openPDF}>
        <MdOutlinePrint />
      </button>
    </div>
  );
};

export default PrintBillButton;
