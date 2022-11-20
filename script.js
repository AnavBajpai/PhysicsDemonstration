window.addEventListener('load', function() {

  //random note: the boxes in this game are called cannons because this was origionally gonna be a cannon physics game

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 250;
  keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    e: false,
  };
  keys2 = ["x", "y", "z"]
  key2 = 0;


 
  class Cannon {
    constructor(game) {
      this.game = game;
      this.x = 225;
      this.y = 130;
      this.z = 0;
      this.dx = 0;
      this.dy = 0;
      this.dz = 0;
    }
    addAngle() {
      this.z++;
    }
    subtractAngle() {
      this.z--;
    }
    accelerate(dxs) {
      this.dx2 = 0;
      if (keys2[key2] == "x") {
        this.dx2 = .02
      } else if (keys2[key2] == "y") {
        this.dx2 = .015
      } else if (keys2[key2] == "z") {
        this.dx2 = .01
      }
      if (this.dx > 9) {
        this.dx = 9;
      }
      else if (this.dx < -9) {
        this.dx = -9
      }
      this.dx = this.dx + dxs * this.dx2;
    }
    accelerate3() {
      if (keys2[key2] == "x") {
        this.dy += .1
      } else if (keys2[key2] == "y") {
        this.dy += .15
      } else if (keys2[key2] == "z") {
        this.dy += .2
      }
    }
    accelerate2() {
      this.dxC = 0;
      if (keys2[key2] == "x") {
        this.dxC = .00125
      } else if (keys2[key2] == "y") {
        this.dxC = .02250
      } else if (keys2[key2] == "z") {
        this.dxC = .05500
      }
      if (this.dx >= 0) {
        this.dx += -this.dxC;
      }
      else if (this.dx <= 0) {
        this.dx += this.dxC;
      } else {
        this.dx -= 0.00000;//im goin to add te jump function
        //also if theres time left ill try to add like multiple surfaces for better physics denonstratoin, so theres sections where the gorund is different colored and will have different friction values which reduce acceleration and stuff cool
      }
    }
    x4 = 0;

    update() {
      if (keys.a == true) {
        this.accelerate(-1);

        this.x += this.dx;
      } else if (keys.d == true) {
        this.accelerate(1);
        this.x += this.dx;//man jumps way too high it goes zooming
      } else {
        this.accelerate2();
        this.x += this.dx;
      }
      if (this.x >= 450) {
        console.log(this.x)
        if (key2 == 2) {
          this.x = 450;
          this.dx *= -1;
        }
        else {
          key2 += 1;
          this.x = 1;
        }
      }
      if (this.dx > 0.1) {
        this.z += 2 + (this.dx * .5);
      }
      else if (this.dx < -0.1) {
        this.z += -2 + (this.dx * .5);
      }
      else {

      }
      if (this.x <= 0) {
        if (key2 == 0) {
          this.x = 0;
          this.dx *= -1;
        }
        else {
          key2 -= 1;
          this.x = 450;
        }
      }
      if (keys.e == true && this.y >= 120) {
        this.dy = -4;
      } else {
        if (this.y > 130) return; //i also the square can jump in mid air ok
        //dont add this line yet ok yeah it works nnow is the gravity ok DUDE THE JUMP IS PERFECT nice its like ping pong lol yeah wait i just realised that this doesn't really have anything to do with education anymore yeah that swhy im adding the diffrent surfaces to teach the user about friction and air resistance ye ye cool well i gtg 
      }
      this.y += this.dy;
      this.accelerate3();
    }
    draw(context) {
      this.x9 = canvas.width / 2;
      this.yValue = canvas.height / 2;
      context.save();
      if (keys2[key2] == "x") {
        context.translate(this.x + 25, this.y + 85);

      } else {
        context.translate(this.x + 25, this.y + 55);
      }
      context.rotate(this.z * Math.PI / 180);
      context.translate(-25, -25);
      context.drawImage(boulder, 0, 0, 50, 50);
      context.rotate(-1.39);

      context.restore();


    }
  }

  class UI {

  }
  class Game {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.cannon = new Cannon(this);
    }

    update() {
      this.cannon.update();
    }

    draw(context) {
      this.cannon.draw(context);

    }


  }
  const game = new Game(canvas.width, canvas.height);
  const cannon = new Cannon(this.game);
  const box2 = new Cannon(this.game);
  document.addEventListener('keydown', key => {
    if (key.which == "87") { //w
      keys.w = true;
    }
    if (key.which == "65") { //a it works for w
      keys.a = true;
    }
    if (key.which == "83") { //s
      keys.s = true;
    }
    if (key.which == "68") { //d
      keys.d = true;
    }
    if (key.which == "32") { //space
      key.preventDefault()
      keys.e = true;
      console.log(keys)
    }
    // console.log(this.game.keys);  
  })

  document.addEventListener('keyup', key => {
    if (key.which == "87") { //w
      keys.w = false;
    }
    if (key.which == "65") { //a it works for w
      keys.a = false;
    }
    if (key.which == "83") { //s
      keys.s = false;
    }
    if (key.which == "68") { //d
      keys.d = false;
    }
    if (key.which == "32") { //space
      keys.e = false;
    }
  })


  function animate2() {
    game.update();
    game.draw(ctx);
  }

  //    requestAnimationFrame(animate2);//nvm its not i think this animate function is calling iteself which is probably why its scuffed 

  var draw = setInterval(function() {
    ctx.clearRect(0, 0, 500, 250);

    if (keys2[key2] == "x") {
      ctx.drawImage(background1, 0, 0, 500, 250)
    } else if (keys2[key2] == "y") {
      ctx.drawImage(background2, 0, 0, 500, 250)
    } else if (keys2[key2] == "z") {
      ctx.drawImage(background3, 0, 0, 500, 250)
    }

    //ctx.rotate(1*Math.PI / 180);
    animate2();
  }, 10) //just need to add 2 more background images

});
