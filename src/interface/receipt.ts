import { Product } from './product';

export interface Receipt {
    invoiceNumber: string
    invoiceDate: string
    // invoiceTime: string
    randomNumber: string
    salesAmount: number
    totalAmount: number
    buyerIdentifier: string
    sellerIdentifier: string
    productQuantity: number
    listedQuantity: number
    products: Product[]
}