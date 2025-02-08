import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className="flex flex-row gap-10 place-items-center m-0">
                <NavLink to="/">
                    <img src="/src/assets/note-script-logo.png" alt="logo" className="w-[150px]" />
                </NavLink>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `mb-3 px-3 py-2 rounded-lg ${isActive ? "bg-black text-white" : "text-[#d3d3d3]"}`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/notes"
                    className={({ isActive }) =>
                        `mb-3 px-3 py-2 rounded-lg ${isActive ? "bg-black text-white" : "text-[#d3d3d3]"}`
                    }
                >
                    Notes
                </NavLink>
            </div>
        </>
    )
}

export default Navbar