$(function() {
    initArtCatel();

    // 获取文章分类

    function initArtCatel() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                var htmlStr = template('tpl-table', res);
                $('#tb').html(htmlStr);
            }
        })
    };


    // 添加事件
    var index = null;
    $('#btnAddCate').on('click', function() {

        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),

        });
    })


    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                initArtCatel();
                layer.close(index);
            }
        })
    })
    var index1 = null;
    var form = layui.form;
    $('tbody').on('click', '.btn-edit', function() {
        index1 = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html(),
        });


        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                form.val('form-edit', res.data);
            }
        })
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                initArtCatel();
                layer.close(index);
            }
        })
    })

    // 删除事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message);
                    initArtCatel();

                }
            })
            layer.close(index);
        });
    })
})