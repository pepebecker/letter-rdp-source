/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

export default (test) => {
  // Simple variable declaration:
  test(`let x = 42;`, {
    type: "Program",
    body: [
      {
        type: "VariableStatement",
        isConstant: true,
        declarations: [
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "x",
            },
            init: {
              type: "NumericLiteral",
              value: 42,
            },
          },
        ],
      },
    ],
  });

  // Variable declaration, no init:
  test(`var x;`, {
    type: "Program",
    body: [
      {
        type: "VariableStatement",
        declarations: [
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "x",
            },
            init: null,
          },
        ],
      },
    ],
  });

  // Multiple variable declarations, no init:
  test(`var x, y;`, {
    type: "Program",
    body: [
      {
        type: "VariableStatement",
        declarations: [
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "x",
            },
            init: null,
          },
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "y",
            },
            init: null,
          },
        ],
      },
    ],
  });

  // Multiple variable declarations:
  test(`var x, y = 42;`, {
    type: "Program",
    body: [
      {
        type: "VariableStatement",
        declarations: [
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "x",
            },
            init: null,
          },
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "y",
            },
            init: {
              type: "NumericLiteral",
              value: 42,
            },
          },
        ],
      },
    ],
  });
};
