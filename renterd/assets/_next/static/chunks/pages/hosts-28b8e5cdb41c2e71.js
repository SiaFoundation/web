(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[473],{88924:function(e,l,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hosts",function(){return s(539)}])},53305:function(e,l,s){"use strict";s.d(l,{a:function(){return u}});var t=s(52322),n=s(70150),o=s(28420),a=s(2784),i=s(82285),c=s(60381),r=s(12295);function u(e){let{multiSelect:l,publicKeys:s}=e,{openConfirmDialog:u}=(0,i.Rh)(),d=(0,r.I)(),x=(0,a.useCallback)(async()=>{d(s,[]),l.deselectAll()},[d,l,s]);return(0,t.jsxs)(n.zxk,{"aria-label":"add host public keys to allowlist",tip:"Add host public keys to allowlist",onClick:()=>{u({title:"Add ".concat((0,c._6)(l.selectionCount,"host")," to allowlist"),action:"Add to allowlist",variant:"accent",body:(0,t.jsx)("div",{className:"flex flex-col gap-1",children:(0,t.jsxs)(n.nvN,{size:"14",children:["Are you sure you would like to add"," ",(0,c._6)(l.selectionCount,"host public key")," to the allowlist?"]})}),onConfirm:x})},children:[(0,t.jsx)(o.nCM,{}),"Add hosts to allowlist"]})}},1884:function(e,l,s){"use strict";s.d(l,{U:function(){return u}});var t=s(52322),n=s(70150),o=s(28420),a=s(2784),i=s(82285),c=s(60381),r=s(12295);function u(e){let{multiSelect:l,publicKeys:s}=e,{openConfirmDialog:u}=(0,i.Rh)(),d=(0,r.I)(),x=(0,a.useCallback)(async()=>{await d([],s),l.deselectAll()},[d,l,s]);return(0,t.jsxs)(n.zxk,{"aria-label":"remove host public keys from allowlist",tip:"Remove host public keys from allowlist",onClick:()=>{u({title:"Remove ".concat((0,c._6)(l.selectionCount,"host")," from allowlist"),action:"Remove from allowlist",variant:"accent",body:(0,t.jsx)("div",{className:"flex flex-col gap-1",children:(0,t.jsxs)(n.nvN,{size:"14",children:["Are you sure you would like to remove"," ",(0,c._6)(l.selectionCount,"host public key")," from the allowlist?"]})}),onConfirm:x})},children:[(0,t.jsx)(o.nCM,{}),"Remove hosts from allowlist"]})}},50039:function(e,l,s){"use strict";s.d(l,{c:function(){return r}});var t=s(52322),n=s(70150),o=s(28420),a=s(91426),i=s(2784),c=s(60381);function r(e){let{multiSelect:l,publicKeys:s}=e,r=(0,a.ED)(),u=(0,i.useCallback)(async()=>{await (0,n.eKZ)(s.map(e=>r.post({params:{hostkey:e},payload:{timeout:(0,c.XB)(30)}})),{toastError:e=>{let{successCount:l,errorCount:s,totalCount:t}=e;return{title:"Rescanning ".concat((0,c._6)(l,"host")),body:"Error starting rescan for ".concat(s,"/").concat(t," of total hosts.")}},toastSuccess:e=>{let{totalCount:l}=e;return{title:"Rescanning ".concat((0,c._6)(l,"host"))}},after:()=>{l.deselectAll()}})},[l,s,r]);return(0,t.jsx)(n.zxk,{"aria-label":"rescan selected hosts",tip:"Rescan selected hosts",onClick:u,children:(0,t.jsx)(o._Eq,{})})}},539:function(e,l,s){"use strict";s.r(l),s.d(l,{default:function(){return L}});var t=s(52322),n=s(70150),o=s(46741),a=s(28420),i=s(4300);function c(){let{datasetState:e}=(0,o.l)();return"noneOnPage"===e?(0,t.jsx)(n.xJ6,{}):"error"===e?(0,t.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,t.jsx)(n.xvT,{children:(0,t.jsx)(a.Ckx,{className:"scale-[200%]"})}),(0,t.jsx)(n.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching hosts."})]}):"noneMatchingFilters"===e?(0,t.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,t.jsx)(n.xvT,{children:(0,t.jsx)(a.Hb6,{className:"scale-[200%]"})}),(0,t.jsx)(n.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No hosts matching filters."})]}):"noneYet"===e?(0,t.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,t.jsx)(n.xvT,{children:(0,t.jsx)(a.zvn,{className:"scale-[200%]"})}),(0,t.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,t.jsxs)(n.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["There are currently no hosts in the database. Make sure"," ",(0,t.jsx)(n.EKh,{children:"renterd"})," can access the network and make sure peers are being discovered."]}),(0,t.jsx)(n.Qjf,{href:i._.node.index,children:"View peers"})]})]}):null}var r=s(463),u=s(777),d=s(54597);function x(){let{gpu:e,settings:l}=(0,r.Hv)(),{setCmd:s,activeHost:a,onHostMapClick:i,hostsWithLocation:c}=(0,o.l)();return l.siaCentral&&!e.shouldRender?null:(0,t.jsxs)("div",{className:"w-full h-full",children:[(0,t.jsx)(u.T,{activeHost:(null==a?void 0:a.location)?a:void 0,hosts:c,onHostClick:i,onMount:e=>{s(e)}}),(0,t.jsxs)("div",{className:"absolute top-5 left-6 flex flex-col gap-1",children:[(0,t.jsx)(n.wEc,{color:d.jY.activeAndUsable.colorHex,label:"Active contract & usable",size:"12"}),(0,t.jsx)(n.wEc,{color:d.jY.activeAndUnusable.colorHex,label:"Active contract & unusable",size:"12"}),(0,t.jsx)(n.wEc,{color:d.jY.potentialHost.colorHex,label:"No active contract",size:"12"})]})]})}var h=s(82851);function m(){let{datasetPage:e,activeHost:l,visibleColumns:s,limit:a,datasetState:i,tableContext:r,viewMode:u}=(0,o.l)();return(0,t.jsxs)("div",{className:"relative flex flex-col overflow-hidden h-full w-full",children:[(0,t.jsx)("div",{className:(0,h.cx)("absolute h-[70%] w-full","map"===u?"block":"invisible","transition-all"),children:(0,t.jsx)(x,{})}),(0,t.jsx)("div",{className:(0,h.cx)("absolute overflow-hidden transition-all w-full","duration-300","overflow-hidden"),style:{bottom:0,height:"map"===u?e&&e.length?400-Math.max((2-e.length)*100,0):400:"100%"},children:(0,t.jsx)(n.xrM,{className:"z-0",id:"scroll-hosts",children:(0,t.jsx)("div",{className:(0,h.cx)("map"===u?"pb-6 px-6":"p-6","min-w-fit"),children:(0,t.jsx)(n.iA_,{testId:"hostsTable",focusId:null==l?void 0:l.publicKey,focusColor:l?(0,d.Kg)(l).colorName:void 0,isLoading:"loading"===i,emptyState:(0,t.jsx)(c,{}),context:r,pageSize:a,data:e,columns:s,rowSize:"default"})})})})]})}var f=s(70825),j=s(82285),p=s(31392);function v(){let{configurableColumns:e,toggleColumnVisibility:l,setColumnsVisible:s,setColumnsHidden:i,resetDefaultColumnVisibility:c,visibleColumnIds:r}=(0,o.l)(),u=e.filter(e=>"general"===e.category).map(e=>({label:e.label,value:e.id})),d=e.filter(e=>"autopilot"===e.category).map(e=>({label:e.label,value:e.id})),x=e.filter(e=>"priceTable"===e.category).map(e=>({label:e.label,value:e.id})),h=e.filter(e=>"hostSettings"===e.category).map(e=>({label:e.label,value:e.id}));return(0,t.jsxs)(n.J2e,{trigger:(0,t.jsxs)(n.zxk,{tip:"Configure view",tipAlign:"end",children:[(0,t.jsx)(a.hiv,{}),"View",(0,t.jsx)(a.EMN,{})]}),contentProps:{align:"end",className:"!max-w-md !h-[400px]"},children:[(0,t.jsxs)(n.WVB,{children:[(0,t.jsx)(n.__J,{children:"Display properties"}),(0,t.jsx)(n.kFS,{children:(0,t.jsx)(n.zxk,{tip:"Reset all to defaults",variant:"ghost",onClick:e=>{e.stopPropagation(),c()},children:(0,t.jsx)(a.Wet,{})})})]}),(0,t.jsx)(n.FzK,{label:"General",columns:u.map(e=>e.value),enabled:r,setColumnsVisible:s,setColumnsHidden:i}),(0,t.jsx)(n.WVB,{children:(0,t.jsx)(n.j4H,{options:u,values:r,onChange:e=>l(e)})}),d.length?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.FzK,{label:"Autopilot",columns:d.map(e=>e.value),enabled:r,setColumnsVisible:s,setColumnsHidden:i}),(0,t.jsx)(n.WVB,{children:(0,t.jsx)(n.j4H,{options:d,values:r,onChange:e=>l(e)})})]}):null,x.length?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.FzK,{label:"Price table (RHPv3)",columns:x.map(e=>e.value),enabled:r,setColumnsVisible:s,setColumnsHidden:i}),(0,t.jsx)(n.WVB,{children:(0,t.jsx)(n.j4H,{options:x,values:r,onChange:e=>l(e)})})]}):null,h.length?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.FzK,{label:"Host settings (RHPv2)",columns:h.map(e=>e.value),enabled:r,setColumnsVisible:s,setColumnsHidden:i}),(0,t.jsx)(n.WVB,{children:(0,t.jsx)(n.j4H,{options:h,values:r,onChange:e=>l(e)})})]}):null]})}function b(){let{openDialog:e}=(0,j.Rh)(),{viewMode:l,setViewMode:s}=(0,o.l)(),{settings:i,gpu:c}=(0,r.Hv)();return(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(n.zxk,{onClick:()=>e("hostsManageAllowBlock"),tip:"Manage host blocklist and allowlist",children:[(0,t.jsx)(a.nCM,{}),"Manage lists"]}),(0,t.jsx)(n.ua7,{content:i.siaCentral?c.canGpuRender&&c.isGpuEnabled?"Toggle interactive map":"Enable GPU to view interactive map":"Enable Sia Central to view interactive map",children:(0,t.jsx)(n.zxk,{disabled:!c.canGpuRender,onClick:()=>{if(!i.siaCentral){e("settings");return}c.isGpuEnabled?s("map"===l?"list":"map"):e("settings")},children:(0,t.jsx)(a.nDH,{})})}),(0,t.jsx)(v,{})]})}var k=s(65304),g=s(2784),C=s(50454);function y(){let{filters:e,removeFilter:l,removeLastFilter:s}=(0,o.l)(),[i,c]=(0,g.useState)(!1),[r,u]=(0,g.useState)(""),[d,x]=(0,g.useState)([]),h=d[d.length-1],m=(0,g.useRef)(null),f=(0,g.useRef)(null),j=(0,g.useCallback)(e=>{x(l=>[...l,e])},[x]),p=(0,g.useCallback)(()=>{x([])},[x]);(0,g.useEffect)(()=>{let e=e=>{m.current&&!m.current.contains(e.target)&&c(!1)};return document.addEventListener("click",e,!0),()=>{document.removeEventListener("click",e,!0)}},[]);let v=(0,g.useCallback)(()=>{var e;null===(e=f.current)||void 0===e||e.focus()},[f]),b=(0,g.useCallback)(()=>{u(""),p()},[p]);return(0,t.jsxs)("div",{className:"flex gap-1",children:[e.map(e=>(0,t.jsxs)(n.eQh,{children:[(0,t.jsx)(n.zxk,{variant:"active",state:"waiting",children:e.label}),(0,t.jsx)(n.zxk,{variant:"active",size:"small",onClick:()=>l(e.id),children:(0,t.jsx)(a.PcV,{})})]},e.id)),(0,t.jsxs)(k.mY,{ref:m,label:"Command Menu",onFocus:()=>c(!0),onKeyDown:e=>{if(d.length>0)"Escape"!==e.key&&("Backspace"!==e.key||r)||(e.preventDefault(),x(e=>e.slice(0,-1)));else if(0===d.length&&("Backspace"!==e.key||r||s(),"Escape"===e.key&&!r)){var l;c(!1),null===(l=f.current)||void 0===l||l.blur()}},children:[(0,t.jsx)(k.mY.Input,{ref:f,value:r,onValueChange:u,className:(0,n.cEb)({variant:"ghost",focus:"none"}),placeholder:"Filter hosts"}),i&&(0,t.jsx)(n.s_4,{className:"absolute z-20 min-w-[200px] max-h-[400px] overflow-auto p-1",children:(0,t.jsxs)(n.xrM,{children:[h&&(0,t.jsx)(n.__J,{className:"px-1.5 py-1",children:h.label}),(0,t.jsx)(k.mY.List,{children:(0,t.jsx)(C.L,{currentPage:h,beforeSelect:v,afterSelect:b,pushPage:j})})]})})]})]})}function w(){let{offset:e,limit:l,datasetPageTotal:s,datasetState:a}=(0,o.l)();return(0,t.jsxs)("div",{className:"flex gap-2 w-full",children:[(0,t.jsx)(y,{}),(0,t.jsx)("div",{className:"flex-1"}),(0,t.jsx)(n.wFK,{offset:e,limit:l,pageTotal:s,isLoading:"loading"===a})]})}var N=s(91426),_=s(60381);function z(){let e=(0,N.wW)(),{multiSelect:l}=(0,o.l)(),s=(0,g.useMemo)(()=>Object.entries(l.selection).map(e=>{let[l,s]=e;return s.publicKey}),[l.selection]),i=(0,g.useCallback)(async()=>{await (0,n.eKZ)(s.map(l=>e.post({params:{hostkey:l}})),{toastError:e=>{let{successCount:l,errorCount:s,totalCount:t}=e;return{title:"Reset lost sector count for ".concat((0,_._6)(l,"host")),body:"Error reseting lost sector count for ".concat(s,"/").concat(t," total hosts.")}},toastSuccess:e=>{let{totalCount:l}=e;return{title:"Reset lost sector count for ".concat((0,_._6)(l,"host"))}},after:()=>{l.deselectAll()}})},[l,s,e]);return(0,t.jsx)(n.zxk,{"aria-label":"reset lost sector count for hosts",tip:"Reset lost sector count for hosts",onClick:i,children:(0,t.jsx)(a.xkX,{})})}var A=s(9408);function R(e){let{multiSelect:l,hostAddresses:s}=e,{openConfirmDialog:o}=(0,j.Rh)(),i=(0,A.l)(),c=(0,g.useCallback)(async()=>{i(s,[]),l.deselectAll()},[i,l,s]);return(0,t.jsxs)(n.zxk,{"aria-label":"add host addresses to blocklist",tip:"Add host addresses to blocklist",onClick:()=>{o({title:"Add ".concat((0,_._6)(l.selectionCount,"host")," to blocklist"),action:"Add to blocklist",variant:"red",body:(0,t.jsx)("div",{className:"flex flex-col gap-1",children:(0,t.jsxs)(n.nvN,{size:"14",children:["Are you sure you would like to add"," ",(0,_._6)(l.selectionCount,"host address","host addresses")," ","to the blocklist?"]})}),onConfirm:c})},children:[(0,t.jsx)(a.nCM,{}),"Add hosts to blocklist"]})}function E(){let{multiSelect:e}=(0,o.l)(),l=(0,g.useMemo)(()=>Object.entries(e.selection).map(e=>{let[l,s]=e;return s.netAddress}),[e.selection]);return(0,t.jsx)(R,{multiSelect:e,hostAddresses:l})}var H=s(53305);function M(){let{multiSelect:e}=(0,o.l)(),l=(0,g.useMemo)(()=>Object.entries(e.selection).map(e=>{let[l,s]=e;return s.publicKey}),[e.selection]);return(0,t.jsx)(H.a,{multiSelect:e,publicKeys:l})}function S(e){let{multiSelect:l,hostAddresses:s}=e,{openConfirmDialog:o}=(0,j.Rh)(),i=(0,A.l)(),c=(0,g.useCallback)(async()=>{i([],s),l.deselectAll()},[i,l,s]);return(0,t.jsxs)(n.zxk,{"aria-label":"remove host addresses from blocklist",tip:"Remove host addresses from blocklist",onClick:()=>{o({title:"Remove ".concat((0,_._6)(l.selectionCount,"host")," from blocklist"),action:"Remove from blocklist",variant:"red",body:(0,t.jsx)("div",{className:"flex flex-col gap-1",children:(0,t.jsxs)(n.nvN,{size:"14",children:["Are you sure you would like to remove"," ",(0,_._6)(l.selectionCount,"host address","host addresses")," ","from the blocklist?"]})}),onConfirm:c})},children:[(0,t.jsx)(a.nCM,{}),"Remove hosts from blocklist"]})}function K(){let{multiSelect:e}=(0,o.l)(),l=(0,g.useMemo)(()=>Object.entries(e.selection).map(e=>{let[l,s]=e;return s.netAddress}),[e.selection]);return(0,t.jsx)(S,{multiSelect:e,hostAddresses:l})}var T=s(1884);function P(){let{multiSelect:e}=(0,o.l)(),l=(0,g.useMemo)(()=>Object.entries(e.selection).map(e=>{let[l,s]=e;return s.publicKey}),[e.selection]);return(0,t.jsx)(T.U,{multiSelect:e,publicKeys:l})}var V=s(50039);function F(){let{multiSelect:e}=(0,o.l)(),l=(0,g.useMemo)(()=>Object.entries(e.selection).map(e=>{let[l,s]=e;return s.publicKey}),[e.selection]);return(0,t.jsx)(V.c,{multiSelect:e,publicKeys:l})}function B(){let{multiSelect:e}=(0,o.l)();return(0,t.jsxs)(n.hv1,{multiSelect:e,entityWord:"host",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)(M,{}),(0,t.jsx)(E,{})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)(P,{}),(0,t.jsx)(K,{})]}),(0,t.jsx)(F,{}),(0,t.jsx)(z,{})]})}let O=p.J;function L(){return(0,t.jsx)(m,{})}L.Layout=O,L.useLayoutProps=function(){let{openDialog:e}=(0,j.Rh)();return{title:"Hosts",routes:i._,sidenav:(0,t.jsx)(f.e,{}),openSettings:()=>e("settings"),size:"full",actions:(0,t.jsx)(b,{}),stats:(0,t.jsx)(w,{}),scroll:!1,dockedControls:(0,t.jsx)(B,{})}}}},function(e){e.O(0,[705,888,774,179],function(){return e(e.s=88924)}),_N_E=e.O()}]);