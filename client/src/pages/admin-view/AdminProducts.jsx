import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/Index";
import React, { Fragment, useState } from "react";

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price:"",
  salePrice: '',
  totalStock: ''
}

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData)

  const [imageFile, setImageFile] = useState(null);
  const [upoloadedImageUrl, setUploadedImageUrl] = useState('')

  const onSubmit = () => {

  }
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
            <SheetTitle>
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} upoloadedImageUrl ={upoloadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
          <div className="py-6">
            <CommonForm formData={formData} setFormData={setFormData} buttonText={'Add'} formControls={addProductFormElements} onSubmit={onSubmit}>

            </CommonForm>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
