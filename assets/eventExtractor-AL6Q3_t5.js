import{U as e,W as t}from"./runtimeConfig-LnDFd7sY.js";import{c as n}from"./apiRequestLedger-nkZkkXOY.js";import{it as r}from"./index-YamY73pN.js";import{t as i}from"./temporalContext-BE69Pl-g.js";var a=2e4,o=!1,s=`外卖.快递.洗澡.开会.上课.下课.考试.健身.出去.出门.回来.回家.吃饭.做饭.午休.睡觉.上班.下班.面试.约会.看病.取.拿.分钟.小时.半小时.一会儿.一会.等下.待会.马上.明天.后天.下午.晚上.早上.过会.等会.要去.打算.准备.计划.约了.得去.该去`.split(`.`);function c(e){let t=e.toLowerCase();return s.some(e=>t.includes(e))}function l(e,t){return`用户刚才说了一句话，请判断里面有没有提到即将发生的事件（需要等待一段时间的事）。

用户消息: "${e.slice(0,200)}"
当前时间: ${t}

判断标准：
- 有明确的未来事件（如：点外卖→等外卖到、去开会→会议结束、去洗澡→洗完回来）
- 有时间暗示（如："半小时后"、"一会儿"、"等下"）
- 不是正在进行的事（如"我在吃饭"不算，"我要去吃饭"才算）

如果有时间相关事件，输出 JSON:
{"hasEvent":true,"event":"事件描述(5字以内)","estimatedMinutes":预计分钟数,"confidence":"high或medium"}

如果没有:
{"hasEvent":false}

规则:
- confidence: 用户明确说了时间→high，需要靠常识推断→medium
- estimatedMinutes: 用户说了具体时间就用，没说就用常识估计
- 只输出纯 JSON，不要其他文字`}function u(e){return typeof e.hasEvent==`boolean`?{hasEvent:e.hasEvent,event:e.event?String(e.event).slice(0,20):void 0,estimatedMinutes:typeof e.estimatedMinutes==`number`?Math.max(1,Math.min(1440,Math.round(e.estimatedMinutes))):void 0,confidence:[`high`,`medium`,`low`].includes(e.confidence)?e.confidence:`medium`}:null}async function d(s,d,f){if(!(!d||d.length<3||!c(d))){if(o){console.log(`⏰ [EventExtractor] Already extracting, skipping`);return}o=!0;try{let o=new Date,c=l(d,`${o.getFullYear()}-${(o.getMonth()+1).toString().padStart(2,`0`)}-${o.getDate().toString().padStart(2,`0`)} ${o.getHours().toString().padStart(2,`0`)}:${o.getMinutes().toString().padStart(2,`0`)}`),p=new AbortController,m=setTimeout(()=>p.abort(),a);try{let a=`${f.baseUrl.replace(/\/+$/,``)}/chat/completions`,o=await n({feature:`memory`,reason:`时间事件提取`,model:f.model,conversationId:s,userInitiated:!1,url:a},()=>fetch(a,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${f.apiKey}`},body:JSON.stringify({model:f.model,messages:[{role:`user`,content:c}],temperature:.1,max_tokens:6e4}),signal:p.signal}));if(!o.ok){let t=Error(`HTTP ${o.status}`);t.status=o.status,e(f,t),console.warn(`⏰ [EventExtractor] LLM error ${o.status}`);return}let l=await o.json();t(f);let m=(l.choices?.[0]?.message?.content||``).trim();m=m.replace(/<think>[\s\S]*?<\/think>/g,``).trim(),m=m.replace(/<think>[\s\S]*/g,``).trim();let h=r(m,u);if(!h){console.warn(`⏰ [EventExtractor] Failed to parse JSON:`,m.slice(0,80));return}if(h.hasEvent&&h.event&&h.estimatedMinutes){let e=Date.now();i({id:`evt-${e}-${Math.random().toString(36).slice(2,6)}`,charId:s,event:h.event,estimatedMinutes:h.estimatedMinutes,confidence:h.confidence||`medium`,createdAt:e,dueAt:e+h.estimatedMinutes*6e4})}else console.log(`⏰ [EventExtractor] No event detected in: "${d.slice(0,50)}"`)}finally{clearTimeout(m)}}catch(t){t.name===`AbortError`?(e(f,t),console.warn(`⏰ [EventExtractor] Timed out (${a}ms)`)):(e(f,t),console.error(`⏰ [EventExtractor] Error:`,t.message))}finally{o=!1}}}var f={extract:d,hasTimeKeyword:c};export{f as t};