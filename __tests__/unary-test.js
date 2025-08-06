/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  ExpressionStatement,
  Identifier,
  Program,
  UnaryExpression,
} from "../src/AST.ts";

export default (test) => {
  test(
    "-x;",
    new Program([
      new ExpressionStatement(
        new UnaryExpression(
          "-",
          new Identifier("x"),
        ),
      ),
    ]),
  );

  test(
    "!x;",
    new Program([
      new ExpressionStatement(new UnaryExpression("!", new Identifier("x"))),
    ]),
  );
};
