/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  AssignmentExpression,
  BlockStatement,
  ExpressionStatement,
  Identifier,
  IfStatement,
  NumericLiteral,
  Program,
} from "../src/AST.ts";

export default (test) => {
  test(
    `
    if (x) {
      x = 1;
    } else {
      x = 2;
    }
    `,
    new Program([
      new IfStatement(
        new Identifier("x"),
        new BlockStatement([
          new ExpressionStatement(
            new AssignmentExpression(
              "=",
              new Identifier("x"),
              new NumericLiteral(1),
            ),
          ),
        ]),
        new BlockStatement([
          new ExpressionStatement(
            new AssignmentExpression(
              "=",
              new Identifier("x"),
              new NumericLiteral(2),
            ),
          ),
        ]),
      ),
    ]),
  );

  // No else part:
  test(
    `
    if (x) {
      x = 1;
    }
    `,
    new Program([
      new IfStatement(
        new Identifier("x"),
        new BlockStatement([
          new ExpressionStatement(
            new AssignmentExpression(
              "=",
              new Identifier("x"),
              new NumericLiteral(1),
            ),
          ),
        ]),
        null,
      ),
    ]),
  );
};
