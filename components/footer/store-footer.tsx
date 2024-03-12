import Link from "next/link"

export const StoreFooter = () => {
    return (
        <div className="w-full flex flex-col gap-2 text-white bg-[#353535] px-8 py-2">
            <div className="w-full text-center">
                Footer Section
            </div>
            <hr/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:justify-items-center">
                <div>
                    <h2>Navigate to:</h2>
                    <ul>
                        <li><Link href="/" className="">Home</Link></li>
                        <li><Link href="/" className="">Store</Link></li>
                        <li><Link href="/" className="">Categories</Link></li>
                        {/* <li><Link href="/" className=""></Link>Help</li> */}
                        <li><Link href="/" className="">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Shop by:</h2>
                    <ul>
                        <li><Link href="/" className="">Men</Link></li>
                        <li><Link href="/" className="">Women</Link></li>
                        <li><Link href="/" className="">Child</Link></li>
                        <li><Link href="/" className="">Footwear</Link></li>
                        <li><Link href="/" className="">Accessories</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Quick Access Links:</h2>
                    <ul>
                        <li><Link href="/" className="">About</Link></li>
                        <li><Link href="/" className="">Help</Link></li>
                        <li><Link href="/" className="">Contact Us</Link></li>
                        <li><Link href="/" className="">Privacy Policy</Link></li>
                        <li><Link href="/" className="">Terms & Conditions</Link></li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="w-full text-center">
                <p>Copywrite: Kapil Badgujjaru -  2024</p>
            </div>
        </div>
    )
}