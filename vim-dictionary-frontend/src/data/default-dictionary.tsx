export const keyMappings = [
  {
    key: "a",
    mode: "Normal",
    description: "append text after the cursor N times",
  },
  {
    key: "b",
    mode: "Normal",
    description: "cursor N words backward",
  },
  {
    key: "c",
    mode: "Normal",
    description: "delete Nmove text [into register x] and",
  },
  {
    key: "cc",
    mode: "Normal",
    description: "delete N lines [into register x] and start",
  },
  {
    key: "d",
    mode: "Normal",
    description: "delete Nmove text [into register x]",
  },
  {
    key: "dd",
    mode: "Normal",
    description: "delete N lines [into register x]",
  },
  {
    key: "do",
    mode: "Normal",
    description: 'same as ":diffget"',
  },
  {
    key: "dp",
    mode: "Normal",
    description: 'same as ":diffput"',
  },
  {
    key: "e",
    mode: "Normal",
    description: "cursor forward to the end of word N",
  },
  {
    key: "f",
    mode: "Normal",
    description: "cursor to Nth occurrence of {char} to the",
  },
  {
    key: "g",
    mode: "Normal",
    description: "extended commands, see |g| below",
  },
  {
    key: "h",
    mode: "Normal",
    description: "cursor N chars to the left",
  },
  {
    key: "i",
    mode: "Normal",
    description: "insert text before the cursor N times",
  },
  {
    key: "j",
    mode: "Normal",
    description: "cursor N lines downward",
  },
  {
    key: "k",
    mode: "Normal",
    description: "cursor N lines upward",
  },
  {
    key: "l",
    mode: "Normal",
    description: "cursor N chars to the right",
  },
  {
    key: "m",
    mode: "Normal",
    description: "set mark {A-Za-z} at cursor position",
  },
  {
    key: "n",
    mode: "Normal",
    description: "repeat the latest '/' or '?' N times",
  },
  {
    key: "o",
    mode: "Normal",
    description: "begin a new line below the cursor and",
  },
  {
    key: "p",
    mode: "Normal",
    description: "put the text [from register x] after the",
  },
  {
    key: "q",
    mode: "Normal",
    description: "record typed characters into named register",
  },
  {
    key: "q:",
    mode: "Normal",
    description: "edit : command-line in command-line window",
  },
  {
    key: "q/",
    mode: "Normal",
    description: "edit / command-line in command-line window",
  },
  {
    key: "q?",
    mode: "Normal",
    description: "edit ? command-line in command-line window",
  },
  {
    key: "r",
    mode: "Normal",
    description: "replace N chars with {char}",
  },
  {
    key: "s",
    mode: "Normal",
    description: "(substitute) delete N characters [into",
  },
  {
    key: "t",
    mode: "Normal",
    description: "cursor till before Nth occurrence of {char}",
  },
  {
    key: "u",
    mode: "Normal",
    description: "undo changes",
  },
  {
    key: "v",
    mode: "Normal",
    description: "start characterwise Visual mode",
  },
  {
    key: "w",
    mode: "Normal",
    description: "cursor N words forward",
  },
  {
    key: "x",
    mode: "Normal",
    description: "delete N characters under and after the",
  },
  {
    key: "y",
    mode: "Normal",
    description: "yank Nmove text [into register x]",
  },
  {
    key: "yy",
    mode: "Normal",
    description: "yank N lines [into register x]",
  },
  {
    key: "z",
    mode: "Normal",
    description: "commands starting with 'z', see |z| below",
  },

  {
    key: "A",
    mode: "Normal",
    description: "append text after the end of the line N times",
  },
  {
    key: "B",
    mode: "Normal",
    description: "cursor N WORDS backward",
  },
  {
    key: "C",
    mode: "Normal",
    description: "change from the cursor position to the end",
  },
  {
    key: "D",
    mode: "Normal",
    description: "delete the characters under the cursor",
  },
  {
    key: "E",
    mode: "Normal",
    description: "cursor forward to the end of WORD N",
  },
  {
    key: "F",
    mode: "Normal",
    description: "cursor to the Nth occurrence of {char} to",
  },
  {
    key: "G",
    mode: "Normal",
    description: "cursor to line N, default last line",
  },
  {
    key: "H",
    mode: "Normal",
    description: "cursor to line N from top of screen",
  },
  {
    key: "I",
    mode: "Normal",
    description: "insert text before the first CHAR on the",
  },
  {
    key: "J",
    mode: "Normal",
    description: "Join N lines; default is 2",
  },
  {
    key: "K",
    mode: "Normal",
    description: "lookup Keyword under the cursor with",
  },
  {
    key: "L",
    mode: "Normal",
    description: "cursor to line N from bottom of screen",
  },
  {
    key: "M",
    mode: "Normal",
    description: "cursor to middle line of screen",
  },
  {
    key: "N",
    mode: "Normal",
    description: "repeat the latest '/' or '?' N times in",
  },
  {
    key: "O",
    mode: "Normal",
    description: "begin a new line above the cursor and",
  },
  {
    key: "P",
    mode: "Normal",
    description: "put the text [from register x] before the",
  },
  {
    key: "Q",
    mode: "Normal",
    description: 'switch to "Ex" mode',
  },
  {
    key: "R",
    mode: "Normal",
    description: "enter replace mode: overtype existing",
  },
  {
    key: "S",
    mode: "Normal",
    description: "delete N lines [into register x] and start",
  },
  {
    key: "T",
    mode: "Normal",
    description: "cursor till after Nth occurrence of {char}",
  },
  {
    key: "U",
    mode: "Normal",
    description: "undo all latest changes on one line",
  },
  {
    key: "V",
    mode: "Normal",
    description: "start linewise Visual mode",
  },
  {
    key: "W",
    mode: "Normal",
    description: "cursor N WORDS forward",
  },
  {
    key: "X",
    mode: "Normal",
    description: "delete N characters before the cursor [into",
  },
  {
    key: "Y",
    mode: "Normal",
    description: "yank N lines [into register x]; synonym for",
  },
  {
    key: "ZZ",
    mode: "Normal",
    description: "write if buffer changed and close window",
  },
  {
    key: "ZQ",
    mode: "Normal",
    description: "close window without writing",
  },
  {
    key: "[",
    mode: "Normal",
    description: "square bracket command (see |[| below)",
  },
  {
    key: "\\",
    mode: "Normal",
    description: "not used",
  },
  {
    key: "]",
    mode: "Normal",
    description: "square bracket command (see |]| below)",
  },
  {
    key: "^",
    mode: "Normal",
    description: "cursor to the first CHAR of the line",
  },
  {
    key: "_",
    mode: "Normal",
    description: "cursor to the first CHAR N - 1 lines lower",
  },
  {
    key: "`",
    mode: "Normal",
    description: "cursor to the mark {a-zA-Z0-9}",
  },
  {
    key: "`(",
    mode: "Normal",
    description: "cursor to the start of the current sentence",
  },
  {
    key: "`)",
    mode: "Normal",
    description: "cursor to the end of the current sentence",
  },
  {
    key: "`<",
    mode: "Normal",
    description: "cursor to the start of the highlighted area",
  },
  {
    key: "`>",
    mode: "Normal",
    description: "cursor to the end of the highlighted area",
  },
  {
    key: "`[",
    mode: "Normal",
    description: "cursor to the start of last operated text",
  },
  {
    key: "`]",
    mode: "Normal",
    description: "cursor to the end of last operated text or",
  },
  {
    key: "``",
    mode: "Normal",
    description: "cursor to the position before latest jump",
  },
  {
    key: "`{",
    mode: "Normal",
    description: "cursor to the start of the current paragraph",
  },
  {
    key: "`}",
    mode: "Normal",
    description: "cursor to the end of the current paragraph",
  },
  {
    key: "{",
    mode: "Normal",
    description: "cursor N paragraphs backward",
  },
  {
    key: "}",
    mode: "Normal",
    description: "cursor N paragraphs forward",
  },
  {
    key: "~",
    mode: "Normal",
    description: "'tildeop' off: switch case of N characters",
  },
  {
    key: "<Del>",
    mode: "Normal",
    description: 'same as "x"',
  },
  {
    key: "<End>",
    mode: "Normal",
    description: 'same as "$"',
  },
  {
    key: "<Home>",
    mode: "Normal",
    description: 'same as "0"',
  },
  {
    key: "[#",
    mode: "Square bracket commands",
    description: "cursor to N previous unmatched #if, #else",
  },
  {
    key: "['",
    mode: "Square bracket commands",
    description: "cursor to previous lowercase mark, on first",
  },
  {
    key: "[(",
    mode: "Square bracket commands",
    description: "cursor N times back to unmatched '('",
  },
  {
    key: "[`",
    mode: "Square bracket commands",
    description: "cursor to previous lowercase mark",
  },
  {
    key: "[/",
    mode: "Square bracket commands",
    description: "cursor to N previous start of a C comment",
  },
  {
    key: "[D",
    mode: "Square bracket commands",
    description: "list all defines found in current and",
  },
  {
    key: "[I",
    mode: "Square bracket commands",
    description: "list all lines found in current and",
  },
  {
    key: "[P",
    mode: "Square bracket commands",
    description: 'same as "[p"',
  },
  {
    key: "[[",
    mode: "Square bracket commands",
    description: "cursor N sections backward",
  },
  {
    key: "[]",
    mode: "Square bracket commands",
    description: "cursor N SECTIONS backward",
  },
  {
    key: "[c",
    mode: "Square bracket commands",
    description: "cursor N times backwards to start of change",
  },
  {
    key: "[d",
    mode: "Square bracket commands",
    description: "show first #define found in current and",
  },
  {
    key: "[f",
    mode: "Square bracket commands",
    description: 'same as "gf"',
  },
  {
    key: "[i",
    mode: "Square bracket commands",
    description: "show first line found in current and",
  },
  {
    key: "[m",
    mode: "Square bracket commands",
    description: "cursor N times back to start of member",
  },
  {
    key: "[p",
    mode: "Square bracket commands",
    description: 'like "P", but adjust indent to current line',
  },
  {
    key: "[s",
    mode: "Square bracket commands",
    description: "move to the previous misspelled word",
  },
  {
    key: "[z",
    mode: "Square bracket commands",
    description: "move to start of open fold",
  },
  {
    key: "[{",
    mode: "Square bracket commands",
    description: "cursor N times back to unmatched '{'",
  },
  {
    key: "]#",
    mode: "Square bracket commands",
    description: "cursor to N next unmatched #endif or #else",
  },
  {
    key: "]'",
    mode: "Square bracket commands",
    description: "cursor to next lowercase mark, on first",
  },
  {
    key: "])",
    mode: "Square bracket commands",
    description: "cursor N times forward to unmatched ')'",
  },
  {
    key: "]`",
    mode: "Square bracket commands",
    description: "cursor to next lowercase mark",
  },
  {
    key: "]/",
    mode: "Square bracket commands",
    description: "cursor to N next end of a C comment",
  },
  {
    key: "]D",
    mode: "Square bracket commands",
    description: "list all #defines found in current and",
  },
  {
    key: "]I",
    mode: "Square bracket commands",
    description: "list all lines found in current and",
  },
  {
    key: "]P",
    mode: "Square bracket commands",
    description: 'same as "[p"',
  },
  {
    key: "][",
    mode: "Square bracket commands",
    description: "cursor N SECTIONS forward",
  },
  {
    key: "]]",
    mode: "Square bracket commands",
    description: "cursor N sections forward",
  },
  {
    key: "]c",
    mode: "Square bracket commands",
    description: "cursor N times forward to start of change",
  },
  {
    key: "]d",
    mode: "Square bracket commands",
    description: "show first #define found in current and",
  },
  {
    key: "]f",
    mode: "Square bracket commands",
    description: 'same as "gf"',
  },
  {
    key: "]i",
    mode: "Square bracket commands",
    description: "show first line found in current and",
  },
  {
    key: "]m",
    mode: "Square bracket commands",
    description: "cursor N times forward to end of member",
  },
  {
    key: "]p",
    mode: "Square bracket commands",
    description: 'like "p", but adjust indent to current line',
  },
  {
    key: "]s",
    mode: "Square bracket commands",
    description: "move to next misspelled word",
  },
  {
    key: "]z",
    mode: "Square bracket commands",
    description: "move to end of open fold",
  },
  {
    key: "]}",
    mode: "Square bracket commands",
    description: "cursor N times forward to unmatched '}'",
  },
  {
    key: "g#",
    mode: "Commands starting with 'g'",
    description: 'like "#", but without using "<" and ">"',
  },
  {
    key: "g$",
    mode: "Commands starting with 'g'",
    description: "when 'wrap' off go to rightmost character of",
  },
  {
    key: "g&",
    mode: "Commands starting with 'g'",
    description: 'repeat last ":s" on all lines',
  },
  {
    key: "g'",
    mode: "Commands starting with 'g'",
    description: "like |'| but without changing the jumplist",
  },
  {
    key: "g`",
    mode: "Commands starting with 'g'",
    description: "like |`| but without changing the jumplist",
  },
  {
    key: "g+",
    mode: "Commands starting with 'g'",
    description: "go to newer text state N times",
  },
  {
    key: "g,",
    mode: "Commands starting with 'g'",
    description: "go to N newer position in change list",
  },
  {
    key: "g-",
    mode: "Commands starting with 'g'",
    description: "go to older text state N times",
  },
  {
    key: "g0",
    mode: "Commands starting with 'g'",
    description: "when 'wrap' off go to leftmost character of",
  },
  {
    key: "g8",
    mode: "Commands starting with 'g'",
    description: "print hex value of bytes used in UTF-8",
  },
  {
    key: "g;",
    mode: "Commands starting with 'g'",
    description: "go to N older position in change list",
  },
  {
    key: "g<",
    mode: "Commands starting with 'g'",
    description: "display previous command output",
  },
  {
    key: "g?",
    mode: "Commands starting with 'g'",
    description: "Rot13 encoding operator",
  },
  {
    key: "gD",
    mode: "Commands starting with 'g'",
    description: "go to definition of word under the cursor",
  },
  {
    key: "gE",
    mode: "Commands starting with 'g'",
    description: "go backwards to the end of the previous",
  },
  {
    key: "gH",
    mode: "Commands starting with 'g'",
    description: "start Select line mode",
  },
  {
    key: "gI",
    mode: "Commands starting with 'g'",
    description: 'like "I", but always start in column 1',
  },
  {
    key: "gJ",
    mode: "Commands starting with 'g'",
    description: "join lines without inserting space",
  },
  {
    key: "gN",
    mode: "Commands starting with 'g'",
    description: "1,2  find the previous match with the last used",
  },
  {
    key: "gP",
    mode: "Commands starting with 'g'",
    description: "put the text [from register x] before the",
  },
  {
    key: "gQ",
    mode: "Commands starting with 'g'",
    description: 'switch to "Ex" mode with Vim editing',
  },
  {
    key: "gR",
    mode: "Commands starting with 'g'",
    description: "enter Virtual Replace mode",
  },
  {
    key: "gT",
    mode: "Commands starting with 'g'",
    description: "go to the previous tab page",
  },
  {
    key: "gU",
    mode: "Commands starting with 'g'",
    description: "make Nmove text uppercase",
  },
  {
    key: "gV",
    mode: "Commands starting with 'g'",
    description: "don't reselect the previous Visual area",
  },
  {
    key: "g]",
    mode: "Commands starting with 'g'",
    description: ":tselect on the tag under the cursor",
  },
  {
    key: "g^",
    mode: "Commands starting with 'g'",
    description: "when 'wrap' off go to leftmost non-white",
  },
  {
    key: "g_",
    mode: "Commands starting with 'g'",
    description: "cursor to the last CHAR N - 1 lines lower",
  },
  {
    key: "ga",
    mode: "Commands starting with 'g'",
    description: "print ascii value of character under the",
  },
  {
    key: "gd",
    mode: "Commands starting with 'g'",
    description: "go to definition of word under the cursor",
  },
  {
    key: "ge",
    mode: "Commands starting with 'g'",
    description: "go backwards to the end of the previous",
  },
  {
    key: "gf",
    mode: "Commands starting with 'g'",
    description: "start editing the file whose name is under",
  },
  {
    key: "gF",
    mode: "Commands starting with 'g'",
    description: "start editing the file whose name is under",
  },
  {
    key: "gg",
    mode: "Commands starting with 'g'",
    description: "cursor to line N, default first line",
  },
  {
    key: "gh",
    mode: "Commands starting with 'g'",
    description: "start Select mode",
  },
  {
    key: "gi",
    mode: "Commands starting with 'g'",
    description: 'like "i", but first move to the |\'^| mark',
  },
  {
    key: "gj",
    mode: "Commands starting with 'g'",
    description: "like \"j\", but when 'wrap' on go N screen",
  },
  {
    key: "gk",
    mode: "Commands starting with 'g'",
    description: "like \"k\", but when 'wrap' on go N screen",
  },
  {
    key: "gm",
    mode: "Commands starting with 'g'",
    description: "go to character at middle of the screenline",
  },
  {
    key: "gM",
    mode: "Commands starting with 'g'",
    description: "go to character at middle of the text line",
  },
  {
    key: "gn",
    mode: "Commands starting with 'g'",
    description: "1,2  find the next match with the last used",
  },
  {
    key: "go",
    mode: "Commands starting with 'g'",
    description: "cursor to byte N in the buffer",
  },
  {
    key: "gp",
    mode: "Commands starting with 'g'",
    description: "put the text [from register x] after the",
  },
  {
    key: "gq",
    mode: "Commands starting with 'g'",
    description: "format Nmove text",
  },
  {
    key: "gr",
    mode: "Commands starting with 'g'",
    description: "virtual replace N chars with {char}",
  },
  {
    key: "gs",
    mode: "Commands starting with 'g'",
    description: "go to sleep for N seconds (default 1)",
  },
  {
    key: "gt",
    mode: "Commands starting with 'g'",
    description: "go to the next tab page",
  },
  {
    key: "gu",
    mode: "Commands starting with 'g'",
    description: "make Nmove text lowercase",
  },
  {
    key: "gv",
    mode: "Commands starting with 'g'",
    description: "reselect the previous Visual area",
  },
  {
    key: "gw",
    mode: "Commands starting with 'g'",
    description: "format Nmove text and keep cursor",
  },
  {
    key: "g@",
    mode: "Commands starting with 'g'",
    description: "call 'operatorfunc'",
  },
  {
    key: "g~",
    mode: "Commands starting with 'g'",
    description: "swap case for Nmove text",
  },
  {
    key: "z+",
    mode: "Commands starting with 'z'",
    description: "cursor on line N (default line below",
  },
  {
    key: "z-",
    mode: "Commands starting with 'z'",
    description: "redraw, cursor line at bottom of window,",
  },
  {
    key: "z.",
    mode: "Commands starting with 'z'",
    description: "redraw, cursor line to center of window,",
  },
  {
    key: "z=",
    mode: "Commands starting with 'z'",
    description: "give spelling suggestions",
  },
  {
    key: "zA",
    mode: "Commands starting with 'z'",
    description: "open a closed fold or close an open fold",
  },
  {
    key: "zC",
    mode: "Commands starting with 'z'",
    description: "close folds recursively",
  },
  {
    key: "zD",
    mode: "Commands starting with 'z'",
    description: "delete folds recursively",
  },
  {
    key: "zE",
    mode: "Commands starting with 'z'",
    description: "eliminate all folds",
  },
  {
    key: "zF",
    mode: "Commands starting with 'z'",
    description: "create a fold for N lines",
  },
  {
    key: "zG",
    mode: "Commands starting with 'z'",
    description: "temporarily mark word as correctly spelled",
  },
  {
    key: "zH",
    mode: "Commands starting with 'z'",
    description: "when 'wrap' off scroll half a screenwidth",
  },
  {
    key: "zL",
    mode: "Commands starting with 'z'",
    description: "when 'wrap' off scroll half a screenwidth",
  },
  {
    key: "zM",
    mode: "Commands starting with 'z'",
    description: "set 'foldlevel' to zero",
  },
  {
    key: "zN",
    mode: "Commands starting with 'z'",
    description: "set 'foldenable'",
  },
  {
    key: "zO",
    mode: "Commands starting with 'z'",
    description: "open folds recursively",
  },
  {
    key: "zR",
    mode: "Commands starting with 'z'",
    description: "set 'foldlevel' to the deepest fold",
  },
  {
    key: "zW",
    mode: "Commands starting with 'z'",
    description: "temporarily mark word as incorrectly spelled",
  },
  {
    key: "zX",
    mode: "Commands starting with 'z'",
    description: "re-apply 'foldlevel'",
  },
  {
    key: "z^",
    mode: "Commands starting with 'z'",
    description: "cursor on line N (default line above",
  },
  {
    key: "za",
    mode: "Commands starting with 'z'",
    description: "open a closed fold, close an open fold",
  },
  {
    key: "zb",
    mode: "Commands starting with 'z'",
    description: "redraw, cursor line at bottom of window",
  },
  {
    key: "zc",
    mode: "Commands starting with 'z'",
    description: "close a fold",
  },
  {
    key: "zd",
    mode: "Commands starting with 'z'",
    description: "delete a fold",
  },
  {
    key: "ze",
    mode: "Commands starting with 'z'",
    description: "when 'wrap' off scroll horizontally to",
  },
  {
    key: "zf",
    mode: "Commands starting with 'z'",
    description: "create a fold for Nmove text",
  },
  {
    key: "zg",
    mode: "Commands starting with 'z'",
    description: "permanently mark word as correctly spelled",
  },
  {
    key: "zh",
    mode: "Commands starting with 'z'",
    description: "when 'wrap' off scroll screen N characters",
  },
  {
    key: "zi",
    mode: "Commands starting with 'z'",
    description: "toggle 'foldenable'",
  },
  {
    key: "zj",
    mode: "Commands starting with 'z'",
    description: "move to the start of the next fold",
  },
  {
    key: "zk",
    mode: "Commands starting with 'z'",
    description: "move to the end of the previous fold",
  },
  {
    key: "zl",
    mode: "Commands starting with 'z'",
    description: "when 'wrap' off scroll screen N characters",
  },
  {
    key: "zm",
    mode: "Commands starting with 'z'",
    description: "subtract one from 'foldlevel'",
  },
  {
    key: "zn",
    mode: "Commands starting with 'z'",
    description: "reset 'foldenable'",
  },
  {
    key: "zo",
    mode: "Commands starting with 'z'",
    description: "open fold",
  },
  {
    key: "zp",
    mode: "Commands starting with 'z'",
    description: "paste in block-mode without trailing spaces",
  },
  {
    key: "zP",
    mode: "Commands starting with 'z'",
    description: "paste in block-mode without trailing spaces",
  },
  {
    key: "zr",
    mode: "Commands starting with 'z'",
    description: "add one to 'foldlevel'",
  },
  {
    key: "zs",
    mode: "Commands starting with 'z'",
    description: "when 'wrap' off scroll horizontally to",
  },
  {
    key: "zt",
    mode: "Commands starting with 'z'",
    description: "redraw, cursor line at top of window",
  },
  {
    key: "zv",
    mode: "Commands starting with 'z'",
    description: "open enough folds to view the cursor line",
  },
  {
    key: "zw",
    mode: "Commands starting with 'z'",
    description: "permanently mark word as incorrectly spelled",
  },
  {
    key: "zx",
    mode: "Commands starting with 'z'",
    description: "re-apply 'foldlevel' and do \"zv\"",
  },
  {
    key: "zy",
    mode: "Commands starting with 'z'",
    description: "yank without trailing spaces",
  },
  {
    key: "zz",
    mode: "Commands starting with 'z'",
    description: "redraw, cursor line at center of window",
  },
  {
    key: ":!",
    mode: "EX commands",
    description: "filter lines or execute an external command",
  },
  {
    key: ":#",
    mode: "EX commands",
    description: 'same as ":number"',
  },
  {
    key: ":&",
    mode: "EX commands",
    description: 'repeat last ":substitute"',
  },
  {
    key: ":<",
    mode: "EX commands",
    description: "shift lines one 'shiftwidth' left",
  },
  {
    key: ":=",
    mode: "EX commands",
    description: "print the cursor line number",
  },
  {
    key: ":>",
    mode: "EX commands",
    description: "shift lines one 'shiftwidth' right",
  },
  {
    key: ":@",
    mode: "EX commands",
    description: "execute contents of a register",
  },
  {
    key: ":X",
    mode: "EX commands",
    description: "ask for encryption key",
  },
  {
    key: ":k",
    mode: "EX commands",
    description: "set a mark",
  },
  {
    key: ":t",
    mode: "EX commands",
    description: 'same as ":copy"',
  },
  {
    key: ":z",
    mode: "EX commands",
    description: "print some lines",
  },
  {
    key: ":~",
    mode: "EX commands",
    description: 'repeat last ":substitute"',
  },
  {
    key: ":w",
    mode: "EX commands",
    description: "write to buffer/save",
  },
  {
    key: ":wq",
    mode: "EX commands",
    description: "write to buffer and quit/save and quit",
  },
  {
    key: ":q",
    mode: "EX commands",
    description: "exit window, quit",
  },
  {
    key: ":wq",
    mode: "EX commands",
    description: "exit window by force, force quit",
  },
  {
    key: "<Tab>",
    mode: "Normal",
    description: "go to N newer entry in jump list",
  },
  {
    key: "<Space>",
    mode: "Normal",
    description: 'same as "l"',
  },
  {
    key: "!",
    mode: "Normal",
    description: "!{motion}{filter}",
  },
  {
    key: "!!",
    mode: "Normal",
    description: "filter N lines through the {filter} command",
  },
  {
    key: "#",
    mode: "Normal",
    description: "search backward for the Nth occurrence of",
  },
  {
    key: "$",
    mode: "Normal",
    description: "cursor to the end of Nth next line",
  },
  {
    key: "%",
    mode: "Normal",
    description: "find the next (curly/square) bracket on",
  },
  {
    key: "N%",
    mode: "Normal",
    description: "go to N percentage in the file",
  },
  {
    key: "&",
    mode: "Normal",
    description: "repeat last :s",
  },
  {
    key: "'",
    mode: "Normal",
    description: "cursor to the first CHAR on the line with",
  },
  {
    key: "''",
    mode: "Normal",
    description: "cursor to the first CHAR of the line where",
  },
  {
    key: "'(",
    mode: "Normal",
    description: "cursor to the first CHAR on the line of the",
  },
  {
    key: "')",
    mode: "Normal",
    description: "cursor to the first CHAR on the line of the",
  },
  {
    key: "'<",
    mode: "Normal",
    description: "cursor to the first CHAR of the line where",
  },
  {
    key: "'>",
    mode: "Normal",
    description: "cursor to the first CHAR of the line where",
  },
  {
    key: "'[",
    mode: "Normal",
    description: "cursor to the first CHAR on the line of the",
  },
  {
    key: "']",
    mode: "Normal",
    description: "cursor to the first CHAR on the line of the",
  },
  {
    key: "'{",
    mode: "Normal",
    description: "cursor to the first CHAR on the line of the",
  },
  {
    key: "'}",
    mode: "Normal",
    description: "cursor to the first CHAR on the line of the",
  },
  {
    key: "(",
    mode: "Normal",
    description: "cursor N sentences backward",
  },
  {
    key: ")",
    mode: "Normal",
    description: "cursor N sentences forward",
  },
  {
    key: "+",
    mode: "Normal",
    description: "same as <CR>",
  },
  {
    key: ",",
    mode: "Normal",
    description: "repeat latest f, t, F or T in opposite",
  },
  {
    key: "-",
    mode: "Normal",
    description: "cursor to the first CHAR N lines higher",
  },
  {
    key: ".",
    mode: "Normal",
    description: "repeat last change with count replaced with",
  },
  {
    key: "/",
    mode: "Normal",
    description: "search forward for the Nth occurrence of",
  },
  {
    key: ":",
    mode: "Normal",
    description: "start entering an Ex command",
  },
  {
    key: "N:",
    mode: "Normal",
    description: "start entering an Ex command with range",
  },
  {
    key: ";",
    mode: "Normal",
    description: "repeat latest f, t, F or T N times",
  },
  {
    key: "<",
    mode: "Normal",
    description: "shift Nmove lines one 'shiftwidth'",
  },
  {
    key: "=",
    mode: "Normal",
    description: 'filter Nmove lines through "indent"',
  },
  {
    key: "==",
    mode: "Normal",
    description: 'filter N lines through "indent"',
  },
  {
    key: ">",
    mode: "Normal",
    description: "shift Nmove lines one 'shiftwidth'",
  },
  {
    key: "?",
    mode: "Normal",
    description: "search backward for the Nth previous",
  },
  {
    key: "@",
    mode: "Normal",
    description: "execute the contents of register {a-z}",
  },
  {
    key: "@:",
    mode: "Normal",
    description: 'repeat the previous ":" command N times',
  },
  {
    key: "@@",
    mode: "Normal",
    description: "repeat the previous @{a-z} N times",
  },
];
