/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  AssignmentExpression,
  ExpressionStatement,
  Identifier,
  NumericLiteral,
  Program,
} from "../src/AST.ts";

export default (test) => {
  // Simple assignment:
  test(
    `x = 42;`,
    new Program([
      new ExpressionStatement(
        new AssignmentExpression(
          "=",
          new Identifier("x"),
          new NumericLiteral(42),
        ),
      ),
    ]),
  );

  // Chained assignment:
  test(
    `x = y = 42;`,
    new Program([
      new ExpressionStatement(
        new AssignmentExpression(
          "=",
          new Identifier("x"),
          new AssignmentExpression(
            "=",
            new Identifier("y"),
            new NumericLiteral(42),
          ),
        ),
      ),
    ]),
  );
};
