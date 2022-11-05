function numberToTurkishWords(s) {
	s = parseFloat(s);
	var bir = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
	var on = ['on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
	var nth = ['', 'bin', 'milyon', 'milyar', 'trilyon'];
  	var str = String(s);
  	var strPart = str.split('.');
  	var text = [];
  	for(var p in strPart){
	  	var len = strPart[p].length;
	  	if(len == 1){
	  		text.push(bir[parseInt(strPart[p])]);
	  		continue;
	  	}

	  	var results = [];
	  	var perThird = [];
	  	for(var i = 0; i < len; i++){
	  		per = parseInt(i/3);
	  		if(i%3 == 0){
	  			perThird.push([]);
	  		}
	  		perThird[per].push(strPart[p][len-i-1]);
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
	  				result.push((arr[2] == 1 ? '' : bir[arr[2]] + " ") + "yüz"); //bir yüz fix
	  			}
	  		}

	  		results.push(result.reverse().join(' ') + (i > 0 ? (" " + nth[i]) : ''));
	  	}
	  	text.push(results.reverse().join(' '));
	}

	return text.join(' nokta ');
}
