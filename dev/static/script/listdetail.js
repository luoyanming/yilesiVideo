$(function() {
var that;
var VIDEOPLAYER = {
    init: function() {
        that = this;

        that.getDetail();
    },
    getDetail: function() {
        $.ajax({
            url: CONFIG.api + '/parent/ajax/courseRecord/detail/public',
            dataType: 'json',
            type: 'post',
            data: {
                macNo: that.getQueryString('macNo'),
                recordId: that.getQueryString('recordId')
            },
            success: function(res) {
                if (res.code == 0) {
                    $('.loading').remove();

                    var data = res.data.recordVo;
                    if (data.publicity == 0) {
                        // 不公开
                        $('#video').html('<img src="' + data.thumbnailUrl + '">');
                    } else if (data.publicity == 1) {
                        // 公开
                        that.videoInit(data.videoPath, data.thumbnailUrl);
                    }

                    $('.video-info').html('<p>课程时长：' + data.videoLength + '。</p><p>' + data.describe + '</p>');

                    if (data.questionVoList && data.questionVoList.length > 0) {
                        var temp = '';

                        for (var i = 0; i < data.questionVoList.length; i++) {
                            temp += '<article class="list-item">';
                            if (data.questionVoList[i].answerType == 1) {
                                temp += '<i class="type">单选</i>';
                            } else if (data.questionVoList[i].answerType == 2) {
                                temp += '<i class="type">多选</i>';
                            } else if (data.questionVoList[i].answerType == 3) {
                                temp += '<i class="type">判断</i>';
                            }
                            temp += '<div class="thumb">';
                            temp += '<img src="' + data.questionVoList[i].imagePath + '">';
                            temp += '</div>';
                            if (data.questionVoList[i].result == 0) {
                                temp += '<div class="text"><span class="color-false">回答错误</span>；' + data.questionVoList[i].anwerResult + '</div>';
                            } else if (data.questionVoList[i].result == 1) {
                                temp += '<div class="text"><span class="color-true">回答正确</span>；' + data.questionVoList[i].anwerResult + '</div>';
                            } else if (data.questionVoList[i].result == 2) {
                                temp += '<div class="text"><span class="color-false">回答错误</span>；' + data.questionVoList[i].anwerResult + '</div>';
                            }
                            temp += '</article>';
                        }

                        $('.problem-list').html(temp);
                    }

                    $('.player').show();
                } else if (res.code == 1001) {
                    // donot login
                    location.href = CONFIG.courseRecord_redirect_url;
                } else {
                    // error
                    $('.loading').html('<div class="loading">' + res.errorInfo + '</div>');
                }
            },
            error: function() {
                $('.loading').html('<div class="loading">数据加载失败</div>');
            }
        });
    },
    videoInit: function(path, thumb) {
        var player = cyberplayer('video').setup({
            width: '100%',
            height: '100%',
            file: path,
            image: thumb,
            autostart: false,
            stretching: "uniform",
            repeat: false,
            volume: 100,
            controls: true,
            ak: 'ad3081dc1c5943858f737a57e701cc44'
        });
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
};

VIDEOPLAYER.init();
});