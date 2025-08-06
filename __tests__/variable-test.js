/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import {
  Identifier,
  NumericLiteral,
  Program,
  VariableDeclaration,
  VariableStatement,
} from "../src/AST.ts";

export default (test) => {
  // Simple variable declaration:
  test(
    `let x = 42;`,
    new Program([
      new VariableStatement(
        [
          new VariableDeclaration(
            new Identifier("x"),
            new NumericLiteral(42),
          ),
        ],
        true,
      ),
    ]),
  );

  // Variable declaration, no init:
  test(
    `var x;`,
    new Program([
      new VariableStatement(
        [
          new VariableDeclaration(
            new Identifier("x"),
            null,
          ),
        ],
      ),
    ]),
  );

  // Multiple variable declarations, no init:
  test(
    `var x, y;`,
    new Program([
      new VariableStatement(
        [
          new VariableDeclaration(
            new Identifier("x"),
            null,
          ),
          new VariableDeclaration(
            new Identifier("y"),
            null,
          ),
        ],
      ),
    ]),
  );

  // Multiple variable declarations:
  test(
    `var x, y = 42;`,
    new Program([
      new VariableStatement(
        [
          new VariableDeclaration(
            new Identifier("x"),
            null,
          ),
          new VariableDeclaration(
            new Identifier("y"),
            new NumericLiteral(42),
          ),
        ],
      ),
    ]),
  );
};
