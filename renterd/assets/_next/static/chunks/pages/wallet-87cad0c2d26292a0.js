(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[789],{69171:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/wallet",function(){return t(11495)}])},11495:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return N}});var s=t(52322),a=t(24502),l=t(88022),c=t(28420);function i(){return(0,s.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,s.jsx)(a.xvT,{children:(0,s.jsx)(c.Hb6,{className:"scale-[200%]"})}),(0,s.jsx)(a.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"No transactions matching filters."})]})}function r(){return(0,s.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,s.jsx)(a.xvT,{children:(0,s.jsx)(c.fDA,{className:"scale-[200%]"})}),(0,s.jsx)(a.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"The wallet has no transactions yet."})]})}function o(){return(0,s.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center h-[400px]",children:[(0,s.jsx)(a.xvT,{children:(0,s.jsx)(c.Ckx,{className:"scale-[200%]"})}),(0,s.jsx)(a.xvT,{color:"subtle",className:"text-center max-w-[500px]",children:"Error fetching transactions."})]})}function x(){let{balances:e,metrics:n,datasetPage:t,datasetState:c,visibleColumns:x,cellContext:d,sortableColumns:u,sortDirection:f,sortField:m,toggleSort:j,defaultPageSize:h}=(0,l.n)();return(0,s.jsxs)("div",{className:"flex flex-col gap-4 px-6 py-7 min-w-fit",children:[(null==e?void 0:e.length)?(0,s.jsx)(a.Z58,{chartType:"line",balances:e,isLoading:n.isValidating}):null,(0,s.jsx)(a.iA_,{testId:"eventsTable",isLoading:"loading"===c,emptyState:(0,s.jsx)(a.ubH,{datasetState:c,noneMatching:(0,s.jsx)(i,{}),noneYet:(0,s.jsx)(r,{}),error:(0,s.jsx)(o,{})}),pageSize:h,data:t,context:d,columns:x,sortableColumns:u,sortDirection:f,sortField:m,toggleSort:j})]})}var d=t(96250),u=t(82285),f=t(4300),m=t(6391),j=t.n(m),h=t(70825),p=t(94763),g=t(16211);function w(){let{isSynced:e,syncPercent:n,isWalletSynced:t,walletScanPercent:c}=(0,g.n)(),{offset:i,limit:r,datasetPageTotal:o,datasetState:x}=(0,l.n)();return(0,s.jsxs)("div",{className:"flex gap-2 w-full",children:[(0,s.jsx)(a.DmW,{isSynced:e,isWalletSynced:t,syncPercent:n,walletScanPercent:c}),(0,s.jsx)("div",{className:"flex-1"}),(0,s.jsx)(a.wFK,{offset:i,limit:r,pageTotal:o,isLoading:"loading"===x})]})}let v=p.J;function N(){return(0,s.jsx)(x,{})}N.Layout=v,N.useLayoutProps=function(){let{openDialog:e}=(0,u.Rh)(),n=(0,d.X2)(),{isSynced:t,isWalletSynced:l,syncPercent:c,walletScanPercent:i}=(0,g.n)();return{title:"Wallet",routes:f._,sidenav:(0,s.jsx)(h.e,{}),openSettings:()=>e("settings"),actions:(0,s.jsx)(a.QUh,{isSynced:t,isWalletSynced:l,syncPercent:c,walletScanPercent:i,balanceSc:n.data?{spendable:new(j())(n.data.spendable),unconfirmed:new(j())(n.data.unconfirmed),confirmed:new(j())(n.data.confirmed),immature:new(j())(n.data.immature)}:void 0,receiveSiacoin:()=>e("addressDetails"),sendSiacoin:()=>e("sendSiacoin")}),stats:(0,s.jsx)(w,{})}}}},function(e){e.O(0,[191,888,774,179],function(){return e(e.s=69171)}),_N_E=e.O()}]);