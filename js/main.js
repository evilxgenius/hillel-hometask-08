const root = document.querySelector('#root');
const headers = {
    one: "1. Вивести на сторінку в один рядок через кому числа від 10 до 20.",
    two: "2. Вивести квадрати чисел від 10 до 20.",
    three: "3. Вивести таблицю множення на 7.",
    four: "4. Знайти суму всіх цілих чисел від 1 до 15.",
    five: "5. Знайти добуток усіх цілих чисел від 15 до 35.",
    six: "6. Знайти середнє арифметичне всіх цілих чисел від 1 до 500.",
    seven: "7. Вивести суму лише парних чисел в діапазоні від 30 до 80.",
    eight: "8. Вивести всі числа в діапазоні від 100 до 200 кратні 3.",
    nine: "9. Дано натуральне число. Знайти та вивести на сторінку всі його дільники (Введене число впливає на пункти 10-11).",
    ten: "10. Визначити кількість його парних дільників.",
    eleven: "11. Знайти суму його парних дільників.",
    twelve: "12. Надрукувати повну таблицю множення від 1 до 10."
};

for (let key in headers) {
    let articleBlock = document.createElement('article')
    let headerBlock = document.createElement('h5');
    let contentBlock = document.createElement('div');

    articleBlock.id = key;
    headerBlock.className = 'border m-0 bg-dark-subtle';
    headerBlock.innerText = headers[key];
    articleBlock.classList.add('border');

    articleBlock.append(headerBlock, contentBlock);
    root.append(articleBlock);
}

function putContentToPage(selector, callbackFn) {
    const block = document.querySelector(selector);

    callbackFn(block);
}

// 1. Вивести на сторінку в один рядок через кому числа від 10 до 20.
putContentToPage('#one>div', (block) => {
    let numbers = [];

    for (let i = 10; i <= 20; i++) numbers.push(i);

    block.innerText = numbers.join(', ');
});

// 2. Вивести квадрати чисел від 10 до 20.
putContentToPage('#two>div', (block) => {
    let squaresOfNums = [];

    for (let i = 10; i <= 20; i++) squaresOfNums.push(`${i}² = ${i**2}`);

    block.innerHTML = squaresOfNums.join('<br/>');
});

// 3. Вивести таблицю множення на 7.
putContentToPage('#three>div', (block) => {
    let multTable7 = [];

    for (let i = 1; i <= 10; i++) multTable7.push(`${7*i} = 7 * ${i}`);

    block.innerHTML = multTable7.join('<br/>');
});

// 4. Знайти суму всіх цілих чисел від 1 до 15.
putContentToPage('#four>div', (block) => {
    let sumOfNums = 0;

    for (let i = 1; i <= 15; i++) sumOfNums += i;

    block.innerText = `${sumOfNums} = 1 + .... + 15`;
});

// 5. Знайти добуток усіх цілих чисел від 15 до 35.
// (Спочатку була ідея реалізувати це з memo = 1,
//  тобто рішення складалось би з memo * 15 * .... * 35 і вкладалось в
//  один цикл, але захотілось розібратись як в JS реалізовано #reduce)
putContentToPage('#five>div', (block) => {
    let productOfNums = [];
    let productResult;

    for (let i = 15; i <= 35; i++) productOfNums.push(i);

    productResult = productOfNums.reduce((n1, n2) => n1 * n2);
    block.innerText = `${BigInt(productResult)} = 15 * .... * 35`;
});


// 6. Знайти середнє арифметичне всіх цілих чисел від 1 до 500.
putContentToPage('#six>div', (block) => {
    let avgNumsSum = 0;
    let countOfAvgNums = 0;

    for (let i = 1; i <= 500; i++) {
        avgNumsSum += i;
        countOfAvgNums++;
    }

    block.innerText = `${avgNumsSum / countOfAvgNums} = (1 + .... + 500) / ${countOfAvgNums}`;
});

