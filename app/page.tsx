import { MainCarousel } from "@/components/carousel/main-carousel";
import { Container } from "@/components/container";
import { HomeFooter } from "@/components/footer/home-footer";
import ProductsGroup from "@/components/products-group/products-group";

export default async function Home() {
  return (
    <div>
      <MainCarousel />
      <Container>
        <ProductsGroup />
      </Container>
      <HomeFooter />
    </div>
  )
}
