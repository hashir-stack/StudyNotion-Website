import  { useEffect, useState } from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
      console.log("Api responce", result.data.data[0].name);
    } catch (error) {
      console.log("Can't fetch the category list...");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const location = useLocation();

  const matchRoutes = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="relative flex h-14 items-center border-b-[1px] border-richblack-700 font-sans">
      <div className="w-11/12 max-w-[1260px] mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
        {/*-------------- logo---------------- */}
        <NavLink to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[120px] h-[36px] object-contain md:w-[160px] md:h-[42px]"
            loading="lazy"
          />
        </NavLink>

        {/* -----------NavBar------------------ */}
        <nav className="hidden md:block">
          <ul className="flex gap-4 lg:gap-6 items-center text-richblack-25">
            {NavbarLinks?.map((element, index) => {
              return (
                <li key={index} className="text-lg">
                  {element.title === "Catalog" ? (
                    <div className="relative flex items-center gap-1 group">
                      <p>{element.title}</p>
                      <MdKeyboardArrowDown />

                      <div className="invisible absolute left-[50%] top-[-90%] translate-x-[-50%] translate-y-[20%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[200px] md:w-[250px] lg:w-[300px] z-50">
                        <div className="absolute left-[60%] top-0 h-6 w-6 rotate-45 rounded-md bg-richblack-5 translate-x-[-50%] translate-y-[-40%]"></div>
                        {loading ? (
                          <p className="text-center text-black">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              // ?.filter(
                              //   (subLink) => subLink?.courses?.length > 0
                              // )
                              ?.map((subLink, i) => (
                                <NavLink
                                  to={`/catalog/${subLink.name
                                    .replace(/[^a-zA-Z0-9]/g, "")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p className="text-black text-sm">
                                    {subLink.name}
                                  </p>
                                </NavLink>
                              ))}
                          </>
                        ) : (
                          <p className="text-center text-black">
                            No Courses Found
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={element?.path}
                      className={`${
                        matchRoutes(element?.path)
                          ? "text-yellow-25"
                          : "text-richblack-200"
                      } font-bold`}
                    >
                      {element?.title}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* for mobile view */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-richblack-800 z-50 md:hidden">
            <ul className="flex flex-col gap-4 p-4 text-richblack-25">
              {NavbarLinks.map((element, index) => (
                <li key={index}>
                  {element.title === "Catalog" ? (
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <span>{element.title}</span>
                        <MdKeyboardArrowDown />
                      </summary>
                      <div className="mt-2 pl-4">
                        {subLinks.map((subLink, i) => (
                          <NavLink
                            to={`/catalog/${subLink.name
                              .replace(/[^a-zA-Z0-9]/g, "")
                              .toLowerCase()}`}
                            className="block py-2 text-sm text-richblack-100"
                            key={i}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subLink.name}
                          </NavLink>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <NavLink
                      to={element.path}
                      className="text-richblack-100 font-bold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {element.title}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* login and signup and dashboard */}

        <div className="flex items-center gap-2 md:gap-4 p-4 md:p-10">
          {user && user.accountType != "Instructor" && (
            <NavLink to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart fontSize={30} className="text-white" />
              {totalItems > 0 && (
                <span className="absolute bottom-0 text-sm -left-2 text-richblack-50">
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}

          {token === null && (
            <NavLink to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 py-2 px-3 text-xs md:text-sm text-richblack-100 rounded-md font-bold cursor-pointer">
                Log in
              </button>
            </NavLink>
          )}

          {token === null && (
            <NavLink to={"/signUp"}>
              <button className="border border-richblack-700 bg-richblack-800 py-2 px-3 text-xs md:text-sm text-richblack-100 rounded-md font-bold cursor-pointer">
                Sign Up
              </button>
            </NavLink>
          )}

          {token !== null && <ProfileDropDown />}

          <div className="md:hidden ml-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {/* Simple hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
