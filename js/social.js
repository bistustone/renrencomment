window.onload=function(){
	var list=document.getElementById('list');
	var lis=list.children;
	
	function currentTime(){
		var date = new Date();
		var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        m=m>9?m:'0'+m;
        d=d>9?d:'0'+d;
        h=h>9?h:'0'+h;
        mi=mi>9?mi:'0'+mi;
        return y+'-'+m+'-'+d+' '+h+':'+mi;
	}
	// 代理功能
	for(var i=0;i<lis.length;i++){
		var textArea = lis[i].getElementsByClassName('comment')[0];
		lis[i].onclick=function(event){
			event=event||window.event;
			var el=event.srcElement;
			
			switch(el.className){

				case 'close'://关闭分享
					removeList(el.parentNode);
					break;
				case 'praise'://分享点赞
					praiseList(el);
					break;
				case 'comment-praise'://留言点赞
					praiseComment(el);
					break;
				case 'comment-operate'://处理留言
					operateComment(el);
					break;
				case 'btn'://回复评论
					reply(el);
					break;

			}
			
		}
		//评论按键事件
        textArea.onkeyup = function () {
            var val = this.value;
            var len = val.length;
            var els = this.parentNode.children;
            var btn = els[1];
            var word = els[2];
            if (len <=0 || len > 140) {
                btn.className = 'btn btn-off';
            }
            else {
                btn.className = 'btn';
            }
            word.innerHTML = len + '/140';
        }
        //评论获取焦点
        textArea.onfocus = function () {
            this.parentNode.className = 'text-box text-box-on';
            this.value = this.value == '评论......' ? '' : this.value;
            this.onkeyup();
        }
        //评论失去焦点
        textArea.onblur = function () {
            var me = this;
            var val = me.value;
            if (val == '') {
                me.value='评论......';
                me.parentNode.className='text-box';
            }
        }
	}
	//关闭分享功能
	function removeList(node){
		node.parentNode.removeChild(node);
	}
	//分享点赞功能
	function praiseList(node){
		var box=node.parentNode.parentNode.parentNode;
		var praisesTotal = box.getElementsByClassName('praises-total')[0];
		var oldPraiseTotal=parseInt(praisesTotal.getAttribute('total'));
		var newPraiseTotal;
		var txt=node.innerHTML;
		if(txt=='赞'){
			newPraiseTotal=oldPraiseTotal+1;
			praisesTotal.setAttribute('total',newPraiseTotal);
			praisesTotal.innerHTML = (newPraiseTotal == 1) ? '我觉得很赞' : '我和' + oldPraiseTotal + '个人觉得很赞';
			node.innerHTML='取消赞';
		}else if(txt=='取消赞'){
			newPraiseTotal=oldPraiseTotal-1;
			praisesTotal.setAttribute('total',newPraiseTotal);
			praisesTotal.innerHTML = (newPraiseTotal == 0) ? '' : newPraiseTotal + '个人觉得很赞';
			node.innerHTML='赞';
		}
		praisesTotal.style.display = (newPraiseTotal == 0) ? 'none' : 'block';
	}
	//留言点赞功能
	function praiseComment(node){
		var myPraiseTotal=parseInt(node.getAttribute('my'));
		var oldPraiseTotal=parseInt(node.getAttribute('total'));
		var newPraiseTotal;
		if(myPraiseTotal==0){
			newPraiseTotal=oldPraiseTotal+1;
			node.setAttribute('total',newPraiseTotal);
			node.setAttribute('my','1');
			node.innerHTML = newPraiseTotal + ' 取消赞';
		}else if(myPraiseTotal==1){
			newPraiseTotal=oldPraiseTotal-1;
			node.setAttribute('total',newPraiseTotal);
			node.setAttribute('my','0');
			node.innerHTML = newPraiseTotal + '赞';
		}
		node.style.display = (newPraiseTotal == 0) ? '' : 'inline-block';
	}
	//处理留言功能
	function operateComment(node){
		var commentBox=node.parentNode.parentNode.parentNode;
		var box=commentBox.parentNode.parentNode.parentNode;
		var txt=node.innerHTML;
		var user = commentBox.getElementsByClassName('user')[0].innerHTML;
		var textarea = box.getElementsByClassName('comment')[0];
		if(txt=='删除'){
			removeList(commentBox);
		}else if(txt == '回复'){
			textarea.focus();
			//textarea.parentNode.className='text-box text-box-on';
			textarea.value = '回复' + user;
			textarea.onkeyup();
		}
	}
	//回复评论功能
	function reply(node){
		var box=node.parentNode.parentNode.parentNode;
		var commentList = box.getElementsByClassName('comment-list')[0];
		var textarea = box.getElementsByClassName('comment')[0];
		var commentBox = document.createElement('div');

		commentBox.className = 'comment-box clearfix';
		commentBox.innerHTML=
			'<img src="images/my.jpg" alt="" class="myhead">'+'<div class="comment-content">'+
			'<p class="comment-text"><span class="user">我：</span>'+textarea.value+'</p>'+
			'<p class="comment-time">'+currentTime()+'<a href="javascript:;" class="comment-praise";'+ 
			'total="1" my="0" style="display: inline-block">1 赞</a>'+
			'<a href="javascript:;" class="comment-operate">删除</a></p><div>';
		commentList.appendChild(commentBox);
		textarea.value = '';
		textarea.parentNode.className='text-box';
	}
}