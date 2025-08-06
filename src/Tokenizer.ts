/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

import { Token, TokenSpec } from "./Token.ts";

/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  _string = "";
  _cursor = 0;

  /**
   * Initializes the string.
   */
  init(string: string) {
    this._string = string;
    this._cursor = 0;
  }

  /**
   * Whether the tokenizer reached EOF.
   */
  isEOF(): boolean {
    return this._cursor === this._string.length;
  }

  /**
   * Whether we still have more tokens.
   */
  hasMoreTokens(): boolean {
    return this._cursor < this._string.length;
  }

  /**
   * Obtains next token.
   */
  getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of TokenSpec) {
      const tokenValue = this._match(regexp, string);

      // Couldn't match this rule, continue.
      if (tokenValue == null) {
        continue;
      }

      // Should skip token, e.g. whitespace.
      if (tokenType == null) {
        return this.getNextToken();
      }

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
  _match(regexp: RegExp, string: string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }
}
