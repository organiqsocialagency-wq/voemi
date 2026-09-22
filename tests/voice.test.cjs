const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('dist/voice-home.js','utf8');const jobs=[];
const c=vm.createContext({Date,console,state:{matched:true,premium:false,messages:[{type:'audio',duration:18,mine:false,read:false}]},render(){},toast(){},openPremium(){},later:f=>jobs.push(f),esc:String,formatTime:n=>String(n),icon:()=>'',personName:()=> 'Giulia'});
const run=s=>vm.runInContext(s,c);run(source.slice(source.indexOf('let voiceDraft'),source.indexOf('const beforeVoiceGo')));
run('recordVoice();stopVoice()');assert.equal(run('voiceDraft.recording'),false);run('cancelVoice()');assert.equal(run('voiceDraft'),null);
run('recordVoice();stopVoice();sendVoice()');assert.equal(run('state.messages[1].type'),'audio');assert.equal(run('voiceDraft'),null);jobs.shift()();
assert.equal(run('state.messages[2].type'),'audio');run('state.premium=true;playVoice(0,true)');assert.equal(run('state.messages[0].read'),false);run('playVoice(0,false)');assert.equal(run('state.messages[0].read'),true);
assert.ok(!run('voiceComposer()').includes('<input'));assert.ok(!run('voiceBubble({text:"legacy text",mine:false},0)').includes('legacy text'));
console.log('Passed: audio draft discard/send, audio reply, private preview, listening receipt, no text composer.');
