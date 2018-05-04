/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var t={init:function(){t.getList()},getList:function(){var t=$(".student-list");t.html('<div class="loading">正在努力加载...</div>'),$.ajax({url:CONFIG.api+"/parent/ajax/studentList",dataType:"json",type:"post",data:{},success:function(a){if(0==a.code){for(var i=a.data.stuList,e="",n=0;n<i.length;n++)e+='<article class="list-item">',e+='<a href="./editcard.html?studentName='+encodeURI(encodeURIComponent(i[n].name))+"&birthDay="+i[n].birthDay+"&code="+i[n].code+'" class="flex-h">',e+='<div class="name flex-a-i">'+i[n].name+"</div>",e+='<div class="arrow"></div>',e+="</a>",e+="</article>";t.html(e)}else 1001==a.code?location.href=CONFIG.redirect_url:t.html('<div class="loading">'+a.errorInfo+"</div>")},error:function(){t.html('<div class="loading">数据加载失败</div>')}})}};t.init()});