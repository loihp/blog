// // // function findNumWays(n) {
// // //   let count = 0;
// // //   let i = 0;
// // //   let j = 0;
// // //   let k = 0;
// // //   let l = 0;
// // //   let m = 0;
// // //   for (i = 1; i < n; i++)
// // //     for (j = i; j < n; j++)
// // //       for (k = j; k < n; k++)
// // //         for (l = k; l < n; l++)
// // //           for (m = l; m < n; m++) if (i + j + k + l + m == n) count++;
// // //   return count;
// // // }
// // // console.log(findNumWays(10));

// // function checkCashRegister(price, cash, cid) {
// //   const moneyType = {
// //     PENNY: 0.01,
// //     NICKEL: 0.05,
// //     DIME: 0.1,
// //     QUARTER: 0.25,
// //     ONE: 1,
// //     FIVE: 5,
// //     TEN: 10,
// //     TWENTY: 20,
// //     "ONE HUNDRED": 100,
// //   };

// //   let i = 0;
// //   let j = 0;
// //   let k = 0;
// //   let tmp = 0;
// //   let res = cash - price;
// //   let retu = {
// //     Status: "",
// //     change: [],
// //   };
// //   let tmoObj = {};

// //   let sumCash = cid.reduce((accom, curent) => {
// //     return accom + curent[1];
// //   }, 0);
// //   //console.log(sumCash);
// //   if (res > sumCash) {
// //     retu.Status = "INSUFFICIENT_FUNDS";
// //     retu.change = [];
// //   } else if (res === sumCash) {
// //     retu.Status = "CLOSED";
// //     retu.change = cid;
// //   } else {
// //     for (i = 0; i < cid.length; i++) {
// //       for (j = 0; j < cid[i].length; j++) {}
// //     }
// //   }
// //   return retu;
// // }

// // console.log(
// //   checkCashRegister(19.5, 20, [
// //     ["PENNY", 1.01],
// //     ["NICKEL", 2.05],
// //     ["DIME", 3.1],
// //     ["QUARTER", 4.25],
// //     ["ONE", 90],
// //     ["FIVE", 55],
// //     ["TEN", 20],
// //     ["TWENTY", 60],
// //     ["ONE HUNDRED", 100],
// //   ])
// // );
// // console.log(
// //   checkCashRegister(19.5, 20, [
// //     ["PENNY", 0.5],
// //     ["NICKEL", 0],
// //     ["DIME", 0],
// //     ["QUARTER", 0],
// //     ["ONE", 0],
// //     ["FIVE", 0],
// //     ["TEN", 0],
// //     ["TWENTY", 0],
// //     ["ONE HUNDRED", 0],
// //   ])
// // );
// // console.log(
// //   checkCashRegister(19.5, 20, [
// //     ["PENNY", 0.01],
// //     ["NICKEL", 0],
// //     ["DIME", 0],
// //     ["QUARTER", 0],
// //     ["ONE", 0],
// //     ["FIVE", 0],
// //     ["TEN", 0],
// //     ["TWENTY", 0],
// //     ["ONE HUNDRED", 0],
// //   ])
// // );

// const lookup = {
//   PENNY: 0.01,
//   NICKEL: 0.05,
//   DIME: 0.1,
//   QUARTER: 0.25,
//   ONE: 1,
//   FIVE: 5,
//   TEN: 10,
//   TWENTY: 20,
//   "ONE HUNDRED": 100,
// };

// function checkCashRegister(price, cash, cid) {
//   let returnCash = Number(parseFloat(cash - price).toPrecision(12));
//   const change = [];
//   for (let i = cid.length - 1; i >= 0; i--) {
//     const value = cid[i][1];
//     const key = cid[i][0];
//     const lookupValue = lookup[key];

//     const temp = Math.floor(returnCash / lookupValue) * lookupValue;

//     if (temp != 0) {
//       const min = Math.min(temp, value);
//       cid[i][1] = value - min;
//       returnCash = returnCash - min;
//       change.push([key, min]);
//     }
//   }

//   if (returnCash > 0) {
//     return { status: "INSUFFICIENT_FUNDS", change: [] };
//   }

//   for (let i of cid) {
//     const value = i[1];
//     const key = i[0];

//     if (value > 0.001) {
//       return {
//         status: "OPEN",
//         change: change.filter((value) => value[1] !== 0),
//       };
//     }
//   }
//   console.log(cid, change);
//   return {
//     status: "CLOSE",
//     change: cid.map((val) => {
//       var temp = 0;
//       for (let i of change) {
//         if (i[0] === val[0]) {
//           temp = i[1];
//           break;
//         }
//       }
//       return [val[0], val[1] + temp];
//     }),
//   };
// }
// console.log(
//   checkCashRegister(19.5, 20, [
//     ["PENNY", 0.5],
//     ["NICKEL", 0],
//     ["DIME", 0],
//     ["QUARTER", 0],
//     ["ONE", 0],
//     ["FIVE", 0],
//     ["TEN", 0],
//     ["TWENTY", 0],
//     ["ONE HUNDRED", 0],
//   ])
// );

// let i = Number.MIN_VALUE;

// console.log(i * i); // => 0
// console.log(i + 1); // => 1
// console.log(i - 1); // => -1
// console.log(i / i); // => 1
let person = {
  name: "Bob",
  test: function () {
    console.log("test: ", this);
  },
};
person.test();
