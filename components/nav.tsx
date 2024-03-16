'use client'
import React, { useEffect } from 'react';
import Link from "next/link";
import { Container } from "@/components/container";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { FaRegUserCircle } from "react-icons/fa";
import { useSession } from '@/context/SessionContext';
import { getUserSession } from '@/utils/auth-function';
import { deleteCookie } from '@/actions/logout'
import { useRouter } from 'next/navigation';

export const Nav = () => {
  const router = useRouter();
  const { user, login, logout } = useSession();
  async function fetchSession(){
    const lastSession = await getUserSession();
    console.log(lastSession);
    if(lastSession){
      login(lastSession);
    }
  }

  async function logoutFunction(){
    deleteCookie();
    logout();
  }

  useEffect(()=>{fetchSession()},[]);
  // useEffect(()=>{console.log("Navbar >> User:" , user);},[user]);
  return (
    <header className="sticky bg-gray-600 py-4">
      <Container>
        <nav className="flex justify-between items-center mx-auto">
          <Link href="/" className="text-white text-2xl font-bold">
            NextCommerce
          </Link>

          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
              {user?.role === 'USER' ? (
                <div className="flex items-center">
                  <Popover>
                    <PopoverTrigger className="flex items-center">
                      <FaRegUserCircle color="white" size="1.5em" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit mr-2">
                      <div className="w-full flex flex-col justify-start items-start gap-2 p-2 rounded-md">
                        <button className='cursor-pointer' onClick={()=>{router.push('/profile')}}>My Account</button>
                        <button className='cursor-pointer'>My Orders</button>
                        <button className='cursor-pointer' onClick={()=>{router.push('/cart')}}>Cart</button>
                        <button className='cursor-pointer' onClick={logoutFunction}>
                          Logout
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : ( user?.role === 'SELLER' ? (
                <div className="flex items-center">
                  <Popover>
                    <PopoverTrigger className="flex items-center">
                      <FaRegUserCircle color="white" size="1.5em" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit mr-2">
                      <div className="w-full flex flex-col justify-start items-start gap-2 p-2 rounded-md">
                        <button className='cursor-pointer' onClick={()=>{router.push('/seller/profile')}}>Profile</button>
                        <button className='cursor-pointer' onClick={()=>{router.push('/seller/dashboard')}}>Dashboard</button>
                        <button className='cursor-pointer' onClick={logoutFunction}>
                          Logout
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ):(
                <li>
                  <Link href="/auth/login" className="text-white hover:underline">
                    Login
                  </Link>
                </li>)
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
