// var testdata={
// 	track1:0,
// 	track2:0,
// 	track3:0,
// 	track4:0,
// };

// setInterval(function(){
// 	self.postMessage();
// },379.5);
var timer = new Date();
var StartTime= timer.getTime();
var p = StartTime;               //时间戳
var score=new Object();
score = [
	{bpm:158,speed:0.1},
	1000,
	{t1:0},
	1000,
	{t1:0},
	1000,
	{t1:0},
	1000,
	{t1:0},
	1000,
	{t1:0},
	1000,
	{t1:0},

];

for(var s in score){
	if(s/2!==Math.round(s/2)){
		p+=score[s];
		do{
			var timer = new Date();

		}while(timer<=p);
	}else{
		self.postMessage(score[s]);
	}
}