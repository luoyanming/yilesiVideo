$(function() {
    var STUDENTLIST = {
        init: function() {
            STUDENTLIST.getList();
        },

        getList: function() {
            var studentList = $('.student-list');

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
                            temp += '<a href="./editcard.html?studentName='+ encodeURI(encodeURIComponent(list[i].name)) +'&birthDay='+ list[i].birthDay +'&code='+ list[i].code +'" class="flex-h">';
                            temp += '<div class="name flex-a-i">'+ list[i].name +'</div>';
                            temp += '<div class="arrow"></div>';
                            temp += '</a>';
                            temp += '</article>';
                        }

                        studentList.html(temp);
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
        }
    };

    STUDENTLIST.init();
});