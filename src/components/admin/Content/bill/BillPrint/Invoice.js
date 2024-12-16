import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";



Font.register({
  family: "Roboto",
  src: "/font/Roboto-Regular.ttf", // Path to the TTF font file
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Roboto",
  },
  logo: {
    height: 50,
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  addressInfo: {
    textAlign: "right",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 5,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: "left",
  },
  tableCellWide: {
    flex: 2,
    padding: 5,
    textAlign: "left",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "left",
  },
  qrCode: {
    height: 100,
    width: 100,
    margin: "0 auto",
    marginTop: 20,
  },
});


const Invoice = ({ bill, billDetails, account }) => {




  React.useEffect(() => {

  }, [bill.codeBill]);

  return (
    <Document>
      <Page style={styles.page}>

        <View style={styles.header}>
          <Image style={styles.logo} src="/logomain.jpg" />
          <View style={styles.companyInfo}>
            <Text>Công ty Super Shoes</Text>
            <Text style={{ width: 200, wordBreak: "break-word" }}>
              Hóa đơn: {bill.codeBill.substring(0, 20)}
            </Text>
            <Text style={{ width: 200, wordBreak: "break-word" }}>
              {bill.codeBill.substring(20)}
            </Text>
            <Text>Ngày tạo: {new Date(bill.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>


        <View style={styles.section}>
          <Text>Tên khách hàng: {bill.nameCustomer || ""}</Text>
          <Text>Số điện thoại: {bill.phoneNumber || ""}</Text>
          <Text>Địa chỉ: {bill.address || ""}</Text>
          <Text style={styles.boldText}>
            Nhân viên: {account.name || ""}
          </Text>

        </View>


        <View style={styles.section}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>STT</Text>
            <Text style={styles.tableCellWide}>Sản phẩm</Text>
            <Text style={styles.tableCell}>Số lượng</Text>
            <Text style={styles.tableCell}>Đơn giá</Text>

            <Text style={styles.tableCell}>Tổng</Text>
          </View>
          {billDetails.map((detail, index) => (
            <View style={styles.tableRow} key={detail.idBillDetail}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCellWide}>
                {detail.nameProduct} - {detail.nameColor} - Size {detail.nameSize}
              </Text>
              <Text style={styles.tableCell}>{detail.quantityBillDetail}</Text>
              <Text style={styles.tableCell}>
                {detail.priceDiscount.toLocaleString()} VND
              </Text>

              <Text style={styles.tableCell}>
                {(
                  detail.quantityBillDetail * detail.priceDiscount
                ).toLocaleString()}{" "}
                VND
              </Text>
            </View>
          ))}
        </View>


        <View style={styles.section}>
          <View style={styles.tableRow}>
            <Text style={styles.boldText}>
              Tổng cộng: {bill.totalMerchandise.toLocaleString()} VND
            </Text>
          </View>
          <View style={styles.tableRow}>
            {bill.address && (
              <Text style={styles.tableCell}>
                Phí vận chuyển: 30,000 VND
              </Text>
            )}
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.boldText}>
              Giảm: {bill.priceDiscount.toLocaleString()} VND
            </Text>
          </View>


          <View style={styles.tableRow}>
            <Text style={styles.boldText}>
              Thành tiền: {bill.totalAmount.toLocaleString()} VND
            </Text>
          </View>

        </View>
        <br>
        </br>

        <View style={{ textAlign: "center", flex: 1, paddingTop: '20px' }}>
          <Text style={{ marginTop: 5 }}>Người bán hàng</Text>
          <Text style={{ marginTop: 5,paddingTop:'10px' }}>{account.name || ""}</Text>
          <Text style={styles.footer}>Cảm ơn quý khách</Text>
        </View>
      
      </Page>
    </Document>
  );
};

export default Invoice;
