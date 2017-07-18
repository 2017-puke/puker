$(document).ready(function(){
let fleg=2;
class Canvas{
	constructor(pen){
		this.pen=pen;
		this.shadowColor='red';
		this.shadowBlur=0;
		this.fillColor='yellow';
		this.strokeColor='blue';
		this.lineWidth=1;
		this.linearBegin='blue';
		this.linearOver='pink';
		this.n=3;
		this.r=30;
		this.w=10;
		this.fontSize='20px';
		this.fontFamily='宋体';
		
	}
	style(){
		this.shadow();
		this.fill();
		this.stroke();
	}
	shadow() {
		this.pen.shadowBlur=this.shadowBlur;
		this.pen.shadowColor=this.shadowColor;
	}
	fill() {
		this.pen.fillStyle=this.fillColor;
	}
	stroke() {
		this.pen.strokeStyle=this.strokeColor;
		this.pen.lineWidth=this.lineWidth;
	}
	linear(x,y,x1,y1){
		let linear=this.pen.createLinearGradient(x,y,x1,y1);
		linear.addColorStop(0,this.linearBegin);
		linear.addColorStop(1,this.linearOver);
		if(fleg==1){
			this.pen.fillStyle=linear;
		}else{
			this.pen.strokeStyle=linear;
		}	
	}
	radial(x,y,x1,y1){
		let  a=(x1-x)/2;
		let  b=(y1-y)/2;
		let radial=this.pen.createRadialGradient(a,b,0,a,b,a);
		radial.addColorStop(0,this.linearBegin);
		radial.addColorStop(1,this.linearOver);
		if(fleg==1){
			this.pen.fillStyle=radial;
		}else{
			this.pen.strokeStyle=radial;
		}
	}
	rect(x,y,x1,y1){
		this.pen.beginPath();
		if(fleg==1){
			this.pen.fillRect(x,y,x1-x,y1-y);
		}else{
			this.pen.lineWidth=this.lineWidth;
			this.pen.strokeRect(x,y,x1-x,y1-y);
		}
		this.pen.closePath();
	}
	line(x,y,x1,y1){
		this.pen.beginPath();
		this.pen.moveTo(x,y);
		this.pen.lineTo(x1,y1);
		this.pen.lineWidth=this.lineWidth;
		this.pen.stroke();
		this.pen.closePath();
	}
	circle(x,y,x1,y1){
		let r=Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
		this.pen.beginPath();
		this.pen.arc(x,y,r,0,Math.PI*2);
		if(fleg==1){
			this.pen.fill();
		}else{
			this.pen.lineWidth=this.lineWidth;
			this.pen.stroke();
		}
		this.pen.closePath();
	}
	duobianxing(x,y,x1,y1){
		let r=Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
		let ren=360/(this.n);
		this.pen.beginPath();
		for(let i=0;i<(this.n);i++){
			let a=x+Math.sin((i*ren+45)*Math.PI/180)*r;
			let b=y+Math.cos((i*ren+45)*Math.PI/180)*r;
			this.pen.lineTo(a,b);
		};
		this.pen.closePath();
		if(fleg==1){
			this.pen.fill();
		}else{
			this.pen.lineWidth=this.lineWidth;
			this.pen.stroke();
		}
	}
	radiuroct(x,y,x1,y1){
		let r=this.r;
		this.pen.beginPath();
		this.pen.moveTo(x+r,y);
		this.pen.arcTo(x1,y,x1,y+r,r);
		this.pen.arcTo(x1,y1,x1-r,y1,r);
		this.pen.arcTo(x,y1,x,y1-r,r);
		this.pen.arcTo(x,y,x+r,y,r);
		this.pen.closePath();
		if(fleg==1){
			this.pen.fill();
		}else{
			this.pen.lineWidth=this.lineWidth;
			this.pen.stroke();
		}
	}
	clear(x,y,x1,y1){
		let w=this.w;
		let a=x1-(w/2);
		let b=y1-(w/2);
		this.pen.clearRect(a,b,w,w);	
	}
	word(x,y,value){
		this.pen.font=(`${this.fontSize} ${this.fontFamily}`)
		if(fleg==1){
			
			this.pen.fillText(value,x,y);
			
		}else{
			this.pen.lineWidth=1;
			this.pen.strokeText(value,x,y);	
		}
	}
};

let newCanvas=$('.top .gongneng button:nth-child(2)');
let downCanvas=$('.top .gongneng button:nth-child(3)')
let obj,arr=[],brr=[];
let select='rect';
let r=$('#r');
let n=$('#n');

newCanvas.click(function(){
	let canvas=$('canvas');
	if(canvas.length){
		let resule=window.confirm('是否保存？');
		if(resule){
			let data=canvas[0].toDataURL('image/png');
			window.open(data.replace('data:image/png','data:stream/octet')) ;
		}
		document.body.removeChild(canvas[0]);
		arr=[];
	}	

		$(document.body).append($('<canvas width="1000" height="500"></canvas>'));
		let s=$('canvas')[0].getContext('2d');
		let objCanvas=new Canvas(s);
		let buttons=$('.shape button');
		buttons.each((index,value)=>{
			$(value).click(function(){
				buttons.each((index,value)=>{
					$(value).removeClass('open');
				})
				$(value).addClass('open');
				if($(value).attr('style')=='duobianxing'){
					$('#n').css('display','block');
					$('#r').css('display','none');
				}else if($(value).attr('style')=='radiuroct'){
					$('#n').css('display','none');
					$('#r').css('display','block');
				}else{
					$('#n').css('display','none');
					$('#r').css('display','none');
				}
				select=$(value).attr('style');	 
				function upDown(e){
					e.preventDefault();
					if(e.wheelDelta==120){
						objCanvas.w++;
						if(objCanvas.w>=50){
							objCanvas.w=50;
						}
					}else{
						objCanvas.w--;
						if(objCanvas.w<=10){
							objCanvas.w=10;
						}
					}
				}
				if(select=='clear'){
					document.body.removeEventListener('mousewheel',upDown,false);
					$(document).keydown(function(even){
						if(even.keyCode==32){
							event.preventDefault();
							document.body.addEventListener('mousewheel',upDown,false)
						}
					})
				}
			})
		});
		let x,y,x1,y1;
		$('canvas').mousedown(function(e){
			console.log(arr.length)
			e.preventDefault();
			x=e.offsetX,y=e.offsetY;
			$('canvas').on('mousemove',function (e){
				
				x1=e.offsetX;
				y1=e.offsetY;
				console.log(arr.length)
				if(select!='clear'){
						objCanvas.pen.clearRect(0,0,$('canvas').width(),$('canvas').height());
					if(arr.length>0){
						objCanvas.pen.putImageData(arr[arr.length-1],0,0);	
					}
				}
				objCanvas[select](x,y,x1,y1);	
			})	
		})
		$('canvas').mouseup(function(e){
			if(select=='font'){
				objCanvas.fontFamily=prompt('请输入字体样式','eg：楷体');
				let inner=prompt('请输入一段文字','eg：我是谁');
				if(inner){
					objCanvas.word(e.offsetX,e.offsetY,inner);
				}
				arr.push(objCanvas.pen.getImageData(0,0,$('canvas').width(),$('canvas').height()));
			}else{
				arr.push(objCanvas.pen.getImageData(0,0,$('canvas').width(),$('canvas').height()));
			}
			$('canvas').off('mousemove');
			brr=[];
		})
		
		//选择填充还是描边
		let tc=[...document.querySelectorAll('.style input')].filter((value)=>value.name=='tianchong');
		let fillcolor=$('.style input:nth-child(6)');
		let strokecolor=$('.style input:nth-child(7)');
		strokecolor.change(function(){
			objCanvas.strokeColor=strokecolor.val();
			objCanvas.style();
		})
		
		fillcolor.change(function(){
			objCanvas.fillColor=fillcolor.val();
			objCanvas.style();
		})
		
		$(tc[0]).click(function(){
			fleg=2;
			fillcolor.css('display','none');
			strokecolor.css('display','block');	
		})
		
		$(tc[1]).click(function(){
			fleg=1;
			fillcolor.css('display','block');
			strokecolor.css('display','none');	
		})
		//选择填充方式
		let way=$('.style select');
		let begin=$('.style input:nth-child(8)');
		let over=$('.style input:nth-child(9)');
		begin.change(function(){
			objCanvas.linearBegin=begin.val();
			if(way.val()=='线性渐变填充'){
				objCanvas.linear(0,0,1000,400);
			}else if(way.val()=='角度填充'){
				objCanvas.radial(0,0,1000,400);
			}else{
				over.css('display','none');
				begin.css('display','none');
				objCanvas.style();
			}
		})
		over.change(function(){
			objCanvas.linearOver=over.val();
			if(way.val()=='线性渐变填充'){
				objCanvas.linear(0,0,1000,400);
			}else if(way.val()=='角度填充'){
				objCanvas.radial(0,0,1000,400);
			}else{
				over.css('display','none');
				begin.css('display','none');
				objCanvas.style();
			}
		})
		way.click(function(){
			if(way.val()=='线性渐变填充'||way.val()=='角度填充'){
				strokecolor.css('display','none');
				fillcolor.css('display','none');
				over.css('display','block');
				begin.css('display','block');
			}else{
				over.css('display','none');
				begin.css('display','none');
			}
				
		})
		//撤销回撤操作
		let before=$('.before');
		let next=$('.next');
		before.click(function(){
			if(arr.length>1){
				brr.push(arr.pop());
				objCanvas.pen.putImageData(arr[arr.length-1],0,0);
			}else{
				if(arr.length==1){
					brr.push(arr.pop());
				}
				arr=[];
				objCanvas.pen.clearRect(0,0,$('canvas').width(),$('canvas').height());
				
			}
		})
		next.click(function(){
			if(brr.length>0){
				arr.push(brr.pop());
				objCanvas.pen.putImageData(arr[arr.length-1],0,0);
			}else{
				alert('没有下一步了')
			}
		})	
		//上传图片
		$('input[type=file]').change(function(){
			let file=this.files[0];
			let f=new FileReader;
			f.readAsDataURL(file);
			f.onload=function(){
				objCanvas.pen.drawImage($('<img>').attr('src',this.result)[0],0,0);
				arr.push(objCanvas.pen.getImageData(0,0,$('canvas').width(),$('canvas').height()));
			}
		})
		
		//选择阴影效果
		let setshadow=$('.setshdow');
		let removeshadow=$('.removeshdow');
		let shadowcolor=$('#shadowcolor');
		let shadowblur=$('#shadowblur');
		setshadow.change(function(){
			shadowblur.css('display','block');
			shadowcolor.css('display','block');
		})
		removeshadow.change(function(){
			shadowblur.css('display','none');
			shadowcolor.css('display','none');
			objCanvas.shadowBlur=0;
			objCanvas.style();
		})
		shadowcolor.change(function(){
			objCanvas.shadowColor=$(this).val();
			objCanvas.style();
		})
		shadowblur.change(function(){
			objCanvas.shadowBlur=$(this).val();
			objCanvas.style();
		})
		//设置多边形的变数
	
		n.change(function(){
			if($(this).val()){
				objCanvas.n=parseInt($(this).val());
			}
			
		})
		
		//设置圆角矩形角度
		
		r.change(function(){
			if($(this).val()){
				objCanvas.r=parseInt($(this).val()) ;
			}
		})
		
		//设置线宽
		
		function lineW(e){
			e.preventDefault();
			if(e.wheelDelta==120){
				objCanvas.lineWidth++;
				if(objCanvas.lineWidth>=20){
					objCanvas.lineWidth=20;
				}
			}else{
				objCanvas.lineWidth--;
				if(objCanvas.lineWidth<=1){
					objCanvas.lineWidth=1;
				}
			}
		}	
		function font(e){
			e.preventDefault();
			if(e.wheelDelta==120){
				objCanvas.fontSize=parseFloat(objCanvas.fontSize)+1+'px';
			}else{
				objCanvas.fontSize=parseFloat(objCanvas.fontSize)-1+'px';
			}
		}
		
		
		$(document).keydown(function(e){
			if(e.altKey){
				e.preventDefault();
				document.body.addEventListener('mousewheel',lineW,false);
			}else{
				document.body.removeEventListener('mousewheel',font,false);
				document.body.removeEventListener('mousewheel',lineW,false);
				if(e.keyCode==38){
					document.body.addEventListener('mousewheel',font,false);	
				}
			}
		})
		
		
		//添加文字	
		$('canvas').dblclick(function(e){
			select='font';
		})		
})
//保存画布
downCanvas.click(function(){
	let data=$('canvas')[0].toDataURL('image/png');
	window.open(data.replace('data:image/png','data:stream/octet')) ;
})

//使用方式介绍
$('.way').click(function(){
	$('.intrdus').slideToggle();
})


//开始动画

class Orbit {
  constructor(target, dumping=10, from={ x: 0, y: 0 }, to={ x: 0, y: 0 }) {
    this.__target = target
    this.dumping = dumping;
    this.desire_rotateZ = -to.y;
    this.desire_rotateX = -to.x;
    this.rz = from.y;
    this.rx = from.x;
    this.isDragging = false;
    this.previousMousePosition = {
      x: 0,
      y: 0
    };
    this.behaviours();
  }
  
  behaviours(){
    $(document).on("mousedown", this.handleDown.bind(this))
    $(document).on("mouseup",   this.handleUp.bind(this))
    $(document).on("mousemove", this.handleMove.bind(this))
    window.requestAnimationFrame(this.update.bind(this));
  }
  
  handleDown(e){
    this.isDragging = true;
    if( !this.firstDrag ){
      this.previousMousePosition = {
        x: e.pageX,
        y: e.pageY
      }
      this.firstDrag = true;
    }
  }
   
  handleUp(e){
    this.isDragging = false;
  }
   
  handleMove(e){
    let deltaMove = {
        x: e.pageX-this.previousMousePosition.x,
        y: e.pageY-this.previousMousePosition.y
    };
  
    if(this.isDragging){
      this.desire_rotateZ += deltaMove.x;
      this.desire_rotateX += deltaMove.y;
    }
    
    this.previousMousePosition = {
          x: e.pageX,
          y: e.pageY
    };
  }

  rotation(x, y){
    this.desire_rotateZ = x;
    this.desire_rotateX = y;
  }
  
  update(){
    this.rz += (( (this.desire_rotateZ*-1) - this.rz) / this.dumping);
    this.rx += (( (this.desire_rotateX*-1) - this.rx) / this.dumping);
    this.__target.css({
      "transform": "translateZ(-300px) rotateX("+this.rx+"deg) rotateZ("+this.rz+"deg)"
    })
    window.requestAnimationFrame(this.update.bind(this));
  }
}

let orbit1 = new Orbit( $("#plane1"), 40, { x: 0,  y: 0 }, { x: 0, y: 0 } )

function animate(){
  $(".item").removeClass("animate")
  setTimeout(function(){
    $(".item").addClass("animate")
  }, 250)
  setTimeout(animate, 6000);
}

animate()

let t=setTimeout(function(){
	$('.donghua').slideUp(500)
},4000)

})
		
		
