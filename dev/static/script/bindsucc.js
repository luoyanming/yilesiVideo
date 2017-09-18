$(function() {
    var BINDSUCC = {
        init: function() {
            var id = BINDSUCC.getQueryString('studentId');

            $('.button-link').attr('href', './video.html?studentId=' + id);
        },
        getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    };

    BINDSUCC.init();
});