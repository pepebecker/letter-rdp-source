// ----------------------------------------
// Default AST node factory

const ASTNodeFactory = {
  // Expressions
  BooleanLiteral(value) {
    return {
      type: "BooleanLiteral",
      value,
    };
  },
  NullLiteral() {
    return {
      type: "NullLiteral",
    };
  },
  StringLiteral(value) {
    return {
      type: "StringLiteral",
      value,
    };
  },
  NumericLiteral(value) {
    return {
      type: "NumericLiteral",
      value,
    };
  },
  Identifier(name) {
    return {
      type: "Identifier",
      name,
    };
  },
  LogicalExpression(operator, left, right) {
    return {
      type: "LogicalExpression",
      operator,
      left,
      right,
    };
  },
  BinaryExpression(operator, left, right) {
    return {
      type: "BinaryExpression",
      operator,
      left,
      right,
    };
  },
  AssignmentExpression(operator, left, right) {
    return {
      type: "AssignmentExpression",
      operator,
      left,
      right,
    };
  },
  UnaryExpression(operator, argument) {
    return {
      type: "UnaryExpression",
      operator,
      argument,
    };
  },
  MemberExpression(computed, object, property) {
    return {
      type: "MemberExpression",
      computed,
      object,
      property,
    };
  },
  CallExpression(callee, args) {
    return {
      type: "CallExpression",
      callee,
      arguments: args,
    };
  },
  NewExpression(callee, args) {
    return {
      type: "NewExpression",
      callee,
      arguments: args,
    };
  },
  ThisExpression() {
    return {
      type: "ThisExpression",
    };
  },
  Super() {
    return {
      type: "Super",
    };
  },

  // Statements
  Program(body) {
    return {
      type: "Program",
      body,
    };
  },
  BlockStatement(body) {
    return {
      type: "BlockStatement",
      body,
    };
  },
  NewLine() {
    return {
      type: "NewLine",
    };
  },
  Comment(value) {
    return {
      type: "Comment",
      value,
      multiline: value.includes("/*"),
    };
  },
  EmptyStatement() {
    return {
      type: "EmptyStatement",
    };
  },
  ExpressionStatement(expression) {
    return {
      type: "ExpressionStatement",
      expression,
    };
  },
  VariableStatement(declarations) {
    return {
      type: "VariableStatement",
      declarations,
    };
  },
  VariableDeclaration(id, init) {
    return {
      type: "VariableDeclaration",
      id,
      init,
    };
  },
  IfStatement(test, consequent, alternate) {
    return {
      type: "IfStatement",
      test,
      consequent,
      alternate,
    };
  },
  WhileStatement(test, body) {
    return {
      type: "WhileStatement",
      test,
      body,
    };
  },
  DoWhileStatement(body, test) {
    return {
      type: "DoWhileStatement",
      body,
      test,
    };
  },
  ForStatement(init, test, update, body) {
    return {
      type: "ForStatement",
      init,
      test,
      update,
      body,
    };
  },
  ContinueStatement() {
    return {
      type: "ContinueStatement",
    };
  },
  BreakStatement() {
    return {
      type: "BreakStatement",
    };
  },
  FunctionDeclaration(name, params, body) {
    return {
      type: "FunctionDeclaration",
      name,
      params,
      body,
    };
  },
  ReturnStatement(argument) {
    return {
      type: "ReturnStatement",
      argument,
    };
  },
  ClassDeclaration(id, superClass, body) {
    return {
      type: "ClassDeclaration",
      id,
      superClass,
      body,
    };
  },
};

export const factory = ASTNodeFactory;
