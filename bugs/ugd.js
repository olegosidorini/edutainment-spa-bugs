(function (Ugd)  {
	Ugd.tasks = [];
	Ugd.results = [];
	Ugd.taskcount = 0;
	Ugd.screen = {w : 0, h : 0, child : {}, curent : ""} ;
	Ugd.jump = false;
	Ugd.play = false;
	Ugd.iconsize = 64;
	Ugd.t;
	Ugd.icons = {};
	Ugd.loaderBar;
	Ugd.bar;
	Ugd.b_exit;

	Ugd.setScreen = function(n){
		Ugd.screen.curent = n;
		createjs.Sound.stop()
		stage.removeAllChildren();
		stage.addChild(Ugd.screen.child[n]);
		if(Ugd.screen.child[n].sound)createjs.Sound.play(Ugd.screen.child[n].sound, {loop:30});
	}
	
	Ugd.setTask = function(n){
		Ugd.screen.curent = n;
		stage.removeAllChildren();
		stage.addChild(Ugd.tasks[n]);
	}

	Ugd.setResult = function(n){
		Ugd.results[n].icon.set({image : loader.getResult("r"+Ugd.tasks[n].status)});
	}

	Ugd.init = function(cnvs){

		stage = new createjs.Stage(cnvs);

		// grab canvas width and height for later calculations:
		Ugd.screen.w = stage.canvas.width;
		Ugd.screen.h = stage.canvas.height;
		Ugd.loaderBar = new createjs.Container();	
		Ugd.bar = new createjs.Shape();
        Ugd.bar.graphics.beginFill("#FFF").drawRect(0, 0, 1, 20);
        var bgBar = new createjs.Shape();
        var padding = 3
        bgBar.graphics.setStrokeStyle(1).beginStroke("#FFF").drawRect(-padding/2, -padding/2, 300+padding, 20+padding);
        Ugd.loaderBar.x = Ugd.screen.w/2 - 150;
        Ugd.loaderBar.y = Ugd.screen.h/2 - 10; 
		Ugd.loaderBar.addChild(Ugd.bar, bgBar);    

        stage.addChild(Ugd.loaderBar);

		manifest = [
			{src:"running3.png", id:"grant"},
			{src:"sky.png", id:"sky"},
			{src:"ground.png", id:"ground"},
			{src:"fon.jpg", id:"fon"},
			{src:"bug.png", id:"bug"},
			{src:"help.png", id:"help"},
			{src:"exit.png", id:"exit"},
			{src:"stop.png", id:"stop"},
			{src:"play.png", id:"play"},
			{src:"copyright.png", id:"copyright"},
			{src:"parallaxHill1.png", id:"hill"},
			{src:"parallaxHill2.png", id:"hill2"},
			{src:"r0.png", id:"r0"},
			{src:"r1.png", id:"r1"},
			{src:"arrow.png", id:"arrow"},
			{src:"i01.jpg", id:"i01"},
			{src:"i02.jpg", id:"i02"},
			{src:"i03.jpg", id:"i03"},
			{src:"ii03.jpg", id:"ii03"},
			{src:"i04.jpg", id:"i04"},
			{src:"i05.jpg", id:"i05"},
			{src:"i06.jpg", id:"i06"},
			{src:"i07.jpg", id:"i07"},
			{src:"ii07.jpg", id:"ii07"},
			{src:"i08.jpg", id:"i08"},
			{src:"ii08.jpg", id:"ii08"},
			{src:"i09.jpg", id:"i09"},
			{src:"ii10.jpg", id:"i10"},
			{src:"ii11.jpg", id:"i11"},
			{src:"ii12.jpg", id:"i12"},
			{src:"ii13.jpg", id:"i13"},
			{src:"i14.jpg", id:"i14"},
			{src:"ii15.jpg", id:"i15"},
			{src:"i16.jpg", id:"ii16"},
			{src:"ii16.jpg", id:"i16"},
			{src:"ii17.jpg", id:"i17"},
			{src:"ii18.jpg", id:"i18"},
			{src:"i19.jpg", id:"i19"},
			{src:"i20.jpg", id:"i20"},
			{src:"ii21.jpg", id:"i21"},
			{src:"ii22.jpg", id:"i22"},
			{src:"i23.jpg", id:"i23"},
			{src:"ii24.jpg", id:"i24"},
			{src:"ii25.jpg", id:"i25"},
			{src:"ii26.jpg", id:"i26"},
			{src:"ii27.jpg", id:"i27"},
			{src:"ii28.jpg", id:"i28"},
			{src:"ii29.jpg", id:"i29"},
			{src:"i30.jpg", id:"i30"},
			{src:"ii31.jpg", id:"i31"},
			{src:"ii32.jpg", id:"i32"},
			{src:"ii33.jpg", id:"i33"},
			{src:"ii34.jpg", id:"i34"},
			{src:"ii35.jpg", id:"i35"},
			{src:"i36.jpg", id:"i36"},
			{src:"i37.jpg", id:"i37"},
			{src:"ii38.jpg", id:"i38"},
			{src:"i39.jpg", id:"i39"},
			{src:"i40.jpg", id:"i40"},
			{src:"i41.jpg", id:"i41"},
			{src:"i42.jpg", id:"i42"},
			{src:"ii43.jpg", id:"i43"},
			{src:"ii44.jpg", id:"i44"},
			{src:"ii45.jpg", id:"i45"},
			{src:"ii46.jpg", id:"i46"},
			{src:"i47.jpg", id:"i47"},
			{src:"ii48.jpg", id:"i48"},
			{src:"ii49.jpg", id:"i49"},
			{src:"ii50.jpg", id:"i50"},
			{src:"ii51.jpg", id:"i51"},
			{src:"i52.jpg", id:"i52"},
			{src:"i53.jpg", id:"i53"},
			{src:"ii53.jpg", id:"ii53"},
			{src:"ii54.jpg", id:"i54"},
			{src:"ii55.jpg", id:"i55"},
			{src:"ii56.jpg", id:"i56"},
			{src:"iii57.jpg", id:"i57"},
			{src:"i58.jpg", id:"i58"},
			{src:"i59.jpg", id:"i59"},
			{src:"i60.jpg", id:"i60"},
			{src:"i61.jpg", id:"i61"},
			{src:"ii60.jpg", id:"ii60"},
			{src:"i64.jpg", id:"i64"},
			{src:"i62.jpg", id:"i62"},
			{src:"i63.jpg", id:"i63"},
			{src:"bee.png", id:"bee"},
			{src:"cicada.mp3", id:"cicada"},
			{src:"fly.mp3", id:"fly"},
			{src:"q1.mp3", id:"q1"},
			{src:"voice1.mp3", id:"sound"}
		];


		loader = new createjs.LoadQueue(false, "assets/");
		loader.installPlugin(createjs.Sound);
		loader.on("progress", Ugd.handleProgress);
        loader.on("complete", Ugd.loadComplete);
		loader.loadManifest(manifest);
	}

    Ugd.handleProgress = function (event) {
//    	console.log(event.loaded);
        Ugd.bar.scaleX = event.loaded * 300;
     	stage.update();
    }

	// Инициация даных после загрузги asseta
	Ugd.loadComplete = function(event){
		stage.removeAllChildren();
		var w = Ugd.screen.w,
			h = Ugd.screen.h;
		Ugd.icons["help"]=loader.getResult("help");
		Ugd.icons["exit"]=loader.getResult("exit");	
		Ugd.icons["copyright"]=loader.getResult("copyright");	
		var icn = Ugd.icons;


		// Init Intro screen
		var fon = new createjs.Shape();
		fon.graphics.beginBitmapFill(loader.getResult("fon")).drawRoundRect(0,0,w,h,20);
		var img_bug = loader.getResult("bug");
		var fon_bug = new createjs.Bitmap(img_bug);
		fon_bug.regX = img_bug.width >> 1;
		fon_bug.regY = 1000;	
		fon_bug.x = 260;
		fon_bug.y = 1000 + (h - img_bug.height) + 5;	
		fon_bug.rotation = -2;
		createjs.Tween.get(fon_bug,{loop:true})
	    	.to({rotation:2}, 7000)
	    	.to({rotation:-2}, 7000);
		var b_game = new Button({text:"Игра", font:"60px Arial", color:"#FFF", span:40}, "#f8b502");
		b_game.x = w-360;
		b_game.y = h-150;		
		b_game.addEventListener("click", function(){
			Ugd.setScreen("Quest");
			Ugd.bug.x  = w + 20;
			Ugd.play = true;
		});
		var b_cright = new createjs.Bitmap(icn["copyright"]);
		b_cright.cursor = "pointer";
		b_cright.x = w-(icn["copyright"].width+10+icn["help"].width+10+icn["exit"].width+20);
		b_cright.y = 20;		
		b_cright.addEventListener("click", function(){Ugd.setScreen("About")});

		var b_help = new createjs.Bitmap(icn["help"]);
		b_help.cursor = "pointer";
		b_help.x = w-(icn["help"].width+10+icn["exit"].width+20);
		b_help.y = 20;		
		b_help.addEventListener("click", function(){Ugd.setScreen("About")});

		var b_exit = new createjs.Bitmap(icn["exit"]);
		b_exit.x = w-(icn["exit"].width+20);
		b_exit.y = 20;		
		b_exit.addEventListener("click", function(){Ugd.setScreen("Intro")});

		var t_intro = new VoiceText({text : [
			{t:"From", p:400},{t:"VOA", p:1500},{t:"Learning", p:2100},{t:"English,", p:2800},{t:"this", p:3050},{t:"is", p:3350},{t:"In", p:3800},
			{t:"the", p:4000},{t:"News.", p:5450},{t:"President", p:5950},{t:"Obama", p:6600},{t:"traveled", p:7200},{t:"for", p:7500},{t:"two", p:7900},
			{t:"days", p:8600},{t:"after", p:8900},{t:"giving", p:9600},{t:"his", p:10000},{t:"State", p:10500},{t:"of", p:10700},{t:"the", p:10900},
			{t:"Union", p:11600},{t:"speech", p:12100},{t:"to", p:12250},{t:"Congress", p:12950},{t:"and", p:13300},{t:"the", p:13600},{t:"nation", p:14250},
			{t:"earlier", p:14750},{t:"this", p:15050},{t:"week.", p:15400}
			], voice:"sound", font:"22px Arial", color:["#FFF", "#FF1"], interval:15, x:200, y:200, w:450, h:200
		});
		t_intro.x = 500;
		t_intro.y = 120;
		Ugd.t = t_intro;
		var  scrIntro = new Scr(w, h, "#FFF", "cicada");
		scrIntro.addElement([t_intro, b_game, b_help, b_exit, b_cright, fon_bug, fon]);
		Ugd.screen.child["Intro"] = scrIntro;


		// Init About screen
		var t_about = new VoiceText({text : [
			{t:"From", p:400},{t:"VOA", p:1500},{t:"Learning", p:2100},{t:"English,", p:2800},{t:"this", p:3050},{t:"is", p:3350},{t:"In", p:3800},
			{t:"the", p:4000},{t:"News.", p:5450},{t:"President", p:5950},{t:"Obama", p:6600},{t:"traveled", p:7200},{t:"for", p:7500},{t:"two", p:7900},
			{t:"days", p:8600},{t:"after", p:8900},{t:"giving", p:9600},{t:"his", p:10000},{t:"State", p:10500},{t:"of", p:10700},{t:"the", p:10900},
			{t:"Union", p:11600},{t:"speech", p:12100},{t:"to", p:12250},{t:"Congress", p:12950},{t:"and", p:13300},{t:"the", p:13600},{t:"nation", p:14250},
			{t:"earlier", p:14750},{t:"this", p:15050},{t:"week.", p:15400}
			], voice:"sound", font:"32px Arial", color:["#ddd", "#FF0"], interval:15, x:200, y:200, w:850, h:200
		});
		t_about.x = 20;
		t_about.y = 100;
		Ugd.b_exit = new createjs.Bitmap(icn["exit"]);
		Ugd.b_exit.x = w-(icn["exit"].width+20);
		Ugd.b_exit.y = 20;		
		Ugd.b_exit.addEventListener("click", function(){Ugd.setScreen("Intro")});
		var  scrAbout = new Scr(w, h, "#000");
		scrAbout.addElement([ t_about, Ugd.b_exit]);
		Ugd.screen.child["About"] = scrAbout;


		// Init Task screen
		Ugd.tasks = [];
		Ugd.results = [];
		for (var i = 0; i < tasks.length; i++) {
			var  scrTask = new Task(tasks[i], w, h);
			Ugd.tasks.push(scrTask);
		};

	    // Init Quest screen
	    Ugd.bug = new createjs.Bitmap(loader.getResult("bee"));
	    Ugd.bug.x = w+10;
	    Ugd.bug.y = 200;
	    createjs.Tween.get(Ugd.bug,{loop:true})
	    	.to({x:w-w/4,y:100}, 1000)
	    	.to({x:w-w/2,y:170}, 1000)
	    	.to({x:w-w/2-w/4,y:180}, 1000)
	    	.to({x:0, y:250}, 1000)
	    	.to({x:w+10, y:100},1);

		var btn5= new createjs.Bitmap(icn["exit"]);
		btn5.x = w-(icn["exit"].width+20);
		btn5.y = 20;			
		btn5.addEventListener("click", function(){
			Ugd.play = false;
			Ugd.setScreen("Intro")
		});

		var sky = new createjs.Shape();
		sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRoundRect(0,0,w,h,20);
		var groundImg = loader.getResult("ground");
		Ugd.ground = new createjs.Shape();
		Ugd.ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w+groundImg.width, groundImg.height);
		Ugd.ground.tileW = groundImg.width;
		Ugd.ground.y = h-groundImg.height;
		Ugd.hill = new createjs.Bitmap(loader.getResult("hill"));
		Ugd.hill.setTransform(Math.random() * w, h-Ugd.hill.image.height*3-groundImg.height, 3, 3);
		Ugd.hill2 = new createjs.Bitmap(loader.getResult("hill2"));
		Ugd.hill2.setTransform(Math.random() * w, h-Ugd.hill2.image.height*3-groundImg.height, 3, 3);	
		Ugd.data = new createjs.SpriteSheet({
			"images": [loader.getResult("grant")],
			"frames": {"regX": 0, "height": 374, "count": 64, "regY": 0, "width": 229},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {"run": [0, 25, "run", 1.4], "jump": [26, 63, "run"]}
		});
		Ugd.grant = new createjs.Sprite(Ugd.data, "run");
		Ugd.grant.setTransform(w/2, 130, 0.8, 0.8); //2й параметр отступ от верха экрана
		Ugd.grant.framerate = 30;
		var scrQuest = new Scr(w, h, "#000", "fly");
		scrQuest.addElement([btn5, Ugd.grant, Ugd.bug, Ugd.ground, Ugd.hill2, Ugd.hill, sky]);
		for (var i = 0; i < Ugd.tasks.length; i++) {
			var icn1 = new createjs.Bitmap(loader.getResult("r0"));
			icn1.x = 40+(40*i);
			icn1.y = 40;	
			Ugd.results.push({icon:icn1, status:0});
			scrQuest.addElement([icn1]);
		};
		Ugd.screen.child["Quest"] = scrQuest;

		stage.addChild(scrIntro);
		createjs.Sound.play(scrIntro.sound, {loop:30});
		stage.addEventListener("stagemousedown", Ugd.handleJumpStart);	
		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", Ugd.tick);	
	}

	Ugd.handleJumpStart = function(evt) {
		if(Ugd.screen.curent == "Quest" && evt.stageY > 70) Ugd.grant.gotoAndPlay("jump");
	}

	Ugd.gameover = function() {
		var res = 0;
		for (var i = 0; i < Ugd.tasks.length; i++) {
			res = res + 12*Ugd.tasks[i].status;
		};
		Ugd.loadComplete();
		// Init gameover screen
		var t_go = new createjs.Text("Игра закончена!\n\nВаш результат:","58px Arial","#fff");
		t_go.x = 200;
		t_go.y = 50;
		var t_res = new createjs.Text(res,"78px Arial","#f00");
		t_res.x = 350;
		t_res.y = 300;
		var  scrGameOver = new Scr(Ugd.screen.w, Ugd.screen.h, "#000");
		scrGameOver.addElement([ t_res, t_go, Ugd.b_exit]);
		Ugd.screen.child["GameOver"] = scrGameOver;
		Ugd.setScreen("GameOver");
		Ugd.taskcount = 0;
	}


	Ugd.tick = function(event){
		if (Ugd.play){
			var w = Ugd.screen.w,
				h = Ugd.screen.h,
				deltaS = event.delta/1000,
				position = Ugd.grant.x+150*deltaS;
			
			var grantW = Ugd.grant.getBounds().width*Ugd.grant.scaleX;
			Ugd.grant.x = (position >= w/2) ? w/2 : position;

			Ugd.ground.x = (Ugd.ground.x-deltaS*200) % Ugd.ground.tileW;
			Ugd.hill.x = (Ugd.hill.x - deltaS*30);
			if (Ugd.hill.x + Ugd.hill.image.width*Ugd.hill.scaleX <= 0) { Ugd.hill.x = w; }
			Ugd.hill2.x = (Ugd.hill2.x - deltaS*45);
			if (Ugd.hill2.x + Ugd.hill2.image.width*Ugd.hill2.scaleX <= 0) { Ugd.hill2.x = w; }
		
			if(Ugd.bug.x < w/2+40 && Ugd.bug.x > w/2+30 && Ugd.grant.currentFrame >=40  && Ugd.grant.currentFrame <= 49 ){
				Ugd.grant.gotoAndPlay("run");
				createjs.Sound.stop();
				Ugd.setTask(Ugd.taskcount);
				Ugd.t = Ugd.tasks[Ugd.taskcount].text;
				if(typeof(Ugd.t.text) == "object") Ugd.t.play();
			}
		}
		if(Ugd.t && Ugd.t.active){
				Ugd.t.listen();
		}
		stage.update(event);

	}
	
})(window.Ugd = {});


