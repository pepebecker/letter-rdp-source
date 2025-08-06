// ----------------------------------------
// Default AST node factory

// Expressions
type ParenthesizedExprNode = {
  parenthesized?: boolean;
};
export type ExpressionNode =
  | NullLiteralNode
  | BooleanLiteralNode
  | NumericLiteralNode
  | StringLiteralNode
  | IdentifierNode
  | LogicalExpressionNode
  | BinaryExpressionNode
  | AssignmentExpressionNode
  | UnaryExpressionNode
  | MemberExpressionNode
  | CallExpressionNode
  | NewExpressionNode
  | ThisExpressionNode
  | SuperNode;
export type NullLiteralNode = {
  type: "NullLiteral";
};
export type BooleanLiteralNode = {
  type: "BooleanLiteral";
  value: boolean;
};
export type NumericLiteralNode = {
  type: "NumericLiteral";
  value: number;
};
export type StringLiteralNode = {
  type: "StringLiteral";
  value: string;
};
export type IdentifierNode = {
  type: "Identifier";
  name: string;
};
export type LogicalExpressionNode = ParenthesizedExprNode & {
  type: "LogicalExpression";
  operator: string;
  left: ExpressionNode;
  right: ExpressionNode;
};
export type BinaryExpressionNode = ParenthesizedExprNode & {
  type: "BinaryExpression";
  operator: string;
  left: ExpressionNode;
  right: ExpressionNode;
};
export type AssignmentExpressionNode = ParenthesizedExprNode & {
  type: "AssignmentExpression";
  operator: string;
  left: ExpressionNode;
  right: ExpressionNode;
};
export type UnaryExpressionNode = {
  type: "UnaryExpression";
  operator: string;
  argument: ExpressionNode;
};
export type MemberExpressionNode = {
  type: "MemberExpression";
  computed: boolean;
  object: ExpressionNode;
  property: ExpressionNode;
};
export type CallExpressionNode = {
  type: "CallExpression";
  callee: ExpressionNode;
  arguments: ExpressionNode[];
};
export type NewExpressionNode = {
  type: "NewExpression";
  callee: ExpressionNode;
  arguments: ExpressionNode[];
};
export type ThisExpressionNode = {
  type: "ThisExpression";
};
export type SuperNode = {
  type: "Super";
};

// Statements
export type StatementNode =
  | ProgramNode
  | BlockStatementNode
  | NewLineNode
  | CommentNode
  | EmptyStatementNode
  | ExpressionStatementNode
  | VariableStatementNode
  | IfStatementNode
  | WhileStatementNode
  | DoWhileStatementNode
  | ForStatementNode
  | ContinueStatementNode
  | BreakStatementNode
  | FunctionDeclarationNode
  | ReturnStatementNode
  | ClassDeclarationNode;
export type ProgramNode = {
  type: "Program";
  body: StatementNode[];
};
export type BlockStatementNode = {
  type: "BlockStatement";
  body: StatementNode[];
};
export type NewLineNode = {
  type: "NewLine";
};
export type CommentNode = {
  type: "Comment";
  value: string;
  multiline?: boolean;
};
export type EmptyStatementNode = {
  type: "EmptyStatement";
};
export type ExpressionStatementNode = {
  type: "ExpressionStatement";
  expression: ExpressionNode;
};
export type VariableStatementNode = {
  type: "VariableStatement";
  declarations: VariableDeclarationNode[];
  isConstant?: boolean;
};
export type VariableDeclarationNode = {
  type: "VariableDeclaration";
  id: IdentifierNode;
  init: ExpressionNode | null;
};
export type IfStatementNode = {
  type: "IfStatement";
  test: ExpressionNode;
  consequent: StatementNode;
  alternate: StatementNode | null;
};
export type WhileStatementNode = {
  type: "WhileStatement";
  test: ExpressionNode;
  body: StatementNode;
};
export type DoWhileStatementNode = {
  type: "DoWhileStatement";
  body: StatementNode;
  test: ExpressionNode;
};
export type ForStatementNode = {
  type: "ForStatement";
  init: VariableStatementNode | ExpressionStatementNode | null;
  test: ExpressionNode | null;
  update: ExpressionNode | null;
  body: StatementNode;
};
export type ContinueStatementNode = {
  type: "ContinueStatement";
};
export type BreakStatementNode = {
  type: "BreakStatement";
};
export type FunctionDeclarationNode = {
  type: "FunctionDeclaration";
  name: IdentifierNode;
  params: IdentifierNode[];
  body: BlockStatementNode;
};
export type ReturnStatementNode = {
  type: "ReturnStatement";
  argument: ExpressionNode | null;
};
export type ClassDeclarationNode = {
  type: "ClassDeclaration";
  id: IdentifierNode;
  superClass: IdentifierNode | null;
  body: BlockStatementNode;
};

