/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var t={init:function(){var e=t.getQueryString("studentId"),n=decodeURI(decodeURIComponent(t.getQueryString("studentName"))),r=t.getQueryString("code"),a=t.getQueryString("birthDay");$(".button-link").attr("href","./video.html?studentId="+e+"&studentName="+encodeURI(encodeURIComponent(n))),$(".button-link-default").attr("href","./editcard.html?studentName="+encodeURI(encodeURIComponent(n))+"&birthDay="+a+"&code="+r),$.ajax({url:CONFIG.api+"/parent/ajax/studentList",dataType:"json",type:"post",data:{},success:function(t){0==t.code&&t.data.stuList.length>1&&$(".button-link-default").attr("href","./cardlist.html")},error:function(){}})},getQueryString:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}};t.init()});