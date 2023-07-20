/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import * as R from "ramda";

const api = new Api();

const lengthGtTwo = R.compose(
    R.gt(R.__, 2),
    R.length
);

const lengthLtTen = R.compose(
    R.lt(R.__, 10),
    R.length
);

const validate = R.allPass([
    lengthGtTwo,
    lengthLtTen,
    R.test(/^\d+(\.\d+)?$/)
]);

const convertToNumber = (str) => Number(str);
const round = (val) => Math.round(val);
const square = (val) => val ** 2;
const modulo3 = R.modulo(R.__, 3);
const assocNumber = R.assoc('number', R.__, {from: 10, to: 2});
const getResult = R.prop('result')
const fetchBinary = R.pipe(
    assocNumber,
    api.get('https://api.tech/numbers/base'),
    R.andThen(
        getResult
    )
);

const animalUrl = (id) => `https://animals.tech/${id}`;

const fetchAnimalById = R.pipe(
    animalUrl,
    api.get(R.__, {}),
    R.andThen(
        getResult
    )
);

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const handleLog = R.tap(writeLog);
    const handleValidationError = R.partial(
        handleError,
        ['ValidationError']
    );
    const processFlow = R.pipe(
        handleLog,
        convertToNumber,
        round,
        handleLog,
        fetchBinary,
        R.andThen(handleLog),
        R.otherwise(handleError),
        R.andThen(R.length),
        R.andThen(handleLog),
        R.andThen(square),
        R.andThen(handleLog),
        R.andThen(modulo3),
        R.andThen(handleLog),
        R.andThen(fetchAnimalById),
        R.andThen(handleSuccess),
        R.otherwise(handleError),
    );
    const validateAndProcess = R.ifElse(validate, processFlow, handleValidationError)
    validateAndProcess(value);
}

export default processSequence;
