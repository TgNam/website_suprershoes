public void payBillByEmployee(
            String codeBill,
            boolean delivery,
            boolean postpaid,
            String codeVoucher,
            Long idAccount,
            String name,
            String phoneNumber,
            String address,
            String note
    ) {
        try {
            Optional<Bill> billOptional = billRepository.findByCodeBill(codeBill);
            if (billOptional.isEmpty()) {
                throw new RuntimeException("Hóa đơn " + codeBill + " không tồn tại");
            }

            Bill bill = billOptional.get(); // Lấy giá trị bill để sử dụng sau này

            boolean checkVoucher = false;
            boolean checkAccountVoucher = false;
            Voucher voucher = null;
            AccountVoucher accountVoucher = null;

            if (delivery) {
                if (name == null || name.isBlank()) {
                    throw new RuntimeException("Không được để trống tên người nhận");
                } else if (phoneNumber == null || phoneNumber.isBlank()) {
                    throw new RuntimeException("Không được để trống số điện thoại người nhận");
                } else if (address == null || address.isBlank()) {
                    throw new RuntimeException("Không được để trống địa chỉ nhận hàng");
                }
                if (note != null && !note.isBlank()) {
                    bill.setNote(note);
                }
                bill.setNameCustomer(name);
                bill.setPhoneNumber(phoneNumber);
                bill.setAddress(address);
            }

            if (idAccount != null) {
                Optional<Account> accountOptional = accountRepository.findById(idAccount);
                if (accountOptional.isEmpty()) {
                    throw new RuntimeException("Tài khoản với id là " + idAccount + " không tồn tại");
                }
                bill.setCustomer(accountOptional.get());
            }

            List<BillDetail> listBillDetail = billDetailRepository.findByIdBill(bill.getId());
            if (listBillDetail == null || listBillDetail.isEmpty()) {
                throw new RuntimeException("Chưa có sản phẩm nào trong giỏ hàng");
            }

            BigDecimal totalMerchandise = listBillDetail.stream()
                    .map(billDetail -> billDetail.getPriceDiscount()
                            .multiply(BigDecimal.valueOf(billDetail.getQuantity()))
                            .setScale(2, RoundingMode.HALF_UP))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            bill.setTotalMerchandise(totalMerchandise.setScale(2, RoundingMode.HALF_UP));

            BigDecimal priceDiscount = BigDecimal.ZERO;
            BigDecimal totalAmount = totalMerchandise;

            if (codeVoucher != null && !codeVoucher.isBlank()) {
                Optional<Voucher> voucherOptional = voucherRepository.findByCodeVoucher(codeVoucher);
                if (voucherOptional.isPresent()) {
                    voucher = voucherOptional.get();

                    if (voucher.getQuantity() <= 0) {
                        throw new RuntimeException("Đã hết phiếu giảm giá");
                    }
                    if (totalMerchandise.compareTo(voucher.getMinBillValue()) < 0) {
                        throw new RuntimeException("Hóa đơn không đủ điều kiện sử dụng phiếu giảm giá");
                    }

                    BigDecimal priceSale = totalMerchandise.multiply(BigDecimal.valueOf(voucher.getValue() / 100.0))
                            .setScale(2, RoundingMode.HALF_UP);
                    BigDecimal maximumDiscount = voucher.getMaximumDiscount().max(BigDecimal.ZERO);

                    priceDiscount = priceSale.compareTo(maximumDiscount) <= 0 ? priceSale : maximumDiscount;
                    totalAmount = totalMerchandise.subtract(priceDiscount);

                    if (voucher.getIsPrivate()) {
                        if (idAccount == null) {
                            throw new RuntimeException("Bạn không đủ điều kiện sử dụng voucher: " + voucher.getCodeVoucher());
                        }
                        Optional<AccountVoucher> accountVoucherOptional = accountVoucherRepository
                                .findAccountVoucherByIdAccountAndidVoucher(idAccount, voucher.getId());
                        if (accountVoucherOptional.isEmpty()) {
                            throw new RuntimeException("Bạn không đủ điều kiện sử dụng voucher: " + voucher.getCodeVoucher());
                        }
                        accountVoucher = accountVoucherOptional.get();
                        accountVoucher.setStatus(Status.INACTIVE.toString());
                        checkAccountVoucher = true;
                    }

                    voucher.setQuantity(voucher.getQuantity() - 1);
                    if (voucher.getQuantity() == 0) {
                        voucher.setStatus(Status.FINISHED.toString());
                    }
                    checkVoucher = true;
                    bill.setVoucher(voucher);
                }
            }

            bill.setPriceDiscount(priceDiscount);
            bill.setTotalAmount(totalAmount.setScale(2, RoundingMode.HALF_UP));

            BigDecimal totalPaid = payBillRepository.findByCodeBill(codeBill).stream()
                    .map(PayBillOrderResponse::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            if (postpaid && !delivery) {
                throw new RuntimeException("Chức năng trả sau chỉ áp dụng khi giao hàng");
            } else if (postpaid) {
                PayBillRequest payBillRequest = PayBillRequest.builder()
                        .amount(totalAmount.subtract(totalPaid))
                        .codeBill(codeBill)
                        .type(1)
                        .build();
                PayBillService.createPayBill(payBillRequest, 2, Status.WAITING_FOR_PAYMENT.toString());
                bill.setStatus(Status.SHIPPED.toString());
            } else if (totalPaid.compareTo(totalAmount) < 0) {
                throw new RuntimeException("Vui lòng thanh toán đủ số tiền trước khi thanh toán hóa đơn");
            } else {
                bill.setStatus(delivery ? Status.SHIPPED.toString() : Status.COMPLETED.toString());
            }

            if (checkVoucher) {
                voucherRepository.save(voucher);
            }
            if (checkAccountVoucher) {
                accountVoucherRepository.save(accountVoucher);
            }
            billRepository.save(bill);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }