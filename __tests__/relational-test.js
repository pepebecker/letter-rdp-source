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
  NumericLiteral,
  Program,
} from "../src/AST.ts";

export default (test) => {
  test(
    "x > 0;",
    new Program([
      new ExpressionStatement(
        new BinaryExpression(">", new Identifier("x"), new NumericLiteral(0)),
      ),
    ]),
  );
};
