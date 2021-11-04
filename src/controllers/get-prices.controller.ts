// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {inject} from '@loopback/context';
import {get, param} from '@loopback/rest';
import {ServiceC} from '../services';


export class GetPricesController {
  constructor(
    @inject('services.ServiceC')
    protected servicec: ServiceC
  ) { }

  @get('/getprice/{postalcode}')
  async getprice(
    @param.path.string("postalcode") postalcode: string,
  ): Promise<Number> {
    const weight = 1
    const envio = await this.servicec.calcularenvio(postalcode, weight)
    console.log(envio);

    // let finalPrice = Number(getPrice)
    // let zona = Number(getZone)
    // let cupon = Number(getCupon)
    // if (zona === 1) {
    //   let iva = finalPrice * 0.16
    //   let comision = finalPrice * 0.08
    //   finalPrice = finalPrice - cupon
    //   finalPrice = finalPrice - iva - comision
    // } else if (zona === 2) {
    //   let iva = finalPrice * 0.17
    //   let comision = finalPrice * 0.15
    //   finalPrice = finalPrice - iva - comision
    // } else if (zona === 3) {
    //   let iva = finalPrice * 0.15
    //   let comision = finalPrice * 0.20
    //   finalPrice = finalPrice - cupon
    //   finalPrice = finalPrice - iva - comision
    // } else if (zona === 4) {
    //   let iva = finalPrice * 0.12
    //   let comision = finalPrice * 0.06
    //   finalPrice = finalPrice - cupon
    //   finalPrice = finalPrice - iva - comision
    // } else {
    //   let iva = finalPrice * 0.10
    //   let comision = finalPrice * 0.05
    //   finalPrice = finalPrice - cupon
    //   finalPrice = finalPrice - iva - comision
    // }

    return 1
  }



}
