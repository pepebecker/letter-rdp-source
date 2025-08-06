/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  BinaryExpression,
  BlockStatement,
  FunctionDeclaration,
  Identifier,
  Program,
  ReturnStatement,
} from "../src/AST.ts";

export default (test) => {
  test(
    `
    fn square(x) {
      return x * x;
    }
    `,
    new Program([
      new FunctionDeclaration(
        new Identifier("square"),
        [new Identifier("x")],
        new BlockStatement([
          new ReturnStatement(
            new BinaryExpression(
              "*",
              new Identifier("x"),
              new Identifier("x"),
            ),
          ),
        ]),
      ),
    ]),
  );

  test(
    `
    fn empty() {
      return;
    }
    `,
    new Program([
      new FunctionDeclaration(
        new Identifier("empty"),
        [],
        new BlockStatement([
          new ReturnStatement(null),
        ]),
      ),
    ]),
  );
};
