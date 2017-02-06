import moment from 'moment';
import marked from 'marked';
import hljs from 'highlight.js';
import pangu from 'pangu';
import { Category } from '../models';

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

moment.locale('zh-cn');

export default {
    marked: value => marked(pangu.spacing(value)),
    prettyDate: value => moment(value).format('ll'),
    getCateName: async value => {
        let res = await Category.findByUrl(value);
        if (res.status === 'error') {
            return value;
        }
        return res.name;
    }
}

