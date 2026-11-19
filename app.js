import products from './products.json' with {type:'json'};
const cards=document.querySelector('#cards');const modal=document.querySelector('#modal');const form=document.querySelector('#order-form');const feedback=document.querySelector('#feedback');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
cards.innerHTML=products.map((p,i)=>`<article class="product-card ${i===1?'featured':''}"><div class="card-top"><span class="plan-tag">${escape(p.tag)}</span><span class="plan-index">0${i+1} / 03</span></div><div class="diamond">◇</div><h3>${escape(p.name)}</h3><p class="subtitle">${escape(p.subtitle)}</p><div class="price">${escape(p.price)}</div><div class="line"></div><p class="include">W ZESTAWIE</p><ul>${p.features.map(f=>`<li>✓ &nbsp;${escape(f)}</li>`).join('')}</ul><button class="buy" data-id="${escape(p.id)}">Zamów teraz <span>↗</span></button></article>`).join('');
cards.addEventListener('click',e=>{const btn=e.target.closest('button[data-id]');if(!btn)return;const p=products.find(x=>x.id===btn.dataset.id);if(!p)return;form.reset();feedback.textContent='';form.hidden=false;document.querySelector('#success').hidden=true;document.querySelector('#productId').value=p.id;document.querySelector('#chosen').value=p.name;modal.showModal();});
document.querySelector('#close').onclick=()=>modal.close();document.querySelector('#done').onclick=()=>modal.close();
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
form.addEventListener('submit',async e=>{
 e.preventDefault();const button=document.querySelector('#submit');button.disabled=true;feedback.textContent='Wysyłanie zamówienia...';feedback.className='';
 const data={productId:document.querySelector('#productId').value,discordNick:document.querySelector('#discordNick').value.trim(),notes:document.querySelector('#notes').value.trim(),website:form.elements.website.value};
 try{const res=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await res.json();if(!res.ok||!j.id)throw Error(j.error||'Nie udało się wysłać zamówienia');document.querySelector('#receipt').textContent='#'+j.id.slice(0,8).toUpperCase();form.hidden=true;document.querySelector('#success').hidden=false;}
 catch(err){feedback.className='error';feedback.textContent=err.message}
 finally{button.disabled=false}
});
