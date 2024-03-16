import { Container } from "@/components/container";
import { InputBox } from "@/components/input-box";

export default function page() {
  return (
    <Container>
        <div>
            <InputBox type="text" label="Seller Name" id="seller" name="seller" placeholder="seller name"/>
        </div>
    </Container>
  )
}
