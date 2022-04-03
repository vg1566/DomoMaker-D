(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,m)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),o=await r.json();document.getElementById("domoMessage").classList.add("hidden"),o.error&&t(o.error),o.redirect&&(window.location=o.redirect),m&&m(o)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function a(m){var r=t[m];if(void 0!==r)return r.exports;var o=t[m]={exports:{}};return e[m](o,o.exports,a),o.exports}(()=>{const e=a(603),t=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#domoName").value,m=t.target.querySelector("#domoAge").value,r=t.target.querySelector("#domoTeeth").value,o=t.target.querySelector("#_csrf").value;return a&&m&&r?(e.sendPost(t.target.action,{name:a,age:m,teeth:r,_csrf:o},d),!1):(e.handleError("All fields are required!"),!1)},m=(t,a)=>{t.preventDefault(),e.hideError();const m=a,r=t.target.querySelector("#_csrf").value;return e.sendPost(t.target.action,{isPremium:m,_csrf:r},o),!1},r=e=>"false"===e.premium?React.createElement("div",{id:"ads",className:"adBox"},React.createElement("img",{src:"/assets/img/ad1.jpg",alt:"ad",className:"ad"}),React.createElement("img",{src:"/assets/img/ad2.jpg",alt:"ad",className:"ad"})):React.createElement("div",null),o=async()=>{const e=await fetch("/getPremium"),t=await e.json();ReactDOM.render(React.createElement(r,{premium:t.premium?t.premium:"false"}),document.getElementById("ads"))},c=e=>"true"===e.premium?React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>m(e,"false"),action:"/premium",method:"POST",className:"premiumForm"},React.createElement("h3",null,"You have premium!"),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Remove Premium"})):React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>m(e,"true"),action:"/premium",method:"POST",className:"premiumForm"},React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Buy Premium"})),n=e=>React.createElement("form",{id:"domoForm",name:"domoForm",onSubmit:t,action:"/maker",method:"POST",className:"domoForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{id:"domoName",type:"text",name:"name",placeholder:"Domo Name"}),React.createElement("label",{htmlFor:"age"},"Age: "),React.createElement("input",{id:"domoAge",type:"number",name:"age",min:"0"}),React.createElement("label",{htmlFor:"teeth"},"Teeth: "),React.createElement("input",{id:"domoTeeth",type:"number",name:"teeth",min:"0"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeDomoSubmit",type:"submit",value:"Make Domo"})),s=e=>{if(0===e.domos.length)return React.createElement("div",{className:"domoList"},React.createElement("h3",{className:"emptyDomo"},"No Domos Yet!"));const t=e.domos.map((e=>React.createElement("div",{key:e._id,className:"domo"},React.createElement("img",{src:"/assets/img/domoface.jpeg",alt:"domo face",className:"domoFace"}),React.createElement("h3",{className:"domoName"}," Name: ",e.name," "),React.createElement("h3",{className:"domoAge"}," Age: ",e.age," "),React.createElement("h3",{className:"domoTeeth"}," Teeth: ",e.teeth," "))));return React.createElement("div",{className:"domoList"},t)},d=async()=>{const e=await fetch("/getDomos"),t=await e.json();ReactDOM.render(React.createElement(s,{domos:t.domos}),document.getElementById("domos"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json(),a=await fetch("/getPremium"),m=await a.json();ReactDOM.render(React.createElement(n,{csrf:t.csrfToken}),document.getElementById("makeDomo")),ReactDOM.render(React.createElement(c,{premium:m.premium,csrf:t.csrfToken}),document.getElementById("premium")),ReactDOM.render(React.createElement(n,{domos:[]}),document.getElementById("domos")),o(),d()}})()})();