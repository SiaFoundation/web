(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[958],{38345:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/files/[[...path]]",function(){return n(73592)}])},62529:function(e,s,n){"use strict";n.d(s,{x:function(){return c}});var i=n(52322),t=n(95129),r=n(74881),l=n(89553);function c(){let{autopilotMode:e}=(0,l.V)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.KJW,{title:"Files",route:r._.files.index,children:(0,i.jsx)(t.ROc,{})}),"on"===e&&(0,i.jsx)(t.KJW,{title:"Autopilot",route:r._.autopilot.index,children:(0,i.jsx)(t.aFQ,{})}),(0,i.jsx)(t.KJW,{title:"Contracts",route:r._.contracts.index,children:(0,i.jsx)(t.VBo,{})}),(0,i.jsx)(t.KJW,{title:"Hosts",route:r._.hosts.index,children:(0,i.jsx)(t.VHe,{})}),(0,i.jsx)(t.KJW,{title:"Configuration",route:r._.config.index,children:(0,i.jsx)(t.wWN,{})})]})}},30362:function(e,s,n){"use strict";n.d(s,{J:function(){return r}});var i=n(52322),t=n(95129);function r(e){return(0,i.jsx)(t.tU3,{...e})}},73592:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return N}});var i=n(52322),t=n(62529),r=n(74881),l=n(27259),c=n(95129),o=n(79029);function a(){return(0,i.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,i.jsx)(c.xvT,{children:(0,i.jsx)(c.Ckx,{className:"scale-[200%]"})}),(0,i.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching files."})]})}function x(){return(0,i.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,i.jsx)(c.xvT,{children:(0,i.jsx)(c.Hb6,{className:"scale-[200%]"})}),(0,i.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No files matching filters."})]})}function d(){return(0,i.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,i.jsx)(c.xvT,{children:(0,i.jsx)(c.Y9T,{className:"scale-[200%]"})}),(0,i.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No files, drag and drop files or click here to start uploading."})]})}function u(){let{uploadFiles:e,datasetPage:s,pageCount:n,dataState:t,columns:r,sortColumn:l,sortDirection:u,toggleSort:j}=(0,o.Yg)();return(0,i.jsx)("div",{className:"relative",children:(0,i.jsx)(c.fhJ,{onDrop:e,noClick:n>0,children:(0,i.jsx)(c.iA_,{isLoading:"loading"===t,emptyState:"noneMatchingFilters"===t?(0,i.jsx)(x,{}):"noneYet"===t?(0,i.jsx)(d,{}):"error"===t?(0,i.jsx)(a,{}):null,pageSize:10,data:s,columns:r,sortColumn:l,sortDirection:u,toggleSort:j,rowSize:"dense"})})})}var j=n(2784);function h(){let{activeDirectory:e,setActiveDirectory:s}=(0,o.Yg)(),n=(0,j.useRef)(null);return(0,j.useEffect)(()=>{let e=setTimeout(()=>{var e;null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})},100);return()=>{clearTimeout(e)}},[e]),(0,i.jsx)(c.xrM,{children:(0,i.jsxs)("div",{className:"flex gap-1 items-center h-full",children:[(0,i.jsx)(c.xvT,{onClick:()=>s(()=>[]),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:"Files"}),!!e.length&&(0,i.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,i.jsx)(c.F3j,{})}),e.map((e,n)=>(0,i.jsxs)(j.Fragment,{children:[n>0&&(0,i.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,i.jsx)(c.F3j,{})}),(0,i.jsx)(c.xvT,{onClick:()=>s(e=>e.slice(0,n+1)),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:e})]},e+n)),(0,i.jsx)("div",{ref:n})]})})}var f=n(30362),p=n(74424);function m(){let{configurableColumns:e,toggleColumnVisibility:s,resetDefaultColumnVisibility:n,sortOptions:t,sortColumn:r,setSortColumn:l,sortDirection:a,setSortDirection:x,enabledColumns:d}=(0,o.Yg)();return(0,i.jsxs)(c.J2e,{trigger:(0,i.jsxs)(c.zxk,{size:"small",tip:"Configure view",tipAlign:"end",children:[(0,i.jsx)(c.hiv,{}),"View",(0,i.jsx)(c.EMN,{})]}),contentProps:{align:"end",className:"max-w-[300px]"},children:[(0,i.jsxs)(c.WVB,{children:[(0,i.jsx)(c.__J,{children:"Order by"}),(0,i.jsx)(c.kFS,{children:(0,i.jsx)(c.PhF,{value:r,onChange:e=>{l(e.currentTarget.value)},children:Object.entries(t).map(e=>{let[s,n]=e;return(0,i.jsx)("optgroup",{label:s,children:n.map(e=>(0,i.jsx)("option",{value:e.id,children:e.label},e.id))},s)})})})]}),(0,i.jsxs)(c.WVB,{children:[(0,i.jsx)(c.__J,{children:"Direction"}),(0,i.jsx)(c.kFS,{children:(0,i.jsxs)(c.PhF,{value:a,onClick:e=>{e.stopPropagation()},onChange:e=>{x(e.currentTarget.value)},children:[(0,i.jsx)("option",{value:"desc",children:"Descending"},"desc"),(0,i.jsx)("option",{value:"asc",children:"Ascending"},"asc")]})})]}),(0,i.jsx)(c.Clw,{}),(0,i.jsxs)(c.WVB,{children:[(0,i.jsx)(c.__J,{children:"Display properties"}),(0,i.jsx)(c.kFS,{children:(0,i.jsx)(c.zxk,{onClick:e=>{e.stopPropagation(),n()},children:"Reset default"})})]}),(0,i.jsx)(c.WVB,{children:(0,i.jsx)(c.j4H,{options:e.map(e=>({label:e.label,value:e.id})),values:d,onChange:e=>s(e)})})]})}function g(){let{openDialog:e}=(0,l.Rh)(),{uploadFiles:s,dataState:n,offset:t,limit:r,datasetCount:a,pageCount:x}=(0,o.Yg)(),{getRootProps:d,getInputProps:u}=(0,p.uI)({noDrag:!0,onDrop:s});return(0,i.jsxs)("div",{className:"flex gap-2",children:[(0,i.jsx)(c.uDJ,{isLoading:"loading"===n,offset:t,limit:r,datasetTotal:a,pageTotal:x}),(0,i.jsx)(c.zxk,{onClick:()=>e("filesSearch"),tip:"Search files",children:(0,i.jsx)(c.UBs,{})}),(0,i.jsxs)(c.zxk,{...d(),tip:"Upload files",children:[(0,i.jsx)("input",{...u()}),(0,i.jsx)(c.bQp,{})]}),(0,i.jsx)(c.zxk,{onClick:()=>e("filesCreateDirectory"),tip:"Create directory",children:(0,i.jsx)(c.L37,{})}),(0,i.jsx)(m,{})]})}function v(){let{openDialog:e}=(0,l.Rh)();return(0,i.jsx)(f.J,{routes:r._,sidenav:(0,i.jsx)(t.x,{}),nav:(0,i.jsx)(h,{}),actions:(0,i.jsx)(g,{}),openSettings:()=>e("settings"),children:(0,i.jsx)("div",{className:"p-5 min-w-fit",children:(0,i.jsx)(u,{})})})}function N(){return(0,i.jsx)(v,{})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=38345)}),_N_E=e.O()}]);