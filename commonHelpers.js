import{a as L,S as v,i as a}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const I="44783480-725b805b80ef605c474d620ee";async function y(r,t){const n=`https://pixabay.com/api/?key=${I}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${t}`;try{const o=await L.get(n);if(o.status!==200)throw new Error("Network response was not ok");return o.data}catch(o){throw console.error("Error fetching images:",o),o}}let u;function $(){u=new v(".gallery a")}function g(){u&&u.refresh()}function p(r,t=!1){const n=document.getElementById("gallery"),o=r.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}">
        <div class="info">
          <p>Likes: <span class="number">${e.likes}</span></p>
          <p>Views: <span class="number">${e.views}</span></p>
          <p>Comments: <span class="number">${e.comments}</span></p>
          <p>Downloads: <span class="number">${e.downloads}</span></p>
        </div>
      </a>
    `).join("");t?n.insertAdjacentHTML("beforeend",o):n.innerHTML=o}const B=document.getElementById("searchForm"),h=document.getElementById("search-input"),b=document.querySelector(".loader"),f=document.getElementById("gallery"),c=document.getElementById("loadMoreBtn");let i=1,l="",m=0;$();B.addEventListener("submit",async r=>{if(r.preventDefault(),l=h.value.trim(),!l){a.error({title:"Error",message:"Please enter a search query."});return}i=1,f.innerHTML="",c.style.display="none";try{w();const t=await y(l,i);if(m=t.totalHits,t.hits.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}p(t.hits),t.hits.length>0&&i*15<m?c.style.display="block":t.hits.length<15&&a.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),h.value="",g()}catch(t){console.error("Error searching images:",t),a.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{E()}});c.addEventListener("click",async()=>{i+=1;try{w();const r=await y(l,i);p(r.hits,!0),i*15>=m&&(c.style.display="none",a.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),g(),P()}catch(r){console.error("Error loading more images:",r),a.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{E()}});function w(){b.style.display="block"}function E(){b.style.display="none"}function P(){const r=f.firstElementChild?f.firstElementChild.getBoundingClientRect().height:0;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
