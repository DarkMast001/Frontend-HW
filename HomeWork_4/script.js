import greet from './modules/greeting.js';
import { celsiusToFahrenheit } from "./modules/degreeConvert.js";
import { calculateFallDistance } from "./modules/physicCount.js";
import { countAverage } from "./modules/average.js";
import { stringSentence } from './modules/stringOp.js';

export let myName = "Dmitry";

greet(myName);
alert(`30 градусов Цельсия = ${celsiusToFahrenheit(30)} градусов по Фаренгейту`);
alert(`Объект падал 30 секунд, он пролетел ${calculateFallDistance(30)} метров`);
alert(`Среднее значение значение чисел 10 20 30 равно: ${countAverage(10, 20, 30)}`);
alert(stringSentence("JavaScript", "Крут"));