import React from 'react'
import {NavLink, Link} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import {IoIosArrowForward} from 'react-icons/io';
import logo from '../assets/logo.png'


const isNotActiveStyle = "flex items-center px-5 gap-3 text-grey-500 hover: text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black";
const categories = [
      {name:"Animals"},
      {name:"Wallpapers"},
      {name:"Photography"},
      {name:"Gaming"},
      {name:"Coding"},
      {name:"Other"},
]





const Sidebar = ({user,closeToggle}) => {
  const handleCloseSidebar = () =>{
      if(closeToggle) closeToggle(false);

  }

  return (
    <div className = 'flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar'>
        <div className = 'flex flex-col'>


      <Link to = '/' className = 'flex px-5 gap-2 my-6 pt-1 w-190 items-center'
      onClick = {handleCloseSidebar}>
        <img src = {logo} alt ="logo" className = "w-full"/>
      </Link>
      {/*add logo*/}


      <div className = 'flex flex-col gap-5 '>
        <NavLink to = "/" className = {({isActive}) =>isActive ? isActiveStyle: isNotActiveStyle }
        onClick = {handleCloseSidebar} >

        <RiHomeFill/>
        Home
        </NavLink>
        
        <h3 className = 'mt-2 px-5 text-base 2xl:text-xl'> Discover categories</h3>
        {categories.slice(0,categories.length -1).map((category) => (

            <NavLink to = {`/category/${category.name}`} className = {({isActive}) =>isActive ? isActiveStyle: isNotActiveStyle }
            onClick = {handleCloseSidebar} key = {category.name}> 

              {category.name}
            </NavLink>
            
        ))}
          </div>
        </div>



      {/*check if user exists*/}
      {/*flex to control the position, my-5: top and bottom, mx: left and right mb: bottom
      gap: distance between each elements, p: distance between element and the margin
      bg-white: white backgrounded, rounded-lg: round logo, shadow-lg: create shadow for entire box*/}
 
      {user &&(
        <Link to = {`user-profile/${user._id}`} className ='flex my-5 mb-3 gap-2 p-2 items-center bg-white
        rounded-lg shadow-lg mx-3' onClick = {handleCloseSidebar}>
        
        <img src ={user.image} className ='w-10 h-10 rounded-full' alt = 'user-profile'/>
        <p>{user.userName}</p>

        </Link>
      )}


    </div>
  )
}

export default Sidebar