// var testdata={
// 	track1:0,
// 	track2:0,
// 	track3:0,
// 	track4:0,
// };

// setInterval(function(){
// 	self.postMessage();
// },379.5);
// 
// 
// ----------------------------------失败的请求json文件尝试，等待后端研究清楚了再次尝试-------------------------------------
	// var url = "score.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
 //            var request = new XMLHttpRequest();
 //            request.open("Post", url);/*设置请求方法与路径*/
 //            request.send(null);/*不发送数据到服务器*/
 //            request.onload = function () {/*XHR对象获取到返回信息后执行*/
 //                if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
 //                    score = JSON.parse(request.responseText);
 //                    console.log(json);
 //                }
 //            }
 //            
 

 //-----------------------------------------以下是简化版音乐谱读取器，暂不支持bpm变化------------------------------------------------------------
var timer = new Date();
var StartTime= timer.getTime();
var p = StartTime;               //时间戳
var score;
var numberOfNote=0;
var bpm=150;
var Con = (60*1000/bpm/8);   //比例常数
var delay=0;
var pauseFlag=false;
self.onmessage=function(event){
	var newData=event.data;
	if(event.data=="pause"){
		pauseFlag=true;
		var timer = new Date;
		pausep=timer.getTime();
	}else if(event.data=="start"){
		var timer = new Date;
		delay+=(timer.getTime()-pausep);
		self.postMessage(delay);
		pauseFlag=false;
	}
}
//-------------下面这个json数组就是乐谱-----------------
score = [
	{bpm:150,speed:1,duration:5300},              //乐谱开头必须要设置bpm和speed，speed不应该小于0.5
	0,							//数字代表延迟时间（一个三十二分音符），注意数组中，奇数必为json对象（表示该时刻要发射的音符），偶数必须为延迟时间（大于等于0）
	{t1:0},                         //150 bpm 四分音符等于400毫秒 ,32分音符为50毫秒 
	8,
	{t4:0},
	6,
	{t3:0},
	6,
	{t2:0},
	10,
	{t4:0},
	4,
	{t3:0},
	4,
	{t2:0},
	12,
	{t1:0,t2:0},
	4,
	{t2:0,t3:0},
	4,
	{t3:0},
	4,
	{t4:0},
	4,
	{t1:0},
	8,
	{t4:0},
	4,
	{t2:0},
	8,
	{t4:0},
	4,
	{t1:32},
	4,

	{t2:32},
	4,
	{t3:32},
	4,
	{t4:32},
	64,         
	{end:true}    //发送end：true之前必须预留足够的时间让最后的音符落下去

];
for(var s in score){
	if(s/2!==Math.round(s/2)){
		numberOfNote+=score[s];
		p=StartTime+delay+numberOfNote*Con;
		do{
			var timer = new Date();
			while(pauseFlag==true){
				;
			}
		}while(timer<=p);
	}else{
		self.postMessage(score[s]);
	}
}