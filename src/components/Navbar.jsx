import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [isFrench, setIsFrench] = useState(true);
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Luan Sautron &nbsp;
            <span className="sm:block hidden"> | Dev'Junior</span>
          </p>
        </Link>

        <div className="m-12 flex-1"></div>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{t(`nav.${nav.id}`)}</a>
            </li>
          ))}
          <li
            className="text-white hover:text-secondary text-[18px] font-medium cursor-pointer"
            onClick={() => {
              if (isFrench) i18n.changeLanguage("en");
              else i18n.changeLanguage("fr");
              setIsFrench(!isFrench);
            }}
          >
            <div className={`${isFrench ? "hidden" : ""}`}>
              <Flag code="gb" height="40" />
              <span className="sm:block hidden">EN</span>
            </div>
            <div className={`${isFrench ? "" : "hidden"}`}>
              <Flag code="fr" height="40" />
              <span className="sm:block hidden">FR</span>
            </div>
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.id);
                  }}
                >
                  <a href={`#${nav.id}`}>{t(`nav.${nav.id}`)}</a>
                </li>
              ))}
              <li
                className="font-poppins text-white hover:text-secondary text-[20px] font-medium cursor-pointer"
                onClick={() => {
                  if (isFrench) i18n.changeLanguage("en");
                  else i18n.changeLanguage("fr");
                  setIsFrench(!isFrench);
                }}
              >
                <div className={`${isFrench ? "hidden" : ""}`}>
                  <Flag code="gb" height="40" />
                  <span>EN</span>
                </div>
                <div className={`${isFrench ? "" : "hidden"}`}>
                  <Flag code="fr" height="40" />
                  <span>FR</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
