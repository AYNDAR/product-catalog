export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white mt-16">
      <div className="px-4 sm:px-6 lg:px-12 py-8 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-yellow-400">
            Product Catalog
          </h2>
          <p className="text-sm mt-2 text-gray-300">
            A modern e-commerce interface built with React and TypeScript.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300">Email: support@example.com</p>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} Product Catalog. All rights reserved.
      </div>
    </footer>
  );
}
