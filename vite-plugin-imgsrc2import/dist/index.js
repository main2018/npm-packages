import{win32 as t,posix as e,isAbsolute as n,resolve as o}from"path";import{parse as a}from"svelte/compiler";import u from"fs";function r(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var s,i,p,c,l,f,A,R,_,E,g,h={};function y(){if(i)return s;i=1;const t="\\\\/",e=`[^${t}]`,n="\\.",o="\\/",a="[^/]",u=`(?:${o}|$)`,r=`(?:^|${o})`,p=`${n}{1,2}${u}`,c={DOT_LITERAL:n,PLUS_LITERAL:"\\+",QMARK_LITERAL:"\\?",SLASH_LITERAL:o,ONE_CHAR:"(?=.)",QMARK:a,END_ANCHOR:u,DOTS_SLASH:p,NO_DOT:`(?!${n})`,NO_DOTS:`(?!${r}${p})`,NO_DOT_SLASH:`(?!${n}{0,1}${u})`,NO_DOTS_SLASH:`(?!${p})`,QMARK_NO_DOT:`[^.${o}]`,STAR:`${a}*?`,START_ANCHOR:r,SEP:"/"},l={...c,SLASH_LITERAL:`[${t}]`,QMARK:e,STAR:`${e}*?`,DOTS_SLASH:`${n}{1,2}(?:[${t}]|$)`,NO_DOT:`(?!${n})`,NO_DOTS:`(?!(?:^|[${t}])${n}{1,2}(?:[${t}]|$))`,NO_DOT_SLASH:`(?!${n}{0,1}(?:[${t}]|$))`,NO_DOTS_SLASH:`(?!${n}{1,2}(?:[${t}]|$))`,QMARK_NO_DOT:`[^.${t}]`,START_ANCHOR:`(?:^|[${t}])`,END_ANCHOR:`(?:[${t}]|$)`,SEP:"\\"};return s={MAX_LENGTH:65536,POSIX_REGEX_SOURCE:{alnum:"a-zA-Z0-9",alpha:"a-zA-Z",ascii:"\\x00-\\x7F",blank:" \\t",cntrl:"\\x00-\\x1F\\x7F",digit:"0-9",graph:"\\x21-\\x7E",lower:"a-z",print:"\\x20-\\x7E ",punct:"\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",space:" \\t\\r\\n\\v\\f",upper:"A-Z",word:"A-Za-z0-9_",xdigit:"A-Fa-f0-9"},REGEX_BACKSLASH:/\\(?![*+?^${}(|)[\]])/g,REGEX_NON_SPECIAL_CHARS:/^[^@![\].,$*+?^{}()|\\/]+/,REGEX_SPECIAL_CHARS:/[-*+?.^${}(|)[\]]/,REGEX_SPECIAL_CHARS_BACKREF:/(\\?)((\W)(\3*))/g,REGEX_SPECIAL_CHARS_GLOBAL:/([-*+?.^${}(|)[\]])/g,REGEX_REMOVE_BACKSLASH:/(?:\[.*?[^\\]\]|\\(?=.))/g,REPLACEMENTS:{"***":"*","**/**":"**","**/**/**":"**"},CHAR_0:48,CHAR_9:57,CHAR_UPPERCASE_A:65,CHAR_LOWERCASE_A:97,CHAR_UPPERCASE_Z:90,CHAR_LOWERCASE_Z:122,CHAR_LEFT_PARENTHESES:40,CHAR_RIGHT_PARENTHESES:41,CHAR_ASTERISK:42,CHAR_AMPERSAND:38,CHAR_AT:64,CHAR_BACKWARD_SLASH:92,CHAR_CARRIAGE_RETURN:13,CHAR_CIRCUMFLEX_ACCENT:94,CHAR_COLON:58,CHAR_COMMA:44,CHAR_DOT:46,CHAR_DOUBLE_QUOTE:34,CHAR_EQUAL:61,CHAR_EXCLAMATION_MARK:33,CHAR_FORM_FEED:12,CHAR_FORWARD_SLASH:47,CHAR_GRAVE_ACCENT:96,CHAR_HASH:35,CHAR_HYPHEN_MINUS:45,CHAR_LEFT_ANGLE_BRACKET:60,CHAR_LEFT_CURLY_BRACE:123,CHAR_LEFT_SQUARE_BRACKET:91,CHAR_LINE_FEED:10,CHAR_NO_BREAK_SPACE:160,CHAR_PERCENT:37,CHAR_PLUS:43,CHAR_QUESTION_MARK:63,CHAR_RIGHT_ANGLE_BRACKET:62,CHAR_RIGHT_CURLY_BRACE:125,CHAR_RIGHT_SQUARE_BRACKET:93,CHAR_SEMICOLON:59,CHAR_SINGLE_QUOTE:39,CHAR_SPACE:32,CHAR_TAB:9,CHAR_UNDERSCORE:95,CHAR_VERTICAL_LINE:124,CHAR_ZERO_WIDTH_NOBREAK_SPACE:65279,extglobChars:t=>({"!":{type:"negate",open:"(?:(?!(?:",close:`))${t.STAR})`},"?":{type:"qmark",open:"(?:",close:")?"},"+":{type:"plus",open:"(?:",close:")+"},"*":{type:"star",open:"(?:",close:")*"},"@":{type:"at",open:"(?:",close:")"}}),globChars:t=>!0===t?l:c},s}function $(){return p||(p=1,function(t){const{REGEX_BACKSLASH:e,REGEX_REMOVE_BACKSLASH:n,REGEX_SPECIAL_CHARS:o,REGEX_SPECIAL_CHARS_GLOBAL:a}=y();t.isObject=t=>null!==t&&"object"==typeof t&&!Array.isArray(t),t.hasRegexChars=t=>o.test(t),t.isRegexChar=e=>1===e.length&&t.hasRegexChars(e),t.escapeRegex=t=>t.replace(a,"\\$1"),t.toPosixSlashes=t=>t.replace(e,"/"),t.isWindows=()=>{if("undefined"!=typeof navigator&&navigator.platform){const t=navigator.platform.toLowerCase();return"win32"===t||"windows"===t}return!("undefined"==typeof process||!process.platform)&&"win32"===process.platform},t.removeBackslashes=t=>t.replace(n,(t=>"\\"===t?"":t)),t.escapeLast=(e,n,o)=>{const a=e.lastIndexOf(n,o);return-1===a?e:"\\"===e[a-1]?t.escapeLast(e,n,a-1):`${e.slice(0,a)}\\${e.slice(a)}`},t.removePrefix=(t,e={})=>{let n=t;return n.startsWith("./")&&(n=n.slice(2),e.prefix="./"),n},t.wrapOutput=(t,e={},n={})=>{let o=`${n.contains?"":"^"}(?:${t})${n.contains?"":"$"}`;return!0===e.negated&&(o=`(?:^(?!${o}).*$)`),o},t.basename=(t,{windows:e}={})=>{const n=t.split(e?/[\\/]/:"/"),o=n[n.length-1];return""===o?n[n.length-2]:o}}(h)),h}function b(){if(l)return c;l=1;const t=$(),{CHAR_ASTERISK:e,CHAR_AT:n,CHAR_BACKWARD_SLASH:o,CHAR_COMMA:a,CHAR_DOT:u,CHAR_EXCLAMATION_MARK:r,CHAR_FORWARD_SLASH:s,CHAR_LEFT_CURLY_BRACE:i,CHAR_LEFT_PARENTHESES:p,CHAR_LEFT_SQUARE_BRACKET:f,CHAR_PLUS:A,CHAR_QUESTION_MARK:R,CHAR_RIGHT_CURLY_BRACE:_,CHAR_RIGHT_PARENTHESES:E,CHAR_RIGHT_SQUARE_BRACKET:g}=y(),h=t=>t===s||t===o,b=t=>{!0!==t.isPrefix&&(t.depth=t.isGlobstar?1/0:1)};return c=(c,l)=>{const y=l||{},$=c.length-1,C=!0===y.parts||!0===y.scanToEnd,S=[],d=[],x=[];let v,H,m=c,T=-1,L=0,O=0,k=!1,w=!1,I=!1,N=!1,B=!1,M=!1,G=!1,D=!1,P=!1,U=!1,K=0,F={value:"",depth:0,isGlob:!1};const X=()=>T>=$,Q=()=>(v=H,m.charCodeAt(++T));for(;T<$;){let t;if(H=Q(),H!==o){if(!0===M||H===i){for(K++;!0!==X()&&(H=Q());)if(H!==o)if(H!==i){if(!0!==M&&H===u&&(H=Q())===u){if(k=F.isBrace=!0,I=F.isGlob=!0,U=!0,!0===C)continue;break}if(!0!==M&&H===a){if(k=F.isBrace=!0,I=F.isGlob=!0,U=!0,!0===C)continue;break}if(H===_&&(K--,0===K)){M=!1,k=F.isBrace=!0,U=!0;break}}else K++;else G=F.backslashes=!0,Q();if(!0===C)continue;break}if(H!==s){if(!0!==y.noext){if(!0===(H===A||H===n||H===e||H===R||H===r)&&m.charCodeAt(T+1)===p){if(I=F.isGlob=!0,N=F.isExtglob=!0,U=!0,H===r&&T===L&&(P=!0),!0===C){for(;!0!==X()&&(H=Q());)if(H!==o){if(H===E){I=F.isGlob=!0,U=!0;break}}else G=F.backslashes=!0,H=Q();continue}break}}if(H===e){if(v===e&&(B=F.isGlobstar=!0),I=F.isGlob=!0,U=!0,!0===C)continue;break}if(H===R){if(I=F.isGlob=!0,U=!0,!0===C)continue;break}if(H===f){for(;!0!==X()&&(t=Q());)if(t!==o){if(t===g){w=F.isBracket=!0,I=F.isGlob=!0,U=!0;break}}else G=F.backslashes=!0,Q();if(!0===C)continue;break}if(!0===y.nonegate||H!==r||T!==L){if(!0!==y.noparen&&H===p){if(I=F.isGlob=!0,!0===C){for(;!0!==X()&&(H=Q());)if(H!==p){if(H===E){U=!0;break}}else G=F.backslashes=!0,H=Q();continue}break}if(!0===I){if(U=!0,!0===C)continue;break}}else D=F.negated=!0,L++}else{if(S.push(T),d.push(F),F={value:"",depth:0,isGlob:!1},!0===U)continue;if(v===u&&T===L+1){L+=2;continue}O=T+1}}else G=F.backslashes=!0,H=Q(),H===i&&(M=!0)}!0===y.noext&&(N=!1,I=!1);let W=m,j="",q="";L>0&&(j=m.slice(0,L),m=m.slice(L),O-=L),W&&!0===I&&O>0?(W=m.slice(0,O),q=m.slice(O)):!0===I?(W="",q=m):W=m,W&&""!==W&&"/"!==W&&W!==m&&h(W.charCodeAt(W.length-1))&&(W=W.slice(0,-1)),!0===y.unescape&&(q&&(q=t.removeBackslashes(q)),W&&!0===G&&(W=t.removeBackslashes(W)));const Z={prefix:j,input:c,start:L,base:W,glob:q,isBrace:k,isBracket:w,isGlob:I,isExtglob:N,isGlobstar:B,negated:D,negatedExtglob:P};if(!0===y.tokens&&(Z.maxDepth=0,h(H)||d.push(F),Z.tokens=d),!0===y.parts||!0===y.tokens){let t;for(let e=0;e<S.length;e++){const n=t?t+1:L,o=S[e],a=c.slice(n,o);y.tokens&&(0===e&&0!==L?(d[e].isPrefix=!0,d[e].value=j):d[e].value=a,b(d[e]),Z.maxDepth+=d[e].depth),0===e&&""===a||x.push(a),t=o}if(t&&t+1<c.length){const e=c.slice(t+1);x.push(e),y.tokens&&(d[d.length-1].value=e,b(d[d.length-1]),Z.maxDepth+=d[d.length-1].depth)}Z.slashes=S,Z.parts=x}return Z}}function C(){if(A)return f;A=1;const t=y(),e=$(),{MAX_LENGTH:n,POSIX_REGEX_SOURCE:o,REGEX_NON_SPECIAL_CHARS:a,REGEX_SPECIAL_CHARS_BACKREF:u,REPLACEMENTS:r}=t,s=(t,n)=>{if("function"==typeof n.expandRange)return n.expandRange(...t,n);t.sort();const o=`[${t.join("-")}]`;try{new RegExp(o)}catch(n){return t.map((t=>e.escapeRegex(t))).join("..")}return o},i=(t,e)=>`Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`,p=(c,l)=>{if("string"!=typeof c)throw new TypeError("Expected a string");c=r[c]||c;const f={...l},A="number"==typeof f.maxLength?Math.min(n,f.maxLength):n;let R=c.length;if(R>A)throw new SyntaxError(`Input length: ${R}, exceeds maximum allowed length: ${A}`);const _={type:"bos",value:"",output:f.prepend||""},E=[_],g=f.capture?"":"?:",h=t.globChars(f.windows),y=t.extglobChars(h),{DOT_LITERAL:$,PLUS_LITERAL:b,SLASH_LITERAL:C,ONE_CHAR:S,DOTS_SLASH:d,NO_DOT:x,NO_DOT_SLASH:v,NO_DOTS_SLASH:H,QMARK:m,QMARK_NO_DOT:T,STAR:L,START_ANCHOR:O}=h,k=t=>`(${g}(?:(?!${O}${t.dot?d:$}).)*?)`,w=f.dot?"":x,I=f.dot?m:T;let N=!0===f.bash?k(f):L;f.capture&&(N=`(${N})`),"boolean"==typeof f.noext&&(f.noextglob=f.noext);const B={input:c,index:-1,start:0,dot:!0===f.dot,consumed:"",output:"",prefix:"",backtrack:!1,negated:!1,brackets:0,braces:0,parens:0,quotes:0,globstar:!1,tokens:E};c=e.removePrefix(c,B),R=c.length;const M=[],G=[],D=[];let P,U=_;const K=()=>B.index===R-1,F=B.peek=(t=1)=>c[B.index+t],X=B.advance=()=>c[++B.index]||"",Q=()=>c.slice(B.index+1),W=(t="",e=0)=>{B.consumed+=t,B.index+=e},j=t=>{B.output+=null!=t.output?t.output:t.value,W(t.value)},q=()=>{let t=1;for(;"!"===F()&&("("!==F(2)||"?"===F(3));)X(),B.start++,t++;return t%2!=0&&(B.negated=!0,B.start++,!0)},Z=t=>{B[t]++,D.push(t)},z=t=>{B[t]--,D.pop()},V=t=>{if("globstar"===U.type){const e=B.braces>0&&("comma"===t.type||"brace"===t.type),n=!0===t.extglob||M.length&&("pipe"===t.type||"paren"===t.type);"slash"===t.type||"paren"===t.type||e||n||(B.output=B.output.slice(0,-U.output.length),U.type="star",U.value="*",U.output=N,B.output+=U.output)}if(M.length&&"paren"!==t.type&&(M[M.length-1].inner+=t.value),(t.value||t.output)&&j(t),U&&"text"===U.type&&"text"===t.type)return U.output=(U.output||U.value)+t.value,void(U.value+=t.value);t.prev=U,E.push(t),U=t},Y=(t,e)=>{const n={...y[e],conditions:1,inner:""};n.prev=U,n.parens=B.parens,n.output=B.output;const o=(f.capture?"(":"")+n.open;Z("parens"),V({type:t,value:e,output:B.output?"":S}),V({type:"paren",extglob:!0,value:X(),output:o}),M.push(n)},J=t=>{let e,n=t.close+(f.capture?")":"");if("negate"===t.type){let o=N;if(t.inner&&t.inner.length>1&&t.inner.includes("/")&&(o=k(f)),(o!==N||K()||/^\)+$/.test(Q()))&&(n=t.close=`)$))${o}`),t.inner.includes("*")&&(e=Q())&&/^\.[^\\/.]+$/.test(e)){const a=p(e,{...l,fastpaths:!1}).output;n=t.close=`)${a})${o})`}"bos"===t.prev.type&&(B.negatedExtglob=!0)}V({type:"paren",extglob:!0,value:P,output:n}),z("parens")};if(!1!==f.fastpaths&&!/(^[*!]|[/()[\]{}"])/.test(c)){let t=!1,n=c.replace(u,((e,n,o,a,u,r)=>"\\"===a?(t=!0,e):"?"===a?n?n+a+(u?m.repeat(u.length):""):0===r?I+(u?m.repeat(u.length):""):m.repeat(o.length):"."===a?$.repeat(o.length):"*"===a?n?n+a+(u?N:""):N:n?e:`\\${e}`));return!0===t&&(n=!0===f.unescape?n.replace(/\\/g,""):n.replace(/\\+/g,(t=>t.length%2==0?"\\\\":t?"\\":""))),n===c&&!0===f.contains?(B.output=c,B):(B.output=e.wrapOutput(n,B,l),B)}for(;!K();){if(P=X(),"\0"===P)continue;if("\\"===P){const t=F();if("/"===t&&!0!==f.bash)continue;if("."===t||";"===t)continue;if(!t){P+="\\",V({type:"text",value:P});continue}const e=/^\\+/.exec(Q());let n=0;if(e&&e[0].length>2&&(n=e[0].length,B.index+=n,n%2!=0&&(P+="\\")),!0===f.unescape?P=X():P+=X(),0===B.brackets){V({type:"text",value:P});continue}}if(B.brackets>0&&("]"!==P||"["===U.value||"[^"===U.value)){if(!1!==f.posix&&":"===P){const t=U.value.slice(1);if(t.includes("[")&&(U.posix=!0,t.includes(":"))){const t=U.value.lastIndexOf("["),e=U.value.slice(0,t),n=U.value.slice(t+2),a=o[n];if(a){U.value=e+a,B.backtrack=!0,X(),_.output||1!==E.indexOf(U)||(_.output=S);continue}}}("["===P&&":"!==F()||"-"===P&&"]"===F())&&(P=`\\${P}`),"]"!==P||"["!==U.value&&"[^"!==U.value||(P=`\\${P}`),!0===f.posix&&"!"===P&&"["===U.value&&(P="^"),U.value+=P,j({value:P});continue}if(1===B.quotes&&'"'!==P){P=e.escapeRegex(P),U.value+=P,j({value:P});continue}if('"'===P){B.quotes=1===B.quotes?0:1,!0===f.keepQuotes&&V({type:"text",value:P});continue}if("("===P){Z("parens"),V({type:"paren",value:P});continue}if(")"===P){if(0===B.parens&&!0===f.strictBrackets)throw new SyntaxError(i("opening","("));const t=M[M.length-1];if(t&&B.parens===t.parens+1){J(M.pop());continue}V({type:"paren",value:P,output:B.parens?")":"\\)"}),z("parens");continue}if("["===P){if(!0!==f.nobracket&&Q().includes("]"))Z("brackets");else{if(!0!==f.nobracket&&!0===f.strictBrackets)throw new SyntaxError(i("closing","]"));P=`\\${P}`}V({type:"bracket",value:P});continue}if("]"===P){if(!0===f.nobracket||U&&"bracket"===U.type&&1===U.value.length){V({type:"text",value:P,output:`\\${P}`});continue}if(0===B.brackets){if(!0===f.strictBrackets)throw new SyntaxError(i("opening","["));V({type:"text",value:P,output:`\\${P}`});continue}z("brackets");const t=U.value.slice(1);if(!0===U.posix||"^"!==t[0]||t.includes("/")||(P=`/${P}`),U.value+=P,j({value:P}),!1===f.literalBrackets||e.hasRegexChars(t))continue;const n=e.escapeRegex(U.value);if(B.output=B.output.slice(0,-U.value.length),!0===f.literalBrackets){B.output+=n,U.value=n;continue}U.value=`(${g}${n}|${U.value})`,B.output+=U.value;continue}if("{"===P&&!0!==f.nobrace){Z("braces");const t={type:"brace",value:P,output:"(",outputIndex:B.output.length,tokensIndex:B.tokens.length};G.push(t),V(t);continue}if("}"===P){const t=G[G.length-1];if(!0===f.nobrace||!t){V({type:"text",value:P,output:P});continue}let e=")";if(!0===t.dots){const t=E.slice(),n=[];for(let e=t.length-1;e>=0&&(E.pop(),"brace"!==t[e].type);e--)"dots"!==t[e].type&&n.unshift(t[e].value);e=s(n,f),B.backtrack=!0}if(!0!==t.comma&&!0!==t.dots){const n=B.output.slice(0,t.outputIndex),o=B.tokens.slice(t.tokensIndex);t.value=t.output="\\{",P=e="\\}",B.output=n;for(const t of o)B.output+=t.output||t.value}V({type:"brace",value:P,output:e}),z("braces"),G.pop();continue}if("|"===P){M.length>0&&M[M.length-1].conditions++,V({type:"text",value:P});continue}if(","===P){let t=P;const e=G[G.length-1];e&&"braces"===D[D.length-1]&&(e.comma=!0,t="|"),V({type:"comma",value:P,output:t});continue}if("/"===P){if("dot"===U.type&&B.index===B.start+1){B.start=B.index+1,B.consumed="",B.output="",E.pop(),U=_;continue}V({type:"slash",value:P,output:C});continue}if("."===P){if(B.braces>0&&"dot"===U.type){"."===U.value&&(U.output=$);const t=G[G.length-1];U.type="dots",U.output+=P,U.value+=P,t.dots=!0;continue}if(B.braces+B.parens===0&&"bos"!==U.type&&"slash"!==U.type){V({type:"text",value:P,output:$});continue}V({type:"dot",value:P,output:$});continue}if("?"===P){if(!(U&&"("===U.value)&&!0!==f.noextglob&&"("===F()&&"?"!==F(2)){Y("qmark",P);continue}if(U&&"paren"===U.type){const t=F();let e=P;("("===U.value&&!/[!=<:]/.test(t)||"<"===t&&!/<([!=]|\w+>)/.test(Q()))&&(e=`\\${P}`),V({type:"text",value:P,output:e});continue}if(!0!==f.dot&&("slash"===U.type||"bos"===U.type)){V({type:"qmark",value:P,output:T});continue}V({type:"qmark",value:P,output:m});continue}if("!"===P){if(!0!==f.noextglob&&"("===F()&&("?"!==F(2)||!/[!=<:]/.test(F(3)))){Y("negate",P);continue}if(!0!==f.nonegate&&0===B.index){q();continue}}if("+"===P){if(!0!==f.noextglob&&"("===F()&&"?"!==F(2)){Y("plus",P);continue}if(U&&"("===U.value||!1===f.regex){V({type:"plus",value:P,output:b});continue}if(U&&("bracket"===U.type||"paren"===U.type||"brace"===U.type)||B.parens>0){V({type:"plus",value:P});continue}V({type:"plus",value:b});continue}if("@"===P){if(!0!==f.noextglob&&"("===F()&&"?"!==F(2)){V({type:"at",extglob:!0,value:P,output:""});continue}V({type:"text",value:P});continue}if("*"!==P){"$"!==P&&"^"!==P||(P=`\\${P}`);const t=a.exec(Q());t&&(P+=t[0],B.index+=t[0].length),V({type:"text",value:P});continue}if(U&&("globstar"===U.type||!0===U.star)){U.type="star",U.star=!0,U.value+=P,U.output=N,B.backtrack=!0,B.globstar=!0,W(P);continue}let t=Q();if(!0!==f.noextglob&&/^\([^?]/.test(t)){Y("star",P);continue}if("star"===U.type){if(!0===f.noglobstar){W(P);continue}const e=U.prev,n=e.prev,o="slash"===e.type||"bos"===e.type,a=n&&("star"===n.type||"globstar"===n.type);if(!0===f.bash&&(!o||t[0]&&"/"!==t[0])){V({type:"star",value:P,output:""});continue}const u=B.braces>0&&("comma"===e.type||"brace"===e.type),r=M.length&&("pipe"===e.type||"paren"===e.type);if(!o&&"paren"!==e.type&&!u&&!r){V({type:"star",value:P,output:""});continue}for(;"/**"===t.slice(0,3);){const e=c[B.index+4];if(e&&"/"!==e)break;t=t.slice(3),W("/**",3)}if("bos"===e.type&&K()){U.type="globstar",U.value+=P,U.output=k(f),B.output=U.output,B.globstar=!0,W(P);continue}if("slash"===e.type&&"bos"!==e.prev.type&&!a&&K()){B.output=B.output.slice(0,-(e.output+U.output).length),e.output=`(?:${e.output}`,U.type="globstar",U.output=k(f)+(f.strictSlashes?")":"|$)"),U.value+=P,B.globstar=!0,B.output+=e.output+U.output,W(P);continue}if("slash"===e.type&&"bos"!==e.prev.type&&"/"===t[0]){const n=void 0!==t[1]?"|$":"";B.output=B.output.slice(0,-(e.output+U.output).length),e.output=`(?:${e.output}`,U.type="globstar",U.output=`${k(f)}${C}|${C}${n})`,U.value+=P,B.output+=e.output+U.output,B.globstar=!0,W(P+X()),V({type:"slash",value:"/",output:""});continue}if("bos"===e.type&&"/"===t[0]){U.type="globstar",U.value+=P,U.output=`(?:^|${C}|${k(f)}${C})`,B.output=U.output,B.globstar=!0,W(P+X()),V({type:"slash",value:"/",output:""});continue}B.output=B.output.slice(0,-U.output.length),U.type="globstar",U.output=k(f),U.value+=P,B.output+=U.output,B.globstar=!0,W(P);continue}const n={type:"star",value:P,output:N};!0!==f.bash?!U||"bracket"!==U.type&&"paren"!==U.type||!0!==f.regex?(B.index!==B.start&&"slash"!==U.type&&"dot"!==U.type||("dot"===U.type?(B.output+=v,U.output+=v):!0===f.dot?(B.output+=H,U.output+=H):(B.output+=w,U.output+=w),"*"!==F()&&(B.output+=S,U.output+=S)),V(n)):(n.output=P,V(n)):(n.output=".*?","bos"!==U.type&&"slash"!==U.type||(n.output=w+n.output),V(n))}for(;B.brackets>0;){if(!0===f.strictBrackets)throw new SyntaxError(i("closing","]"));B.output=e.escapeLast(B.output,"["),z("brackets")}for(;B.parens>0;){if(!0===f.strictBrackets)throw new SyntaxError(i("closing",")"));B.output=e.escapeLast(B.output,"("),z("parens")}for(;B.braces>0;){if(!0===f.strictBrackets)throw new SyntaxError(i("closing","}"));B.output=e.escapeLast(B.output,"{"),z("braces")}if(!0===f.strictSlashes||"star"!==U.type&&"bracket"!==U.type||V({type:"maybe_slash",value:"",output:`${C}?`}),!0===B.backtrack){B.output="";for(const t of B.tokens)B.output+=null!=t.output?t.output:t.value,t.suffix&&(B.output+=t.suffix)}return B};return p.fastpaths=(o,a)=>{const u={...a},s="number"==typeof u.maxLength?Math.min(n,u.maxLength):n,i=o.length;if(i>s)throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${s}`);o=r[o]||o;const{DOT_LITERAL:p,SLASH_LITERAL:c,ONE_CHAR:l,DOTS_SLASH:f,NO_DOT:A,NO_DOTS:R,NO_DOTS_SLASH:_,STAR:E,START_ANCHOR:g}=t.globChars(u.windows),h=u.dot?R:A,y=u.dot?_:A,$=u.capture?"":"?:";let b=!0===u.bash?".*?":E;u.capture&&(b=`(${b})`);const C=t=>!0===t.noglobstar?b:`(${$}(?:(?!${g}${t.dot?f:p}).)*?)`,S=t=>{switch(t){case"*":return`${h}${l}${b}`;case".*":return`${p}${l}${b}`;case"*.*":return`${h}${b}${p}${l}${b}`;case"*/*":return`${h}${b}${c}${l}${y}${b}`;case"**":return h+C(u);case"**/*":return`(?:${h}${C(u)}${c})?${y}${l}${b}`;case"**/*.*":return`(?:${h}${C(u)}${c})?${y}${b}${p}${l}${b}`;case"**/.*":return`(?:${h}${C(u)}${c})?${p}${l}${b}`;default:{const e=/^(.*?)\.(\w+)$/.exec(t);if(!e)return;const n=S(e[1]);if(!n)return;return n+p+e[2]}}},d=e.removePrefix(o,{negated:!1,prefix:""});let x=S(d);return x&&!0!==u.strictSlashes&&(x+=`${c}?`),x},f=p}function S(){if(_)return R;_=1;const t=b(),e=C(),n=$(),o=y(),a=(t,e,n=!1)=>{if(Array.isArray(t)){const o=t.map((t=>a(t,e,n))),u=t=>{for(const e of o){const n=e(t);if(n)return n}return!1};return u}const o=(u=t)&&"object"==typeof u&&!Array.isArray(u)&&t.tokens&&t.input;var u;if(""===t||"string"!=typeof t&&!o)throw new TypeError("Expected pattern to be a non-empty string");const r=e||{},s=r.windows,i=o?a.compileRe(t,e):a.makeRe(t,e,!1,!0),p=i.state;delete i.state;let c=()=>!1;if(r.ignore){const t={...e,ignore:null,onMatch:null,onResult:null};c=a(r.ignore,t,n)}const l=(n,o=!1)=>{const{isMatch:u,match:l,output:f}=a.test(n,i,e,{glob:t,posix:s}),A={glob:t,state:p,regex:i,posix:s,input:n,output:f,match:l,isMatch:u};return"function"==typeof r.onResult&&r.onResult(A),!1===u?(A.isMatch=!1,!!o&&A):c(n)?("function"==typeof r.onIgnore&&r.onIgnore(A),A.isMatch=!1,!!o&&A):("function"==typeof r.onMatch&&r.onMatch(A),!o||A)};return n&&(l.state=p),l};return a.test=(t,e,o,{glob:u,posix:r}={})=>{if("string"!=typeof t)throw new TypeError("Expected input to be a string");if(""===t)return{isMatch:!1,output:""};const s=o||{},i=s.format||(r?n.toPosixSlashes:null);let p=t===u,c=p&&i?i(t):t;return!1===p&&(c=i?i(t):t,p=c===u),!1!==p&&!0!==s.capture||(p=!0===s.matchBase||!0===s.basename?a.matchBase(t,e,o,r):e.exec(c)),{isMatch:Boolean(p),match:p,output:c}},a.matchBase=(t,e,o)=>(e instanceof RegExp?e:a.makeRe(e,o)).test(n.basename(t)),a.isMatch=(t,e,n)=>a(e,n)(t),a.parse=(t,n)=>Array.isArray(t)?t.map((t=>a.parse(t,n))):e(t,{...n,fastpaths:!1}),a.scan=(e,n)=>t(e,n),a.compileRe=(t,e,n=!1,o=!1)=>{if(!0===n)return t.output;const u=e||{},r=u.contains?"":"^",s=u.contains?"":"$";let i=`${r}(?:${t.output})${s}`;t&&!0===t.negated&&(i=`^(?!${i}).*$`);const p=a.toRegex(i,e);return!0===o&&(p.state=t),p},a.makeRe=(t,n={},o=!1,u=!1)=>{if(!t||"string"!=typeof t)throw new TypeError("Expected a non-empty string");let r={negated:!1,fastpaths:!0};return!1===n.fastpaths||"."!==t[0]&&"*"!==t[0]||(r.output=e.fastpaths(t,n)),r.output||(r=e(t,n)),a.compileRe(r,n,o,u)},a.toRegex=(t,e)=>{try{const n=e||{};return new RegExp(t,n.flags||(n.nocase?"i":""))}catch(t){if(e&&!0===e.debug)throw t;return/$^/}},a.constants=o,R=a}function d(){if(g)return E;g=1;const t=S(),e=$();function n(n,o,a=!1){return!o||null!==o.windows&&void 0!==o.windows||(o={...o,windows:e.isWindows()}),t(n,o,a)}return Object.assign(n,t),E=n}var x=r(d());function v(t){return e=t,Array.isArray(e)?t:null==t?[]:[t];var e}const H=new RegExp(`\\${t.sep}`,"g"),m=function(t){return t.replace(H,e.sep)};const T=function(t,a,u){const r=u&&u.resolve,s=t=>t instanceof RegExp?t:{test:a=>{const u=function(t,a){if(!1===a||n(t)||t.startsWith("**"))return m(t);const u=m(o(a||"")).replace(/[-^$*+?.()|[\]{}]/g,"\\$&");return e.join(u,m(t))}(t,r);return x(u,{dot:!0})(a)}},i=v(t).map(s),p=v(a).map(s);return i.length||p.length?function(t){if("string"!=typeof t)return!1;if(t.includes("\0"))return!1;const e=m(t);for(let t=0;t<p.length;++t){const n=p[t];if(n instanceof RegExp&&(n.lastIndex=0),n.test(e))return!1}for(let t=0;t<i.length;++t){const n=i[t];if(n instanceof RegExp&&(n.lastIndex=0),n.test(e))return!0}return!i.length}:t=>"string"==typeof t&&!t.includes("\0")};function L(t){const e={...{include:"**/*.svelte",exclude:void 0,prefix:"img_"},...t},n=T(e.include,e.exclude);return{name:"vite-plugin-img-src-to-import",load(t){if(n(t))try{const n=u.readFileSync(t,"utf-8"),o=a(n,{filename:t});let r=n,s="";const i=new Map;let p=0,c=0;const l=t=>{if("Element"===t.type&&"img"===t.name){const n=t.attributes.find((t=>"src"===t.name));if(n&&n.value.length>0){const t=n.value[0].data;if(!t)return;if(t.startsWith(".")&&!i.has(t)){const n=`${e.prefix}${t.replace(/[^a-zA-Z0-9]/g,"_")}`;s+=`  import ${n} from '${t}';\n`,i.set(t,n)}if(i.has(t)){const e=i.get(t),{start:a,end:u}=n.value[0];r=r.slice(0,a+p)+`{${e}}`+r.slice(u+p),p+=`{${e}}`.length-(u-a);a>o.instance?.content.start||(c+=`{${e}}`.length-(u-a))}}}t.children&&t.children.forEach(l)};l(o.html);const f=o.instance?.content;return f&&s&&(r=r.slice(0,f.start+c)+`\n${s}\n`+r.slice(f.start+c)),r}catch(t){return null}}}}new Set("break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl".split(" ")).add("");export{L as default};
