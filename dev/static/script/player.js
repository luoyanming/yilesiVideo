$(function() {
	var VIDEOPLAYER = {
		init: function() {
			var player = cyberplayer('playercontainer').setup({
                width: '100%',
                height: '100%',
                file: VIDEOPLAYER.getQueryString('path'),
                image: VIDEOPLAYER.getQueryString('thumb'),
                autostart: true,
                stretching: "uniform",
                repeat: false,
                volume: 100,
                controls: true,
                ak: 'ad3081dc1c5943858f737a57e701cc44'
            });
		},
        getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
	};

	VIDEOPLAYER.init();
});