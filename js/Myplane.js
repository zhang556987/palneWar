//我的飞机
function MyPlane (){
	var self = this;
	self.body = document.createElement("div");
	//初始化
	self.init = function (){
		self.body.className = "my-warplain";
		self.body.style.bottom = 0;
		self.hp = 10;
		self.body.style.left = ge.left() + (ge.width()/2 - self.width()/2) + "px";
	}
	//显示
	self.show = function (){
		document.body.appendChild(self.body);
		self.init();
		self.control();
		self.autoFire();
		return self;
	}
	self.top = function (){
		return self.body.offsetTop;
	}
	self.left = function (){
		return self.body.offsetLeft;
	}
	self.width = function (){
		return self.body.offsetWidth;
	}
	self.height = function (){
		return self.body.offsetHeight;
	}

	//鼠标控制事件
	self.control = function (){
		document.addEventListener("mousemove",function (e){
			if(!Game.pause){
				var e=e||event;
				self.body.style.left=Math.min(ge.left()+ge.width()-self.width(),Math.max(ge.left(),e.clientX-self.width()/2))+"px";
				self.body.style.top = e.clientY - self.height()/2 + "px";
			}
		})
		self.remove = function (){
			self.control.remove();
		}
	}

	//自动开火
	self.autoFire = function (){
		setInterval(function (){
			new biu().init().move();
		},ge.diflv*100)
	}
	//受伤
	self.hurt = function (){
		window.hp.innerHTML = --self.hp;
		console.log(window.hp.innerHTML)
		self.body.style.background = "url(images/me_die1.png)";
		setTimeout(function (){
			self.body.style.background = "url(images/me.png)";
		},300)
		if(self.hp == 0){
			self.boom();
			ge.gameOver();
		}
	}

	//飞机爆炸
	self.boom = function (){
		var index = 1;
		self.myPlaneBoom=setInterval(function () {
			if(!Game.pause){
				self.body.style.background = "url(images/me_die"+index++ +".png)";
				if(index > 6){
					clearInterval(self.myPlaneBoom);
					self.body.remove();
					ge.gameOver();
				}
			}
		},100)
	}
}
