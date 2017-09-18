$(function() {
    var that = '';
    var BINDCARD = {
        init: function() {
            that = this;

            that.pickerInit();

            that.handleClickBind();
        },
        pickerInit: function() {
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

            pickerObj.val(currentYear +' '+ currentMonth +' '+ currentDate);

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

                    var number = $('#number'),
                        birthday = $('#birthday'),
                        numberVal = number.val(),
                        birthdayVal = birthday.val();

                    if(!numberVal) {
                        that.showMsg('请输入您孩子的教学卡卡号');
                        return false;
                    }

                    if(!birthdayVal) {
                        that.showMsg('请选择您孩子的生日');
                        return false;
                    }

                    clicks.html('正在绑定...').addClass('disable');

                    var birthdayArr = birthdayVal.split('-');
                    $.ajax({
                        url: CONFIG.api + '/parent/ajax/doBind',
                        dataType: 'json',
                        type: 'post',
                        data: {
                            code: numberVal,
                            birthday: birthdayArr[0] + birthdayArr[1] + birthdayArr[2]
                        },
                        success:function(res) {
                            clicks.html('确定').removeClass('disable');

                            if(res.code == 0) {
                                // succ
                                location.href = './bindsucc.html?studentId=' + res.data.studentId;
                            } else if(res.code == 1001) {
                                // donot login
                                location.href = CONFIG.redirect_url;
                            } else {
                                // error
                                that.showMsg(res.errorInfo);
                            }
                        },
                        error: function() {
                            clicks.html('确定').removeClass('disable');
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