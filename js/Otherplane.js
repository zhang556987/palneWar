//敌方飞机
function EnemyPlane (type){
	var self = this;
	self.body = document.createElement("div");
	//初始化
	self.init = function (){
		switch(type){
			case planeType.TYPE_SMALL: {
				self.body.className = "enemy-small";
				self.speed = 8;
				self.hp = 1;
				self.score = 10;
				self.escape = 1;
				self.imgs = ["plain1_die1.png", "plain1_die2.png", "plain1_die3.png"];
				break;
			}
			case planeType.TYPE_MIDDLE: {
				self.body.className = "enemy-middle";
				self.speed = 4;
				self.hp = 5;
				self.score = 30;
				self.escape = 1;
				self.imgs = ["plain2_die1.png", "plain2_die2.png", "plain2_die3.png", "plain2_die4.png"];
				break;
			}
			case planeType.TYPE_LARGE: {
				self.body.className = "enemy-large";
				self.speed = 2;
				self.hp = 10;
				self.score = 50;
				self.escape = 1;
				self.imgs = ["plain3_die1.png", "plain3_die2.png", "plain3_die3.png", "plain3_die4.png", "plain3_die5.png", "plain3_die6.png"];
				break;
			}
		}
	document.body.appendChild(self.body);
	self.left( Math.round(Math.random()*(ge.width()-self.width())+ge.left()) );
	self.top(-self.height());
	return self;
	}

	self.width = function (){
		return self.body.offsetWidth;
	}
	self.left = function (val){
		if(val != undefined){
			self.body.style.left = val +"px";
		}else{
			return self.body.offsetLeft;
		}
	}
	self.top = function (val){
		if(val != undefined){
			self.body.style.top = val +"px";
		}else{
			return self.body.offsetTop;
		}
	}
	self.height = function (){
		return self.body.offsetHeight;
	}
	self.remove = function (){
		return self.body.remove();
	}

	//移动
	self.move = function (){
		self.movetimer=setInterval(function (){
			if(!Game.pause){
				self.body.style.top = self.top() + self.speed + "px";
				ge.isPengPeng2(myplane,self);
				if(self.top() > (self.height()+window.innerHeight)){
					window.hp.innerHTML = --myplane.hp;
					if(window.hp.innerHTML == 0){
						myplane.boom();
						ge.gameOver();
					}
					self.remove();
					clearInterval(self.timer);
				}
			}
		},17)
		return self;
	}

	//受伤
	self.hurt = function (){
		if(--self.hp == 0){
			self.boom();
		}
	}

	//爆炸
	self.boom = function (){
		window.score.innerHTML = parseInt(window.score.innerHTML)+self.score;
		clearInterval(self.movetimer);
		self.boomtimer=setInterval(function (){
			if(!Game.pause){
				var index = self.imgs.shift();
				if(index){
					self.body.style.background = "url(images/"+ index + ")";
				}else{
					clearInterval(self.boomtimer);
					self.remove();
				}
			}
		},80)
	}
}
