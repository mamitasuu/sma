/**
 * クッキー情報を返却する
 * @return {string} クッキー情報
 */
function getSID(){

	var _sid;
	var cookies = document.cookie;

	if(cookies != ""){
		var cookiesArray = cookies.split(";");
		for (var i=0; i<cookiesArray.length; i++) {
			// cookieにsidがあるか
			if(cookiesArray[i].indexOf("_sid=") > -1){
				// cookieにIDがある
				var sid = cookiesArray[i].split("=")[1];
				if(sid == "" || sid == "null" || sid == "undefined"){
					// cookieにIDはあるが、値が無い
					_sid = createSID();
				}else{
					// cookieにIDはある、値がある
					_sid = sid;
				}
			}
		}
		if(_sid == ""){
			// cookieにIDがない
			_sid = createSID();
		}
	}else{
		_sid = createSID();
	}

	// cookieに保存（新規作成 or 上書き）
	document.cookie = "_sid=" + _sid

	return _sid;
}

/**
 * クッキー情報を作成する
 * @return {string} クッキー情報
 */
function createSID() {
	 return 'PS' + Math.floor(Math.random()*1000000000000);
}

/**
 * カスタムプログラム実行用のURLを返却する
 * @param  {array} _p 指定された設定値
 * @return {string}    カスタムプログラム実行用URL
 */
function getSRC(_p) {

	var url = "https://www.pi-pe.co.jp/api/service/custom_program/run/request"
	+ "?spiral_api_token=" + _p["tk"]
	+ "&callback=onComplete"
	+ "&title=scoreProgram"
	+ "&arg=" + getSID()
	+ "," + location.href
	+ "," + document.title
	+ "," + encodeURI(_p["sc"])
	+ "," + encodeURI(_p["kem"])
	+ "," + encodeURI(_p["cch"])
	+ "," + encodeURI(_p["csp"])
	+ "," + encodeURI(_p["mch"])
	+ "," + encodeURI(_p["msp"]);

	return url;
}

/**
 * 実行結果、確認用
 * カスタムプログラム実行完了後に呼ばれる関数
 * @param  {[type]} _result [description]
 * @return {[type]}         [description]
 */
function onComplete(_result)
{
 if (!_result || (_result.code != 0))
 {
	var message = (_result && _result.message ? _result.message : '不明');
	alert('実行に失敗しました。\n\n原因:\n' + message);
 }
 else
 {
	alert('実行しました。\n\n出力:\n' + _result.output + '\n\nエラーメッセージ: \n' + _result.error_message);
 }
}
