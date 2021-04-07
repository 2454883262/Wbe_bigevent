$(function() {
    var form = layui.form;
    form.verify({
        // 自定义密码规则
        pwd: [/^\S{6,12}$/, '密码必须是6-12位，无空格'],
        // 验证两次密码是否相同
        repwd: function(value) {
            // 1.拿到密码框的值
            // 2.判断值与密码框的值是否相同
            // 3. 如果判断失败，return一个提示消息即可
            var pwd = $('.layui-card [name=newPwd]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        },
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        })
    })
})