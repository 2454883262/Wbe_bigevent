$(function() {
    // 点击“去注册账号”链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide().siblings().show();
    });
    // 点击“去登录”链接

    $('#link_login').on('click', function() {
        $('.reg-box').hide().siblings().show();
    });



    // layui中获取form对象
    // 通过form.verify()函数自定义校验规则
    layui.form.verify({
        // 自定义密码规则
        pwd: [/^\S{6,12}$/, '密码必须是6-12位，无空格'],
        // 验证两次密码是否相同
        repwd: function(value) {
            // 1.拿到密码框的值
            // 2.判断值与密码框的值是否相同
            // 3. 如果判断失败，return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var pwd = $('.reg-box [name=password]').val();
        var username = $('.reg-box [name=username]').val();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: username,
                password: pwd
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);

                // 自动点击事件
                $('#link_login').click();
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        var pwd = $('.login-box [name=possword]');
        var username = $('.login-box [name=username]');
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize()
                //  快速获取表单中的数据

            // {
            //     username: username,
            //     password: pwd
            // }
            ,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // console.log(res.token);
                // 登录成功得到token字符串 保存到localStorage
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }

        })

    })



})