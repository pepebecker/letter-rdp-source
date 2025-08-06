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
  Identifier,
  LogicalExpression,
  NumericLiteral,
  Program,
} from "../src/AST.ts";

export default (test) => {
  test(
    "x > 0 && y < 1;",
    new Program([
      new ExpressionStatement(
        new LogicalExpression(
          "&&",
          new BinaryExpression(
            ">",
            new Identifier("x"),
            new NumericLiteral(0),
          ),
          new BinaryExpression(
            "<",
            new Identifier("y"),
            new NumericLiteral(1),
          ),
        ),
      ),
    ]),
  );
};
