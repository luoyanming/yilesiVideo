/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var n={init:function(){n.getList()},getList:function(){var t=$(".unbind-list");t.html('<div class="loading">正在努力加载...</div>'),$.ajax({url:CONFIG.api+"/parent/ajax/studentList",dataType:"json",type:"post",data:{},success:function(i){if(0==i.code){for(var o=i.data.stuList,c="",e=0;e<o.length;e++)c+='<article class="list-item">',c+='<p class="name">'+o[e].name+"</p>",c+='<p class="number">'+o[e].code+"</p>",c+='<div class="button-unbind" data-code="'+o[e].code+'">解绑</div>',c+="</article>";t.html(c),n.handleButtonUnbind()}else 1001==i.code?location.href=CONFIG.redirect_url:t.html('<div class="loading">'+i.errorInfo+"</div>")},error:function(){t.html('<div class="loading">数据加载失败</div>')}})},handleButtonUnbind:function(){$(".button-unbind").unbind("click"),$(".button-unbind").on("click",function(){var t=$(this),i=t.parent().index(),o=t.attr("data-code");n.showCconfirm(i,o)})},showCconfirm:function(t,i){var o=$("#unbindConfirm"),c=o.find(".button-cancle"),e=o.find(".button-ensure");o.fadeIn(300),c.unbind("click"),c.on("click",function(){o.fadeOut(200)}),e.unbind("click"),e.on("click",function(){$.ajax({url:CONFIG.api+"/parent/ajax/cancle/bind",dataType:"json",type:"post",data:{code:i},success:function(i){0==i.code?(o.fadeOut(200),$(".unbind-list .list-item").eq(t).remove()):1001==i.code?location.href=CONFIG.redirect_url:-1==i.code?location.href=CONFIG.redirect_url:n.showMsg(i.errorInfo)},error:function(){n.showMsg("解绑失败，请重试！")}})})},showMsg:function(n){var t=$("#errorAlert"),i=t.find(".text"),o=t.find(".button-ensure");i.html(n),t.fadeIn(300),o.unbind("click"),o.on("click",function(){t.fadeOut(200)})}};n.init()});