import AddProductForm from "@/components/product/AddProductForm";
import Loading from "@/components/shared/loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

const AddProductPage = () => {
  return (
    <div className="container py-4">
      <h1>Add Product</h1>
      <Suspense fallback={<Loading />}>
      <AddProductForm />
      </Suspense>
    </div>
  );
};

export default AddProductPage;
