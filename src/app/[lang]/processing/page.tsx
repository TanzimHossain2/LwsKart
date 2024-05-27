import { handlePaymentProcessing } from "@/backend/lib/transaction";
import Processing from "@/components/checkout/Processing";
import appConfig from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lwskart - Processing",
  description: "Lwskart - Processing Page, where you can see the payment processing status",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Processing&description=Lwskart%20-%20Processing%20Page,%20where%20you%20can%20see%20the%20payment%20processing%20status`,
        width: 1200,
        height: 630,
        alt: "Lwskart",
      },
    ],
    siteName: "Lwskart",
    type: "website",
    locale: "en_US",
  },
};

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
