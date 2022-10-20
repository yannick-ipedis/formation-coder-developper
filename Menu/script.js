var menuItems1 = document.querySelectorAll('#nav-main li.has-submenu');
var timer1, timer2;

var parseHTML = function(str) {
  var tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return tmp.body.children;
};

Array.prototype.forEach.call(menuItems1, function(el, i){
    var activatingA = el.querySelector('a');
    el.addEventListener("mouseover", function(event){
        this.className = "has-submenu open";
        this.querySelector('a').setAttribute('aria-expanded', "true");
        this.querySelector('button').setAttribute('aria-expanded', "true");
        clearTimeout(timer1);
    });
    el.addEventListener("mouseout", function(event){
        timer1 = setTimeout(function(event){
            document.querySelector("#nav-main .has-submenu.open").className = "has-submenu";
            document.querySelector('#nav-main .has-submenu.open a').setAttribute('aria-expanded', "false");
            document.querySelector('#nav-main .has-submenu.open button').setAttribute('aria-expanded', "false");
        }, 1000);
    });
    el.querySelector('button').addEventListener("click",  function(event){
      if (this.parentNode.className == "has-submenu") {
        this.parentNode.className = "has-submenu open";
        this.parentNode.querySelector('a').setAttribute('aria-expanded', "true");
        this.parentNode.querySelector('button').setAttribute('aria-expanded', "true");
      } else {
        this.parentNode.className = "has-submenu";
        this.parentNode.querySelector('a').setAttribute('aria-expanded', "false");
        this.parentNode.querySelector('button').setAttribute('aria-expanded', "false");
      }
      event.preventDefault();
    });
    var links = el.querySelectorAll('a');
    Array.prototype.forEach.call(links, function(el, i){
      el.addEventListener("focus", function() {
        if (timer2) {
          clearTimeout(timer2);
          timer2 = null;
        }
      });
      el.addEventListener("blur", function(event) {
        timer2 = setTimeout(function () {
          var opennav = document.querySelector("#nav-main .has-submenu.open")
          if (opennav) {
            opennav.className = "has-submenu";
            opennav.querySelector('a').setAttribute('aria-expanded', "false");
            opennav.querySelector('button').setAttribute('aria-expanded', "false");
          }
        }, 10);
      });
    });
});