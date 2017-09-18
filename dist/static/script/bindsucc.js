/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var t={init:function(){var n=t.getQueryString("studentId");$(".button-link").attr("href","./video.html?studentId="+n)},getQueryString:function(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),e=window.location.search.substr(1).match(n);return null!=e?unescape(e[2]):null}};t.init()});