import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeSections from "./home/HomeSections";

export default function Home() {
  // redirect("/detail");
  return (
    <div className="min-h-screen bg-[#f9f8f6]">
      <Header />
      <HomeSections />
      <Footer />
    </div>
  );
}
