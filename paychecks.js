
const sampleData = require('./plaid.json');

const paychecks = (data) => {
    const buckets = new Array(31).fill(0);
    data.transactions
        .filter(transaction => transaction.category && transaction.category.includes("Payroll"))
        .map(transaction => {
            const dateSplit = transaction.date.split("-")
            buckets[parseInt(dateSplit[2])]++;
        });

    let largest1 = { idx: 0, count: -Infinity };
    let largest2 = { idx: 0, count: -Infinity };
    let i = 0;
    while (i < buckets.length) {
        let j = i;
        let total = 0;
        while (j < buckets.length && j < 3) {
            total += buckets[j];
            j++;
        }
        if (total > largest1.count) {
            largest2 = {...largest1};
            largest1 = {idx: i, count: total};
        } else if (total > largest2.count) {
            largest2 = { idx: i, count: total };
        }
        i = j + 1
    }
    const firstPaycheck = largest1.idx > largest2.idx ? largest2 : largest1;
    const secondPaycheck = largest1.idx > largest2.idx ? largest1 : largest2;
    const currentDate = data.transactions[0].date;
    const currYear = currentDate.split("-")[0];
    const currMonth = currentDate.split("-")[1]
    const currDay = currentDate.split("-")[2];
    const currDayAsInt = parseInt(currDay);
    if (currDayAsInt > firstPaycheck.idx && currDayAsInt < secondPaycheck.idx) {
        return `${currYear}-${currMonth}-${secondPaycheck.idx + 1}`;
    } else {
        return `${currYear}-${parseInt(currMonth) + 1}-${firstPaycheck.idx + 1}`;
    }  
};

console.log(paychecks(sampleData));