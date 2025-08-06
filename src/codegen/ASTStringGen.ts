import chalk from "npm:chalk";
import { Expression, Program, Statement, VariableDeclaration } from "../AST.ts";

function pad(depth: number) {
  return " ".repeat(depth * 2);
}

function n(str: string | TemplateStringsArray) {
  return chalk.blue(str);
}

function arg(str: string | TemplateStringsArray) {
  return chalk.dim.white(str);
}

function op(op: string | TemplateStringsArray) {
  return chalk.cyan(op);
}

function lit(lit: string | TemplateStringsArray) {
  return chalk.yellow(lit);
}

function mod(str: string | TemplateStringsArray) {
  return chalk.magenta(str);
}

function str(str: string | TemplateStringsArray) {
  return chalk.green(str);
}

function id(id: string | TemplateStringsArray) {
  return chalk.red(id);
}

export function toASTString(
  node?:
    | Program
    | Statement
    | Expression
    | VariableDeclaration,
  depth = 0,
): string {
  if (typeof node === "undefined") {
    return chalk.bgRedBright.black(" " + String(node).toUpperCase() + " ");
  }
  switch (node.type) {
    // Expressions
    case "NullLiteral":
      return lit("null");
    case "BooleanLiteral":
    case "NumericLiteral":
      return lit(node.value.toString());
    case "StringLiteral":
      return str(`"${node.value}"`);
    case "Identifier":
      return id(node.name);
    case "UnaryExpression": {
      let str = n(node.type) + "\n";
      str += pad(depth + 1) + arg`Operator: `;
      str += op(node.operator) + "\n";
      str += pad(depth + 1) + arg`Arg: `;
      str += toASTString(node.argument, depth + 1);
      return str;
    }
    case "LogicalExpression":
    case "BinaryExpression":
    case "AssignmentExpression": {
      let str = n(node.type + `(${op(node.operator)})`);
      str += "\n";
      str += pad(depth + 1) + arg`LHS: `;
      str += toASTString(node.left, depth + 1) + "\n";
      str += pad(depth + 1) + arg`RHS: `;
      str += toASTString(node.right, depth + 1);
      return str;
    }
    case "MemberExpression": {
      let str = n(node.type);
      str += n(node.computed ? `(${mod`Computed`})` : "") + "\n";
      str += pad(depth + 1) + arg`Object: `;
      str += toASTString(node.object, depth + 1) + "\n";
      str += pad(depth + 1) + arg`Property: `;
      str += toASTString(node.property, depth + 1);
      return str;
    }
    case "CallExpression": {
      let str = n(node.type) + "\n";
      str += pad(depth + 1) + arg`Callee: `;
      str += toASTString(node.callee, depth + 1);
      if (!node.args.length) return str;
      str += "\n";
      str += pad(depth + 1) + arg`Args: `;
      str += node.args.map((node) => toASTString(node, depth + 1))
        .join(", ");
      return str;
    }

    // Statements
    case "Program":
    case "BlockStatement": {
      if (!node.body.length) return n(node.type);
      let str = n(node.type) + "\n";
      str += node.body.map((node) =>
        pad(depth + 1) + toASTString(node, depth + 1)
      ).join("\n");
      return str;
    }
    case "Comment":
    case "NewLine":
    case "EmptyStatement":
      return chalk.dim(n(node.type));
    case "ExpressionStatement": {
      let str = n(node.type) + "\n";
      str += pad(depth + 1) + arg`Exp: `;
      str += toASTString(node.expression, depth + 1);
      return str;
    }
    case "VariableStatement": {
      let str = n(node.type);
      if (node.isConstant) {
        str += n`(`;
        str += [
          node.isConstant && mod`Const`,
        ].filter(Boolean).join(", ");
        str += n`)`;
      }
      str += "\n";
      str += pad(depth + 1) + arg`Decls:\n`;
      str += node.declarations.map((decl) => {
        return pad(depth + 2) + toASTString(decl, depth + 2);
      }).join("\n");
      return str;
    }
    case "VariableDeclaration": {
      let str = n(node.type + `(${id(node.id.name)})`);
      if (node.init) {
        str += "\n";
        str += pad(depth + 1) + arg`Init: `;
        str += toASTString(node.init, depth + 1);
      }
      return str;
    }
    case "IfStatement": {
      let str = n(node.type) + "\n";
      str += pad(depth + 1) + arg`Test: `;
      str += toASTString(node.test, depth + 1) + "\n";
      str += pad(depth + 1) + arg`Then: `;
      str += toASTString(node.consequent, depth + 1);
      if (node.alternate) {
        str += "\n";
        str += pad(depth + 1) + arg`Else: `;
        str += toASTString(node.alternate, depth + 1);
      }
      return str;
    }
    case "WhileStatement": {
      let str = n(node.type) + "\n";
      str += pad(depth + 1) + arg`Test: `;
      str += toASTString(node.test, depth + 1) + "\n";
      str += pad(depth + 1) + arg`Body: `;
      str += toASTString(node.body, depth + 1);
      return str;
    }
    case "DoWhileStatement": {
      let str = n(node.type) + "\n";
      str += pad(depth + 1) + arg`Body: `;
      str += toASTString(node.body, depth + 1) + "\n";
      str += pad(depth + 1) + arg`Test: `;
      str += toASTString(node.test, depth + 1);
      return str;
    }
    case "ForStatement": {
      let str = n(node.type) + "\n";
      if (node.init) {
        str += pad(depth + 1) + arg`Init: `;
        str += toASTString(node.init, depth + 1) + "\n";
      }
      if (node.test) {
        str += pad(depth + 1) + arg`Test: `;
        str += toASTString(node.test, depth + 1) + "\n";
      }
      if (node.update) {
        str += pad(depth + 1) + arg`Update: `;
        str += toASTString(node.update, depth + 1) + "\n";
      }
      str += pad(depth + 1) + arg`Body: `;
      str += toASTString(node.body, depth + 1);
      return str;
    }
    case "FunctionDeclaration": {
      let str = n(node.type);
      str += n`(`;
      str += id(node.name.name);
      str += n`)\n`;
      if (node.params.length) {
        str += pad(depth + 1) + arg`Params: `;
        str += node.params.map((p) => id(p.name)).join(", ") + "\n";
      }
      str += pad(depth + 1) + arg`Body: `;
      str += toASTString(node.body, depth + 1);
      return str;
    }
    case "ReturnStatement": {
      if (!node.argument) return n(node.type);
      let str = n(node.type) + "\n";
      str += pad(depth + 1) + arg`Arg: `;
      str += toASTString(node.argument, depth + 1);
      return str;
    }
    case "ClassDeclaration": {
      let str = n(node.type + `(${toASTString(node.id)})`) + "\n";
      if (node.superClass) {
        str += pad(depth + 1) + arg`Super: `;
        str += toASTString(node.superClass) + "\n";
      }
      str += pad(depth + 1) + arg`Body: `;
      str += toASTString(node.body, depth + 1);
      return str;
    }
    case "SuperExpression":
    case "ThisExpression": {
      return n(node.type);
    }
    case "NewExpression": {
      let str = n(node.type + `(${toASTString(node.callee)})`);
      if (!node.args.length) return str;
      str += "\n";
      str += pad(depth + 1) + arg`Args: `;
      str += node.args.map((node) => toASTString(node, depth + 1))
        .join(", ");
      return str;
    }
    default:
      // deno-lint-ignore no-explicit-any
      return chalk.red(`<${(node as any).type || "unknown"}>`);
  }
}
