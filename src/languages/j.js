/*
Language: J
Author: 0racle
Contributors: 
Description: J array language definitions
Website: https://www.jsoftware.com
*/

export default function(hljs) {

  let number  = 'number';
  let string  = 'string';
  let comment = 'comment';
  let verb    = 'keyword';
  let conj    = 'code';
  let adverb  = 'built_in';
  let noun    = 'name';
  let copula  = 'bullet';
  let ctrl    = 'code'; 
  let type    = 'type';
  let id      = 'variable';
  let rank    = 'built_in';

  const J_NOUN_PARAM = { match: /\b[mnxy]\b/, scope: noun };
  const J_VERB_PARAM = { match: /\b[uv]\b/, scope: verb };

  const J_IDENT = {
    variants: [
      { match: /\b[A-Za-z][A-Za-z0-9_]*\b/ },
    ]
  };

  const J_CONTROL = {
    scope: ctrl,
    variants: [
      { match: /\b(assert|break|case|catch|catchd)\./ },
      { match: /\b(catcht|continue|do|else|elseif)\./ },
      { match: /\b(end|fcase|for|if|return|select)\./ },
      { match: /\b(throw|trap|try|while|whilst)\./ },
      { match: /\b(for|goto|label)_(?=[^.]+)/ },
      { match: /(?<=\b(for|goto|label)_[^.]+)\./ },
    ]
  };

  const J_NUMBER_BASED = {
    scope: number,
    relevance: 0,
    match: /_?\.?\d+(?=b\S+)/,
    contains: [
      {
        begin: /(?<=_?\d+)b/, end: /[_0-9a-z]+/,
        scope: type,
        endScope: number,
      }
    ]
  };

  const J_NUMBER = {
    scope: number,
    relevance: 0,
    variants: [
      { match: /_?\.?\d+(?!:)(?=[_\.0-9Eac-z]*)/ },
      { match: /(?!\d)\.?(?=x_?\d)/ },
    ],
    contains: [
     {
       match: /(a[rd]|[Eejprx])/,
       scope: type,
       endScope: number,
     }
    ]
  };

  const J_PUNCT = {
    scope: 'punctuation',
    match: /[()]/,
  }

  const J_UNPACK = {
    begin: /'(?=(`?\s*[a-zA-Z][a-zA-Z0-9_]*)+\s*'\s=[.:])/,
    end: /'/,
    beginScope: id, endScope: id,
    contains: [
      { scope: conj, match: '`' }
    ]
  };

  const J_UNPACK_NESTED = {
    begin: /'(?=(`?\s*[a-zA-Z][a-zA-Z0-9_]*)+\s*'\s=[.:])/,
    end: /'/,
    contains: [
      J_NOUN_PARAM,
      J_VERB_PARAM,
      { scope: conj, match: '`' }
    ]
  };

  const J_STRING = {
    scope: string,
    begin: "'",
    end: "'",
  };

  const J_STRING_NESTED = {
    scope: string,
    begin: /''/,
    end: /''/,
  };

  const J_COMMENT = hljs.COMMENT('NB\.', /$\n/, {relevance: 5});

  const J_COPULA =  {
    scope: copula,
    match: /=[.:]/,
  };

  const J_OP_CONJUNCTION = {
    scope: conj,
    variants: [
      { match: /\s+\./ },
      { match: /^\s*:/ },
      { match: /\.$/ },
      { match: /\.[.:]/ },
      { match: /;\./ },
      { match: /\^:/ },
      { match: /:[.:]?/ },
      { match: /![.:]{1}/ },
      { match: '`[:]?' }, 
      { match: /@[.:]?/ },
      { match: /&[.:]?/ },
      { match: /&\.:/ },
      { match: /\b[dtDH]\./ },
      { match: /\b[DLS]\:/ },
      { match: /\bF[.:][.:]?/ },
      { match: /[\[\]]\./ },
    ]
  };

  const J_OP_VERB = {
    scope: verb,
    variants: [
      { match: /__?:/ },
      { match: /;:/ },
      { match: /\{::/ },
      { match: /[;=!]/ },
      { match: /[-+*<>#$%|,][.:]?/ },
      { match: /(?<!\{)\{(?!\{)[.:]?/ }, // single '{'
      { match: /\}[.:]/ },
      { match: /~[.:]/ },
      { match: /\^\.?/ },
      { match: /[/\\]:/ },
      { match: /\[:?/ },
      { match: /\](?!:)/ },
      { match: /\?\.?/ },
      { match: /\bp\.\./ },
      { match: /\b[AcCeEiIjLoprT]\./ },
      { match: /\b[ipqsuxLZ]:/ },
      { match: /_?[0-9]:/ },
      { match: /"[.:]/ },
    ],
    relevance: 3,
  };

  const J_OP_RANK = {
    scope: conj,
    match: /"(?=(\s*_?([0-9]+x?)?){1,3})/,
    contains: [
      {
        scope: rank,
        match: /(?<=")(\s*_?([0-9]+x?)?){1,3}/,
      }
    ]
  };

  const J_OP_ADVERB = {
    scope: adverb,
    variants: [
      { match: /(?<!\})\}(?!\})/ }, // single '}'
      { match: /~/ },
      { match: /\/(\.\.?)?/ },
      { match: /\b[bfM]\./ },
      { match: /\]:/ },
      { match: /\\\.?/ },
    ]
  };

  const J_OP_NOUN_NEGINF = {
    scope: number,
    match: /_(?=_)/,
  };

  const J_OP_NOUN = {
    scope: noun,
    variants: [
      { match: /a[.:]/ },
      { match: /_\./ },
      { match: /_(?![:_\d])/ },
    ]
  };

  const J_DDEF_NOUN_INLINE = {
    scope: string,
    begin: [
      /\{\{/,
      /\)n/
    ],
    beginScope: { 1: id, 2: id, },
    end: /\}\}/,
    endScope: id 
  };

  const J_DDEF_NOUN_MULTI = {
    scope: string,
    begin: [
      /\{\{/,
      /\)n/,
      /\s*(NB\..*)?$/
    ],
    beginScope: {
      1: id,
      2: id,
      3: comment,
    },
    end: /^\}\}/,
    endScope: id 
  };

  const J_DEF_NOUN = {
    scope: string,
    begin: [
      /(\(+\s*)*(noun|0)\)*\s+(\(*define\)*|(def|:)\s*\(*0\)*)/,
      /\s*(NB\..*)?$/
    ],
    beginScope: {
      1: id,
      2: comment,
    },
    end: /^\)/,
    endScope: id,
  };

  const J_SYNTAX = [
    J_COMMENT,
    J_OP_CONJUNCTION,
    J_COPULA,
    J_OP_VERB,
    J_OP_RANK,
    J_OP_ADVERB,
    J_OP_NOUN_NEGINF,
    J_OP_NOUN,
    J_IDENT,
    J_NUMBER_BASED,
    J_NUMBER,
  ]

  const J_QDEF_VERB_NESTED = {
    variants: [
      {
        begin: /(noun|adverb|conjunction|verb|monad|dyad|[1-4]|13)\s+(def|:)\s*''/,
        end: /''/,
      },
      {
        begin: /(noun|adverb|conjunction|verb|monad|dyad|[1-4]|13)\s+(def|:)\s*\(''/,
        end: /''\)/
      },
    ],
    beginScope: id, endScope: id,
    contains: [
      J_NOUN_PARAM,
      J_VERB_PARAM,
      J_CONTROL,
      ...J_SYNTAX,
      { scope: string, begin: /''''/, end: /''''/, }
    ],
    relevance: 4,
  };

  const J_BDEF_VERB_INLINE = {
    variants: [
      {
        begin: /(noun|adverb|conjunction|verb|monad|dyad|[1-4]|13)\s+(def|:)\s*\(/,
        end: /\)/
      },
    ],
    contains: [
      J_QDEF_VERB_NESTED,
      J_NOUN_PARAM,
      J_VERB_PARAM,
      J_CONTROL,
      ...J_SYNTAX,
      J_STRING,
      J_UNPACK,
    ],
  };

  const J_QDEF_VERB_INLINE = {
    variants: [
      {
        begin: /(noun|adverb|conjunction|verb|monad|dyad|[1-4]|13)\s+(def|:)\s*'/,
        end: /'/,
      },
      {
        begin: /(noun|adverb|conjunction|verb|monad|dyad|[1-4]|13)\s+(def|:)\s*\('/,
        end: /'\)/
      },
    ],
    beginScope: id, endScope: id,
    contains: [
      J_QDEF_VERB_NESTED,
      J_NOUN_PARAM,
      J_VERB_PARAM,
      J_CONTROL,
      ...J_SYNTAX,
      J_STRING_NESTED,
      J_UNPACK_NESTED,
    ],
    relevance: 4,
  };

  const J_BDEF_VERB_MULTI = {
    variants: [
      {
        begin: /(\(+\s*)*(noun|adverb|conjunction|verb|monad|dyad|[1-4]|13)\)*\s+(\(*define\)*|(def|:)\s*\(*0\)*)\s*$/,
        end: /^\)/
      },
    ],
    beginScope: id, endScope: id,
    contains: [
      J_NOUN_PARAM,
      J_VERB_PARAM,
      J_CONTROL,
      ...J_SYNTAX,
      J_STRING,
      J_UNPACK,
    ],
    relevance: 4,
  };

  const J_DDEF_VERB_MULTI = {
    begin: [
      /\{\{/,
      /(\)[mdvacn*])?/
    ],
    beginScope: {
      1: id, 
      2: id,
    },
    end: /\}\}/,
    endScope: id,
    contains: [
      'self',
      J_NOUN_PARAM,
      J_VERB_PARAM,
      J_CONTROL,
      ...J_SYNTAX,
      J_UNPACK_NESTED,
      J_STRING,
    ]
  };

  return {
    name: 'J',
    aliases: ['j', 'ijs'],
    contains: [
      J_DEF_NOUN,
      J_QDEF_VERB_INLINE,
      J_BDEF_VERB_INLINE,
      J_BDEF_VERB_MULTI,
      J_DDEF_NOUN_MULTI,
      J_DDEF_NOUN_INLINE,
      J_DDEF_VERB_MULTI,
      ...J_SYNTAX,
      J_UNPACK,
      J_STRING,
    ]
  };

}
