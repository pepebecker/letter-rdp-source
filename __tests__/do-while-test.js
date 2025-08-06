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
  DoWhileStatement,
  ExpressionStatement,
  Identifier,
  NumericLiteral,
  Program,
} from "../src/AST.ts";

export default (test) => {
  test(
    `
    do {
      x -= 1;
    } while (x > 10);
    `,
    new Program([
      new DoWhileStatement(
        new BlockStatement([
          new ExpressionStatement(
            new AssignmentExpression(
              "-=",
              new Identifier("x"),
              new NumericLiteral(1),
            ),
          ),
        ]),
        new BinaryExpression(
          ">",
          new Identifier("x"),
          new NumericLiteral(10),
        ),
      ),
    ]),
  );
};
