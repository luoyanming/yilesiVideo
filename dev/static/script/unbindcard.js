$(function() {
    var STUDENTLIST = {
        init: function() {
            STUDENTLIST.getList();
        },

        getList: function() {
            var studentList = $('.unbind-list');

            studentList.html('<div class="loading">正在努力加载...</div>');

            $.ajax({
                url: CONFIG.api + '/parent/ajax/studentList',
                dataType: 'json',
                type: 'post',
                data: {
                    
                },
                success:function(res) {
                    if(res.code == 0) {
                        // succ

                        var list = res.data.stuList,
                            temp = '';

                        for(var i = 0; i < list.length; i++) {
                            temp += '<article class="list-item">';
                            temp += '<p class="name">'+ list[i].name +'</p>';
                            temp += '<p class="number">'+ list[i].code +'</p>';
                            temp += '<div class="button-unbind" data-code="'+ list[i].code +'">解绑</div>';
                            temp += '</article>';
                        }

                        studentList.html(temp);

                        STUDENTLIST.handleButtonUnbind();
                    } else if(res.code == 1001) {
                        // donot login
                        location.href = CONFIG.redirect_url;
                    } else {
                        // error
                        studentList.html('<div class="loading">'+ res.errorInfo +'</div>');
                    }
                },
                error: function() {
                    studentList.html('<div class="loading">数据加载失败</div>');
                }
            });
        },

        handleButtonUnbind: function() {
            $('.button-unbind').unbind('click');
            $('.button-unbind').on('click', function() {
                var obj = $(this),
                    index = obj.parent().index(),
                    code = obj.attr('data-code');

                STUDENTLIST.showCconfirm(index, code);
            });
        },

        showCconfirm: function(index, code) {
            var msgMask = $('#unbindConfirm'),
                msgButtonCancle = msgMask.find('.button-cancle'),
                msgButtoEnsure = msgMask.find('.button-ensure');

            msgMask.fadeIn(300);

            msgButtonCancle.unbind('click');
            msgButtonCancle.on('click', function() {
                msgMask.fadeOut(200);
            });

            msgButtoEnsure.unbind('click');
            msgButtoEnsure.on('click', function() {
                $.ajax({
                    url: CONFIG.api + '/parent/ajax/cancle/bind',
                    dataType: 'json',
                    type: 'post',
                    data: {
                        code: code
                    },
                    success:function(res) {
                        if(res.code == 0) {
                            // succ

                            msgMask.fadeOut(200);
                            $('.unbind-list .list-item').eq(index).remove();
                        } else if(res.code == 1001) {
                            // donot login
                            location.href = CONFIG.redirect_url;
                        } else if(res.code == -1) {
                            // donot login
                            location.href = CONFIG.redirect_url;
                        } else {
                            // error
                            STUDENTLIST.showMsg(res.errorInfo);
                        }
                    },
                    error: function() {
                        STUDENTLIST.showMsg('解绑失败，请重试！');
                    }
                });                
            });            
        },

        showMsg: function(msg) {
            // 显示错误信息

            var msgMask = $('#errorAlert'),
                msgText = msgMask.find('.text'),
                msgButton = msgMask.find('.button-ensure');

            msgText.html(msg);
            msgMask.fadeIn(300);

            msgButton.unbind('click');
            msgButton.on('click', function() {
                msgMask.fadeOut(200);
            });
        }             
    };

    STUDENTLIST.init();
});