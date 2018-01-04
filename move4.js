window.onbeforeunload = function(e) {
    var t='戻るボタンや更新ボタンは押さないでください。「このページに止まるを押して続けましょう。」';
    return t;
};

var beforeX =212.5; //ボタンを押した時点でここにX座標を入れて次のボタンとの結線に使う
var beforeY =500; //ボタンを押した時点でここにY座標を入れて次のボタンとの結線に使う

var mode="normal"
var diag_history;
var congboolean=false;
var kateiboolean=false;
var keturonboolean=false;
var alllog="";
var lognumber=1;
var account="";
var element;
var start_time;
var elapsed_time;
var now_time;

//時間を入れる実装を行う
function start(){
	// 現在のローカル時間が格納された、Date オブジェクトを作成する
	console.log(document.student_ID.elements[1].value);
	if(document.student_ID.elements[1].value=="123"){
	var date_obj1 = new Date();
	start_time = date_obj1.getTime();
	if(document.getElementById){
			document.getElementById("button_seppic").innerHTML='<br><form name="seppic">△<input type="text" name="kaku1" size="4" value=""> ≡ △<input type="text" name="kaku1" size="4" value=""> </form><br> <button type="button" class="button_sg" value="katei" onclick= "takeout0()">合同になりそうな三角形を書き出す</button>';
			document.getElementById("st_d").innerHTML='<canvas id="st_d_canvas" style="position: absolute; margin: 5px;" width=425px; height=510px; ></canvas>\
		<div id="div_katei" style="position: absolute; left:10px; top:10px;"><button type="button" class="button_yellow" id="katei" value="katei" onclick= "ques1()">仮定を整理する</button></div>\
		<div id="div_frompic" style="position: absolute; left:230px; top:10px;"><button type="button" class="button_yellow" id="frompic" "value="frompic" onclick= "fromPic()">図形の性質から言えること</button></div>\
		<div id="div_keturon" style="position: absolute; left:160px; top:460px;"><button type="button" class="button_blue" id="keturon" value="keturon" onclick= "ques2()">結論を整理する</button></div>';
		document.getElementById("hint_flame").innerHTML='<img src="img/hint.jpg" alt="ヒント" style="width: 345px;">\
		<div id="hint" style="width: 345px; height: 150px; overflow-y: scroll; ">\
				<div id="hint1" style="width: 160px; padding: 5px;  float: left; position: relative;">\
					<a href="hint/katei.html" target="_blank" onclick="hint_katei()">仮定とは？</a><br><br>\
					<a href="hint/tohenequal.html" target="_blank" onclick="hint_hen()"">辺の長さが等しいことを言うためには？</a><br><br>\
					<a href="hint/godozyoken.html" target="_blank" onclick="hint_tricong()"">三角形の合同条件</a><br><br>\
					<a href="hint/nitouhen.html" target="_blank" onclick="hint_nitohen()"">二等辺三角形について</a><br><br>\
				</div>\
				<div id="hint2" style="width: 160px; padding: 5px; float: left; position: relative;">\
					<a href="hint/keturon.html" target="_blank onclick="hint_keturon()">結論とは？</a><br><br>\
					<a href="hint/tokakuequal.html" target="_blank" onclick="hint_kaku()"">角の大きさが等しいことを言うためには？</a><br><br>\
					<a href="hint/heiko.html" target="_blank" onclick="hint_heiko()"">平行について</a><br><br>\
				</div>\
			</div>'
		account=document.student_ID.elements[1].value;
		alllog="question2,0,start,,,生徒ID:"+account+",,/"
		document.getElementById("title").innerHTML='三角形合同証明問題 問題4'
		}
	}else{
		document.getElementById("title").innerHTML='三角形合同証明問題 問題4　　<button type="button" class="button_sg" value="start" onclick= "start()">始める</button>　<input type="text" name="student_ID" size="30" placeholder="生徒IDが間違っています。">'
	}
}
//ヒントを押したことをログに残す関数
function hint_katei(){
	write_log("hint",'','仮定とは？','','','');
}
function hint_katei(){
	write_log("hint",'','辺を言うには','','','');
}
function hint_tricong(){
	write_log("hint",'','三角形の合同条件？','','','');
}
function hint_nitohen(){
	write_log("hint",'','二等辺三角形','','','');
}
function hint_keturon(){
	write_log("hint",'','結論とは？','','','');
}
function hint_kaku(){
	write_log("hint",'','角を言うには','','','');
}
function hint_heiko(){
	write_log("hint",'','平行','','','');
}

function time(){
	var date_obj2 = new Date();
	now_time = date_obj2.getTime();
	elapsed_time=now_time - start_time;
	var time_milli;
	time_milli=elapsed_time%1000;
	elapsed_time=elapsed_time - time_milli;
	elapsed_time=elapsed_time/1000;
	alllog=alllog+elapsed_time+",";
}

//押した奴が赤くなり元のやつは元の色に戻る関数
var lastid = "";
var lastbgcolor="";
var lastbdcolor="";

function btnclr_change(e) {
	if (lastid.length) {
		document.getElementById(lastid).style.backgroundColor = lastbgcolor;
		document.getElementById(lastid).style.borderColor = lastbdcolor;
	}
	lastbgcolor = e.style.backgroundColor;
	lastbdcolor = e.style.borderColor;
	e.style.backgroundColor = "#ffdbdb";
	e.style.border = "solid 3px red"; 
	lastid = e.id;
}

function write_log(act,vec,inp1,inp2,tf,inp3){
	alllog=alllog+lognumber+",";
	time();
	alllog=alllog+act+","+vec+","+tf+","+inp1+","+inp2+","+inp3+"/";
	lognumber++;
}

function output(){
	setBlobUrl("download",alllog);
	finish();
}

//name(div_??)と(x,y)を引数にとってボタンを移動する関数
function div_move(name,x,y){
	var div_name="div_"+name;
	var style_text="position: absolute; left: "+x+"px; top:"+y+"px;";
	if(document.getElementById(div_name)){
		var k = document.getElementById(div_name);
		k.style=style_text;
	}
}

function div_clear(name){
	var div_name="div_"+name;
	if(document.getElementById(div_name)){
		document.getElementById(div_name).innerHTML="";
	}
}
//要素を並べる(問題ごとに作成)
function finish(){
	var canvas = document.getElementById("st_d_canvas").getContext("2d");
	canvas.clearRect(0,0,425,510);
	div_clear("katei");
	div_clear("frompic");
	div_clear("keturon");
	div_clear("ketu2");
	div_clear("ketu3");
	div_clear("cong2")
	beforeX=180;
	beforeY=20;
	makeButton("_katei",160,10,"green","仮定","");
	div_move("katei1","10","10");
	div_move("katei2","10","60");
	div_move("frompic2","10","110")
	div_move("cong","10","160")	
	div_move("ketu","10","210");
	div_move("frompic1","160","60");
	div_move("congCond","160","110");

	if (lastid.length) {
		document.getElementById(lastid).style.backgroundColor = lastbgcolor;
		document.getElementById(lastid).style.borderColor = lastbdcolor;
	}
}


