const {readFileSync}=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const element=()=>({value:'',innerHTML:'',textContent:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},focus(){},querySelector:()=>element(),insertAdjacentHTML(){},close(){},showModal(){}});
const nodes=new Map(),tasks=new Map();let next=1;
const context=vm.createContext({console,document:{getElementById:id=>{if(!nodes.has(id))nodes.set(id,element());return nodes.get(id)},querySelector:()=>element(),querySelectorAll:()=>[],body:element()},window:{addEventListener(){},scrollTo(){}},location:{hash:''},setTimeout:fn=>{const id=next++;tasks.set(id,fn);return id},clearTimeout:id=>tasks.delete(id)});
const run=code=>vm.runInContext(code,context);
for(const f of ['app.js','experience.js'])run(readFileSync('dist/'+f,'utf8'));
run("render=()=>{};nav=()=>{};toast=()=>{};applyMaterials=()=>{};premiumRow=()=>'';openPremium=()=>{state.paywallShown=true};callOptions=()=>{};const materialObserver={observe(){}};function paperLayer(){};const premiumSymbols={};function drivePicture(){return ''};function voiceBubble(){return ''};state.premium=false;state.radius=25;state.freeCity=state.city;");
run(readFileSync('dist/screens.js','utf8'));run('render=()=>{};nav=()=>{}');
function step(){const [id,fn]=tasks.entries().next().value;tasks.delete(id);fn()}
run('simulatePayment(false)');assert.equal(run('state.view'),'paymentPending');run("go('checkout')");assert.equal(tasks.size,0);assert.equal(run('state.premium'),false,'Cancel prevents late activation');
run('simulatePayment(true)');step();assert.equal(run('state.view'),'paymentFailed');assert.equal(run('state.premium'),false);
run('simulatePayment(false)');step();assert.equal(run('state.premium'),true);assert.equal(run('state.view'),'premiumSuccess');
run("state.ui.discoverable=false;startSearch()");assert.equal(run('state.view'),'discoveryPaused');
run("state.city='Milano';state.radius=50;cancelPremium()");assert.equal(run('state.premium'),false);assert.equal(run('state.city'),'Roma');assert.equal(run('state.radius'),25);
run("openFeature('affinity')");assert.equal(run('state.paywallShown'),true);assert.equal(run('state.ui.pendingFeature'),'affinity');
run("state.premium=true;state.city='Roma';state.radius=50;document.getElementById('search-name').value='<Casa>';saveSearch({preventDefault(){}})");assert.equal(run('state.ui.saved.length'),1);assert.ok(run('screens.savedSearches()').includes('&lt;Casa&gt;'));
run("state.city='Milano';applySavedSearch(1)");assert.equal(run('state.city'),'Roma');assert.equal(run('state.radius'),50);run('deleteSavedSearch(1)');assert.equal(run('state.ui.saved.length'),0);
run('loadDemoConversation()');assert.equal(run('state.messages[0].read'),false);run("screenGo('chatPreview')");assert.equal(run('state.messages[0].read'),false);run("screenGo('chat')");assert.equal(run('state.messages[0].read'),false,'Opening a chat does not mark audio as listened');
run("state.ui.verificationMode=true;document.getElementById('demo-code').value='000000';checkDemoCode({preventDefault(){}})");assert.ok(nodes.get('code-error').textContent.includes('non corretto'));run("document.getElementById('demo-code').value='123456';checkDemoCode({preventDefault(){}})");assert.equal(run('state.view'),'verifyIdentity');
run('submitReport({preventDefault(){}})');assert.equal(run('state.blocked'),true);assert.equal(run('state.matched'),false);assert.equal(run('state.messages.length'),0);assert.equal(run('state.view'),'reportDone');
console.log('Passed: payment cancellation/failure/success, Premium gate and reset, discovery pause, saved filters/escaping, unread preview, verification errors, report result.');

run("for(const [name,build] of Object.entries(screens)){const html=build();if(typeof html!=='string'||!html.includes('<h1')||html.includes('undefined'))throw new Error('Invalid screen: '+name);for(const m of html.matchAll(/onclick=\"([^\"]+)\"/g))new Function('event',m[1]);}");
console.log('All screen templates and inline actions compile.');
