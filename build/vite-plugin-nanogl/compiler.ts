import path from 'path';
import { readFileSync } from 'fs';
import crypto from "crypto";

// Modified version of _ (Underscore)  templates
// (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors


// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
var templateSettings = {
  evaluate    : /\{\{=([\s\S]+?)\}\}/g,
  scoped      : /\{\{@([\s\S]+?)\}\}/g,
  interpolate : /\{\{([\s\S]+?)\}\}/g
};


// includes: /\{\{\s*require\((\s*([^\s<>]+)\s*)\)\s*\}\}/g
// (?!.*(require))

// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/;



// Certain characters need to be escaped so that they can be put into a
// string literal.
var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function(match) {
  return '\\' + escapes[match];
};

export function loadChunk(text: string): string {

  const settings = templateSettings;

  // Combine delimiters into one regular expression via alternation.
  var matcher = RegExp([
    (settings.scoped || noMatch).source,
    (settings.evaluate || noMatch).source,
    (settings.interpolate || noMatch).source,
    // (settings.includes || noMatch).source,
  ].join('|') + '|$', 'g');

  // Compile the template source, escaping string literals appropriately.
  var index = 0;
  var source = "__p+='";

  const include = /\{\{\s*require\((.+)\)\s*\}\}?/g
  let deps = [];

  text.replace(matcher, function(match, scoped, evaluate, interpolate, offset) {
    source += text.slice(index, offset).replace(escaper, escapeChar);
    index = offset + match.length;

    if (scoped) {
      source += "'+\n(obj." + scoped + ")+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    } else if (interpolate) {

      let out = interpolate;
      if(match.match(include)){
        let chunkPath = match.trim().replace(/\{\{\s*require\(\s*[\"\']|[\"\']\s*\).*\}\}?/gi, '');
        const uid = "module_"+ crypto.randomUUID().replaceAll( "-", '' );
        deps.push({
          import: "import " + uid + " from '" + chunkPath + "'\n",
        });

        out = "" + uid + "()";

      }

      source += "'+\n(" + out + ")+\n'";

    }

    // Adobe VMs need the match returned to produce the correct offest.
    return match;
  });


  source += "';\n";

  // If a variable is not specified, place data values in local scope.
  source = "var __t,__p='';\n" + source + 'return __p;\n';

  var module = 'var fn = function( obj ){\n' + source + '};\nfn.toString=fn;\nexport default fn;'

  for (const dep of deps) {
    module = dep.import + module;
  }

  return module;

}



export async function loadShaders(source: string, shader: string, extension: string) {
  return loadChunk(source);//, path.dirname(shader), extension);
}