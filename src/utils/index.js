import sorting from "./sorting";


export function randomColor() {
  return `hsla(${~~(360 * Math.random())},70%,70%,0.8)`;
}
export { randomColor, sorting };
