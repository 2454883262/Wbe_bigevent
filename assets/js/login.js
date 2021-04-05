$(function() {
    $('#link_reg').on('click', function() {

        console.log(1);
        $('.login-box').hide().siblings().show();

    });
    $('#link_login').on('click', function() {

        console.log(1);
        $('.reg-box').hide().siblings().show();

    });
    var form = layui.form;
    form.verify({
        //'密码必须6到12位，且不能出现空格'
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            console.log(pwd);
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
            $('#link_login').click()
        })
    });
    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    });
    $.ajaxPrefilter(function(options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })

})