$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function(data) {
        const dt = new Data(data);
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        m = m > 10 ? m : '0' + m;
        var d = dt.getDate();
        d = d > 10 ? d : '0' + d;

        var hh = dt.getHours();
        hh = hh > 10 ? hh : '0' + hh;

        var mm = dt.getMinutes();
        mm = mm > 10 ? mm : '0' + mm;
        var ss = dt.getSeconds();
        ss = ss > 10 ? ss : '0' + ss;

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable();
    initCate();

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                console.log(res);
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);

            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log(res);
                // layer.msg(res.message);
                var htmlStr = template('tpl-cate', res);
                console.log(htmlStr);
                $('[name = cate_id]').html(htmlStr);
                form.render();
            }
        })
    }


    $('#form-search').on('submit', function(e) {
        e.preventDefault();

        var cate_id = $('[name = cate_id]').val();
        var state = $('[name = state]').val();
        q.cate_id = cate_id;
        q.state = state;

        initTable();
    })


    // ????????????
    function renderPage(total) {
        // ?????? laypage.render() ??????????????????????????????
        laypage.render({
            elem: 'pageBox', // ??????????????? Id
            count: total, // ???????????????
            limit: q.pagesize, // ????????????????????????
            curr: q.pagenum, // ??????????????????????????????
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],


            // ???????????????????????????????????? jump ??????
            jump: function(obj, first) {
                console.log(first);
                console.log(obj.curr)
                    // ????????????????????????????????? q ???????????????????????????
                q.pagenum = obj.curr


                if (!first) {
                    initTable();
                }
            }
        })
    }
})