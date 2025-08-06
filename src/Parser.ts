/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

/**
 * Letter parser: recursive descent implementation.
 */

import { Tokenizer } from "./Tokenizer.ts";
import {
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  BooleanLiteral,
  BreakStatement,
  CallExpression,
  ClassDeclaration,
  ContinueStatement,
  DoWhileStatement,
  EmptyStatement,
  Expression,
  ExpressionStatement,
  ForStatement,
  FunctionDeclaration,
  Identifier,
  IfStatement,
  LogicalExpression,
  MemberExpression,
  NewExpression,
  NullLiteral,
  NumericLiteral,
  Program,
  ReturnStatement,
  Statement,
  StringLiteral,
  SuperExpression,
  ThisExpression,
  UnaryExpression,
  VariableDeclaration,
  VariableStatement,
  WhileStatement,
} from "./AST.ts";
import { OperatorType, Token, TokenType } from "./Token.ts";

export class Parser {
  _string: string;
  _tokenizer: Tokenizer;
  _lookahead: Token | null;

  /**
   * Initializes the parser.
   */
  constructor() {
    this._string = "";
    this._tokenizer = new Tokenizer();
    this._lookahead = null;
  }

  /**
   * Parses a string into an AST.
   */
  parse(string: string) {
    this._string = string;
    this._tokenizer.init(string);

    // Prime the tokenizer to obtain the first
    // token which is our lookahead. The lookahead is
    // used for predictive parsing.

    this._lookahead = this._tokenizer.getNextToken();
    if (this._lookahead === null) return new Program([]);

    // Parse recursively starting from the main
    // entry point, the Program:

    return this.Program();
  }

  /**
   * Main entry point.
   *
   * Program
   *   : StatementList
   *   ;
   */
  Program() {
    return new Program(this.StatementList());
  }

  /**
   * StatementList
   *   : Statement
   *   | StatementList Statement -> Statement Statement Statement Statement
   *   ;
   */
  StatementList(stopLookahead: string | null = null) {
    const statements = [this.Statement()];
    while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
      statements.push(this.Statement());
    }
    return statements;
  }

  /**
   * Statement
   *   : ExpressionStatement
   *   | BlockStatement
   *   | EmptyStatement
   *   | VariableStatement
   *   | IfStatement
   *   | IterationStatement
   *   | BreakStatement
   *   | ContinueStatement
   *   | FunctionDeclaration
   *   | ReturnStatement
   *   | ClassDeclaration
   *   ;
   */
  Statement(): Statement {
    switch (this._lookahead?.type) {
      case ";":
        return this.EmptyStatement();
      case "{":
        return this.BlockStatement();
      case "let":
      case "var":
        return this.VariableStatement();
      case "if":
        return this.IfStatement();
      case "while":
      case "do":
      case "for":
        return this.IterationStatement();
      case "break":
        return this.BreakStatement();
      case "continue":
        return this.ContinueStatement();
      case "fn":
        return this.FunctionDeclaration();
      case "return":
        return this.ReturnStatement();
      case "class":
        return this.ClassDeclaration();
      default:
        return this.ExpressionStatement();
    }
  }

  /**
   * ClassDeclaration
   *   : 'class' Identifier OptClassExtends BlockStatement
   *   ;
   */
  ClassDeclaration() {
    this._eat("class");

    const id = this.Identifier();

    const superClass = this._lookahead?.type === "extends"
      ? this.ClassExtends()
      : null;

    const body = this.BlockStatement();

    return new ClassDeclaration(id, superClass, body);
  }

  /**
   * ClassExtends
   *   : 'extends' Identifier
   *   ;
   */
  ClassExtends() {
    this._eat("extends");
    return this.Identifier();
  }

  /**
   * FunctionDeclaration
   *   : 'fn' Identifier '(' OptFormalParameterList ')' BlockStatement
   *   ;
   */
  FunctionDeclaration() {
    this._eat("fn");
    const name = this.Identifier();

    this._eat("(");

    const params = this._lookahead?.type !== ")"
      ? this.FormalParameterList()
      : [];

    this._eat(")");

    const body = this.BlockStatement();

    return new FunctionDeclaration(name, params, body);
  }

  /**
   * FormalParameterList
   *   : Identifier
   *   | FormalParameterList ',' Identifier
   *   ;
   */
  FormalParameterList() {
    const params = Array<Identifier>();

    do {
      params.push(this.Identifier());
    } while (this._lookahead?.type === "," && this._eat(","));

    return params;
  }

  /**
   * ReturnStatement
   *   : 'return' OptExpression ';'
   *   ;
   */
  ReturnStatement() {
    this._eat("return");
    const argument = this._lookahead?.type !== ";" ? this.Expression() : null;
    this._eat(";");
    return new ReturnStatement(argument);
  }

  /**
   * IterationStatement
   *   : WhileStatement
   *   | DoWhileStatement
   *   | ForStatement
   *   ;
   */
  IterationStatement() {
    switch (this._lookahead?.type) {
      case "while":
        return this.WhileStatement();
      case "do":
        return this.DoWhileStatement();
      case "for":
        return this.ForStatement();
    }
    throw new SyntaxError("Unexpected iteration productuon");
  }

  /**
   * WhileStatement
   *   : 'while' '(' Expression ')' Statement
   *   ;
   */
  WhileStatement() {
    this._eat("while");

    this._eat("(");
    const test = this.Expression();
    this._eat(")");

    const body = this.Statement();

    return new WhileStatement(test, body);
  }

  /**
   * DoWhileStatement
   *   : 'do' Statement 'while' '(' Expression ')' ';'
   *   ;
   */
  DoWhileStatement() {
    this._eat("do");

    const body = this.Statement();

    this._eat("while");

    this._eat("(");
    const test = this.Expression();
    this._eat(")");

    this._eat(";");

    return new DoWhileStatement(body, test);
  }

  /**
   * ForStatement
   *   : 'for' '(' OptForStatementInit ';' OptExpression ';' OptExpression ')' Statement
   *   ;
   */
  ForStatement() {
    this._eat("for");
    this._eat("(");

    const init = this._lookahead?.type !== ";" ? this.ForStatementInit() : null;
    this._eat(";");

    const test = this._lookahead?.type !== ";" ? this.Expression() : null;
    this._eat(";");

    const update = this._lookahead?.type !== ")" ? this.Expression() : null;
    this._eat(")");

    const body = this.Statement();

    return new ForStatement(init, test, update, body);
  }

  /**
   * ForStatementInit
   *   : VariableStatementInit
   *   | Expression
   *   ;
   */
  ForStatementInit() {
    if (this._lookahead?.type === "var") {
      return this.VariableStatementInit();
    }
    return this.ExpressionStatement();
  }

  /**
   * BreakStatement
   *   : 'break' ';'
   *   ;
   */
  BreakStatement() {
    this._eat("break");
    this._eat(";");
    return new BreakStatement();
  }

  /**
   * ContinueStatement
   *   : 'continue' ';'
   *   ;
   */
  ContinueStatement() {
    this._eat("continue");
    this._eat(";");
    return new ContinueStatement();
  }

  /**
   * IfStatement
   *   : 'if' '(' Expression ')' Statement
   *   | 'if' '(' Expression ')' Statement 'else' Statement
   *   ;
   */
  IfStatement() {
    this._eat("if");
    this._eat("(");
    const test = this.Expression();
    this._eat(")");
    const consequent = this.Statement();
    const alternate = this._lookahead?.type === "else"
      ? this._eat("else") && this.Statement()
      : null;
    return new IfStatement(test, consequent, alternate);
  }

  /**
   * VariableStatementInit
   *   : 'let' VariableDeclarationList
   *   ;
   */
  VariableStatementInit() {
    const isConstant = this._lookahead?.type === "let";
    this._eat(this._lookahead!.type);
    const declarations = this.VariableDeclarationList();
    return new VariableStatement(declarations, isConstant);
  }

  /**
   * VariableStatement
   *   : VariableStatementInit ';'
   *   ;
   */
  VariableStatement() {
    const variableStatement = this.VariableStatementInit();
    this._eat(";");
    return variableStatement;
  }

  /**
   * VariableDeclarationList
   *   : VariableDeclaration
   *   | VariableDeclarationList ',' VariableDeclaration
   *   ;
   */
  VariableDeclarationList() {
    const declarations = Array<VariableDeclaration>();
    do {
      declarations.push(this.VariableDeclaration());
    } while (this._lookahead?.type === "," && this._eat(","));
    return declarations;
  }

  /**
   * VariableDeclaration
   *   : Identifier OptVariableInitializer
   *   ;
   */
  VariableDeclaration() {
    const id = this.Identifier();

    // OptVariableInitializer
    const init = this._lookahead?.type !== ";" && this._lookahead?.type !== ","
      ? this.VariableInitializer()
      : null;

    return new VariableDeclaration(id, init);
  }

  /**
   * VariableInitializer
   *   : SIMPLE_ASSIGN AssignmentExpression
   *   ;
   */
  VariableInitializer() {
    this._eat("SIMPLE_ASSIGN");
    return this.AssignmentExpression();
  }

  /**
   * EmptyStatement
   *   : ';'
   *   ;
   */
  EmptyStatement() {
    this._eat(";");
    return new EmptyStatement();
  }

  /**
   * BlockStatement
   *   : '{' OptStatementList '}'
   *   ;
   */
  BlockStatement() {
    this._eat("{");
    const body = this._lookahead?.type === "}" ? [] : this.StatementList("}");
    this._eat("}");
    return new BlockStatement(body);
  }

  /**
   * ExpressionStatement
   *   : Expression ';'
   *   ;
   */
  ExpressionStatement() {
    const expression = this.Expression();
    this._eat(";");
    return new ExpressionStatement(expression);
  }

  /**
   * Expression
   *   : AssignmentExpression
   *   ;
   */
  Expression(): Expression {
    return this.AssignmentExpression();
  }

  /**
   * AssignmentExpression
   *   : LogicalORExpression
   *   | LeftHandSideExpression AssignmentOperator AssignmentExpression
   *   ;
   */
  AssignmentExpression(): Expression {
    const left = this.LogicalORExpression();

    if (!this._isAssignmentOperator(this._lookahead?.type)) {
      return left;
    }

    return new AssignmentExpression(
      this.AssignmentOperator().value,
      this._checkValidAssignmentTarget(left),
      this.AssignmentExpression(),
    );
  }

  /**
   * Identifier
   *   : IDENTIFIER
   *   ;
   */
  Identifier() {
    const name = this._eat("IDENTIFIER").value;
    return new Identifier(name);
  }

  /**
   * Extra check whether it's valid assignment target.
   */
  _checkValidAssignmentTarget(node: Expression) {
    if (node.type === "Identifier" || node.type === "MemberExpression") {
      return node;
    }
    throw new SyntaxError("Invalid left-hand side in assignment expression");
  }

  /**
   * Whether the token is an assignment operator.
   */
  _isAssignmentOperator(tokenType?: TokenType) {
    return tokenType === "SIMPLE_ASSIGN" || tokenType === "COMPLEX_ASSIGN";
  }

  /**
   * AssignmentOperator
   *   : SIMPLE_ASSIGN
   *   | COMPLEX_ASSIGN
   *   ;
   */
  AssignmentOperator() {
    if (this._lookahead?.type === "SIMPLE_ASSIGN") {
      return this._eat("SIMPLE_ASSIGN");
    }
    return this._eat("COMPLEX_ASSIGN");
  }

  /**
   * Logical OR expression.
   *
   *   x || y
   *
   * LogicalORExpression
   *   : LogicalORExpression
   *   | LogicalORExpression LOGICAL_OR LogicalANDExpression
   *   ;
   */
  LogicalORExpression() {
    return this._LogicalExpression("LogicalANDExpression", "LOGICAL_OR");
  }

  /**
   * Logical AND expression.
   *
   *   x && y
   *
   * LogicalANDExpression
   *   : EqualityExpression
   *   | LogicalANDExpression LOGICAL_AND EqualityExpression
   *   ;
   */
  LogicalANDExpression() {
    return this._LogicalExpression("EqualityExpression", "LOGICAL_AND");
  }

  /**
   * EQUALITY_OPERATOR: ==, !=
   *
   *   x == y
   *   x != y
   *
   * EqualityExpression
   *   : RelationalExpression
   *   | EqualityExpression EQUALITY_OPERATOR RelationalExpression
   *   ;
   */
  EqualityExpression() {
    return this._BinaryExpression("RelationalExpression", "EQUALITY_OPERATOR");
  }

  /**
   * RELATIONAL_OPERATOR: >, >=, <, <=
   *
   *   x > y
   *   x >= y
   *   x < y
   *   x <= y
   *
   * RelationalExpression
   *   : AdditiveExpression
   *   | RelationalExpression RELATIONAL_OPERATOR AdditiveExpression
   *   ;
   */
  RelationalExpression() {
    return this._BinaryExpression("AdditiveExpression", "RELATIONAL_OPERATOR");
  }

  /**
   * AdditiveExpression
   *   : MultiplicativeExpression
   *   | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
   *   ;
   */
  AdditiveExpression() {
    return this._BinaryExpression(
      "MultiplicativeExpression",
      "ADDITIVE_OPERATOR",
    );
  }

  /**
   * MultiplicativeExpression
   *   : UnaryExpression
   *   | MultiplicativeExpression MULTIPLICATIVE_OPERATOR UnaryExpression
   *   ;
   */
  MultiplicativeExpression() {
    return this._BinaryExpression(
      "UnaryExpression",
      "MULTIPLICATIVE_OPERATOR",
    );
  }

  /**
   * Generic helper for LogicalExpression nodes.
   */
  _LogicalExpression(
    builderName: "LogicalANDExpression" | "EqualityExpression",
    operatorToken: OperatorType,
  ): Expression {
    let left = this[builderName]();

    while (this._lookahead?.type === operatorToken) {
      const operator = this._eat(operatorToken).value;

      const right = this[builderName]();

      left = new LogicalExpression(operator, left, right);
    }

    return left;
  }

  /**
   * Generic binary expression.
   */
  _BinaryExpression(
    builderName:
      | "UnaryExpression"
      | "EqualityExpression"
      | "RelationalExpression"
      | "AdditiveExpression"
      | "MultiplicativeExpression"
      | "PrimaryExpression",
    operatorToken: OperatorType,
  ): Expression {
    let left = this[builderName]();

    while (this._lookahead?.type === operatorToken) {
      const operator = this._eat(operatorToken).value;

      const right = this[builderName]();

      left = new BinaryExpression(operator, left, right);
    }

    return left;
  }

  /**
   * UnaryExpression
   *   : LeftHandSideExpression
   *   | ADDITIVE_OPERATOR UnaryExpression
   *   | LOGICAL_NOT UnaryExpression
   *   ;
   */
  UnaryExpression(): Expression {
    let operator;
    switch (this._lookahead?.type) {
      case "ADDITIVE_OPERATOR":
        operator = this._eat("ADDITIVE_OPERATOR").value;
        break;
      case "LOGICAL_NOT":
        operator = this._eat("LOGICAL_NOT").value;
        break;
    }
    if (!operator) return this.LeftHandSideExpression();

    return new UnaryExpression(operator, this.UnaryExpression());
  }

  /**
   * LeftHandSideExpression
   *   : CallMemberExpression
   *   ;
   */
  LeftHandSideExpression(): Expression {
    return this.CallMemberExpression();
  }

  /**
   * CallMemberExpression
   *   : MemberExpression
   *   | CallExpression
   *   ;
   */
  CallMemberExpression(): Expression {
    // Super call:
    if (this._lookahead?.type === "super") {
      return this._CallExpression(this.SuperExpression());
    }

    // Member part, might be part of a call:
    const member = this.MemberExpression();

    // See if we have a call expression:
    if (this._lookahead?.type === "(") {
      return this._CallExpression(member);
    }

    // Simple member expression:
    return member;
  }

  /**
   * Generic call expression helper.
   *
   * CallExpression
   *   : Callee Arguments
   *   ;
   *
   * Callee
   *   : MemberExpression
   *   | Super
   *   | CallExpression
   *   ;
   */
  _CallExpression(callee: Expression) {
    let callExpression = new CallExpression(callee, this.Arguments());

    if (this._lookahead?.type === "(") {
      callExpression = this._CallExpression(callExpression);
    }

    return callExpression;
  }

  /**
   * Arguments
   *   : '(' OptArgumentList ')'
   *   ;
   */
  Arguments() {
    this._eat("(");

    const argumentList = this._lookahead?.type !== ")"
      ? this.ArgumentList()
      : [];

    this._eat(")");

    return argumentList;
  }

  /**
   * ArgumentList
   *   : AssignmentExpression
   *   | ArgumentList ',' AssignmentExpression
   *   ;
   */
  ArgumentList() {
    const argumentList = Array<Expression>();

    do {
      argumentList.push(this.AssignmentExpression());
    } while (this._lookahead?.type === "," && this._eat(","));

    return argumentList;
  }

  /**
   * MemberExpression
   *   : PrimaryExpression
   *   | MemberExpression '.' Identifier
   *   | MemberExpression '[' Expression ']'
   *   ;
   */
  MemberExpression() {
    let object = this.PrimaryExpression();

    while (this._lookahead?.type === "." || this._lookahead?.type === "[") {
      // MemberExpression '.' Identifier
      if (this._lookahead?.type === ".") {
        this._eat(".");
        const property = this.Identifier();
        object = new MemberExpression(false, object, property);
      }

      // MemberExpression '[' Expression ']'
      if (this._lookahead?.type === "[") {
        this._eat("[");
        const property = this.Expression();
        this._eat("]");
        object = new MemberExpression(true, object, property);
      }
    }

    return object;
  }

  /**
   * PrimaryExpression
   *   : Literal
   *   | ParenthesizedExpression
   *   | Identifier
   *   | ThisExpression
   *   | NewExpression
   *   ;
   */
  PrimaryExpression(): Expression {
    if (this._isLiteral(this._lookahead?.type)) {
      return this.Literal();
    }
    switch (this._lookahead?.type) {
      case "(":
        return this.ParenthesizedExpression();
      case "IDENTIFIER":
        return this.Identifier();
      case "this":
        return this.ThisExpression();
      case "new":
        return this.NewExpression();
      default:
        return this.LeftHandSideExpression();
    }
  }

  /**
   * NewExpression
   *   : 'new' MemberExpression Arguments
   *   ;
   */
  NewExpression() {
    this._eat("new");
    return new NewExpression(this.MemberExpression(), this.Arguments());
  }

  /**
   * ThisExpression
   *   : 'this'
   *   ;
   */
  ThisExpression() {
    this._eat("this");
    return new ThisExpression();
  }

  /**
   * Super
   *   : 'super'
   *   ;
   */
  SuperExpression() {
    this._eat("super");
    return new SuperExpression();
  }

  /**
   * Whether the token is a literal.
   */
  _isLiteral(tokenType?: TokenType) {
    return (
      tokenType === "NUMBER" ||
      tokenType === "STRING" ||
      tokenType === "true" ||
      tokenType === "false" ||
      tokenType === "null"
    );
  }

  /**
   * ParenthesizedExpression
   *   : '(' Expression ')'
   *   ;
   */
  ParenthesizedExpression() {
    this._eat("(");
    const expression = this.Expression();
    this._eat(")");
    return expression;
  }

  /**
   * Literal
   *   : NumericLiteral
   *   | StringLiteral
   *   | BooleanLiteral
   *   | NullLiteral
   *   ;
   */
  Literal() {
    switch (this._lookahead?.type) {
      case "NUMBER":
        return this.NumericLiteral();
      case "STRING":
        return this.StringLiteral();
      case "true":
        return this.BooleanLiteral(true);
      case "false":
        return this.BooleanLiteral(false);
      case "null":
        return this.NullLiteral();
    }
    throw new SyntaxError(`Literal: unexpected literal productuon`);
  }

  /**
   * BooleanLiteral
   *   : 'true'
   *   | 'false'
   *   ;
   */
  BooleanLiteral(value: boolean) {
    this._eat(value ? "true" : "false");
    return new BooleanLiteral(value);
  }

  /**
   * NullLiteral
   *   : 'null'
   *   ;
   */
  NullLiteral() {
    this._eat("null");
    return new NullLiteral();
  }

  /**
   * StringLiteral
   *   : STRING
   *   ;
   */
  StringLiteral() {
    const token = this._eat("STRING");
    return new StringLiteral(token.value.slice(1, -1));
  }

  /**
   * NumericLiteral
   *   : NUMBER
   *   ;
   */
  NumericLiteral() {
    const token = this._eat("NUMBER");
    return new NumericLiteral(Number(token.value));
  }

  /**
   * Expects a token of a given type.
   */
  _eat(tokenType: TokenType): Token {
    const token = this._lookahead;

    if (token == null) {
      throw SyntaxError(`Unexpected end of input, expected: '${tokenType}'`);
    }

    if (token.type !== tokenType) {
      throw SyntaxError(
        `Unexpected token: '${token.value}', expected: '${tokenType}'`,
      );
    }

    // Advance to next token.
    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }
}
