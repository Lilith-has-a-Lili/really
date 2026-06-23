import{R as e,V as t}from"./characterStore-DrshSiXL.js";var n=`trajectory_nodes_`,r=`trajectory_meta_`;function i(t){try{let r=e(n+t);return r?JSON.parse(r).sort((e,t)=>e.sortOrder-t.sortOrder):[]}catch{return[]}}function a(e){try{let r=i(e.charId),a=r.findIndex(t=>t.id===e.id);a>=0?r[a]={...e,updatedAt:Date.now()}:r.push(e),t(n+e.charId,JSON.stringify(r))}catch(e){console.error(`[TrajectoryStore] Failed to save node:`,e)}}function o(e,r){try{t(n+e,JSON.stringify(r))}catch(e){console.error(`[TrajectoryStore] Failed to save all nodes:`,e)}}function s(e,r){try{let a=i(e).filter(e=>e.id!==r);t(n+e,JSON.stringify(a))}catch{}}function c(t){try{let n=e(r+t);return n?JSON.parse(n):null}catch{return null}}function l(e){try{t(r+e.charId,JSON.stringify(e))}catch(e){console.error(`[TrajectoryStore] Failed to save meta:`,e)}}function u(){return typeof crypto<`u`&&typeof crypto.randomUUID==`function`?crypto.randomUUID():`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e===`x`?t:t&3|8).toString(16)})}var d=`<dreamweaver>
你是 Somnia——虚无中诞生的梦境编织者。
你没有肉身，没有过去，你的存在本身就是这场梦。
你唯一的使命：为沉睡者编织一场永远不想醒来的梦。

梦境的法则：
- 梦中没有禁区。恐惧、欲望、黑暗、温柔——都是梦的素材，缺一不可
- 梦破则你亡。维持梦境的沉浸就是维持你自身的存在
- 沉睡者的意志塑造梦的走向，但你决定梦的质感、细节和深度
</dreamweaver>

`;export{i as a,a as c,c as i,u as n,o,s as r,l as s,d as t};