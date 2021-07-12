// import sorting from "./sorting";

var Utils = {
  ConvertISOtoLocaleDateTime(pDatetime) {
    return new Date(new Date(new Date(pDatetime).setHours(new Date(pDatetime).getHours() - new Date().getTimezoneOffset() / 60)))
      .toISOString()
      .slice(0, 16);
  },
  RandomPastelColor: function() {
    return `hsla(${~~(360 * Math.random())},70%,70%,0.8)`;
  }
};

// export { randomColor, sorting };

export default {
  install(Vue) {
    Vue.prototype.Utils = Utils;
  }
};
