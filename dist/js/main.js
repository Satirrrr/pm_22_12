function generateJobExperience(e){var n=document.querySelector("#jobExperienceContainer .collapsible-content");if(n){let t=n.innerHTML="";e.forEach(e=>{t+=`
            <div class="timeline-item mt-3">
                <h6>${e.title} <span class="text-primary">${e.years}</span></h6>
                <p class="small text-muted">${e.company}</p>
                <p class="small">${e.description}</p>
            </div>
        `}),n.innerHTML=t}}function generateDynamicSkills(e){var n=document.getElementById("dynamicSkillsContainer");if(n){let t=n.innerHTML="";e.forEach(e=>{t+=`
            <li>
                ${e.name} <span class="rating">${e.rating}</span>
            </li>
        `}),n.innerHTML=t}}function initCollapsibleBlocks(){document.querySelectorAll(".section-header").forEach(e=>{let t=document.createElement("span"),n=(t.textContent="▼",t.className="collapse-arrow",e.appendChild(t),e.closest("section").querySelector(".collapsible-content"));e.addEventListener("click",()=>{n&&(n.classList.toggle("content-hidden"),t.classList.toggle("arrow-rotated"))})})}async function loadDataAndPopulate(){try{var e=await fetch("data.json");if(!e.ok)throw new Error("HTTP error! Status: "+e.status);var t=await e.json(),n=t.person.firstName+" "+t.person.lastName,a=document.getElementById("personName"),o=(a&&(a.textContent=n),document.querySelector(".position"));o&&(o.textContent=t.person.position),generateDynamicSkills(t.skills),generateJobExperience(t.jobExperience)}catch(e){console.error("Failed to load JSON data:",e),alert("Помилка завантаження даних (JSON). Перевірте, чи запущено локальний сервер.")}finally{initCollapsibleBlocks()}}document.addEventListener("DOMContentLoaded",loadDataAndPopulate);
//# sourceMappingURL=main.js.map
