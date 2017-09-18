/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var t={init:function(){t.getList()},getList:function(){var t=$("#student-list");t.html('<div class="loading">正在努力加载...</div>'),$.ajax({url:CONFIG.api+"/parent/ajax/studentList",dataType:"json",type:"post",data:{},success:function(i){if(0==i.code){for(var a=i.data.stuList,s="",e=0;e<a.length;e++)s+='<article class="list-item">',s+='<a href="./video.html?studentId='+a[e].id+'" class="flex-h">',s+='<div class="name flex-a-i">'+a[e].name+"</div>",s+='<div class="arrow"></div>',s+="</a>",s+="</article>";t.html(s)}else 1001==i.code?location.href=CONFIG.redirect_url:t.html('<div class="loading">'+i.errorInfo+"</div>")},error:function(){t.html('<div class="loading">数据加载失败</div>')}})}};t.init()});