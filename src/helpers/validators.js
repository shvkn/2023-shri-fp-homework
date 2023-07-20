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
import * as R from "ramda";

const isStar = R.prop('star')
const isSquare = R.prop('square')
const isTriangle = R.prop('triangle')
const isCircle = R.prop('circle')

const isRed = R.equals('red')
const isGreen = R.equals('green')
const isWhite = R.equals('white')
const isBlue = R.equals('blue')
const isOrange = R.equals('orange');

const isRedStar = R.compose(isRed, isStar);
const isGreenSquare = R.compose(isGreen, isSquare);
const isWhiteTriangle = R.compose(isWhite, isTriangle);
const isWhiteCircle = R.compose(isWhite, isCircle);
const isBlueCircle = R.compose(isBlue, isCircle);
const isOrangeSquare = R.compose(isOrange, isSquare);
const isGreenTriangle = R.compose(isGreen, isTriangle);

const countOfGreens = R.compose(R.count(isGreen), R.values)
const countOfOranges = R.compose(R.count(isOrange), R.values);
const countOfReds = R.compose(R.count(isRed), R.values);
const countOfBlues = R.compose(R.count(isBlue), R.values);

const isNotWhite = R.complement(isWhite);
const isNotRed = R.complement(isRed);

const isNotRedStar = R.compose(isNotRed, isStar);
const isNotWhiteStar = R.compose(isNotWhite, isStar);
const isNotWhiteTriangle = R.complement(isWhiteTriangle);

const isTriangleEqualsSquare = ({triangle, square}) => triangle === square;

const threeOfThemHaveSameColor = R.compose(
    R.any(R.gte(R.__, 3)),
    R.values,
    R.countBy(R.toLower),
);

const notWhiteFigures = R.compose(
    R.filter(isNotWhite),
    R.values
);

const isThereTwoGreens = R.compose(R.equals(2), countOfGreens);
const isThereOneRed = R.compose(R.equals(1), countOfReds)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = R.allPass([
    isRedStar,
    isGreenSquare,
    isWhiteTriangle,
    isWhiteCircle
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = R.compose(
    R.gte(R.__, 2),
    countOfGreens
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    return R.equals(
        countOfBlues(figures),
        countOfReds(figures)
    )
}

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = R.allPass([
    isBlueCircle,
    isRedStar,
    isOrangeSquare,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = R.compose(
    threeOfThemHaveSameColor,
    notWhiteFigures
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = R.allPass([
    isThereOneRed,
    isThereTwoGreens,
    isGreenTriangle
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = R.compose(
    R.gte(R.__, 4),
    countOfOranges
);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = R.allPass([
    isNotRedStar,
    isNotWhiteStar
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = R.compose(
    R.gte(R.__, 4),
    countOfGreens
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = R.allPass([
    isNotWhiteTriangle,
    isTriangleEqualsSquare
]);
