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
  ForStatement,
  Identifier,
  NumericLiteral,
  Program,
  VariableDeclaration,
  VariableStatement,
} from "../src/AST.ts";

export default (test) => {
  test(
    `
    for (var i = 0; i < 10; i += 1) {
      x += i;
    }
    `,
    new Program([
      new ForStatement(
        new VariableStatement([
          new VariableDeclaration(
            new Identifier("i"),
            new NumericLiteral(0),
          ),
        ]),
        new BinaryExpression(
          "<",
          new Identifier("i"),
          new NumericLiteral(10),
        ),
        new AssignmentExpression(
          "+=",
          new Identifier("i"),
          new NumericLiteral(1),
        ),
        new BlockStatement([
          new ExpressionStatement(
            new AssignmentExpression(
              "+=",
              new Identifier("x"),
              new Identifier("i"),
            ),
          ),
        ]),
      ),
    ]),
  );

  test(
    `
    for (;;) {

    }
    `,
    new Program([
      new ForStatement(
        null,
        null,
        null,
        new BlockStatement([]),
      ),
    ]),
  );
};
