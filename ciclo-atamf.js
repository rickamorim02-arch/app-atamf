/* ATAMF: ciclo baseado no catálogo de aulas enviado. */
(function(){
let catalog={},subjects=[],active=null;
const store=()=>{try{return JSON.parse(localStorage.getItem('atamf-cycle-real-v1')||'{}')}catch{return {}}};
const save=p=>localStorage.setItem('atamf-cycle-real-v1',JSON.stringify(p));
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lessonKey=(s,t)=>s+'|'+t;
const current=(p,s)=>Math.min(Math.max(0,p['selected:'+s]||0),(catalog[s]||[]).length-1);
const status=(p,s,t)=>p['status:'+lessonKey(s,t)]||'todo';
const clock=()=>{const e=document.getElementById('cycleClock');if(e)e.textContent=fmt(remaining)};
const tick=()=>{remaining=Math.max(0,remaining-1);clock();if(!remaining){stopTimer();alert('Tempo concluído. Você pode marcar a aula como Estudado.')}};
window.selectRealLesson=function(i,n){const p=store(),s=subjects[i];p['selected:'+s]=Number(n);save(p);renderCycle()};
window.setRealStatus=function(i,n,v){if(!['todo','doing','done'].includes(v))return;const p=store(),s=subjects[i],t=catalog[s][n];p['status:'+lessonKey(s,t)]=v;save(p);renderCycle()};
window.startRealCycle=function(i){const s=subjects[i],p=store(),n=current(p,s),t=catalog[s][n];if(!t)return;stopTimer();active={s,t};runningKey=s;remaining=(window.ATAMF_MINUTES?.[s]||40)*60;p['status:'+lessonKey(s,t)]='doing';save(p);renderCycle();cycleTimer=setInterval(tick,1000)};
window.pauseRealCycle=function(){if(cycleTimer){stopTimer()}else if(active&&remaining>0){cycleTimer=setInterval(tick,1000)}renderCycle()};
window.cancelRealCycle=function(){stopTimer();active=null;runningKey='';remaining=0;renderCycle()};
window.completeRealCycle=function(){if(!active)return;stopTimer();const p=store(),{s,t}=active,n=catalog[s].indexOf(t);p['status:'+lessonKey(s,t)]='done';p['sessions:'+s]=(p['sessions:'+s]||0)+1;const next=catalog[s].findIndex((x,j)=>j>n&&status(p,s,x)!=='done');if(next>=0)p['selected:'+s]=next;save(p);active=null;runningKey='';remaining=0;renderCycle()};
window.ATAMF_MINUTES={'Português':45,'Matemática e Raciocínio Lógico':40,'Informática':40,'Regime Jurídico dos Agentes Públicos':45,'Administração Pública':40,'Gestão de Pessoas e Atendimento ao Público':40,'Atualidades':30,'Controle Externo e Legislação Institucional':45,'Ética no Serviço Público':30};
window.renderCycle=function(){
const p=store(),all=subjects.flatMap(s=>catalog[s].map(t=>[s,t])),done=all.filter(([s,t])=>status(p,s,t)==='done').length;
const total=subjects.reduce((v,s)=>v+ATAMF_MINUTES[s],0);
document.getElementById('summary').innerHTML='<div class="summary"><div class="card metric"><strong>'+done+'/'+all.length+'</strong>aulas estudadas</div><div class="card metric"><strong>'+Math.floor(total/60)+'h '+total%60+'min</strong>tempo por rodada</div></div><div class="card"><b>Cronômetro</b>'+(active?'<p>'+escapeHTML(active.s)+' — '+escapeHTML(active.t)+'</p><h2 id="cycleClock">'+fmt(remaining)+'</h2><div class="bulk"><button onclick="pauseRealCycle()">'+(cycleTimer?'Pausar':'Continuar')+'</button><button onclick="completeRealCycle()">Concluir aula</button><button onclick="cancelRealCycle()">Cancelar</button></div>':'<p class="notice">Selecione uma aula e toque em Iniciar.</p>')+'</div>';
document.getElementById('cycleList').innerHTML=subjects.map((s,i)=>{
const lessons=catalog[s],n=current(p,s),completed=lessons.filter(t=>status(p,s,t)==='done').length;
const nextPending=lessons.findIndex(t=>status(p,s,t)!=='done');const displayStatus=t=>({todo:'○ A estudar',doing:'◐ Estudando',done:'✓ Estudado'}[status(p,s,t)]);const selector=(j)=>'<select class="status" aria-label="Situação da aula" onchange="setRealStatus('+i+','+j+',this.value)">'+[['todo','A estudar'],['doing','Estudando'],['done','Estudado']].map(([v,l])=>'<option value="'+v+'" '+(status(p,s,lessons[j])===v?'selected':'')+'>'+l+'</option>').join('')+'</select>';
return '<div class="card"><b>'+escapeHTML(s)+'</b><p class="notice">'+completed+'/'+lessons.length+' aulas estudadas • '+ATAMF_MINUTES[s]+' min</p><p class="notice"><strong>Próxima pendente:</strong> '+(nextPending<0?'Todas estudadas':escapeHTML(lessons[nextPending]))+'</p><label>Escolher aula<select class="search" onchange="selectRealLesson('+i+',this.value)">'+lessons.map((t,j)=>'<option value="'+j+'" '+(j===n?'selected':'')+'>'+escapeHTML(displayStatus(t)+' — '+t)+'</option>').join('')+'</select></label><div class="lesson"><div class="info">Situação atual</div>'+selector(n)+'<button class="open" onclick="startRealCycle('+i+')">Iniciar</button></div><details><summary>Ver todas as '+lessons.length+' aulas</summary>'+lessons.map((t,j)=>'<div class="lesson"><div class="info">'+escapeHTML(displayStatus(t)+' — '+t)+(j===nextPending?' <strong>(próxima pendente)</strong>':'')+'</div>'+selector(j)+'</div>').join('')+'</details></div>'
}).join('');
};
fetch('./aulas_atamf.json').then(r=>{if(!r.ok)throw Error('Catálogo indisponível');return r.json()}).then(data=>{catalog=data;subjects=Object.keys(data);renderCycle()}).catch(e=>{document.getElementById('cycleList').textContent='Não foi possível carregar o catálogo. Atualize a página quando houver conexão.';console.error(e)});
})();