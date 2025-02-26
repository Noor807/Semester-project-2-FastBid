import{f as g}from"./singleListRead-2w0x1GBA.js";import{A as f}from"./constants-D-ym1ySC.js";import{t as c}from"./toastMsg-pxLBbmNp.js";const p="b2e5ca6e-7ba7-46fc-9cae-8ef8a7919673";async function h(t,n,r){try{const e={"Content-Type":"application/json",Authorization:`Bearer ${r}`,"X-Noroff-API-Key":p},o=await fetch(`${f}/${t}`,{method:"PUT",headers:e,body:JSON.stringify(n)});if(!o.ok){const a=await o.json();throw new Error(a.message||"Failed to update auction listing.")}return await o.json()}catch(e){throw console.error("Error editing auction listing:",e),e}}async function v(t,n){t.preventDefault();const r=t.target.title.value.trim(),e=t.target.description.value.trim(),o=t.target.mediaUrl.value.trim(),s=t.target.mediaAlt.value.trim(),a=t.target.tags.value?t.target.tags.value.split(",").map(i=>i.trim()):[];if(!r&&!e&&!o&&!s&&a.length===0){c("At least one of Title, Description, or Media is required.");return}const m=localStorage.getItem("token");if(!m){c("You must be logged in to edit an auction.");return}const u={title:r,description:e,tags:a,media:o?[{url:o,alt:s}]:null};try{const i=await h(n,u,m);sessionStorage.setItem("updatedSuccess","true"),window.location.href=`/post/index.html?singleList=${n}`}catch(i){console.error("Error:",i),c("Failed to update auction listing: "+i.message)}}function A(t){if(!document.getElementById("edit-auction-form")){console.error("Form not found!");return}document.forms.editForm.title.value=t.title,document.forms.editForm.description.value=t.description,document.forms.editForm.tags.value=t.tags?t.tags.join(", "):"",document.forms.editForm.mediaUrl.value=t.media?t.media[0].url:"",document.forms.editForm.mediaAlt.value=t.media?t.media[0].alt:""}setLogoutListener;const w=new URLSearchParams(window.location.search),l=w.get("post"),y=await g(l),d=document.getElementById("edit-auction-form");A(y.data);d&&d.addEventListener("submit",t=>v(t,l));document.getElementById("logout-Btn").addEventListener("click",onLogout);const E=document.getElementById("hamburger-btn"),b=document.getElementById("navbar-links");E.addEventListener("click",()=>{b.classList.toggle("hidden")});
