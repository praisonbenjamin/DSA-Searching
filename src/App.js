/* eslint-disable eqeqeq */
import React from 'react';
import './App.css';

function App() {
  const dataVals = [
    89,
    30,
    25,
    32,
    72,
    70,
    51,
    42,
    25,
    24,
    53,
    55,
    78,
    50,
    13,
    40,
    48,
    32,
    26,
    2,
    14,
    33,
    45,
    72,
    56,
    44,
    21,
    88,
    27,
    68,
    15,
    62,
    93,
    98,
    73,
    28,
    16,
    46,
    87,
    28,
    65,
    38,
    67,
    16,
    85,
    63,
    23,
    69,
    64,
    91,
    9,
    70,
    81,
    27,
    97,
    82,
    6,
    88,
    3,
    7,
    46,
    13,
    11,
    64,
    76,
    31,
    26,
    38,
    28,
    13,
    17,
    69,
    90,
    1,
    6,
    7,
    64,
    43,
    9,
    73,
    80,
    98,
    46,
    27,
    22,
    87,
    49,
    83,
    6,
    39,
    42,
    51,
    54,
    84,
    34,
    53,
    78,
    40,
    14,
    5,
  ];

  function binarySearch(array, value, start, end, counter) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;
    var counter = counter === undefined ? 0 : counter;

    if (start > end) {
      return `It took ${counter} steps to realize ${value} was not found`;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    // console.log(start, end);
    if (item == value) {
      return `Found ${value} in ${counter} steps`;
    } else if (item < value) {
      counter++;
      return binarySearch(array, value, index + 1, end, counter);
    } else if (item > value) {
      counter++;
      return binarySearch(array, value, start, index - 1, counter);
    }
  }

  function linearSearch(array, value) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
      counter++;
      if (array[i] == value) {
        return `Found ${value} in ${counter} steps`;
      }
    }
    return `It took ${counter} steps to realize ${value} was not found`;
  }

  function handleLinearSubmit(e) {
    e.preventDefault();
    let targetVal = e.target.numValLinear.value;

    const sortedDataVal = dataVals.sort((a, b) => {
      return a - b;
    });
    alert(linearSearch(sortedDataVal, targetVal));
  }

  function handleBinarySubmit(e) {
    e.preventDefault();
    let targetVal = e.target.numValBinary.value;

    const sortedDataVal = dataVals.sort((a, b) => {
      return a - b;
    });
    alert(binarySearch(sortedDataVal, targetVal));
  }

  return (
    <main className="App">
      <div className="linearBox">
        <h2>Linear Search</h2>
        <form onSubmit={handleLinearSubmit}>
          <label htmlFor="valInput">Find value: </label>
          <input type="text" id="numValLinear" name="valInput" />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="binaryBox">
        <h2>Binary Search</h2>
        <form onSubmit={handleBinarySubmit}>
          <label htmlFor="valInput">Find value: </label>
          <input type="text" id="numValBinary" name="valInput" />
          <button type="submit">Search</button>
        </form>
      </div>
    </main>
  );
}

export default App;
