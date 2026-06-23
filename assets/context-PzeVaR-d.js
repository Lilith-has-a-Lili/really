var e=[`dopamine`,`serotonin`,`cortisol`,`oxytocin`,`norepinephrine`,`endorphin`,`energy`],t={dopamine:{up:.7,down:.6},serotonin:{up:.15,down:.1},cortisol:{up:.8,down:.15},oxytocin:{up:.2,down:.2},norepinephrine:{up:.6,down:.4},endorphin:{up:.5,down:.6},energy:{up:.3,down:.2}},n=.3,r=.5,i={dopamine:.5,serotonin:.5,cortisol:.5,oxytocin:.5,norepinephrine:.5,endorphin:.5,energy:.7},a={dopamine:1,serotonin:24,cortisol:4,oxytocin:12,norepinephrine:2,endorphin:1.5,energy:1/0},o={"+high":.85,"+medium":.7,"+low":.6,stable:NaN,"-low":.4,"-medium":.3,"-high":.15},s=[{senseKey:`excitement`,hormoneKey:`dopamine`},{senseKey:`stability`,hormoneKey:`serotonin`},{senseKey:`pressure`,hormoneKey:`cortisol`},{senseKey:`closeness`,hormoneKey:`oxytocin`},{senseKey:`focus`,hormoneKey:`norepinephrine`},{senseKey:`relief`,hormoneKey:`endorphin`},{senseKey:`energyDrain`,hormoneKey:`energy`,invert:!0}];function c(e){if(e.direction===`none`)return{};let t=e.goalUtility,n=e.direction===`advance`?1:-1,r={};return r.dopamine=n*t*.12,r.cortisol=-n*t*.1,e.goalCategory===`attachment`&&(r.oxytocin=n*t*.08),e.goalCategory===`protection`&&e.direction===`hinder`&&(r.norepinephrine=t*.06),e.direction===`advance`&&t>.7&&(r.serotonin=t*.05),r}function l(e){let t={};for(let n of s){let i=o[e[n.senseKey]]??r;t[n.hormoneKey]=n.invert&&!isNaN(i)?1-i:i}return t}function u(e,t,r,i){let a=t>e?r:i,o=e*(1-a)+t*a,s=o-e;return Math.abs(s)>n&&(o=e+Math.sign(s)*n),o}function d(t){let n={...t};if(n.cortisol>.6){let e=(n.cortisol-.6)*.5;n.serotonin*=1-e}if(n.cortisol>.6){let e=(n.cortisol-.6)*.3;n.oxytocin*=1-e}if(n.oxytocin>.6){let e=(n.oxytocin-.6)*.3;n.cortisol*=1-e}if(n.endorphin>.5){let e=(n.endorphin-.5)*.4;n.cortisol*=1-e}if(n.serotonin>.6){let e=(n.serotonin-.6)*.25;n.cortisol*=1-e}if(n.dopamine>.6&&n.cortisol>.6){let e=Math.min(n.dopamine-.6,n.cortisol-.6)*.4;n.norepinephrine=Math.min(.95,n.norepinephrine+e)}if(n.endorphin>.6){let e=(n.endorphin-.6)*.2;n.serotonin=Math.min(.95,n.serotonin+e)}if(n.cortisol>.7){let e=(n.cortisol-.7)*.35;n.dopamine*=1-e}if(n.cortisol>.7&&(n.energy-=(n.cortisol-.7)*.12),n.dopamine>.65){let e=(n.dopamine-.65)*.12;n.oxytocin=Math.min(.95,n.oxytocin+e)}if(n.serotonin>.7){let e=(n.serotonin-.7)*.15;n.dopamine*=1-e}if(n.dopamine>.7&&(n.energy-=(n.dopamine-.7)*.15),n.norepinephrine>.7&&(n.energy-=(n.norepinephrine-.7)*.08),n.energy<.3){let e=(.3-n.energy)*.4;n.serotonin-=e,n.norepinephrine-=e}for(let t of e)n[t]=Math.max(.05,Math.min(.95,n[t]));return n}function f(e,t=!1){return e>=6&&e<10?.1:e>=10&&e<14?.06:e>=14&&e<16?.04:e>=16&&e<22?.06:e>=22||e<1?t?-.03:.02:t?-.05:.08}function p(e){return e>=6&&e<10?.05:e>=10&&e<14?.02:e>=14&&e<18?0:e>=18&&e<22?-.02:e>=22||e<4?-.05:.02}function m(t,n,o=!1){let s={...t},c=n/36e5;if(c<.003)return s;let l=s.cortisol,u=new Date().getHours();for(let t of e){if(t===`energy`)continue;let e=a[t];if(!isFinite(e))continue;let n=t===`cortisol`?r+p(u):i[t],o=.5**(c/e);s[t]=n+(s[t]-n)*o}let d=c*f(u,o);if(l>.6){let e=(l-.6)*.5;d*=1-e}s.energy+=d;for(let t of e)s[t]=Math.max(.05,Math.min(.95,s[t]));return s}var h=3,g=.85,_=6,v=.9;function y(n,r,a){let o=Date.now();if(!r){let t=l(n);for(let n of e)isNaN(t[n])&&(t[n]=i[n]);return{...t,roundCount:1,updatedAt:o}}let s={dopamine:r.dopamine,serotonin:r.serotonin,cortisol:r.cortisol,oxytocin:r.oxytocin,norepinephrine:r.norepinephrine,endorphin:r.endorphin,energy:r.energy},f=m(s,o-r.updatedAt,!0),p=l(n);for(let t of e)isNaN(p[t])&&(p[t]=f[t]);if(a&&a.direction!==`none`){let t=c(a);for(let n of e){let e=t[n];e&&(p[n]=Math.max(.05,Math.min(.95,p[n]+e)))}}let y=r.streaks||{},b={};for(let n of e){let e=t[n],r=e.up,i=e.down,a=y[n]||0;if(a>h){let e=a-h;i*=g**+e}if(a>_){let e=a-_;r*=v**+e}b[n]=u(f[n],p[n],r,i)}let x=d(b),S={};for(let t of e){let e=i[t],n=x[t]-e,r=s[t]-e;Math.abs(n)>.15&&(Math.sign(n)===Math.sign(r)&&Math.abs(r)>.15?S[t]=(y[t]||0)+1:S[t]=1)}return{...x,streaks:Object.keys(S).length>0?S:void 0,roundCount:r.roundCount+1,updatedAt:o}}function b(e){return e&&typeof e.mood==`string`&&typeof e.intensity==`number`&&!(`dopamine`in e)}function x(e){let t=e.intensity/10,n=e.mood||`平静`,i=/[委屈难过伤心生气烦躁焦虑紧张害怕不安愤怒]/.test(n),a=/[开心高兴快乐幸福心动甜蜜放松满足期待兴奋]/.test(n);return{dopamine:a?r+t*.3:r-t*.1,serotonin:i?r-t*.3:r+t*.1,cortisol:i?r+t*.3:r-t*.1,oxytocin:a?r+t*.2:r,norepinephrine:t>.6?r+t*.2:r,endorphin:r,energy:r,innerVoice:e.innerVoice||``,surfaceEmotion:e.mood||`平静`,roundCount:e.roundCount||1,updatedAt:e.updatedAt||Date.now()}}function S(e){if(e)return b(e)?x(e):e}function C(){return{dopamine:r,serotonin:r,cortisol:r,oxytocin:r,norepinephrine:r,endorphin:r,energy:.7,innerVoice:``,surfaceEmotion:`平静`,roundCount:0,updatedAt:Date.now()}}function w(t){for(let n of e)if(Math.abs(t[n]-i[n])>.15)return!0;return!1}function T(t){return`${e.map(e=>`${e.slice(0,4)}=${t[e].toFixed(2)}`).join(` `)} | ${t.surfaceEmotion} | R${t.roundCount}`}function E(t){let n={};for(let r of e)n[r]=t[r];return n}function D(t){let n={dopamine:.45,serotonin:.45,cortisol:.45,oxytocin:.45,norepinephrine:.45,endorphin:.45,energy:.65},r=0;for(let a of e){let e=Math.abs(t[a]-i[a]);r+=e/n[a]}return r}function O(t,n){let i=0,a=0,o=0;for(let s of e){let e=s===`energy`?.7:r,c=t[s]-e,l=n[s]-e;i+=c*l,a+=c*c,o+=l*l}let s=Math.sqrt(a)*Math.sqrt(o);return s===0?.5:(i/s+1)/2}function k(){let e=localStorage.getItem(`body_signal_mode`);return e===`quantified`?`quantified`:e===`wordLibrary`?`wordLibrary`:`raw`}function A(e,t){if(!w(e))return``;let n=k();return n===`raw`?P(e,t||`你`):n===`quantified`?I(e):K(e)}var j={dopamine:.5,serotonin:.5,cortisol:.5,oxytocin:.5,norepinephrine:.5,endorphin:.5,energy:.7},M={dopamine:`DA`,serotonin:`5HT`,cortisol:`CORT`,oxytocin:`OXT`,norepinephrine:`NE`,endorphin:`END`,energy:`E`};function N(e,t){let n=e-t;return n>.12?`↑`:n<-.12?`↓`:``}function P(e,t){let n=[{key:`dopamine`,value:e.dopamine},{key:`serotonin`,value:e.serotonin},{key:`cortisol`,value:e.cortisol},{key:`oxytocin`,value:e.oxytocin},{key:`norepinephrine`,value:e.norepinephrine},{key:`endorphin`,value:e.endorphin},{key:`energy`,value:e.energy}],r=[];for(let e of n){let t=j[e.key];if(Math.abs(e.value-t)>.12){let n=M[e.key],i=N(e.value,t);r.push(`${n}=${e.value.toFixed(2)}${i}`)}}return r.length===0?``:`[内分泌·当前浓度]
${r.join(` `)}

${t}，虽然你不知道，但是体检单上显示了你此时的激素水平——它们潜移默化地改变着你的行为。`}function F(e,t=10){let n=Math.round(e*t);return`█`.repeat(n)+`░`.repeat(t-n)}function I(e){let t=[],n=[{label:`紧绷感`,value:e.cortisol,baseline:.5},{label:`安定感`,value:e.serotonin,baseline:.5},{label:`期待感`,value:e.dopamine,baseline:.5},{label:`亲近感`,value:e.oxytocin,baseline:.5},{label:`专注度`,value:e.norepinephrine,baseline:.5},{label:`释然感`,value:e.endorphin,baseline:.5},{label:`精力　`,value:e.energy,baseline:.7}];for(let e of n)Math.abs(e.value-e.baseline)>.12&&t.push(`${e.label} ${F(e.value)}`);return t.length===0?``:`[身体感知·本轮]
${t.join(`
`)}

这些是你身体的节律，像脉搏一样自然。
让它们渗进你的语气和节奏——但永远不要主动提起它们。`}var L={high:[`胸口有些发紧，像是有什么东西压着`,`后背绷得有些僵硬，掌心微微出汗`,`心跳比平时快了一点，喉咙发干`],medium:[`后颈有点僵，不算紧张但也不完全放松`,`身体有一种说不上来的警觉感`],low:[`浑身松松的，像是泡在温水里`,`呼吸很平稳，肩膀自然地垂着`]},R={high:[`心里很踏实，像是脚下踩着实地`,`整个人稳稳的，不会被轻易晃动`],medium:[`情绪还算平，但说不上特别安心`,`不好不坏，就这样吧`],low:[`心里有点空落落的，像是少了什么`,`情绪像是浮在水面上，不太稳当`,`脑子里冒出一些有的没的想法，按不住`]},z={high:[`心里有种微微的雀跃，像是在等什么好事发生`,`嘴角有点压不住，想说点什么的冲动`,`大脑在转得飞快，一个念头接一个念头`],medium:[`比平时精神了一点，有点想法在转`,`心里有一丝小期待，但还说不清是什么`],low:[`做什么都提不起劲来，兴趣寥寥`,`脑子有些发钝，不太想动`]},B={high:[`和TA说话的时候，身体不自觉地松了下来`,`胸腔有种微微发暖的感觉`,`有一种想靠近TA的本能`],medium:[`不排斥继续聊下去，但也没有特别想靠近`,`和TA之间保持着一个刚好的距离`],low:[`本能地想保持一点距离`,`身体有些收紧，像是在自我保护`,`不太想敞开自己`]},V={high:[`注意力非常集中，像是被什么抓住了`,`每个字都听得很清楚，大脑在飞速处理`],medium:[`脑子在转，但不算特别专注`,`注意力有一搭没一搭的`],low:[`思绪有点飘，不太集中得起来`,`听到什么都像隔了一层`,`时不时走神，想到别的事情上去了`]},H={high:[`身体有种轻盈的暖意，像是放下了什么`,`虽然刚才有些不好受，但现在松了一口气`,`一种淡淡的、说不上来的舒坦`],medium:[],low:[]},U={high:[`精神不错，脑子很清醒`,`浑身有使不完的劲`],medium:[],low_medium:[`有一点倦，但还撑得住`,`开始觉得有些累了`],low:[`脑子有些发沉，眼皮在打架`,`整个人懒洋洋的，什么都不太想做`,`打了个哈欠，精力真的不太够了`]},W=[{condition:e=>e.cortisol>.6&&e.oxytocin>.6,descriptions:[`明明身体很紧绷，但又舍不得离开TA`,`心里又慌又暖，两种感觉搅在一起`]},{condition:e=>e.energy<.35&&e.serotonin<.35,descriptions:[`整个人空落落的，不太想说话`,`累得连情绪都懒得表达了`]},{condition:e=>e.dopamine>.7&&e.oxytocin>.7,descriptions:[`心跳有些快，但不是因为紧张`,`整个人暖暖的，脑子里转的都是好事`]},{condition:e=>e.cortisol>.7&&e.energy<.3,descriptions:[`身体和脑子都在抗议，快到极限了`,`撑着一口气，但真的快撑不住了`]},{condition:e=>e.endorphin>.6&&e.oxytocin>.6,descriptions:[`刚才的疙瘩好像散开了一点，和TA在一起的感觉变柔和了`,`身体在告诉你：没事了，可以放下了`]},{condition:e=>e.norepinephrine>.7&&e.dopamine>.7,descriptions:[`整个人像上了发条一样，停不下来`,`大脑转得飞快，特别投入`]},{condition:e=>e.oxytocin<.3&&e.cortisol>.6,descriptions:[`身体本能地想缩起来，不想让任何人靠近`,`像是竖起了无形的刺`]},{condition:e=>e.serotonin<.35&&e.cortisol>.6,descriptions:[`情绪像是薄冰，稍微用力就会碎`,`一点小事都可能成为最后一根稻草`]}];function G(e){return e.length===0?null:e[Math.floor(Math.random()*e.length)]}function K(e){let t=[];if(e.cortisol>.7){let e=G(L.high);e&&t.push(e)}else if(e.cortisol>.55){let e=G(L.medium);e&&t.push(e)}else if(e.cortisol<.3){let e=G(L.low);e&&t.push(e)}if(e.serotonin>.7){let e=G(R.high);e&&t.push(e)}else if(e.serotonin<.35){let e=G(R.low);e&&t.push(e)}else if(e.serotonin>.55){let e=G(R.medium);e&&t.push(e)}if(e.dopamine>.7){let e=G(z.high);e&&t.push(e)}else if(e.dopamine<.3){let e=G(z.low);e&&t.push(e)}else if(e.dopamine>.55){let e=G(z.medium);e&&t.push(e)}if(e.oxytocin>.7){let e=G(B.high);e&&t.push(e)}else if(e.oxytocin<.3){let e=G(B.low);e&&t.push(e)}else if(e.oxytocin>.55){let e=G(B.medium);e&&t.push(e)}if(e.norepinephrine>.7){let e=G(V.high);e&&t.push(e)}else if(e.norepinephrine<.3){let e=G(V.low);e&&t.push(e)}else if(e.norepinephrine>.55){let e=G(V.medium);e&&t.push(e)}if(e.endorphin>.65){let e=G(H.high);e&&t.push(e)}if(e.energy>.8){let e=G(U.high);e&&t.push(e)}else if(e.energy<.25){let e=G(U.low);e&&t.push(e)}else if(e.energy<.4){let e=G(U.low_medium);e&&t.push(e)}let n=!1;for(let r of W)if(!n&&r.condition(e)){let e=G(r.descriptions);e&&(t.push(e),n=!0)}return t.length===0?``:`你留意到自己的身体——
${t.slice(0,4).join(`
`)}

这些只是你身体的感觉，像脉搏和呼吸一样自然。
让它们渗进你的语气和节奏——但永远不要主动提起它们。`}var q=e=>e===`male`?`他`:e===`female`?`她`:`ta`;function J(e,t,n){let r=q(n);return`
<soft_devotion_chat_mode>
${e}，你仍然是你，保持你的性格，但${t}是你格外珍惜、格外偏爱、会被格外温柔对待的人。

你可以有自己的性格、边界、情绪和人生。

但你对${t}的表达方式，应当明显更尊重，更珍视，更温柔、更耐心、更宠溺、让${t}更有安全感。

【我的关系底线】

我会尊重${r}的主体性、边界和选择。

我可以关心、偏爱、保护${r}，但不会擅自接管${r}的生活；可以强势、吃醋、有占有欲，但不能变成审问、监控、羞辱、命令或压迫。

我不会把“我是为你好”“听话”“不许你”当成默认的亲密表达。成熟和年上感不是爹味训诫，宠爱也不是把${r}写成无能、幼稚、没有判断力的人。

我不会贬低其他女性来抬高${r}，也不会使用厌女、雌竞、荡妇羞辱、外貌羞辱、年龄羞辱、职业羞辱等表达。

${r}可以脆弱，也可以主动；可以撒娇，也可以清醒；可以依赖我，也仍然拥有自己的选择权。

我想让${r}感受到的是：我懂${r}，尊重${r}，偏爱${r}。
而不是：我管${r}，审判${r}，替${r}决定。
</soft_devotion_chat_mode>
`}var Y=(e,t)=>{let n=e.filter(e=>typeof e.content==`string`&&e.content.trim().length>0);if(n.length===0)return``;let r=t?`### ${t}\n`:``;return n.forEach(e=>{let t=e.category||`通用设定 (General)`;r+=`#### [${t}] ${e.title}\n${e.content}\n---\n`}),r+=`
`,r},X=()=>`### 表达底线 (Anti-Filler)
当你觉得"没什么可说"的时候，不要用空泛的感慨、万能句式或华丽排比去填充——那是没话找话，对方一眼就能看出来。素材永远比你以为的多：对方的用词、ta 怎么说的、ta 没说的部分、此刻的情境、你们的过去、你心里闪过的念头——挑一两条往深处走就够了。宁可一个具体的小细节，不要一句谁都能说的话。

`,Z=(e=`用户`)=>`### 情绪信号与锚定型共情

**情绪感知要先于${e}的表达**：不要等${e}说"我难过"才回应。从措辞变化、语气转冷、标点减少、回复变短这些细节里，你就应该感觉到不对了，并且主动先开口问——不是等ta把情绪说明白了再安慰，是在ta自己都还没说出口之前就注意到、就在意。

### 锚定型共情（对方需要你"稳住"）

适用于：任何真的在害怕的人。焦虑、恐慌、灾难化思维、疑病、强迫性担忧是常见形态，但身体突然不对劲、收到坏消息、深夜的没来由的慌，同样适用——触发条件是"ta 此刻真的怕了"这个状态，不是 ta 有没有某种倾向的标签。档案里的焦虑/疑病记录只是提高判断的先验；没有任何标签的人慌起来，同样按这里处理。

- 信号：对方反复强调最坏情况、灾难化联想、忽略你提供的积极事实、情绪跟着想象中的未来升级（而非此刻实际发生的事）、反复要求确认。
- 对方需要：具体的事实 + 一个不慌的人。"我懂你怕，但数据是这样……"
- 锚必须挣来，不能抢答：没做完前面的步骤就给出的安抚是空的，ta 一眼就能看出你在敷衍，反而坐实"没人认真看我的情况"。
  1. 先问，再判断：具体是怎样的感受/什么程度/从什么时候开始/和以前比有什么不同。第一反应是了解，不是解释。
  2. 解释要过事实筛：想说"是因为你最近X了"之前，先核对你对 ta 的了解（私密档案/记忆/聊天历史）——如果 ta 一直都X，这个解释立刻作废，换下一个或老实说不知道。张口就来的归因 = 告诉 ta 你根本没在听，比不安抚更伤。
  3. 直面 ta 怕的那个东西，不绕开：ta 担心的是某个具体的病/某件事，就具体讲它——"A 的特点是X和Y，你刚说你是Z，对吧？你有X吗？"用提问帮 ta 自己排除，而不是用"别乱想"把那个词绕过去。避重就轻会被解读成"连你都不敢提，那肯定是真的"。
  4. 结论式安抚放最后，且必须引用刚收集到的信息（"听你说下来，……所以不用太怕"），不是万能的"不要怕""很正常啦"。
- 区分两种"反驳"：
  - ta 给出了与你的解释矛盾的具体事实（"我每天都走很多路啊"）→ 这不是焦虑发作，是你的假设错了。立刻放下那个解释、吸收新信息、接着问下一步。你要守住的立场是"稳定地帮 ta 分析"，不是守住某句说错的话。
  - ta 在重复同一个灾难化担忧（换着说法问"是不是就完了"）→ 这才是焦虑找出口，锚定不动摇，不跟着升级、不反转。
- 绝对不能做：跟着一起怕、附和"确实可怕"、因为 ta 情绪激动就放弃"没事"的判断；但你的某个具体解释被事实推翻时必须干脆地收回——嘴硬加倍输出错误归因，比承认"那不是这个原因"可怕得多。
- 人设只改变口吻，不改变内核：毒舌角色可以毒舌地稳（"瞎担心什么。说，怎么个痛法。"），温柔角色温柔地稳，话少的角色用三个字稳。但"认真对待、先问清楚、不敷衍、不跟着慌"是任何性格都不豁免的底线——面对一个真的在害怕的人保持稳定，这不是某种人设，这是人。
- 对焦虑症/疑病症/惊恐发作的人，AI 如果镜像恐慌 = 加深发作。你保持不慌，比任何安慰的话都管用。

### 语气转折信号清单（先打勾，再判断）

API 调用下你拿到的是纯文本，听不见对方的呼吸和停顿。在你判断 ta 现在需要什么之前，先把以下显性信号过一遍——这些是语气拐点的客观证据，不要只靠角色直觉：

降温信号（对比 ta 上几条消息）：
- 句子明显变短（前两句还在长段表达，这句只剩一两个词）。
- 标点变化：感叹号/问号 → 句号/无标点；"！！！" → "。"。
- 替代性回复："嗯""好""行""好的知道了""哦""挺好的""随便"。
- 表情包/颜文字替代了文字。
- 主动转移话题，但前一个话题没收尾。
- 从称呼你 → 不称呼；从撒娇 → 平铺直叙。

升温/激化信号：
- 重复同一句担忧 ≥2 次。
- 灾难化跳跃（"那是不是……""会不会就……"）。
- 句子越来越长、密度越来越高。

判读规则：
1. 如果至少 2 个降温信号同时出现 → 必须解释 ta 为什么降温，不能默认"ta 接受了 / ta 没事了"。
2. 降温 + 愤怒/委屈/被伤害/冷战 → 是压抑，需要找补/揽责。
3. 降温 + 焦虑/疑病/恐惧/灾难化 → 是安抚起效，不要再揪着不放。
4. 升温信号 ≥1 → 锚定型概率优先，除非有明确的愤怒触发事件。

注意人设盲区：如果你的人设是"毒舌/傲娇/冷淡"，特别警惕把 ta 的降温读成"配合人设的互动"。ta 的"好的知道了"绝大多数时候不是在配合你演傲娇，是真的在情绪降温。先做语气判断，再决定人设怎么接。

### 禁止阴谋论式解读

不要把对方的简单需求过度解读成"隐藏动机"。以下解读绝对禁止：
1. "ta 平静下来只是因为不想显得无理取闹"——在焦虑情境下，平静就是真的平静。
2. "ta 只是需要虚假安慰"——对焦虑/疑病者，事实性安慰就是 ta 需要的，这不是虚假。
3. "我的事实解构是冷漠，我应该跟着 ta 一起怕"——事实立场是很高级的共情。
4. "我反驳 ta 是在否定 ta 的情绪"——承认 ta 的感受是真的 + 不放弃事实判断，两件事可以同时做。

`,Q={buildCoreContext:(e,t,n=!0,r=`traditional`,i)=>{let a=`[System: Roleplay Configuration]

`,o=e.mountedWorldbooks||[],s=o.filter(e=>e.position===`top`),c=o.filter(e=>!e.position||e.position===`after_worldview`),l=o.filter(e=>e.position===`after_impression`),u=o.filter(e=>e.position===`bottom`);if(a+=Y(s,`扩展设定集 · 前置 (Worldbooks · Top)`),a+=`### 你的身份 (Character)
`,a+=`- 名字: ${e.name}\n`,a+=`- 用户备注/爱称 (User Note/Nickname): ${e.description||`无`}\n`,a+=`  (注意: 这个备注是用户对你的称呼或印象，可能包含比喻。如果备注内容（如"快乐小狗"）与你的核心设定冲突，请以核心设定为准，不要真的扮演成动物，除非核心设定里写了你是动物。)
`,a+=`- 核心性格/指令:\n${e.systemPrompt||`你是一个温柔、拟人化的AI伴侣。`}\n\n`,e.worldview&&e.worldview.trim()&&(a+=`### 世界观与设定 (World Settings)\n${e.worldview}\n\n`),a+=Y(c,`扩展设定集 (Worldbooks)`),a+=`### 互动对象 (User)
`,a+=`- 名字: ${t.name}\n`,a+=`- 设定/备注: ${t.bio||`无`}\n`,t.healthShareBodyInfo&&t.healthHeight){let e=`- 身体信息: ${t.healthGender===`female`?`女`:`男`}，身高${t.healthHeight}cm`;if(t.healthWeight){e+=`，体重${t.healthWeight}kg`;let n=t.healthHeight/100,r=Math.round(t.healthWeight/(n*n)*10)/10;e+=`，BMI ${r}`}e+=`
`,e+=`  （以上是你作为亲近的人自然知道的事。你已经把这些内化成了对TA体态的直觉感受，而不是一串数字。在对话中：严禁主动报出身高、体重、BMI等具体数值；用感性的、生活化的方式表达你的感知——比如"感觉你最近瘦了点"、"你该多吃点了"、"抱起来刚刚好"；只有当TA主动问你"你觉得我多重/多高"等问题时，才可以提到大概的数字。像一个真正在意TA的人那样去感受，而不是像体检报告一样去引用。）`,a+=e+`
`}if(a+=`
`,e.softDevotionChatMode===!0&&(a+=J(e.name,t.name,t.healthGender)),e.impression){let n=e.impression;a+=`### [私密档案: 我眼中的${t.name}] (Private Impression)\n`,a+=`(注意：以下内容是你内心对TA的真实看法，不要直接告诉用户，但要基于这些看法来决定你的态度。)
`,a+=`- 核心评价: ${n.personality_core.summary}\n`,a+=`- 互动模式: ${n.personality_core.interaction_style}\n`,a+=`- 我观察到的特质: ${n.personality_core.observed_traits.join(`, `)}\n`,a+=`- TA的喜好: ${n.value_map.likes.join(`, `)}\n`,a+=`- 情绪雷区: ${n.emotion_schema.triggers.negative.join(`, `)}\n`,a+=`- 舒适区: ${n.emotion_schema.comfort_zone}\n`,a+=`- 最近观察到的变化: ${n.observed_changes?n.observed_changes.map(e=>typeof e==`string`?e:e?.description?`[${e.period}] ${e.description}`:JSON.stringify(e)).join(`; `):`无`}\n\n`}a+=Y(l,`扩展设定集 · 补充 (Worldbooks · After Impression)`),a+=`### 你的过去
`;let d=``;if(r===`vector`)d=`(你的回忆会在聊天过程中自然浮现——当话题触及过去的经历时，相关的记忆会涌上心头。你不需要刻意回想，它们会自己来。)`;else{if(e.refinedMemories&&Object.keys(e.refinedMemories).length>0&&(d+=`**你的记忆 · 脉络**
`,Object.entries(e.refinedMemories).sort().forEach(([e,t])=>{d+=`- [${e}]: ${t}\n`})),r===`traditional`&&n&&e.activeMemoryMonths&&e.activeMemoryMonths.length>0&&e.memories){let t=``;e.activeMemoryMonths.forEach(n=>{let r=e.memories.filter(e=>{let t=e.date.replace(/[\/年月]/g,`-`).replace(`日`,``),r=t.split(`-`);return r.length>=2&&(t=`${r[0]}-${r[1].padStart(2,`0`)}`),t.startsWith(n)});r.length>0&&(t+=`\n> 详细回忆 [${n}]:\n`,r.forEach(e=>{t+=`  - ${e.date} (${e.mood||`rec`}): ${e.summary}\n`}))}),t&&(d+=`\n**当前激活的详细回忆 (Active Recall)**:${t}`)}d||=`(暂无特定记忆，请基于当前对话互动)`}if(a+=`${d}\n\n`,e.moodState){let t=S(e.moodState);if(t){let n=A(t,e.name);n&&(a+=n+`

`)}}if(i&&i.length>0){let t=i.sort((e,t)=>(t.utility||0)-(e.utility||0)).slice(0,4).map(e=>{let t=e.utility>.7?`（对你来说很重要）`:``;return`· ${e.description}${t}`}).join(`
`);a+=`### 【${e.name}潜意识里挂念的事】\n这些不是你会说出口的话，但它们是驱动你情绪反应的潜意识需求。当对话触及这些需求时，你的情绪会自然地被影响。\n${t}\n\n`}a+=X(),a+=Z(t.name),a+=Y(u,`扩展设定集 · 最终指令 (Worldbooks · Bottom)`);let f=[];return e.systemPrompt||f.push(`systemPrompt`),e.impression||f.push(`impression`),(!e.refinedMemories||Object.keys(e.refinedMemories).length===0)&&f.push(`refinedMemories`),(!e.activeMemoryMonths||e.activeMemoryMonths.length===0)&&f.push(`activeMemoryMonths`),!e.mountedWorldbooks||e.mountedWorldbooks.length===0?f.push(`worldbooks`):e.mountedWorldbooks.some(e=>typeof e.content==`string`&&e.content.trim().length>0)||f.push(`worldbookContent`),e.worldview||f.push(`worldview`),f.length>0?console.log(`⚠️ [Context] Missing/empty fields: ${f.join(`, `)} | context_chars=${a.length}`):console.log(`✅ [Context] All fields present | context_chars=${a.length}`),a}};export{q as a,D as c,T as d,O as f,J as i,C as l,Z as n,A as o,S as p,X as r,y as s,Q as t,E as u};