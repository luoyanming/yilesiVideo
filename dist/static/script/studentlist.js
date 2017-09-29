/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var t={init:function(){t.getList()},getList:function(){var t=$(".student-list");t.html('<div class="loading">正在努力加载...</div>'),$.ajax({url:CONFIG.api+"/parent/ajax/studentList",dataType:"json",type:"post",data:{},success:function(i){if(0==i.code){for(var a=i.data.stuList,e="",n=0;n<a.length;n++)e+='<article class="list-item">',e+='<a href="./video.html?studentId='+a[n].id+"&studentName="+encodeURI(encodeURIComponent(a[n].name))+'" class="flex-h">',e+='<div class="name flex-a-i">'+a[n].name+"</div>",e+='<div class="arrow"></div>',e+="</a>",e+="</article>";t.html(e)}else 1001==i.code?location.href=CONFIG.redirect_url:t.html('<div class="loading">'+i.errorInfo+"</div>")},error:function(){t.html('<div class="loading">数据加载失败</div>')}})}};t.init()});