function setBlobUrl(id, content) {
        // IE 10.0以降、Firefox 13.0以降、Chrome 20.0以降、Safari 6.0以降
		console.log("window.Blob=" + window.Blob);
        
        // IE 10.0以降、Firefox 12.0以降
        console.log("window.URL=" + window.URL);
        // Chrome 20.0以降, Safari 6.0以降
        console.log("window.webkitURL=" + window.webkitURL);
        
    	// 指定されたデータを保持するBlobを作成する。
        var blob = new Blob([ content ], { "type" : "application/x-msdownload" });

		// Aタグのhref属性にBlobオブジェクトを設定する。
        window.URL = window.URL || window.webkitURL;
        var filename=account+".txt";
        console.log(filename);
        $("#" + id).attr("href", window.URL.createObjectURL(blob));
        $("#" + id).attr("download", filename);
}


//(x,y)と傾きaを与えて、(x,y)を一つの頂点とした傾いた三角形を描画する
function triangle(x1,y1,x2,y2){
	var a;
	var canvas = document.getElementById("st_d_canvas");
	var _x1,_y1,_x2,_y2,x,y;
	if(y2-y1>=0){
		x=(x2+x1)/2;
		y=(y2+y1)/2;
	}else{
		x=(x1+2*x2)/3;
		y=(y1+2*y2)/3;
	}
	if(x2-x1==0){
		if(y1>y2){
			_x1=5/Math.sqrt(3);
			_y1=5;
			_x2=-5/Math.sqrt(3);
			_y2=_y1;
		}else{
			_x1=5/Math.sqrt(3);
			_y1=-5;
			_x2=-5/Math.sqrt(3);
			_y2=_y1;
		}
	}else{
		var sha=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
		var sinTh=(y2-y1)/sha;
		var cosTh=(x2-x1)/sha;
		_x1=5*sinTh/Math.sqrt(3) - 5*cosTh;
		_y1=-5*cosTh/Math.sqrt(3) -5*sinTh;
		_x2=-5*sinTh/Math.sqrt(3) - 5*cosTh;
		_y2=5*cosTh/Math.sqrt(3) -5*sinTh;
	}
	
	if(canvas.getContext){
		var context2 = canvas.getContext("2d");
		context2.beginPath();
		context2.moveTo(x,y);
		context2.lineTo(x+_x1,y+_y1);
		context2.lineTo(x+_x2,y+_y2);
		context2.closePath();
		context2.fill();
	}
	console.log(x);
	console.log(y);
	console.log(_x1);
	console.log(_y1);
	console.log(_x2);
	console.log(_y2);
	console.log(sinTh);
	console.log(cosTh);
}


//(x1,y1)と(x2,y2)の間を直線で繋ぐ関数
function stLine(x1,y1,x2,y2){
	var canvas = document.getElementById("st_d_canvas");
	if(canvas.getContext){
		var context = canvas.getContext("2d");
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.closePath();
		context.stroke();
	}

	triangle(x1,y1,x2,y2);
}

//beforeX,Yに現在押して考えているボタンの中心くらいの座標を代入する関数
function beforeXY(_id){
	var before_cnt = document.getElementById(_id);
	beforeX = parseFloat(before_cnt.style.left) + before_cnt.clientWidth/2;
	beforeY = parseFloat(before_cnt.style.top) + before_cnt.clientHeight/2;
}

//ボタンを作る関数
function makeButton(name,x,y,clr,cnt,next_func){
	var cX,cY;
	var div1 = document.createElement("div");
	var style_text = "position: absolute; left:" + x +"px; top:" + y + "px;";
	//色判定
	if(clr=="blue"){
		var contents_text = '<button type="button" class="button_blue" id="'+name+'" value="' + name +'" onclick= "'+ next_func +'"" >' + cnt +'</button>';
	}else if(clr=="yellow"){
		var contents_text = '<button type="button" class="button_yellow" id="'+name+'" value="' + name +'" onclick= "'+ next_func +'"" >' + cnt +'</button>';
	}else{
		var contents_text = '<button type="button" class="button_green" id="'+name+'" value="' + name +'" onclick= "'+ next_func +'"" >' + cnt +'</button>';
	}
	var id_text = "div_" + name;
	div1.id = id_text;
	div1.style = style_text;
	document.getElementById("st_d").appendChild(div1);
	document.getElementById(id_text).innerHTML= contents_text;
	cX=div1.clientWidth/2;
	cY=div1.clientHeight/2;
	stLine(beforeX,beforeY,x+cX,y+cY);
	write_log('mkbtn','',cnt,'','t','');
}

function backHistory(){
	document.getElementById("diag").innerHTML=diag_history;
}

//answer_select(定型フォームセレクト)の中で何を選んだかを配列で返す関数
function whatSelect(){
	var arr =[];
	arr[0] = document.answer_select.elements[0].value;
	arr[1] = document.answer_select.elements[1].value;
	return arr;
}

//makeFormの補助関数 valueを日本語に変換する
function valueToJap(val){
	if(val=='hen'){return '辺'}
	else if(val=='kaku'){return '角度'}
	else if(val=='ten'){return '点'}
	else if(val=='tri'){return '三角形'}
	else if(val=='cong'){return '合同である'}
	else if(val=='equal'){return '等しい'}
	else if(val=='sep'){return'◯:△に分けられる'}	
	else if(val=='heiko'){return '平行である'}
	else if(val=='suichoku'){return '垂直である'}
	else if(val=='center'){return '〇〇の中点である'}
	else if(val=='divi'){return '二等分される'}
	else if(val=='val'){return '◯(値)である'}
	else{}
}

var question_number=1; //今何番のquestionについて考えているかを入れておくグローバル変数
var form_number; //定型フォームを使用する際に何番のフォームかを入れておくグローバル変数(その後ろのエラー回避のため)

//定型のformでの入力の場合、どのFB関数を起動するかを返す関数
function whichFB(){
	if(question_number==1){
		ques1_fb();
	}else if(question_number==2){
		ques2_fb();
	}else if(question_number==0){
		fromPic_fb();
	}else if(question_number==7){
		ques7_fb();
	}else if(question_number==4){
		ques4_fb();
	}else if(question_number==3){
		ques3_fb()
	}else if(question_number==6){
		ques6_fb();
	}
}

