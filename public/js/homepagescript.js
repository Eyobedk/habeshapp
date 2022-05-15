let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bi-phone-flip");
let EduBtn = document.querySelector(".bx-book");
let EntBtn = document.querySelector(".bx-dice-2");
let BusBtn = document.querySelector(".bx-briefcase");
let FoodBtn = document.querySelector(".bi-cup-straw");
let ToolBtn = document.querySelector(".bi-hammer");
let GameBtn = document.querySelector(".bi-controller");//bi-controller

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
ThesearchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
EduBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
EntBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
BusBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
FoodBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
ToolBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
GameBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bi-phone-flip", "bx-menu-alt-right");//replacing the iocns class
   closeBtn.classList.replace("bx-book", "bx-menu-alt-right");//replacing the iocns class
   closeBtn.classList.replace("bx-dice-2", "bx-menu-alt-right");//replacing the iocns class
   closeBtn.classList.replace("bx-search", "bx-menu-alt-right");//replacing the iocns class
   closeBtn.classList.replace("bx-briefcase", "bx-menu-alt-right");//replacing the iocns class
   closeBtn.classList.replace("bi-cup-straw", "bx-menu-alt-right");//replacing the iocns class
   closeBtn.classList.replace("bi-hammer", "bx-menu-alt-right");//replacing the iocns class
   closeBtn.classList.replace("bi-controller", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bi-phone-flip");//replacing the iocns class
   closeBtn.classList.replace("bx-menu-alt-right","bx-book");//replacing the iocns class
   closeBtn.classList.replace("bx-menu-alt-right","bx-dice-2");//replacing the iocns class
   closeBtn.classList.replace("bx-menu-alt-right","bx-briefcase");//replacing the iocns class
   closeBtn.classList.replace("bx-menu-alt-right","bi-cup-straw");//replacing the iocns class
   closeBtn.classList.replace("bx-menu-alt-right","bi-hammer");//replacing the iocns class
   closeBtn.classList.replace("bx-menu-alt-right","bi-controller");//replacing the iocns class
 }
}
