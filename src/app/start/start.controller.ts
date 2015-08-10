/// <reference path="../index.module.ts" />

module shop {
  'use strict';

  export class StartController {
    private datas: IProduct[]
    private dataProvider: DataProvider

    /* @ngInject */
    constructor (DataProvider: DataProvider) {
      this.dataProvider = DataProvider;

    }

    dataloaded(products: IProduct[] ) {
      this.datas = products
      console.log(this.datas);
    }

    demo() {
      this.dataProvider.devices((products) => this.dataloaded(products));
    }
  }
}
