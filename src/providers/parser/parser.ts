import { Injectable } from '@angular/core';
//Interface
import { Receipt } from '../../interface/receipt';
import { Product } from '../../interface/product';
/*
  Generated class for the ParserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var moment;
@Injectable()
export class ParserProvider {


  constructor() {
    console.log('ParserProvider');
  }

  public receipt(raw: string): Receipt {
    return {
      invoiceNumber: this.invoiceNumber(raw),
      invoiceDate: this.invoiceDate(raw),
      randomNumber: this.randomNumber(raw),
      salesAmount: this.salesAmount(raw),
      totalAmount: this.totalAmount(raw),
      buyerIdentifier: this.buyerIdentifier(raw),
      sellerIdentifier: this.sellerIdentifier(raw),
      productQuantity: this.productQuantity(raw),
      listedQuantity: this.listedQuantity(raw),
      products: this.products(raw)
    }
  }

  public needScanRight(raw): boolean {
    return this.listedQuantity(raw) > this.scanedQuantity(raw);
  }

  public amountNotScaned(raw): number {
    return this.listedQuantity(raw) - this.scanedQuantity(raw);
  }

  public validate(raw: string): boolean {
    if (!this.hasColon(raw)) return false;
    return true;
  }

  public validateRight(raw: string, quantity): boolean {
    return this.has2Stars && this.scanedQuantityRight(raw) == quantity
  }

  public scanedQuantity(raw: string): number {
    let array = raw.split(':');
    return (array.length - (raw.slice(-1) == ':' ? 6 : 5)) / 3
  }

  public invoiceNumber(raw: string): string {
    return `${raw.substring(0, 2)} - ${raw.substring(2, 10)}`;
  }

  private invoiceDate(raw: string): string {
    let year = (1911 + parseInt(raw.substring(10, 13))).toString();
    return moment(year + raw.substring(13, 17), 'YYYYMMDD').format('ll');
  }

  private randomNumber(raw: string): string {
    return raw.substring(17, 21);
  }

  private salesAmount(raw: string): number {
    return parseInt(raw.substring(21, 29), 16);
  }

  private totalAmount(raw: string): number {
    return parseInt(raw.substring(29, 37), 16);
  }

  private buyerIdentifier(raw: string): string {
    return raw.substring(37, 45);
  }

  private sellerIdentifier(raw: string): string {
    return raw.substring(45, 53)
  }

  private hasColon(raw: string): boolean {
    return raw.substring(78, 79) === ':'
  }

  private productQuantity(raw: string): number {
    return parseInt(raw.substring(90, 91));
  }

  private listedQuantity(raw: string): number {
    return parseInt(raw.substring(92, 93));
  }

  private encodeType(raw: string): number {
    return parseInt(raw.substring(94, 95))
  }

  private products(raw: string): Product[] {
    let array = raw.split(':');
    let products = <Product[]>[];
    for (let i = 5; i < array.length; i += 3) {
      products.push({
        name: this.encodeType(raw) == 2 ? atob(array[i]) : array[i],
        quantity: parseInt(array[i + 1]),
        amount: parseInt(array[i + 2])
      })
    }
    return products
  }

  private has2Stars(raw: String): boolean {
    return raw.substring(0, 2) === '**';
  }

  private scanedQuantityRight(raw: string): number {
    let array = raw.split(':');
    return (array.length) / 3
  }

}
