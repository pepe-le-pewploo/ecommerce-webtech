import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/CommonForm";
import { addressFormControls } from "@/config/Index";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleManageAddress = async (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    if (currentEditedId !== null) {
      const data = await dispatch(
        editaAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      );

      if (data?.payload?.success) {
        await dispatch(fetchAllAddresses(user?.id));
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
        toast({
          title: "Address updated successfully",
        });
      }
    } else {
      const data = await dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      );

      console.log(data);

      if (data?.payload.success) {
         await dispatch(fetchAllAddresses(user?.id));
        setFormData(initialAddressFormData);
      }
    }
  };

  const handleDeleteAddress = async (getCurrentAddress) => {
    const data = await dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    );

    if (data?.payload?.success) {
      await dispatch(fetchAllAddresses(user?.id));
      toast({
        title: "Address deleted successfully",
      });
    }
  };

  const handleEditAddress = (getCuurentAddress) => {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  };
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "address");
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {" "}
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;

// selectedId={selectedId}
// handleDeleteAddress={handleDeleteAddress}
// addressInfo={singleAddressItem}
// handleEditAddress={handleEditAddress}
// setCurrentSelectedAddress={setCurrentSelectedAddress}
