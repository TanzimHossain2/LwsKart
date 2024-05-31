import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";
import { generateInvoicePDF } from "./generateInvoicePDF";
import { uploadInvoiceToCloudinary } from "./uploadCloudinary";
import { sendEmailWithInvoiceLink } from "./sendEmailWithInvoiceLink";
import { currentUser } from "@/lib/authUser";

export const handleOrderCompletion = async (orderId: string) => {
  const user = await currentUser();
  if (!user) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }



  
  try {
    await dbConnect();
    const order = await db.order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Generate PDF
    const pdfPath = await generateInvoicePDF(order); 

    // Upload PDF to Cloudinary
    const pdfUrl = await uploadInvoiceToCloudinary(pdfPath);


    // Send Email
    await sendEmailWithInvoiceLink(user?.email  || order.user.email, pdfUrl);

    return {
      status: 200,
      message: "Order completed and invoice sent successfully",
    };
  } catch (error) {
    console.log("Error inside handleOrderCompletion: ", error);
    
    return {
      status: 500,
      message: (error as Error).message,
    };
  }
};
