/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  ExpressionStatement,
  NumericLiteral,
  Program,
  StringLiteral,
} from "../src/AST.ts";

export default (test) => {
  test(
    `
    "hello";
    42;
  `,
    new Program([
      new ExpressionStatement(new StringLiteral("hello")),
      new ExpressionStatement(new NumericLiteral(42)),
    ]),
  );
};
