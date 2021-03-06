$.fn.extend({
	slide:function(options){
		var _this=$(this),
			aSetting={time:2000,slideSpeed:""}, //播放间隔, 动画速度
			bAutoplay="true",
			nImgWidth=$(this).width(),
			nIdx=1,//状态索引
			oDotLiEle="", //小圆点dom
			oImgList=$(this).children(".imgList"),
			oImgListLi=$(this).children(".imgList").children("li"),
			oLBtn=$(this).children(".lBtn"),
			oRBtn=$(this).children(".rBtn");
		$.extend(aSetting,options);
		//克隆第一个和最后一个到相应位置
		var oFirstImg=oImgListLi.first().clone(),
		    oLastImg=oImgListLi.last().clone(); 
			oImgList.append(oFirstImg); oImgList.prepend(oLastImg);
		var nLen=$(this).find("img").length,
			nImgListWidth=(nLen*100)+"%";
		oImgListLi=$(this).children(".imgList").children("li");
		oImgListLi.css("width",nImgWidth);
		oImgList.css({"width":nImgListWidth,"left":-nImgWidth});
		fAutoplay=setInterval(nextPlay,aSetting.time);
		for(var i=0;i<nLen;i++){
			i==1 ? oDotLiEle+="<li class='active'></li>" : oDotLiEle+="<li></li>";
		}
		var oDotDom=$(this).children(".dot");
		oDotDom.append(oDotLiEle);
		var oDotLiDom=$(this).find(".dot li");
		var nDotWidth=$(this).children(".dot").width();
		oDotDom.css("marginLeft",-nDotWidth/2-10);
		function slideTo(i){
			if(i==="first"){
				oImgList.css({"left":0});
				oImgList.animate({left:-nImgWidth});
			}else if(i==="last"){
				oImgList.css({"left":-nImgWidth*(nLen-1)});
				oImgList.animate({left:-nImgWidth*(nLen-2)});
			}else{
				oImgList.animate({left:-i*nImgWidth},aSetting.slideSpeed);
			}
		}
		function nextPlay(){
			nIdx++;
			nIdx>=(nLen-1) ? ( slideTo("first") , nIdx=1 , dot(nIdx) ) : ( slideTo(nIdx) , dot(nIdx) );
		}
		function prevPlay(){
			nIdx--;
			nIdx<1 ? ( slideTo("last") , nIdx=nLen-2 , dot(nIdx) ) : ( slideTo(nIdx) , dot(nIdx) );
		}
		function dot(i){
			oDotLiDom.removeClass("active").eq(i).addClass("active");
		}
		oRBtn.click(function(){
			clearInterval(fAutoplay);
			nextPlay();
			fAutoplay
		})
		oLBtn.click(function(){
			clearInterval(fAutoplay);
			prevPlay();
			fAutoplay
		})
		oDotLiDom.click(function(){
			clearInterval(fAutoplay);
			nIdx=$(this).index(); 
			dot(nIdx);
			slideTo(nIdx);
			fAutoplay
		})
		$(this).find(".imgList img").mouseover(function(){
			clearInterval(fAutoplay);
		}).mouseout(function(){
			fAutoplay=setInterval(nextPlay,aSetting.time);
		})
	}
}) //extend over