function makeForm(){
	var div1 = document.createElement("div");
	div1.id = "_form";
	div1.style = "";
	document.getElementById("diag").appendChild(div1);
	var ans = whatSelect();
	if(ans[0]=="hen" && ans[1]=="equal"){
		form_number = 1;
		document.getElementById("_form").innerHTML = '<br><form name="form1">辺<input type="text" name="he" size="3" value=""> = 辺<input type="text" name="kaku2" size="3" value=""> <input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="kaku" && ans[1]=="equal"){
		form_number = 2;
		document.getElementById("_form").innerHTML = '<br><form name="form2">∠<input type="text" name="kaku1" size="3" value=""> = ∠<input type="text" name="kaku2" size="3" value=""> <input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="ten" && ans[1]=="equal"){
		form_number = 3;
		document.getElementById("_form").innerHTML = '<br><form name="form3">「点が等しい」とは言わないと思います。<br>辺の長さが同じならば「辺が等しい」、<br>角度が同じならば「角度が等しい」ですね。';
	}else if(ans[0]=="hen" && ans[1]=="sep"){
		form_number = 4;
		document.getElementById("_form").innerHTML = '<br> <form name="form4">辺<input type="text" name="kaku1" size="3" value="">が 点<input type="text" name="kaku1" size="2" value=""> で <input type="text" name="kaku1" size="3" value=""> : <input type="text" name="kaku1" size="3" value=""> に分けられる。<input type="button" value="決定" onclick="whichFB()"><br></p></form>'
	}else if(ans[0]=="kaku" && ans[1]=="sep"){
		form_number = 5;
		document.getElementById("_form").innerHTML = '<br> <form name="form5">∠<input type="text" name="kaku1" size="3" value="">が <input type="text" name="kaku1" size="3" value=""> : <input type="text" name="kaku1" size="3" value=""> に分けられる。<input type="button" value="決定" onclick="whichFB()"><br></p></form>'
	}else if(ans[0]=="ten" && ans[1]=="sep"){
		form_number = 6;
		document.getElementById("_form").innerHTML = '<br> <form name="form6">辺<input type="text" name="kaku1" size="3" value="">が 点<input type="text" name="kaku1" size="2" value=""> で <input type="text" name="kaku1" size="3" value=""> : <input type="text" name="kaku1" size="3" value=""> に分けられる。<input type="button" value="決定" onclick="whichFB()"><br></p></form>'
	}else if(ans[0]=="hen" && ans[1]=="heiko"){
		form_number = 7;
		document.getElementById("_form").innerHTML = '<br><form name="form7">辺<input type="text" name="kaku1" size="3" value=""> // 辺<input type="text" name="kaku2" size="3" value=""> <input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="kaku" && ans[1]=="heiko"){
		form_number = 8;
		document.getElementById("_form").innerHTML = '<br>「角が平行」とは言いません。<br>辺が平行ならば「辺が平行」ですね。';
	}else if(ans[0]=="ten" && ans[1]=="heiko"){
		form_number = 9;
		document.getElementById("_form").innerHTML = '<br>「点が平行」とは言いません。<br>辺が平行ならば「辺が平行」ですね。';
	}else if(ans[0]=="hen" && ans[1]=="suichoku"){
		form_number = 10;
		document.getElementById("_form").innerHTML = '<br><form name="form10">辺<input type="text" name="kaku1" size="3" value=""> ⊥ 辺<input type="text" name="kaku2" size="3" value=""> なので ∠<input type="text" name="kaku2" size="3" value=""> = 90° <input type="button" value="決定" onclick="whichFB()"><br></p></form>';		
	}else if(ans[0]=="kaku" && ans[1]=="suichoku"){
		form_number = 11;
		document.getElementById("_form").innerHTML = '<br><form name="form11">∠<input type="text" name="kaku2" size="3" value=""> = 90° <input type="button" value="決定" onclick="whichFB()"><br></p></form>';		
	}else if(ans[0]=="ten" && ans[1]=="suichoku"){
		form_number = 12;
		document.getElementById("_form").innerHTML = '<br>「点が垂直」とは言わないと思います。<br>垂直があるならば「辺が垂直」もしくは「角が垂直」ですね。';
	}else if(ans[0]=="hen" && ans[1]=="center"){
		form_number = 13;
		document.getElementById("_form").innerHTML = '<br><form name="form13">点<input type="text" name="kaku1" size="2" value=""> が 辺<input type="text" name="kaku2" size="3" value=""> の中点である。<input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="kaku" && ans[1]=="center"){
		form_number = 14;
		document.getElementById("_form").innerHTML = '<br>「角が中点」とは言わないと思います。<br>角が同じ角度で二つに分かれるならば「角が二等分される」ですね。';
	}else if(ans[0]=="ten" && ans[1]=="center"){
		form_number = 13;
		document.getElementById("_form").innerHTML = '<br><form name="form13">点<input type="text" name="kaku1" size="2" value=""> が 辺<input type="text" name="kaku2" size="3" value=""> の中点である。<input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="hen" && ans[1]=="divi"){
		form_number = 13;
		document.getElementById("_form").innerHTML = '<br><form name="form13">点<input type="text" name="kaku1" size="2" value=""> が 辺<input type="text" name="kaku2" size="3" value=""> を二分割する。<input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="kaku" && ans[1]=="divi"){
		form_number = 17;
		document.getElementById("_form").innerHTML = '<br> <form name="form17">∠<input type="text" name="kaku1" size="3" value="">が 二分割される。<input type="button" value="決定" onclick="whichFB()"><br></p></form>'
	}else if(ans[0]=="ten" && ans[1]=="divi"){
		form_number = 13;
		document.getElementById("_form").innerHTML = '<br><form name="form13">点<input type="text" name="kaku1" size="2" value=""> が 辺<input type="text" name="kaku2" size="3" value=""> を二分割する。<input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="hen" && ans[1]=="val"){
		form_number = 19;
		document.getElementById("_form").innerHTML = '<br><form name="form19">辺<input type="text" name="kaku1" size="3" value=""> = <input type="text" name="kaku1" size="5" value="長さ"><input type="button" value="決定" onclick="whichFB()"><br></p></form>'
	}else if(ans[0]=="kaku" && ans[1]=="val"){
		form_number = 20;
		document.getElementById("_form").innerHTML = '<br><form name="form20">∠<input type="text" name="kaku1" size="3" value=""> = <input type="text" name="kaku1" size="5" value="角度">° <input type="button" value="決定" onclick="whichFB()"><br></p></form>'
	}else if(ans[0]=="ten" && ans[1]=="val"){
		form_number = 21;
		document.getElementById("_form").innerHTML = '<br>「点に値」はありません。<br>角度が◯°は「角が◯°」、長さが◯の時は「辺が◯」ですね。';
	}else if(ans[0]=="tri" && ans[1]=="val"){
		form_number = 22;
		document.getElementById("_form").innerHTML = '<br><form name="form22">△<input type="text" name="kaku1" size="3" value=""> = <input type="text" name="kaku1" size="5" value="面積"> <input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="tri" && ans[1]=="cong"){
		form_number = 23;
		document.getElementById("_form").innerHTML = '<br><form name="form23">△<input type="text" name="kaku1" size="4" value=""> ≡ △<input type="text" name="kaku1" size="4" value=""> <input type="button" value="決定" onclick="whichFB()"><br></p></form>';
	}else if(ans[0]=="tri" && ans[1]=="equal"){
		document.getElementById("_form").innerHTML = '<br>三角形の形が等しいことは「三角形が合同である」と言います。「三角形」が「合同である」を選びましょう。';
	}else if(ans[1]=="cong"){
		var txt = '<br>「' + valueToJap(ans[0]) + 'が合同」ということはありません。「合同」という言葉は図形(特に三角形)が一致する時に使います。三角形の合同について書きたい時は「三角形が合同」を選びましょう。' ;
		document.getElementById("_form").innerHTML = txt;
	}else if(ans[0]=="tri"){
		var txt = '<br>「三角形が'+ valueToJap(ans[1])+ '」ということはありません。「何」が「'+valueToJap(ans[1])+'」なのかもう一度考えてフォームを選んでみましょう。'
		document.getElementById("_form").innerHTML = txt;
	}else{}
}

