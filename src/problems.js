const Queue = require('./queue');

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key > this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('key error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('key error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }

  inOrder(values = []) {
    if (this.left) {
      values = this.left.inOrder(values);
    }
    values.push(this.value);
    if (this.right) {
      values = this.right.inOrder(values);
    }
    return values;
  }

  preOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      values = this.left.preOrder(values);
    }
    if (this.right) {
      values = this.right.inOrder(values);
    }
    return values;
  }

  postOrder(values = []) {
    if (this.left) {
      values = this.left.preOrder(values);
    }
    if (this.right) {
      values = this.right.inOrder(values);
    }
    values.push(this.value);
    return values;
  }

  bfs(values = []) {
    const queue = new Queue();
    queue.enqueue(this);

    while (queue.length) {
      const node = queue.dequeue();
      values.push(node.value);

      if (node.left) {
        queue.enqueue(node.left);
      }
      if (node.right) {
        queue.enqueue(node.right);
      }
    }
    return values;
  }
}

function binarySearch(array, value, start, end) {
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  console.log(start, end);
  if (item == value) {
    return index;
  } else if (item < value) {
    return binarySearch(array, value, index + 1, end);
  } else if (item > value) {
    return binarySearch(array, value, start, index - 1);
  }
}

// console.log('8', binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 8));
// console.log('16', binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 16));

// to find the value of 8:
// first call start: arr position [0]
// first call end: arr position [10]

// second call start: arr position [0]
// second call end: arr position [4]

// third call start: arr position [3]
// third call end: arr position [4]

// Result is arr position [3]
// --------------------------------------------------------------
// to find the value of 16:
// first call start: arr position [0]
// first call end: arr position [10]

// second call start: arr position [6]
// second call end: arr position [10]

// third call start: arr position [6]
// third call end: arr position [7]

// forth call start: arr position [7]
// forth call end: arr position [7]

// Result is arr position [-1] indication that 16 was not found

// -----------------------------------------------------------------
// Question 2 Adding a React UI

// For exercises 1 and 2, you will be using a search algorithm to search for an item in a dataset. You will be testing the efficiency of 2 search algorithms, linear search and binary search. You will also have a UI (a simple textbox will do) through which you will be sending your input that you want to search. There is no server-side to this program. All of this should be done using React.

// 1) Linear search

// Given the following dataset, find out how many tries it took to search for a particular item in the dataset. If the item is not in the dataset, provide a message and indicate how many searches it took to find that out.

// 89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5,

// It took 100 steps to realize 8 was not found
// Found 44 in 50 steps

// 2) Binary search

// Use the same front end and the dataset from the previous exercise for this exercise. Use array.sort to sort the dataset. Then implement a binary search to find a particular value in the dataset. Display how many tries it took to search for a particular item in the dataset using binary search. If the item is not in the dataset, provide a message and indicate how many searches it took to find that out.

// It took 6 steps to realize 8 was not found
// Found 44 in 6 steps

// -----------------------------------------------------------------------
// Question 3 Find a book

// Imagine you are looking for a book in a library with a Dewey Decimal index. How would you go about it? Can you express this process as a search algorithm? Implement your algorithm to find a book whose Dewey and book title is provided.

// Dewey decimal # is two parts (genre + ID)
// so the first step I need to find the matching array,
// then I will find the matching id within the array

const booksArr = [
  {
    deweyId: '000.13',
    title: 'Yolo Dictionary',
  },
  {
    deweyId: '200.6',
    title: 'Pineal Gland Decalcification',
  },
  {
    deweyId: '300.1',
    title: 'How To Grow Anything',
  },
  {
    deweyId: '500.18',
    title: 'The Science Of Sleeping Upside Down',
  },
  {
    deweyId: '700.1',
    title: 'How To Draw Emotional Hands',
  },
  {
    deweyId: '900.8',
    title: 'Defense At Covid Ridge',
  },
];

