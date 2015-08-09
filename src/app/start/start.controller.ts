/// <reference path="../index.module.ts" />

module shop {
  'use strict';

  export class StartController {
    private dataProvider: DataProvider

    /* @ngInject */
    constructor (DataProvider: DataProvider) {
      this.dataProvider = DataProvider;

    }

    demo() {
      var data = new Object();

      this.dataProvider.devices(data);
      console.log(data);
    }
  }
}