//入力フォーム選択を出す関数。引数は("フォームの前の言葉")
function makeSelect(cnt1){
	var contents=cnt1+'<form name="answer_select">\
				<select name="thing">\
					<option value="hen">辺</option>\
					<option value="kaku">角度</option>\
					<option value="ten">点</option>\
					<option value="tri">三角形</option>\
				</select>\
			が(で)\
				<select name="thing">\
					<option value="cong">合同である</option>\
					<option value="equal">等しい</option>\
					<option value="sep">◯:△に分けられる</option>\
					<option value="heiko">平行である</option>\
					<option value="suichoku">垂直である</option>\
					<option value="center">〇〇の中点である</option>\
					<option value="divi">二等分される</option>\
					<option value="val">◯(値)である</option>\
				</select>\
				<input type="button" value="入力用フォームを表示" onclick="makeForm()">\
			</form>';

	if(document.getElementById){
			document.getElementById("diag").innerHTML=contents;
	}
}

//同じ辺を指しているのかをbooleanで判定する関数
function hen_cor(ans1,ans2,t_ans1,t_ans2){
	function hen_cor_simple(a1,a2){
		return a1==t_ans1 && a2 ==t_ans2;
	}
	function hen_replace(hen){
		var hen2;
		hen2 = hen.charAt(1)+hen.charAt(0);
		return hen2;
	}
	return hen_cor_simple(ans1,ans2) || hen_cor_simple(hen_replace(ans1),ans2) || hen_cor_simple(ans1,hen_replace(ans2)) || hen_cor_simple(hen_replace(ans1),hen_replace(ans2)) || hen_cor_simple(ans2,ans1) || hen_cor_simple(hen_replace(ans2),ans1) || hen_cor_simple(ans2,hen_replace(ans1)) || hen_cor_simple(hen_replace(ans2),hen_replace(ans1)) ;
}

//同じ角を指しているのかをbooleanで判定する関数
function kaku_cor(ans1,ans2,t_ans1,t_ans2){
	function kaku_cor_simple(a1,a2){
		return a1==t_ans1 && a2 ==t_ans2;
	}
	function kaku_replace(kaku){
		var kaku2;
		kaku2 = kaku.charAt(2)+kaku.charAt(1)+kaku.charAt(0);
		return kaku2;
	}
	return kaku_cor_simple(ans1,ans2) || kaku_cor_simple(kaku_replace(ans1),ans2) || kaku_cor_simple(ans1,kaku_replace(ans2)) || kaku_cor_simple(kaku_replace(ans1),kaku_replace(ans2)) || kaku_cor_simple(ans2,ans1) || kaku_cor_simple(kaku_replace(ans2),ans1) || kaku_cor_simple(ans2,kaku_replace(ans1)) || kaku_cor_simple(kaku_replace(ans2),kaku_replace(ans1)) ;
}

//同じ三角形を指しているのかを、正解=0,対応が間違い=1,間違い=2として返す
function tri_cor(ans1,ans2,t_ans1,t_ans2){

	function sameStrings(ans,t_ans){
		var num_of_matchString=0;
		for(var i=0;i<=2;i++){
			for(var j=0;j<=2;j++){
				if(ans.charAt(i)==t_ans.charAt(j)){
					num_of_matchString++;
				}else{}
			}
		}
		/*
		if(num_of_matchString==3){
			return true;
		}else{
			return false;
		}
		*/
		return (num_of_matchString == 3)?true:false;
	}

	function cong(_ans1,_ans2,_t_ans1,_t_ans2){
		var retn =true;
		for(i=0;i<=2;i++){
			for(var j=0;j<=2;j++){
				if(_t_ans1.charAt(i)==_ans1.charAt(j)){
					if(_t_ans2.charAt(i)!=_ans2.charAt(j)){
						retn=false;
					}
				}
			}
		}
		console.log(retn);
		return retn;
		
	}

	if(sameStrings(ans1,t_ans1)&&sameStrings(ans2,t_ans2)){
		if(cong(ans1,ans2,t_ans1,t_ans2)){
			return 0;
		}else{
			return 1;
		}
	}else if(sameStrings(ans2,t_ans1)&&sameStrings(ans1,t_ans2)){
		if(cong(ans2,ans1,t_ans1,t_ans2)){
			return 0;
		}else{
			return 1;
		}
	}else{
		return 2;
	}
}


var forcong=0;//合同を言うための変数 3つ揃ってたら言える

////////////////////////////図の性質から言えることは何か?////////////////////////////////

var frompic=0;//正解になるまでは0,正解したら1に変わる
var frompicText="";//後で表示するためにとっておく

