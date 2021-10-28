// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {inject} from '@loopback/context';
import {get, param} from '@loopback/rest';
import {Serviceb, Servicec} from '../services';


export class GetPricesController {
  constructor(
    @inject('service.Serviceb')
    protected serviceb: Serviceb,
    protected servicec: Servicec
  ) { }

  @get('/getprice')
  async getprice(
    @param.path.number("postalcode") postalcode: number,
  ): Promise<Number> {
    const getZone = await this.servicec.getZone(postalcode)
    const getPrice = await this.servicec.getPrice(postalcode)
    const getCupon = await this.serviceb.getCupon(postalcode)
    let finalPrice = Number(getPrice)
    let zona = Number(getZone)
    let cupon = Number(getCupon)
    if (zona === 1) {
      let iva = finalPrice * 0.16
      let comision = finalPrice * 0.08
      finalPrice = finalPrice - cupon
      finalPrice = finalPrice - iva - comision
    } else if (zona === 2) {
      let iva = finalPrice * 0.17
      let comision = finalPrice * 0.15
      finalPrice = finalPrice - iva - comision
    } else if (zona === 3) {
      let iva = finalPrice * 0.15
      let comision = finalPrice * 0.20
      finalPrice = finalPrice - cupon
      finalPrice = finalPrice - iva - comision
    } else if (zona === 4) {
      let iva = finalPrice * 0.12
      let comision = finalPrice * 0.06
      finalPrice = finalPrice - cupon
      finalPrice = finalPrice - iva - comision
    } else {
      let iva = finalPrice * 0.10
      let comision = finalPrice * 0.05
      finalPrice = finalPrice - cupon
      finalPrice = finalPrice - iva - comision
    }

    return finalPrice
  }
}
