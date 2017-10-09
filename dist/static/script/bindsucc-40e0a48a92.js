/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var e={init:function(){var n=e.getQueryString("studentId"),t=decodeURI(decodeURIComponent(e.getQueryString("studentName")));$(".button-link").attr("href","./video.html?studentId="+n+"&studentName="+encodeURI(encodeURIComponent(t)))},getQueryString:function(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(n);return null!=t?unescape(t[2]):null}};e.init()});