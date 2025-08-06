/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  BinaryExpression,
  BooleanLiteral,
  ExpressionStatement,
  Identifier,
  NumericLiteral,
  Program,
} from "../src/AST.ts";

export default (test) => {
  test(
    "x > 0 == true;",
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "==",
          new BinaryExpression(
            ">",
            new Identifier("x"),
            new NumericLiteral(0),
          ),
          new BooleanLiteral(true),
        ),
      ),
    ]),
  );

  test(
    "x >= 0 != false;",
    new Program([
      new ExpressionStatement(
        new BinaryExpression(
          "!=",
          new BinaryExpression(
            ">=",
            new Identifier("x"),
            new NumericLiteral(0),
          ),
          new BooleanLiteral(false),
        ),
      ),
    ]),
  );
};
