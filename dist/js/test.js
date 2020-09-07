var tabBox = document.getElementById('tabBox');
//var tabList = tabBox.getElementsByTagName('li');
//console.log(tabList);
console.log('tabBox')
var hello = tabBox.getElementsByTagName("hello");
console.log(hello);
var nono = tabBox.getElementsByTagName("nono");
console.log(nono);
tabList[0].onclick = function (){
	 changeTab0();
 }
tabList[1].onclick = function (){
	 changeTab1();
 }
function changeTab0(){
	nono[0].className='';
	tabList[1].className='';
	tabList[0].className='active';
	hello[0].className='active';
	console.log(tabList);
	console.log(hello);
	console.log(nono);
}
function changeTab1(){
	hello[0].className='';
	tabList[0].className='';
	tabList[1].className='active';
	nono[0].className='active';
	console.log(tabList);
	console.log(hello);
	console.log(nono);
}
