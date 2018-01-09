window.onbeforeunload = function(e) {
    var t='戻るボタンや更新ボタンは押さないでください。「ページに留まる(S)」を押して問題を解くことを続けましょう。';
    return t;
}
var beforeX =212.5; //ボタンを押した時点でここにX座標を入れて次のボタンとの結線に使う
var beforeY =500; //ボタンを押した時点でここにY座標を入れて次のボタンとの結線に使う

var mode="normal"
var diag_history;
var congboolean=false;
var kateiboolean=false;
var keturonboolean=false;
var frompicboolean=false;
var alllog="";
var account=""
var lognumber=1;
var element;
var start_time;
var elapsed_time;
var now_time;

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
		<div id="hint" style="width: 390px; height: 150px; overflow-y: scroll; ">\
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
					<a href="hint/seisankaku.html" target="_blank" onclick="hint_seisankaku()"">正三角形について</a><br><br>\
				</div>\
			</div>'
		account=document.student_ID.elements[1].value;
		alllog="question2,0,start,,,生徒ID:"+account+",,/"
		document.getElementById("title").innerHTML='三角形合同証明問題 問題6'
		}
	}else{
		document.getElementById("title").innerHTML='三角形合同証明問題 問題6　　<button type="button" class="button_sg" value="start" onclick= "start()">始める</button>　<input type="text" name="student_ID" size="30" placeholder="生徒IDが間違っています。">'
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
function hint_seisankaku(){
	write_log("hint",'','正三角形','','','');
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
	var k = document.getElementById(div_name);
	k.style=style_text;
}

function div_clear(name){
	var div_name="div_"+name;
	document.getElementById(div_name).innerHTML="";
}

//要素を並べる(問題ごとに作成)
function finish(){
	var canvas = document.getElementById("st_d_canvas").getContext("2d");
	canvas.clearRect(0,0,425,510);
	div_clear("katei");
	div_clear("frompic");
	div_clear("keturon");
	beforeX=210;
	beforeY=20;
	makeButton("_katei",200,10,"green","仮定","");
	div_move("katei1","10","10");
	div_move("katei2","10","60");
	div_move("frompic2","10","110")
	div_move("△ABC≡△ADC","10","160");
	div_move("△ABC≡△ADC2","10","160");
	div_move("frompic1","200","60");
	div_move("congCond","200","110");
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
	div1.setAttribute("id",id_text);
	div1.setAttribute("style",style_text);
	console.log(style_text);
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
	}else if(question_number==6 && congboolean==false){
		ques6_fb();
	}else if(question_number==6 && congboolean==true){
		ques6_3_fb();
	}else{

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

var forcong=0;

////////////////////////////図の性質から言えることは何か?////////////////////////////////

var frompic=0;//正解になるまでは0,正解したら1に変わる
var frompicText="";//後で表示するためにとっておく

function fromPic(){
	if(mode=="normal"){
		question_number=0;
		beforeXY("div_frompic");
		makeSelect("図形の性質から言えることはなんでしょうか？<br>選んだ後、その理由を聞きます。<br>")
		btnclr_change(document.getElementById("frompic"));
	}else if(mode=="cong"){

	}else if(mode=="use_prosp"){

	}
}

function fromPic_fb(){
	if(form_number==2){
		if(kaku_cor(document.form2.elements[0].value,document.form2.elements[1].value,"AMQ","PMB")){
			if(frompic==0){
				var fb_text='その通りです<br>∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value+'になります。<br>ではなぜでしょう？<br><br>\
					<form name="fromPic_select">\
						<select name="thing">\
							<option value="1">仮定だから</option>\
							<option value="2">二等辺三角形だから</option>\
							<option value="3">AQ//BPだから</option>\
							<option value="4">対頂角だから</option>\
							<option value="5">合同だから</option>\
							<option value="6">平行線の錯角だから</option>\
						</select>\
						<input type="button" value="決定" onclick="fromPic_fb2()">\
					</form><br>'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
			}else{
				alert('∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value+'は入力済みです。')
			}
		}else if(kaku_cor(document.form2.elements[0].value,document.form2.elements[1].value,"MPB","MQA")||kaku_cor(document.form2.elements[0].value,document.form2.elements[1].value,"MBP","MAQ")){
			var fb_text='残念ながら、∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value+'であることは言えません。<br>AQ//BPというのは「結論」なので証明には使えません。(わからない場合は「結論」を参照)<>なので、「錯角が等しい」ことは図の性質からはわかりません。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}else{
			var fb_text='残念ながら、そのことは図の性質からは言えません。<br>図形の性質から言えることがもうなかったり、わからない場合は後ろからも考えてみましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}
	}else{
		var fb_text='残念ながら、そのことは図の性質からは言えません。<br>図形の性質から言えることがもうなかったり、わからない場合は後ろからも考えてみましょう。'
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
	}
}

function fromPic_fb2(){
	if(document.fromPic_select.elements[0].value==4){
		var fb_text='正解です！ そのことが構造図に表示され、問題図にも角度が等しいことを表す記号が表示されました。もし、他にも図形の性質から言えることがあればもう一度「図形の性質から言えること」のボタンを押してから記入しましょう。'
		var div_fb2 = document.createElement("div");
		div_fb2.id = "fb2";
		document.getElementById("diag").appendChild(div_fb2);
		document.getElementById("fb2").innerHTML= fb_text;
		frompic=1;
		forcong++;
		frompicText='∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value
		makeButton("frompic1",300,70,"green",'対頂角は等しい',)
		beforeXY("div_frompic1")
		makeButton("frompic2",300,130,"yellow",frompicText,"ques7_pic()")
		if(ques1_count==0){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_M.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_count==2){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_all.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="AB"){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_MAB.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="PQ"){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_MPQ.jpg" alt="問題図" style="width: 345px">';
		}else{
		}
	}else{
		var fb_text='残念ながら違います。図の該当する角に緑色の丸をつけました。その角がなんという角だったか思い出してみましょう。'
		var div_fb2 = document.createElement("div");
		div_fb2.id = "fb2";
		document.getElementById("diag").appendChild(div_fb2);
		document.getElementById("fb2").innerHTML= fb_text;
		if(ques1_count==0){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_M.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_count==2){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_all.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="AB"){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_MAB.jpg" alt="問題図" style="width: 345px">';
		}else if(ques1_left=="PQ"){
			document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_MPQ.jpg" alt="問題図" style="width: 345px">';
		}else{
		}
	}
}

//////////question1「仮定はなんですか？」////////////////////
var ques1_count=0;
var ques1_left="";
var ques1_right="";
var katei1Text="";//後で使うためにとっとく
var katei2Text="";//後で使うためにとっとく

function ques1(){
	if(mode=="normal"){
		question_number = 1;
		beforeXY("div_katei");
		makeSelect("この問題における「仮定」はなんでしょう？<br>「仮定」の意味が分からない場合は下のリンクをクリックしよう。<br>");
		btnclr_change(document.getElementById("katei"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}
}

function ques1_fb(){
	if(form_number==13){
		if(document.form13.elements[0].value=="M"&&(document.form13.elements[1].value=="AB"||document.form13.elements[1].value=="BA")){
			var fb_text='正解です！<br>「Mが辺ABの中点である」=「Mは辺ABを二分割する」ことは「仮定」です。<br>しかし、このままでは図に書き込みにくいので、辺〇〇=辺△△という形で入力してみましょう。<br><br><form name="form1">辺<input type="text" name="he" size="3" value=""> = 辺<input type="text" name="kaku2" size="3" value=""> <input type="button" value="決定" onclick="whichFB()"><br></p></form>'
			form_number=1;
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}else if(document.form13.elements[0].value=="M"||document.form13.elements[1].value=="AB"||document.form13.elements[1].value=="BA"){
			var fb_text='惜しいです。「中点になる点」「その点によって分けられる辺」について問題文と見比べながら見直してみましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}else{
			var fb_text='中点についての記述はありますが、入力した点や辺は両方とも間違ってしまっています。もう一度、問題文と見比べながら考えてみましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}
	}else if(form_number==1){
		var hen1=document.form1.elements[0].value;
		var hen2=document.form1.elements[1].value;
		if(hen_cor(hen1,hen2,"AM","BM")){
			if(ques1_left!=="AB"&&ques1_right!=="AB"){
				var fb_text='正解です！<br>'+hen1+'='+hen2+'であることは「仮定」です。<br>左の構造図に'+hen1+'='+hen2+'が表示され、図にも長さが等しいことを表す記号が追加されました。<br>他にも仮定があれば、もう一度「仮定を整理する」のボタンを押してから記入しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				if(ques1_count==0){
					makeButton("katei1",10,70,"yellow",hen1+'='+hen2,"ques7_1()");
					katei1Text=hen1+'='+hen2;
					forcong++;
					ques1_left="AB"
					//問題図の変更
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_AB.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_MAB.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else if(ques1_count==1){
					makeButton("katei2",100,70,"yellow",hen1+'='+hen2,"ques7_2()");
					katei2Text=hen1+'='+hen2;
					forcong++;
					ques1_right="AB"
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_ABPQ.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_all.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else{
				}
				ques1_count++;
			}else{
				alert(hen1+'='+hen2+'は入力済みです。')
			}
		}else if(hen_cor(hen1,hen2,"PM","QM")){
			if(ques1_left!=="PQ"&&ques1_right!=="PQ"){
				var fb_text='正解です！<br>'+hen1+'='+hen2+'であることは「仮定」です。<br>左の構造図に'+hen1+'='+hen2+'が表示され、図にも長さが等しいことを表す記号が追加されました。<br>他にも仮定があれば、もう一度「仮定を整理する」のボタンを押してから記入しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				if(ques1_count==0){
					makeButton("katei1",10,70,"yellow",hen1+'='+hen2,"ques7_1()");
					katei1Text=hen1+'='+hen2;
					forcong++;
					ques1_left="PQ";
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_PQ.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_MPQ.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else if(ques1_count==1){
					makeButton("katei2",100,70,"yellow",hen1+'='+hen2,"ques7_2()");
					katei2Text=hen1+'='+hen2;
					forcong++;
					ques1_right="PQ";
					if(frompic==0){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_ABPQ.jpg" alt="問題図" style="width: 345px;">'}
					else if(frompic==1){document.getElementById("pic").innerHTML='<img src="q6_image/pic_q6_all.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else{
				}
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
		}
	}else{
		var fb_text='残念ながら違います。問題文と見比べてもう一度見てみましょう。「仮定」がわからないときは下のリンクをクリックして復習しましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
	}
}

//////////question2「結論はなんですか？」////////////////////
function ques2(){
	if(mode=="normal"){
		question_number = 2;
		beforeXY("div_keturon");
		makeSelect("この問題における「結論」はなんでしょう？<br>「結論」の意味が分からない場合は下のリンクをクリックしよう。<br>");
		btnclr_change(document.getElementById("keturon"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}
}

function ques2_fb(){
	if(form_number==7){
		if(hen_cor(document.form7.elements[0].value,document.form7.elements[1].value,"AQ","BP")){
			document.getElementById("diag").innerHTML="正解です！<br>「AQ//BP」を言うことが結論です．<br>左の構造図に AQ//BP が表示されました。";
			makeButton("AQ//BP",160,410,"blue","　　AQ//BP　　","ques4()");
			keturonboolean=true;
		}else{
			var fb_text="確かに結論は二線が平行であることですが、"+document.form7.elements[0].value+"//"+document.form7.elements[1].value+"ではありません。もしかすると、打ち間違いかもしれません。問題文と見比べてみましょう。";
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}
	}else{
			var fb_text="残念ながらそれは結論ではありません。「結論」が何か分からない場合には下記リンクをクリックして復習をしましょう。";
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
	}
}

//////////question3「仮定の他に図の特性から言えることはありますか？」//////////////////

//---->間違えてfromPic()として実装してしまったので無し

///////////question4「AQ//BP を言うためにはどんな事が使えそうですか？」///////////////////

function ques4(){
	if(mode=="normal"){
		if(ques1_count==2){
		beforeXY("div_AQ//BP");
			if(document.getElementById){
				document.getElementById("diag").innerHTML='AQ//BP を言うためにはどんな事が使えそうですか？<br>(正しいものを全て選ぼう)<br><form name="res4"><p><input type="checkbox" value="0" checked="checked">錯角が等しい<input type="checkbox" value="1">平行な辺の長さが等しい <br><input type="checkbox" value="2">対頂角が等しい<input type="checkbox" value="3">三角形の一辺である <br><input type="checkbox" value="4">同位角が等しい<input type="checkbox" value="5">見た感じ平行 <br><input type="checkbox" value="6">底角が等しい</p><p class="button_dec" ><input type="button" value="OK" onclick="ques4_fb()"></p></form>'
			}else{}
		}else{
			var fb_text="まだ仮定を全て書き出せていません。まずは結論と仮定を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
		}
		btnclr_change(document.getElementById("AQ//BP"));
	}else if(mode=="cong"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='これは結論です。<br>「後ろ向き推論」によって書いた構造図(青)を「前向き推論」の中で使うことはできません。<br>「正しいこと」で作られている「前向き推論」に、「まだ正しいかは分からないこと」で作られている「後ろ向き推論」を混ぜてはいけません。<br>前向き推論,後ろ向き推論がよく分からない人は下記リンクをクリックして復習しましょう。<br> <p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}else if(mode=="use_prosp"){
		//間違いFBを記述
	}else if(mode="backcong"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='これは結論です。<br>「合同がすでに言えている」を選んで、その条件を選んでいるはずです。「すでに言えている」ということは前向き推論によって言えたことを選ぶことになるはずです。<br> <p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}
}

function ques4_fb(){
	console.log(document.res4.elements[0].checked)
	if (document.getElementById){
		if(document.res4.elements[0].checked&&document.res4.elements[4].checked){
			if(document.res4.elements[1].checked ||document.res4.elements[2].checked ||document.res4.elements[3].checked ||document.res4.elements[5].checked ||document.res4.elements[6].checked){
				document.getElementById("diag").innerHTML='正解も含んでいるのでが、平行であると言えないものも含んでしまっています。もう一度考えてみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>';
			}else{
				document.getElementById("diag").innerHTML="正解です！<br>平行を言うためには同位角が等しい・錯角が等しい が使えましたよね！<br>左の構造図に平行であること(AQ//BP)を言うための条件が表示されました。"
				//「同位角が等しい」と「錯角が等しい」のボタンを作成
				makeButton("douikaku",100,360,"green","同位角が等しい","ques5_douikaku()");
				makeButton("sakaku",220,360,"green","錯角が等しい","ques5_sakaku()")
			}
		}else if(document.res4.elements[0].checked){
			document.getElementById("diag").innerHTML='「錯角が等しい」は正解で、平行であることを言う事ができます。<br>ですが、他にも平行を言うための条件があります。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>'
		}else if(document.res4.elements[4].checked){
			document.getElementById("diag").innerHTML='「同位角が等しい」は正解で、平行であることを言う事ができます。<br>ですが、他にも平行を言うための条件があります。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>'
		}else{
			document.getElementById("diag").innerHTML='残念ながら違います。下のリンクをクリックして「平行」について見てみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>'
		}
	}
}



////////question5「錯角・同位角は今回の問題ではどの部分ですか？」//////////////

function ques5_sakaku(){
	if(mode=="normal"){
		beforeXY("div_sakaku");
		document.getElementById("diag").innerHTML='ではこの「錯角」は今回の問題ではどの部分にあたるでしょうか？<br>(半角大文字アルファベットで入力してください)<br><form name="res5"><p><select><option value="錯角">錯角</option></select>∠<input type="text" name="kaku1" size="10" value="">=∠<input type="text" name="kaku2" size="10" value=""><br></p></form><p style="position: absolute;right: 130px;bottom: 5px"><input type="button" value="決定" onclick="ques5_conti()"></p><p class="button_dec" ><input type="button" value="もうないので次に進む" onclick="ques5_fini()"></p>'
		btnclr_change(document.getElementById("sakaku"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode=="backcong"){

	}
}

function ques5_douikaku(){
	if(mode=="normal"){
		document.getElementById("diag").innerHTML='ではこの「同位角」は今回の問題ではどの部分にあたるでしょうか？<br>(半角大文字アルファベットで入力してください)<br><form name="res5"><p><select><option value="同位角">同位角</option></select>∠<input type="text" name="kaku1" size="10" value="">=∠<input type="text" name="kaku2" size="10" value=""><br></p></form><p style="position: absolute;right: 130px;bottom: 5px"><input type="button" value="決定" onclick="ques5_conti()"></p><p class="button_dec" ><input type="button" value="もうないので次に進む" onclick="ques5_fini()"></p>'
		btnclr_change(document.getElementById("douikaku"));
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mdoe=="backcong"){

	}
}

function ques5(){
	document.getElementById("diag").innerHTML='ではこの「同位角」「錯角」は今回の問題ではどの部分にあたるでしょうか？<br>(半角大文字アルファベットで入力してください)<br><form name="res5"><p><select><option value="同位角">同位角</option><option value="錯角">錯角</option></select>∠<input type="text" name="kaku1" size="10" value="">=∠<input type="text" name="kaku2" size="10" value=""><br></p></form><p style="position: absolute;right: 130px;bottom: 5px"><input type="button" value="決定" onclick="ques5_conti()"></p><p class="button_dec" ><input type="button" value="もうないので次に進む" onclick="ques5_fini()"></p>'
}

//先に書いた方を左に表示し、それによってそれ以上部の構造図の書き方に変化が出るので先に書いた方をleft_kaku,後に書いた方をright_kakuにBもしくはAを入れる事で今後の分岐を作る
var left_kaku = "" ; //グローバル変数
var right_kaku= "" ; //グローバル変数
var ques5_count = 0; //2になるまでは先に進めない 

function sakaku_cor(ans1,ans2){
	var kaku_pair;
	//A,B,P,Qのどの角なのかを判定する関数
	function kaku_spec(k){
		if(k=="MAQ"||k=="BAQ"||k=="QAM"||k=="QAB"){return "A";}
		else if(k=="MBP"||k=="PBM"||k=="ABP"||k=="PBA"||k=="MBC"||k=="CBM"||k=="ABC"||k=="CBA"){return "B";}
		else if(k=="MPB"||k=="BPM"||k=="BPQ"||k=="QPB"){return "P";}
		else if(k=="MQA"||k=="AQM"||k=="PQA"||k=="AQP"){return "Q";}
		else{return null}
	}

	kaku_pair = [kaku_spec(ans1),kaku_spec(ans2)];
	console.log(kaku_pair);
	console.log(left_kaku);
	if(kaku_pair.toString() == "A,B" ||kaku_pair.toString() == "B,A"){
		if(left_kaku!="A"&&right_kaku!="A"){
			if(ques5_count==0){left_kaku="A";}
			else if(ques5_count==1){right_kaku="A";}
			else{}
			return true;
		}else{
			alert("∠"+ans1+"=∠"+ans2+"についてはすでに入力済みです。")
			return false;
		}
	}else if(kaku_pair.toString() == "P,Q" ||kaku_pair.toString() == "Q,P"){
		if(left_kaku!="P"&&right_kaku!="P"){
			if(ques5_count==0){left_kaku="P";}
			else if(ques5_count==1){right_kaku="P";}
			else{}
			return true;	
		}else{
			alert("∠"+ans1+"=∠"+ans2+"についてはすでに入力済みです。")
			return false;
		}
	}else{
		return false;
	}
}


function uncorrect_ques5(){
	if(document.res5.elements[0].value =="錯角"){
		document.getElementById("diag").innerHTML='残念ながらその角は錯角ではありません。下のリンクをクリックして「錯角」について見てみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques5_sakaku()"></p>'
	}else{
		document.getElementById("diag").innerHTML='残念ながらその角は同位角ではありません。下のリンクをクリックして「同位角」について見てみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques5_douikaku()"></p>'
	}
}

function ques5_conti(){
	
	//同位角を選択している時,正解ならばもう一つif文を突破する
	if(document.res5.elements[0].value =="錯角"){
		if(sakaku_cor(document.res5.elements[1].value,document.res5.elements[2].value)){
			var txt1 = "∠"+document.res5.elements[1].value+"=∠"+document.res5.elements[2].value;
			if(ques5_count==0){
				makeButton("kaku_1",210,310,"blue",txt1,"ques6_before1()");
			}else if(ques5_count==1){
				makeButton("kaku_2",315,310,"blue",txt1,"ques6_before2()");
			}else{
			}
			var fb_text='正解です！構造図に錯角が表示されました。<br>他にもあ錯角が場合はもう一度「錯角」のボタンを押して答えましょう。<br>ない場合は「もうないので次に進む」のボタンを押しましょう。<br>'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			ques5_count++;
		}else{
			uncorrect_ques5()
		}
	}else{
		uncorrect_ques5()
	}
}

function ques5_fini(){
	if(ques5_count==2){
		document.getElementById("diag").innerHTML='そうですね！あなたが答えた通り、今回の問題ではその二つが「錯角」にあたります。あなたの回答が左の構造図に表示されたと思います。<br>次に考えていく要素をクリックして構造図の作成を続けましょう。'
	}else if(ques5_count==1){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='実は他にも同位角か錯角があります。<br>考えるときは、今後必要になるかもしれないので考えられるものは全てあげるようにしましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='まだ、解答が済んでいません。<br>「錯角」「同位角」についてわからない場合は下のリンクをクリックして復習してから解いてみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}
}
//////////question6「これらの角(錯角の奴ら)が等しいということを言うためにはどんなことを利用しますか？」(後ろ向き推論)///////////////
function ques6_before1(){
	beforeXY("div_kaku_1");
	ques6();
	btnclr_change(document.getElementById("kaku_1"));
}

function ques6_before2(){
	beforeXY("div_kaku_2");
	ques6();
	btnclr_change(document.getElementById("kaku_2"));
}	


function ques6(){
	question_number = 6;
	if(mode=="normal"){
		if(ques5_count<=1){
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='実は他にも同位角か錯角があります。<br>考えるときは、今後必要になるかもしれないので考えられるものは全てあげるようにしましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="diag_history()"></p>'
		}else{
			if(congboolean==false){
				makeSelect('これらの角が等しいということを言うために何を利用できそうですか？<br>問題図、合同な図形を取り出した欄も参考にしながら考えてみましょう。')
			}else{
				document.getElementById("diag").innerHTML='これらの角が等しいということを言うために何を利用できそうですか？<br>前向き推論によって導かれた結果が使える場合は「前向き推論の結果を使える」のボタンを、フォームによって入力する場合は「フォームで入力」を押しましょう。<br><p class="button_dec" ><input type="button" value="前向き推論の結果を使える" onclick="ques6_2()">　<input type="button" value="フォームで入力" onclick="ques6_3()"></p>'
			}
		}
	}else if(mode=="cong"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='「前向き推論」の中で、「後ろ向き推論」によって書いた要素(青)を使うことはできません。<br>「正しいこと」で作られている「前向き推論」に、「まだ正しいかは分からないこと」で作られている「後ろ向き推論」を混ぜてはいけません。<br>前向き推論,後ろ向き推論がよく分からない人は下記リンクをクリックして復習しましょう。<br> <p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}else if(mode=="use_prosp"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='その事柄からこれら角度が等しいことは言えません。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}else if(mode=="backcong"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='「合同がすでに言えている」を選んで、その条件を選んでいるはずです。「すでに言えている」ということは前向き推論によって言えたことを選ぶことになるはずです。色で言うと黄色のボタンになります。<br> <p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}else if(mode=="use_back"){
		document.getElementById("diag").innerHTML='そうですね！合同な図形の対応する角は等しいですね！<br>さてこれで、仮定側からの前向き推論と結論からの後ろ向き推論が繋がりました。<br>時間に余裕があれば証明を記述しましょう。'
		stLine(beforeX+20,beforeY+10,160+20,260+10);
		mode="finish";
	}
}


//前向き推論の結果を使って角度が等しいを言う時→うまくいけば図の完成
function ques6_2(){
	mode='use_prosp';
	var fb_text='<br>これらの角度が等しいことを言うために使う、「前向き推論」で分かっているボタンをクリックしましょう。';
	var div_fb = document.createElement("div");
	div_fb.id = "fb";
	document.getElementById("diag").appendChild(div_fb);
	document.getElementById("fb").innerHTML= fb_text;
	console.log('前向き推論の結果を使って角度が等しいを言う時')
}

function ques6_2_fb(){

}

//前向き推論で言えているのにフォームでの入力を選択した時→うまくいけば図の完成
function ques6_3(){
	makeSelect("")
	console.log('前向き推論で言えているのにフォームでの入力を選択した時')
}

function ques6_3_fb(){
	if(form_number==23){
		var rec1=document.form23.elements[0].value;
		var rec2=document.form23.elements[1].value;
		var boolnum=tri_cor(rec1,rec2,"AMQ","BMP");
		if(boolnum==0){
			var congtext='そうですね！<br>△'+rec1+'≡△'+rec2+'であることからこれらの角が等しいことが言えますね！さてこれで、仮定側からの前向き推論と結論からの後ろ向き推論が繋がりました。<br>次は右上の記述欄に証明を記述しましょう。'
			document.getElementById("diag").innerHTML=congtext;
			stLine(160+40,230+10,beforeX+40,beforeY+10)
		}else if(boolnum==1){
			diag_history=document.getElementById("diag").innerHTML;
			var fb_text='△'+rec1+'と△'+rec2+'の合同からこれらの角が等しいことが言えると考えたのは適切です。<br>しかし、「対応順」が違っています。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}else{
			diag_history=document.getElementById("diag").innerHTML;
			var fb_text='前向き推論で「既に分かっていること」をもう一度確認し、対応順についても注意しながら打ち間違いの無いよう入力しましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		var fb_text='残念ながらそのことからこれらの角度が等しいことは言えません。<br>前向き推論で「既に分かっていること」も、もう一度確認してみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
	}
}

//前向き推論で合同がまだ言えていない時
function ques6_fb(){
	if(form_number==23){
		var rec1=document.form23.elements[0].value;
		var rec2=document.form23.elements[1].value;
		var boolnum=tri_cor(rec1,rec2,"AMQ","BMP");
		if(boolnum==0){
			var congtext='そうですね！<br>もし△'+rec1+'≡△'+rec2+'が言えたらこれらの角度が同じことが言えそうですね！<br>構造図に表示されました。'
			document.getElementById("diag").innerHTML=congtext;
			makeButton("cong",160,260,"blue",'△'+rec1+'≡△'+rec2,"ques8()");
		}else if(boolnum==1){
			diag_history=document.getElementById("diag").innerHTML;
			var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、「対応順」が違っています。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}else{
			diag_history=document.getElementById("diag").innerHTML;
			var fb_text='残念ながら△'+rec1+'≡△'+rec2+'から，これらのことを言うとこは出来ません．<br>「合同であることを使いたい」という方針そのものは正しいです。<br>対応順についても注意しながら打ち間違いの無いよう入力しましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		var fb_text='残念ながらそのことからこれらの角度が等しいことは言えません。<br>どこかで結びつくかもしれませんので、まずは前向き推論を進めてみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
	}
}

/////////question7「これらから何か言えることはありますか？」(前向き推論)/////////////

//それぞれのスイッチになる
var k1=0;
var k2=0;
var fp=0;

function ques7_1(){
	if(mode=="normal"){
		if(keturonboolean==true){
		question_number = 7;
		beforeXY("div_katei1");
		btnclr_change(document.getElementById("katei1"));
		makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
		k1=1;
		k2=0;
		fp=0;
	}else{
		var fb_text="まだ仮定を全て書き出せていません。まずは結論と仮定を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
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
	}else if(mode=="use_prosp"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='このことから直接、これらの角が等しいことは言えません。戻るボタンを押してから角度が等しいことを言える、直接的なボタンを選びましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
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

function ques7_2(){
	if(mode=="normal"){
		if(keturonboolean==true){
		question_number = 7;
		beforeXY("div_katei2");
		btnclr_change(document.getElementById("katei2"));
		makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
		k1=0;
		k2=1;
		fp=0;
		}else{
		var fb_text="まだ仮定を全て書き出せていません。まずは結論と仮定を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
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
	}else if(mode=="use_prosp"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='このことから直接、これらの角が等しいことは言えません。戻るボタンを押してから角度が等しいことを言える、直接的なボタンを選びましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
			
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

function ques7_pic(){
	if(mode=="normal"){
		if(keturonboolean==true){
		question_number = 7;
		beforeXY("div_frompic2");
		btnclr_change(document.getElementById("frompic2"));
		makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
		k1=0;
		k2=0;
		fp=1;
		}else{
		var fb_text="まだ仮定を全て書き出せていません。まずは結論と仮定を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
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
	}else if(mode=="use_prosp"){
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='このことから直接、これらの角が等しいことは言えません。戻るボタンを押してから角度が等しいことを言える、直接的なボタンを選びましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
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

function ques7_fb(){
	if(form_number==23){
		var rec1=document.form23.elements[0].value;
		var rec2=document.form23.elements[1].value;
		var boolnum=tri_cor(rec1,rec2,"AMQ","BMP");
		if(boolnum==0){
			if(forcong==3){
				var firsttxt;
				if(k1==1){firsttxt=katei1Text;}else if(k2==1){firsttxt=katei2Text;}else if(fp==1){firsttxt=frompicText;}else{}
				var congtext='そうですね！<br>△'+rec1+'≡△'+rec2+'が言えると思います。<br>それを言うために、他にどの要素を使う必要がありますか？<br>そのボタンをクリックしましょう。(クリックするとこの下に表示されます)<br>全てクリックし終わったらOKを押して先に進みましょう。<br><br>●　'+firsttxt+'<p class="button_dec" ><input type="button" value="OK" onclick="ques7_fb2()"></p>'
				document.getElementById("diag").innerHTML=congtext;
				forcong=4;
				mode="cong";
				congboolean=true;
				makeButton("congCond0",150,180,"green",'____________がそれぞれ等しい',"");
				beforeXY("div_congCond0");
				makeButton("cong",160,260,"yellow",'△'+rec1+'≡△'+rec2,"ques9()");
			}else{
				var fb_text='△'+rec1+'≡△'+rec2+'を言いたいのはいい方向性だと思います。<br>しかし、現時点では'+forcong+'つしか条件がないので三角形の合同を言うことはできません。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
			}
		}else if(boolnum==1){
			if(forcong==3){
				var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、「対応順」が違っています。確認してみましょう。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
			}else{
				var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、現時点では'+forcong+'つしか条件がないので三角形の合同を言うことはできません。加えて「対応順」が違っています。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。';
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
			}
		}else{
			var fb_text='残念ながら△'+rec1+'≡△'+rec2+'を言うことはできません。<br>「合同であることを使いたい」という方針そのものは正しいです。<br>対応順についても注意しながら打ち間違いの無いよう入力しましょう。';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
		}
	}else{
		if(forcong==3){
			var fb_text='残念ながらそのことを言うことはできません。<br>図も参考にしながら考えてみましょう。<br>それでも分からない場合は、とりあえず後ろからも考えてみましょう。';
		}else{
			var fb_text='残念ながらそのことを言うことはできません。<br>「仮定の整理」や「図形の性質から言えること」が他にないかも確認してみましょう。'
		}
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= fb_text;
	}
}

//合同を言うのにどの条件が必要かを選んだ後の動作
function ques7_fb2(){
	var k=k1+k2+fp;
	if(k==3){
		var fb_text='その通りです！正しいものを選択できています。構造図の線が実際につながったと思います。<br>\
					ではこの合同に使った「合同条件」はどれでしょう？<br><br>\
					<form name="ques7_fb2_select">\
						<select name="thing">\
							<option value="1">三組の辺がそれぞれ等しい</option>\
							<option value="2">二組の辺とその間の角がそれぞれ等しい</option>\
							<option value="3">一組の辺とその両端の角がそれぞれ等しい</option>\
						</select>\
						<input type="button" value="決定" onclick="ques7_fb3()">\
					</form><br>'
		document.getElementById("diag").innerHTML=fb_text;
		beforeXY("div_katei1");
		makeButton("congCond1",150,180,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_katei2")
		makeButton("congCond2",150,180,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_frompic2")
		makeButton("congCond3",150,180,"green",'____________がそれぞれ等しい',"");
	}else if(k<=2){
		diag_history=document.getElementById("diag").innerHTML;
		var fb_text='まだ現時点では，'+toString(k)+'つしか合同を言うための条件が指定されていません。<br>どの合同条件も３つの条件を必要としたはずです。<br>条件と照らし合わせながらもう一度考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		document.getElementById("diag").innerHTML=fb_text;
	}
}

//合同条件を選んだ後の動作
function ques7_fb3(){
	if(document.ques7_fb2_select.elements[0].value==2){
		document.getElementById("diag").innerHTML='正解です！<br>しっかりと図を見て合同条件を選べています。<br>構造図に合同条件が表示されました。'
		mode="normal";
		document.getElementById("div_congCond0").innerHTML='';
		document.getElementById("div_congCond1").innerHTML='';
		document.getElementById("div_congCond2").innerHTML='';
		document.getElementById("div_congCond3").innerHTML='';
		beforeX=80;
		beforeY=180;
		makeButton("congCond",80,180,"green",'二組の辺とその間の角がそれぞれ等しい',"");
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='残念ながら違います。問題図、その下の合同な図形を取り出す欄も使いながら考え直してみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}
}
/////////////////question8 後ろ向き推論で来ている合同な三角形ボタンを押した時の動作　合同が現時点で言えるのかを検討して，言えれば結びつけ，言えなければどこを言いたいか？→言えるのか？を考えさせる
function ques8(){
	if(mode=="normal"){
	document.getElementById("diag").innerHTML='現時点でこの三角形の合同は言えるのでしょうか？現状を踏まえてどのような操作をするか選択しましょう。\
												<form name="ques8_select">\
													<select name="thing">\
														<option value="1">言えるので「言える根拠」を選ぶ</option>\
														<option value="2">言えないので前向き推論を進める</option>\
														<option value="4">分からない</option>\
														<option value="5">諦める</option>\
													</select>\
												<input type="button" value="決定" onclick="ques8_fb()">\
											</form><br>'
	btnclr_change(document.getElementById("cong"));
}
}
function ques8_fb(){
	var ans=document.ques8_select.elements[0].value
	if(ans=="1"){
		if(ques1_count==2 && frompic==1){
			//現に言えているのでモードを変更して選択
			mode="backcong";
			var fb_text='合同を言うための条件となるボタンを押しましょう。押すと下に表示されます。全て押し終わったらOKのボタンを押しましょう。<p class="button_dec" ><input type="button" value="OK" onclick="ques8_fb2()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			k1=0;k2=0;fp=0;
		}else{
			//言えると回答したが現段階ではまだ言えていないので、前向き推論を促す
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='この三角形の合同が言えると回答しましたが、本当にそうでしょうか。<br>残念ながら現時点では条件が足りません。「前向き推論を進めてみる」か「あと何が必要か考える」ことをしてみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		}
	}else if(ans=="2"){
		if(ques1_count==2 && frompic==1){
			//もう言えるのに「言えない」と回答した時
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='本当にまだこの三角形の合同は言えないでしょうか。<br>左の「合同になりそうな三角形を取り出す」機能も使いながら合同が言えているかを考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		}else{
			//言えないと回答して言えない時
			document.getElementById("diag").innerHTML='そうですね。現時点では条件が足りないのでこの三角形の合同は言うことができません。よく現状が把握できています。<br>前向き推論を進めましょう。'
		}
	}/* ここは余裕があったら実装。合同を言うためにはあとはどんな条件が必要になるのか。
	else if(ans=="3"){
		if(ques1_count==2 && frompic==1){
			//だが既に全部わかっている
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='本当にまだこの三角形の合同は言えないでしょうか。<br>左の「合同になりそうな三角形を取り出す」機能も使いながら合同が本当に言えていないかを考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		}else if(ques1_count==1 && frompic==1){
			//仮定が一つ足りない
			makeSelect('そうですね。現時点では条件が足りないのでこの三角形の合同は言うことができません。よく現状が把握できています。<br> どんなことが言えたら')
		}else if(ques1_count==2){
			//frompicがない
		}
		
	}*/
	else if(ans=="4"){
		if(ques1_count==2 && frompic==1){
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
		
	}else if(ans=="5"){
		if(ques1_count==2 && frompic==1){
			//だが既に全部わかっている
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='なぜ諦めるのでしょう...？前向き推論、後ろ向き推論、どちらもしっかりと進められています。左の「合同になりそうな三角形を取り出す」機能も使いながら考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		}else if(ques1_count==1 && frompic==1){
			//過程が一つ足りない
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='諦めるのはまだ早いです。<br>あなたは後ろ向き推論をしっかり進めて来れています。現時点では合同を言うための条件が一つ足りていない状態です。仮定を全て洗い出せているか確認してみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		}else if(ques1_count==2){
			//frompicがない
			diag_history=document.getElementById("diag").innerHTML;
			document.getElementById("diag").innerHTML='諦めるのはまだ早いです。<br>あなたは後ろ向き推論をしっかり進めて来れています。現時点では合同を言うための条件が一つ足りていない状態です。仮定だけでなく「図形の性質から言えること」についても考えてみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		}
	}
}

//言えてる時にOKを押した時の動作
function ques8_fb2(){
	if(k1==1&&k2==1&fp==1){
		var fb_text='その通りです！正しいものを選択できています。構造図の線が実際につながったと思います。<br>\
					ではこの合同に使った「合同条件」はどれでしょう？<br><br>\
					<form name="ques7_fb2_select">\
						<select name="thing">\
							<option value="1">三組の辺がそれぞれ等しい</option>\
							<option value="2">二組の辺とその間の角がそれぞれ等しい</option>\
							<option value="3">一組の辺とその両端の角がそれぞれ等しい</option>\
						</select>\
						<input type="button" value="決定" onclick="ques7_fb3()">\
					</form><br>'
		document.getElementById("diag").innerHTML=fb_text;
		beforeXY("div_katei1");
		makeButton("congCond0",150,180,"green",'____________がそれぞれ等しい',""); //ques7に合わせてエラーを吐かないため
		makeButton("congCond1",150,180,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_katei2")
		makeButton("congCond2",150,180,"green",'____________がそれぞれ等しい',"");
		before("div_frompic2")
		makeButton("congCond3",150,180,"green",'____________がそれぞれ等しい',"");
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='まだ合同を言えるだけの条件を選択しきれていません。合同を言うための条件は3つは必要だったはずです。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
	}
}

////////////////question9　前向き推論で来ている合同な三角形ボタンを押した時の動作　
function ques9(){
	if(mode=="normal"){
		if(ques5_count==2){
			document.getElementById("diag").innerHTML='この三角形の合同を利用して何か言えることはありますか？<br>後ろ向き推論と繋がる場合には「後ろ向き推論と結びつける」のボタンを押しましょう。<br><p class="button_dec" ><input type="button" value="後ろ向き推論と結びつける" onclick="ques9_fb()"></p>'
		}else{
			document.getElementById("diag").innerHTML='合同な三角形の対応する辺や角は等しいことが分かります。<br>現時点ではこれを使うのか、また使うとすればどこに使うのかが分からないので後ろ向き推論を進めましょう。'
		}
		btnclr_change(document.getElementById("cong"));
	}else if(mode=="use_prosp"){
		document.getElementById("diag").innerHTML='そうですね！合同な図形の対応する角は等しいですね！<br>さてこれで、仮定側からの前向き推論と結論からの後ろ向き推論が繋がりました。<br>時間に余裕があれば証明を記述しましょう。'
		stLine(beforeX+40,beforeY+10,160+40,230+10);
		mode="finish";
	}else if(mode=="backcong"){

	}
}

//後ろ向きと結びつける時
function ques9_fb(){
	mode="use_back";
	var fb_text='結びつける要素のボタンをクリックしましょう。';
	var div_fb = document.createElement("div");
	div_fb.id = "fb";
	document.getElementById("diag").appendChild(div_fb);
	document.getElementById("fb").innerHTML= fb_text;
}

//////////////合同になりそうな三角形を取り出す/////////////

function seppicback(){
	document.getElementById("button_seppic").innerHTML='<br><form name="seppic">△<input type="text" name="kaku1" size="4" value=""> ≡ △<input type="text" name="kaku1" size="4" value=""> </form><br> <button type="button" class="button_yellow" value="katei" onclick= "takeout0()">合同になりそうな三角形を書き出す</button>'
}

function takeout0(){
	var rec1=document.seppic.elements[0].value;
	var rec2=document.seppic.elements[1].value;
	var boolnum=tri_cor(rec1,rec2,"AMQ","BMP");
	if(boolnum==0){
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep.jpg" alt="問題図" style="width: 330px;">'
		document.getElementById("button_seppic").innerHTML='<button type="button" class="button_yellow" value="katei" onclick= "mark()">現在わかっているところまで印をつける</button><br>'
	}else if(boolnum==1){
		fb_text='△'+rec1+'と△'+rec2+'の合同について考えたのは適切です。<br>しかし、「対応順」が違っています。<input type="button" value="戻る" onclick="seppicback()">';
		document.getElementById("button_seppic").innerHTML=fb_text;
	}else{
		var fb_text='残念ながらその三角形は合同ではありません。もう一度図を確認しながら打ち間違いの無いように入力しましょう。<input type="button" value="戻る" onclick="seppicback()">';
		document.getElementById("button_seppic").innerHTML=fb_text;
		}
}

function mark(){
	if(frompic==1&&(ques1_left=="AB"||ques1_right=="AB")&&(ques1_left=="PQ"||ques1_right=="PQ")){
		//全揃い
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep_all.jpg" alt="問題図" style="width: 330px;">'
	}else if((ques1_left=="AB"||ques1_right=="AB")&&(ques1_left=="PQ"||ques1_right=="PQ")){
		//Mが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep_ABPQ.jpg" alt="問題図" style="width: 330px;">'
	}else if(frompic==1&&(ques1_left=="PQ"||ques1_right=="PQ")){
		//ABが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep_MPQ.jpg" alt="問題図" style="width: 330px;">'
	}else if(frompic==1&&(ques1_left=="AB"||ques1_right=="AB")){
		//PQが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep_MAB.jpg" alt="問題図" style="width: 330px;">'
	}else if(frompic==1){
		//Mしかない
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep_M.jpg" alt="問題図" style="width: 330px;">'
	}else if(ques1_left=="AB"||ques1_right=="AB"){
		//ABしかない
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep_AB.jpg" alt="問題図" style="width: 330px;">'
	}else if(ques1_left=="PQ"||ques1_right=="PQ"){
		//PQしかない
		document.getElementById("div_seppic").innerHTML='<img src="q6_image/pic_q6_sep_PQ.jpg" alt="問題図" style="width: 330px;">'
	}else{

	}
}
