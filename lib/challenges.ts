export interface Challenge {
  title: string;
  description: string;
  signature: string;
  starterCode: string;
  tests: {
    input: any[];
    expected: any;
  }[];
}

export const challenges: Challenge[] = [
  {
    title: "ARRAY DEDUPLICATION",
    description: "Write a function that removes duplicate values from an array while preserving the original order. The function should work with arrays of numbers.",
    signature: "function dedupe(arr: number[]): number[]",
    starterCode: `function dedupe(arr: number[]): number[] {
  // Your code here
  return arr;
}`,
    tests: [
      { input: [[1, 2, 3, 2, 1]], expected: [1, 2, 3] },
      { input: [[5, 5, 5, 5]], expected: [5] },
      { input: [[1, 2, 3, 4]], expected: [1, 2, 3, 4] },
      { input: [[], ], expected: [] },
      { input: [[7, 3, 7, 3, 1, 3, 7]], expected: [7, 3, 1] },
    ],
  },
  {
    title: "BINARY SEARCH",
    description: "Implement a binary search function that finds the index of a target value in a sorted array. Return -1 if the target is not found.",
    signature: "function binarySearch(arr: number[], target: number): number",
    starterCode: `function binarySearch(arr: number[], target: number): number {
  // Your code here
  return -1;
}`,
    tests: [
      { input: [[1, 3, 5, 7, 9], 5], expected: 2 },
      { input: [[1, 2, 3, 4, 5], 1], expected: 0 },
      { input: [[1, 2, 3, 4, 5], 5], expected: 4 },
      { input: [[1, 2, 3, 4, 5], 6], expected: -1 },
      { input: [[], 1], expected: -1 },
      { input: [[10, 20, 30, 40, 50, 60, 70], 40], expected: 3 },
    ],
  },
  {
    title: "PROMISE RACE CONDITION",
    description: "Create a function that takes an array of async functions and a timeout in milliseconds. Execute all functions concurrently and return the results of those that complete within the timeout. Return results in the order they complete.",
    signature: "async function raceWithTimeout(tasks: (() => Promise<any>)[], timeout: number): Promise<any[]>",
    starterCode: `async function raceWithTimeout(tasks: (() => Promise<any>)[], timeout: number): Promise<any[]> {
  // Your code here
  return [];
}`,
    tests: [
      {
        input: [
          [
            () => new Promise(resolve => setTimeout(() => resolve('fast'), 100)),
            () => new Promise(resolve => setTimeout(() => resolve('slow'), 300)),
          ],
          200,
        ],
        expected: ['fast'],
      },
      {
        input: [
          [
            () => new Promise(resolve => setTimeout(() => resolve(1), 50)),
            () => new Promise(resolve => setTimeout(() => resolve(2), 100)),
            () => new Promise(resolve => setTimeout(() => resolve(3), 150)),
          ],
          200,
        ],
        expected: [1, 2, 3],
      },
      {
        input: [
          [
            () => new Promise(resolve => setTimeout(() => resolve('a'), 300)),
            () => new Promise(resolve => setTimeout(() => resolve('b'), 400)),
          ],
          200,
        ],
        expected: [],
      },
    ],
  },
];