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
  CallExpression,
  ClassDeclaration,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  MemberExpression,
  NewExpression,
  NumericLiteral,
  Program,
  ReturnStatement,
  SuperExpression,
  ThisExpression,
} from "../src/AST.ts";

export default (test) => {
  test(
    `
    class Point {
      fn constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      fn calc() {
        return this.x + this.y;
      }
    }

    `,
    new Program([
      new ClassDeclaration(
        new Identifier("Point"),
        null,
        new BlockStatement([
          new FunctionDeclaration(
            new Identifier("constructor"),
            [
              new Identifier("x"),
              new Identifier("y"),
            ],
            new BlockStatement(
              [
                new ExpressionStatement(
                  new AssignmentExpression(
                    "=",
                    new MemberExpression(
                      false,
                      new ThisExpression(),
                      new Identifier("x"),
                    ),
                    new Identifier("x"),
                  ),
                ),
                new ExpressionStatement(
                  new AssignmentExpression(
                    "=",
                    new MemberExpression(
                      false,
                      new ThisExpression(),
                      new Identifier("y"),
                    ),
                    new Identifier("y"),
                  ),
                ),
              ],
            ),
          ),
          new FunctionDeclaration(
            new Identifier("calc"),
            [],
            new BlockStatement([
              new ReturnStatement(
                new BinaryExpression(
                  "+",
                  new MemberExpression(
                    false,
                    new ThisExpression(),
                    new Identifier("x"),
                  ),
                  new MemberExpression(
                    false,
                    new ThisExpression(),
                    new Identifier("y"),
                  ),
                ),
              ),
            ]),
          ),
        ]),
      ),
    ]),
  );

  // Child class:

  test(
    `
    class Point3D extends Point {
      fn constructor(x, y, z) {
        super(x, y);
        this.z = z;
      }
      fn calc() {
        return super() + this.z;
      }
    }
    `,
    new Program([
      new ClassDeclaration(
        new Identifier("Point3D"),
        new Identifier("Point"),
        new BlockStatement([
          new FunctionDeclaration(
            new Identifier("constructor"),
            [
              new Identifier("x"),
              new Identifier("y"),
              new Identifier("z"),
            ],
            new BlockStatement(
              [
                new ExpressionStatement(
                  new CallExpression(
                    new SuperExpression(),
                    [new Identifier("x"), new Identifier("y")],
                  ),
                ),
                new ExpressionStatement(
                  new AssignmentExpression(
                    "=",
                    new MemberExpression(
                      false,
                      new ThisExpression(),
                      new Identifier("z"),
                    ),
                    new Identifier("z"),
                  ),
                ),
              ],
            ),
          ),
          new FunctionDeclaration(
            new Identifier("calc"),
            [],
            new BlockStatement([
              new ReturnStatement(
                new BinaryExpression(
                  "+",
                  new CallExpression(
                    new SuperExpression(),
                    [],
                  ),
                  new MemberExpression(
                    false,
                    new ThisExpression(),
                    new Identifier("z"),
                  ),
                ),
              ),
            ]),
          ),
        ]),
      ),
    ]),
  );

  // New expression:

  test(
    `new Point3D(10, 20, 30);`,
    new Program([
      new ExpressionStatement(
        new NewExpression(
          new Identifier("Point3D"),
          [
            new NumericLiteral(10),
            new NumericLiteral(20),
            new NumericLiteral(30),
          ],
        ),
      ),
    ]),
  );
};
