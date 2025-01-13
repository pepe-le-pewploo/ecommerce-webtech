import React, { useEffect, useState } from 'react'
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import CommonForm from '../common/CommonForm';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/order-slice';
import { depositMoney, fetchBalance, withdrawBalance } from '@/store/bank-slice';

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = ({orderDetails}) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {bank} = useSelector(state=>state.bank)

  console.log(orderDetails, "orderDetailsorderDetails");
  
  const handleUpdateStatus = async (event) => {
    event.preventDefault();
    console.log(formData, 'handleUpdateStatus')
    const { status } = formData;
    if(status === 'rejected') {
      console.log(orderDetails.totalAmount, 'handleUpdateStatus')
      const amount = Number(orderDetails.totalAmount)
      console.log(bank)
      if(bank<amount) {
        toast({
          title: 'Order cannot be cancelled due to insufficient funds in your bank',
          variant: 'destructive'
        })
        return
      }
      const withdrawData = await dispatch(withdrawBalance({amount: amount}))
      console.log(withdrawData, "WithdrawData from somewher")
      const depositData= await dispatch(depositMoney({userId: orderDetails.payerId, amount: amount}))
      console.log(depositData, "DepositData from somewher")
    }

    const data = await dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    );

    if (data?.payload?.success) {
      await dispatch(getOrderDetailsForAdmin(orderDetails?._id));
      await dispatch(getAllOrdersForAdmin());
      setFormData(initialFormData);

      toast({
        title: data?.payload?.message,
      });
    }
  }
  useEffect(() => {
    dispatch(fetchBalance());
  },[dispatch])
  console.log(user, "user below fetch")
  console.log(bank, 'below Fetch')
  console.log(formData, "Order Admin view")
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li key={item.productId} className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "Pending", label: "Pending" },
                  { id: "Processing", label: "In Process" },
                  { id: "Shipping", label: "In Shipping" },
                  { id: "Delivered", label: "Delivered" },
                  { id: "Rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
            isBtnDisabled={orderDetails?.orderStatus === 'rejected'}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView