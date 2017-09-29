/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var o;({init:function(){o=this,o.getMemberInfo(),o.handleBind()},getMemberInfo:function(){$.ajax({url:CONFIG.api+"/parent/ajax/memberInfo",dataType:"json",type:"post",data:{},success:function(o){0==o.code?($(".loading").remove(),$("#avatar").attr("src",o.data.memberInfo.avatar),$("#mobile").html(o.data.memberInfo.mobile),$("#nickname").html(o.data.memberInfo.name),$(".my-info").show(),$(".button-logout").show()):1001==o.code?location.href=CONFIG.courseRecord_redirect_url:$(".loading").html('<div class="loading">'+o.errorInfo+"</div>")},error:function(){$(".loading").html('<div class="loading">数据加载失败</div>')}})},handleBind:function(){$(".button-logout").on("click",function(){1==confirm("确定退出登录？")&&$.ajax({url:CONFIG.api+"/parent/ajax/logout",dataType:"json",type:"post",data:{},success:function(o){0==o.code?location.href=o.data.url:alert(o.errorInfo)},error:function(){alert("退出登录失败！请重试！")}})})}}).init()});