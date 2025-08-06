/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  CallExpression,
  ExpressionStatement,
  Identifier,
  MemberExpression,
  Program,
} from "../src/AST.ts";

export default (test) => {
  test(
    `foo(x);`,
    new Program([
      new ExpressionStatement(
        new CallExpression(
          new Identifier("foo"),
          [new Identifier("x")],
        ),
      ),
    ]),
  );

  test(
    `foo(x)();`,
    new Program([
      new ExpressionStatement(
        new CallExpression(
          new CallExpression(
            new Identifier("foo"),
            [new Identifier("x")],
          ),
        ),
      ),
    ]),
  );

  test(
    `console.log(x, y);`,
    new Program([
      new ExpressionStatement(
        new CallExpression(
          new MemberExpression(
            false,
            new Identifier("console"),
            new Identifier("log"),
          ),
          [new Identifier("x"), new Identifier("y")],
        ),
      ),
    ]),
  );
};
