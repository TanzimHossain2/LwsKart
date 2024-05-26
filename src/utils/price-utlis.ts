type product = {
    id: string;
      productId: string;
      name: string;
      price: number;
      quantity: number;
      image?: string;
      weight: string;
      stock: number;
}



// Calculate tax
export const calculateTax = (price: number | string): number => {
    let priceFloat = parseFloat(price as string); // Convert to float
    let tax: number = 0;
    
    if (priceFloat < 1000) {
        tax = priceFloat * 0.0005; // 0.05%
    } else if (priceFloat >= 1000 && priceFloat < 10000) {
        tax = priceFloat * 0.001; // 0.1%
    } else if (priceFloat >= 10000 && priceFloat < 50000) {
        tax = priceFloat * 0.002; // 0.2%
    } else {
        tax = priceFloat * 0.003; // 0.3%
    }
    
    return parseFloat(tax.toFixed(2));
}

// Calculate shipping
export const calculateShipping = (weight: number | string): number => {
    let weightFloat = parseFloat(weight as string); // Convert to float
    let shipping: number = 0;
    
    if (weightFloat === 0) return parseFloat(shipping.toFixed(2)); // Return 0 if weight is 0 (no shipping cost)

    if (weightFloat < 2) {
        shipping = 5;
    } else if (weightFloat >= 2 && weightFloat < 10) {
        shipping = 10;
    } else if (weightFloat >= 10 && weightFloat < 30) {
        shipping = 20;
    } else {
        shipping = 30;
    }
    
    return parseFloat(shipping.toFixed(2));
}


export const calculatePrice = (productItems: product[])=>{

    const price = productItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    
      const weight = productItems.reduce(
        (acc, item) => acc + parseInt(item.weight) * item.quantity,
        0
      );

      const taxPrice = calculateTax(price);
      const shippingPrice = calculateShipping(weight);
      const totalPrice = (price + taxPrice + shippingPrice).toFixed(2);
      
      return {price, weight, taxPrice, shippingPrice, totalPrice}
}