function findTheDewey(deweyId, title, books, start = 0, end = books.length) {
  if (start > end) {
    return `${title} not found`;
  }

  const index = Math.floor((start + end) / 2);
  const book = books[index];

  // console.log(typeof(parseFloat(book.deweyId)))
  // console.log(typeof(book.deweyId))
  // console.log(typeof(deweyId))

  if (parseFloat(book.deweyId) === parseFloat(deweyId)) {
    if (book.title === title) {
      return `${title} located at index: ${index}`;
    }
    return `${title} not found`;
  } else if (parseFloat(book.deweyId) < parseFloat(deweyId)) {
    return findTheDewey(deweyId, title, books, index + 1, end);
  } else if (parseFloat(book.deweyId) > parseFloat(deweyId)) {
    return findTheDewey(deweyId, title, books, start, index - 1);
  }
}
// console.log(findTheDewey('700.1', "How To Draw Emotional Hands", booksArr))

// ------------------------------------------------------------------------------
// Question 4 Searching in a BST

//  No coding is needed for these drills. Once you have answered it, you can then code the tree and implement the traversal to see if your answer is correct.

// 1) Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?

// postorder traversal (Step left, Step Right, Process node)

// 14, 19, 15, 27, 25, 79, 90, 91, 89, 35

// 2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal?

// preorder traversal (Process node, Step left, Step Right)

// 8, 6, 5, 7, 10, 9, 11

// -----------------------------------------------------------------------------------
// Question 5 Implement different tree traversals

// Using your BinarySearchTree class from your previous lesson, create a binary search tree with the following dataset: 25 15 50 10 24 35 70 4 12 18 31 44 66 90 22. Then implement inOrder(), preOrder(), and postOrder() functions. Test your functions with the following datasets.

// A pre-order traversal should give you the following order: 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90

// In-order: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90

// Post-order: 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25

// See lines 103-134

// -------------------------------------------------------------------------------------
// Question 6 Find the next commanding officer

// Suppose you have a tree representing a command structure of the Starship USS Enterprise.

// Captain Picard
// /                \
// Commander Riker       Commander Data
// /         \               \
// Lt. Cmdr.   Lt. Cmdr.          Lt. Cmdr.
// Worf        LaForge            Crusher
// /                           /
// Lieutenant                  Lieutenant
// security-officer            Selar

// This tree is meant to represent who is in charge of lower-ranking officers. For example, Commander Riker is directly responsible for Worf and LaForge. People of the same rank are at the same level in the tree. However, to distinguish between people of the same rank, those with more experience are on the left and those with less on the right (i.e., experience decreases from left to right). Suppose a fierce battle with an enemy ensues. Write a program that will take this tree of commanding officers and outlines the ranking officers in their ranking order so that if officers start dropping like flies, we know who is the next person to take over command.

const nextCommandingOfficer = new BinarySearchTree();

nextCommandingOfficer.insert(5, "Captain Picard");
nextCommandingOfficer.insert(3, "Commander Riker");
nextCommandingOfficer.insert(6, "Commander Data");
nextCommandingOfficer.insert(2, "Lt. Cmdr. Worf");
nextCommandingOfficer.insert(4, "Lt. Cmdr. LaForge");
nextCommandingOfficer.insert(8, "Lt. Cmdr. Crusher");
nextCommandingOfficer.insert(1, "Lieutenant security-officer");
nextCommandingOfficer.insert(7, "Lieutenant Selar");

// console.log(nextCommandingOfficer.bfs())

// ------------------------------------------------------------------------------------------------
// Question 7 Max profit

// The share price for a company over a week's trading is as follows: [128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the company on a particular day, and sell the shares on a subsequent day, write an algorithm to work out what the maximum profit you could make would be.
const sharePrice = [128, 97, 121, 123, 98, 97, 105];

function maxProfit(array){
  let max = 0 ;
  let day = 1 ;
  for(let i = 0 ; i < array.length ; i++){
      let profit = array[i + 1] - array[i]
      if(profit > max){
          max = profit;
          day = day + 1;
      }
  }
  return `Buy on day: ${day} and sell on day ${day + 1} to make ${max} in profit`;
}
// console.log(maxProfit(sharePrice));




module.exports = BinarySearchTree;

