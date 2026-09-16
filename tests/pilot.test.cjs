const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const element=()=>({innerHTML:'',textContent:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},querySelector:()=>element(),insertAdjacentHTML(){},close(){},showModal(){}});
const nodes=new Map();let tasks=new Map(),next=1;
const context=vm.createContext({console,document:{getElementById:id=>{if(!nodes.has(id))nodes.set(id,element());return nodes.get(id)},querySelector:()=>element(),querySelectorAll:()=>[],body:element()},window:{addEventListener(){},scrollTo(){}},location:{hash:''},setTimeout:fn=>{let id=next++;tasks.set(id,fn);return id},clearTimeout:id=>tasks.delete(id)});
for(const file of ['dist/app.js','dist/experience.js'])vm.runInContext(readFileSync(file,'utf8'),context);
const run=code=>vm.runInContext(code,context);
run('render=()=>{};nav=()=>{};toast=()=>{}');
function step(){const task=tasks.entries().next().value;assert.ok(task,'Expected a scheduled transition');tasks.delete(task[0]);task[1]()}
function reset(){tasks.clear();run("state.city='Roma';state.blocked=false;state.category=1;state.view='home';timers=[]")}
reset();run('startSearch()');assert.equal(run('state.view'),'search');run("go('home')");assert.equal(tasks.size,0,'Cancelled search must not open a profile');
reset();run("state.city='Milano';startSearch()");assert.equal(run('state.view'),'unavailable');assert.equal(tasks.size,0);
reset();run('startCall()');for(let i=0;i<179;i++)step();assert.equal(run('state.view'),'call');step();assert.equal(run('state.view'),'extend');assert.equal(run('callSeconds'),180);assert.equal(tasks.size,0,'Call pauses after three minutes');
run('requestExtension()');assert.equal(run('state.view'),'extendWaiting');step();assert.equal(run('state.view'),'call');assert.equal(run('state.extended'),true);step();assert.equal(run('callSeconds'),181);
run('endCall()');assert.equal(run('state.view'),'feedback');assert.equal(tasks.size,0);
reset();run('requestExtension()');run('endCall()');assert.equal(tasks.size,0,'Leaving cancels peer confirmation');
reset();run('notifyTopic();notifyTopic()');assert.equal(run('state.notify.length'),1,'Notification preference is not duplicated');
reset();run("state.matched=true;state.messages=[{text:'test'}];blockPerson()");assert.equal(run('state.matched'),false);assert.equal(run('state.messages.length'),0);assert.equal(run('available(1)'),false);assert.equal(run('state.view'),'home');
reset();run('startCall();finishDemoRound()');assert.equal(run('callSeconds'),180);assert.equal(run('state.view'),'extend');
console.log('Passed: search cancellation, unavailable city, 180-second boundary, mutual continuation, cancellation, unique reminders, blocking and demo skip.');