const ASTNodeFactory = {
  // Expressions
  BooleanLiteral(value: boolean): BooleanLiteralNode {
    return {
      type: "BooleanLiteral",
      value,
    };
  },
  NullLiteral(): NullLiteralNode {
    return {
      type: "NullLiteral",
    };
  },
  StringLiteral(value: string): StringLiteralNode {
    return {
      type: "StringLiteral",
      value,
    };
  },
  NumericLiteral(value: number): NumericLiteralNode {
    return {
      type: "NumericLiteral",
      value,
    };
  },
  Identifier(name: string): IdentifierNode {
    return {
      type: "Identifier",
      name,
    };
  },
  LogicalExpression(
    operator: string,
    left: ExpressionNode,
    right: ExpressionNode,
  ): LogicalExpressionNode {
    return {
      type: "LogicalExpression",
      operator,
      left,
      right,
    };
  },
  BinaryExpression(
    operator: string,
    left: ExpressionNode,
    right: ExpressionNode,
  ): BinaryExpressionNode {
    return {
      type: "BinaryExpression",
      operator,
      left,
      right,
    };
  },
  AssignmentExpression(
    operator: string,
    left: ExpressionNode,
    right: ExpressionNode,
  ): AssignmentExpressionNode {
    return {
      type: "AssignmentExpression",
      operator,
      left,
      right,
    };
  },
  UnaryExpression(
    operator: string,
    argument: ExpressionNode,
  ): UnaryExpressionNode {
    return {
      type: "UnaryExpression",
      operator,
      argument,
    };
  },
  MemberExpression(
    computed: boolean,
    object: ExpressionNode,
    property: ExpressionNode,
  ): MemberExpressionNode {
    return {
      type: "MemberExpression",
      computed,
      object,
      property,
    };
  },
  CallExpression(
    callee: ExpressionNode,
    args: ExpressionNode[],
  ): CallExpressionNode {
    return {
      type: "CallExpression",
      callee,
      arguments: args,
    };
  },
  NewExpression(
    callee: ExpressionNode,
    args: ExpressionNode[],
  ): NewExpressionNode {
    return {
      type: "NewExpression",
      callee,
      arguments: args,
    };
  },
  ThisExpression(): ThisExpressionNode {
    return {
      type: "ThisExpression",
    };
  },
  Super(): SuperNode {
    return {
      type: "Super",
    };
  },

  // Statements
  Program(body: StatementNode[]): ProgramNode {
    return {
      type: "Program",
      body,
    };
  },
  BlockStatement(body: StatementNode[]): BlockStatementNode {
    return {
      type: "BlockStatement",
      body,
    };
  },
  NewLine(): NewLineNode {
    return {
      type: "NewLine",
    };
  },
  Comment(value: string): CommentNode {
    return {
      type: "Comment",
      value,
      multiline: value.includes("/*"),
    };
  },
  EmptyStatement(): EmptyStatementNode {
    return {
      type: "EmptyStatement",
    };
  },
  ExpressionStatement(
    expression: ExpressionNode,
  ): ExpressionStatementNode {
    return {
      type: "ExpressionStatement",
      expression,
    };
  },
  VariableStatement(
    declarations: VariableDeclarationNode[],
    isConstant?: boolean,
  ): VariableStatementNode {
    const node: VariableStatementNode = {
      type: "VariableStatement",
      declarations,
    };
    if (isConstant) node.isConstant = isConstant;
    return node;
  },
  VariableDeclaration(
    id: IdentifierNode,
    init: ExpressionNode | null,
  ): VariableDeclarationNode {
    return {
      type: "VariableDeclaration",
      id,
      init,
    };
  },
  IfStatement(
    test: ExpressionNode,
    consequent: StatementNode,
    alternate: StatementNode | null,
  ): IfStatementNode {
    return {
      type: "IfStatement",
      test,
      consequent,
      alternate,
    };
  },
  WhileStatement(
    test: ExpressionNode,
    body: StatementNode,
  ): WhileStatementNode {
    return {
      type: "WhileStatement",
      test,
      body,
    };
  },
  DoWhileStatement(
    body: StatementNode,
    test: ExpressionNode,
  ): DoWhileStatementNode {
    return {
      type: "DoWhileStatement",
      body,
      test,
    };
  },
  ForStatement(
    init: VariableStatementNode | ExpressionStatementNode | null,
    test: ExpressionNode | null,
    update: ExpressionNode | null,
    body: StatementNode,
  ): ForStatementNode {
    return {
      type: "ForStatement",
      init,
      test,
      update,
      body,
    };
  },
  ContinueStatement(): ContinueStatementNode {
    return {
      type: "ContinueStatement",
    };
  },
  BreakStatement(): BreakStatementNode {
    return {
      type: "BreakStatement",
    };
  },
  FunctionDeclaration(
    name: IdentifierNode,
    params: IdentifierNode[],
    body: BlockStatementNode,
  ): FunctionDeclarationNode {
    return {
      type: "FunctionDeclaration",
      name,
      params,
      body,
    };
  },
  ReturnStatement(argument: ExpressionNode | null): ReturnStatementNode {
    return {
      type: "ReturnStatement",
      argument,
    };
  },
  ClassDeclaration(
    name: IdentifierNode,
    superClass: IdentifierNode | null,
    body: BlockStatementNode,
  ): ClassDeclarationNode {
    return {
      type: "ClassDeclaration",
      id: name,
      superClass,
      body,
    };
  },
};

export const factory = ASTNodeFactory;