// buttons
(function() {
	var Button = function(label, color) {
	  this.initialize(label, color);
	}
	var p = Button.prototype = new createjs.Container(); // inherit from Container
	p.Container_initialize = p.initialize;
	p.initialize = function(label, color) {
		this.Container_initialize();
		this.label = label;
		if (!color) { color = "#CCC"; }
		var text = new createjs.Text(label.text,label.font, label.color);
		text.textBaseline = "top";
		text.textAlign = "center";
		var width = text.getMeasuredWidth()+label.span;
		var height = text.getMeasuredHeight()+30;
		this.background = new createjs.Shape();
		if (typeof(color) == "string")
			this.background.graphics.beginFill(color).drawRoundRect(0,0,width,height,10);
		else 
			this.background.graphics.beginBitmapFill(color).drawRoundRect(0,0,width,height,10);
		text.x = width/2;
		text.y = 10;
		this.addChild(this.background,text);
	}
	window.Button = Button;
}());


// screens
(function() {
	var Scr = function(w, h, color, sound) {
	  this.initialize(w, h, color, sound);
	}
	var p = Scr.prototype = new createjs.Container(); // inherit from Container
	p.Container_initialize = p.initialize;
	p.initialize = function(w, h, color, sound) {
		this.Container_initialize();
		if (sound) {this.sound = sound;}
		if (!color) {color = "#CCC";}
		this.background = new createjs.Shape();
		this.background.graphics.beginFill(color).drawRoundRect(0,0,w,h,20);
		this.addChild(this.background);
	}
	p.addElement = function(child) {
		for (var i = child.length - 1; i >= 0; i--) {
			this.addChild(child[i]);
		};
	}
	window.Scr = Scr;
}());


