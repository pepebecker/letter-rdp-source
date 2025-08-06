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
  MemberExpression,
  NumericLiteral,
  Program,
  StringLiteral,
} from "../src/AST.ts";

export default (test) => {
  test(
    `x.y;`,
    new Program([
      new ExpressionStatement(
        new MemberExpression(
          false,
          new Identifier("x"),
          new Identifier("y"),
        ),
      ),
    ]),
  );

  test(
    `x.y = 1;`,
    new Program([
      new ExpressionStatement(
        new AssignmentExpression(
          "=",
          new MemberExpression(
            false,
            new Identifier("x"),
            new Identifier("y"),
          ),
          new NumericLiteral(1),
        ),
      ),
    ]),
  );

  test(
    `x[0] = 1;`,
    new Program([
      new ExpressionStatement(
        new AssignmentExpression(
          "=",
          new MemberExpression(
            true,
            new Identifier("x"),
            new NumericLiteral(0),
          ),
          new NumericLiteral(1),
        ),
      ),
    ]),
  );

  test(
    `a.b.c['d'];`,
    new Program([
      new ExpressionStatement(
        new MemberExpression(
          true,
          new MemberExpression(
            false,
            new MemberExpression(
              false,
              new Identifier("a"),
              new Identifier("b"),
            ),
            new Identifier("c"),
          ),
          new StringLiteral("d"),
        ),
      ),
    ]),
  );
};
