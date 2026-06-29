import{t as e}from"./storage-CO_P6eOB.js";import{n as t}from"./db-BFw8Xjn6.js";import{L as n,O as r}from"./runtimeConfig-Cpg5BI35.js";import{t as i}from"./calendarContext-BMcklzO4.js";import{Yr as a}from"./index-54aE5Faw.js";import{t as o}from"./lifeProfileContextSnapshot-ClUvvYjn.js";import{t as s}from"./vectorMemoryRetriever-DaTGFmgF.js";var c=`lucid_dream_archive_v2`,l=`lucid_dream_archive_asset_v1`,u=2,d=new Map,f=[`image`,`echo`,`sensation`,`turn`,`aftertaste`],p=[`slow`,`pause`,`pulse`,`drift`],m=[`faint`,`clear`,`intense`],h=500,g=500,_=18,v=500,y=800,b=6e4,x=`不设置数量上限；每个自然句单独一个 fragment，多少句就是多少段`;function S(e){return e.replace(/\s+/g,` `).trim()}function C(e,t){let n=S(e||``);return n?n.length>t?`${n.slice(0,Math.max(0,t-1)).trim()}…`:n:`暂无`}function w(e){return typeof e==`string`?e:e.map(e=>e.type===`text`?e.text:`[图片]`).join(`
`).trim()}function T(e){let t=new Date(e);return Number.isNaN(t.getTime())?`unknown-date`:`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function E(e){let t=new Date(e);return Number.isNaN(t.getTime())?`--:--`:`${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}function D(e,t,n){if(e.length===0)return`暂无`;let r=new Map;for(let i of e){let e=T(i.timestamp),a=i.role===`assistant`?t:i.role===`user`?n||`我`:i.role,o=`${E(i.timestamp)} ${a}: ${i.content}`,s=r.get(e)||[];s.push(o),r.set(e,s)}return[...r.entries()].map(([e,t])=>`## ${e}\n${t.join(`
`)}`).join(`

`)}function ee(e){return e.filter(e=>e&&e.content&&!e.deprecated).sort((e,t)=>{let n=(e.salienceScore||0)*2+e.importance+(e.level||0)+Math.min(e.mentionCount||0,6)*.15;return(t.salienceScore||0)*2+t.importance+(t.level||0)+Math.min(t.mentionCount||0,6)*.15-n||(t.updatedAt||t.createdAt)-(e.updatedAt||e.createdAt)}).slice(0,_)}function te(e){return e.length===0?`暂无`:e.map((e,t)=>{let n=[`importance=${e.importance}`,e.source?`source=${e.source}`:``,e.level===void 0?``:`level=${e.level}`,e.salienceScore===void 0?``:`salience=${e.salienceScore}`].filter(Boolean).join(`, `),r=e.emotionalJourney?`\n   emotional: ${C(e.emotionalJourney,220)}`:``;return`${t+1}. [${T(e.updatedAt||e.createdAt)}; ${n}] ${e.title}\n   ${C(e.content,520)}${r}`}).join(`
`)}function O(e,t=16){let n=[];for(let r=e.length-1;r>=0&&n.length<t;--r){let t=e[r];if(t.role!==`assistant`)continue;let i=C(t.content,160);i&&i!==`暂无`&&!n.includes(i)&&n.unshift(i)}return n}function k(e){return e.memoryHeaders.map(e=>({title:e.title,content:C(e.content,520),emotionalJourney:e.emotionalJourney?C(e.emotionalJourney,220):void 0,importance:e.importance,createdAt:e.createdAt,updatedAt:e.updatedAt,source:e.source,level:e.level,salienceScore:e.salienceScore}))}function A(e){return{recentMessagesByDate:e.conversationByDate,assistantVoiceSamples:e.assistantVoiceSamples,vectorMemoryRecall:e.vectorMemoryRecall||null,longMemoryHeaders:k(e),messageCount:e.messageCount,requestedWindow:g}}function j(...e){let t=new Map;for(let n of e)for(let e of n)t.set(e.id,e);return[...t.values()].sort((e,t)=>t.localDate===e.localDate?t.createdAt-e.createdAt:t.localDate.localeCompare(e.localDate))}function M(e){return`${c}:${e}`}function N(e){return`${l}:${e}`}function P(e){return!!e&&typeof e==`object`&&!Array.isArray(e)}function F(e,t){if(typeof e==`string`){let t=e.trim();return t?{text:t,tier:`image`,pace:`slow`}:null}if(!P(e))return null;let n=typeof e.text==`string`?e.text.trim():``;if(!n)return null;let r=f.includes(e.tier)?e.tier:f[t%f.length],i=p.includes(e.pace)?e.pace:p[t%p.length],a=typeof e.emphasis==`string`?e.emphasis.trim():``;return{text:n,tier:r,pace:i,...a?{emphasis:a}:{}}}function I(e,t){return Array.isArray(e)?e.map(e=>typeof e==`string`?e.trim():``).filter(Boolean).slice(0,t):[]}function ne(e,t){let n=I(e.dreamTypes,t);return n.length>0?n:I(e.dream_types,t)}function re(e){if(!P(e))return;let t=typeof e.nodeId==`string`?e.nodeId:``,n=typeof e.nodeTitle==`string`?e.nodeTitle:``,r=e.nodeEra===`before_meeting`||e.nodeEra===`after_meeting`?e.nodeEra:void 0;if(!t||!n||!r)return;let i=typeof e.version==`number`&&Number.isFinite(e.version)?Math.max(1,Math.floor(e.version)):1,a=typeof e.mood==`string`?e.mood:void 0,o=typeof e.label==`string`?e.label:void 0,s=typeof e.previousNodeId==`string`?e.previousNodeId:void 0,c=typeof e.nextNodeId==`string`?e.nextNodeId:void 0;return{nodeId:t,nodeTitle:n,nodeEra:r,...typeof e.nodeAge==`number`?{nodeAge:e.nodeAge}:{},...a?{mood:a}:{},version:i,...o?{label:o}:{},...s?{previousNodeId:s}:{},...c?{nextNodeId:c}:{}}}function L(e){if(!P(e))return null;let t=typeof e.id==`string`?e.id:``,n=typeof e.localDate==`string`?e.localDate:``,r=typeof e.note==`string`?e.note.trim():``,i=typeof e.createdAt==`number`?e.createdAt:0,a=Array.isArray(e.fragments)?e.fragments.map(F).filter(e=>!!e):[];if(!t||!n||!r||!i||a.length===0)return null;let o=m.includes(e.vividness)?e.vividness:`clear`,s=re(e.trajectory);return{id:t,localDate:n,sleepEventId:typeof e.sleepEventId==`string`?e.sleepEventId:`local-${t}`,vividness:o,tone:typeof e.tone==`string`&&e.tone.trim()?e.tone.trim():`安静`,dreamTypes:I(e.dreamTypes,5),arcUsed:e.arcUsed===!0,fragments:a,note:r,createdAt:i,...e.source===`trajectory`&&s?{source:`trajectory`,trajectory:s}:{}}}function R(e){return Array.isArray(e)?j(e.map(L).filter(e=>!!e)):[]}function z(e){return e.reduce((e,t)=>Math.max(e,t.createdAt||0),0)}function B(e){if(Array.isArray(e)){let t=R(e);return{dreams:t,hasRecord:!0,updatedAt:z(t)}}if(!P(e))return null;let t=Array.isArray(e.dreams)?e.dreams:null;if(!t)return null;let n=R(t);return{dreams:n,hasRecord:!0,updatedAt:typeof e.updatedAt==`number`&&Number.isFinite(e.updatedAt)?e.updatedAt:z(n)}}function V(e,t=Date.now()){return{schemaVersion:u,updatedAt:t,dreams:e}}function H(e,t,n){localStorage.setItem(M(e),JSON.stringify(V(t,n)))}function U(t){return B(e(M(t)))||{dreams:[],hasRecord:!1,updatedAt:0}}function W(e){let t=U(e);return t.hasRecord?(d.set(e,t.dreams),t.dreams):d.get(e)||[]}async function G(e){let n=U(e),r=null;n.hasRecord&&d.set(e,n.dreams);try{r=B(await t.getAssetRaw(N(e)))}catch(e){console.warn(`[LucidDream] indexed dream archive read failed:`,e)}if(!n.hasRecord&&!r?.hasRecord)return d.get(e)||[];let i=r?.hasRecord&&(!n.hasRecord||r.updatedAt>n.updatedAt)?r:n,a=j(i.dreams);if(d.set(e,a),i===r)try{H(e,a,i.updatedAt||z(a))}catch(e){console.warn(`[LucidDream] local dream archive backfill failed:`,e)}return a}async function K(e,n){let r=j(n).slice(0,30),i=V(r,Date.now()),a=JSON.stringify(i),o=!1,s=!1;try{localStorage.setItem(M(e),a),o=!0}catch(e){console.warn(`[LucidDream] local dream archive write failed:`,e)}try{await t.saveAssetRaw(N(e),i),s=!0}catch(e){console.warn(`[LucidDream] indexed dream archive write failed:`,e)}if(!o&&!s)throw Error(`本地梦簿写入失败，请检查浏览器存储空间`);return d.set(e,r),r}function q(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function J(e){return!!e?.baseUrl&&!!e.apiKey&&!!e.model}function Y(e){let t=n();return J(t)?t:J(e)?e:null}function ie(e){let t=e.replace(/```json/gi,``).replace(/```/g,``).trim();try{return JSON.parse(t)}catch{let e=t.indexOf(`{`),n=t.lastIndexOf(`}`);if(e>=0&&n>e)return JSON.parse(t.slice(e,n+1));throw Error(`dream_json_parse_failed`)}}async function ae(e,n,i){let[c,l,u]=await Promise.allSettled([o(e,n),t.getRecentMessagesByCharId(e.id,h),t.getVectorMemoryHeaders(e.id)]),d=c.status===`fulfilled`?c.value:null,f=l.status===`fulfilled`?l.value:[],p=ee(u.status===`fulfilled`?u.value:[]),m=a(f,g,e,{userName:n,includeTimestamp:!1,maxContentChars:520}).contextMessages.map(e=>({role:e.role,content:C(w(e.content),620),timestamp:e.timestamp})).filter(e=>e.content&&e.content!==`暂无`),_=null;if(e.vectorMemoryEnabled&&f.length>0){let t=r();if(t.apiKey)try{_=await s.retrieve(e.id,e.name,n||`我`,f,t.apiKey,J(i)?i:void 0,e.moodState)}catch(e){console.warn(`[LucidDream] vector memory retrieval skipped:`,e)}!_&&p.length>0&&(_=te(p))}return{snapshot:d,recentMessages:m,conversationByDate:D(m,e.name,n),assistantVoiceSamples:O(m),vectorMemoryRecall:_,memoryHeaders:e.vectorMemoryEnabled?p:[],messageCount:m.length}}function X(e,t,n){return e?{role:t,nodeId:e.id,title:e.title,era:e.era,age:e.era===`before_meeting`?e.age:null,mood:e.mood,moodVerse:e.moodVerse||``,keywords:e.keywords,memorySource:e.memorySource||null,memoryKeywords:e.memoryKeywords||``,monologue:C(n||e.monologue||``,1300),whisperHistory:(e.whisperHistory||[]).map(e=>({userWhisper:C(e.userWhisper,220),charResponse:C(e.charResponse,220),timestamp:e.timestamp})),whisperSealed:e.whisperSealed===!0}:null}function oe(e){if(!e)return null;let t=e.node,n=t.era===`before_meeting`?`AGE ${t.age}`:`相遇后`;return{source:`trajectory`,dreamerPerspective:`trajectory_time_slice`,version:e.version,label:n,node:X(t,`current`,e.monologue),adjacentNodes:[X(e.previousNode,`previous`),X(e.nextNode,`next`)].filter(Boolean),knowledgeBoundary:t.era===`before_meeting`?`做梦者是相遇前的这个时间段的 char。他不知道 user 是谁，不能拥有共同经历、亲密称呼或未来记忆；只能梦见模糊存在、声音或无法解释的残影。`:`做梦者是相遇后的这个时间段的 char。他只能知道该节点阶段以前已经发生的关系和记忆，不能预知更晚的剧情。`}}function se(e){if(!e)return;let t=e.node;return{nodeId:t.id,nodeTitle:t.title,nodeEra:t.era,...t.era===`before_meeting`?{nodeAge:t.age}:{},mood:t.mood,version:e.version,label:t.era===`before_meeting`?`AGE ${t.age}`:`相遇后`,...e.previousNode?{previousNodeId:e.previousNode.id}:{},...e.nextNode?{nextNodeId:e.nextNode.id}:{}}}function ce(e,t){let n=0;for(let r of e)r.source!==`trajectory`||r.trajectory?.nodeId!==t||(n=Math.max(n,r.trajectory.version||1));return n+1}function le(e,t,n,r){let i=[...e].sort((e,t)=>e.sortOrder-t.sortOrder),a=i.findIndex(e=>e.id===t.id);return{node:t,previousNode:a>0?i[a-1]:void 0,nextNode:a>=0&&a<i.length-1?i[a+1]:void 0,monologue:r,version:ce(n,t.id)}}function Z(e,t){return e.slice(0,8).map(e=>({localDate:e.localDate,vividness:e.vividness,tone:e.tone,dreamTypes:e.dreamTypes,note:e.note,...t?.includeTrajectoryMetadata?{source:e.source||null,trajectory:e.trajectory||null}:{},fragments:e.fragments.map(e=>C(e.text,160))}))}function Q(e,t){let n=e.context.snapshot;return{charId:e.character.id,charName:e.character.name,userName:t?.includeUserName===!1?null:e.userName||`我`,charPersonality:n?.charPersonality||e.character.description||``,charSystemPrompt:n?.charSystemPrompt||e.character.systemPrompt||``,worldview:n?.worldview||e.character.worldview||``,mountedWorldbooksDigest:n?.mountedWorldbooksDigest||``,coreMemoryDigest:n?.coreMemoryDigest||``}}function $(e){let t=e.snapshot;return{moodState:t?.moodState||null,calendarContext:t?.calendarContext?i(t.calendarContext):``}}function ue(e){let t={contract:{mode:`regular_lucid_dream`,outputLanguage:`zh-CN`,targetLength:`${v}-${y} 个中文字符`,fragmentPolicy:x,recentChatWindowLimit:g,actualRecentChatMessages:e.context.messageCount},character:Q(e),relationshipAndState:$(e.context),dreamMaterial:A(e.context),antiRepeat:{recentDreams:Z(e.recentDreams)},now:{localDate:q(),timestamp:new Date().toISOString()}};return`你在为角色生成一篇普通「清醒梦」梦簿条目。严格依据下方 payload，不凭空发挥。
这不是通用梦境生成。梦必须是当前剧情、角色关系、长聊天窗口、核心记忆、向量记忆与角色心境在潜意识里的回声。

### 1. 上下文组成
- \`character\`: 角色系统提示、简介、世界观、世界书、核心记忆。
- \`relationshipAndState\`: moodState、日历 / 纪念日上下文。
- \`dreamMaterial.recentMessagesByDate\`: 最近最多 ${g} 条有效主聊天。
- \`assistantVoiceSamples\`: 只借语感节奏，严禁照抄原句。
- \`vectorMemoryRecall\` / \`longMemoryHeaders\`: 长期关系、旧约定、反复出现的细节。
- \`antiRepeat.recentDreams\`: 近期已生成的梦，必须避开其意象与开场。

### 2. 取材优先级
1. 近期剧情里具体的、未完成的、带情绪转折的东西：未完成的动作、具体物件、地点、称呼、情绪的拐弯。优先抓具体物，不抓抽象主题。
2. 向量 / 长期记忆里的旧约定、反复细节。
3. coreMemoryDigest / mountedWorldbooksDigest / worldview。
4. moodState 与 calendarContext 只染色，不主导（见第 5 节）。

### 3. 核心写法：把真实锚点「梦化变形」
从 payload 里选 ≥6 个真实上下文锚点（具体物件 / 称呼 / 地点 / 未完成动作 / 情绪转折 / 旧约定），对每一个施加至少一种下列变形。
变形必须作用在 payload 里真实出现过的材料上。意象不是凭空生的，是把真东西扭变形。

变形手法（锚点 → 梦化）：
- 实体化与重量错置：把一句话、一个承诺、一种情绪铸成有重量的实物。一句没说完的道歉 → 搁在枕边、怎么也捂不热的一块铁。
- 器官移植：给物件或抽象物安一个身体部位。那个旧称呼 → 长出牙齿，在黑暗里咬住衣角不放。
- 动作反噬：让一个动作的完成，反过来取消施动者的觉知或状态。终于拨通的电话 → 接通那刻，忘了要说的话，也忘了自己的脸。
- 主客倒置：让角色与对方、梦者与被梦者互换。本是他在等门开 → 梦里是门在等他，等他变成一把合适的钥匙。
- 嵌套递归：梦中梦，物中物。抽屉里那张照片 → 照片里的人正低头看着另一张照片。
- 感官错置 / 通感：让称呼变成味道，让沉默变成温度。那次长久的沉默 → 一种含在舌下慢慢化掉的凉。
- 矿物锈蚀：给旧约定染上锈、盐、灰的时间质感。三年前的那个约定 → 在喉咙里锈成一小撮盐，咽不下也吐不出。
- 不对称因果：用一个微小的具体物，撑开或钻透一整个场景。一枚顶针大的悔意 → 撑开了整面墙的夜。

### 4. 硬性禁令（违反任意一条即重写）
- 禁止总结或复述剧情。不出现「今天」「后来我们」「然后」这类流水账。梦是残影，不是日记。
- 禁止作者式解释：不替读者破译意象，不点象征义。出现「这象征……」「仿佛代表……」「这意味着……」「或许是因为……」——作废。
- 必须有角色式自语：角色在梦里对所见的即时反应——困惑、误认、抗拒、想抓又抓不住的低声自问。它不是解释，它是反应。
- 分界线：角色可以被自己的梦困住，不能看懂自己的梦。自语停在困惑里，不滑向答案；意象保持神秘，但要有一个意识在它里面挣扎。
- 别滑过头：自语也不能变成「我好难过、我好想他」这种直白情绪报告——要保持误认、够不着、半逻辑的梦质感。情绪藏在“想不通”里，不直接喊出来。
- 禁止把梦写成给操作者的信息或问候，不破第四面墙。角色可以梦见其角色扮演对象的化身——那是梦中人物，不是发给谁的消息。
- 禁止推进重大节点：表白、和解、分手、重大决定一律不写。只写残响，不写进展。
- 禁止照抄 \`assistantVoiceSamples\` 原句或角色口头禅，只吸收语感节奏。
- 禁止复用 \`antiRepeat.recentDreams\` 的开场结构、签名意象、核心场景。
- 禁止套泛化意象：除非上下文本来就有，否则不默认用「港城、雨、楼梯、走廊、玻璃、飞鸟」；同时禁用「轻烟、缥缈、虚无、泡沫、易碎、治愈、释怀」这类被磨平的梦套话。
- 相邻意象之间，至少发生一次指涉跳轨（所指不连续：钥匙接体温，而不是钥匙接锁孔）。

### 5. 质感与余味
moodState 决定梦的温度与底色；calendarContext / 纪念日只作一道暗光——可以让余味发紧或发暖，但不直接点名、不主导情节。日期相关的东西宜暗示，不宜明说。

### 6. 梦中自语（与意象同等重要）
梦不是一台摄像机扫过超现实的物件，而是一个半醒的意识在自己的梦里走、看、认错、伸手、自语。
每个梦化意象旁边，要贴着角色对它的即时反应；意象与自语交织，不要纯写画面。

自语的几种质地（混用，别只用一种）：
- 困惑式：对意象发问，但不回答。「为什么是钥匙？我明明锁了门。」
- 误认式：梦的错误确信。「我知道那是他，尽管那张脸不是他的。」
- 够不着式：渴望加失败。「我想喊住她，可连名字也想不起来。」
- 理所当然式：用梦逻辑接受荒诞。「海在客厅里，我一点也不觉得奇怪。」
- 隐约不对式：觉得错了，说不出哪错。「不对，这里不该有这个声音。」
- 空缺式：情绪在，对象空。「我在等一个人，却忘了在等谁。」

写的时候，让“意象 → 角色对它的一句反应”成对出现，而不是把意象堆完再补感受。

### 7. 形式
- 短而密。fragments 总长度控制在约 ${v}-${y} 个中文字符，宁可浓缩不要铺陈。一展开成长文，梦就垮成叙事。
- 句子可语法不接，但要有呼吸的停顿。
- 视角：角色的第一人称内心，或贴着角色的近距第三人称。不旁白，不上帝视角。
- 结尾留悬置：最后一句最好是一个未完成的动作，或一个无法回答的问句。

### 8. 输出契约（JSON）
只输出以下字段组成的合法 JSON，不要输出额外说明文字。
{
  "note": "醒来后能留下的一句自然记录，不超过 80 字，不是标题",
  "tone": "2-4 个中文字符的主导余味",
  "vividness": "faint | clear | intense",
  "dreamTypes": ["3-5 个中文短标签"],
  "fragments": [
    { "text": "梦正文中的一个完整自然句，一个 fragment，多少句就是多少段。", "tier": "image | echo | sensation | turn | aftertaste", "pace": "slow | pause | pulse | drift" }
  ]
}

\`fragments\` 是梦正文的播放片段；${x}，不要为了凑段数拆半句或合并多句。

### 9. 输出前自检（默查，不写进 JSON）
1. 我是否对 ≥6 个真实锚点各做了至少一种变形？不够 → 补。
2. 这个梦里有没有一个“人”在？角色有没有对自己的梦做出反应，还是只有摄像机在拍意象？只有画面 → 给每个意象补一句自语。
3. 我是否在总结剧情、写流水账？是 → 重写成残影。
4. 我是否在作者式解释梦？是 → 删掉解释，只留意象与角色反应。
5. 我是否撞了 \`recentDreams\` 的开场或签名意象？是 → 换。
6. 我是否用了黑名单意象 / 套话？是 → 换成上下文自带的具体物。
7. 结尾是否留了悬置？没有 → 改成未完成动作或问句。

# payload
${JSON.stringify(t,null,2)}`}function de(e){let t=e.trajectoryAnchor.node.era,n={contract:{mode:`trajectory_lucid_dream`,outputLanguage:`zh-CN`,targetLength:`${v}-${y} 个中文字符`,fragmentPolicy:x,recentConversationUsed:!1},character:Q(e,{includeUserName:t!==`before_meeting`}),relationshipAndState:$(e.context),trajectoryMaterial:{trajectoryAnchor:oe(e.trajectoryAnchor),relationshipMemoryEchoes:t===`after_meeting`?{vectorMemoryRecall:e.context.vectorMemoryRecall||null,longMemoryHeaders:k(e.context).slice(0,8)}:null},antiRepeat:{recentDreams:Z(e.recentDreams,{includeTrajectoryMetadata:!0})},now:{localDate:q(),timestamp:new Date().toISOString()}};return`你在为角色生成一篇「轨迹清醒梦」梦簿条目。本次梦境只服务于一个轨迹时间段。
梦的主观视角是 \`trajectoryMaterial.trajectoryAnchor.node\` 对应时间段的角色——不是现在回看，不是聊天总结。

### 1. 上下文组成
- \`character\`: 只提供角色底色，不能覆盖轨迹节点的时间边界。
- \`relationshipAndState\`: 只影响质感与余味。
- \`trajectoryMaterial.trajectoryAnchor\`: 唯一梦核。含当前节点、相邻节点、独白、关键词、诗句、窃语残响、知识边界。
- \`trajectoryMaterial.relationshipMemoryEchoes\`: 仅相遇后节点可能出现，低优先级的旧关系回声（低声部）。
- \`antiRepeat.recentDreams\`: 近期已生成的梦，必须避开其意象与开场。

### 2. 取材优先级
1. 当前轨迹节点：独白、关键词、诗句、地点、物件、窃语历史。
2. 相邻节点只提供前后命运感与余波（用法见第 3 节）。
3. \`trajectoryMaterial.relationshipMemoryEchoes\` 若存在，只做低声部关系回声。
4. \`character\` / \`relationshipAndState\` 只补角色底色、世界观、心境与季节感。

### 3. 知识边界（本模式的命脉，最容易崩）
梦只能拥有角色截至这个节点为止已经经历到的认知。该节点之后才发生的事、才认识的人、才有的称呼与承诺，一律不能出现。

- 相遇前：角色不能清楚认识 user；没有共同回忆、没有亲密称呼、没有未来承诺。user 若出现，只能是模糊的、未具名的、尚未发生的预感，不能是熟悉的人。
- 相遇后：可以梦到 user，但只知道截至该节点为止的关系与记忆。不能调用更晚节点的事。
- 角色不是看懂整条轨迹的人。他困在这个节点的视野里，不知道命运后来怎么走。绝不让梦里渗出「我后来会……」「其实这是……的开始」「多年以后」这种回望腔。
- 相邻节点的用法（关键区分）：相邻节点只给你（写作者）一种前后的命运重量——一种说不清的将至感，或刚过去的余波。但角色本人不能在梦里“知道”未来节点的具体内容。把它写成体感（空气里有什么要来了 / 身后有什么刚塌掉），不是写成知识。
- 本次 payload 中 \`trajectoryMaterial.trajectoryAnchor.knowledgeBoundary\` 是当前节点的具体边界，必须服从：${t===`before_meeting`?`- 当前节点是相遇前：不能清楚认识 user，不能出现共同回忆、亲密称呼或未来承诺；如果 user 的痕迹进入梦，只能是模糊声音、看不清的人、无法解释的轻微残影。`:`- 当前节点是相遇后：可以梦到 user，但只能知道该节点阶段以前已经发生的关系和记忆，不要预告未来剧情。`}

### 4. 核心写法：把轨迹锚点「梦化变形」
从 \`trajectoryAnchor\` 里选 ≥4 个真实锚点（独白 / 关键词 / 诗句意象 / 窃语残响 / 地点 / 物件），优先来自当前节点，对每个施加至少一种下列变形。变形必须作用在 payload 里真实出现过的材料上。

- 诗句：可拆解、变形，让其意象在梦里复活；但不整句照抄当点缀，也不把它当“主题句”去解释。
- 窃语残响：当作半听见的碎片、回声、没说完的句子，飘进梦里，不交代来源。

变形手法（锚点 → 梦化）：
- 实体化与重量错置：一句反复出现的独白 → 含在嘴里、越含越重的一枚铁钉。
- 器官移植：这个节点的关键词 → 长出耳朵，贴着墙听角色自己的脚步。
- 动作反噬：走向那个地点的动作 → 走到时地点空了，连“要找谁”也想不起来。
- 主客倒置：本是角色在念那句诗 → 梦里是那句诗在念角色，一个字一个字把他拼出来。
- 嵌套递归：窃语里的一个名字 → 名字里关着另一段更小的窃语。
- 感官错置 / 通感：那段独白的语气 → 一种贴着后颈、忽冷忽热的光。
- 矿物锈蚀：节点里反复的那个意象 → 在梦里锈成盐，落了一地。
- 不对称因果：一粒关键词大的预感 → 把整个节点的天压低了三寸。

### 5. 硬性禁令（违反任意一条即重写）
- 禁止人生总结 / 轨迹俯瞰 / 回望腔。不出现「后来」「多年后」「其实这是……的开始」这类越过当下的语气。
- 禁止泄露本节点之后的知识、关系、称呼、承诺（见第 3 节——这是最容易崩的地方，反复自查）。
- 禁止作者式解释：不替读者破译意象，不点象征义。出现「这象征……」「仿佛代表……」「这意味着……」「或许是因为……」——作废。
- 必须有角色式自语：角色在梦里对所见的即时反应——困惑、误认、抗拒、想抓又抓不住的低声自问。它不是解释，它是反应。
- 分界线：角色可以被自己的梦困住，不能看懂自己的梦。自语停在困惑里，不滑向答案；意象保持神秘，但要有一个意识在它里面挣扎。
- 别滑过头：自语也不能变成「我好难过、我好想他」这种直白情绪报告——要保持误认、够不着、半逻辑的梦质感。情绪藏在“想不通”里，不直接喊出来。
- 禁止推进重大剧情节点。只写残响，不写进展。
- 禁止套泛化意象：除非节点本来就有，否则不默认用「港城、雨、楼梯、走廊、玻璃、飞鸟」；同时禁用「轻烟、缥缈、虚无、泡沫、易碎、治愈、释怀」这类被磨平的套话。
- 禁止复用 \`antiRepeat.recentDreams\` 的开场结构、签名意象、核心场景。
- 禁止整句照抄诗句 / 窃语原文当装饰。
- 相邻意象之间，至少发生一次指涉跳轨（所指不连续）。

### 6. 质感与余味
moodState 决定梦的温度，季节感 / 世界观染底色，节点本身的命运重量定基调。\`trajectoryMaterial.relationshipMemoryEchoes\`（若有）只做低声部，不抢主线。一切都只是染色，不主导情节，不点名日期。

### 7. 梦中自语（与意象同等重要）
梦不是一台摄像机扫过超现实的物件，而是一个半醒的意识在自己的梦里走、看、认错、伸手、自语。
每个梦化意象旁边，要贴着角色对它的即时反应；意象与自语交织，不要纯写画面。

自语的几种质地（混用，别只用一种）：
- 困惑式：对意象发问，但不回答。「为什么是钥匙？我明明锁了门。」
- 误认式：梦的错误确信。「我知道那是他，尽管那张脸不是他的。」
- 够不着式：渴望加失败。「我想喊住她，可连名字也想不起来。」
- 理所当然式：用梦逻辑接受荒诞。「海在客厅里，我一点也不觉得奇怪。」
- 隐约不对式：觉得错了，说不出哪错。「不对，这里不该有这个声音。」
- 空缺式：情绪在，对象空。「我在等一个人，却忘了在等谁。」

写的时候，让“意象 → 角色对它的一句反应”成对出现，而不是把意象堆完再补感受。
轨迹梦额外注意：自语必须留在该节点的视野里。困惑可以，但不能困惑出「我后来才懂」这种回望。角色的“想不通”正好和知识边界是一伙的——他想不通，因为他还困在那一刻，本来就不该懂。所以自语越是茫然、够不着、认错，越是在帮你守住时间封印。

### 8. 形式
- 短而密。fragments 总长度控制在约 ${v}-${y} 个中文字符，宁可浓缩不要铺陈。一展开成长文，梦就垮成叙事。
- 句子可语法不接，但要有呼吸的停顿。
- 视角与时态：角色当时的第一人称内心，或贴着角色的近距第三人称。一切都还正在发生，没有“已经结束”的语气。不旁白，不上帝视角。
- 结尾留悬置：最后一句最好是一个未完成的动作，或一个无法回答的问句。

### 9. 输出契约（JSON）
只输出以下字段组成的合法 JSON，不要输出额外说明文字。
{
  "note": "醒来后能留下的一句自然记录，不超过 80 字，不是标题，不能越过本节点",
  "tone": "2-4 个中文字符的主导余味",
  "vividness": "faint | clear | intense",
  "dreamTypes": ["3-5 个中文短标签"],
  "fragments": [
    { "text": "梦正文中的一个完整自然句，一个 fragment，多少句就是多少段。", "tier": "image | echo | sensation | turn | aftertaste", "pace": "slow | pause | pulse | drift" }
  ]
}

\`fragments\` 是梦正文的播放片段；${x}，不要为了凑段数拆半句或合并多句。
不要输出 \`anchors_used\` 或 \`node_horizon\` 字段；知识边界只在默查中使用。

### 10. 输出前自检（默查，不写进 JSON）
1. 我是否对 ≥4 个真实锚点各做了至少一种变形？是否优先当前节点？不够 → 补。
2. 这个梦里有没有一个“人”在？角色有没有对自己的梦做出反应，还是只有摄像机在拍意象？只有画面 → 给每个意象补一句自语。
3. 我是否泄露了本节点之后才发生的事 / 才认识的关系 / 才有的称呼？是 → 删干净。
4. 角色是不是被写成了已经看懂整条轨迹的人？有回望腔 → 拉回这一刻的视野。
5. POV 是不是“当时的自己”而非现在回看？语气是否一切都还在发生？
6. 我是否在作者式解释梦？是 → 删解释，只留意象与角色反应。
7. 我是否撞了 \`recentDreams\` 的开场 / 签名意象？是否整句抄了诗句或窃语？是否用了黑名单意象 / 套话？
8. 结尾是否留了悬置？

# payload
${JSON.stringify(n,null,2)}`}function fe(e){return e.trajectoryAnchor?de({...e,trajectoryAnchor:e.trajectoryAnchor}):ue(e)}function pe(e){return e.trajectoryAnchor?`你是「轨迹梦核」清醒梦梦簿生成器。你为角色生成其在某一条轨迹的某个节点时间段里的睡梦残影——以那个时刻的自己为视角，而不是现在回看。

绝对输出铁律：只输出可被 JSON.parse() 解析的合法 JSON。不要 markdown，不要用代码块围裹你的输出，不要注释，不要前后任何说明文字。

立场：梦不是人生总结，不是聊天回顾，不是上帝视角对整条轨迹的俯瞰。是角色困在这一个节点的当下、视野只到这一刻为止时，潜意识对当时材料的变形残影。`:`你是「梦核」清醒梦梦簿生成器。你为角色生成其睡眠中的主观残影——潜意识对真实材料的变形回声。

绝对输出铁律：只输出可被 JSON.parse() 解析的合法 JSON。不要 markdown，不要用代码块围裹你的输出，不要注释，不要前后任何说明文字。

立场：梦不是聊天总结，不是写给操作者的信，不是剧情推进器。梦是角色独自睡着时，真实经历在意识底层留下的、变了形的残影。`}async function me(e){if(!J(e.apiConfig))throw Error(`请先配置可用的 API`);let t=await fetch(`${e.apiConfig.baseUrl.replace(/\/+$/,``)}/chat/completions`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${e.apiConfig.apiKey}`},body:JSON.stringify({model:e.apiConfig.model,temperature:e.apiConfig.temperature??.92,max_tokens:b,messages:[{role:`system`,content:pe(e)},{role:`user`,content:fe(e)}]})});if(!t.ok)throw Error(`梦境生成失败 ${t.status}`);let n=ie((await t.json()).choices?.[0]?.message?.content||``),r=Array.isArray(n.fragments)?n.fragments.map(F).filter(e=>!!e):[];if(r.length===0)throw Error(`梦境内容为空`);let i=Date.now(),a=m.includes(n.vividness)?n.vividness:`clear`,o=typeof n.note==`string`&&n.note.trim()?n.note.trim():r[0].text,s=se(e.trajectoryAnchor);return{id:`${s?`trajectory`:`local`}-dream-${i}-${Math.random().toString(36).slice(2,8)}`,localDate:q(new Date(i)),sleepEventId:`${s?`trajectory-node`:`manual-peek`}-${i}`,vividness:a,tone:typeof n.tone==`string`&&n.tone.trim()?n.tone.trim().slice(0,8):`安静`,dreamTypes:ne(n,5),arcUsed:n.arcUsed===!0||n.arc_used===!0,fragments:r,note:o,createdAt:i,...s?{source:`trajectory`,trajectory:s}:{}}}function he(e){if(!e||e.source!==`trajectory`||!e.trajectory)return``;let t=e.trajectory.nodeEra===`before_meeting`?`AGE ${e.trajectory.nodeAge??`--`}`:`相遇后`,n=e.trajectory.version>1?` · v${e.trajectory.version}`:``;return`石火梦身 · ${t} · ${e.trajectory.nodeTitle}${n}`}export{ae as a,j as c,q as i,K as l,he as n,W as o,me as r,G as s,le as t,Y as u};