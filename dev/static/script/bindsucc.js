$(function() {
    var BINDSUCC = {
        init: function() {
            var id = BINDSUCC.getQueryString('studentId'),
                name = decodeURI(decodeURIComponent(BINDSUCC.getQueryString('studentName'))),
                code = BINDSUCC.getQueryString('code'),
                birthDay = BINDSUCC.getQueryString('birthDay');

            $('.button-link').attr('href', './video.html?studentId=' + id + '&studentName=' + encodeURI(encodeURIComponent(name)));
            $('.button-link-default').attr('href', './editcard.html?studentName='+ encodeURI(encodeURIComponent(name)) +'&birthDay='+ birthDay +'&code='+ code);

            $.ajax({
                url: CONFIG.api + '/parent/ajax/studentList',
                dataType: 'json',
                type: 'post',
                data: {
                    
                },
                success:function(res) {
                    if(res.code == 0) {
                        // succ

                        if(res.data.stuList.length > 1) {
                            $('.button-link-default').attr('href', './cardlist.html');
                        }
                    }
                },
                error: function() {
                    
                }
            });            
        },
        getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    };

    BINDSUCC.init();
});