$(document).ready(function () {
    $('.delete-article').on('click',function (e) {
        $target = $(e.target);
        console.log($target.attr('data-id'))
        const id =  $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/article/'+id,
            success: function (res) {
               // alert('Deleting....');
                window.location.href='/';
            },
            error: function (err) {
                concole.log(err);
            }

        })
    })
})