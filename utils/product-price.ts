export default function productPrice(price:number, offer:number): number {
    if(!offer) return price;
    return Math.round(price*(1-offer/100));
}