"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[301],{17398:function(e,s,t){t.d(s,{C:function(){return c}});var l=t(52322),i=t(89424),n=t(47211),r=t(41736);function a(){let{activeExplorerMode:e,setExplorerModeDirectory:s,setExplorerModeFlat:t,isViewingUploads:a,navigateToUploads:c}=(0,r.b)();return(0,l.jsxs)(i.h_2,{trigger:(0,l.jsx)(i.zxk,{tipSide:"bottom",tip:a?"Viewing uploads":"directory"===e?"Viewing directory explorer":"Viewing all bucket files",children:a?(0,l.jsx)(n.bQp,{}):"directory"===e?(0,l.jsx)(n.Qbr,{}):(0,l.jsx)(n.nDH,{})}),contentProps:{align:"start",side:"bottom",className:"max-w-[300px]"},children:[(0,l.jsxs)(i.Xiv,{onSelect:s,children:[(0,l.jsx)(i.KpP,{children:(0,l.jsx)(n.Qbr,{})}),"Directory"]}),(0,l.jsxs)(i.Xiv,{onSelect:t,children:[(0,l.jsx)(i.KpP,{children:(0,l.jsx)(n.nDH,{})}),"All files"]}),(0,l.jsxs)(i.Xiv,{onSelect:c,children:[(0,l.jsx)(i.KpP,{children:(0,l.jsx)(n.bQp,{})}),"Uploads"]})]})}function c(){let{isViewingBuckets:e}=(0,r.b)();return e?(0,l.jsx)(i.ua7,{content:"Viewing all buckets",children:(0,l.jsx)("div",{children:(0,l.jsx)(i.zxk,{state:"waiting",children:(0,l.jsx)(n.fi8,{size:16})})})}):(0,l.jsx)(a,{})}},19301:function(e,s,t){t.d(s,{h:function(){return et}});var l=t(52322),i=t(97992),n=t(98334),r=t(83553),a=t(2784),c=t(89424),o=t(47211),d=t(41736),x=t(17398);function u(){let{activeDirectory:e,setActiveDirectory:s}=(0,d.b)(),t=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let e=setTimeout(()=>{var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})},100);return()=>{clearTimeout(e)}},[e]),(0,l.jsxs)("div",{className:"flex gap-2 items-center h-full",children:[(0,l.jsx)(x.C,{}),(0,l.jsx)(c.xrM,{children:(0,l.jsxs)("div",{className:"flex gap-1 items-center h-full",children:[(0,l.jsx)(c.xvT,{onClick:()=>s(()=>[]),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:"Buckets"}),e.length>0&&(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),e.map((e,t)=>(0,l.jsxs)(a.Fragment,{children:[t>0&&(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),(0,l.jsx)(c.xvT,{onClick:()=>s(e=>e.slice(0,t+1)),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:e})]},e+t)),(0,l.jsx)("div",{ref:t})]})})]})}var h=t(91362),j=t(74424),f=t(3077),m=t(52058);function v(){let{configurableColumns:e,toggleColumnVisibility:s,resetDefaultColumnVisibility:t,sortField:i,setSortField:n,sortDirection:r,setSortDirection:a,enabledColumns:x}=(0,d.b)();return(0,l.jsxs)(c.J2e,{trigger:(0,l.jsxs)(c.zxk,{size:"small",tip:"Configure view",tipAlign:"end",children:[(0,l.jsx)(o.hiv,{}),"View",(0,l.jsx)(o.EMN,{})]}),contentProps:{align:"end",className:"max-w-[300px]"},children:[(0,l.jsxs)(c.WVB,{children:[(0,l.jsx)(c.__J,{children:"Order by"}),(0,l.jsx)(c.kFS,{children:(0,l.jsx)(c.PhF,{value:i,onChange:e=>{n(e.currentTarget.value)},children:Object.entries((0,m.Z)(f.Fo,"category")).map(e=>{let[s,t]=e;return(0,l.jsx)("optgroup",{label:s,children:t.map(e=>(0,l.jsx)(c.Wxm,{value:e.id,children:e.label},e.id))},s)})})})]}),(0,l.jsxs)(c.WVB,{children:[(0,l.jsx)(c.__J,{children:"Direction"}),(0,l.jsx)(c.kFS,{children:(0,l.jsxs)(c.PhF,{value:r,onClick:e=>{e.stopPropagation()},onChange:e=>{a(e.currentTarget.value)},children:[(0,l.jsx)(c.Wxm,{value:"desc",children:"descending"},"desc"),(0,l.jsx)(c.Wxm,{value:"asc",children:"ascending"},"asc")]})})]}),(0,l.jsx)(c.Clw,{}),(0,l.jsxs)(c.WVB,{children:[(0,l.jsx)(c.__J,{children:"Display properties"}),(0,l.jsx)(c.kFS,{children:(0,l.jsx)(c.zxk,{onClick:e=>{e.stopPropagation(),t()},children:"Reset default"})})]}),(0,l.jsx)(c.WVB,{children:(0,l.jsx)(c.j4H,{options:e.map(e=>({label:e.label,value:e.id})),values:x,onChange:e=>s(e)})})]})}var g=t(38855),p=t(5062),b=t(37606);function N(){let{autopilot:e}=(0,b.q)(),s=(0,p.e$)({config:{swr:{errorRetryCount:0}}});return{active:"on"===e.status&&!!s.error}}var y=t(42770);function w(){let{isViewingABucket:e}=(0,d.b)(),s=(0,g.n)(),t=N(),l=(0,y.F)();return e&&!t.active&&!l.active&&s.isSynced}let{useDropzone:T}=j;function k(){let{openDialog:e}=(0,r.Rh)(),{uploadFiles:s,isViewingBuckets:t}=(0,d.b)(),i=w(),{getRootProps:n,getInputProps:a}=T({noDrag:!0,noClick:!i,onDrop:s});return(0,l.jsxs)("div",{className:"flex gap-2",children:[t?(0,l.jsxs)(c.zxk,{onClick:()=>e("filesCreateBucket"),tip:"Create bucket",children:[(0,l.jsx)(o.aXP,{}),"Create bucket"]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.zxk,{onClick:()=>e("filesSearch"),tip:"Search files","aria-label":"search files",children:(0,l.jsx)(o.UBs,{})}),(0,l.jsxs)(c.zxk,{"aria-label":"Upload files",...n(),tip:"Upload files",disabled:!i,children:[(0,l.jsx)("input",{...a()}),(0,l.jsx)(o.bQp,{})]}),(0,l.jsx)(c.zxk,{"aria-label":"Create directory",disabled:!i,onClick:()=>e("filesCreateDirectory"),tip:"Create directory",children:(0,l.jsx)(o.L37,{})})]}),(0,l.jsx)(v,{})]})}var z=t(75618),S=t(13593);function C(){let e=(0,p.Q5)({config:{swr:{refreshInterval:(0,S.sW)(5),revalidateOnFocus:!1}}});if(!e.data&&e.isValidating)return(0,l.jsx)(c.xgg,{className:"pr-1"});if(!e.data)return null;let s=e.data.totalObjectsSize+e.data.totalUnfinishedObjectsSize,t=s?e.data.totalSectorsSize/s:0;return(0,l.jsx)(c.ua7,{side:"bottom",content:(0,l.jsxs)(c.xvT,{className:"flex justify-between gap-6",children:[(0,l.jsxs)(c.xvT,{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"size of all files"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"with redundancy"}),!!t&&(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"average redundancy factor"}),(0,l.jsx)(c.Z0O,{className:"w-full my-1"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"total storage utilization"})]}),(0,l.jsxs)(c.xvT,{className:"flex flex-col gap-1 items-end",children:[(0,l.jsx)(c.xvT,{size:"12",children:(0,S.vW)(e.data.totalObjectsSize)}),(0,l.jsx)(c.xvT,{size:"12",children:(0,S.vW)(e.data.totalSectorsSize)}),!!t&&(0,l.jsxs)(c.xvT,{size:"12",font:"mono",children:[t.toFixed(1),"x"]}),(0,l.jsx)(c.Z0O,{className:"w-full my-1"}),(0,l.jsx)(c.xvT,{size:"12",children:(0,S.vW)(e.data.totalUploadedSize)})]})]}),children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",children:"".concat((0,S.vW)(e.data.totalObjectsSize)).concat(t?" @ ".concat(t.toFixed(1),"x"):"")})})}var F=t(18121);function _(){var e,s;let t=(0,p.Q5)({config:{swr:{refreshInterval:6e4,keepPreviousData:!0,revalidateOnFocus:!1}}}),{displayHealth:i,label:n}=(0,F.B)({health:null===(e=t.data)||void 0===e?void 0:e.minHealth,size:1,isDirectory:!0}),r=(null===(s=t.data)||void 0===s?void 0:s.totalObjectsSize)===0;return!t.data||r?null:(0,l.jsx)(c.ua7,{align:"end",content:(0,l.jsxs)("div",{className:"flex flex-col overflow-hidden mb-1",children:[(0,l.jsxs)("div",{className:"flex justify-between gap-2",children:[(0,l.jsx)(c.xvT,{size:"12",children:n}),(0,l.jsxs)(c.xvT,{size:"12",children:[(100*i).toFixed(0),"%"]})]}),(0,l.jsx)(c.Z0O,{className:"w-full my-1.5"}),(0,l.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"Health is calculated as the minimum health value from across all file slabs. For directories this is across all contained files."}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"Slab health is calculated as the number of shards with active contracts in the autopilot contract set above the minimum required shards and expressed as a percentage."})]}),(0,l.jsx)(c.Z0O,{className:"w-full my-1.5"}),(0,l.jsxs)("div",{className:"flex gap-3 justify-between",children:[(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"excellent health"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"good health"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"poor health"})]}),(0,l.jsxs)("div",{className:"flex flex-col gap-1 items-end",children:[(0,l.jsxs)(c.xvT,{size:"12",color:"subtle",children:[100*F.V.excellent,"%"]}),(0,l.jsxs)(c.xvT,{size:"12",color:"subtle",children:[100*F.V.good,"% -"," ",100*F.V.excellent,"%"]}),(0,l.jsxs)(c.xvT,{size:"12",color:"subtle",children:[100*F.V.poor,"% - ",100*F.V.good,"%"]})]})]})]}),children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",className:"flex",children:n})})}function W(){let e=(0,g.n)(),s=function(){let{autopilot:e}=(0,b.q)(),s=function(){var e,s;let{autopilot:t}=(0,b.q)(),l=(0,p.e$)({disabled:"on"!==t.status}),i=(0,p.NF)();return{isValidating:l.isValidating||i.isValidating,data:(null===(e=l.data)||void 0===e?void 0:e.contracts.set)===(null===(s=i.data)||void 0===s?void 0:s.defaultContractSet)}}();return{active:"on"===e.status&&!s.isValidating&&!s.data}}(),t=N(),i=(0,y.F)(),n=(0,a.useMemo)(()=>e.isSynced?null:(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploads are disabled until renterd is synced."}),(0,l.jsx)(c.nvN,{size:"12",children:"The blockchain must be fully synced before uploading files. This can take a while depending on your hardware and network connection."})]},"syncStatus"),[e.isSynced]),r=(0,a.useMemo)(()=>t.active?(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploads are disabled until settings are configured."}),(0,l.jsxs)(c.nvN,{size:"12",children:["Before you can upload files you must configure your settings. Once configured, ",(0,l.jsx)(c.EKh,{children:"renterd"})," will find contracts with hosts based on the settings you choose. ",(0,l.jsx)(c.EKh,{children:"renterd"})," will also repair your data as hosts come and go."]})]},"autopilotNotConfigured"):null,[t.active]),d=(0,a.useMemo)(()=>i.active?(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploads are disabled until settings are configured."}),(0,l.jsxs)(c.nvN,{size:"12",children:["There are not enough contracts to upload data yet. Redundancy is configured to use ",i.required," shards which means at least that many contracts are required."]})]},"notEnoughContracts"):null,[i]),x=(0,a.useMemo)(()=>s.active?(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploaded data will not be managed by autopilot."}),(0,l.jsx)(c.nvN,{size:"12",children:"The autopilot contract set does not match the default contract set. This means that by default workers will not upload data to contracts that autopilot manages. Unless these contract are being manually maintained, this will result in data loss. Continue with caution or update the autopilot contract set to match the default contract set."})]},"contractSetMismatch"):null,[s.active]),u=(0,a.useMemo)(()=>[n,r,d,x].filter(Boolean),[n,r,d,x]);if(u.length)return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.J2e,{trigger:(0,l.jsx)(c.zxk,{variant:"ghost",icon:"contrast",color:"amber",children:(0,l.jsx)(o.qdM,{})}),children:(0,l.jsx)("div",{className:"flex flex-col gap-3 px-1 py-2",children:u})}),(0,l.jsx)(c.Z0O,{variant:"vertical",className:"h-full"})]})}var B=t(43385);function D(){var e;let{isViewingABucket:s,uploadsList:t,activeExplorerMode:i}=(0,d.b)(),{pageCount:n}=(0,z.J)(),{pageCount:r}=(0,B.o)(),a=(0,p.Q5)({config:{swr:{refreshInterval:6e4,keepPreviousData:!0,revalidateOnFocus:!1}}}),o=((null===(e=a.data)||void 0===e?void 0:e.numObjects)||0)+t.length;return s?(0,l.jsxs)("div",{className:"flex gap-1",children:[(0,l.jsx)(c.ua7,{side:"bottom",content:"Number of files in page of current directory",children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",children:("flat"===i?r:n).toLocaleString()})}),(0,l.jsx)(c.ua7,{side:"bottom",content:"Number of files across all buckets",children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",children:a.data?"of ".concat(o.toLocaleString()," files"):" files"})})]}):(0,l.jsx)(c.ua7,{side:"bottom",content:"Number of files across all buckets",children:a.data?(0,l.jsxs)(c.xvT,{size:"12",font:"mono",children:[o.toLocaleString()," files"]}):(0,l.jsx)(c.xgg,{})})}function V(){return(0,l.jsxs)("div",{className:"flex gap-3 items-center",children:[(0,l.jsx)(W,{}),(0,l.jsxs)("div",{className:"flex gap-3",children:[(0,l.jsx)(c.ua7,{side:"bottom",content:"Filtered statistics",children:(0,l.jsx)(c.xvT,{size:"12",color:"verySubtle",children:(0,l.jsx)(o.q0D,{})})}),(0,l.jsx)(D,{})]}),(0,l.jsx)(c.Z0O,{variant:"vertical",className:"h-full"}),(0,l.jsxs)("div",{className:"flex gap-3",children:[(0,l.jsx)(c.ua7,{side:"bottom",content:"Global statistics",children:(0,l.jsx)(c.xvT,{size:"12",color:"verySubtle",children:(0,l.jsx)(o.RFr,{})})}),(0,l.jsx)(C,{}),(0,l.jsx)(_,{})]})]})}var O=t(94225);function P(e){let{placeholder:s}=e,{setFilter:t,removeFilter:i,fileNamePrefixFilter:n}=(0,d.b)(),[r,x]=(0,a.useState)(n),[u]=(0,O.Nr)(r,500);return(0,a.useEffect)(()=>{n!==r&&x(n)},[n]),(0,a.useEffect)(()=>{n!==u&&(u.length?t({id:"fileNamePrefix",label:"",value:u}):i("fileNamePrefix"))},[u]),(0,l.jsxs)("div",{className:"flex gap-1 flex-1",children:[(0,l.jsx)(c.nvn,{"aria-label":"filter files in current directory",variant:"ghost",focus:"none",placeholder:s||"Filter files in current directory",value:r,onChange:e=>x(e.currentTarget.value),className:"w-full !pl-0"}),!!r.length&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.zxk,{variant:"ghost",onClick:()=>x(""),children:(0,l.jsx)(o.PcV,{})}),(0,l.jsx)(c.Z0O,{variant:"vertical",className:"h-full"})]})]})}function J(){let{isViewingABucket:e,isViewingBuckets:s}=(0,d.b)(),{limit:t,marker:i,isMore:n,pageCount:r,dataState:a}=(0,z.J)();return(0,l.jsxs)("div",{className:"flex gap-3 w-full",children:[s?(0,l.jsx)("div",{className:"flex-1"}):(0,l.jsx)(P,{}),(0,l.jsx)(V,{}),e&&(0,l.jsx)(c._5,{isMore:n,marker:i,limit:t,pageTotal:r,isLoading:"loading"===a})]})}function E(){return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Ckx,{className:"scale-[200%]"})}),(0,l.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching files."})]})}function K(){let{filters:e,resetFilters:s}=(0,d.b)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Hb6,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No files matching filters."}),!!e.length&&(0,l.jsx)(c.zxk,{onClick:e=>{e.stopPropagation(),s()},children:"Clear filters"})]})]})}function M(){let{activeBucketName:e,activeDirectory:s,setActiveDirectory:t}=(0,d.b)();return s.length>1?(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"The current directory does not contain any files yet, drag and drop files or click here to start uploading."}),(0,l.jsx)(c.zxk,{onClick:e=>{e.stopPropagation(),t(e=>e.slice(0,-1))},children:"Back"})]})]}):(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsxs)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["The ",(0,l.jsx)(c.EKh,{children:e})," bucket does not contain any files, drag and drop files or click here to start uploading."]}),(0,l.jsx)(c.Qjf,{href:n._.buckets.index,onClick:e=>{e.stopPropagation()},children:"View buckets list"})]})]})}function U(){let{openDialog:e}=(0,r.Rh)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.fi8,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Create a bucket to get started. Buckets are distinct storage areas that you can use to organize your files."}),(0,l.jsxs)(c.zxk,{onClick:()=>e("filesCreateBucket"),tip:"Create bucket",children:[(0,l.jsx)(o.aXP,{}),"Create bucket"]})]})]})}function H(){let{isViewingRootOfABucket:e,isViewingBuckets:s}=(0,d.b)(),{dataState:t}=(0,z.J)(),i=N(),r=(0,y.F)();return"noneMatchingFilters"===t?(0,l.jsx)(K,{}):"error"===t?(0,l.jsx)(E,{}):e&&"noneYet"===t&&i.active?(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-6 justify-center items-center",children:[(0,l.jsxs)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["Before you can upload files you must configure your settings. Once configured, ",(0,l.jsx)(c.EKh,{children:"renterd"})," will find contracts with hosts based on the settings you choose. ",(0,l.jsx)(c.EKh,{children:"renterd"})," will also repair your data as hosts come and go."]}),(0,l.jsx)(c.Qjf,{variant:"accent",href:n._.config.index,children:"Configure"})]})]}):e&&"noneYet"===t&&r.active?(0,l.jsxs)("div",{className:"flex flex-col gap-12 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-4 justify-center items-center",children:[(0,l.jsxs)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["There are not enough contracts to upload data yet. Redundancy is configured to use ",r.required," shards which means at least that many contracts are required."]}),(0,l.jsxs)(c.xvT,{size:"30",className:"text-center max-w-[500px]",children:[r.count,"/",r.required]})]})]}):"noneYet"===t?s?(0,l.jsx)(U,{}):(0,l.jsx)(M,{}):null}var R=t(72199);function Q(){let{uploadFiles:e,sortField:s,sortDirection:t,sortableColumns:i,toggleSort:n,isViewingBuckets:r}=(0,d.b)(),{datasetPage:a,pageCount:o,dataState:x,onDragEnd:u,onDragOver:h,onDragStart:j,onDragCancel:f,onDragMove:m,draggingObject:v}=(0,z.J)(),g=w();return(0,l.jsx)("div",{className:"relative",children:(0,l.jsx)(c.fhJ,{testId:"filesDropzone",onDrop:e,noClick:!g||o>0,noDrag:!g,children:(0,l.jsx)(c.iA_,{testId:r?"bucketsTable":"filesTable",isLoading:"loading"===x,emptyState:(0,l.jsx)(H,{}),pageSize:10,data:a,columns:R.z,sortableColumns:i,sortField:s,sortDirection:t,toggleSort:n,rowSize:"dense",onDragStart:j,onDragOver:h,onDragEnd:u,onDragCancel:f,onDragMove:m,draggingDatum:v})})})}function q(){let{openDialog:e}=(0,r.Rh)();return(0,l.jsx)(h.J,{title:"Files",navTitle:null,routes:n._,sidenav:(0,l.jsx)(i.e,{}),nav:(0,l.jsx)(u,{}),stats:(0,l.jsx)(J,{}),actions:(0,l.jsx)(k,{}),openSettings:()=>e("settings"),children:(0,l.jsx)("div",{className:"p-6 min-w-fit",children:(0,l.jsx)(Q,{})})})}function L(){let{activeBucketName:e,setActiveDirectory:s}=(0,d.b)();return(0,l.jsxs)("div",{className:"flex gap-2 items-center h-full",children:[(0,l.jsx)(x.C,{}),(0,l.jsx)(c.xrM,{children:(0,l.jsxs)("div",{className:"flex gap-1 items-center h-full",children:[(0,l.jsx)(c.xvT,{onClick:()=>s(()=>[]),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:"Buckets"}),(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),(0,l.jsx)(c.xvT,{onClick:()=>null,size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:e}),(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),(0,l.jsx)(c.xvT,{size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:"All files"})]})})]})}function Y(){let{openDialog:e}=(0,r.Rh)();return(0,l.jsxs)("div",{className:"flex gap-2",children:[(0,l.jsx)(c.zxk,{onClick:()=>e("filesSearch"),tip:"Search files","aria-label":"search files",children:(0,l.jsx)(o.UBs,{})}),(0,l.jsx)(v,{})]})}function Z(){let{limit:e,pageCount:s,dataState:t,nextMarker:i,isMore:n}=(0,B.o)();return(0,l.jsxs)("div",{className:"flex gap-3 w-full",children:[(0,l.jsx)(P,{placeholder:"Filter files in current bucket"}),(0,l.jsx)(V,{}),(0,l.jsx)(c._5,{marker:i,isMore:n,limit:e,pageTotal:s,isLoading:"loading"===t})]})}function X(){return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Ckx,{className:"scale-[200%]"})}),(0,l.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching files."})]})}function A(){let{filters:e,resetFilters:s}=(0,d.b)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Hb6,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No files matching filters."}),!!e.length&&(0,l.jsx)(c.zxk,{onClick:e=>{e.stopPropagation(),s()},children:"Clear filters"})]})]})}function I(){let{activeBucketName:e}=(0,d.b)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(c.xvT,{children:(0,l.jsx)(o.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsxs)(c.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["The ",(0,l.jsx)(c.EKh,{children:e})," bucket does not contain any files."]}),(0,l.jsx)(c.Qjf,{href:n._.buckets.index,onClick:e=>{e.stopPropagation()},children:"View buckets list"})]})]})}function $(){let{dataState:e}=(0,B.o)();return"noneMatchingFilters"===e?(0,l.jsx)(A,{}):"error"===e?(0,l.jsx)(X,{}):"noneYet"===e?(0,l.jsx)(I,{}):null}var G=t(33351);function ee(){let{sortableColumns:e,toggleSort:s}=(0,d.b)(),{datasetPage:t,dataState:i,sortField:n,sortDirection:r}=(0,B.o)();return(0,l.jsx)("div",{className:"relative",children:(0,l.jsx)(c.iA_,{isLoading:"loading"===i,emptyState:(0,l.jsx)($,{}),pageSize:10,data:t,columns:G.z,sortableColumns:e,sortField:n,sortDirection:r,toggleSort:s,rowSize:"dense"})})}function es(){let{openDialog:e}=(0,r.Rh)();return(0,l.jsx)(h.J,{title:"Files",navTitle:null,routes:n._,sidenav:(0,l.jsx)(i.e,{}),nav:(0,l.jsx)(L,{}),stats:(0,l.jsx)(Z,{}),actions:(0,l.jsx)(Y,{}),openSettings:()=>e("settings"),children:(0,l.jsx)("div",{className:"p-6 min-w-fit",children:(0,l.jsx)(ee,{})})})}function et(){let{isViewingBuckets:e,activeExplorerMode:s}=(0,d.b)();return"directory"===s||e?(0,l.jsx)(q,{}):(0,l.jsx)(es,{})}},91362:function(e,s,t){t.d(s,{J:function(){return j}});var l=t(52322),i=t(89424),n=t(5062),r=t(6391),a=t.n(r),c=t(98334),o=t(38855),d=t(83553),x=t(13593);function u(){var e,s,t,r,a,c;let{openDialog:u}=(0,d.Rh)(),h=(0,n.d_)({config:{swr:{revalidateOnFocus:!1}}}),j=(0,n.X2)({config:{swr:{revalidateOnFocus:!1}}}),f=(0,n.cQ)(),m=(0,o.n)(),v=null===(e=h.data)||void 0===e?void 0:e.version,g="?"===v?"https://github.com/SiaFoundation/renterd/commits/":(null==v?void 0:v.match(/^v\d+\.\d+\.\d+/))?"https://github.com/SiaFoundation/renterd/releases/".concat(v):"https://github.com/SiaFoundation/renterd/tree/".concat(v),p=h.data?new Date().getTime()-new Date(null===(s=h.data)||void 0===s?void 0:s.startTime).getTime():0;return(0,l.jsxs)(i.HfT,{name:"renterd",peerCount:null===(t=f.data)||void 0===t?void 0:t.length,connectPeer:()=>u("connectPeer"),isSynced:m.isSynced,syncPercent:m.syncPercent,nodeBlockHeight:m.nodeBlockHeight,estimatedBlockHeight:m.estimatedBlockHeight,firstTimeSyncing:m.firstTimeSyncing,moreThan100BlocksToSync:m.moreThan100BlocksToSync,children:[(0,l.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,l.jsx)(i.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Wallet address"}),(0,l.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5",children:(0,l.jsx)(i.XxW,{size:"14",maxLength:50,value:null===(r=j.data)||void 0===r?void 0:r.address,type:"address"})})]}),h.data&&(0,l.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,l.jsx)(i.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Uptime"}),(0,l.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5",children:(0,l.jsx)(i.xvT,{size:"14",children:(0,x.bc)(p,{format:"long"})})})]}),(0,l.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,l.jsx)(i.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Network"}),(0,l.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5",children:(0,l.jsx)(i.xvT,{size:"14",children:null===(a=h.data)||void 0===a?void 0:a.network})})]}),(0,l.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,l.jsx)(i.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Version"}),(0,l.jsx)(i.rUS,{size:"14",href:g,underline:"hover",target:"_blank",ellipsis:!0,children:null===(c=h.data)||void 0===c?void 0:c.version})]})]})}function h(){let e=(0,n.d_)({config:{swr:{revalidateOnFocus:!1}}});return e.data&&"mainnet"!==e.data.network?(0,l.jsx)(i.t6k,{testnetName:e.data.network}):null}function j(e){let s=(0,n.X2)(),{isSynced:t}=(0,o.n)();return(0,l.jsx)(i.tU3,{appName:"renterd",profile:(0,l.jsx)(u,{}),banner:(0,l.jsx)(h,{}),connectivityRoute:c.h,isSynced:t,walletBalanceSc:s.data&&{spendable:new(a())(s.data.spendable),confirmed:new(a())(s.data.confirmed),unconfirmed:new(a())(s.data.unconfirmed),immature:new(a())(s.data.immature)},...e})}},97992:function(e,s,t){t.d(s,{e:function(){return o}});var l=t(52322),i=t(89424),n=t(47211),r=t(82851),a=t(98334),c=t(88385);function o(){let{totals:e}=(0,c.Z)(),s=e.all===e.info;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.KJW,{title:"Files",route:a._.buckets.index,children:(0,l.jsx)(n.ROc,{})}),(0,l.jsx)(i.KJW,{title:"Configuration",route:a._.config.index,children:(0,l.jsx)(n.wWN,{})}),(0,l.jsx)(i.KJW,{title:"Contracts",route:a._.contracts.index,children:(0,l.jsx)(n.VBo,{})}),(0,l.jsx)(i.KJW,{title:"Hosts",route:a._.hosts.index,children:(0,l.jsx)(n.VHe,{})}),(0,l.jsx)(i.KJW,{title:"S3 authentication keypairs",route:a._.keys.index,children:(0,l.jsx)(n._m8,{})}),(0,l.jsxs)("div",{className:"relative",children:[e.all?s?(0,l.jsx)("div",{className:(0,r.cx)("absolute -right-[2px] top-px w-1 h-1","rounded-full","bg-gray-1000 dark:bg-white","pointer-events-none")}):(0,l.jsx)(i.xvT,{size:"10",className:(0,r.cx)("absolute -right-[9px] -top-1 py-px px-[5px]","text-white","bg-red-500 dark:bg-red-500 rounded","pointer-events-none"),color:"none",children:e.all.toLocaleString()}):null,(0,l.jsx)(i.KJW,{title:"Alerts",route:a._.alerts.index,children:(0,l.jsx)(n.Dkj,{})})]})]})}}}]);