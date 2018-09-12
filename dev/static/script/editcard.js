$(function() {
    var that = '';
    var BINDCARD = {
        init: function() {
            that = this;

            that.getquery();

            that.handleClickBind();
        },

        getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        getquery: function() {
            var name = decodeURI(decodeURIComponent(that.getQueryString('studentName'))),
                code = that.getQueryString('code'),
                birthDay = that.getQueryString('birthDay');

            console.log(name, code, birthDay)

            $('#name').val(name);
            $('#code').val(code);

            that.pickerInit(birthDay);      
        },
        pickerInit: function(birthDay) {
            var pickerObj = $("#picker"),
                yearArr = [],
                monthArr = [],
                dateArr = [],
                yearStart = 1980,
                yearEnd = 2020,
                currentYear = '2000',
                currentMonth = '01',
                currentDate = '01',
                t;

            if(birthDay) {
                var birthDay = birthDay.toString(),
                    _y = birthDay.substring(0, 4),
                    _m = birthDay.substring(4, 6),
                    _d = birthDay.substring(6, 8);

                pickerObj.val(_y +' '+ _m +' '+ _d);
                $('#birthday').val(_y +'-'+ _m +'-'+ _d);
            } else {          
                pickerObj.val(currentYear +' '+ currentMonth +' '+ currentDate);
            }

            for(var y = 0; y < yearEnd - yearStart + 1; y++) {
                yearArr[y] = (yearStart + y).toString();
            }
            monthArr = that.monthUI();
            dateArr = that.dateUI(currentYear, currentMonth);


            pickerObj.picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-left cancle-picker">取消</button>\
                    <button class="button button-link pull-right ensure-picker">完成</button>\
                    </header>',
                cols: [
                    {
                        textAlign: 'center',
                        values: yearArr
                    },
                    {
                        textAlign: 'center',
                        values: monthArr
                    },
                    {
                        textAlign: 'center',
                        values: dateArr
                    }
                ],
                onChange: function (picker, values, displayValues) {
                    var newYear = picker.cols[0].value,
                        newMonth = picker.cols[1].value;

                    if(newYear != currentYear) {
                        clearTimeout(t);

                        t = setTimeout(function(){
                            var newDates = that.dateUI(newYear, newMonth);
                            picker.cols[2].replaceValues(newDates);
                            currentYear = newYear;
                            currentMonth = newMonth;
                            picker.updateValue();
                        }, 200);

                        return;
                    }

                    if(newMonth != currentMonth) {
                        var newDates = that.dateUI(newYear, newMonth);
                        picker.cols[2].replaceValues(newDates);
                        currentMonth = newMonth;
                        picker.updateValue();
                    }
                }
            });
        },
        handleClickBind: function() {
            $(document).on('click', '.ensure-picker, .cancle-picker, .button-submit', function(e) {
                var clicks = $(this);

                if(clicks.hasClass('ensure-picker')) {
                    // 日历确定按钮

                    var date = $('#picker').val();
                    dateArr = date.split(' ');

                    $('#birthday').val(dateArr[0] +'-'+ dateArr[1] +'-'+ dateArr[2]);
                    $('#picker').picker("close");
                } else if(clicks.hasClass('cancle-picker')) {
                    // 日历取消按钮

                    $('#picker').picker("close");
                } else if(clicks.hasClass('button-submit')) {
                    // 绑卡按钮

                    if(clicks.hasClass('disable')) {
                        return false;
                    }

                    var birthday = $('#birthday'),
                        birthdayVal = birthday.val();

                    if(!birthdayVal) {
                        that.showMsg('请选择持卡人生日');
                        return false;
                    }

                    clicks.html('正在保存...').addClass('disable');

                    var birthdayArr = birthdayVal.split('-');
                    $.ajax({
                        url: CONFIG.api + '/parent/ajax/update/cardInfo',
                        dataType: 'json',
                        type: 'post',
                        data: {
                            code: $('#code').val(),
                            birthday: birthdayArr[0] + birthdayArr[1] + birthdayArr[2]
                        },
                        success:function(res) {
                            clicks.html('保存').removeClass('disable');

                            if(res.code == 0) {
                                // succ
                                that.showMsg('保存成功!');
                            } else if(res.code == 1001) {
                                // donot login
                                location.href = CONFIG.bind_redirect_url;
                            } else {
                                // error
                                that.showMsg(res.errorInfo);
                            }
                        },
                        error: function() {
                            clicks.html('保存').removeClass('disable');
                            that.showMsg('网络连接异常！请重试!');
                        }
                    });
                }
                
            });
        },
        showMsg: function(msg) {
            // 显示错误信息

            var msgMask = $('.msg-mask'),
                msgText = msgMask.find('.text'),
                msgButton = msgMask.find('.button-ensure');

            msgText.html(msg);
            msgMask.fadeIn(300);

            msgButton.unbind('click');
            msgButton.on('click', function() {
                msgMask.fadeOut(200);
                location.href = './cardlist.html';
            });
        },
        monthUI: function() {
            var arr = [];

            for(var m = 0; m < 12; m ++) {
                if(m < 9) {
                    arr[m] = '0' + (m + 1);
                } else {
                    arr[m] = (m + 1).toString();
                }
            }

            return arr;
        },
        dateUI: function(year, month) {
            var num = that.getCountDays(new Date(year +'/'+ month +'/01')),
                arr = [];

            for(var d = 0; d < num; d ++) {
                if(d < 9) {
                    arr[d] = '0' + (d + 1);
                } else {
                    arr[d] = (d + 1).toString();
                }
            }

            return arr;
        },
        getCountDays: function(time) {
            var curDate = new Date(time),
                curMonth = curDate.getMonth();

            curDate.setMonth(curMonth + 1);
            curDate.setDate(0);

            return curDate.getDate();
        }
    };

    BINDCARD.init();
});