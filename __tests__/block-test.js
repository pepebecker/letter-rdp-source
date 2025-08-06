/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  BlockStatement,
  ExpressionStatement,
  NumericLiteral,
  Program,
  StringLiteral,
} from "../src/AST.ts";

export default (test) => {
  test(
    `{ 42; "hello"; }`,
    new Program([
      new BlockStatement([
        new ExpressionStatement(
          new NumericLiteral(42),
        ),
        new ExpressionStatement(
          new StringLiteral("hello"),
        ),
      ]),
    ]),
  );

  // Empty block:

  test(
    `{}`,
    new Program([
      new BlockStatement([]),
    ]),
  );

  // Nested blocks:

  test(
    `
    {
      42;
      {
        "hello";
      }
    }
  `,
    new Program([
      new BlockStatement([
        new ExpressionStatement(
          new NumericLiteral(42),
        ),
        new BlockStatement([
          new ExpressionStatement(
            new StringLiteral("hello"),
          ),
        ]),
      ]),
    ]),
  );
};
