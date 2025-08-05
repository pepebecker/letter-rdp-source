/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

export default test => {
  test('-x;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'UnaryExpression',
          operator: '-',
          argument: {
            type: 'Identifier',
            name: 'x',
          },
        },
      },
    ],
  });

  test('!x;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'UnaryExpression',
          operator: '!',
          argument: {
            type: 'Identifier',
            name: 'x',
          },
        },
      },
    ],
  });
};
