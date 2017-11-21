function biu (){
	var self = this;
	self.body = document.createElement("div");

	//初始化
	self.init = function (){
		self.body.className = "bullet";
		document.body.appendChild(self.body);
		self.body.style.left =myplane.left() + myplane.width()/2 - self.width()/2 + "px";
		self.body.style.top =  myplane.top() - self.height() + "px";
		return self;
	}

	//移动
	self.move = function (){
		self.expmovetimer = setInterval(function (){
			if(!Game.pause){
			self.body.style.top = self.top() - 40 + "px";
				ge.notice(self);
				if(self.top()<-self.height()){
					self.remove();
					clearInterval(self.expmovetimer);
				}
			}
			return self;
		},17)
	}

	self.left = function (val){
		if(val != undefined){
			self.body.style.left = val + "px";

		}else{
			return self.body.offsetLeft;
		}
	}
	self.top = function (val){
		if(val != undefined){
			self.body.style.top = val + "px";
		}else{
			return self.body.offsetTop;
		}
	}
	self.width = function (){
		return self.body.offsetWidth;
	}
	self.height = function (){
		return self.body.offsetHeight;
	}
	self.remove = function (){
		return self.body.remove();
	}

	//子弹爆炸
	self.exp = function (){
		clearInterval(self.expmovetimer);
		var oldheight = self.height();
		var oldwidth = self.width();
		self.body.className = "bullet_die";
		self.left(self.left() - (self.width() / 2 - oldwidth / 2));
		self.top(self.top() - (self.height() / 2 - oldheight/ 2));
		var index = 1;
		self.exptimer=setInterval(function (){
			if(!Game.pause){
				self.body.style.background = "url(images/die" + index++ + ".png)";
				if(index>3){
					clearInterval(self.exptimer);
					self.remove();
				}
			}
		},17)
	}
}


