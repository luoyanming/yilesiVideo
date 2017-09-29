$(function() {
    var that;
    var MY = {
        init: function() {
            that = this;

            that.getMemberInfo();

            that.handleBind();
        },
        getMemberInfo: function() {
            $.ajax({
                url: CONFIG.api + '/parent/ajax/memberInfo',
                dataType: 'json',
                type: 'post',
                data: {
                    
                },
                success:function(res) {
                    if(res.code == 0) {
                        $('.loading').remove();
                        $('#avatar').attr('src', res.data.memberInfo.avatar);
                        $('#mobile').html(res.data.memberInfo.mobile);
                        $('#nickname').html(res.data.memberInfo.name);

                        $('.my-info').show();
                        $('.button-logout').show();
                    } else if(res.code == 1001) {
                        // donot login
                        location.href = CONFIG.courseRecord_redirect_url;
                    } else {
                        // error
                        $('.loading').html('<div class="loading">'+ res.errorInfo +'</div>');
                    }
                },
                error: function() {
                    $('.loading').html('<div class="loading">数据加载失败</div>');
                }
            });
        },
        handleBind: function() {
            $('.button-logout').on('click', function() {
                var cf = confirm('确定退出登录？');
                if(cf == true) {
                    $.ajax({
                        url: CONFIG.api + '/parent/ajax/logout',
                        dataType: 'json',
                        type: 'post',
                        data: {
                            
                        },
                        success:function(res) {
                            if(res.code == 0) {
                                location.href = res.data.url;
                            } else {
                                // error
                                alert(res.errorInfo);
                            }
                        },
                        error: function() {
                            alert('退出登录失败！请重试！');
                        }
                    });
                }
            });
        }
    };

    MY.init();
});