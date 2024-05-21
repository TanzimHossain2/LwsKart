import Copyright from "@/components/landing/Copyright";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/Header";
import Navbar from "@/components/landing/Navbar";
import { getDictionary } from "./dictionaries";

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

const LanguageLayout =async ({ children, params }: LanguageLayoutProps) => {
  const lang = params.lang as string;
  const dictionary = await getDictionary(lang);

  return (
    <>

      <Header />
      <Navbar />
      {children}
      <Footer />
      <Copyright />
   
    </>
  );
};

export default LanguageLayout;
