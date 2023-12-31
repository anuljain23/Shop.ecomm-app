//interface to allow data of particular type only
export interface SellerSignUp{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface UserSignUp{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface UserSignIn{
    email:string,
    password:string
}

export interface SellerSignIn{
    email:string,
    password:string
}

export interface Product{
    productName:string,
    productCategory:string,
    productColor:string,
    productDescription:string,
    productPrice:number,
    productImage:string,
    id:number,
    sellerId:number,
    quantity:undefined | number,
    productId:undefined | number
}

export interface Cart{
    productName:string,
    productCategory:string,
    productColor:string,
    productDescription:string,
    productPrice:number,
    productImage:string,
    id:number | undefined,
    productId:number,
    userId:number,
    sellerId:number,
    quantity:undefined | number
}

export interface category{
    id:string,
    name:string,
    categoryImage:string
}

export interface priceSummary{
    price:number,
    tax:number,
    discount:number,
    delivery:number
    total:number
}

export interface orders{
    firstName:string,
    lastName:string,
    email:string,
    contact:string,
    address:string,
    userId:number,
    modeOfPayment:string,
    productName:string,
    productCategory:string,
    productColor:string,
    productDescription:string,
    productPrice:number,
    productImage:string,
    id:number | undefined,
    productId:number,
    sellerId:number,
    quantity:undefined | number
}