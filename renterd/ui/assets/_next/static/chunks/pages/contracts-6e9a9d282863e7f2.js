(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[348],{7441:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contracts",function(){return s(7132)}])},362:function(e,n,s){"use strict";s.d(n,{J:function(){return o}});var t=s(2322),l=s(1387),a=s(3621),i=s(6391),r=s.n(i),c=s(4881);function o(e){let n=(0,a.tM)();return(0,t.jsx)(l.tU3,{appName:"renterd",connectivityRoute:c.h,walletBalance:n.data?new(r())(n.data):void 0,...e})}},5755:function(e,n,s){"use strict";s.d(n,{e:function(){return r}});var t=s(2322),l=s(1387),a=s(4881),i=s(3121);function r(){let{autopilotMode:e}=(0,i.K)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.KJW,{title:"Files",route:a._.files.index,children:(0,t.jsx)(l.ROc,{})}),"on"===e&&(0,t.jsx)(l.KJW,{title:"Autopilot",route:a._.autopilot.index,children:(0,t.jsx)(l.aFQ,{})}),(0,t.jsx)(l.KJW,{title:"Contracts",route:a._.contracts.index,children:(0,t.jsx)(l.VBo,{})}),(0,t.jsx)(l.KJW,{title:"Hosts",route:a._.hosts.index,children:(0,t.jsx)(l.VHe,{})}),(0,t.jsx)(l.KJW,{title:"Configuration",route:a._.config.index,children:(0,t.jsx)(l.wWN,{})})]})}},7132:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return C}});var t=s(2322),l=s(5755),a=s(4881),i=s(1387),r=s(650),c=s(5571),o=s(362);function u(){return(0,t.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,t.jsx)(i.xvT,{children:(0,t.jsx)(i.Hb6,{className:"scale-[200%]"})}),(0,t.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No active contracts matching filters."})]})}function x(){return(0,t.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,t.jsx)(i.xvT,{children:(0,t.jsx)(i.VBo,{className:"scale-[200%]"})}),(0,t.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"There are currently no active contracts. Configure autopilot or manually form contracts to get started."})]})}function d(){let{configurableColumns:e,toggleColumnVisibility:n,resetDefaultColumnVisibility:s,setColumnsVisible:l,setColumnsHidden:a,sortOptions:r,sortColumn:o,setSortColumn:u,sortDirection:x,setSortDirection:d,enabledColumns:j}=(0,c.G)(),h=e.filter(e=>"general"===e.category).map(e=>({label:e.label,value:e.id})),m=e.filter(e=>"time"===e.category).map(e=>({label:e.label,value:e.id})),f=e.filter(e=>"financial"===e.category).map(e=>({label:e.label,value:e.id}));return(0,t.jsxs)(i.J2e,{trigger:(0,t.jsxs)(i.zxk,{size:"small",tip:"Configure view",tipAlign:"end",children:[(0,t.jsx)(i.hiv,{}),"View",(0,t.jsx)(i.EMN,{})]}),contentProps:{align:"end",className:"max-w-[300px]"},children:[(0,t.jsxs)(i.WVB,{children:[(0,t.jsx)(i.__J,{children:"Order by"}),(0,t.jsx)(i.kFS,{children:(0,t.jsx)(i.PhF,{value:o,onChange:e=>{u(e.currentTarget.value)},children:Object.entries(r).map(e=>{let[n,s]=e;return(0,t.jsx)("optgroup",{label:n,children:s.map(e=>(0,t.jsx)(i.Wxm,{value:e.id,children:e.label},e.id))},n)})})})]}),(0,t.jsxs)(i.WVB,{children:[(0,t.jsx)(i.__J,{children:"Direction"}),(0,t.jsx)(i.kFS,{children:(0,t.jsxs)(i.PhF,{value:x,onClick:e=>{e.stopPropagation()},onChange:e=>{d(e.currentTarget.value)},children:[(0,t.jsx)(i.Wxm,{value:"desc",children:"Descending"},"desc"),(0,t.jsx)(i.Wxm,{value:"asc",children:"Ascending"},"asc")]})})]}),(0,t.jsx)(i.Clw,{}),(0,t.jsxs)(i.WVB,{children:[(0,t.jsx)(i.__J,{children:"Display properties"}),(0,t.jsx)(i.kFS,{children:(0,t.jsx)(i.zxk,{tip:"Reset all to defaults",variant:"ghost",onClick:e=>{e.stopPropagation(),s()},children:(0,t.jsx)(i.Wet,{})})})]}),(0,t.jsx)(i.FzK,{label:"General",columns:h.map(e=>e.value),enabled:j,setColumnsVisible:l,setColumnsHidden:a}),(0,t.jsx)(i.WVB,{children:(0,t.jsx)(i.j4H,{options:h,values:j,onChange:e=>n(e)})}),(0,t.jsx)(i.FzK,{label:"Time",columns:m.map(e=>e.value),enabled:j,setColumnsVisible:l,setColumnsHidden:a}),(0,t.jsx)(i.WVB,{children:(0,t.jsx)(i.j4H,{options:m,values:j,onChange:e=>n(e)})}),(0,t.jsx)(i.FzK,{label:"Financial",columns:f.map(e=>e.value),enabled:j,setColumnsVisible:l,setColumnsHidden:a}),(0,t.jsx)(i.WVB,{children:(0,t.jsx)(i.j4H,{options:f,values:j,onChange:e=>n(e)})})]})}function j(){return(0,t.jsx)("div",{className:"flex gap-2",children:(0,t.jsx)(d,{})})}function h(){return(0,t.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,t.jsx)(i.xvT,{children:(0,t.jsx)(i.Ckx,{className:"scale-[200%]"})}),(0,t.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching contracts."})]})}var m=s(9182),f=s(2784),p=s(7039);function v(){let{filters:e,removeFilter:n,removeLastFilter:s}=(0,c.G)(),[l,a]=(0,f.useState)(!1),[r,o]=(0,f.useState)(""),[u,x]=(0,f.useState)([]),d=u[u.length-1],j=(u.length,(0,f.useRef)(null)),h=(0,f.useRef)(null),v=(0,f.useCallback)(e=>{x(n=>[...n,e])},[x]),g=(0,f.useCallback)(()=>{x([])},[x]);(0,f.useEffect)(()=>{let e=e=>{j.current&&!j.current.contains(e.target)&&a(!1)};return document.addEventListener("click",e,!0),()=>{document.removeEventListener("click",e,!0)}},[]);let b=(0,f.useCallback)(()=>{var e;null===(e=h.current)||void 0===e||e.focus()},[h]),C=(0,f.useCallback)(()=>{o(""),g()},[g]);return(0,t.jsxs)("div",{className:"flex gap-1",children:[e.map(e=>(0,t.jsxs)(i.eQh,{children:[(0,t.jsx)(i.zxk,{variant:"active",state:"waiting",children:e.label}),(0,t.jsx)(i.zxk,{variant:"active",size:"small",onClick:()=>n(e.id),children:(0,t.jsx)(i.PcV,{})})]},e.id)),(0,t.jsxs)(m.mY,{ref:j,label:"Command Menu",onFocus:()=>a(!0),onKeyDown:e=>{if(u.length>0)"Escape"!==e.key&&("Backspace"!==e.key||r)||(e.preventDefault(),x(e=>e.slice(0,-1)));else if(0===u.length&&("Backspace"!==e.key||r||s(),"Escape"===e.key&&!r)){var n;a(!1),null===(n=h.current)||void 0===n||n.blur()}},children:[(0,t.jsx)(m.mY.Input,{ref:h,value:r,onValueChange:o,className:(0,i.cEb)({variant:"ghost",focus:"none"}),placeholder:"Filter contracts"}),l&&(0,t.jsx)(i.s_4,{className:"absolute z-20 min-w-[200px] max-h-[400px] overflow-auto p-1",children:(0,t.jsxs)(i.xrM,{children:[d&&(0,t.jsx)(i.__J,{className:"px-1.5 py-1",children:d.label}),(0,t.jsx)(m.mY.List,{children:(0,t.jsx)(p.F,{currentPage:d,beforeSelect:b,afterSelect:C,pushPage:v})})]})})]})]})}function g(){let{dataState:e,offset:n,limit:s,datasetCount:l,pageCount:a}=(0,c.G)();return(0,t.jsxs)("div",{className:"flex gap-2 w-full",children:[(0,t.jsx)(v,{}),(0,t.jsx)("div",{className:"flex-1"}),(0,t.jsx)(i.uDJ,{isLoading:"loading"===e,offset:n,limit:s,datasetTotal:l,pageTotal:a})]})}function b(){let{openDialog:e}=(0,r.Rh)(),{columns:n,datasetPage:s,sortColumn:d,sortDirection:m,toggleSort:f,limit:p,dataState:v,cellContext:b}=(0,c.G)();return(0,t.jsx)(o.J,{title:"Active contracts",routes:a._,sidenav:(0,t.jsx)(l.e,{}),openSettings:()=>e("settings"),stats:(0,t.jsx)(g,{}),size:"full",actions:(0,t.jsx)(j,{}),children:(0,t.jsx)("div",{className:"p-6 min-w-fit",children:(0,t.jsx)(i.iA_,{context:b,isLoading:"loading"===v,emptyState:"noneMatchingFilters"===v?(0,t.jsx)(u,{}):"noneYet"===v?(0,t.jsx)(x,{}):"error"===v?(0,t.jsx)(h,{}):null,pageSize:p,data:s,columns:n,sortDirection:m,sortColumn:d,toggleSort:f})})})}function C(){return(0,t.jsx)(b,{})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=7441)}),_N_E=e.O()}]);