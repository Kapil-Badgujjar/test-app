'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const MainCarousel = () => {
  const banners = [{image: banner1}, {image: banner2}, {image: banner3}]
  return (
    <Carousel
    plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}

     className="w-full p-2 rounded-md shadow-md">
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div>
                <Image src={banner.image} alt="banner" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  )
}
