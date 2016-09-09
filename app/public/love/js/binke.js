//宾客代码
String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}
var dusername="各位亲朋好友";
var lusername=location.search.split("name=")[1];
if(lusername){
	lusername=lusername.replaceAll("!","%");
	lusername=unescape(lusername);
	lusername=lusername.split("&")[0];//&	
	if(!lusername){
		lusername=dusername;
	}
}else{
	lusername=dusername;
}
function check(){
	obj = document.getElementById("name").value;
	if (obj.length>30) {
		alert('名字太长了吧'); 
		return false;
	}
	if (obj.length==0) {
		alert('请输入宾客的姓名!'); 
		return false;
	}
	obj=escape(obj).replaceAll("%","!");
	var url	="http://"+location.host+location.pathname+"?name="+obj;
	copy("宾客请帖已经生成，手机扫描二维码发给亲友即可！\n"+url);
	window.location.replace(url);
	return false
}
function copy(meintext) {
  if (window.clipboardData) {
      window.clipboardData.setData("Text", meintext);
	  alert('宾客请帖已经生成，手机扫描二维码发给亲友即可！');
  }
}
var speed=2;var currentpos=0,alt=1,curpos1=0,curpos2=-1;function initialize(){startit()}function scrollwindow(){if(document.all)temp=document.body.scrollTop;else temp=window.pageYOffset;if(alt==0)alt=1;else alt=0;if(alt==0)curpos1=temp;else curpos2=temp;if(curpos1!=curpos2){if(document.all)currentpos=document.body.scrollTop+speed;else currentpos=window.pageYOffset+speed;window.scroll(0,currentpos)}else{currentpos=0}}function startit(){setInterval("scrollwindow()",80)}