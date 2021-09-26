var keywords = [
    "and",
    "break",
    "do",
    "else",
    "elseif",
    "function",
    "if",
    "for",
    "false",
    "end",
    "in",
    "local",
    "nil",
    "not",
    "or",
    "repeat",
    "return",
    "then",
    "true",
    "until",
    "while",
];

var predefined = [
    "assert",
    "collectgarbage",
    "dofile",
    "error",
    "_G",
    "getfenv",
    "getmetatable",
    "ipairs",
    "load",
    "loadfile",
    "loadstring",
    "next",
    "pairs",
    "pcall",
    "print",
    "rawequal",
    "rawget",
    "rawset",
    "select",
    "setfenv",
    "setmetatable",
    "tonumber",
    "tostring",
    "type",
    "unpack",
    "_VERSION",
    "xpcall",
    "coroutine",
    "coroutine.resume",
    "coroutine.running",
    "coroutine.status",
    "coroutine.wrap",
    "coroutine.yield",
    "module",
    "require",
    "package",
    "package.cpath",
    "package.loaded",
    "package.loaders",
    "package.loadlib",
    "package.path",
    "package.preload",
    "package.seeall",
    "string",
    "string.byte",
    "string.char",
    "string.dump",
    "string.find",
    "string.format",
    "string.gmatch",
    "string.gsub",
    "string.len",
    "string.lower",
    "string.match",
    "string.rep",
    "string.reverse",
    "string.sub",
    "string.upper",
    "table",
    "table.concat",
    "table.insert",
    "table.maxn",
    "table.remove",
    "table.sort",
    "math",
    "math.abs",
    "math.acos",
    "math.asin",
    "math.atan",
    "math.atan2",
    "math.ceil",
    "math.cos",
    "math.cosh",
    "math.deg",
    "math.exp",
    "math.floor",
    "math.fmod",
    "math.frexp",
    "math.huge",
    "math.ldexp",
    "math.log",
    "math.log10",
    "math.max",
    "math.min",
    "math.modf",
    "math.pi",
    "math.pow",
    "math.rad",
    "math.random",
    "math.randomseed",
    "math.sin",
    "math.sinh",
    "math.sqrt",
    "math.tan",
    "math.tanh",
    "io",
    "io.close",
    "io.flush",
    "io.input",
    "io.lines",
    "io.open",
    "io.output",
    "io.popen",
    "io.read",
    "io.tmpfile",
    "io.type",
    "io.write",
    "os",
    "os.clock",
    "os.date",
    "os.difftime",
    "os.execute",
    "os.exit",
    "os.getenv",
    "os.remove",
    "os.setlocale",
    "os.time",
    "os.tmpname",
    "debug",
    "debug.debug",
    "debug.getfenv",
    "debug.gethook",
    "debug.getinfo",
    "debug.getlocal",
    "debug.getmetatable",
    "debug.getregistry",
    "debug.getupvalue",
    "debug.setfenv",
    "debug.sethook",
    "debug.setlocal",
    "debug.setmetatable",
    "debug.setupvalue",
    "debug.traceback",
];

export const getUpdated = (text: string) => {
    var newStr = "";
    var cnstr = "";
    text.split(/[.]+/).forEach((char) => {
        if (/[-\!\$%\^&\*\(\)_\+|~=`\{\}\[\]:";'\<\>\?\,\.\/]/.test(char)) {
            cnstr += `<span class="operator">${char}</span>`;
        } else {
            cnstr += char;
        }

        if (/[-\!\$%\^&\*\(\)_\+|~=`\{\}\[\]:";'\<\>\?\,\.\/\s]/.test(char)) {
            // parse by keywords
            keywords.forEach((val) => {
                if (val == cnstr.substr(0, cnstr.length - 2)) {
                    var strn = `<span class="keywords">${cnstr}</span>`;
                    newStr += strn;
                    cnstr = "";
                }
            });

            newStr += cnstr;
            cnstr = "";
        }

        // parse by built-ins
        predefined.forEach((val) => {
            if (val == cnstr) {
                var strn = `<span class="function-title">${cnstr}</span>`;
                newStr += strn;
                cnstr = "";
            }
        });
    });

    newStr += cnstr;
    console.log(newStr);

    return newStr;
};
