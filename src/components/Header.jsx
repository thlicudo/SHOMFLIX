import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoSearch, IoClose, IoMenu } from "react-icons/io5";
import Logo from "../assets/logo.png";

export const NavLinks = ({ handleLinkClick }) => {
  return (
    <nav>
      <ul className="flex flex-col gap-4 lg:flex-row">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-bold duration-200 hover:opacity-80"
              : "duration-200 hover:opacity-80"
          }
          to="/"
          onClick={handleLinkClick}
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-bold duration-200 hover:opacity-80"
              : "duration-200 hover:opacity-80"
          }
          to="/movies"
          onClick={handleLinkClick}
        >
          <li>Movies</li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-bold duration-200 hover:opacity-80"
              : "duration-200 hover:opacity-80"
          }
          to="/tv"
          onClick={handleLinkClick}
        >
          <li>TV Shows</li>
        </NavLink>
      </ul>
    </nav>
  );
};

const Header = ({ setQuery, query }) => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isBarClicked, setIsBarClicked] = useState(false);
  const inputRef = useRef();
  const searchRef = useRef();

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsBarClicked(!isBarClicked);
    if (isSearchClicked) {
      setIsSearchClicked((prev) => !prev);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsBarClicked(false);
    }
  };

  const toggleSearch = (e) => {
    if (searchRef.current.contains(e.target)) {
      setIsSearchClicked((prev) => !prev);
      inputRef.current.focus();
      setIsBarClicked(false);
      setQuery("");
    } else {
      setIsSearchClicked(false);

      setQuery("");
    }

    if (inputRef.current.contains(e.target)) {
      setIsSearchClicked(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", toggleSearch);

    return () => {
      document.removeEventListener("click", toggleSearch);
    };
  });

  return (
    <header className="absolute z-[99] w-full">
      <div
        className={`relative flex w-full items-center gap-8 p-4 duration-200 md:px-12 lg:px-20 lg:py-8 ${isBarClicked ? "bg-black" : "bg-transparent"}`}
      >
        {/* LOGO */}
        <div className="absolute z-50 lg:static">
          <Link to="/">
            <div
              className={`flex w-[6.5rem] items-center duration-200 md:w-[8rem] ${isSearchClicked ? "opacity-mobile-none" : "opacity-mobile-full"}`}
            >
              <img className="h-full w-full" src={Logo} alt="" />
            </div>
          </Link>
        </div>
        <div className="flex w-full items-center gap-2 lg:gap-0">
          {/* NAV MENU */}
          <div className="hidden w-full text-center lg:block lg:bg-transparent">
            <NavLinks />
          </div>
          <div className="flex w-full items-center justify-end">
            {/* SEARCH */}
            <div
              className="w-mobile-full relative flex items-center justify-end"
              ref={searchRef}
            >
              <input
                value={query}
                onChange={handleQuery}
                ref={inputRef}
                placeholder="Search Title"
                type="text"
                className={`rounded-sm border-2 border-solid bg-transparent py-1 pl-3 pr-8 text-sm outline-none duration-200 ${!isSearchClicked ? "pointer-events-none w-0 opacity-0" : "pointer-events-auto w-full opacity-100"}`}
              />
              {/* SEARCH ICON */}
              <div
                className="absolute right-2 cursor-pointer duration-200 hover:opacity-80"
                onClick={() => toggleSearch}
              >
                {isSearchClicked ? (
                  <IoClose className="h-5 w-5" />
                ) : (
                  <IoSearch className="h-5 w-5" />
                )}
              </div>
            </div>
          </div>
          {/* MOBILE MENU */}
          <div
            className="cursor-pointer duration-200 hover:opacity-80 lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isBarClicked ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <IoMenu className="h-6 w-6" />
            )}
          </div>
          <div
            className={`absolute left-0 top-full w-full bg-black pb-8 pt-4 text-center duration-200 lg:hidden ${isBarClicked ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <NavLinks handleLinkClick={handleLinkClick} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
