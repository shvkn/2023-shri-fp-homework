/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {__, allPass, any, complement, compose, count, countBy, equals, filter, gte, prop, toLower, values} from "ramda";

const isStar = prop('star')
const isSquare = prop('square')
const isTriangle = prop('triangle')
const isCircle = prop('circle')

const isRed = equals('red')
const isGreen = equals('green')
const isWhite = equals('white')
const isBlue = equals('blue')
const isOrange = equals('orange');

const isRedStar = compose(isRed, isStar);
const isGreenSquare = compose(isGreen, isSquare);
const isWhiteTriangle = compose(isWhite, isTriangle);
const isWhiteCircle = compose(isWhite, isCircle);
const isBlueCircle = compose(isBlue, isCircle);
const isOrangeSquare = compose(isOrange, isSquare);
const isGreenTriangle = compose(isGreen, isTriangle);

const countOfGreens = compose(count(isGreen), values)
const countOfOranges = compose(count(isOrange), values);
const countOfReds = compose(count(isRed), values);
const countOfBlues = compose(count(isBlue), values);

const isNotWhite = complement(isWhite);
const isNotRed = complement(isRed);

const isNotRedStar = compose(isNotRed, isStar);
const isNotWhiteStar = compose(isNotWhite, isStar);
const isNotWhiteTriangle = complement(isWhiteTriangle);

const isTriangleEqualsSquare = ({triangle, square}) => triangle === square;

const threeOfThemHaveSameColor = compose(
    any(gte(__, 3)),
    values,
    countBy(toLower),
);

const notWhiteFigures = compose(
    filter(isNotWhite),
    values
);

const isThereTwoGreens = compose(equals(2), countOfGreens);
const isThereOneRed = compose(equals(1), countOfReds)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteTriangle,
    isWhiteCircle
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
    gte(__, 2),
    countOfGreens
)
// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    return equals(
        countOfReds(figures),
        countOfBlues(figures)
    );
}

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    isBlueCircle,
    isRedStar,
    isOrangeSquare,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
    threeOfThemHaveSameColor,
    notWhiteFigures
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    isThereOneRed,
    isThereTwoGreens,
    isGreenTriangle
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
    gte(__, 4),
    countOfOranges
);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
    isNotRedStar,
    isNotWhiteStar
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
    gte(__, 4),
    countOfGreens
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    isNotWhiteTriangle,
    isTriangleEqualsSquare
]);
