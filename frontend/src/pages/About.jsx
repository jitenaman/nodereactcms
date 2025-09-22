import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-6 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 max-w-3xl">
          MyCMS is a simple and powerful content management system that allows you to manage your posts efficiently. Built for ease-of-use and flexibility.
        </p>
      </main>
      <Footer />
    </div>
  );
}