// 7. Вивести суму лише парних чисел в діапазоні від 30 до 80.
putContentToPage('#seven>div', (block) => {
    let evenNumsSum;
    let evenNums = [];

    // Уявимо що діапазон зажди буде починатися з парного числа :)
    for (let i = 30; i <= 80; i += 2) evenNums.push(i);

    // на мою думку цей варіант кращій
    // якщо діапазон буде задаватися з зовні:
    // for (let i = 30; i <= 80;){
    //     if (i % 2 === 0) {
    //         evenNums.push(i);
    //         i += 2;
    //     } else { i++; }
    // }

    evenNumsSum = evenNums.reduce((n1, n2) => n1 + n2);
    block.innerText = `${evenNumsSum} = ${evenNums.join(' + ')}`;
});


// 8. Вивести всі числа в діапазоні від 100 до 200 кратні 3.
putContentToPage('#eight>div', (block) => {
    let mult3Nums = [];

    for (let i = 100; i <= 200; i++)
        if (i % 3 === 0) mult3Nums.push(i);

    block.innerText = mult3Nums.join(', ');
});

// 9-10-11 інпит для розрахунків. (Дано натуральне число)
putContentToPage('#nine', (block) => {
    let controlDiv = document.createElement('div');
    let input = document.createElement('input');
    let button = document.createElement('button');
    let hrLine = document.createElement('hr');
    let mainContentDiv = document.createElement('div');

    input.type = 'number';
    input.min = '1';
    input.step = '1';
    input.id = 'calcInput';
    input.className = 'w-25';
    button.id = 'calcButton';
    button.innerText = 'Calculate';
    hrLine.className = 'mt-1 mb-0';
    controlDiv.className = 'mt-1';
    mainContentDiv.className = 'main-content';

    controlDiv.append(input, button);
    block.querySelector('div').append(controlDiv, hrLine, mainContentDiv);
});

document.querySelector('#calcButton').addEventListener('click', () => {
    let input = document.querySelector('#calcInput');
    let numberFromUser = +input.value;

    if (isNaN(numberFromUser) || numberFromUser <= 0 || numberFromUser % 1 !== 0) {
        alert('Please put a Natural number (1,2,3...)!');
        input.value = '';
        return;
    }

    let divisorsOfNumber = [];
    let evenDivisors;
    // 9. Дано натуральне число. Знайти та вивести на сторінку всі його дільники.
    // 10. Визначити кількість його парних дільників.
    // 11. Знайти суму його парних дільників.
    for (let num = numberFromUser; num > 0; num--) {
        if (numberFromUser % num === 0) divisorsOfNumber.push(num)
    }

    putContentToPage('#nine .main-content', (block) => {
        block.innerText = divisorsOfNumber.join(', ');
    });

    evenDivisors = divisorsOfNumber.filter((n) => n % 2 === 0);

    putContentToPage('#ten>div', (block) => {
        block.innerText = evenDivisors.length +  ` (${evenDivisors.join(', ')})`;
    });

    putContentToPage('#eleven>div', (block) => {
        const sum = evenDivisors.reduce((memo, val) => memo + val, 0);

        if (sum === 0 || evenDivisors.length === 1)
            block.innerText = sum;
        else
            block.innerText = `${sum} = ${evenDivisors.join(' + ')}`;
    });
});

// 12. Надрукувати повну таблицю множення від 1 до 10.
putContentToPage('#twelve>div', (block) => {
    let multTable = [];

    for (let i = 0; i <= 9; i++) {
        multTable[i] = [];

        for (let j = 0; j <= 9; j++) {
            let multResult = (i + 1) * (j + 1);
            multTable[i][j] = `${multResult} = ${i + 1} * ${j + 1}`;
        }
    }

    block.innerHTML =
        multTable
            .map((arr) => arr.join('<br/>'))
            .join('<hr/>');
});
