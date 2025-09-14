import { memo } from 'react';
import logo from "../../../assets/footer-logo.svg"
import { NavLink } from 'react-router-dom';
import icons from "../../../assets/social-icons.svg"

const Footer = () => {
  return (
    <section className='bg-[#141718] w-full h-auto md:h-[250px]'>
      <div className="container mx-auto h-full px-4">
        <div className='h-auto md:h-3/4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 py-4 md:py-0'>
          <div className='flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 sm:gap-5'>
            <img src={logo} alt="" />  
            <p className='hidden sm:block text-gray-700 text-[25px]'>|</p>
            <p className='text-gray-200 text-sm sm:text-base'>Gift & Decoration Store</p>
          </div>

          <div className='flex flex-wrap justify-center md:justify-end text-white gap-3 sm:gap-5 text-sm sm:text-base'>
            <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white underline"
                    : "hover:underline"
                }
              >
                Home
            </NavLink>
            <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white underline"
                    : "hover:underline"
                }
              >
                Shop
            </NavLink>
            <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white underline"
                    : "hover:underline"
                }
              >
                Product
            </NavLink>
            <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white underline"
                    : "hover:underline"
                }
              >
                Blog
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white underline"
                    : "hover:underline"
                }
              >
                Contact Us
              </NavLink>
          </div>
        </div>

        <hr className="border-gray-400" />

        <div className='h-auto md:h-1/4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 py-3 md:py-0'>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-7 text-[12px] sm:text-sm text-white text-center md:text-left'>
            <p>Copyright © 2023 3legant. All rights reserved</p>
            <a className='font-semibold' href="#">Privacy Policy</a>
            <a className='font-semibold' href="#">Terms of Use</a>
          </div>
          <img src={icons} alt="" className='w-[100px] sm:w-[120px] h-[24px]'/>
        </div>
      </div>
    </section>
  );
};

export default memo(Footer);
