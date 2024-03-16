'use client'
import { InputBox } from '@/components/input-box'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormEvent, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { v4 as crypto } from "uuid";
import { useSession } from '@/context/SessionContext'

  
export const AddNewProduct = ({closeAction}:{closeAction: () => void}) => {
    const { user } = useSession();
    const [flag, setFlag] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault();
        if (formRef.current !== null && user) {
            const formData = new FormData(formRef.current);
            formData.append('cryptoCode',crypto().toString());
            formData.append('sellerId',user.id);
                    // Use formData correctly, for example, logging the values
            // For demonstration, let's log all entries from the formData
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }
            const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/add-new-product`,{ method: 'POST', body: formData});
            if(result.ok){
              const body = await result.json();
              console.log(body);
              closeAction();
            }
        }

    }
  return (
    <div>
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <InputBox type="text" label='Product Name:'  id="productName" name="productName" placeholder='Product Name' required />
            <div className='flex gap-4'>
                <InputBox type="number" label='Product Price:'  id="price" name="price" placeholder='Product Price' required />
                <InputBox type="number" label='Available Stocks:'  id="stocks" name="stocks" placeholder='Available Stocks' required />
                <InputBox type="number" label='Offer:'  id="offer" name="offer" placeholder='Offers' required />
            </div>
            <div className='flex gap-4'>
                <div className='flex-1 flex flex-col gap-2'>
                    <label className='text-black'>Select Category:</label>
                    <Select name="category" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Mobiles">Mobiles</SelectItem>
                            <SelectItem value="Smart Gadgets">Smart Gadgets</SelectItem>
                            <SelectItem value="Laptops">Laptop</SelectItem>
                            <SelectItem value="Clothes">Clothes</SelectItem>
                            <SelectItem value="Deodorants">Deodorants</SelectItem>
                            <SelectItem value="Footwear">Footwear</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                            <SelectItem value="Skin Care">Skin Care</SelectItem>
                            <SelectItem value="Home Appliances">Home Appliances</SelectItem>
                            <SelectItem value="Furniture">Furniture</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    <label className='text-black'>Select Product Image:</label>
                    <Input type='file' name='productImage' id="productImage" required/>
                </div>
            </div>
            <Textarea id="description" name="description" placeholder='Description' required/>
            <div className="hover:underline cursor-pointer" onClick={()=>{setFlag(p=>!p)}}>Other specs</div>
            {flag&&<div className='flex flex-col gap-2'>
                <div className='flex gap-4'>
                    <InputBox type="text" label='Product Color:'  id="color" name="color" placeholder='Product Color' />
                    <InputBox type="number" label='Size:'  id="size" name="size" placeholder='Size' />
                    <InputBox type="text" label='RAM:'  id="ram" name="ram" placeholder='RAM' />
                </div>
                <div className='flex gap-4'>
                    <InputBox type="text" label='Storage:'  id="storage" name="storage" placeholder='Storage' />
                    <InputBox type="text" label='Camera:'  id="camera" name="camera" placeholder='Camera' />
                    <InputBox type="text" label='Charger:'  id="charger" name="charger" placeholder='Charger' />
                </div>
                <div className='flex gap-4'>
                    <InputBox type="text" label='Network:'  id="network" name="network" placeholder='Network' />
                    <InputBox type="text" label='Display:'  id="display" name="display" placeholder='Display' />
                    <InputBox type="text" label='Battery:'  id="battery" name="battery" placeholder='Battery' />
                </div>
            </div>}
            <Button type='submit'>Add Product</Button>
        </form>
    </div>
  )
}
