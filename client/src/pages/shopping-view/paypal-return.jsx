import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice";


const PaypalReturnPage = () => {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const paymentId = params.get("paymentId");
  // const payerId = params.get("PayerID");

  // useEffect(() => {
  //   const funcCall = async () => {
  //     if (paymentId && payerId) {
  //       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

  //       const data = await dispatch(capturePayment({ paymentId, payerId, orderId }));
  //       console.log(data, "paypal return");
    
  //       if (data?.payload?.success) {
  //         sessionStorage.removeItem("currentOrderId");
  //         window.location.href = "/shop/payment-success";
  //       }
  //     }
  //   };
  //   funcCall();
  // }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
