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
var alllog="";
var lognumber=1;
var account="";
var element;
var start_time;
var elapsed_time;
var now_time;

function start(){
	// 現在のローカル時間が格納された、Date オブジェクトを作成する
	console.log(document.student_ID.elements[1].value);
	if(document.student_ID.elements[1].value=="174"||document.student_ID.elements[1].value=="189"||document.student_ID.elements[1].value=="231"||document.student_ID.elements[1].value=="263"||document.student_ID.elements[1].value=="332"||document.student_ID.elements[1].value=="359"||document.student_ID.elements[1].value=="409"||document.student_ID.elements[1].value=="548"||document.student_ID.elements[1].value=="692"||document.student_ID.elements[1].value=="719"||document.student_ID.elements[1].value=="865"||document.student_ID.elements[1].value=="901"||document.student_ID.elements[1].value=="952"){
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
		alllog="question3,0,start,,,生徒ID:"+account+",,/"
		document.getElementById("title").innerHTML='三角形合同証明問題 問題3'
		}
	}else{
		document.getElementById("title").innerHTML='三角形合同証明問題 問題3　　<button type="button" class="button_sg" value="start" onclick= "start()">始める</button>　<input type="text" name="student_ID" size="30" placeholder="生徒IDが間違っています。">'
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
	if(document.getElementById(div_name)){
		var k = document.getElementById(div_name);
		k.setAttribute("style",style_text);
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
	div_clear("keturon");
	div_clear("frompic")
	div_clear("ketu2")
	div_clear("ketu3")
	beforeX=180;
	beforeY=20;
	div_move("katei1","10","10");
	div_move("katei2","10","60");
	div_move("katei3","10","110")
	div_move("ketu","10","160");
	div_move("katei6","10","210");
	div_move("katei7","10","260");
	div_move("katei8","10","310");
	makeButton("_katei",160,10,"green","仮定","");
	div_move("katei4","160","60");
	div_move("katei5","160","110");
	div_move("congCond","160","160");

	if (lastid.length) {
		document.getElementById(lastid).style.backgroundColor = lastbgcolor;
		document.getElementById(lastid).style.borderColor = lastbdcolor;
	}

	document.getElementById("hint").innerHTML=alllog;
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
	}else if(question_number==4){
		ques4_fb();
	}else if(question_number==5){
		ques5_fb();
	}else if(question_number==55){
		ques5_fb_uncor();
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
		btnclr_change(document.getElementById("frompic"));
		question_number=0;
		beforeXY("div_frompic");
		makeSelect("図形の性質から言えることはなんでしょうか？<br>選んだ後、根拠となることがら(理由)を聞きます。<br>")
		write_log("psbtn","f","図形の性質から言えることは？",'','','');
	}else if(mode=="cong"){

	}else if(mode=="use_prosp"){

	}else if(mode=="backcong"){

	}
}
//共通な角限定の関数
function fromPic_fb(){
	function fromPic_tf(ans1,ans2){
		return kaku_cor(ans1,ans2,"ADE","DBF")||kaku_cor(ans1,ans2,"ADE","ABF")||kaku_cor(ans1,ans2,"ADE","DBC")||kaku_cor(ans1,ans2,"ADE","ABC")||kaku_cor(ans1,ans2,"AED","ECF")||kaku_cor(ans1,ans2,"AED","ACF")||kaku_cor(ans1,ans2,"AED","ECB")||kaku_cor(ans1,ans2,"AED","ACB")||kaku_cor(ans1,ans2,"EDF","BFD");
	}

	if(form_number==2){
		if(fromPic_tf(document.form2.elements[0].value,document.form2.elements[1].value)&&ques1_heiko==true){
				var fb_text='確かに、<br>∠'+document.form2.elements[0].value+'=∠'+document.form2.elements[1].value+'を言うことができます。しかし、それはいつでも言えるわけではなくDE//BCが成り立っているので言えることでしたね。(平行線の同位角や錯角)<br>なので、平行のボタンを押したり、その先の「平行線の同位角」「平行線の錯角」のボタンを押してその角を入力しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f",document.form2.elements[0].value,document.form2.elements[1].value,'f','確かに言えるがそれは平行から言えること');
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


//////////question1【前】「仮定はなんですか？」////////////////////
var ques1_count=0;
var ques1_left="";//AD=DBorDE=BFを入れる
var ques1_right="";//AD=DBorDE=BFを入れる
var ques1_heiko=false;//平行の仮定が出てくるまでfalse,終わったらtrue
var katei1Text="";//後で使うためにとっとく
var katei2Text="";//後で使うためにとっとく
var katei3Text="";//後で使うためにとっとく
var katei6Text="";//後で使うためにとっとく
var katei7Text="";//後で使うためにとっとく
var katei8Text="";//後で使うためにとっとく


function ques1(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei"));
		question_number = 1;
		beforeXY("div_katei");
		makeSelect("この問題における「仮定」はなんでしょう？<br>「仮定」の意味が分からない場合は下のリンクをクリックしよう。<br>");
		write_log("psbtn","f","仮定は？",'','','');
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode="backcong"){

	}
}

function ques1_fb(){
	if(form_number==13){
		if(document.form13.elements[0].value=="D"&&(document.form13.elements[1].value=="AB"||document.form13.elements[1].value=="BA")){
			var fb_text='正解です！<br>「Dが辺ABの中点である」ことは「仮定」です。<br>しかし、このままでは図に書き込みにくいので、辺〇〇=辺△△という形で入力してみましょう。<br><br><form name="form1">辺<input type="text" name="he" size="3" value=""> = 辺<input type="text" name="kaku2" size="3" value=""> <input type="button" value="決定" onclick="whichFB()"><br></p></form>'
			form_number=1;
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","f","DはABの中点","","t","");
		}else if(document.form13.elements[0].value=="D"||document.form13.elements[1].value=="AB"||document.form13.elements[1].value=="BA"){
			var fb_text='惜しいです。「中点になる点」「その点によって分けられる辺」について問題文と見比べながら見直してみましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","f","中点","どちらか違う","f","");
		}else{
			var fb_text='中点についての記述はありますが、入力した点や辺は両方とも間違ってしまっています。もう一度、問題文と見比べながら考えてみましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","f","中点","どちらも違う","f","");
		}
	}else if(form_number==1){
		var hen1=document.form1.elements[0].value;
		var hen2=document.form1.elements[1].value;
		if(hen_cor(hen1,hen2,"AD","DB")){
			if(ques1_left!=="AD=DB"&&ques1_right!=="AD=DB"){
				var fb_text='正解です！<br>'+hen1+'='+hen2+'であることは「仮定」です。<br>左の構造図に'+hen1+'='+hen2+'が表示され、図にも長さが等しいことを表す記号が追加されました。<br>他にも仮定があれば、もう一度「仮定を整理する」のボタンを押してから記入しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				if(ques1_left==""){
					makeButton("katei1",10,90,"yellow",hen1+'='+hen2,"ques5_1()");
					katei1Text=hen1+'='+hen2;
					forcong++;
					ques1_left="AD=DB"
					//問題図の変更
					if(katei3Text==""){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_ABD.jpg" alt="問題図" style="width: 345px;">'}
					else if(katei3Text){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_ABDheiko.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else if(ques1_left){
					makeButton("katei2",100,90,"yellow",hen1+'='+hen2,"ques5_2()");
					katei2Text=hen1+'='+hen2;
					forcong++;
					ques1_right="AD=DB"
					if(katei3Text==""){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_ABDDEBF.jpg" alt="問題図" style="width: 345px;">'}
					else if(katei3Text){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_all.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else{
				}
				write_log("ans","f",hen1,hen2,'t','辺が等しい');
				ques1_count++;
			}else{
				alert(hen1+'='+hen2+'は入力済みです。')
			}
		}else if(hen_cor(hen1,hen2,"DE","BF")){
			if(ques1_left!=="DE=BF"&&ques1_right!=="DE=BF"){
				var fb_text='正解です！<br>'+hen1+'='+hen2+'であることは「仮定」です。<br>左の構造図に'+hen1+'='+hen2+'が表示され、図にも長さが等しいことを表す記号が追加されました。<br>他にも仮定があれば、もう一度「仮定を整理する」のボタンを押してから記入しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				if(ques1_left==""){
					makeButton("katei1",10,90,"yellow",hen1+'='+hen2,"ques5_1()");
					katei1Text=hen1+'='+hen2;
					forcong++;
					ques1_left="DE=BF";
					if(katei3Text==""){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_DEBF.jpg" alt="問題図" style="width: 345px;">'}
					else if(katei3Text){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_DEBFheiko.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else if(ques1_left){
					makeButton("katei2",100,90,"yellow",hen1+'='+hen2,"ques5_2()");
					katei2Text=hen1+'='+hen2;
					forcong++;
					ques1_right="DE=BF";
					if(katei3Text==""){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_ABDDEBF.jpg" alt="問題図" style="width: 345px;">'}
					else if(katei3Text){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_all.jpg" alt="問題図" style="width: 345px;">'}else{}
				}else{
				}
				write_log("ans","f",hen1,hen2,'t','辺が等しい');
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
			write_log("ans","f",hen1,hen2,'f','辺が等しい');
		}
	}else if(form_number==7){
		var hen1=document.form7.elements[0].value;
		var hen2=document.form7.elements[1].value;
		if(hen_cor(hen1,hen2,"DE","BC")||hen_cor(hen1,hen2,"DE","BF")){
			if(ques1_heiko==false){
				makeButton("katei3",190,90,"yellow",hen1+'//'+hen2,"ques4()");
				ques1_heiko=true;
				ques1_count++;
				katei3Text=hen1+'//'+hen2;
				var fb_text='正解です！<br>'+hen1+'//'+hen2+'であることは「仮定」です。<br>左の構造図に'+hen1+'//'+hen2+'が表示され、図にも平行であること表す記号が追加されました。<br>他にも仮定があれば、もう一度「仮定を整理する」のボタンを押してから記入しましょう。'
				if((ques1_left=="AD=DB"||ques1_right=="AD=DB")&&(ques1_left=="DE=BF"||ques1_right=="DE=BF")){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_all.jpg" alt="問題図" style="width: 345px;">'
				}else if(ques1_left=="AD=DB"||ques1_right=="AD=DB"){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_ABDheiko.jpg" alt="問題図" style="width: 345px;">'
				}else if(ques1_left=="DE=BF"||ques1_right=="DE=BF"){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_DEBFheiko.jpg" alt="問題図" style="width: 345px;">'
				}else if(ques1_left==""){document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_heiko.jpg" alt="問題図" style="width: 345px;">'}
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f",hen1,hen2,"t","平行");
			}else{
				alert(hen1+'//'+hen2+'は入力済みです。')
			}
		}else{
			var fb_text='残念ながら違います。問題文と見比べてもう一度見てみましょう。「仮定」がわからないときは下のリンクをクリックして復習しましょう。'
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","f",hen1,hen2,"f","平行");
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
		btnclr_change(document.getElementById("keturon"));
		question_number = 2;
		beforeXY("div_keturon");
		makeSelect("この問題における「結論」はなんでしょう？<br>「結論」の意味が分からない場合は下のリンクをクリックしよう。<br>");
		write_log("psbtn","b","結論は？",'','','');
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode=="backcong"){

	}
}
var keturon_text;

function ques2_fb(){
	if(form_number==23){
		var rec1=document.form23.elements[0].value;
		var rec2=document.form23.elements[1].value;
		if(tri_cor(rec1,rec2,"ADE","DBF")==0){
			keturon_text="△"+rec1+"≡△"+rec2;
			document.getElementById("diag").innerHTML="正解です！<br>左の構造図に"+keturon_text+"が表示されました。";
			makeButton("ketu",160,400,"blue",keturon_text,"ques3()");
			keturonboolean=true;
			write_log("ans","b",rec1,rec2,'t','');
		}else{
			var fb_text="三角形が合同であることを示すのが結論ですが、△"+document.form23.elements[0].value+"≡△"+document.form23.elements[1].value+"ではありません。<br>もしかすると、打ち間違いかもしれません。問題文と見比べてみましょう。<br>対応順にも気をつけましょう。";
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			write_log("ans","b",rec1,rec2,'f','');
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

//////////question3【後】「合同が言えるのかどうか？言えないなら何が足りないか？」//////////////////
function ques3(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("ketu"));
		if(ques1_count==3){
			question_number =3;
			var txt='これらの三角形の合同はすでに言えるのでしょうか？<br>\
					使えるのは前向き推論で「正しいこと」と言えていることです。<br>\
					右の合同な三角形を取り出す機能も使いながら考えてみましょう。<br><br>\
						<form name="ques3_select">\
								<select name="thing">\
									<option value="1">言えるので「言える根拠」を選ぶ</option>\
									<option value="2">言えないので前向き推論を進める</option>\
									<option value="3">分からない</option>\
								</select>\
								<input type="button" value="決定" onclick="ques3_2()">\
							</form><br>'
			if(document.getElementById){
				document.getElementById("diag").innerHTML=txt;
			}

			write_log("psbtn","b","合同は言えるのか？","","","");
		}else{
			var fb_text="まだ仮定を全て書き出せていません。まずは結論と仮定を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","b","仮定を全て書き出せていない","","","");
		}
	}else if(mode=="backcong"){

	}else{

	}
}

function ques3_2(){
	var answer=document.ques3_select.elements[0].value
	if(answer==1){//言えるって答えた
		if(forcong==3){
			//現に言えているのでモードを変更して選択
			mode="backcong";
			var fb_text='合同を言うための条件となるボタンを押しましょう。押すと下に表示されます。全て押し終わったらOKのボタンを押しましょう。<p class="button_dec" ><input type="button" value="OK" onclick="ques5_fb2()"></p>';
			var div_fb = document.createElement("div");
			div_fb.id = "fb";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb").innerHTML= fb_text;
			k1=0;k2=0;k6=0;
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

function ques3_fb(){
	if(k1==1&&k2==1&k6==1){
		var fb_text='その通りです！正しいものを選択できています。構造図の線が実際につながったと思います。<br>\
					ではこの合同に使った「合同条件」はどれでしょう？<br><br>\
					<form name="ques5_fb2_select">\
						<select name="thing">\
							<option value="1">三組の辺がそれぞれ等しい</option>\
							<option value="2">二組の辺とその間の角がそれぞれ等しい</option>\
							<option value="3">一組の辺とその両端の角がそれぞれ等しい</option>\
						</select>\
						<input type="button" value="決定" onclick="ques5_fb3()">\
					</form><br>'
		mode="finish"
		document.getElementById("diag").innerHTML=fb_text;
		beforeXY("div_katei1");
		makeButton("congCond1",90,330,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_katei2");
		makeButton("congCond2",90,330,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_frompic2");
		makeButton("congCond3",90,330,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_congCond1");
		makeButton("ketu2",160,400,"blue",keturon_text,"");
		div_clear("ketu2");

		write_log("ans","b","正しい条件を選択できた","","t","");
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='まだ合同を言えるだけの条件を選択しきれていません。合同を言うための条件は3つは必要だったはずです。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		write_log("ans","b","条件を選択しきれていない","","f","");
	}
}

//////////question4【前】「平行から何が言えるか？」////////////////////////

function ques4(){
	question_number=4;
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei3"));
		if(ques1_count==3&&keturonboolean==true){
			question_number = 4;
			beforeXY("div_katei3");
			document.getElementById("diag").innerHTML='この二線が平行であることから何が言えるでしょうか？<br>\
														(正しいものを全て選ぼう)<br>\
														<form name="res4">\
															<p>\
																<input type="checkbox" value="0">錯角が等しい<input type="checkbox" value="1">辺の長さが等しい <br>\
																<input type="checkbox" value="2">対頂角が等しい<input type="checkbox" value="3">三角形の一辺である <br>\
																<input type="checkbox" value="4">同位角が等しい<input type="checkbox" value="5">底角が等しい <br>\
															</p>\
															<p class="button_dec" ><input type="button" value="OK" onclick="ques4_fb()"></p>\
														</form>'
			write_log("psbtn","f","平行から何が言えるか？",'','','');
		}else{
			var fb_text="まだ仮定や結論を明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","仮定or結論まだ","",'','');
		}
	}else if(mode=="cong"){
		
	}else if(mode=="use_prosp"){
		
	}else if(mode="backcong"){

	}
}

function ques4_fb(){
	if (document.getElementById){
		if(document.res4.elements[0].checked&&document.res4.elements[4].checked){
			if(document.res4.elements[1].checked ||document.res4.elements[2].checked ||document.res4.elements[3].checked ||document.res4.elements[5].checked ||document.res4.elements[6].checked){
				document.getElementById("diag").innerHTML='正解も含んでいるのでが、平行であることからは言えないものも含んでしまっています。もう一度考えてみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>';
			}else{
				document.getElementById("diag").innerHTML="正解です！<br>平行な二線の同位角・錯角は等しいですね！<br>\
														   左の構造図に平行であることから言える、「平行線の同位角が等しい」「平行線の錯角は等しい」が表示されました。<br>\
														   表示されたボタンをクリックして実際の同位角・錯角がどこかを入力しましょう。"
				//平行線の同位角・錯角
				makeButton("katei4",190,150,"green","平行線の同位角","ques4_douikaku()");
				makeButton("katei5",310,150,"green","平行線の錯角","ques4_sakaku()")

				write_log("ans","f","平行線の同位角錯角は等しい","","t","");
			}
		}else if(document.res4.elements[0].checked){
			document.getElementById("diag").innerHTML='「錯角が等しい」は正解で、平行であることから言う事ができます。<br>ですが、他にも平行から言えることがあります。ヒントも参考にしましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>'
			write_log("ans","f","平行から何が言えるか？","同位角不足","f","");
		}else if(document.res4.elements[4].checked){
			document.getElementById("diag").innerHTML='「同位角が等しい」は正解で、平行であることから言う事ができます。<br>ですが、他にも平行から言えることがあります。ヒントも参考にしましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>'
			write_log("ans","f","平行から何が言えるか？","錯角不足","f","");
		}else{
			document.getElementById("diag").innerHTML='残念ながら違います。ヒントも参考にして「平行」から何が言えるか思い出しましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4()"></p>'
			write_log("ans","f","平行から何が言えるのか？","","f","")
		}
	}
}

var douikaku1=false;
var douikaku2=false;

function ques4_douikaku(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei4"));
		document.getElementById("diag").innerHTML='DE//BCなので直線DEと直線BCにおける同位角は等しくなりますね。<br>どの角とどの角が同位角にあたるでしょうか？？<br><form name="res4_douikaku">∠<input type="text" name="kaku1" size="3" value=""> = ∠<input type="text" name="kaku2" size="3" value=""> <input type="button" value="決定" onclick="ques4_douikaku_fb()"><br></p></form>'
		beforeXY("div_katei4");
		write_log("psbtn","f","同位角は？","","","");
	}
}

function ques4_douikaku_fb(){
	var ans1=document.res4_douikaku.elements[0].value;
	var ans2=document.res4_douikaku.elements[1].value;
	if(kaku_cor(ans1,ans2,"ADE","DBF")||kaku_cor(ans1,ans2,"ADE","ABF")||kaku_cor(ans1,ans2,"ADE","DBC")||kaku_cor(ans1,ans2,"ADE","ABC")){
	 	if(douikaku1==false){
	 		makeButton("katei6",170,210,"yellow","∠"+ans1+"=∠"+ans2,"ques5_6()")
	 		katei6Text="∠"+ans1+"=∠"+ans2;
	 		forcong++;
	 		douikaku1=true;
	 		document.getElementById("diag").innerHTML='正解です！∠'+ans1+'=∠'+ans2+'です。<br>他にも同位角があればもう一度「平行線の同位角」のボタンを押して答えましょう。<br>もう他にない場合や、必要ないときは他の部分について考えていきましょう。'
			//問題図変更
			if(sakaku==false&&douikaku2==false){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1.jpg" alt="問題図" style="width: 345px;">'
			}else if(sakaku==false&&douikaku2==true){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1doui2.jpg" alt="問題図" style="width: 345px;">'
			}else if(sakaku==true&&douikaku2==false){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else if(sakaku==true&&douikaku2==true){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1doui2sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else{

			}
			write_log("ans","f",ans1,ans2,"t","同位角1")
		}else{
			alert("∠"+ans1+"=∠"+ans2+"は入力済みです。")
		}
	}else if(kaku_cor(ans1,ans2,"AED","ECF")||kaku_cor(ans1,ans2,"AED","ACF")||kaku_cor(ans1,ans2,"AED","ECB")||kaku_cor(ans1,ans2,"AED","ACB")){
		if(douikaku2==false){
			makeButton("katei7",240,260,"yellow","∠"+ans1+"=∠"+ans2,"ques5_7()")
			katei7Text="∠"+ans1+"=∠"+ans2;
			douikaku2=true;
			document.getElementById("diag").innerHTML='正解です！∠'+ans1+'=∠'+ans2+'です。<br>他にも同位角があればもう一度「平行線の同位角」のボタンを押して答えましょう。<br>もう他にない場合や、必要ないときは他の部分について考えていきましょう。'
			//問題図変更
			if(sakaku==false&&douikaku1==false){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui2.jpg" alt="問題図" style="width: 345px;">'
			}else if(sakaku==false&&douikaku1==true){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1doui2.jpg" alt="問題図" style="width: 345px;">'
			}else if(sakaku==true&&douikaku1==false){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui2sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else if(sakaku==true&&douikaku1==true){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1doui2sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else{
				
			}
			write_log("ans","f",ans1,ans2,"t","同位角2");
		}else{
			alert("∠"+ans1+"=∠"+ans2+"は入力済みです。")
		}
	}else{
		document.getElementById("diag").innerHTML='残念ながら違います。下のリンクをクリックして「平行について」を見てみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4_douikaku()"></p>'
		write_log("ans","f","","","f","同位角");
	}
}

function ques4_sakaku(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei5"));
		document.getElementById("diag").innerHTML='DE//BCなので直線DEと直線BCにおける錯角は等しくなりますね。<br>どの角とどの角が錯角にあたるでしょうか？？<br><form name="res4_sakaku">∠<input type="text" name="kaku1" size="3" value=""> = ∠<input type="text" name="kaku2" size="3" value=""> <input type="button" value="決定" onclick="ques4_sakaku_fb()"><br></p></form>'
		beforeXY("div_katei5");
		write_log("psbtn","f","錯角は？","","","");
	}
}

var sakaku=false;

function ques4_sakaku_fb(){
	var ans1=document.res4_sakaku.elements[0].value;
	var ans2=document.res4_sakaku.elements[1].value;
	if(kaku_cor(ans1,ans2,"EDF","BFD")){
	 	if(sakaku==false){
	 		makeButton("katei8",320,210,"yellow","∠"+ans1+"=∠"+ans2,"ques5_8()")
	 		katei8Text="∠"+ans1+"=∠"+ans2;
	 		sakaku=true;
	 		document.getElementById("diag").innerHTML='正解です！∠'+ans1+'=∠'+ans2+'です。<br>他にも錯角があればもう一度「平行線の錯角」のボタンを押して答えましょう。<br>もう他にない場合や、必要ないときは他の部分について考えていきましょう。'
			//問題図変更
			if(douikaku1==false&&douikaku2==false){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else if(douikaku1==false&&douikaku2==true){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui2sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else if(douikaku1==true&&douikaku2==false){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else if(douikaku1==true&&douikaku2==true){
				document.getElementById("pic").innerHTML='<img src="q3_image/pic_q3_doui1doui2sakaku.jpg" alt="問題図" style="width: 345px;">'
			}else{
				
			}
			write_log("ans","f",ans1,ans2,"t","錯角")
		}else{
			alert("∠"+ans1+"=∠"+ans2+"は入力済みです。")
		}
	}else{
		document.getElementById("diag").innerHTML='残念ながら違います。下のリンクをクリックして「平行について」を見てみましょう。<p class="button_dec" ><input type="button" value="戻る" onclick="ques4_douikaku()"></p>'
	write_log("ans","f",ans1,ans2,"f","錯角")
	}
}

///////////question5【前】「これらから何が言えますか？」///////////////////


//それぞれのスイッチになる
var k1=0;
var k2=0;
var k6=0;
var k7=0;
var k8=0;
var select_uncor=true;//間違いの選択肢を選ぶとfalseになり、通らなくなる

function ques5_1(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei1"));
		if(keturonboolean==true && ques1_count==3){
			question_number = 5;
			beforeXY("div_katei1");
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			k1=1;
			k2=0;
			k6=0;
			write_log("psbtn","f","katei1から何が言えるか？",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","仮定を全て書き出せていない",'','','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","結論を書き出せていない","",'','');
		}
	}else if(mode=="cong"){
		if(k1==0){
			k1=1;
			var fb_text='●　'+katei1Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb1";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb1").innerHTML= fb_text;
			write_log("psbtn","f","katei1を条件要素に追加","",'','');
		}
	}else if(mode=="backcong"){
		if(k1==0){
			k1=1;
			var fb_text='●　'+katei1Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb1";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb1").innerHTML= fb_text;
			write_log("psbtn","b","katei1を条件要素に追加","",'','');
		}
	}
}
function ques5_2(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei2"));
		if(keturonboolean==true && ques1_count==3){
			question_number = 5;
			beforeXY("div_katei2");
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			k1=0;
			k2=1;
			k6=0;
			write_log("psbtn","f","katei2から何が言えるか？",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","仮定を全て書き出せていない","",'','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","結論を書き出せていない","",'','');
		}
	}else if(mode=="cong"){
		if(k2==0){
			k2=1;
			var fb_text='●　'+katei2Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb2";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb2").innerHTML= fb_text;
			write_log("psbtn","f","katei2を条件要素に追加","",'','');
		}
	}else if(mode=="backcong"){
		if(k2==0){
			k2=1;
			var fb_text='●　'+katei2Text;
			var div_fb = document.createElement("div");
			div_fb.id = "fb2";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("fb2").innerHTML= fb_text;
			write_log("psbtn","b","katei2を条件要素に追加","",'','');
		}
	}
}

function ques5_6(){
	btnclr_change(document.getElementById("katei6"));
	if(mode=="normal"){
		if(keturonboolean==true && ques1_count==3){
			question_number = 5;
			beforeXY("div_katei6");
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			k1=0;
			k2=0;
			k6=1;
			write_log("psbtn","f","katei6から何が言えるか？",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","仮定を全て書き出せていない","",'','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","結論を書き出せていない","",'','');
		}
	}else if(mode=="cong"){
		if(k6==0){
			k6=1;
			var fb_text='●　'+katei6Text;
			var div_fb = document.createElement("div");
			div_fb.id = "select6";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("select6").innerHTML= fb_text;
			write_log("psbtn","f","katei6を条件要素に追加","",'','');
		}
	}else if(mode=="backcong"){
		if(k6==0){
			k6=1;
			var fb_text='●　'+katei6Text;
			var div_fb = document.createElement("div");
			div_fb.id = "select6";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("select6").innerHTML= fb_text;
			write_log("psbtn","b","katei6を条件要素に追加","",'','');
		}
	}
}
function ques5_7(){
	if(mode=="normal"){
		btnclr_change(document.getElementById("katei7"));
		if(keturonboolean==true && ques1_count==3){
			question_number = 55;
			select_uncor=false;
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			write_log("psbtn","f","katei7から何が言えるのか？",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","仮定を全て書き出せていない","",'','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","結論を書き出せていない","",'','');
		}
	}else if(mode=="cong"){
		if(k7==0){
			k7=1;
			var fb_text='●　'+katei7Text;
			var div_fb = document.createElement("div");
			div_fb.id = "select7";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("select7").innerHTML= fb_text;
			select_uncor=false;
			write_log("psbtn","f","katei7を条件要素に追加","",'','');
		}
	}else if(mode=="backcong"){
		if(k7==0){
			k7=1;
			var fb_text='●　'+katei7Text;
			var div_fb = document.createElement("div");
			div_fb.id = "select7";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("select7").innerHTML= fb_text;
			select_uncor=false;
			write_log("psbtn","b","katei7を条件要素に追加","",'','');
		}
	}
}
function ques5_8(){
	btnclr_change(document.getElementById("katei8"));
	if(mode=="normal"){
		if(keturonboolean==true && ques1_count==3){
			question_number = 55;
			select_uncor=false;
			makeSelect("これらから言えることはあるでしょうか？<br>図も参考にしながら考えてみましょう。<br>ない場合は「仮定」や「図の性質から言えること」などの、<br>言えること=正しいと分かっていること　が他にないか確認してみましょう。<br>")
			write_log("psbtn","f","katei8から何が言えるのか？",'','','');
		}else if(keturonboolean==true){
			var fb_text="まだ仮定を全て明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","仮定を全て書き出せていない","",'','');
		}else{
			var fb_text="まだ結論が何か明らかにできていません。まずは仮定と結論を全て書き出すところからスタートでしたね。";
			document.getElementById("diag").innerHTML=fb_text;
			write_log("psbtn","f","結論を書き出せていない","",'','');
		}
	}else if(mode=="cong"){
		if(k8==0){
			k8=1;
			var fb_text='●　'+katei8Text;
			var div_fb = document.createElement("div");
			div_fb.id = "select8";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("select8").innerHTML= fb_text;
			select_uncor=false;
			write_log("psbtn","f","katei8を条件要素に追加","",'','');
		}
	}else if(mode=="backcong"){
		if(k8==0){
			k8=1;
			var fb_text='●　'+katei8Text;
			var div_fb = document.createElement("div");
			div_fb.id = "select8";
			document.getElementById("diag").appendChild(div_fb);
			document.getElementById("select8").innerHTML= fb_text;
			select_uncor=false;
			write_log("psbtn","b","katei8を条件要素に追加","",'','');
		}
	}
}
function ques5_fb(){
	if(form_number==23){
		var rec1=document.form23.elements[0].value;
		var rec2=document.form23.elements[1].value;
		var boolnum=tri_cor(rec1,rec2,"ADE","DBF");
		if(boolnum==0){//正解
			if(forcong==3){
				var firsttxt;
				if(k1==1){firsttxt=katei1Text;}else if(k2==1){firsttxt=katei2Text;}else if(k6==1){firsttxt=katei6Text;}else{}
				var congtext='そうですね！<br>△'+rec1+'≡△'+rec2+'が言えると思います。<br>それを言うために、他にどの要素を使う必要がありますか？<br>そのボタンをクリックしましょう。(クリックするとこの下に表示されます)<br>全てクリックし終わったらOKを押して先に進みましょう。<br><br>●　'+firsttxt+'<p class="button_dec" ><input type="button" value="OK" onclick="ques5_fb2()"></p>'
				document.getElementById("diag").innerHTML=congtext;
				forcong=4;
				mode="cong";
				congboolean=true;
				makeButton("congCond",90,330,"green",'____________がそれぞれ等しい',"");
				beforeXY("div_congCond");
				makeButton("ketu2",160,400,"blue",'△'+rec1+'≡△'+rec2,"ques3()");
				write_log("ans","f","△"+rec1,"△"+rec2,'t','');
			}else{
				var fb_text='△'+rec1+'≡△'+rec2+'を言いたいのはいい方向性だと思います。<br>しかし、現時点では'+forcong+'つしか条件がないので三角形の合同を言うことはできません。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f","△"+rec1,"△"+rec2,'f','条件足りず');				
			}
		}else if(boolnum==1){
			if(forcong==3){
				var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、「対応順」が違っています。確認してみましょう。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。'
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f","△"+rec1,"△"+rec2,'f','対応順違う');
			}else{
				var fb_text='△'+rec1+'と△'+rec2+'に目をつけたのはいい方向性だと思います。<br>しかし、現時点では'+forcong+'つしか条件がないので三角形の合同を言うことはできません。加えて「対応順」が違っています。<br>対応順については分からない場合は下記リンクで「合同」について確認しましょう。';
				var div_fb = document.createElement("div");
				div_fb.id = "fb";
				document.getElementById("diag").appendChild(div_fb);
				document.getElementById("fb").innerHTML= fb_text;
				write_log("ans","f","△"+rec1,"△"+rec2,'f','条件不足、対応順違い');
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

function ques5_fb_uncor(){
	var div_fb = document.createElement("div");
	div_fb.id = "fb";
	document.getElementById("diag").appendChild(div_fb);
	document.getElementById("fb").innerHTML= '残念ながらその項目からそのことをいうことは出来ません。図も参考にしながら考えてみましょう。';
	write_log("ans","f","","","f","");
}

//合同を言うのにどの条件が必要かを選んだ後の動作
function ques5_fb2(){
	var k=k1+k2+k6;
	if(k==3&&select_uncor==true){
		var fb_text='その通りです！正しいものを選択できています。構造図の線が実際につながったと思います。<br>\
					ではこの合同であることを言うのに使った「合同条件」はどれでしょう？<br><br>\
					<form name="ques5_fb2_select">\
						<select name="thing">\
							<option value="1">三組の辺がそれぞれ等しい</option>\
							<option value="2">二組の辺とその間の角がそれぞれ等しい</option>\
							<option value="3">一組の辺とその両端の角がそれぞれ等しい</option>\
						</select>\
						<input type="button" value="決定" onclick="ques5_fb3()">\
					</form><br>'
		mode="finish";
		document.getElementById("diag").innerHTML=fb_text;
		beforeXY("div_katei1");
		makeButton("congCond1",90,330,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_katei2");
		makeButton("congCond2",90,330,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_katei6");
		makeButton("congCond3",90,330,"green",'____________がそれぞれ等しい',"");
		beforeXY("div_congCond1");
		makeButton("ketu3",160,400,"blue",keturon_text,"");
		write_log("ans","f","正しい条件を選択できた","","t","")
	}else{
		var div_fb = document.createElement("div");
		div_fb.id = "fb";
		document.getElementById("diag").appendChild(div_fb);
		document.getElementById("fb").innerHTML= '間違ったものを含んでいる、もしくは条件とする選択肢が足りていません。<br>もう一度考えて、どの条件によってその合同が言えるのか考えてみましょう。<p class="right" ><input type="button" value="選択を解除" onclick="select_reset()"></p>';
		write_log("ans","f","正しい条件を選択できていない","","f","")
	}
}

//合同条件を選んだ後の動作
function ques5_fb3(){
	if(document.ques5_fb2_select.elements[0].value==2){
		document.getElementById("diag").innerHTML='正解です！<br>しっかりと図を見て合同条件を選べています。<br>構造図に合同条件が表示されました。<br><br>これで「前向き推論」と「後ろ向き推論」が繋がりましたね。<br>なので構造図作成は終了です。終了ボタンを押して担当の人を呼びましょう。<br><p style="text-align:right"><button type="button" value="output" style="" onclick= "output()">終了</button> </p> <a id="download" target="_blank">ダウンロード（IEでは、右クリック＞対象をファイルに保存）</a>'
		mode="finish";
		document.getElementById("div_congCond1").innerHTML='';
		document.getElementById("div_congCond2").innerHTML='';
		document.getElementById("div_congCond3").innerHTML='';
		beforeX=90;
		beforeY=330;
		makeButton("congCond",90,330,"green",'二組の辺とその間の角がそれぞれ等しい',"");
		write_log("ans","f","合同条件を正しいものを選択","","t","");
	}else{
		diag_history=document.getElementById("diag").innerHTML;
		document.getElementById("diag").innerHTML='残念ながら違います。問題図、その下の合同な図形を取り出す欄も使いながら考え直してみましょう。<br><p class="button_dec" ><input type="button" value="戻る" onclick="backHistory()"></p>'
		write_log("ans","f","合同条件を誤ったものを選択","","f","");
	}
}

function select_reset(){
	document.getElementById("diag").innerHTML='選択を解除しました。<br><br>その三角形の合同をいうために使う条件はどれでしょうか？<br>過不足のないようボタンを押しましょう。<br>合同条件を忘れてしまった人は下のヒントを参照しましょう。<br><p class="button_dec" ><input type="button" value="OK" onclick="ques5_fb2()"></p>'
	k1=0;k2=0;k6=0;k7=0;k8=0;select_uncor=true;
	write_log("reset","b","選択を解除","","","")
}


//////////////合同になりそうな三角形を取り出す/////////////

function seppicback(){
	document.getElementById("button_seppic").innerHTML='<br><form name="seppic">△<input type="text" name="kaku1" size="4" value=""> ≡ △<input type="text" name="kaku1" size="4" value=""> </form><br> <button type="button" class="button_sg" value="katei" onclick= "takeout0()">合同になりそうな三角形を書き出す</button>'
}

function takeout0(){
	var rec1=document.seppic.elements[0].value;
	var rec2=document.seppic.elements[1].value;
	var boolnum=tri_cor(rec1,rec2,"ADE","DBF");
	if(boolnum==0){
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep.jpg" alt="問題図" style="width: 330px;">'
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
	if(katei6Text&&(ques1_left=="AD=DB"||ques1_right=="AD=DB")&&(ques1_left=="DE=BF"||ques1_right=="DE=BF")){
		//全揃い
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep_all.jpg" alt="問題図" style="width: 330px;">'
	}else if((ques1_left=="AD=DB"||ques1_right=="AD=DB")&&(ques1_left=="DE=BF"||ques1_right=="DE=BF")){
		//間の角が足りない
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep_ABDDEBF.jpg" alt="問題図" style="width: 330px;">'
	}else if(katei6Text&&(ques1_left=="AD=DB"||ques1_right=="AD=DB")){
		//DE=BFが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep_ABDdoui1.jpg" alt="問題図" style="width: 330px;">'
	}else if(frompic==1&&(ques1_left=="DE=BF"||ques1_right=="DE=BF")){
		//AD=DBが足りない
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep_DEBFdoui1.jpg" alt="問題図" style="width: 330px;">'
	}else if(ques1_left=="AD=DB"||ques1_right=="AD=DB"){
		//AD=DBしかない
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep_ABD.jpg" alt="問題図" style="width: 330px;">'
	}else if(ques1_left=="DE=BF"||ques1_right=="DE=BF"){
		//DE=BFしかない
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep_DEBF.jpg" alt="問題図" style="width: 330px;">'
	}else if(katei6Text){
		//間の角しかない
		document.getElementById("div_seppic").innerHTML='<img src="q3_image/pic_q3_sep_doui1.jpg" alt="問題図" style="width: 330px;">'
	}else{

	}
	write_log("mark","f",'','','','');
}