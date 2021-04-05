$(function() {

    // 获取用户信息
    getUserInfo();
    // 退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {


            // 1.清除本地存储中的 token
            localStorage.removeItem('token');
            // 2. 跳转到登录页面
            location.href = '/login.html';

            layer.close(index);
        });
    })
})

// 获取用户信息

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 在API中被调用了
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }

            renderAvatar(res.data);
        }

        // 在API中统一调用
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1. 获取用户数据
    var name = user.nickname || user.username;
    console.log(name);
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3. 渲染头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0];
        if (/^[a-z]$/.test(first)) {
            first = first.toUpperCase();
        }

        $('.text-avatar').html(first).show();
    }
}