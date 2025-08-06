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

import { Parser } from '../src/Parser.ts';
import { deepEqual } from 'node:assert';
import { diff } from 'npm:jest-diff';

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
  let ast;
  try {
    ast = parser.parse(program);
    deepEqual(ast, expected);
  } catch (e) {
    const d = diff(expected, ast);
    if (d) throw new Error(d);
    throw e;
  }
}

// Run all tests:

let testsFailed = 0;
for await (const testName of tests) {
  try {
    const { default: testRun } = await import(`./${testName}.js`);
    testRun(test);
    console.log(`✅ Test passed: ${testName}`);
  } catch (e) {
    testsFailed++;
    console.log(`❌ Test failed: ${testName}`);
    console.error(e?.message);
  }
}

if (testsFailed > 0) {
  console.error(`❌ Some tests failed:`, testsFailed);
} else {
  console.log('✅ All tests passed!');
}
