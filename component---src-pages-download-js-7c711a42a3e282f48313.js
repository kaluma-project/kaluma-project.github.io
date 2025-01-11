"use strict";(self.webpackChunkkaluma_website=self.webpackChunkkaluma_website||[]).push([[333],{1619:function(e,a,t){t.d(a,{Z:function(){return n}});var r=t(7294);function n(e){var a=e.navs;return r.createElement("div",{className:"footer"},r.createElement("div",null,a.map((function(e){return e.blank?r.createElement("a",{className:"text-secondary text-decoration-none px-2",href:e.url,target:"_blank",rel:"noreferrer",key:e.name},e.name):r.createElement("a",{className:"text-secondary text-decoration-none px-2",href:e.url,key:e.name},e.name)})),r.createElement("a",{className:"text-secondary text-decoration-none px-2",href:"https://github.com/kaluma-project/kaluma",target:"_blank",rel:"noreferrer"},"Github")))}},9686:function(e,a,t){t.d(a,{Z:function(){return n}});var r=t(7294);function n(e){var a=e.title,t=e.navs;return r.createElement("div",{className:"container"},r.createElement("nav",{className:"navbar navbar-expand-lg navbar-light rounded","aria-label":"Eleventh navbar example"},r.createElement("div",{className:"container-fluid"},r.createElement("a",{className:"navbar-brand d-flex align-items-center",href:"/"},r.createElement("img",{src:"/images/kaluma-logo.png",width:"32",alt:""})),r.createElement("div",{className:"fw-bold"},a),r.createElement("button",{className:"navbar-toggler collapsed border-0",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbar-items","aria-controls":"navbar-items","aria-expanded":"false","aria-label":"Toggle navigation"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-menu"},r.createElement("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),r.createElement("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),r.createElement("line",{x1:"3",y1:"18",x2:"21",y2:"18"}))),r.createElement("div",{className:"navbar-collapse collapse justify-content-end",id:"navbar-items"},r.createElement("ul",{className:"navbar-nav mb-2 mb-lg-0"},t.map((function(e){return r.createElement("li",{className:"nav-item",key:e.name},e.blank?r.createElement("a",{className:"nav-link",href:e.url,target:"_blank",rel:"noreferrer"},e.name):r.createElement("a",{className:"nav-link",href:e.url},e.name))})),r.createElement("li",{className:"nav-item"},r.createElement("a",{className:"nav-link",href:"https://github.com/kaluma-project/kaluma",target:"_blank",rel:"noreferrer"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",fill:"currentColor",className:"bi bi-github",viewBox:"0 0 16 16"},r.createElement("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"})))))))))}},4597:function(e,a,t){t.r(a),t.d(a,{default:function(){return u}});var r=t(5861),n=t(1721),l=t(7757),c=t.n(l),s=t(7294),m=t(4446),o=t(9686),i=t(1619),u=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={version:"checking"},t}(0,n.Z)(a,e);var t=a.prototype;return t.componentDidMount=function(){var e=(0,r.Z)(c().mark((function e(){var a,t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/repos/kaluma-project/kaluma/releases/latest",{method:"GET",headers:{"User-Agent":"Kaluma"}});case 2:return a=e.sent,e.next=5,a.json();case 5:t=e.sent,this.setState((function(e){return Object.assign({},e,{version:t.name})}));case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.render=function(){var e=this.props.data.site.siteMetadata.navs;return s.createElement(m.Z,{title:"Kaluma"},s.createElement("header",null,s.createElement(o.Z,{title:"Download",navs:e})),s.createElement("main",null,s.createElement("div",{className:"container px-4 my-4"},s.createElement("h3",null,"Download"),s.createElement("p",null,s.createElement("a",{className:"text-decoration-underline",href:"/docs/getting-started/#install-firmware",target:"_blank",rel:"noreferrer"},"How to install .UF2 to my board?"))),s.createElement("div",{className:"container px-4 download"},s.createElement("div",{className:"fs-1 fw-bold my-2"},"RP2040"),s.createElement("div",{className:"row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4"},s.createElement("div",{className:"col"},s.createElement("div",{className:"card"},s.createElement("img",{src:"/images/pico.png",width:"250px",className:"card-img-top",alt:""}),s.createElement("div",{className:"card-body"},s.createElement("div",{className:"card-title"},"Raspberry Pi Pico"),s.createElement("p",{className:"card-text text-secondary"},s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.0.0",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.0.0"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.1",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.1"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.2",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.2"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.3",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.3"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.4",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.4"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/download/1.1.0-beta.4/kaluma-rp2-pico-1.1.0-beta.4.uf2",className:"btn btn-primary btn-rounded tag-download mt-2"},"Download .UF2"))))),s.createElement("div",{className:"col"},s.createElement("div",{className:"card"},s.createElement("img",{src:"/images/pico-w.png",width:"250px",className:"card-img-top",alt:""}),s.createElement("div",{className:"card-body"},s.createElement("div",{className:"card-title"},"Raspberry Pi Pico W"),s.createElement("p",{className:"card-text text-secondary"},s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.1",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.1"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.2",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.2"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.3",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.3"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.4",className:"tag-version",target:"_blank",rel:"noreferrer"},"1.1.0-beta.4"),s.createElement("br",null),s.createElement("a",{href:"https://github.com/kaluma-project/kaluma/releases/download/1.1.0-beta.4/kaluma-rp2-pico-w-1.1.0-beta.4.uf2",className:"btn btn-primary btn-rounded tag-download mt-2"},"Download .UF2")))))))),s.createElement("div",null,s.createElement(i.Z,{navs:e})))},a}(s.Component)}}]);
//# sourceMappingURL=component---src-pages-download-js-7c711a42a3e282f48313.js.map