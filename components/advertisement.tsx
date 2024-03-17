import Image, { StaticImageData } from "next/image"
import Link from "next/link";
import { Container } from "@/components/container";

interface AdvertisementProps {
    imageSrc: StaticImageData;
    linkHref: string;
}

export const Advertisement = ({imageSrc,linkHref}:AdvertisementProps) => {
  return (
    // <Container>
        <Link className="shadow-md" href={`/product/${linkHref}`}>
            <Image className="w-full h-[400px] object-fill rounded-md" src={imageSrc} alt="advertisement" />
            {/* <p>See more details...</p> */}
        </Link>
    // </Container>
  )
}
