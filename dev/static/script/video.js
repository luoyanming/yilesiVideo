$(function() {
    var cHeader = $('.calendar-header'),
        cHeaderDate = cHeader.find('.date'),
        cButtonPrev = cHeader.find('.button-prev'),
        cButtonNext = cHeader.find('.button-next'),
        cBody = $('.calendar-body'),
        cBodyDate = cBody.find('.calendar-date');

    var videoList = $('.video-list');

    var that;
    var VIDEO = {
        init: function() {
            that = this;

            that.time = new Date();
            that.selectTime = new Date();

            // 以当前日期初始化日历
            that.calendarInit(that.time);

            var date = that.getDate(new Date());
            that.getVideoList(date.cy +'-'+ date.cm +'-'+ date.cd);
        },

        // 初始化日历
        calendarInit: function(time) {
            that.setTitle(time);

            that.setDate(time);
        },

        // 日历年月UI
        setTitle: function(time) {
            var date = that.getDate(time);
            
            cHeaderDate.html(date.cy + '年' + date.cm + '月');

            that.checkLimit(time);
        },

        // 日历日期UI
        setDate: function(time) {
            var count = that.getCountDays(time),
                date = that.getDate(time),
                searchDate = '';
                tmp = '';

            cBodyDate.html('<div class="loading">正在加载日期...</div>');

            $.ajax({
                url: CONFIG.api + '/parent/ajax/courseRecord/validDate',
                dataType: 'json',
                type: 'post',
                data: {
                    studentId: that.getQueryString('studentId'),
                    searchDate: date.cy +'-'+ date.cm 
                },
                success:function(res) {
                    if(res.code == 0) {
                        // succ
                        
                        // 判断当前日期1号是星期几，星期日返回0， 星期六返回6
                        // 填补1号前的空缺
                        time.setDate(1);
                        for(var i = 0; i < time.getDay(); i ++) {
                            tmp += '<p class="date-item"><span class="disable"></span></p>';
                        }

                        // 正常日期
                        // 当前日期高亮 current
                        // 无数据不可点 disable
                        var date = that.getDate(time);
                        var cDate = that.getDate(that.selectTime);

                        if(!res.data.list) {
                            for(var j = 0; j < count; j++) {
                                if(cDate.cd == j + 1 && date.cy == cDate.cy && date.cm == cDate.cm) {
                                    tmp += '<p class="date-item"><span class="current" data-date="'+ date.cy +'-'+ date.cm +'-'+ (j + 1) +'">'+ (j + 1) +'</span></p>';
                                } else {
                                    tmp += '<p class="date-item"><span data-date="'+ date.cy +'-'+ date.cm +'-'+ (j + 1) +'">'+ (j + 1) +'</span></p>';
                                }
                            }
                            
                        } else {
                            var hasDataArr = [];
                            for(var k = 0; k < res.data.list.length; k ++) {
                                var itemArr = res.data.list[k].split('-');
                                hasDataArr.push(itemArr[2]);
                            }
                            for(var j = 0; j < count; j++) {
                                if(cDate.cd == j + 1 && date.cy == cDate.cy && date.cm == cDate.cm) {
                                    tmp += '<p class="date-item"><span class="current" data-date="'+ date.cy +'-'+ date.cm +'-'+ (j + 1) +'">'+ (j + 1) +'</span></p>';
                                } else {
                                    if(hasDataArr.indexOf((j + 1).toString()) > -1) {
                                        tmp += '<p class="date-item"><span data-date="'+ date.cy +'-'+ date.cm +'-'+ (j + 1) +'">'+ (j + 1) +'</span></p>';
                                    } else {
                                        tmp += '<p class="date-item"><span data-date="'+ date.cy +'-'+ date.cm +'-'+ (j + 1) +'" class="disable">'+ (j + 1) +'</span></p>';
                                    }
                                }
                            }
                        }

                        cBodyDate.html(tmp);

                        that.handleBind();
                    } else if(res.code == 1001) {
                        // donot login
                        location.href = CONFIG.courseRecord_redirect_url;
                    } else {
                        // error
                        cBodyDate.html('<div class="loading">'+ res.errorInfo +'</div>');
                    }
                },
                error: function() {
                    cBodyDate.html('<div class="loading">日期加载失败</div>');
                }
            });
        },

        // 点击事件绑定
        handleBind: function() {
            // 前一月
            cButtonPrev.unbind('click');
            cButtonPrev.on('click', function() {
                if(cButtonPrev.hasClass('disable')) {
                    return false;
                }

                var time = that.time,
                    cDate = that.getDate(time);

                time.setMonth(cDate.cm - 2);
                that.time = time;

                that.calendarInit(that.time);
            });

            // 后一月
            cButtonNext.unbind('click');
            cButtonNext.on('click', function() {
                if($(this).hasClass('disable')) {
                    return false;
                }

                var time = that.time,
                    cDate = that.getDate(time);

                time.setMonth(cDate.cm);
                that.time = time;

                that.calendarInit(that.time);
            });

            // 点击日期获取列表
            var cBodyDateSpan = cBodyDate.find('span');
            cBodyDateSpan.unbind('click');
            cBodyDateSpan.on('click', function() {
                if($(this).hasClass('disable')) {
                    return false;
                }

                cBodyDateSpan.removeClass('current');
                $(this).addClass('current');

                that.selectTime = new Date($(this).attr('data-date'));

                that.getVideoList($(this).attr('data-date'));
            });
        },

        // 获取课程列表
        getVideoList: function(time) {
            var timeArr = time.split('-'),
                y = timeArr[0],
                m = timeArr[1],
                d = timeArr[2],
                newTime = '';

            if(m < 10) {
                m = '0' + m;
            }
            if(d < 10) {
                d = '0' + d;
            }
            newTime = y +'-'+ m +'-'+ d;

            videoList.html('<div class="loading">正在努力加载...</div>');

            $.ajax({
                url: CONFIG.api + '/parent/ajax/courseRecord/list',
                dataType: 'json',
                type: 'post',
                data: {
                    studentId: that.getQueryString('studentId'),
                    searchDate: newTime
                },
                success:function(res) {
                    if(res.code == 0) {
                        // succ

                        if(res.data.showClock) {
                            videoList.html('<div class="timeclock">今日课程将在18:00准时放送！</div>');
                            return false;
                        }
                        
                        if(!res.data.list) {
                            videoList.html('<div class="nodata">目前没有课程记录！</div>');
                            return false;
                        }

                        var list = res.data.list,
                            temp = '';

                        for(var i = 0; i < list.length; i++) {
                            temp += '<article class="list-item">';
                            temp += '<a href="./player.html?studentId='+ that.getQueryString('studentId') +'&recordId='+ list[i].recordId +'" class="flex-h">';
                            temp += '<div class="thumb">';
                            temp += '<img src="'+ list[i].thumbnailUrl +'">';
                            temp += '</div>';
                            temp += '<div class="info flex-a-i">';
                            temp += '<p class="name">'+ list[i].courseName +'</p>';
                            temp += '<p class="desc">';
                            // temp += '<span class="time">'+ list[i].videoLength +'</span>';
                            temp += '<span class="class">'+ list[i].teacherName +'</span>';
                            temp += '</p>';
                            temp += '</div>';
                            temp += '<div class="arrow"></div>';
                            temp += '</a>';
                            temp += '</article>';
                        }

                        videoList.html(temp);
                    } else if(res.code == 1001) {
                        // donot login
                        location.href = CONFIG.courseRecord_redirect_url;
                    } else {
                        // error
                        videoList.html('<div class="loading">'+ res.errorInfo +'</div>');
                    }
                },
                error: function() {
                    videoList.html('<div class="loading">数据加载失败</div>');
                }
            });
        },

        // 判断日期临界值
        checkLimit: function(time) {
            var date = that.getDate(time),
                cDate = that.getDate(new Date());

            cButtonPrev.removeClass('disable');
            cButtonNext.removeClass('disable');

            if(date.cy == 2017 && date.cm == 1) {
                cButtonPrev.addClass('disable');
            } else if(date.cy == cDate.cy && date.cm == cDate.cm) {
                cButtonNext.addClass('disable');
            }
        },

        // 获取年月日集合
        getDate: function(time) {
            var date = new Date(time),
                cy = date.getFullYear(),
                cm = date.getMonth() + 1,
                cd = date.getDate();

            return { cy: cy, cm: cm, cd: cd };
        },

        // 获取某个月份包含多少天
        getCountDays: function(time) {
            var curDate = new Date(time),
                curMonth = curDate.getMonth();

           curDate.setMonth(curMonth + 1);
           curDate.setDate(0);

           return curDate.getDate();
        },

        getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    };

    VIDEO.init();
});