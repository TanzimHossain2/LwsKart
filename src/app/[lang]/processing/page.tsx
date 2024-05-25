import { handlePaymentProcessing } from "@/backend/lib/transaction";
import Processing from "@/components/checkout/Processing";


type ProcessingPageProps = {
  searchParams: {
    orderId: string;
    paymentMethod: "cash" | "card" | "paypal" | "crypto";
  };
};

const ProcessingPage = async ({ searchParams }: ProcessingPageProps) => {
  const { orderId, paymentMethod } = searchParams;

  return (
    <div>
      <Processing orderId ={orderId} method={paymentMethod} />
    </div>
  );
};

export default ProcessingPage;
