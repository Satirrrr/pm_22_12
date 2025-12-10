let skillsData=[{name:"Adobe Photoshop",rating:"★★★★☆"},{name:"Adobe Illustrator",rating:"★★★★☆"},{name:"Microsoft Word",rating:"★★★★☆"},{name:"Microsoft Powerpoint",rating:"★★★★☆"},{name:"HTML5 / CSS3",rating:"★★★★★"},{name:"JavaScript",rating:"★★★★☆"},{name:"Gulp / Webpack",rating:"★★★☆☆"},{name:"Git / Version Control",rating:"★★★★☆"}];function generateDynamicSkills(){var e=document.getElementById("dynamicSkillsContainer");if(e){let t=e.innerHTML="";skillsData.forEach(e=>{t+=`
            <li>
                ${e.name} <span class="rating">${e.rating}</span>
            </li>
        `}),e.innerHTML=t}}function initCollapsibleBlocks(){document.querySelectorAll(".section-header").forEach(e=>{let t=document.createElement("span"),n=(t.textContent="▼",t.className="collapse-arrow",e.appendChild(t),e.closest("section").querySelector(".collapsible-content"));e.addEventListener("click",()=>{n&&(n.classList.toggle("content-hidden"),t.classList.toggle("arrow-rotated"))})})}document.addEventListener("DOMContentLoaded",()=>{var e=document.getElementById("personName");e&&(e.textContent="NOEL T.GATES"),generateDynamicSkills(),initCollapsibleBlocks()});
//# sourceMappingURL=main.js.map
