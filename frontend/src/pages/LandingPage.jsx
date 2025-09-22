import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-blue-500 text-white p-4 text-center">
  Tailwind is working!
</div>

      <main className="flex-1 flex flex-col justify-center items-center bg-gray-100 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to MyCMS
        </h1>
        <p className="text-gray-700 mb-6 max-w-xl">
          Manage your content easily with our simple and powerful CMS. Create, edit, and delete posts effortlessly.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
