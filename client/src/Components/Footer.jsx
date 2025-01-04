import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: About */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm">
            We are committed to providing the best services for our customers, ensuring quality and innovation in everything we do.
          </p>
        </div>

        {/* Section 2: Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-400">Home</a></li>
            <li><a href="/menu" className="hover:text-green-400">Menu</a></li>
            <li><a href="/cart" className="hover:text-green-400">Cart</a></li>
            <li><a href="#contact" className="hover:text-green-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">Pune, Maharashtra, India</p>
          <p className="text-sm">Email: abc@xyz.com</p>
          <p className="text-sm">Phone: +91 1234567890</p>
        </div>

        {/* Section 4: Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <i className="fab fa-facebook-f"></i>Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <i className="fab fa-instagram"></i>Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-sky-500">
              <i className="fab fa-twitter"></i>Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <i className="fab fa-youtube"></i>Youtube
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
        <p>© {currentYear}. All rights reserved.</p>
        <p>Designed & Developed by Atharv Kolekar</p>
      </div>
    </footer>
  );
};

export default Footer;