function fromPic(){
	if(mode=="normal"){
		question_number=0;
		beforeXY("div_frompic");
		makeSelect("図形の性質から言えることはなんでしょうか？<br>選んだ後、根拠となることがら(理由)を聞きます。<br>")
		write_log("psbtn","f","frompic()",'','','');
		btnclr_change(document.getElementById("frompic"));
	}else if(mode=="cong"){

	}else if(mode=="use_prosp"){

	}else if(mode=="backcong"){

	}
}
//共通な角限定の関数
function fromPic_fb(){
	if(form_number==2){
		if(kaku_cor(document.form2.elements[0].value,document.form2.elements[1].value,"AEC","DEB")){
			if(frompic==0){
				var fb_text='その通りです<br>∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value+'になります。<br>ではなぜでしょう？根拠となることがらを選びましょう。<br><br>\
					<form name="fromPic_select">\
						<select name="thing">\
							<option value="1">仮定だから</option>\
							<option value="2">二等辺三角形だから</option>\
							<option value="3">AQ//BPだから</option>\
							<option value="4">対頂角だから</option>\
							<option value="5">合同だから</option>\
							<option value="6">共通だから</option>\
							<option value="7">平行線の錯角だから</option>\
						</select>\
						<input type="button" value="決定" onclick="fromPic_fb2()">\
					</form><br>'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f",document.form2.elements[0].value,document.form2.elements[1].value,'t','');
			}else{
				alert('∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value+'は入力済みです。')
			}
		}else{
			var fb_text='残念ながら、そのことは図の性質からは言えません。<br>図形の性質から言えることがもうなかったり、わからない場合は後ろからも考えてみましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","f",document.form2.elements[0].value,document.form2.elements[1].value,'f','');
		}
	}else{
		var fb_text='残念ながら、そのことは図の性質からは言えません。<br>図形の性質から言えることがもうなかったり、わからない場合は後ろからも考えてみましょう。'
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
		write_log("ans","f",'','','f','');
	}
}

function fromPic_fb2(){
	if(document.fromPic_select.elements[0].value==4 && frompic==0){
		var fb_text='正解です！ そのことが構造図に表示され、問題図にも角の大きさが等しいことを表す記号が表示されました。もし、他にも図形の性質から言えることがあればもう一度「図形の性質から言えること」のボタンを押してから記入しましょう。'
		var div_fb2 = document.createElement("div");
		div_fb2.id = "fb2";
		document.getElementById("diag").appendChild(div_fb2);
		document.getElementById("fb2").innerHTML= fb_text;
		frompic=1;
		forcong++;
		frompicText='∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value;
		makeButton("frompic1",280,80,"green",'対頂角','','')
		beforeXY("div_frompic1")
		makeButton("frompic2",260,150,"yellow",frompicText,"ques4_pic()")
		if(ques1_count==0){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_E.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_count==2){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_all.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="CE=BE"){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CEBEE.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="ACE=DBE"){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CBE.jpg" alt="問題図" style="width: 345px">';
		}else{
		}
		write_log("ans","f","対頂角",'','t','')
	}else if(frompic==0){
		var fb_text='残念ながら違います。図の該当する辺に印をつけました。どのような状態になっているか考えてみましょう。'
		var div_fb2 = document.createElement("div");
		div_fb2.id = "fb2";
		document.getElementById("diag").appendChild(div_fb2);
		document.getElementById("fb2").innerHTML= fb_text;
		if(ques1_count==0){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_E.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_count==2){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_all.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="CE=BE"){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CEBEE.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="ACE=DBE"){
			document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CBE.jpg" alt="問題図" style="width: 345px">';
		}else{
		}
	}else{}
	write_log("ans","f",'図形の性質',document.fromPic_select.elements[0].value,'f','');
}

//////////question1【前】「仮定はなんですか？」////////////////////
var ques1_count=0;
var ques1_left="";//CE=BE or ACE=DBEを入れる
var ques1_right="";//CE=BE or ACE=DBEを入れる
var katei1Text="";//後で使うためにとっとく
var katei2Text="";//後で使うためにとっとく

function ques1(){
	if(mode=="normal"){
		question_number = 1;
		beforeXY("div_katei");
		makeSelect("この問題における「仮定」はなんでしょう？<br>「仮定」の意味が分からない場合は下のリンクをクリックしよう。<br>");
		write_log("psbtn","f","ques1()",'','','');
		btnclr_change(document.getElementById("katei"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode="backcong"){

	}
}

function ques1_fb(){
	if(form_number==1){
		var hen1=document.form1.elements[0].value;
		var hen2=document.form1.elements[1].value;
		if(hen_cor(hen1,hen2,"CE","BE")){
			if(ques1_left!=="CE=BE" && ques1_right!=="CE=BE"){
				var fb_text='正解です！<br>'+hen1+'='+hen2+'であることは「仮定」です。<br>左の構造図に'+hen1+'='+hen2+'が表示され、図にも長さが等しいことを表す記号が追加されました。<br>他にも仮定があれば、もう一度「仮定を整理する」のボタンを押してから記入しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				if(ques1_count==0){
					katei1Text=hen1+'='+hen2;
					makeButton("katei1",10,80,"yellow",katei1Text,"ques4_1()");
					forcong++;
					ques1_left="CE=BE"
					//問題図の変更
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CEBE.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CEBEE.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else if(ques1_count==1){
					katei2Text=hen1+'='+hen2;
					makeButton("katei2",100,80,"yellow",katei2Text,"ques4_2()");
					forcong++;
					ques1_right="CE=BE"
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CEBECB.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_all.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else{
				}
				write_log("ans","f",hen1,hen2,'t','');
				ques1_count++;
			}else{
				alert(hen1+'='+hen2+'は入力済みです。')
			}
		}else{
			var fb_text='残念ながら違います。問題文と見比べてもう一度見てみましょう。「仮定」がわからないときは下のリンクをクリックして復習しましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","f",hen1,hen2,'f','');
		}
	}else if(form_number==2){
		var kaku1=document.form2.elements[0].value;
		var kaku2=document.form2.elements[1].value;
		if(kaku_cor(kaku1,kaku2,"ACE","DBE")||kaku_cor(kaku1,kaku2,"ACD","DBE")||kaku_cor(kaku1,kaku2,"ACE","DBA")||kaku_cor(kaku1,kaku2,"ACD","DBA")){
			if(ques1_left!=="ACE=DBE"&&ques1_right!=="ACE=DBE"){
				var fb_text='正解です！<br>∠'+kaku1+'=∠'+kaku2+'であることは「仮定」です。<br>左の構造図に∠'+kaku1+'=∠'+kaku2+'が表示され、図にも角の大きさが等しいことを表す記号が追加されました。<br>他にも仮定があれば、もう一度「仮定を整理する」のボタンを押してから記入しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				if(ques1_count==0){
					katei1Text='∠'+kaku1+'=∠'+kaku2;
					makeButton("katei1",10,80,"yellow",katei1Text,"ques4_1()");
					forcong++;
					ques1_left="ACE=DBE"
					//問題図の変更
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CB.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CBE.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else if(ques1_count==1){
					katei2Text='∠'+kaku1+'=∠'+kaku2;
					makeButton("katei2",100,80,"yellow",katei2Text,"ques4_2()");
					forcong++;
					ques1_right="ACE=DBE"
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_CEBECB.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q4_image/pic_q4_all.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else{
				}
				write_log("ans","f",hen1,hen2,'t','');
				ques1_count++;
			}else{
				alert('∠'+kaku1+'=∠'+kaku2+'は入力済みです。')
			}
		}
	}else{
		var fb_text='残念ながら違います。問題文と見比べてもう一度見てみましょう。「仮定」がわからないときは下のリンクをクリックして復習しましょう。'
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
		write_log("ans","f",'','','f','');
	}
}

//////////question2【後】「結論はなんですか？」////////////////////
function ques2(){
	if(mode=="normal"){
		question_number = 2;
		beforeXY("div_keturon");
		makeSelect("この問題における「結論」はなんでしょう？<br>「結論」の意味が分からない場合は下のリンクをクリックしよう。<br>");
		write_log("psbtn","b","ques2()",'','','');
		btnclr_change(document.getElementById("keturon"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode=="backcong"){

	}
}
var keturon_text;

function ques2_fb(){
	if(form_number==1){
		var hen1=document.form1.elements[0].value;
		var hen2=document.form1.elements[1].value;
		if(hen_cor(hen1,hen2,"AE","DE")){
			keturon_text=hen1+"="+hen2;
			document.getElementById("diag").innerHTML="正解です！<br>左の構造図に"+keturon_text+"が表示されました。";
			makeButton("ketu",180,400,"blue",keturon_text,"ques3()");
			keturonboolean=true;
			write_log("ans","b",rec1,rec2,'t','');
		}else{
			var fb_text="残念ながらそれは結論ではありません。「結論」が何か分からない場合には下記リンクをクリックして復習をしましょう。";
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","b",'','','f','');
		}
	}else{
		var fb_text="残念ながらそれは結論ではありません。「結論」が何か分からない場合には下記リンクをクリックして復習をしましょう。";
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
		write_log("ans","b",'','','f','');
	}
}

///////////question3【後】「それを言うために何が言えたらいいのか？」
function ques3(){
	if(mode=="normal"){
		question_number = 3;
		beforeXY("div_ketu");
		makeSelect(keturon_text+"を言うためにはどんなことが言えたらいいでしょうか。<br>わからないときはヒント欄の「辺の長さが等しいことを言うためには？」を参考にしてみましょう。");
		write_log("psbtn","b","ques3()",'','','');
		btnclr_change(document.getElementById("ketu"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode=="backcong"){

	}
}

function ques3_fb(){
	if(form_number==23){
		var rec1=document.form23.elements[0].value;
		var rec2=document.form23.elements[1].value;
		var boolnum=tri_cor(rec1,rec2,"ACE","DBE");
		if(boolnum==0){
			if(congboolean==false){
				var congtext='そうですね！<br>もし△'+rec1+'≡△'+rec2+'が言えたら'+keturon_text+'が言えそうですね！<br>構造図に表示されました。'
				document.getElementById("diag").innerHTML=congtext;
				makeButton("cong",160,330,"blue",'△'+rec1+'≡△'+rec2,"ques5()");
				congboolean=true;
			}else if(congboolean==true){
				var congtext='そうですね！<br>△'+rec1+'≡△'+rec2+'が言えることで'+keturon_text+'が言えそうですね！<br>これで前向き推論と後ろ向き推論がつながりました。なので構造図作成は終了です。終了ボタンを押して担当の人を呼びましょう。<br><p style="text-align:right"><button type="button" value="output" style="" onclick= "output()">終了</button> </p> <a id="download" target="_blank">ダウンロード（IEでは、右クリック＞対象をファイルに保存）</a>'
				document.getElementById("diag").innerHTML=congtext;
				makeButton("cong",160,330,"yellow",'△'+rec1+'≡△'+rec2,"ques5()");
				congboolean=true;
				mode="finish";
			}
		}else if(boolnum==1){
			diag_history=document.getElementById("diag").innerHTML;
			var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、「対応順」が違っています。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}else{
			diag_history=document.getElementById("diag").innerHTML;
			var fb_text='残念ながら△'+rec1+'と△'+rec2+'から，これらのことを言うとこは出来ません．<br>「合同であることを使いたい」という方針そのものは正しいです。<br>対応順についても注意しながら打ち間違いの無いよう入力しましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		var fb_text='残念ながらそのことからこれらの角度が等しいことは言えません。<br>わからない場合は、まずは前向き推論を進めてみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
	}
}

///////////question4【前】「これらから何が言えますか？」///////////////////


//それぞれのスイッチになる
var k1=0;
var k2=0;
var fp=0;

function ques4_1(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei1"));
		if(keturonboolean==true && ques1_count==2){
			question_number = 4;
			beforeXY("div_katei1");
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			k1=1;
			k2=0;
			fp=0;
			write_log("psbtn","f","ques4_1()",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","ques4_1()","仮定まだ",'','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","ques4_1()","結論まだ",'','');
		}
	}else if(mode=="cong"){
		if(k1==0){
			k1=1;
			var fb_text='●　'+katei1Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb1";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb1").innerHTML= fb_text;
		}
	}else if(mode=="backcong"){
		if(k1==0){
			k1=1;
			var fb_text='●　'+katei1Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb1";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb1").innerHTML= fb_text;
		}
	}
}

function ques4_2(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei2"));
		if(keturonboolean==true && ques1_count==2){
			question_number = 4;
			beforeXY("div_katei2");
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			k1=0;
			k2=1;
			fp=0;
			write_log("psbtn","f","ques4_2()",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","ques4_2()","仮定まだ",'','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","ques4_2()","結論まだ",'','');
		}
	}else if(mode=="cong"){
		if(k2==0){
			k2=1;
			var fb_text='●　'+katei2Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb2";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb2").innerHTML= fb_text;
		}
	}else if(mode=="backcong"){
		if(k2==0){
			k2=1;
			var fb_text='●　'+katei2Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb2";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb2").innerHTML= fb_text;
		}
	}
}

function ques4_pic(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("frompic2"));
		if(keturonboolean==true && ques1_count==2){
			question_number = 4;
			beforeXY("div_frompic2");
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			k1=0;
			k2=0;
			fp=1;
			write_log("psbtn","f","ques4_pic()",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","ques4_pic()","仮定まだ",'','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","ques4_pic()","結論まだ",'','');
		}
		
	}else if(mode=="cong"){
		if(fp==0){
			fp=1;
			var fb_text='●　'+frompicText;
			var div_fb = document.createElement("div");
			div_fb.id = "fb3";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb3").innerHTML= fb_text;
		}
	}else if(mode=="backcong"){
		if(fp==0){
			fp=1;
			var fb_text='●　'+frompicText;
			var div_fb = document.createElement("div");
			div_fb.id = "fb3";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb3").innerHTML= fb_text;
		}
	}
}

function ques4_fb(){
	if(form_number==23){
		var rec1=document.form23.elements[0].value;
		var rec2=document.form23.elements[1].value;
		var boolnum=tri_cor(rec1,rec2,"ACE","DBE");
		if(boolnum==0){//正解
			if(forcong==3){
				var firsttxt;
				if(k1==1){firsttxt=katei1Text;}else if(k2==1){firsttxt=katei2Text;}else if(fp==1){firsttxt=frompicText;}else{}
				var congtext='そうですね！<br>△'+rec1+'≡△'+rec2+'が言えると思います。<br>それを言うために、他にどの要素を使う必要がありますか？<br>そのボタンをクリックしましょう。(クリックするとこの下に表示されます)<br>全てクリックし終わったらOKを押して先に進みましょう。<br><br>●　'+firsttxt+'<p class="button_dec" ><input type="button" value="OK" onclick="ques4_fb2()"></p>'
				document.getElementById("diag").innerHTML=congtext;
				forcong=4;
				mode="cong";
				if(congboolean==false){
					makeButton("congCond0",100,240,"green",'____________がそれぞれ等しい',"");
					beforeXY("div_congCond0");
					makeButton("cong2",160,330,"yellow",'△'+rec1+'≡△'+rec2,"ques6()");
					write_log("ans","f","△"+rec1,"△"+rec2,'t','');
				}else if(congboolean==true){
					makeButton("congCond0",100,240,"green",'____________がそれぞれ等しい',"");
					beforeXY("div_congCond0");
					makeButton("cong2",160,330,"blue",'△'+rec1+'≡△'+rec2,"");
					div_clear("cong2");
					write_log("ans","f","△"+rec1,"△"+rec2,'t','');
				}
			}else{
				var fb_text='△'+rec1+'≡△'+rec2+'を言いたいのはいい方向性だと思います。<br>しかし、現時点では'+forcong+'つしか条件がないので三角形の合同を言うことはできません。合同を言うために、あとどこが言えたらいいのか考えて、そこが図形の性質から言えないかを考えてみましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f","△"+rec1,"△"+rec2,'f','');				
			}
		}else if(boolnum==1){
			if(forcong==3){
				var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、「対応順」が違っています。確認してみましょう。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f","△"+rec1,"△"+rec2,'f','');
			}else{
				var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、現時点では'+forcong+'つしか条件がないので三角形の合同を言うことはできません。加えて「対応順」が違っています。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。';
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f","△"+rec1,"△"+rec2,'f','');
			}
		}else{
			var fb_text='残念ながら△'+rec1+'≡△'+rec2+'を言うことはできません。<br>「合同であることを使いたい」という方針そのものは正しいです。<br>対応順についても注意しながら打ち間違いの無いよう入力しましょう。';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","f","△"+rec1,"△"+rec2,'f','');
		}
	}else{
		if(forcong==3){
			var fb_text='残念ながらそのことを言うことはできません。<br>図も参考にしながら考えてみましょう。<br>それでも分からない場合は、とりあえず後ろからも考えてみましょう。';
		}else{
			var fb_text='残念ながらそのことを言うことはできません。<br>「仮定の整理」や「図形の性質から言えること」が他にないかも確認してみましょう。'
		}
		write_log("ans","f",'','','f','');
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
	}
}

//合同を言うのにどの条件が必要かを選んだ後の動作
function ques4_fb2(){
	var k=k1+k2+fp;
	if(k==3){
		var fb_text='その通りです！正しいものを選択できています。構造図の線が実際につながったと思います。<br>\
					ではこの合同であることを言うのに使った「合同条件」はどれでしょう？<br><br>\
					<form name="ques4_fb2_select">\
						<select name="thing">\
							<option value="1">三組の辺がそれぞれ等しい</option>\
							<option value="2">二組の辺とその間の角がそれぞれ等しい</option>\
							<option value="3">一組の辺とその両端の角がそれぞれ等しい</option>\
						</select>\
						<input type="button" value="決定" onclick="ques4_fb3()">\
					</form><br>'
		document.getElementById("diag").innerHTML=fb_text;
		beforeXY("div_katei1");
		makeButton("congCond1",100,240,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_katei2");
		makeButton("congCond2",100,240,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_frompic2");
		makeButton("congCond3",100,240,"green",'____________がそれぞれ等しい',"");
	}else if(k<=2){
		diag_history=document.getElementById("diag").innerHTML;
		var fb_text='まだ現時点では，'+k+'つしか合同を言うための条件が指定されていません。<br>どの合同条件も３つの条件を必要としたはずです。<br>条件と照らし合わせながらもう一度考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		document.getElementById("diag").innerHTML=fb_text;
	}
}

//合同条件を選んだ後の動作
function ques4_fb3(){
	if(document.ques4_fb2_select.elements[0].value==3){
		if(congboolean==true){
			document.getElementById("diag").innerHTML='正解です！<br>しっかりと図を見て合同条件を選べています。<br>構造図に合同条件が表示されました。<br><br>これで「前向き推論」と「後ろ向き推論」が繋がりましたね。<br>なので構造図作成は終了です。終了ボタンを押して担当の人を呼びましょう。<br><p style="text-align:right"><button type="button" value="output" style="" onclick= "output()">終了</button> </p> <a id="download" target="_blank">ダウンロード（IEでは、右クリック＞対象をファイルに保存）</a>'
			mode="normal";
			div_clear("congCond0");
			div_clear("congCond1");
			div_clear("congCond2");
			div_clear("congCond3");
			beforeX=110;
			beforeY=250;
			makeButton("congCond",100,240,"green",'1辺とその両端の角がそれぞれ等しい',"");
			mode="finish";
		}else if(congboolean==false){
			document.getElementById("diag").innerHTML='正解です！<br>しっかりと図を見て合同条件を選べています。<br>構造図に合同条件が表示されました。'
			mode="normal";
			div_clear("congCond0");
			div_clear("congCond1");
			div_clear("congCond2");
			div_clear("congCond3");
			beforeX=110;
			beforeY=250;
			makeButton("congCond",100,240,"green",'1辺とその両端の角がそれぞれ等しい',"");
			congboolean=true;
		}
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='残念ながら違います。問題図、その下の合同な図形を取り出す欄も使いながら考え直してみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}
}


//////////question5【後】「合同が言えるのかどうか？言えないなら何が足りないか？」//////////////////ここからまだ未実装！！！！！！！！！！
function ques5(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("cong"));
		if(ques1_count==2){
			question_number =3;
			var txt='これらの三角形の合同はすでに言えるのでしょうか？<br>\
					使えるのは前向き推論で「正しいこと」と言えていることです。<br>\
					右の合同な三角形を取り出す機能も使いながら考えてみましょう。<br><br>\
						<form name="ques5_select">\
								<select name="thing">\
									<option value="1">言えるので「言える根拠」を選ぶ</option>\
									<option value="2">言えないので前向き推論を進める</option>\
									<option value="3">分からない</option>\
								</select>\
								<input type="button" value="決定" onclick="ques5_2()">\
							</form><br>'
			if(document.getElementById){
				document.getElementById("diag").innerHTML=txt;
			}
		}else{
			var fb_text="まだ仮定を全て書き出せていません。まずは結論と仮定を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
		}
		write_log("psbtn","b","ques5()",'','','');
	}else if(mode=="backcong"){

	}
}

function ques5_2(){
	var answer=document.ques5_select.elements[0].value
	if(answer==1){//言えるって答えた
		if(forcong==3){
			//現に言えているのでモードを変更して選択
			mode="backcong";
			var fb_text='合同を言うための条件となるボタンを押しましょう。押すと下に表示されます。全て押し終わったらOKのボタンを押しましょう。<p class="button_dec" ><input type="button" value="OK" onclick="ques5_fb()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			k1=0;k2=0;fp=0;
			write_log("ans","b","合同言える",'','t','');
		}else{
			//言えると回答したが現段階ではまだ言えていないので、前向き推論を促す
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='この三角形の合同が言えると回答しましたが、本当にそうでしょうか。<br>残念ながら現時点では条件が足りません。「前向き推論を進めてみる」か「あと何が必要か考える」ことをしてみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
			write_log("ans","b","合同言える",'','f','');
		}
	}else if(answer==2){
		if(forcong==3){
			//もう言えるのに「言えない」と回答した時
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='本当にまだこの三角形の合同は言えないでしょうか。<br>左の「合同になりそうな三角形を取り出す」機能も使いながら合同が言えているかを考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
			write_log("ans","b","合同言えない",'','f','');
		}else{
			//言えないと回答して言えない時
			document.getElementById("diag").innerHTML='そうですね。現時点では条件が足りないのでこの三角形の合同は言うことができません。よく現状が把握できています。<br>前向き推論を進めましょう。'
			write_log("ans","b","合同言えない",'','t','');
		}
	}else if(answer==3){
		if(forcong==3){
			//だが既に全部わかっている
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='実はもう合同を言うための条件は揃っています。<br>左の「合同になりそうな三角形を取り出す」機能も使いながら合同が言えているかを考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		}else if(ques1_count==1 && frompic==1){
			//過程が一つ足りない
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='現時点では条件が一つ足りません。前向き推論で言えるところがないか考えてみましょう。<br>仮定が全て書き出せているかもう一度確認してみましょう。<br>左の「合同になりそうな三角形を取り出す」機能も使いながら合同が言えているかを考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'			
		}else if(ques1_count==2){
			//frompicがない
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='現時点では条件が一つ足りません。前向き推論で言えるところがないか考えてみましょう。<br>仮定だけでなく、「図形の性質から言えること」についても考えてみましょう。<br>左の「合同になりそうな三角形を取り出す」機能も使いながら合同が言えているかを考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'			
		}else{
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='現時点では条件が足りません。前向き推論で言えるところがないか考えてみましょう。<br>「仮定」「図形の性質から言えること」で言えていないことがあります。<br>左の「合同になりそうな三角形を取り出す」機能も使いながら合同が言えているかを考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'			
		}
	write_log("ans","b","合同言えるかわからない",'','','');
	}
}

function ques5_fb(){
	if(k1==1&&k2==1&fp==1){
		var fb_text='その通りです！正しいものを選択できています。構造図の線が実際につながったと思います。<br>\
					ではこの合同に使った「合同条件」はどれでしょう？<br><br>\
					<form name="ques4_fb2_select">\
						<select name="thing">\
							<option value="1">三組の辺がそれぞれ等しい</option>\
							<option value="2">二組の辺とその間の角がそれぞれ等しい</option>\
							<option value="3">一組の辺とその両端の角がそれぞれ等しい</option>\
						</select>\
						<input type="button" value="決定" onclick="ques5_fb3()">\
					</form><br>'
		document.getElementById("diag").innerHTML=fb_text;
		beforeXY("div_katei1");
		makeButton("congCond1",100,240,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_katei2");
		makeButton("congCond2",100,240,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_frompic2");
		makeButton("congCond3",100,240,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_congCond1");
		makeButton("ketu2",160,330,"blue","△ACE≡△DBE","");
		div_clear("ketu2");
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='まだ合同を言えるだけの条件を選択しきれていません。合同を言うための条件は3つは必要だったはずです。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}
}

function ques5_fb3(){
	if(document.ques4_fb2_select.elements[0].value==3){
		document.getElementById("diag").innerHTML='正解です！<br>しっかりと図を見て合同条件を選べています。<br>構造図に合同条件が表示されました。<br><br>これで「前向き推論」と「後ろ向き推論」が繋がりましたね。<br>なので構造図作成は終了です。終了ボタンを押して担当の人を呼びましょう。<br><p style="text-align:right"><button type="button" value="output" style="" onclick= "output()">終了</button> </p> <a id="download" target="_blank">ダウンロード（IEでは、右クリック＞対象をファイルに保存）</a>'
		mode="finish";
		div_clear("congCond0");
		div_clear("congCond1");
		div_clear("congCond2");
		div_clear("congCond3");
		beforeX=110;
		beforeY=250;
		makeButton("congCond",100,240,"green",'1辺とその両端の角がそれぞれ等しい',"");
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='残念ながら違います。問題図、その下の合同な図形を取り出す欄も使いながら考え直してみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}
}

//////////////qustion6【前】「このことから何か言えますか？」////////////

function ques6(){
	if(mode=="normal"){
		question_number = 6;
		beforeXY("div_cong2");
		makeSelect("このことから何か言えるのでしょうか？<br>フォームを選んで入力しましょう。<br>");
		write_log("psbtn","f","ques1()",'','','');
		btnclr_change(document.getElementById("cong2"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode="backcong"){

	}
}

function ques6_fb(){
	if(form_number==1){
		var hen1=document.form1.elements[0].value;
		var hen2=document.form1.elements[1].value;
		if(hen_cor(hen1,hen2,"AE","DE")){
			keturon_text=hen1+"="+hen2;
			document.getElementById("diag").innerHTML='正解です！<br>これで前向き推論と後ろ向き推論がつながりました。なので構造図作成は終了です。終了ボタンを押して担当の人を呼びましょう。<br><p style="text-align:right"><button type="button" value="output" style="" onclick= "output()">終了</button> </p> <a id="download" target="_blank">ダウンロード（IEでは、右クリック＞対象をファイルに保存）</a>';
			makeButton("ketu3",180,400,"blue",keturon_text,"");
			keturonboolean=true;
			write_log("ans","b",rec1,rec2,'t','');
			mode="finish";
		}else{
			var fb_text="残念ながらそのことを言うことはできません。";
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","b",'','','f','');
		}
	}else{
		var fb_text="残念ながらそのことを言うことはできません。";
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
		write_log("ans","b",'','','f','');
	}
}


//////////////合同になりそうな三角形を取り出す/////////////

function seppicback(){
	document.getElementById("button_seppic").innerHTML='<br><form name="seppic">△<input type="text" name="kaku1" size="4" value=""> ≡ △<input type="text" name="kaku1" size="4" value=""> </form><br> <button type="button" class="button_sg" value="katei" onclick= "takeout0()">合同になりそうな三角形を書き出す</button>'
}

function takeout0(){
	var rec1=document.seppic.elements[0].value;
	var rec2=document.seppic.elements[1].value;
	var boolnum=tri_cor(rec1,rec2,"ACE","DBE");
	if(boolnum==0){
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep.jpg" alt="問題図" style="width: 330px;">'
		document.getElementById("button_seppic").innerHTML='<button type="button" class="button_sg" value="katei" onclick= "mark()">現在わかっているところまで印をつける</button><br>'
		write_log("sep","f",'△'+rec1,'△'+rec2,'t','');
	}else if(boolnum==1){
		fb_text='△'+rec1+'と△'+rec2+'の合同について考えたのは適切です。<br>しかし、「対応順」が違っています。<input type="button" value="戻る" onclick="seppicback()">';
		document.getElementById("button_seppic").innerHTML=fb_text;
		write_log("sep","f",'△'+rec1,'△'+rec2,'f','');
	}else{
		var fb_text='残念ながらその三角形は合同ではありません。もう一度図を確認しながら打ち間違いの無いように入力しましょう。<input type="button" value="戻る" onclick="seppicback()">';
		document.getElementById("button_seppic").innerHTML=fb_text;
		write_log("sep","f",'△'+rec1,'△'+rec2,'f','');

		}
}

function mark(){
	if(frompic==1&&(ques1_left=="CE=BE"||ques1_right=="CE=BE")&&(ques1_left=="ACE=DBE"||ques1_right=="ACE=DBE")){
		//全揃い
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep_all.jpg" alt="問題図" style="width: 330px;">'
	}else if((ques1_left=="CE=BE"||ques1_right=="CE=BE")&&(ques1_left=="ACE=DBE"||ques1_right=="ACE=DBE")){
		//Aが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep_CEBECB.jpg" alt="問題図" style="width: 330px;">'
	}else if(frompic==1&&(ques1_left=="ACE=DBE"||ques1_right=="ACE=DBE")){
		//CE=BEが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep_CBE.jpg" alt="問題図" style="width: 330px;">'
	}else if(frompic==1&&(ques1_left=="CE=BE"||ques1_right=="CE=BE")){
		//ACE=DBEが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep_CEBEE.jpg" alt="問題図" style="width: 330px;">'
	}else if(frompic==1){
		//Eしかない
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep_E.jpg" alt="問題図" style="width: 330px;">'
	}else if(ques1_left=="CE=BE"||ques1_right=="CE=BE"){
		//CE=BEしかない
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep_CEBE.jpg" alt="問題図" style="width: 330px;">'
	}else if(ques1_left=="ACE=DBE"||ques1_right=="ACE=DBE"){
		//ACE=DBEしかない
		document.getElementById("div_seppic").innerHTML='<img src="q4_image/pic_q4_sep_CB.jpg" alt="問題図" style="width: 330px;">'
	}else{

	}
	write_log("mark","f",'','','','');
}
