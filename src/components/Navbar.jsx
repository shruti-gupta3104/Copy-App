
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className = "w-full h-[45px] flex justify-center items-center p-4 bg-gray-800 gap-x-9">
     <NavLink to = "/" >Home</NavLink>
     <NavLink to = "/copies" >All Copies</NavLink>
    </div>
  )
}

export default Navbar
