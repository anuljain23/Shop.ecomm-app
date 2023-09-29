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