import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-6 py-12 flex flex-col items-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Register</h2>
        <form className="w-full max-w-md flex flex-col space-y-4">
          <input type="text" placeholder="Name" className="p-3 border rounded"/>
          <input type="email" placeholder="Email" className="p-3 border rounded"/>
          <input type="password" placeholder="Password" className="p-3 border rounded"/>
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Register
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
