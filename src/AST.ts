export class BooleanLiteral {
  type = "BooleanLiteral" as const;
  constructor(public value: boolean) {}
}

export class NullLiteral {
  type = "NullLiteral" as const;
}

export class StringLiteral {
  type = "StringLiteral" as const;
  constructor(public value: string) {}
}

export class NumericLiteral {
  type = "NumericLiteral" as const;
  constructor(public value: number) {}
}

export class Identifier {
  type = "Identifier" as const;
  constructor(public name: string) {}
}

export class LogicalExpression {
  type = "LogicalExpression" as const;
  parenthesized = false;
  constructor(
    public operator: string,
    public left: Expression,
    public right: Expression,
  ) {}
}

export class BinaryExpression {
  type = "BinaryExpression" as const;
  parenthesized = false;
  constructor(
    public operator: string,
    public left: Expression,
    public right: Expression,
  ) {}
}

export class AssignmentExpression {
  type = "AssignmentExpression" as const;
  parenthesized = false;
  constructor(
    public operator: string,
    public left: Expression,
    public right: Expression,
  ) {}
}

export class UnaryExpression {
  type = "UnaryExpression" as const;
  parenthesized = false;
  constructor(
    public operator: string,
    public argument: Expression,
  ) {}
}

export class MemberExpression {
  type = "MemberExpression" as const;
  constructor(
    public computed: boolean,
    public object: Expression,
    public property: Expression,
  ) {}
}

export class CallExpression {
  type = "CallExpression" as const;
  constructor(
    public callee: Expression,
    public args: Expression[] = [],
  ) {}
}

export class NewExpression {
  type = "NewExpression" as const;
  constructor(
    public callee: Expression,
    public args: Expression[],
  ) {}
}

export class ThisExpression {
  type = "ThisExpression" as const;
}

export class SuperExpression {
  type = "SuperExpression" as const;
}

export type Expression =
  | BooleanLiteral
  | NullLiteral
  | StringLiteral
  | NumericLiteral
  | Identifier
  | LogicalExpression
  | BinaryExpression
  | AssignmentExpression
  | UnaryExpression
  | MemberExpression
  | CallExpression
  | NewExpression
  | ThisExpression
  | SuperExpression;

// Statements

export class Program {
  type = "Program" as const;
  constructor(public body: Statement[]) {}
}

export class BlockStatement {
  type = "BlockStatement" as const;
  constructor(public body: Statement[]) {}
}

export class NewLine {
  type = "NewLine" as const;
}

export class Comment {
  type = "Comment" as const;
  constructor(public value: string, public multiline?: boolean) {}
}

export class EmptyStatement {
  type = "EmptyStatement" as const;
}

export class ExpressionStatement {
  type = "ExpressionStatement" as const;
  constructor(public expression: Expression) {}
}

export class VariableStatement {
  type = "VariableStatement" as const;
  constructor(
    public declarations: VariableDeclaration[],
    public isConstant = false,
  ) {}
}

export class VariableDeclaration {
  type = "VariableDeclaration" as const;
  constructor(
    public id: Identifier,
    public init: Expression | null,
  ) {}
}

export class IfStatement {
  type = "IfStatement" as const;
  constructor(
    public test: Expression,
    public consequent: Statement,
    public alternate: Statement | null,
  ) {}
}

export class WhileStatement {
  type = "WhileStatement" as const;
  constructor(
    public test: Expression,
    public body: Statement,
  ) {}
}

export class DoWhileStatement {
  type = "DoWhileStatement" as const;
  constructor(
    public body: Statement,
    public test: Expression,
  ) {}
}

export class ForStatement {
  type = "ForStatement" as const;
  constructor(
    public init: VariableStatement | ExpressionStatement | null,
    public test: Expression | null,
    public update: Expression | null,
    public body: Statement,
  ) {}
}

export class ContinueStatement {
  type = "ContinueStatement" as const;
}

export class BreakStatement {
  type = "BreakStatement" as const;
}

export class FunctionDeclaration {
  type = "FunctionDeclaration" as const;
  constructor(
    public name: Identifier,
    public params: Identifier[],
    public body: BlockStatement,
  ) {}
}

export class ReturnStatement {
  type = "ReturnStatement" as const;
  constructor(public argument: Expression | null) {}
}

export class ClassDeclaration {
  type = "ClassDeclaration" as const;
  constructor(
    public id: Identifier,
    public superClass: Identifier | null,
    public body: BlockStatement,
  ) {}
}

export type Statement =
  | Program
  | BlockStatement
  | NewLine
  | Comment
  | EmptyStatement
  | ExpressionStatement
  | VariableStatement
  | IfStatement
  | WhileStatement
  | DoWhileStatement
  | ForStatement
  | ContinueStatement
  | BreakStatement
  | FunctionDeclaration
  | ReturnStatement
  | ClassDeclaration;
