//let number = 287152;
//let count = 0;
//let copy = number;

//while (copy > 0) {
//    count++;
//    copy = (copy / 10);
//}

////console.log(count);
//function elementsLargerThan(arr, n) {
//    let result = []; // Step 1: Initialize an empty array
    
//    for (let i = 0; i < arr.length; i++) { // Step 2: Iterate through the array
//        if (arr[i] > n) { // Step 3: Compare with n
//            result.push(arr[i]); // Add to result array
//        }
//    }
    
//    return result; // Step 4: Return the new array
//}

//// Example Usage
//console.log(elementsLargerThan([30, 10, 50, 20, 40], 25)); // Output: [30, 50, 40]
//console.log(elementsLargerThan([5, 8, 12, 3, 15], 10)); // Output: [12, 15]

//function stringExtractor()
//let arr = ["america", "pakistan", "india", "saudia", "oman"];
//let greater = "";

//function getGreater(arr) {
//    for (let i = 0; i < arr.length; i++) {
//        if (arr[i].length > greater.length) {
//            greater = arr[i];
//        }
//    }
//    console.log(greater);
//}

//getGreater(arr);
//   let arrayAvg = (arr) => {
//    let a = arr.length;
//    let b = 0;
//    for(let i =0; i<arr.length; i++){
//        b+= arr[i];
//    }
//    let c = b/a;
//   };
const users = [
    { name: "Ali", age: 25 },
    { name: "Sara", age: 30 },
    { name: "Bilal", age: 22 }
  ];
const names = users.map( user => { return user.name });
console.log(names);