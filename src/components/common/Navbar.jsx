import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import Button from '../core/homepage/Button'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from '../../services/api'
import { apiConnector } from '../../services/apiconnector'
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineMenu } from "react-icons/ai"


// const subLinks=[
//   {
//     title:"python",
//     link:"/catalog/python"
//   },
//   {
//     title:"web dev",
//     link:"/catalog/webdev"
//   }
// ]

function Navbar() {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation();
  const [loading, setLoading] = useState(false)

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        console.log(res.data.data)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-[#2C333F]'>
      <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
        <div><Link to='/'>
          <img src={logo} width={160} height={42} /></Link></div>

        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index} >
                {

                  link.title !== "Catalog" ? (<Link to={link?.path} className='text-pure-greys-50'><p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p></Link>) : (
                    <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                      }`}>
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.Course?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.TagsName
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.TagsName}</p>
                                </Link>
                              ))}
                          </>
                        ) : (<div className="text-center text-richblack-900">No links available</div>)
                        }
                      </div>

                    </div>
                  )
                }
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex gap-x-4 items-center'>
          {
            user && user?.AccountType != "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <CiShoppingCart className="text-2xl text-richblack-100" />
                {
                  totalItems > 0 &&
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                }
              </Link>
            )
          }
          {
            token === null && (
              <Button active={false} linkto={"/login"}>Log In</Button>
            )
          }
          {
            token === null && (
              <Button active={false} linkto={"/signup"}>Sign up</Button>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }

        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

      </div>

    </div>
  )
}

export default Navbar
