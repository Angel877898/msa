// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {ServiceC} from '../services';
const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "https://36f1174de76f470098d08c4243960b6e@o1059762.ingest.sentry.io/6048637",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});
export class SetpriceController {
  constructor(
    @inject('services.ServiceC')
    protected serviceC: ServiceC,
  ) { }
  @get('/getprice/{postalcode}/{weight}')
  async getprice(
    @param.path.string("postalcode") postalcode: string,
    @param.path.number("weight") weight: number,
  ): Promise<Object> {

    try {
      const {idZone, costodeEnvio, tiempoEnvio, couponIsValid, descuentosAplicados, precioFinalEnvio}: any = await this.serviceC.calcularenvio(postalcode, weight)
      // ...
      let finalPrice = costodeEnvio
      if (idZone === 1) {
        let iva = finalPrice * 0.16
        let comision = finalPrice * 0.08
        finalPrice = finalPrice + iva + comision
      } else if (idZone === 2) {
        let iva = finalPrice * 0.17
        let comision = finalPrice * 0.15
        finalPrice = finalPrice + iva + comision
      } else if (idZone === 3) {
        let iva = finalPrice * 0.15
        let comision = finalPrice * 0.20
        finalPrice = finalPrice + iva + comision
      } else if (idZone === 4) {
        let iva = finalPrice * 0.12
        let comision = finalPrice * 0.06
        finalPrice = finalPrice + iva + comision
      } else {
        let iva = finalPrice * 0.10
        let comision = finalPrice * 0.05
        finalPrice = finalPrice + iva + comision
      }
      let r = {
        idZone: idZone,
        tiempoEnvio: tiempoEnvio,
        costodeEnvio: costodeEnvio,
        couponIsValid: couponIsValid,
        descuentosAplicados: descuentosAplicados,
        precioFinalEnvio: finalPrice
      }
      return r
    } catch (e) {
      Sentry.captureException(e);
      return {e: e}
    }

  }
}
