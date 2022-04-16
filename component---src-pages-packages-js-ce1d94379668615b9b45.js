"use strict";(self.webpackChunkkaluma_website=self.webpackChunkkaluma_website||[]).push([[393],{1619:function(e,t,a){a.d(t,{Z:function(){return r}});var n=a(7294);function r(e){var t=e.navs;return n.createElement("div",{className:"footer"},n.createElement("div",null,t.map((function(e){return e.blank?n.createElement("a",{className:"text-secondary text-decoration-none px-2",href:e.url,target:"_blank",rel:"noreferrer",key:e.name},e.name):n.createElement("a",{className:"text-secondary text-decoration-none px-2",href:e.url,key:e.name},e.name)})),n.createElement("a",{className:"text-secondary text-decoration-none px-2",href:"https://github.com/kaluma-project/kaluma",target:"_blank",rel:"noreferrer"},"Github")))}},9686:function(e,t,a){a.d(t,{Z:function(){return r}});var n=a(7294);function r(e){var t=e.title,a=e.navs;return n.createElement("div",{className:"container"},n.createElement("nav",{className:"navbar navbar-expand-lg navbar-light rounded","aria-label":"Eleventh navbar example"},n.createElement("div",{className:"container-fluid"},n.createElement("a",{className:"navbar-brand d-flex align-items-center",href:"/"},n.createElement("img",{src:"/images/kaluma-logo.png",width:"32",alt:""})),n.createElement("div",{className:"fw-bold"},t),n.createElement("button",{className:"navbar-toggler collapsed border-0",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbar-items","aria-controls":"navbar-items","aria-expanded":"false","aria-label":"Toggle navigation"},n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-menu"},n.createElement("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),n.createElement("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),n.createElement("line",{x1:"3",y1:"18",x2:"21",y2:"18"}))),n.createElement("div",{className:"navbar-collapse collapse justify-content-end",id:"navbar-items"},n.createElement("ul",{className:"navbar-nav mb-2 mb-lg-0"},a.map((function(e){return n.createElement("li",{className:"nav-item",key:e.name},e.blank?n.createElement("a",{className:"nav-link",href:e.url,target:"_blank",rel:"noreferrer"},e.name):n.createElement("a",{className:"nav-link",href:e.url},e.name))})),n.createElement("li",{className:"nav-item"},n.createElement("a",{className:"nav-link",href:"https://github.com/kaluma-project/kaluma",target:"_blank",rel:"noreferrer"},n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",fill:"currentColor",className:"bi bi-github",viewBox:"0 0 16 16"},n.createElement("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"})))))))))}},7783:function(e,t,a){a.r(t),a.d(t,{default:function(){return s}});var n=a(1721),r=a(7294),l=a(4446),c=a(9686),m=a(1619),s=function(e){function t(t){var a;return(a=e.call(this,t)||this).copyToClipboard=function(e){console.log("copy!",e);var t=document.createElement("textarea");document.body.appendChild(t),t.value="npm i "+e,t.select(),document.execCommand("copy"),document.body.removeChild(t);var a=document.getElementById("copy-btn-"+e);a.innerText="COPIED!",setTimeout((function(){a.innerText="COPY"}),1e3)},a}(0,n.Z)(t,e);var a=t.prototype;return a.componentDidMount=function(){},a.render=function(){var e=this,t=this.props.data.markdownRemark.html,a=this.props.data.site.siteMetadata.navs,n=this.props.data.allPackagesJson.nodes;return r.createElement(l.Z,{title:"Kaluma"},r.createElement("header",null,r.createElement(c.Z,{title:"Packages",navs:a})),r.createElement("main",null,r.createElement("div",{className:"container px-4 my-4"},r.createElement("div",{dangerouslySetInnerHTML:{__html:t}}),r.createElement("div",{className:"text-end"},r.createElement("p",null,r.createElement("a",{className:"btn btn-outline-secondary",href:"https://github.com/kaluma-project/kaluma-project.github.io/issues/new?template=publish-package-template.md&title=[Publish Request] New Package",target:"_blank",rel:"noreferrer"},"Publish my package"))),r.createElement("div",{className:"text-start my-3"},"Total: ",r.createElement("b",null,n.length," packages")),r.createElement("div",{className:"card"},r.createElement("ul",{className:"list-group list-group-flush"},n.map((function(t){return r.createElement("li",{className:"list-group-item text-start",key:t.name},r.createElement("div",{className:"d-flex justify-content-between"},r.createElement("div",null,r.createElement("a",{href:t.repo,target:"_blank",rel:"noreferrer"},t.name)),r.createElement("div",{className:"repo"},r.createElement("code",{className:"repo-install"},"npm i ",t.repo),r.createElement("button",{className:"repo-copy",onClick:function(){e.copyToClipboard(t.repo)}},r.createElement("span",{id:"copy-btn-"+t.repo},"COPY")))),r.createElement("div",{className:"text-secondary mt-1"},t.description))})))))),r.createElement("div",null,r.createElement(m.Z,{navs:a})))},t}(r.Component)}}]);
//# sourceMappingURL=component---src-pages-packages-js-ce1d94379668615b9b45.js.map