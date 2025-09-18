import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center bg-white mx-auto">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base text-gray-500 mb-4">Oops page not found</p>
            <h1 className="text-[48px] sm:text-[64px] md:text-[80px] font-extrabold leading-tight text-gray-900">
              404
            </h1>
            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
              Sorry requested page does not exist
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl">
              Page may be removed or link may be wrong Choose to return to home page or continue via search
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 justify-center md:justify-start">
              <NavLink
                to="/"
                className="inline-block px-6 py-3 bg-black text-white font-medium rounded-lg shadow hover:opacity-95 transition"
              >
                Home page
              </NavLink>

              <NavLink
                to="/contact-us"
                className="inline-block px-6 py-3 border border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition text-center"
              >
                Contact us
              </NavLink>
            </div>

            <div className="mt-6 text-sm text-gray-500 flex flex-wrap gap-4 justify-center md:justify-start">
              <NavLink to="/shop" className="hover:underline">Shop</NavLink>
              <NavLink to="/about" className="hover:underline">About us</NavLink>
              <NavLink to="/faq" className="hover:underline">FAQ</NavLink>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .text-\\[48px\\] { font-size: 40px; line-height: 1 }
          }
        `}</style>
      </div>
    </main>
  )
}

export default NotFound
