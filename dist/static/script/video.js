/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var t,e=$(".calendar-header"),a=e.find(".date"),s=e.find(".button-prev"),i=e.find(".button-next"),n=$(".calendar-body"),c=n.find(".calendar-date"),d=$(".video-list");({init:function(){t=this,t.time=new Date,t.selectTime=new Date,t.resetTitle(),t.calendarInit(t.time);var e=t.getDate(new Date);t.getVideoList(e.cy+"-"+e.cm+"-"+e.cd)},resetTitle:function(){var e=$("body");document.title=decodeURI(decodeURIComponent(t.getQueryString("studentName")))+"的学习空间";var a=$('<iframe src=""></iframe>');a.on("load",function(){setTimeout(function(){a.off("load").remove()},0)}).appendTo(e)},calendarInit:function(e){t.setTitle(e),t.setDate(e)},setTitle:function(e){var s=t.getDate(e);a.html(s.cy+"年"+s.cm+"月"),t.checkLimit(e)},setDate:function(e){var a=t.getCountDays(e),s=t.getDate(e);tmp="",c.html('<div class="loading">正在加载日期...</div>'),$.ajax({url:CONFIG.api+"/parent/ajax/courseRecord/validDate",dataType:"json",type:"post",data:{studentId:t.getQueryString("studentId"),searchDate:s.cy+"-"+s.cm},success:function(s){if(0==s.code){e.setDate(1);for(var i=0;i<e.getDay();i++)tmp+='<p class="date-item"><span class="disable"></span></p>';var n=t.getDate(e),d=t.getDate(t.selectTime);if(s.data.list){for(var r=[],l=0;l<s.data.list.length;l++){var o=s.data.list[l].split("-");r.push(o[2])}for(var m=0;m<a;m++)d.cd==m+1&&n.cy==d.cy&&n.cm==d.cm?tmp+='<p class="date-item"><span class="current" data-date="'+n.cy+"-"+n.cm+"-"+(m+1)+'">'+(m+1)+"</span></p>":r.indexOf((m+1).toString())>-1?tmp+='<p class="date-item"><span data-date="'+n.cy+"-"+n.cm+"-"+(m+1)+'">'+(m+1)+"</span></p>":tmp+='<p class="date-item"><span data-date="'+n.cy+"-"+n.cm+"-"+(m+1)+'" class="disable">'+(m+1)+"</span></p>"}else for(var m=0;m<a;m++)d.cd==m+1&&n.cy==d.cy&&n.cm==d.cm?tmp+='<p class="date-item"><span class="current" data-date="'+n.cy+"-"+n.cm+"-"+(m+1)+'">'+(m+1)+"</span></p>":tmp+='<p class="date-item"><span data-date="'+n.cy+"-"+n.cm+"-"+(m+1)+'">'+(m+1)+"</span></p>";c.html(tmp),t.handleBind()}else 1001==s.code?location.href=CONFIG.courseRecord_redirect_url:c.html('<div class="loading">'+s.errorInfo+"</div>")},error:function(){c.html('<div class="loading">日期加载失败</div>')}})},handleBind:function(){s.unbind("click"),s.on("click",function(){if(s.hasClass("disable"))return!1;var e=t.time,a=t.getDate(e);e.setMonth(a.cm-2),t.time=e,t.calendarInit(t.time)}),i.unbind("click"),i.on("click",function(){if($(this).hasClass("disable"))return!1;var e=t.time,a=t.getDate(e);e.setMonth(a.cm),t.time=e,t.calendarInit(t.time)});var e=c.find("span");e.unbind("click"),e.on("click",function(){if($(this).hasClass("disable"))return!1;e.removeClass("current"),$(this).addClass("current"),t.selectTime=new Date($(this).attr("data-date")),t.getVideoList($(this).attr("data-date"))})},getVideoList:function(e){var a=e.split("-"),s=a[0],i=a[1],n=a[2],c="";i<10&&(i="0"+i),n<10&&(n="0"+n),c=s+"-"+i+"-"+n,d.html('<div class="loading">正在努力加载...</div>'),$.ajax({url:CONFIG.api+"/parent/ajax/courseRecord/list",dataType:"json",type:"post",data:{studentId:t.getQueryString("studentId"),searchDate:c},success:function(e){if(0==e.code){if(e.data.showClock)return d.html('<div class="timeclock">今日课程将在18:00准时放送！</div>'),!1;if(!e.data.list)return d.html('<div class="nodata">目前没有课程记录！</div>'),!1;for(var a=e.data.list,s="",i=0;i<a.length;i++)s+='<article class="list-item">',s+='<a href="./player.html?studentId='+t.getQueryString("studentId")+"&recordId="+a[i].recordId+'" class="flex-h">',s+='<div class="thumb">',s+='<img src="'+a[i].thumbnailUrl+'">',s+="</div>",s+='<div class="info flex-a-i">',s+='<p class="name">'+a[i].courseName+"</p>",s+='<p class="desc">',s+='<span class="class">'+a[i].teacherName+"</span>",s+="</p>",s+="</div>",s+='<div class="arrow"></div>',s+="</a>",s+="</article>";d.html(s)}else 1001==e.code?location.href=CONFIG.courseRecord_redirect_url:d.html('<div class="loading">'+e.errorInfo+"</div>")},error:function(){d.html('<div class="loading">数据加载失败</div>')}})},checkLimit:function(e){var a=t.getDate(e),n=t.getDate(new Date);s.removeClass("disable"),i.removeClass("disable"),2017==a.cy&&1==a.cm?s.addClass("disable"):a.cy==n.cy&&a.cm==n.cm&&i.addClass("disable")},getDate:function(t){var e=new Date(t);return{cy:e.getFullYear(),cm:e.getMonth()+1,cd:e.getDate()}},getCountDays:function(t){var e=new Date(t),a=e.getMonth();return e.setMonth(a+1),e.setDate(0),e.getDate()},getQueryString:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(e);return null!=a?unescape(a[2]):null}}).init()});