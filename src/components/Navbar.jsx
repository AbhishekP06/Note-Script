import { NavLink } from "react-router-dom";
import logoLight from "/note-script-logo-white.png";
import logoDark from "/note-script-logo-black.png";

function Navbar() {
    return (
        <>
            <div className="flex flex-row gap-10 place-items-center m-0 px-4 py-2 w-full">
                {/* Logo */}
                <NavLink to="/">
                    <img 
                        src={logoDark} 
                        alt="logo" 
                        className="w-[150px] dark:hidden" 
                    />
                    <img 
                        src={logoLight} 
                        alt="logo" 
                        className="w-[150px] hidden dark:block" 
                    />
                </NavLink>

                {/* Navigation Links */}
                <div className="flex flex-row gap-5 sm:gap-10">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `mb-3 px-3 py-2 rounded-lg text-[#000000] dark:text-[#a0a0a0] ${isActive ? "bg-black text-white" : ""}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/notes"
                        className={({ isActive }) =>
                            `mb-3 px-3 py-2 rounded-lg text-[#000000] dark:text-[#a0a0a0] ${isActive ? "bg-black text-white" : ""}`
                        }
                    >
                        Notes
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Navbar;
