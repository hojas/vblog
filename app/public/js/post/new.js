var $ = require('jquery');
var ace = require('brace');

require('brace/mode/markdown');
require('brace/theme/monokai');

init();

function init() {
    var editor = ace.edit('post-editor');

    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/markdown');
    editor.getSession().setTabSize(4);
    editor.getSession().setUseWrapMode(true);


    $('.addpost').on('click', function() {
        var content = editor.getValue();
        var title = $('[name=title]').val();
        var category = $('[name=category]').val();
        var tags = $('[name=tags]').val();

        $.post('/new', {
            title: title,
            content: content,
            tags: tags,
            category: category
        })
        .done(function(data) {
            if (data && data.next) {
                location.href = data.next;
            }
        });

        return false;
    });
}

