/**
 * @author luoym
 * @email 13575458746@163.com
 * @descrip 
 * @version v1.0.0
 */
$(function(){var t={init:function(){cyberplayer("playercontainer").setup({width:"100%",height:"100%",file:t.getQueryString("path"),image:t.getQueryString("thumb"),autostart:!0,stretching:"uniform",repeat:!1,volume:100,controls:!0,ak:"ad3081dc1c5943858f737a57e701cc44"})},getQueryString:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}};t.init()});