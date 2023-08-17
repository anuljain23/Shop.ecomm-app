//interface to allow data of particular type only
export interface SellerSignUp{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface SellerSignIn{
    email:string,
    password:string
}