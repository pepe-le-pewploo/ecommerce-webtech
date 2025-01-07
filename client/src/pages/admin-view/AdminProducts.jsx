import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/Product-tile";
import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/Index";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [upoloadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {productList} = useSelector(state=>state.adminProducts)
  const dispatch = useDispatch()

  const {toast} = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();
    if(currentEditedId!==null) {
      const editData = await dispatch(editProduct({
        id: currentEditedId,
        formData
      }))
      console.log(editData)
      if (editData?.payload?.success) {
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
      }
    } else {
      const data = await dispatch(addNewProduct({
        ...formData,
        image: upoloadedImageUrl
      }));
      console.log(data)
      if(data?.payload?.success) {
        dispatch(fetchAllProducts())
        setImageFile(null)
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData)
        toast({
          title: 'Product added successfully'
        })
      }
    }
    
  };

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  console.log(formData, 'formData');
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length>0 ?
          productList.map(productItem=> <AdminProductTile key={productItem._id} setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} product={productItem} handleDelete={handleDelete}/>): null
        }
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId !== null ? "Edit Product" : "Add New Product"}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            upoloadedImageUrl={upoloadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            ></CommonForm>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
