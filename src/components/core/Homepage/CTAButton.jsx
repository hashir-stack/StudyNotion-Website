import { NavLink } from "react-router-dom"

const CTAButton = ({children,linkto,active}) => {
  return (
   <NavLink to={linkto}>
        <div className={`text-center text-[15px] px-6 py-3 rounded-md font-semibold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>

   </NavLink>
  )
}

export default CTAButton