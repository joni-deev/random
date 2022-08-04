function UID(){
var resnumb = '';
var numbres = '1234567890';
var numbreslength = numbres.length;
for ( var i = 0; i < 12; i++ ) {
resnumb += numbres.charAt(Math.floor(Math.random() * 
 numbreslength));
 }
 return resnumb;
}
var setUID =(function(){
set=[];

function Item(id){
	this.key = id;
}

function setBookmark(){
	localStorage.setItem('UID', JSON.stringify(set));
}

function loadBookmark() {
    set = JSON.parse(localStorage.getItem('UID'));
}

if (localStorage.getItem("UID") != null) {
    loadBookmark();
}

obj = {};

obj.pushUID = function(id) {
    var item = new Item(id),
    itemList = set;
    if(itemList != null){
    same = itemList.find(item =>{return item.key == id;});
    if(set.length<1){
     if(!same){
    	set.push(item);
    	setBookmark();
      }
     }
    }else{
    	set.push(item);
    	setBookmark();
    }
} 
  return obj;
})();
setUID.pushUID(UID());

$.each($('.like'),function(){
const data = $(this).data('id'),
getUID = JSON.parse(localStorage.getItem('UID')),
urlFirebase = 'https://pxclikes-default-rtdb.firebaseio.com/';

for(var item in getUID){
var match = getUID[item].key;
}

const firebase = new Firebase(urlFirebase + 'like/' +data+'/'+match);
function it(){
fetch(urlFirebase + 'like/' +data+'.json')
.then(res => res.json())
.then(res =>{
let num = 0;
var text;
for(var item in res){
if(res[item] != null){
num += res[item].value;
if(res[item].key == match){
$('.like').addClass('liked');
}
}
}
$('.btn-likes .text i').html(num>0 ? num : '');
$('.btn-likes .text span').html(num>0 ? ' Likes' : '');
})
.catch(e => console.log(e));
};
it();

  $(this).click(function(){
  if(!$('.like').hasClass('liked')){
	  	firebase.once('value',function(e){
  		let obj = e.val(),
        g=!1;
        null==obj&&(obj={},obj.title=document.title,obj.url=location.protocol + '//' + location.hostname + location.pathname,obj.value=1,obj.key=match,g=!0),
        it(),
        "/"!=window.location.pathname&&(g&&firebase.set(obj))
  		});
        }else{
        firebase.once('value',function(e){
        $('.like').removeClass('liked'),
        it(),(firebase.remove())
        });
        }
  });
});
