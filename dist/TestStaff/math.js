"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAdd = exports.FahrentToCelsious = exports.CelsiousToFahrent = exports.calculateTip = void 0;
const calculateTip = (total, tipPercent) => {
    const tip = total * tipPercent;
    return tip + total;
};
exports.calculateTip = calculateTip;
const CelsiousToFahrent = (temp) => {
    return temp + 1.8 + 32;
};
exports.CelsiousToFahrent = CelsiousToFahrent;
const FahrentToCelsious = (temp) => {
    return (temp - 32) / 1.8;
};
exports.FahrentToCelsious = FahrentToCelsious;
const AsyncAdd = (number_one, number_two) => {
    return new Promise((resolve, reject) => setTimeout(() => {
        resolve(number_one + number_two);
    }, 2000));
};
exports.AsyncAdd = AsyncAdd;
//# sourceMappingURL=math.js.map