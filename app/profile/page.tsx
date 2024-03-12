'use client'

import { Container } from "@/components/container"
import { InputBox } from "@/components/input-box"
import Link from "next/link"

export default function page() {
  return (
    <Container>
        <div className="flex gap-4 h-full p-4">
            <div className="flex flex-col justify-between h-full w-[50%] bg-gray-200 rounded-md shadow-md">
                {/* <div>
                    Image
                </div> */}
                <div className="flex flex-col  items-between h-full">
                    <ul className="flex flex-col gap-2 p-4 h-full">
                        <li className="cursor-pointer text-xl text-center font-semibold p-2 bg-gray-300 rounded-sm hover:text-white hover:bg-gray-600 hover:shadow-md">Profile</li>
                        <li className="cursor-pointer text-xl text-center font-semibold p-2 bg-gray-300 rounded-sm hover:text-white hover:bg-gray-600 hover:shadow-md">Orders</li>
                        <li className="cursor-pointer text-xl text-center font-semibold p-2 bg-gray-300 rounded-sm hover:text-white hover:bg-gray-600 hover:shadow-md">Favoruite Products</li>
                        <li className="cursor-pointer text-xl text-center font-semibold p-2 bg-gray-300 rounded-sm hover:text-white hover:bg-gray-600 hover:shadow-md">Update Passoword</li>
                        <li className="cursor-pointer text-xl text-center font-semibold p-2 bg-gray-300 rounded-sm hover:text-white hover:bg-gray-600 hover:shadow-md">Logout</li>
                    </ul>
                    <div className="w-full flex justify-evenly p-4 bg-gray-100 rounded-md">
                        <Link href="#" className="text-blue-500 hover:underline">Help</Link>
                        <Link href="#" className="text-blue-500 hover:underline">Connect</Link>
                        <Link href="#" className="text-blue-500 hover:underline">FAQ</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <InputBox label="Name" id="name" type="text" name="name" placeholder="Sample name"/>
                <InputBox label="Name" id="name" type="text" name="name" placeholder="Sample name"/>
                <InputBox label="Name" id="name" type="text" name="name" placeholder="Sample name"/>
            </div>
        </div>
    </Container>
  )
}

