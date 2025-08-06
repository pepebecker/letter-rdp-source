import chalk from "npm:chalk";
import stripAnsi from "npm:strip-ansi";
import {
  AssignmentExpressionNode,
  BinaryExpressionNode,
  BlockStatementNode,
  CallExpressionNode,
  ClassDeclarationNode,
  DoWhileStatementNode,
  ExpressionNode,
  ForStatementNode,
  FunctionDeclarationNode,
  IfStatementNode,
  LogicalExpressionNode,
  MemberExpressionNode,
  NewExpressionNode,
  ProgramNode,
  ReturnStatementNode,
  StatementNode,
  UnaryExpressionNode,
  VariableDeclarationNode,
  VariableStatementNode,
  WhileStatementNode,
} from "../AST.ts";

function pad(depth: number) {
  return " ".repeat(depth * 2);
}

function kw(kw: string | TemplateStringsArray) {
  return chalk.magenta(kw);
}

function op(op: string | TemplateStringsArray) {
  return chalk.cyan(op);
}

function sym(sym: string | TemplateStringsArray) {
  return chalk.dim(sym);
}

function lit(lit: string | TemplateStringsArray) {
  return chalk.yellow(lit);
}

function str(str: string | TemplateStringsArray) {
  return chalk.green(str);
}

function id(id: string | TemplateStringsArray) {
  return chalk.red(id);
}

interface ToStringOptions {
  semi?: boolean;
}

export function toCodeString(
  node: ProgramNode | StatementNode | ExpressionNode | null,
  depth = 0,
  options: ToStringOptions = {},
): string {
  if (!node) return "";
  switch (node.type) {
    // Expressions
    case "NullLiteral":
      return lit("null");
    case "BooleanLiteral":
      return lit(node.value.toString());
    case "NumericLiteral":
      return lit(node.value.toString());
    case "StringLiteral":
      return str(`"${node.value}"`);
    case "Identifier":
      return id(node.name);
    case "UnaryExpression":
      return unaryExpressionToString(node);
    case "LogicalExpression":
      return binaryExpressionToString(node);
    case "BinaryExpression":
      return binaryExpressionToString(node);
    case "AssignmentExpression":
      return assignmentExpressionToString(node);
    case "CallExpression":
      return callExpressionToString(node, depth);
    case "NewExpression":
      return newExpressionToString(node, depth);
    case "MemberExpression":
      return memberExpressionToString(node, depth);
    case "ThisExpression":
      return kw`this`;
    case "Super":
      return kw`super`;

    // Statements
    case "Program":
      return programToString(node);
    case "Comment":
      return pad(depth) + chalk.dim.italic(node.value);
    case "NewLine":
      return "";
    case "EmptyStatement":
      return sym`;`;
    case "ExpressionStatement":
      return pad(depth) + toCodeString(node.expression, depth) + sym`;`;
    case "BlockStatement":
      return blockToString(node, depth);
    case "VariableStatement":
      return variableStatementToString(node, depth, options);
    case "IfStatement":
      return ifStatementToString(node, depth);
    case "WhileStatement":
      return whileStatementToString(node, depth);
    case "DoWhileStatement":
      return doWhileStatementToString(node, depth);
    case "ForStatement":
      return forStatementToString(node, depth);
    case "FunctionDeclaration":
      return functionDeclarationToString(node, depth);
    case "ReturnStatement":
      return returnStatementToString(node, depth);
    case "ClassDeclaration":
      return classDeclarationToString(node, depth);
    default:
      // deno-lint-ignore no-explicit-any
      return `<${(node as any).type || "unknown"}>`;
  }
}

// --- Expressions ---

function unaryExpressionToString(node: UnaryExpressionNode) {
  const argument = toCodeString(node.argument, 0);
  return `${op(node.operator)}${argument}`;
}

function binaryExpressionToString(
  node: BinaryExpressionNode | LogicalExpressionNode,
) {
  const left = toCodeString(node.left, 0);
  const right = toCodeString(node.right, 0);
  const expr = `${left} ${op(node.operator)} ${right}`;
  if (node.parenthesized) return sym`(` + expr + sym`)`;
  return expr;
}

function assignmentExpressionToString(node: AssignmentExpressionNode) {
  const left = toCodeString(node.left, 0);
  const right = toCodeString(node.right, 0);
  return `${left} ${op(node.operator)} ${right}`;
}

// --- Statements ---

function programToString(node: ProgramNode) {
  return node.body.map((node) => toCodeString(node, 0)).join("\n");
}

