import React, { useEffect, useState } from 'react'
import img from "../../assets/account.jpg";
import Address from '@/components/shopping-view/Address';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/Cart-Items-Content';
import { Button } from '@/components/ui/button';
import { createNewOrder } from '@/store/shop/order-slice';
import { useToast } from '@/hooks/use-toast';
import { depositMoney, fetchBalance, withdrawBalance } from '@/store/bank-slice';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

const ShoppingCheckout = () => {
  const {cartItems} = useSelector(state=>state.shopCart)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  // const { approvalURL } = useSelector((state) => state.shopOrder);
  const {toast} = useToast()
  const {bank} = useSelector(state => state.bank);
  const navigate = useNavigate()

  console.log(user, "Checkout");
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

  const handleInitiatePaypalPayment = async () =>{
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "confirmed",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: nanoid(),
      payerId: user.bankId,
    };

    console.log(orderData, 'paypal checkout')
    const amount = Number(totalCartAmount)
    if(bank<amount) {
      navigate('/shop/paypal-return')
      await delay(2000); 
      toast({
        title: 'Insufficient Fund in your account to make the payment',
        variant: 'destructive'
      })
      await delay(2000);
      navigate('/shop/checkout')
      return
    }

    const data = await dispatch(createNewOrder(orderData))
    console.log(data, "sangam")
    if (data?.payload?.success) {
      navigate('/shop/paypal-return')
      const withdrawData = await dispatch(withdrawBalance({amount}))
      console.log(withdrawData, "Withdraw data")
      if(withdrawData?.payload?.success) {
        await delay(2000)
        toast({
          title: 'Payment Successful, thanks for being with us'
        })
        await dispatch(depositMoney({
          amount: amount,
          userId: '6784ef3981b524e54479a6c7'
        }))
        sessionStorage.removeItem("currentOrderId");
        await delay(2000)
        navigate('/shop/payment-success');
      } else {
        toast({
          title: 'Payment Failed, Please try again later',
          variant: 'destructive'
        })
      }
      // setIsPaymemntStart(true);
    } else {
      // setIsPaymemntStart(false);
    }
  }
  console.log(currentSelectedAddress, 'checkout')
  // if (approvalURL) {
  //   window.location.href = approvalURL;
  // }

  useEffect(() => {
    dispatch(fetchBalance())
  }, [dispatch])
  console.log(bank, "Checkout Page")
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
           setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {/*isPaymentStart
                ? "Processing Paypal Payment..."
                :*/ "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout