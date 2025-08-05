/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

/**
 * Tokenizer spec.
 */
const Spec = [
  // Comments
  [/^\/\/.*/, null],
  [/^\/\*[\s\S]*?\*\//, null],

  // Whitespace
  [/^\s+/, null],

  // Symbols, delimiters
  [/^;/, ";"],
  [/^\{/, "{"],
  [/^\}/, "}"],
  [/^\(/, "("],
  [/^\)/, ")"],
  [/^,/, ","],
  [/^\./, "."],
  [/^\[/, "["],
  [/^\]/, "]"],

  // Keywords
  [/^\bnull\b/, "null"],
  [/^\btrue\b/, "true"],
  [/^\bfalse\b/, "false"],
  [/^\blet\b/, "let"],
  [/^\bvar\b/, "var"],
  [/^\bif\b/, "if"],
  [/^\belse\b/, "else"],
  [/^\bwhile\b/, "while"],
  [/^\bdo\b/, "do"],
  [/^\bfor\b/, "for"],
  [/^\bcontinue\b/, "continue"],
  [/^\bbreak\b/, "break"],
  [/^\bdef\b/, "def"],
  [/^\breturn\b/, "return"],
  [/^\bclass\b/, "class"],
  [/^\bextends\b/, "extends"],
  [/^\bsuper\b/, "super"],
  [/^\bnew\b/, "new"],
  [/^\bthis\b/, "this"],

  // Numbers
  [/^\d+/, "NUMBER"],

  // Identifiers
  [/^\w+/, "IDENTIFIER"],

  // Equality operators: ==, !=
  [/^[=!]=/, "EQUALITY_OPERATOR"],

  // Assignment operators: =, *=, /=, +=, -=
  [/^=/, "SIMPLE_ASSIGN"],
  [/^[\*\/\+\-]=/, "COMPLEX_ASSIGN"],

  // Math operators
  [/^[+\-]/, "ADDITIVE_OPERATOR"],
  [/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],

  // Relational operators
  [/^[><]=?/, "RELATIONAL_OPERATOR"],

  // Logical operators
  [/^&&/, "LOGICAL_AND"],
  [/^\|\|/, "LOGICAL_OR"],
  [/^!/, "LOGICAL_NOT"],

  // Strings
  [/^"[^"]*"/, "STRING"],
  [/^'[^']*'/, "STRING"],
];

/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a stream.
 */
class Tokenizer {
  /**
   * Initializes the string.
   */
  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  /**
   * Whether the tokenizer reached EOF.
   */
  isEOF() {
    return this._cursor === this._string.length;
  }

  /**
   * Whether we still have more tokens.
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
   * Obtains next token.
   */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this._match(regexp, string);

      // Couldn't match this rule, continue.
      if (tokenValue == null) {
        continue;
      }

      // Should skip token, e.g. whitespace.
      if (tokenType == null) {
        return this.getNextToken();
      }

      debugger;
      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unknown token: "${string[0]}"`);
  }

  /**
   * Matches a token for a regular expression.
   */
  _match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }
}

module.exports = {
  Tokenizer,
};
