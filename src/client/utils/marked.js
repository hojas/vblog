import pangu from 'pangu';
import marked from 'marked';

const renderer = new marked.Renderer();

renderer.code = function(code) {
    let hl = this.options.highlight;
    code = hl && hl(code) || code;

    return `<pre><code class="hljs">${code}\n</code></pre>`;
}

marked.setOptions({
    renderer,
    highlight: code => hljs.highlightAuto(code).value,
});

export default function(value) {
    return marked(pangu.spacing(value));
}

