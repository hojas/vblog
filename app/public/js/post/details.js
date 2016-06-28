import $ from 'jquery';
import hljs from 'hljs';

$(function() {
    $('pre code').each((i, block) => {
        hljs.highlightBlock(block);
    });
});

