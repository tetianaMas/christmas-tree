export default class Constants {
  static rangeCountOpts(data: Array<string | number> = ['1', '12']) {
    return {
      start: data,
      tooltips: false,
      range: {
        min: [1],
        max: [12],
      },
      connect: [false, true, false],
      format: {
        to: function (value: number) {
          return value.toFixed();
        },
        from: function (value: string) {
          return Number(value);
        },
      },
    };
  }

  static rangeYearOpts(data: Array<string | number> = ['1940', '2020']) {
    return {
      start: data,
      tooltips: false,
      range: {
        min: [1940],
        max: [2020],
      },
      step: 10,
      connect: [false, true, false],
      format: {
        to: function (value: number) {
          return value.toFixed();
        },
        from: function (value: string) {
          return Number(value);
        },
      },
    };
  }
}
