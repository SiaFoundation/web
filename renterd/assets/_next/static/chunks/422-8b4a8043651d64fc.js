"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[422],{19634:function(e,s,t){t.d(s,{C:function(){return c}});var l=t(52322),i=t(35105),n=t(63862),r=t(95810);function a(){let{activeExplorerMode:e,setExplorerModeDirectory:s,setExplorerModeFlat:t,isViewingUploads:a,navigateToUploads:c}=(0,r.b)();return(0,l.jsxs)(i.h_2,{trigger:(0,l.jsx)(i.zxk,{"aria-label":"change explorer mode",tipSide:"bottom",tip:a?"Viewing uploads":"directory"===e?"Viewing directory explorer":"Viewing all bucket files",children:a?(0,l.jsx)(n.bQp,{}):"directory"===e?(0,l.jsx)(n.Qbr,{}):(0,l.jsx)(n.nDH,{})}),contentProps:{align:"start",side:"bottom",className:"max-w-[300px]"},children:[(0,l.jsxs)(i.Xiv,{onSelect:s,children:[(0,l.jsx)(i.KpP,{children:(0,l.jsx)(n.Qbr,{})}),"Directory"]}),(0,l.jsxs)(i.Xiv,{onSelect:t,children:[(0,l.jsx)(i.KpP,{children:(0,l.jsx)(n.nDH,{})}),"All files"]}),(0,l.jsxs)(i.Xiv,{onSelect:c,children:[(0,l.jsx)(i.KpP,{children:(0,l.jsx)(n.bQp,{})}),"Uploads"]})]})}function c(){let{isViewingBuckets:e}=(0,r.b)();return e?(0,l.jsx)(i.ua7,{content:"Viewing all buckets",children:(0,l.jsx)("div",{children:(0,l.jsx)(i.zxk,{state:"waiting",children:(0,l.jsx)(n.fi8,{size:16})})})}):(0,l.jsx)(a,{})}},11711:function(e,s,t){t.d(s,{A:function(){return K},r:function(){return L}});var l=t(52322),i=t(70825),n=t(4300),r=t(82285),a=t(2784),c=t(35105),o=t(63862),x=t(95810),d=t(19634);function u(){let{activeDirectory:e,setActiveDirectory:s}=(0,x.b)(),t=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let e=setTimeout(()=>{var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})},100);return()=>{clearTimeout(e)}},[e]),(0,l.jsxs)("div",{className:"flex gap-2 items-center h-full",children:[(0,l.jsx)(d.C,{}),(0,l.jsx)(c.xrM,{children:(0,l.jsxs)("div",{className:"flex gap-1 items-center h-full",children:[(0,l.jsx)(c.xvT,{onClick:()=>s(()=>[]),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:"Buckets"}),e.length>0&&(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),e.map((e,t)=>(0,l.jsxs)(a.Fragment,{children:[t>0&&(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),(0,l.jsx)(c.xvT,{onClick:()=>s(e=>e.slice(0,t+1)),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:e})]},e+t)),(0,l.jsx)("div",{ref:t})]})})]})}function h(){let{activeBucketName:e,setActiveDirectory:s}=(0,x.b)();return(0,l.jsxs)("div",{className:"flex gap-2 items-center h-full",children:[(0,l.jsx)(d.C,{}),(0,l.jsx)(c.xrM,{children:(0,l.jsxs)("div",{className:"flex gap-1 items-center h-full",children:[(0,l.jsx)(c.xvT,{onClick:()=>s(()=>[]),size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:"Buckets"}),(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),(0,l.jsx)(c.xvT,{onClick:()=>null,size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:e}),(0,l.jsx)(c.xvT,{size:"16",color:"verySubtle",className:"flex items-center",children:(0,l.jsx)(o.F3j,{})}),(0,l.jsx)(c.xvT,{size:"18",weight:"semibold",className:"flex items-center cursor-pointer",noWrap:!0,children:"All files"})]})})]})}var f=t(6637),j=t(74424),m=t(89421),v=t(83894);function g(){let{configurableColumns:e,toggleColumnVisibility:s,resetDefaultColumnVisibility:t,sortField:i,setSortField:n,sortDirection:r,setSortDirection:a,enabledColumns:d}=(0,x.b)();return(0,l.jsxs)(c.J2e,{trigger:(0,l.jsxs)(c.zxk,{size:"small",tip:"Configure view",tipAlign:"end",children:[(0,l.jsx)(o.hiv,{}),"View",(0,l.jsx)(o.EMN,{})]}),contentProps:{align:"end",className:"max-w-[300px]"},children:[(0,l.jsxs)(c.WVB,{children:[(0,l.jsx)(c.__J,{children:"Order by"}),(0,l.jsx)(c.kFS,{children:(0,l.jsx)(c.PhF,{value:i,onChange:e=>{n(e.currentTarget.value)},children:Object.entries((0,v.Z)(m.Fo,"category")).map(e=>{let[s,t]=e;return(0,l.jsx)("optgroup",{label:s,children:t.map(e=>(0,l.jsx)(c.Wxm,{value:e.id,children:e.label},e.id))},s)})})})]}),(0,l.jsxs)(c.WVB,{children:[(0,l.jsx)(c.__J,{children:"Direction"}),(0,l.jsx)(c.kFS,{children:(0,l.jsxs)(c.PhF,{value:r,onClick:e=>{e.stopPropagation()},onChange:e=>{a(e.currentTarget.value)},children:[(0,l.jsx)(c.Wxm,{value:"desc",children:"descending"},"desc"),(0,l.jsx)(c.Wxm,{value:"asc",children:"ascending"},"asc")]})})]}),(0,l.jsx)(c.Clw,{}),(0,l.jsxs)(c.WVB,{children:[(0,l.jsx)(c.__J,{children:"Display properties"}),(0,l.jsx)(c.kFS,{children:(0,l.jsx)(c.zxk,{onClick:e=>{e.stopPropagation(),t()},children:"Reset default"})})]}),(0,l.jsx)(c.WVB,{children:(0,l.jsx)(c.j4H,{options:e.map(e=>({label:e.label,value:e.id})),values:d,onChange:e=>s(e)})})]})}var p=t(31925);let{useDropzone:b}=j;function N(){let{openDialog:e}=(0,r.Rh)(),{uploadFiles:s,isViewingBuckets:t}=(0,x.b)(),i=(0,p.u)(),{getRootProps:n,getInputProps:a}=b({noDrag:!0,noClick:!i,onDrop:s});return(0,l.jsxs)("div",{className:"flex gap-2",children:[t?(0,l.jsxs)(c.zxk,{onClick:()=>e("filesCreateBucket"),tip:"Create bucket",children:[(0,l.jsx)(o.aXP,{}),"Create bucket"]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.zxk,{onClick:()=>e("filesSearch"),tip:"Search files","aria-label":"search files",children:(0,l.jsx)(o.UBs,{})}),(0,l.jsxs)(c.zxk,{"aria-label":"Upload files",...n(),tip:"Upload files",disabled:!i,children:[(0,l.jsx)("input",{...a()}),(0,l.jsx)(o.bQp,{})]}),(0,l.jsx)(c.zxk,{"aria-label":"Create directory",disabled:!i,onClick:()=>e("filesCreateDirectory"),tip:"Create directory",children:(0,l.jsx)(o.L37,{})})]}),(0,l.jsx)(g,{})]})}var y=t(3031),k=t(94041),T=t(60381);function z(){let e=(0,k.Q5)({config:{swr:{refreshInterval:(0,T.sW)(5),revalidateOnFocus:!1}}});if(!e.data&&e.isValidating)return(0,l.jsx)(c.xgg,{className:"pr-1"});if(!e.data)return null;let s=e.data.totalObjectsSize+e.data.totalUnfinishedObjectsSize,t=s?e.data.totalSectorsSize/s:0;return(0,l.jsx)(c.ua7,{side:"bottom",content:(0,l.jsxs)("div",{className:"flex justify-between gap-6",children:[(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"size of all files"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"with redundancy"}),!!t&&(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"average redundancy factor"}),(0,l.jsx)(c.Z0O,{className:"w-full my-1"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"total storage utilization"})]}),(0,l.jsxs)("div",{className:"flex flex-col gap-1 items-end",children:[(0,l.jsx)(c.xvT,{size:"12",children:(0,T.vW)(e.data.totalObjectsSize)}),(0,l.jsx)(c.xvT,{size:"12",children:(0,T.vW)(e.data.totalSectorsSize)}),!!t&&(0,l.jsxs)(c.xvT,{size:"12",font:"mono",children:[t.toFixed(1),"x"]}),(0,l.jsx)(c.Z0O,{className:"w-full my-1"}),(0,l.jsx)(c.xvT,{size:"12",children:(0,T.vW)(e.data.totalUploadedSize)})]})]}),children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",children:"".concat((0,T.vW)(e.data.totalObjectsSize)).concat(t?" @ ".concat(t.toFixed(1),"x"):"")})})}var w=t(16180);function C(){var e,s;let t=(0,k.Q5)({config:{swr:{refreshInterval:6e4,keepPreviousData:!0,revalidateOnFocus:!1}}}),{displayHealth:i,label:n}=(0,w.B)({health:null===(e=t.data)||void 0===e?void 0:e.minHealth,size:1,isDirectory:!0}),r=(null===(s=t.data)||void 0===s?void 0:s.totalObjectsSize)===0;return!t.data||r?null:(0,l.jsx)(c.ua7,{align:"end",content:(0,l.jsxs)("div",{className:"flex flex-col overflow-hidden mb-1",children:[(0,l.jsxs)("div",{className:"flex justify-between gap-2",children:[(0,l.jsx)(c.xvT,{size:"12",children:n}),(0,l.jsxs)(c.xvT,{size:"12",children:[(100*i).toFixed(0),"%"]})]}),(0,l.jsx)(c.Z0O,{className:"w-full my-1.5"}),(0,l.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"Health is calculated as the minimum health value from across all file slabs. For directories this is across all contained files."}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"Slab health is calculated as the number of shards with active contracts in the autopilot contract set above the minimum required shards and expressed as a percentage."})]}),(0,l.jsx)(c.Z0O,{className:"w-full my-1.5"}),(0,l.jsxs)("div",{className:"flex gap-3 justify-between",children:[(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"excellent health"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"good health"}),(0,l.jsx)(c.xvT,{size:"12",color:"subtle",children:"poor health"})]}),(0,l.jsxs)("div",{className:"flex flex-col gap-1 items-end",children:[(0,l.jsxs)(c.xvT,{size:"12",color:"subtle",children:[100*w.V.excellent,"%"]}),(0,l.jsxs)(c.xvT,{size:"12",color:"subtle",children:[100*w.V.good,"% -"," ",100*w.V.excellent,"%"]}),(0,l.jsxs)(c.xvT,{size:"12",color:"subtle",children:[100*w.V.poor,"% - ",100*w.V.good,"%"]})]})]})]}),children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",className:"flex",children:n})})}var S=t(28245),F=t(16211),D=t(28924),V=t(69367);function O(){let e=(0,F.n)(),s=function(){let{isAutopilotEnabled:e}=(0,S.q)(),s=function(){var e,s;let{isAutopilotEnabled:t}=(0,S.q)(),l=(0,k.e$)({disabled:!t}),i=(0,k.NF)();return{isValidating:l.isValidating||i.isValidating,data:(null===(e=l.data)||void 0===e?void 0:e.contracts.set)===(null===(s=i.data)||void 0===s?void 0:s.defaultContractSet)}}();return{active:e&&!s.isValidating&&!s.data}}(),t=(0,D.F)(),i=(0,V.F)(),n=(0,a.useMemo)(()=>e.isSynced?null:(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploads are disabled until renterd is synced."}),(0,l.jsx)(c.nvN,{size:"12",children:"The blockchain must be fully synced before uploading files. This can take a while depending on your hardware and network connection."})]},"syncStatus"),[e.isSynced]),r=(0,a.useMemo)(()=>t.active?(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploads are disabled until settings are configured."}),(0,l.jsxs)(c.nvN,{size:"12",children:["Before you can upload files you must configure your settings. Once configured, ",(0,l.jsx)(c.EKh,{children:"renterd"})," will find contracts with hosts based on the settings you choose. ",(0,l.jsx)(c.EKh,{children:"renterd"})," will also repair your data as hosts come and go."]})]},"autopilotNotConfigured"):null,[t.active]),x=(0,a.useMemo)(()=>i.active?(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploads are disabled until settings are configured."}),(0,l.jsxs)(c.nvN,{size:"12",children:["There are not enough contracts to upload data yet. Redundancy is configured to use ",i.required," shards which means at least that many contracts are required."]})]},"notEnoughContracts"):null,[i]),d=(0,a.useMemo)(()=>s.active?(0,l.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,l.jsx)(c.xvT,{size:"12",font:"mono",weight:"medium",color:"amber",children:"Uploaded data will not be managed by autopilot."}),(0,l.jsx)(c.nvN,{size:"12",children:"The autopilot contract set does not match the default contract set. This means that by default workers will not upload data to contracts that autopilot manages. Unless these contract are being manually maintained, this will result in data loss. Continue with caution or update the autopilot contract set to match the default contract set."})]},"contractSetMismatch"):null,[s.active]),u=(0,a.useMemo)(()=>[n,r,x,d].filter(Boolean),[n,r,x,d]);if(u.length)return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.J2e,{trigger:(0,l.jsx)(c.zxk,{variant:"ghost",icon:"contrast",color:"amber",children:(0,l.jsx)(o.qdM,{})}),children:(0,l.jsx)("div",{className:"flex flex-col gap-3 px-1 py-2",children:u})}),(0,l.jsx)(c.Z0O,{variant:"vertical",className:"h-full"})]})}var P=t(40824);function W(){var e;let{isViewingABucket:s,uploadsList:t,activeExplorerMode:i}=(0,x.b)(),{pageCount:n}=(0,y.J)(),{pageCount:r}=(0,P.o)(),a=(0,k.Q5)({config:{swr:{refreshInterval:6e4,keepPreviousData:!0,revalidateOnFocus:!1}}}),o=((null===(e=a.data)||void 0===e?void 0:e.numObjects)||0)+t.length;return s?(0,l.jsxs)("div",{className:"flex gap-1",children:[(0,l.jsx)(c.ua7,{side:"bottom",content:"Number of files in page of current directory",children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",children:("flat"===i?r:n).toLocaleString()})}),(0,l.jsx)(c.ua7,{side:"bottom",content:"Number of files across all buckets",children:(0,l.jsx)(c.xvT,{size:"12",font:"mono",children:a.data?"of ".concat(o.toLocaleString()," files"):" files"})})]}):(0,l.jsx)(c.ua7,{side:"bottom",content:"Number of files across all buckets",children:a.data?(0,l.jsxs)(c.xvT,{size:"12",font:"mono",children:[o.toLocaleString()," files"]}):(0,l.jsx)(c.xgg,{})})}function _(){return(0,l.jsxs)("div",{className:"flex gap-3 items-center",children:[(0,l.jsx)(O,{}),(0,l.jsxs)("div",{className:"flex gap-3",children:[(0,l.jsx)(c.ua7,{side:"bottom",content:"Filtered statistics",children:(0,l.jsx)(c.xvT,{size:"12",color:"verySubtle",children:(0,l.jsx)(o.q0D,{})})}),(0,l.jsx)(W,{})]}),(0,l.jsx)(c.Z0O,{variant:"vertical",className:"h-full"}),(0,l.jsxs)("div",{className:"flex gap-3",children:[(0,l.jsx)(c.ua7,{side:"bottom",content:"Global statistics",children:(0,l.jsx)(c.xvT,{size:"12",color:"verySubtle",children:(0,l.jsx)(o.RFr,{})})}),(0,l.jsx)(z,{}),(0,l.jsx)(C,{})]})]})}var B=t(94225);function E(e){let{placeholder:s}=e,{setFilter:t,removeFilter:i,fileNamePrefixFilter:n}=(0,x.b)(),[r,d]=(0,a.useState)(n),[u]=(0,B.Nr)(r,500);return(0,a.useEffect)(()=>{n!==r&&d(n)},[n]),(0,a.useEffect)(()=>{n!==u&&(u.length?t({id:"fileNamePrefix",label:"",value:u}):i("fileNamePrefix"))},[u]),(0,l.jsxs)("div",{className:"flex gap-1 flex-1",children:[(0,l.jsx)(c.nvn,{"aria-label":"filter files in current directory",variant:"ghost",focus:"none",placeholder:s||"Filter files in current directory",value:r,onChange:e=>d(e.currentTarget.value),className:"w-full !pl-0"}),!!r.length&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.zxk,{variant:"ghost",onClick:()=>d(""),children:(0,l.jsx)(o.PcV,{})}),(0,l.jsx)(c.Z0O,{variant:"vertical",className:"h-full"})]})]})}function M(){let{isViewingABucket:e,isViewingBuckets:s}=(0,x.b)(),{limit:t,marker:i,isMore:n,pageCount:r,dataState:a}=(0,y.J)();return(0,l.jsxs)("div",{className:"flex gap-3 w-full",children:[s?(0,l.jsx)("div",{className:"flex-1"}):(0,l.jsx)(E,{}),(0,l.jsx)(_,{}),e&&(0,l.jsx)(c._5,{isMore:n,marker:i,limit:t,pageTotal:r,isLoading:"loading"===a})]})}function J(e){let{multiSelect:s}=e,t=(0,a.useMemo)(()=>Object.entries(s.selectionMap).map(e=>{let[s,t]=e;return{bucket:t.bucket.name,prefix:t.key}}),[s.selectionMap]),{openConfirmDialog:i}=(0,r.Rh)(),n=(0,k.Lh)(),x=(0,a.useCallback)(async()=>{let e=t.length,l=0;for(let{bucket:e,prefix:s}of t)(await n.post({payload:{bucket:e,prefix:s}})).error&&l++;l>0?(0,c.OHV)({title:"".concat(e-l," files deleted"),body:"Error deleting ".concat(l,"/").concat(e," total files.")}):(0,c.OPV)({title:"".concat(e," files deleted")}),s.deselectAll()},[s,t,n]);return(0,l.jsx)(c.zxk,{"aria-label":"delete selected files",tip:"Delete selected files",onClick:()=>{i({title:"Delete files",action:"Delete",variant:"red",body:(0,l.jsx)("div",{className:"flex flex-col gap-1",children:(0,l.jsxs)(c.nvN,{size:"14",children:["Are you sure you would like to delete the"," ",s.selectionCount.toLocaleString()," selected files?"]})}),onConfirm:async()=>{x()}})},children:(0,l.jsx)(o.Jrl,{})})}function q(){let{multiSelect:e}=(0,y.J)();return(0,l.jsx)(c.hv1,{multiSelect:e,entityWord:"file",children:(0,l.jsx)(J,{multiSelect:e})})}function Q(){return(0,l.jsx)(q,{})}function U(){let{multiSelect:e}=(0,P.o)();return(0,l.jsx)(c.hv1,{multiSelect:e,entityWord:"file",children:(0,l.jsx)(J,{multiSelect:e})})}function A(){return(0,l.jsx)(U,{})}let K=f.J;function L(){let{openDialog:e}=(0,r.Rh)(),{isViewingBuckets:s,activeExplorerMode:t}=(0,x.b)();return"directory"===t||s?{title:"Files",navTitle:null,routes:n._,sidenav:(0,l.jsx)(i.e,{}),openSettings:()=>e("settings"),nav:(0,l.jsx)(u,{}),stats:(0,l.jsx)(M,{}),actions:(0,l.jsx)(N,{}),dockedControls:(0,l.jsx)(Q,{})}:{title:"Files",navTitle:null,routes:n._,sidenav:(0,l.jsx)(i.e,{}),openSettings:()=>e("settings"),nav:(0,l.jsx)(h,{}),stats:(0,l.jsx)(M,{}),actions:(0,l.jsx)(N,{}),dockedControls:(0,l.jsx)(A,{})}}},28924:function(e,s,t){t.d(s,{F:function(){return i}});var l=t(28245);function i(){var e,s,t;let{autopilotInfo:i}=(0,l.q)();return{active:(null===(e=i.data)||void 0===e?void 0:e.isAutopilotEnabled)&&!(null===(t=i.data)||void 0===t?void 0:null===(s=t.state)||void 0===s?void 0:s.configured)}}},70348:function(e,s,t){t.d(s,{h:function(){return F}});var l=t(52322),i=t(35105),n=t(3031),r=t(63862),a=t(4300),c=t(28924),o=t(69367);function x(){return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Ckx,{className:"scale-[200%]"})}),(0,l.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching files."})]})}var d=t(95810);function u(){let{filters:e,resetFilters:s}=(0,d.b)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Hb6,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No files matching filters."}),!!e.length&&(0,l.jsx)(i.zxk,{onClick:e=>{e.stopPropagation(),s()},children:"Clear filters"})]})]})}function h(){let{activeBucketName:e,activeDirectory:s,setActiveDirectory:t}=(0,d.b)();return s.length>1?(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"The current directory does not contain any files yet, drag and drop files or click here to start uploading."}),(0,l.jsx)(i.zxk,{onClick:e=>{e.stopPropagation(),t(e=>e.slice(0,-1))},children:"Back"})]})]}):(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsxs)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["The ",(0,l.jsx)(i.EKh,{children:e})," bucket does not contain any files, drag and drop files or click here to start uploading."]}),(0,l.jsx)(i.Qjf,{href:a._.buckets.index,onClick:e=>{e.stopPropagation()},children:"View buckets list"})]})]})}var f=t(82285);function j(){let{openDialog:e}=(0,f.Rh)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.fi8,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Create a bucket to get started. Buckets are distinct storage areas that you can use to organize your files."}),(0,l.jsxs)(i.zxk,{onClick:()=>e("filesCreateBucket"),tip:"Create bucket",children:[(0,l.jsx)(r.aXP,{}),"Create bucket"]})]})]})}function m(){let{isViewingRootOfABucket:e,isViewingBuckets:s}=(0,d.b)(),{dataState:t}=(0,n.J)(),f=(0,c.F)(),m=(0,o.F)();return"noneMatchingFilters"===t?(0,l.jsx)(u,{}):"error"===t?(0,l.jsx)(x,{}):e&&"noneYet"===t&&f.active?(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-6 justify-center items-center",children:[(0,l.jsxs)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["Before you can upload files you must configure your settings. Once configured, ",(0,l.jsx)(i.EKh,{children:"renterd"})," will find contracts with hosts based on the settings you choose. ",(0,l.jsx)(i.EKh,{children:"renterd"})," will also repair your data as hosts come and go."]}),(0,l.jsx)(i.Qjf,{variant:"accent",href:a._.config.index,children:"Configure"})]})]}):e&&"noneYet"===t&&m.active?(0,l.jsxs)("div",{className:"flex flex-col gap-12 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-4 justify-center items-center",children:[(0,l.jsxs)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["There are not enough contracts to upload data yet. Redundancy is configured to use ",m.required," shards which means at least that many contracts are required."]}),(0,l.jsxs)(i.xvT,{size:"30",className:"text-center max-w-[500px]",children:[m.count,"/",m.required]})]})]}):"noneYet"===t?s?(0,l.jsx)(j,{}):(0,l.jsx)(h,{}):null}var v=t(31925),g=t(83548);function p(){let{uploadFiles:e,sortField:s,sortDirection:t,sortableColumns:r,toggleSort:a,isViewingBuckets:c}=(0,d.b)(),{datasetPage:o,pageCount:x,dataState:u,cellContext:h,onDragEnd:f,onDragOver:j,onDragStart:p,onDragCancel:b,onDragMove:N,draggingObject:y}=(0,n.J)(),k=(0,v.u)();return(0,l.jsx)("div",{className:"relative",children:(0,l.jsx)(i.fhJ,{testId:"filesDropzone",onDrop:e,noClick:!k||x>0,noDrag:!k,children:(0,l.jsx)(i.iA_,{testId:c?"bucketsTable":"filesTable",isLoading:"loading"===u,emptyState:(0,l.jsx)(m,{}),pageSize:10,data:o,context:h,columns:g.z,sortableColumns:r,sortField:s,sortDirection:t,toggleSort:a,rowSize:"dense",onDragStart:p,onDragOver:j,onDragEnd:f,onDragCancel:b,onDragMove:N,draggingDatum:y})})})}function b(){return(0,l.jsx)("div",{className:"p-6 min-w-fit",children:(0,l.jsx)(p,{})})}function N(){return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Ckx,{className:"scale-[200%]"})}),(0,l.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching files."})]})}function y(){let{filters:e,resetFilters:s}=(0,d.b)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Hb6,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsx)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No files matching filters."}),!!e.length&&(0,l.jsx)(i.zxk,{onClick:e=>{e.stopPropagation(),s()},children:"Clear filters"})]})]})}function k(){let{activeBucketName:e}=(0,d.b)();return(0,l.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer",children:[(0,l.jsx)(i.xvT,{children:(0,l.jsx)(r.Y9T,{className:"scale-[200%]"})}),(0,l.jsxs)("div",{className:"flex flex-col gap-3 items-center",children:[(0,l.jsxs)(i.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:["The ",(0,l.jsx)(i.EKh,{children:e})," bucket does not contain any files."]}),(0,l.jsx)(i.Qjf,{href:a._.buckets.index,onClick:e=>{e.stopPropagation()},children:"View buckets list"})]})]})}var T=t(40824);function z(){let{dataState:e}=(0,T.o)();return"noneMatchingFilters"===e?(0,l.jsx)(y,{}):"error"===e?(0,l.jsx)(N,{}):"noneYet"===e?(0,l.jsx)(k,{}):null}var w=t(16830);function C(){let{sortableColumns:e,toggleSort:s}=(0,d.b)(),{datasetPage:t,dataState:n,cellContext:r,sortField:a,sortDirection:c}=(0,T.o)();return(0,l.jsx)("div",{className:"relative",children:(0,l.jsx)(i.iA_,{testId:"filesTable",isLoading:"loading"===n,emptyState:(0,l.jsx)(z,{}),pageSize:10,data:t,context:r,columns:w.z,sortableColumns:e,sortField:a,sortDirection:c,toggleSort:s,rowSize:"dense"})})}function S(){return(0,l.jsx)("div",{className:"p-6 min-w-fit",children:(0,l.jsx)(C,{})})}function F(){let{isViewingBuckets:e,activeExplorerMode:s}=(0,d.b)();return"directory"===s||e?(0,l.jsx)(b,{}):(0,l.jsx)(S,{})}},31925:function(e,s,t){t.d(s,{u:function(){return a}});var l=t(16211),i=t(95810),n=t(28924),r=t(69367);function a(){let{isViewingABucket:e}=(0,i.b)(),s=(0,l.n)(),t=(0,n.F)(),a=(0,r.F)();return e&&!t.active&&!a.active&&s.isSynced}}}]);