(function(){
  //присваиваем элемент канвас
  var canvas = document.createElement('canvas'),
  //определим контекст как 2d
  ctx = canvas.getContext('2d'),
  //определим ширину и высоту
  w = canvas.width = innerWidth,
  h = canvas.height = innerHeight,
  //массив с частицами
  particles = [],
  //для удобства
  properties = {
    bgColor : 'rgba(17,17,19,1)',

    //свойство цвета частицы
    particalColor : 'rgba(255, 255, 0, 1)',

    //радиус частицы
    particalRadius : 3,

    //партикл количество
    particlesCount : 100,

    //скорость
    particleMaxVelocity : 0.5,

    //длина линии
    lineLength : 150,
  };

  //получим элемент body и поместим в него канвас
  document.querySelector('body').appendChild(canvas);

  //функция срабатывающая в момент изменения размера окна
  window.onresize = function(){
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight;
  }

  class Particle{
    constructor(){
      //положение
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
      this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
    }

    //метод обновляющий позицию
    position(){
      this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
      this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY*=-1 : this.velocityY;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    //отрисовывает частицы на канвас
    reDreaw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particalRadius, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = properties.particalColor;

      ctx.fill();
    }
  }

function reDrawBackground(){
  //цвет заливки
  ctx.fillStyle = properties.bgColor;
  //заливка
  ctx.fillRect(0, 0, w, h);
}

function drawLines(){
  var x1, y1, x2, y2, length, opacity;
  for(var i in particles){
      for(var j in particles){
        x1 = particles[i].x;
        y1 = particles[i].y;

        x2 = particles[j].x;
        y2 = particles[j].y;

        length = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));

        if(length < properties.lineLength){
            opacity = 1 - length / properties.lineLength;
            ctx.lineWidth = '0.5';
            ctx.strokeStyle = 'rgba(255, 255, 0, '+opacity+')';
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
        }

      }
  }

}

//перерисовка частиц
function reDrawParticles(){
  for (var i in particles){
    particles[i].position();
    particles[i].reDreaw();
  }
}

function loop(){
  //перерисовать фон
  reDrawBackground();
  reDrawParticles();
  //рисуем линию
  drawLines();
  //вызывает функцию 60 раз в секунду
  requestAnimationFrame(loop);
}

function init(){
  //запуск рекурсии
  for(var i = 0 ; i < properties.particlesCount ; i++){
    //добавляем частицы в массив
      particles.push(new Particle);
    }

  loop();
}

  init();

}())
