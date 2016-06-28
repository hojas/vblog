import $ from 'jquery';

$('.addpost').on('click', () => {
    let content = $('textarea').val();
    let title = $('[name=title]').val();
    let category = $('[name=category]').val();
    let tags = $('[name=tags]').val();

    $.post(location.pathname, {
        post: {
            title: title,
            content: content,
            tags: tags,
            category: category,
        }
    })
    .done(data => {
        if (data && data.next) {
            location.href = data.next;
        }
    });

    return false;
});

