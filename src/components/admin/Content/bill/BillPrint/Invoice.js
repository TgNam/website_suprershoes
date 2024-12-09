import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

// Đăng ký font Roboto
Font.register({
  family: "Roboto",
  src: "/font/Roboto-Regular.ttf", // Đường dẫn đến font TTF
});

// Định nghĩa styles
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
});

// Tạo hóa đơn
const Invoice = ({ bill, billDetails }) => (
  <Document>
    <Page style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src="/logomain.jpg" />
        <View style={styles.companyInfo}>
          <Text>Công ty ABC</Text>
          <Text style={{ width: 200, wordBreak: "break-word" }}>
            Hóa đơn: {bill.codeBill.substring(0, 20)}
          </Text>
          <Text style={{ width: 200, wordBreak: "break-word" }}>
            {bill.codeBill.substring(20)}
          </Text>
          <Text>Ngày tạo: {new Date(bill.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Thông tin khách hàng */}
      <View style={styles.section}>
        <Text>Tên khách hàng: {bill.nameCustomer || ""}</Text>
        <Text>Số điện thoại: {bill.phoneNumber || ""}</Text>
        <Text>Địa chỉ: {bill.address || ""}</Text>
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.section}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>STT</Text>
          <Text style={styles.tableCellWide}>Sản phẩm</Text>
          <Text style={styles.tableCell}>Số lượng</Text>
          <Text style={styles.tableCell}>Đơn giá</Text>
          <Text style={styles.tableCell}>Giảm giá</Text>
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
              {(detail.value || 0).toLocaleString()} %
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

      {/* Tổng tiền */}
      <View style={styles.section}>
        <View style={styles.tableRow}>
          <Text style={styles.boldText}>Tổng cộng: {bill.totalMerchandise.toLocaleString()} VND</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.boldText}>Giảm: {bill.priceDiscount.toLocaleString()} VND</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.boldText}>Thành tiền: {bill.totalAmount.toLocaleString()} VND</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Cảm ơn quý khách</Text>
    </Page>
  </Document>
);

export default Invoice;
