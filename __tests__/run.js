/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

/**
 * Main test runner.
 */

import { Parser } from '../src/Parser.js';
import { deepEqual } from 'assert';

/**
 * List of tests.
 */
const tests = [
  'literals-test',
  'statement-list-test',
  'block-test',
  'empty-statement-test',
  'math-test',
  'assignment-test',
  'variable-test',
  'if-test',
  'relational-test',
  'equality-test',
  'logical-test',
  'unary-test',
  'while-test',
  'do-while-test',
  'for-test',
  'function-declaration-test',
  'member-test',
  'call-test',
  'class-test',
];

const parser = new Parser();

/**
 * For manual tests.
 */
function exec() {
  const program = `

    /**
     * Class declaration.
     */
    class Point {
      def constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      def calc() {
        return this.x + this.y;
      }
    }

    /**
     * Child class.
     */
    class Point3D extends Point {
      def constructor(x, y, z) {
        super(x, y);
        this.z = z;
      }

      def calc() {
        return super() + this.z;
      }
    }

    // Instance:
    let p = new Point3D(10, 20, 30);

    p.calc();

`;

  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

// Manual test:
exec();

/**
 * Test function.
 */
function test(program, expected) {
  const ast = parser.parse(program);
  deepEqual(ast, expected);
}

// Run all tests:

tests.forEach(async testCase => {
  const { default: testRun } = await import(`${testCase}.js`);
  return testRun(test);
});

console.log('All assertions passed!');
