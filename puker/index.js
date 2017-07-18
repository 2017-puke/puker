$(document).ready(function(){
//	定义一个空数组存放每张牌的数据
	let arr=[];
//	定一个标识 如果不重复就执行啥啥啥 这玩意里边放的数组
	let sign={};
//	定义花色
	let huase=['h','d','s','c']
//	当数组的长度小于52的时候 循环计算出每张牌的数据
	while(arr.length<52){
		//	有数字
		let num=Math.ceil(Math.random()*13)
		//	每张牌有花色
		let color=huase[Math.floor(Math.random()*huase.length)]
//	//	牌等于花色加数字
		if(!sign[num+'_'+color]){
			sign[num+'_'+color]=true;
			arr.push({num,color})
		}
	}


	let n=0;
	for(let i=0;i<7;i++){
		for(let j=0;j<i+1;j++){
			$("<li class='pai'>").attr({
				id:`${i}_${j}`,
				value:arr[n].num,
			}).css({backgroundImage:`url(img/${arr[n].num}${arr[n].color}.png)`,}).appendTo($("ul")).delay(n*50).animate({
				left:300-50*i+100*j,
				top:50*i,
				opacity:1
			},300)
			n++;
		}
	}
	for(n;n<52;n++){
		$("<li class='pai zuo'>").css({backgroundImage:`url(img/${arr[n].num}${arr[n].color}.png)`}).attr({
				id:`7_${n}`,
				background:`red`,
				value:arr[n].num,
			}).appendTo($("ul")).delay(n*50).animate({
				left:100,
				top:470,
				opacity:1
			},300)
	}
	
//	定义一个变量为点击那张牌的值  记录
	let current=null;
	$('.pai').click(function(){
		let x=parseInt($(this).attr('id').split('_')[0])
		let y=parseInt($(this).attr('id').split('_')[1])
		
		if(x<=6){
			if($(`#${x+1}_${y}`).length==1||$(`#${x+1}_${y+1}`).length==1){
				return;
			}
		}
		$(this).toggleClass('active')
		if(!current){
			current=$(this);
//			如果点的这(个牌的值是13的话 消除
			if($(this).attr('value')==13){
				$(this).animate({
					left:600,
					top:20,
					opacity:0
				},400,function(){
					$(this).remove()
					current=null
				})
			}
		}else{
			if(parseInt($(this).attr('value'))+parseInt(current.attr('value'))==13){
				$('.active').animate({
					left:600,
					top:20,
					opacity:0
				},400,function(){
					$('.active').remove()
					current=null;
				})
			}else{
				setTimeout(function(){
					$('.active').removeClass('active')
					current=null;
				},400)
			}
		}
		
	})


	let index=1;
	$('.right').click(function(){
		$('.zuo').last().addClass('you').css('zIdex',++index).removeClass('zuo').animate({
			left:500,
		})
	})
	$('.left').click(function(){
		$('.you').css('zIdex',++index).each(function(indexs){
				$(this).addClass('zuo').removeClass('you').delay(50*indexs).animate({
					left:100
				})
			})
		})
	while($('ul').children().length==0){
		alert('胜利，有彩蛋！！不要走开哦')
	}
	})

