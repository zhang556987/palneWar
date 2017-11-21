//初始化暂停条件
Game.pause = false;

//初始化飞机类型
planeType = {
	TYPE_SMALL : Symbol(),
	TYPE_MIDDLE : Symbol(),
	TYPE_LARGE : Symbol()
}

//游戏引擎
function Game (){
	var self = this;
	self.arr = new Set();
	self.body = document.getElementById("body_main");
	self.start = function (lv){
		//难度
		self.diflv = lv;
		//删除选择列表
		self.body.removeChild(self.body.children[0]);
		//运行背景移动
		self.bgmoving();
		//按顺序执行
		new Promise(self.loading).then(function (){
			window.myplane = new MyPlane().show();
			ge.autoCreatEnemyPlane();
		})

		return self;
	}

	//加载界面
	self.loading = function (success){
		//LOGO
		var logo = document.createElement("div");
		logo.className = "logo";
		self.body.appendChild(logo);
		//进度条
		var progress = document.createElement("div");
		progress.className = "loading";
		self.body.appendChild(progress);
		//进度条换背景(模拟动画效果)
		var count=1;
		var index=1
		var t=setInterval(function (){
			if(!Game.pause){
				progress.style.background = "url(images/loading"+ count +".png)";
				//重复
				if(count++ == 3){
					count=1;
				};
				//背景换几次
				if(index++ == 12){
					clearInterval(t);
					logo.remove();
					progress.remove()
					success();
				}
			}
		},250)
	}

	//移动背景
	self.bgmoving = function (){
		var _top = 0;
		self.bgmove = setInterval(function (){
			if(!Game.pause){
				self.body.style.backgroundPosition = "0px " + (_top += 5) + "px";

			}
		},17)
	}

	self.left = function (){
		return self.body.offsetLeft;
	}
	self.width = function (){
		return self.body.offsetWidth;
	}
	//自动创建敌方飞机
	self.autoCreatEnemyPlane = function (){
		setInterval(function (){
			if(!Game.pause){
				var c = Math.round(Math.random())
				if(c){
					self.arr.add(new EnemyPlane(planeType.TYPE_SMALL).init().move());
				}
			}
		},500);
		setInterval(function (){
			if(!Game.pause){
				var c = Math.round(Math.random())
				if(c){
					self.arr.add(new EnemyPlane(planeType.TYPE_MIDDLE).init().move());
				}
			}
		},2000);
		setInterval(function (){
			if(!Game.pause){
				var c = Math.round(Math.random())
				if(c){
					self.arr.add(new EnemyPlane(planeType.TYPE_LARGE).init().move());
				}
			}
		},10000);
	}

	//获取碰撞检测
	self.notice = function (biu){
		for(var e of self.arr){
			self.isPengPeng(biu,e)
		}
	}

	//判定是否碰撞----子弹 敌机
	self.isPengPeng = function (a,b){
		if(self.isOverlap(a,b)){
			a.exp();
			b.hurt();
		}
	}

	//判定是否碰撞----敌机 我机
	self.isPengPeng2 = function (a,b){
		if(self.isOverlap(a,b)){
			b.boom();
			a.hurt();
		}
	}

	//碰撞条件
	self.isOverlap = function (a1,a2){
		var leftSide = a2.left() - a1.width();
		var rightSide = a2.left() + a2.width();
		var topSide = a2.top() - a1.width();
		var downSide = a2.top() + a2.width();

		if(a1.left() > leftSide && a1.left() < rightSide && a1.top() > topSide && a1.top() < downSide){
			return true;
		}

	}

	//游戏结束
	self.gameOver = function (){
		setTimeout(function (){
			gameOverCover.style.display = "block";
		},1000)
	}



}