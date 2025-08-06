/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  ExpressionStatement,
  Identifier,
  NumericLiteral,
  Program,
  WhileStatement,
} from "../src/AST.ts";

export default (test) => {
  test(
    `
    while (x > 10) {
      x -= 1;
    }
    `,
    new Program([
      new WhileStatement(
        new BinaryExpression(
          ">",
          new Identifier("x"),
          new NumericLiteral(10),
        ),
        new BlockStatement([
          new ExpressionStatement(
            new AssignmentExpression(
              "-=",
              new Identifier("x"),
              new NumericLiteral(1),
            ),
          ),
        ]),
      ),
    ]),
  );
};