// tasks
(function() {
	var Task = function(obj, w , h) {
	  this.initialize(obj, w, h);
	}
	var p = Task.prototype = new createjs.Container(); // inherit from Container
	p.Container_initialize = p.initialize;
	p.initialize = function(obj, w, h) {
		var self = this;
		this.status = 0;
		if (typeof(obj.text.text) == "string"){
			this.text = new createjs.Text(obj.text.text,obj.text.font,obj.text.color[0]);
		} 
		else {
			this.text = new VoiceText(obj.text);
		}
		this.text.x = obj.text.x;
		this.text.y = obj.text.y;
		this.Container_initialize();
		this.background = new createjs.Shape();
		this.background.graphics.beginFill("#000").drawRoundRect(0,0,w,h,0);
		this.addChild(this.background, this.text);
		for (var i = 0; i < obj.ques.length; i++) {
			var q = obj.ques[i];
			var bm = new createjs.Bitmap(loader.getResult(q.i));
			bm.x = q.x;
			bm.y = q.y;
			bm.s = q.s;
			if(q.r)bm.rotation = q.r;
			if (q.s != undefined){
				bm.addEventListener("click", function(ev){
					self.status = ev.currentTarget.s;
					if(typeof(self.text.text) == "object")self.text.stop();
					Ugd.setResult(Ugd.taskcount);
					Ugd.taskcount++;
					if(Ugd.taskcount == Ugd.tasks.length)Ugd.gameover();
					else Ugd.setScreen("Quest");
				});
			}
			this.addChild(bm);	
		};		


	}
	window.Task = Task;
}());


