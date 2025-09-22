import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-6 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-700 max-w-3xl mb-6">
          Feel free to reach out to us via email at <a href="mailto:support@mycms.com" className="text-blue-600">support@mycms.com</a>.
        </p>
        <form className="max-w-xl">
          <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 border rounded"/>
          <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 border rounded"/>
          <textarea placeholder="Your Message" rows={5} className="w-full p-3 mb-4 border rounded"></textarea>
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
