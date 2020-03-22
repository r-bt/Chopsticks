const showdown = require('showdown');

showdown.extension('titles', () => {
    return {
        type    : 'output',
        regex   : '<h1 (.*)>',
        replace : '<h1 class="section-title" $1>'
    }
});

showdown.extension('code', () => {
    return {
        type    : 'output',
        regex   : '<code>',
        replace : '<code class="prettyprint">'
    }
});

showdown.extension('emphasis', () => {
    return {
        type    : 'output',
        filter: function (text, converter, options) {
            const regex = /<blockquote>[^>]*?(<[^>]*)>/g
            text = text.replace(regex, (a,b) => {
                if(b.includes('class')){
                    return b.replace(/class="([^"]+)/g, '$& emphasis') + ">";
                }
                return b + ' class="emphasis">';
            });
            text = text.replace(/<\/?blockquote>/g, "");
            return text;
        }
    }
});

showdown.extension('sections', () => {
    return {
        type    : 'output',
        filter: function (text, converter, options) {
            let n = 0;
            text = text.replace(/<h1/g, (match) => {
                return (n++ < 1) ? '<div class="section">' + match : '</div><div class="section">' + match;
            });
            text = text.replace(/<h2[^>]*>[^<]*<\/h2>/g, (match) => {
                return (n++ < 1) ? '<div class="section">': '</div><div class="section">';
            });
            return text + "</div>";
        }
    }
});

showdown.extension('code-position', () => {
    return {
        type    : 'output',
        filter: function (text, converter, options) {
            text = text.replace(/(<\/ol>)\s*(<pre>[\s\S]+?(?=<\/pre)[^\s]+)/g, "$2 $1");
            return text
        }
    }
});

showdown.extension('p-position', () => {
    return {
        type    : 'output',
        filter: function (text, converter, options) {
            text = text.replace(/(<\/ol>)\s*(<p[\s\S]+?(?=<\/p)[^\s]+)/g, "$2 $1");
            return text
        }
    }
});

showdown.extension('list-starts', () => {
    return {
        type    : 'output',
        regex   : '<ol start="([0-9]*)">',
        replace : '<ol start="$1" style="--s:$1">'
    }
})
