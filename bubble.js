	function showToolTip(e){
		if(document.all)e = event;		
		var obj = document.getElementById('bubble_tooltip');
		obj.style.display = 'block';
		var st = document.documentElement.scrollTop + document.body.scrollTop;
	//	if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0;
		var leftPos = e.clientX - 40;
		if(leftPos<0)leftPos = 0;
		obj.style.left = leftPos +20+ 'px';
		obj.style.top= e.clientY- obj.offsetHeight + st +'px';
	}	

	function hideToolTip()
	{
		document.getElementById("bubble_tooltip_content").innerHTML='';
		document.getElementById('bubble_tooltip').style.display = 'none';
		
	}

//定义XMLHttpRequest对象
var xmlHttp= createXmlHttpRequestObject();
//获取XMLHttpRequest对象
function createXmlHttpRequestObject()
{
	//用来储存将要使用的XMLHttpRequest对象
	var xmlHttp;
	//如果是IE
	if(window.ActiveXObject)
	{
		try
		{xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");}
		catch(e)
		{xmlHttp=false;}
	}
	else
	{
		try
		{xmlHttp=new XMLHttpRequest();}
		catch(e)
		{xmlHttp=false;}
	}
	//返回错误信息
	if(!xmlHttp)
	alert("Error creating!");
	else
	return xmlHttp;
}

//使用XMLHttpRequest创建异步HTTP请求
function process(text)
{
//	if(xmlHttp.readyState==4||xmlHttp.readyState==0)//xmlHttp对象空闲时
//	{
		//name=encodeURIComponent(document.getElementById("moegirl_name").innerHTML);
		name=text;
		xmlHttp.open("GET" , "wp-content/plugins/link2wiki/wikiajax.php?name=" + name, true);//服务器端执行quickstart.php
		xmlHttp.onreadystatechange = handleServerResponse;//定义服务器响应方法
		xmlHttp.send(null);
//	}
//	else//服务器忙,延时1秒
//		setTimeout('process(text)',100);
}


	function handleServerResponse()
	{
		if(xmlHttp.readyState==4)
		{	
			if(xmlHttp.status==200)
			{
			xmlResponse=xmlHttp.responseText;//获取服务器发来xml消息
			document.getElementById("bubble_tooltip_content").innerHTML='';//清空
			document.getElementById('bubble_tooltip').style.width = '360px';
			document.getElementById("bubble_tooltip_content").innerHTML=xmlResponse;//客户端更新
			setTimeout('process(text)',100);
			}
			else
			{
			}
		}
	}