// voiced text
(function() {
	var VoiceText = function(obj) {
	  this.initialize(obj);
	}
	var p = VoiceText.prototype = new createjs.Container(); // inherit from Container

	p.icon=[];
	p.current;
	p.Container_initialize = p.initialize;
	p.initialize = function(obj) {
		var self = this;
		this.sound;
		this.words = [];
		this.curentword = 0;
		this.active = false;
		this.color = obj.color;
		this.voice = obj.voice;
		this.text = obj.text;
		this.Container_initialize();
		this.icon[0] = loader.getResult("stop");
		this.icon[1] = loader.getResult("play");
		this.button = new createjs.Bitmap(this.icon[1]);
		var x = 10,
			y = 10;
		for (var i=0;i<obj.text.length;i++){
			var t = new createjs.Text(obj.text[i].t, obj.font, obj.color[0]);
			t.x = x;
			t.y = y;
			x += t.getMeasuredWidth()+obj.interval;
			if(x >= obj.w){
				t.x = 0;
				x = t.getMeasuredWidth()+obj.interval;
				y += t.getMeasuredHeight()+obj.interval;
				t.y = y;
			}
			this.words[i]=t;
			this.addChild(t); 
		}
		this.button.x = x;
		this.button.y = y-10;		
		this.button.addEventListener("click", function(){
			if(self.active){self.stop();} 
			else{self.play();}
		});
		this.addChild(this.button);
	}
	p.play = function () {
		this.active = true;
		this.button.set({image : this.icon[0]});
		this.sound =  createjs.Sound.play(this.voice);
		Ugd.t = this;
	}
	p.stop = function () {
		this.active = false;
		this.button.set({image : this.icon[1]});
		this.sound.stop();
		this.words[this.curentword].color = this.color[0];
		this.curentword = 0;
	}
	p.listen = function (){
console.log(this.sound.getPosition());
		this.words[this.curentword].color = this.color[1];
		if (this.sound.getPosition() > this.text[this.curentword].p){
			this.words[this.curentword].color = this.color[0];
			this.curentword++;
		} 
		if (this.curentword >= this.words.length){
			this.curentword = 0;
			this.stop();
		}
	}
	window.VoiceText = VoiceText;
}());
