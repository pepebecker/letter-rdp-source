/**
 * Tokenizer spec.
 */
export const TokenSpec = [
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
  // [/^[a-zA-Z_][a-zA-Z0-9_]*/, "IDENTIFIER"],
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
