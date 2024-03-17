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
import { useCart } from '@/context/CartContext';

export const Nav = () => {
  const router = useRouter();
  const { totalItems } = useCart()
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
  return (
    <header className="sticky bg-gray-600 py-4">
      <Container>
        <nav className="flex justify-between items-center mx-auto">
          <Link href="/" className="flex-1 text-white text-2xl font-bold">
            SuperMART
          </Link>

          <div className='flex-1 text-xl text-white flex justify-center gap-4 md:gap-8' >
            <Link href="/store">Store</Link>
            <Link href="/store">About</Link>
            <Link href="/store">Help</Link>
          </div>

          <ul className="flex-1 flex space-x-4 justify-end">
              {user?.role === 'USER' ? (
                  <div className="flex items-center">
                    <Popover>
                      <PopoverTrigger className="relative flex items-center">
                        <FaRegUserCircle color="white" size="1.5em" />
                        {totalItems > 0 && <div className='absolute top-0 right-0 w-[10px] h-[10px] bg-red-500 rounded-[50%]' />}
                      </PopoverTrigger>
                      <PopoverContent className="w-fit mr-2">
                        <div className="w-full flex flex-col justify-start items-start gap-2 p-2 rounded-md">
                          <button className='cursor-pointer' onClick={()=>{router.push('/profile')}}>My Account</button>
                          <button className='cursor-pointer' onClick={()=>{router.push('/order')}}>My Orders</button>
                          <button className='cursor-pointer w-full flex justify-between items-center' onClick={()=>{router.push('/cart')}}>Cart {totalItems>0 && <span className='text-[12px] font-semibold text-white bg-red-500 flex justify-center items-center w-[24px] h-[24px] rounded-[50%]'>{totalItems}</span>}</button>
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
