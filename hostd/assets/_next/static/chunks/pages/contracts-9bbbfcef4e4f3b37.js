(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[348],{77441:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contracts",function(){return s(73986)}])},73986:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return S}});var n=s(52322),l=s(14522),a=s(65717),c=s(35138);function r(){return(0,n.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,n.jsx)(l.xvT,{children:(0,n.jsx)(c.Hb6,{className:"scale-[200%]"})}),(0,n.jsx)(l.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No active contracts matching filters."})]})}function i(){return(0,n.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,n.jsx)(l.xvT,{children:(0,n.jsx)(c.VBo,{className:"scale-[200%]"})}),(0,n.jsx)(l.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"There are currently no active contracts. Configure and announce host to start forming contracts."})]})}function o(){return(0,n.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,n.jsx)(l.xvT,{children:(0,n.jsx)(c.Ckx,{className:"scale-[200%]"})}),(0,n.jsx)(l.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching contracts."})]})}function u(){let{columns:e,datasetPage:t,sortField:s,sortDirection:c,sortableColumns:u,toggleSort:x,limit:d,dataState:h,cellContext:j}=(0,a.G)();return(0,n.jsx)("div",{className:"p-6 min-w-fit",children:(0,n.jsx)(l.iA_,{testId:"contractsTable",context:j,isLoading:"loading"===h,emptyState:"noneMatchingFilters"===h?(0,n.jsx)(r,{}):"noneYet"===h?(0,n.jsx)(i,{}):"error"===h?(0,n.jsx)(o,{}):null,pageSize:d,data:t,columns:e,sortableColumns:u,sortDirection:c,sortField:s,toggleSort:x})})}var x=s(13779),d=s(4300),h=s(54494),j=s(41941),m=s(46850),f=s(83894);function p(){let{configurableColumns:e,toggleColumnVisibility:t,resetDefaultColumnVisibility:s,setColumnsVisible:r,setColumnsHidden:i,sortField:o,setSortField:u,sortDirection:x,setSortDirection:d,enabledColumns:h}=(0,a.G)(),j=e.filter(e=>"general"===e.category).map(e=>({label:e.label,value:e.id})),p=e.filter(e=>"time"===e.category).map(e=>({label:e.label,value:e.id})),g=e.filter(e=>"financial"===e.category).map(e=>({label:e.label,value:e.id}));return(0,n.jsxs)(l.J2e,{trigger:(0,n.jsxs)(l.zxk,{size:"small",tip:"Configure view",tipAlign:"end",children:[(0,n.jsx)(c.hiv,{}),"View",(0,n.jsx)(c.EMN,{})]}),contentProps:{align:"end",className:"max-w-[300px]"},children:[(0,n.jsxs)(l.WVB,{children:[(0,n.jsx)(l.__J,{children:"Order by"}),(0,n.jsx)(l.kFS,{children:(0,n.jsx)(l.PhF,{value:o,onChange:e=>{u(e.currentTarget.value)},children:Object.entries((0,f.Z)(m.Fo,"category")).map(e=>{let[t,s]=e;return(0,n.jsx)("optgroup",{label:t,children:s.map(e=>(0,n.jsx)(l.Wxm,{value:e.id,children:e.label},e.id))},t)})})})]}),(0,n.jsxs)(l.WVB,{children:[(0,n.jsx)(l.__J,{children:"Direction"}),(0,n.jsx)(l.kFS,{children:(0,n.jsxs)(l.PhF,{value:x,onClick:e=>{e.stopPropagation()},onChange:e=>{d(e.currentTarget.value)},children:[(0,n.jsx)(l.Wxm,{value:"desc",children:"descending"},"desc"),(0,n.jsx)(l.Wxm,{value:"asc",children:"ascending"},"asc")]})})]}),(0,n.jsx)(l.Clw,{}),(0,n.jsxs)(l.WVB,{children:[(0,n.jsx)(l.__J,{children:"Display properties"}),(0,n.jsx)(l.kFS,{children:(0,n.jsx)(l.zxk,{tip:"Reset all to defaults",variant:"ghost",onClick:e=>{e.stopPropagation(),s()},children:(0,n.jsx)(c.Wet,{})})})]}),(0,n.jsx)(l.FzK,{label:"General",columns:j.map(e=>e.value),enabled:h,setColumnsVisible:r,setColumnsHidden:i}),(0,n.jsx)(l.WVB,{children:(0,n.jsx)(l.j4H,{options:j,values:h,onChange:e=>t(e)})}),(0,n.jsx)(l.FzK,{label:"Time",columns:p.map(e=>e.value),enabled:h,setColumnsVisible:r,setColumnsHidden:i}),(0,n.jsx)(l.WVB,{children:(0,n.jsx)(l.j4H,{options:p,values:h,onChange:e=>t(e)})}),(0,n.jsx)(l.FzK,{label:"Usage",columns:g.map(e=>e.value),enabled:h,setColumnsVisible:r,setColumnsHidden:i}),(0,n.jsx)(l.WVB,{children:(0,n.jsx)(l.j4H,{options:g,values:h,onChange:e=>t(e)})})]})}function g(){return(0,n.jsx)("div",{className:"flex gap-2",children:(0,n.jsx)(p,{})})}var v=s(65304),b=s(2784),k=s(63328);function C(){let{filters:e,removeFilter:t,removeLastFilter:s}=(0,a.G)(),[r,i]=(0,b.useState)(!1),[o,u]=(0,b.useState)(""),[x,d]=(0,b.useState)([]),h=x[x.length-1],j=(x.length,(0,b.useRef)(null)),m=(0,b.useRef)(null),f=(0,b.useCallback)(e=>{d(t=>[...t,e])},[d]),p=(0,b.useCallback)(()=>{d([])},[d]);(0,b.useEffect)(()=>{let e=e=>{j.current&&!j.current.contains(e.target)&&i(!1)};return document.addEventListener("click",e,!0),()=>{document.removeEventListener("click",e,!0)}},[]);let g=(0,b.useCallback)(()=>{var e;null===(e=m.current)||void 0===e||e.focus()},[m]),C=(0,b.useCallback)(()=>{u(""),p()},[p]);return(0,n.jsxs)("div",{className:"flex gap-1",children:[e.map(e=>(0,n.jsxs)(l.eQh,{children:[(0,n.jsx)(l.zxk,{variant:"active",state:"waiting",children:(0,l.$Gg)(e.label,30)}),(0,n.jsx)(l.zxk,{variant:"active",size:"small",onClick:()=>t(e.id),children:(0,n.jsx)(c.PcV,{})})]},e.id)),(0,n.jsxs)(v.mY,{ref:j,label:"Command Menu",onFocus:()=>i(!0),onKeyDown:e=>{if(x.length>0)"Escape"!==e.key&&("Backspace"!==e.key||o)||(e.preventDefault(),d(e=>e.slice(0,-1)));else if(0===x.length&&("Backspace"!==e.key||o||s(),"Escape"===e.key&&!o)){var t;i(!1),null===(t=m.current)||void 0===t||t.blur()}},children:[(0,n.jsx)(v.mY.Input,{ref:m,value:o,onValueChange:u,className:(0,l.cEb)({variant:"ghost",focus:"none"}),placeholder:"Filter contracts"}),r&&(0,n.jsx)(l.s_4,{className:"absolute z-20 min-w-[200px] max-h-[400px] overflow-auto p-1",children:(0,n.jsxs)(l.xrM,{children:[h&&(0,n.jsx)(l.__J,{className:"px-1.5 py-1",children:h.label}),(0,n.jsx)(v.mY.List,{children:(0,n.jsx)(k.F,{currentPage:h,beforeSelect:g,afterSelect:C,pushPage:f})})]})})]})]})}function y(){let{offset:e,limit:t,totalCount:s,pageCount:c,dataState:r}=(0,a.G)();return(0,n.jsxs)("div",{className:"flex gap-2 justify-between w-full",children:[(0,n.jsx)(C,{}),(0,n.jsx)(l.uDJ,{offset:e,limit:t,isLoading:"loading"===r,datasetTotal:s,pageTotal:c})]})}var N=s(60381),_=s(63694);function w(){let{openDialog:e}=(0,h.Rh)(),{multiSelect:t}=(0,a.G)(),s=(0,_.kr)(),r=(0,b.useMemo)(()=>Object.entries(t.selection).map(e=>{let[t,s]=e;return s.id}),[t.selection]),i=(0,b.useCallback)(async()=>{await (0,l.eKZ)(r.map(e=>s.put({params:{id:e}})),{toastError:e=>{let{successCount:t,errorCount:s,totalCount:n}=e;return{title:"Integrity checks started for ".concat((0,N._6)(t,"contract")),body:"Error starting integrity checks for ".concat(s,"/").concat(n," total contracts.")}},toastSuccess:t=>{let{totalCount:s}=t;return{title:"Integrity checks started for ".concat((0,N._6)(s,"contract")),body:(0,n.jsxs)(n.Fragment,{children:["Depending on contract data size this operation can take a while. Check ",(0,n.jsx)(l.EKh,{children:"hostd"})," ",(0,n.jsx)(l.rUS,{onClick:()=>e("alerts"),children:"alerts"})," for status updates."]})}},after:()=>{t.deselectAll()}})},[t,r,s,e]);return(0,n.jsx)(l.zxk,{"aria-label":"run integrity check for each contract",tip:"Run integrity check for each contract",onClick:i,children:(0,n.jsx)(c.dDl,{})})}function E(){let{multiSelect:e}=(0,a.G)();return(0,n.jsx)(l.hv1,{multiSelect:e,entityWord:"contract",children:(0,n.jsx)(w,{})})}let F=j.q;function S(){return(0,n.jsx)(u,{})}S.Layout=F,S.useLayoutProps=function(){let{openDialog:e}=(0,h.Rh)();return{title:"Contracts",routes:d._,sidenav:(0,n.jsx)(x.N,{}),openSettings:()=>e("settings"),actions:(0,n.jsx)(g,{}),stats:(0,n.jsx)(y,{}),size:"full",dockedControls:(0,n.jsx)(E,{})}}}},function(e){e.O(0,[546,888,774,179],function(){return e(e.s=77441)}),_N_E=e.O()}]);