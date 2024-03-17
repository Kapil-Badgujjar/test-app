import { Advertisement } from "@/components/advertisement";
import { MainCarousel } from "@/components/carousel/main-carousel";
import { Container } from "@/components/container";
import { HomeFooter } from "@/components/footer/home-footer";
import ProductsGroup from "@/components/products-group/products-group";
import smartWath from '@/public/smart-watch.webp'

export default async function Home() {
  return (
    <div>
      <MainCarousel />
      <Container>
        <ProductsGroup groupName="New Arrivals" />
        <Advertisement imageSrc={smartWath} linkHref="64da676a07e3a4595a860ec3"/>
        <ProductsGroup groupName="Popular Products" />
        <ProductsGroup groupName="Best selling" />
      </Container>
      <HomeFooter />
    </div>
  )
}
