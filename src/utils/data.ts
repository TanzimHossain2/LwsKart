const modifyArrayData = (data: any[]): any[] => {
    const result = data.reduce((acc: any[], item: any) => {
      const { _id, category, ...rest } = item;
      acc.push({
        id: item._id.toString(),
        categorys: item.category.toString(),
        ...rest
      });
      return acc;
    }, []);
  
    return result; 
  }
  
  
  
  const modifyObjData = (Obj:any ) => {
    const { _id, ...rest } = Obj;
    return {
      id: Obj._id.toString(),
      ...rest
    };
  }


  const modifyCartData = (items: any[]): any[] => {
    const resData = items.map((item) =>{
      return {
        id: item._id.toString(),
        productId: item.productId.toString(),
        name:item.name,
        price:item.price, 
        quantity: item.quantity,
        image:item.image,
        weight:item.weight,
        stock:item.stock
      }
    })

    return resData;

  }
  
  
  
  export { modifyArrayData, modifyObjData, modifyCartData };