/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  BooleanLiteral,
  ExpressionStatement,
  NumericLiteral,
  Program,
  StringLiteral,
} from "../src/AST.ts";

export default (test) => {
  // NumericLiteral
  test(
    `42;`,
    new Program([
      new ExpressionStatement(new NumericLiteral(42)),
    ]),
  );

  // BooleanLiteral
  test(
    `true;`,
    new Program([
      new ExpressionStatement(new BooleanLiteral(true)),
    ]),
  );
  test(
    `false;`,
    new Program([
      new ExpressionStatement(new BooleanLiteral(false)),
    ]),
  );

  // StringLiteral
  test(
    `"hello";`,
    new Program([
      new ExpressionStatement(new StringLiteral("hello")),
    ]),
  );

  // StringLiteral
  test(
    `'hello';`,
    new Program([
      new ExpressionStatement(new StringLiteral("hello")),
    ]),
  );
};
