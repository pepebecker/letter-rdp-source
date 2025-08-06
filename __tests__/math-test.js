/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  BinaryExpression,
  ExpressionStatement,
  NumericLiteral,
  Program,
} from "../src/AST.ts";

export default (test) => {
  // Addition:
  // left: 2
  // right: 2
  test(
    `2 + 2;`,
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "+",
          new NumericLiteral(2),
          new NumericLiteral(2),
        ),
      ),
    ]),
  );

  // Nested binary expressions:
  // left: 3 + 2
  // right: 2
  test(
    `3 + 2 - 2;`,
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "-",
          new BinaryExpression(
            "+",
            new NumericLiteral(3),
            new NumericLiteral(2),
          ),
          new NumericLiteral(2),
        ),
      ),
    ]),
  );

  test(
    `2 * 2;`,
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "*",
          new NumericLiteral(2),
          new NumericLiteral(2),
        ),
      ),
    ]),
  );

  test(
    `2 * 2 * 2;`,
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "*",
          new BinaryExpression(
            "*",
            new NumericLiteral(2),
            new NumericLiteral(2),
          ),
          new NumericLiteral(2),
        ),
      ),
    ]),
  );

  // Precedence of operations:
  test(
    `2 + 2 * 2;`,
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "+",
          new NumericLiteral(2),
          new BinaryExpression(
            "*",
            new NumericLiteral(2),
            new NumericLiteral(2),
          ),
        ),
      ),
    ]),
  );

  // Precedence of operations:
  test(
    `(2 + 2) * 2;`,
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "*",
          new BinaryExpression(
            "+",
            new NumericLiteral(2),
            new NumericLiteral(2),
          ),
          new NumericLiteral(2),
        ),
      ),
    ]),
  );
};
