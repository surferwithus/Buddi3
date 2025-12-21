import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeSections from "./home/HomeSections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeSections />
      <Footer />
    </div>
  );
}