function variableStatementToString(
  node: VariableStatementNode,
  depth = 0,
  options: ToStringOptions = {},
): string {
  const decls = declarationListToString(node.declarations);
  const semi = (options.semi ?? true) ? sym`;` : "";
  if (node.isConstant) return pad(depth) + kw`let ` + decls + semi;
  return pad(depth) + kw`var ` + decls + semi;
}

function declarationListToString(decls: VariableDeclarationNode[]) {
  return decls
    .map((d) => `${d.id.name} ${op`=`} ${toCodeString(d.init, 0)}`)
    .join(", ");
}

function blockToString(block: BlockStatementNode, depth = 0) {
  if (!block.body.length) return pad(depth) + sym`\{\}`;
  return [
    pad(depth) + sym`\{`,
    statementListToString(block.body, depth + 1),
    pad(depth) + sym`\}`,
  ].join("\n");
}

function statementListToString(stmts: StatementNode[], depth = 0) {
  if (!stmts.length) return pad(depth);
  return stmts.map((node) => toCodeString(node, depth)).join("\n");
}

function ifStatementToString(
  node: IfStatementNode,
  depth = 0,
) {
  let str = pad(depth) + kw`if`;
  str += sym` (`;
  str += toCodeString(node.test, depth);
  str += sym`)`;
  str += maybeBlockToString(node.consequent, depth);
  if (node.alternate) {
    if (stripAnsi(str).trim().at(-1) === "}") str += kw` else`;
    else str += "\n" + pad(depth) + kw`else`;
    str += maybeBlockToString(node.alternate, depth);
  }
  return str;
}

function maybeBlockToString(node: StatementNode, depth = 0) {
  if (node.type !== "BlockStatement") {
    return `\n${toCodeString(node, depth + 1)}`;
  }
  const stmts = statementListToString(node.body, depth + 1);
  return ` ${sym`\{`}\n${stmts}\n${pad(depth)}${sym`\}`}`;
}

function whileStatementToString(node: WhileStatementNode, depth = 0) {
  let str = pad(depth) + kw`while`;
  str += sym` (`;
  str += toCodeString(node.test, depth);
  str += sym`)`;
  str += maybeBlockToString(node.body, depth);
  return str;
}

function doWhileStatementToString(node: DoWhileStatementNode, depth = 0) {
  let str = pad(depth) + kw`do`;
  str += maybeBlockToString(node.body, depth);
  str += kw` while`;
  str += sym` (`;
  str += toCodeString(node.test, depth);
  str += sym`);`;
  return str;
}

function forStatementToString(node: ForStatementNode, depth = 0) {
  let str = pad(depth) + kw`for`;
  str += sym` (`;
  str += node.init ? `${toCodeString(node.init, 0, { semi: false })};` : ";";
  str += node.test ? ` ${toCodeString(node.test, depth)};` : ";";
  str += node.update ? ` ${toCodeString(node.update, depth)}` : "";
  str += sym`)`;
  str += maybeBlockToString(node.body, depth);
  return str;
}

function functionDeclarationToString(node: FunctionDeclarationNode, depth = 0) {
  let str = pad(depth) + kw`def `;
  str += id(node.name.name);
  str += sym`(`;
  str += node.params.map((p) => id(p.name)).join(", ");
  str += sym`)`;
  str += maybeBlockToString(node.body, depth);
  return str;
}

function returnStatementToString(node: ReturnStatementNode, depth = 0) {
  let str = pad(depth) + kw`return`;
  str += node.argument ? ` ${toCodeString(node.argument, depth)}` : "";
  str += sym`;`;
  return str;
}

function callExpressionToString(node: CallExpressionNode, depth = 0) {
  let str = toCodeString(node.callee, depth);
  str += sym`(`;
  str += node.arguments.map((arg) => toCodeString(arg, depth)).join(", ");
  str += sym`)`;
  return str;
}

function memberExpressionToString(node: MemberExpressionNode, depth = 0) {
  let str = toCodeString(node.object, depth);
  str += node.computed ? sym`[` : sym`.`;
  str += toCodeString(node.property);
  if (node.computed) str += sym`]`;
  return str;
}

function classDeclarationToString(node: ClassDeclarationNode, depth = 0) {
  let str = pad(depth) + kw`class `;
  str += id(node.id.name);
  str += maybeBlockToString(node.body, depth);
  return str;
}

function newExpressionToString(node: NewExpressionNode, depth = 0) {
  let str = pad(depth) + kw`new `;
  str += toCodeString(node.callee, depth);
  str += sym`(`;
  str += node.arguments.map((arg) => toCodeString(arg, depth)).join(", ");
  str += sym`)`;
  return str;
}
