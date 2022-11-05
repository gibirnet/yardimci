/* 
	opts {
		split: 3,
		splitBreak: ' - ',
		ucFirst: true,
		numberTransform = function(num){return num};
	}
*/
function numberToTurkishWords(s, opts) {
	if(!opts) opts ={};
	if(!opts['split']) opts['split'] = 15;
	if(!opts['splitBreak']) opts['splitBreak'] = ' - ';

	s = parseFloat(s);

	var bir = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
	var on = ['on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
	var nth = ['', 'bin', 'milyon', 'milyar', 'trilyon'];
	var others = ['yüz', 'nokta'];
	var lists = [bir, on, nth, others];

	for(var x in lists){
		for(var y in lists[x]){
			var transform = lists[x][y];
			if(opts['ucFirst']){
				transform = transform.charAt(0).toUpperCase() + transform.slice(1);
			}
			if(opts['numberTransform']){
				transform = opts['numberTransform'](transform);
			}
			lists[x][y] = transform;
		}
	}
	

  	var str = String(s);
  	var strPart = str.split('.');
  	var text = [];

  	for(var p in strPart){
  		var subText = [];
  		var strSubPart = strPart[p].match(new RegExp('.{1,'+ opts['split'] +'}', 'g'));
  		for(var sp in strSubPart){
		  	var len = strSubPart[sp].length;
		  	if(len == 1){
		  		subText.push(bir[parseInt(strSubPart[sp])]);
		  		continue;
		  	}

		  	var results = [];
		  	var perThird = [];
		  	for(var i = 0; i < len; i++){
		  		per = parseInt(i/3);
		  		if(i%3 == 0){
		  			perThird.push([]);
		  		}
		  		perThird[per].push(strSubPart[sp][len-i-1]);
		  	}
		  	
		  	for(var i in perThird){
		  		var result = [];
		  		var arr = perThird[i];
		  		if(arr[0]){
		  			if(arr[0] > 0){
		  				result.push(bir[arr[0]]);
		  			}
		  		}

		  		if(arr[1]){
		  			if(arr[1] > 0){
		  				result.push(on[arr[1]-1]);
		  			}
		  		}

		  		if(arr[2]){
		  			if(arr[2] > 0){
		  				result.push((arr[2] == 1 ? '' : bir[arr[2]] + " ") + others[0]); //bir yüz fix
		  			}
		  		}

		  		results.push(result.reverse().join(' ') + (i > 0 ? (" " + nth[i]) : ''));
		  	}
		  	subText.push(results.reverse().join(' '));
		}
		text.push(subText.join(opts['splitBreak']));
	}

	return text.join(' '+ others[1] +' ').trim();
}
