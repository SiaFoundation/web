"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[189],{20508:function(e,i,t){t.d(i,{Lo:function(){return c},Pg:function(){return s},Uy:function(){return l},VN:function(){return u},jG:function(){return d}});var n=t(52322),a=t(39140),r=t(6391),o=t.n(r);t(2784);let c=6,d={contractSet:""},l={includeRedundancyMaxStoragePrice:!0,includeRedundancyMaxUploadPrice:!0},s={...d,maxRpcPrice:void 0,maxStoragePrice:void 0,maxContractPrice:void 0,maxDownloadPrice:void 0,maxUploadPrice:void 0,minMaxCollateral:void 0,hostBlockHeightLeeway:void 0,minPriceTableValidity:void 0,minAccountExpiry:void 0,minMaxEphemeralAccountBalance:void 0,minShards:void 0,totalShards:void 0,...l};function u(e){let{redundancyMultiplier:i,includeRedundancyMaxStoragePrice:t,includeRedundancyMaxUploadPrice:r,storageAverage:d,uploadAverage:l,downloadAverage:s,contractAverage:u}=e;return{contractSet:{category:"contractset",type:"text",title:"Default contract set",placeholder:"autopilot",suggestion:"autopilot",suggestionTip:(0,n.jsx)(n.Fragment,{children:"Autopilot users will typically want to keep this the same as the autopilot contract set."}),description:(0,n.jsx)(n.Fragment,{children:"The default contract set is where data is uploaded to by default."}),validation:{required:"required"}},maxStoragePrice:{category:"gouging",type:"siacoin",title:"Max storage price",description:(0,n.jsx)(n.Fragment,{children:"The max allowed price to store 1 TB per month."}),units:"SC/TB/month",average:d,averageTip:m(t,i),after:function(e){let{form:r,fields:o}=e;return(0,n.jsx)(a.ua7,{align:"start",side:"bottom",content:x(t,i),children:(0,n.jsx)("div",{children:(0,n.jsx)(a.QBj,{size:"small",form:r,fields:o,name:"includeRedundancyMaxStoragePrice",group:!1,children:(0,n.jsxs)(a.xvT,{size:"12",weight:"medium",children:["Including ",i.toFixed(1),"x redundancy"]})})})})},decimalsLimitSc:c,validation:{required:"required"}},maxUploadPrice:{category:"gouging",type:"siacoin",title:"Max upload price",description:(0,n.jsx)(n.Fragment,{children:"The max allowed price to upload 1 TB."}),units:"SC/TB/month",average:l,averageTip:m(r,i),after:function(e){let{form:t,fields:o}=e;return(0,n.jsx)(a.ua7,{align:"start",side:"bottom",content:x(r,i),children:(0,n.jsx)("div",{children:(0,n.jsx)(a.QBj,{size:"small",form:t,fields:o,name:"includeRedundancyMaxUploadPrice",group:!1,children:(0,n.jsxs)(a.xvT,{size:"12",weight:"medium",children:["Including ",i.toFixed(1),"x redundancy"]})})})})},decimalsLimitSc:c,validation:{required:"required"}},maxDownloadPrice:{category:"gouging",type:"siacoin",title:"Max download price",description:(0,n.jsx)(n.Fragment,{children:"The max allowed price to download 1 TB."}),units:"SC/TB/month",average:s,averageTip:"Averages provided by Sia Central.",decimalsLimitSc:c,validation:{required:"required"}},maxContractPrice:{category:"gouging",type:"siacoin",title:"Max contract price",description:(0,n.jsx)(n.Fragment,{children:"The max allowed price to form a contract."}),average:u,decimalsLimitSc:c,tipsDecimalsLimitSc:3,validation:{required:"required"}},maxRpcPrice:{category:"gouging",type:"siacoin",title:"Max RPC price",description:(0,n.jsx)(n.Fragment,{children:"The max allowed base price for RPCs in siacoins per million calls."}),units:"SC/million",decimalsLimitSc:c,validation:{required:"required"}},minMaxCollateral:{category:"gouging",type:"siacoin",title:"Min max collateral",description:(0,n.jsx)(n.Fragment,{children:"The min value for max collateral in the host's price settings."}),decimalsLimitSc:c,validation:{required:"required"}},hostBlockHeightLeeway:{category:"gouging",type:"number",title:"Block height leeway",description:(0,n.jsx)(n.Fragment,{children:"The amount of blocks of leeway given to the host block height in the host's price table."}),units:"blocks",decimalsLimit:0,suggestion:new(o())(6),suggestionTip:"The recommended value is 6 blocks.",validation:{required:"required",validate:{min:e=>new(o())(e).gte(3)||"must be at least 3 blocks"}}},minPriceTableValidity:{category:"gouging",type:"number",title:"Min price table validity",units:"minutes",description:(0,n.jsx)(n.Fragment,{children:"The min accepted value for `Validity` in the host's price settings."}),validation:{required:"required",validate:{min:e=>new(o())(e).gte((0,a.GXN)(10))||"must be at least 10 seconds"}}},minAccountExpiry:{category:"gouging",type:"number",title:"Min account expiry",units:"days",description:(0,n.jsx)(n.Fragment,{children:"The min accepted value for `AccountExpiry` in the host's price settings."}),validation:{required:"required",validate:{min:e=>new(o())(e).gte((0,a.XAn)(1))||"must be at least 1 hour"}}},minMaxEphemeralAccountBalance:{category:"gouging",type:"siacoin",title:"Min max ephemeral account balance",description:(0,n.jsx)(n.Fragment,{children:"The min accepted value for `MaxEphemeralAccountBalance` in the host's price settings."}),decimalsLimitSc:c,validation:{required:"required",validate:{min:e=>new(o())(e).gte(1)||"must be at least 1 SC"}}},minShards:{type:"number",category:"redundancy",title:"Min shards",description:(0,n.jsx)(n.Fragment,{children:"The min amount of shards needed to reconstruct a slab."}),units:"shards",validation:{required:"required",validate:{min:e=>new(o())(e).gt(0)||"must be greater than 0"}},trigger:["totalShards"]},totalShards:{type:"number",category:"redundancy",title:"Total shards",description:(0,n.jsx)(n.Fragment,{children:"The total amount of shards for each slab."}),units:"shards",validation:{required:"required",validate:{gteMinShards:(e,i)=>new(o())(e).gte(i.minShards)||"must be at least equal to min shards",max:e=>new(o())(e).lt(256)||"must be less than 256"}}},includeRedundancyMaxStoragePrice:{type:"boolean",title:"Include redundancy",validation:{}},includeRedundancyMaxUploadPrice:{type:"boolean",title:"Include redundancy",validation:{}}}}function m(e,i){return e?"The average price is adjusted for ".concat(i.toFixed(1),"x redundancy. Averages provided by Sia Central."):"The average price is not adjusted for redundancy. Averages provided by Sia Central."}function x(e,i){return e?(0,n.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,n.jsxs)(a.xvT,{color:"subtle",children:["Specified max price includes the cost of"," ",i.toFixed(1),"x redundancy."]}),(0,n.jsxs)(a.xvT,{color:"subtle",children:["Redundancy is calculated from the ratio of data shards:"," ",(0,n.jsx)(a.EKh,{children:"min shards / total shards"}),"."]})]}):"Specified max price does not include redundancy."}},85246:function(e,i,t){t.d(i,{IP:function(){return m},MN:function(){return l},Si:function(){return h},Y$:function(){return s},aU:function(){return x},y4:function(){return d},yz:function(){return u}});var n=t(39140),a=t(2288),r=t(6391),o=t.n(r),c=t(20508);function d(e,i){return{...i,default:e.contractSet}}function l(e,i){return{...i,maxRPCPrice:(0,a.qN)(e.maxRpcPrice.div(1e6)).toString(),maxStoragePrice:(0,a.qN)(e.maxStoragePrice.div((0,n.S5V)(1)).div((0,n.xf5)(1)).div(h(e.minShards,e.totalShards,e.includeRedundancyMaxStoragePrice))).toString(),maxUploadPrice:(0,a.qN)(e.maxUploadPrice.div(h(e.minShards,e.totalShards,e.includeRedundancyMaxUploadPrice))).toString(),maxDownloadPrice:(0,a.qN)(e.maxDownloadPrice).toString(),maxContractPrice:(0,a.qN)(e.maxContractPrice).toString(),minMaxCollateral:(0,a.qN)(e.minMaxCollateral).toString(),hostBlockHeightLeeway:Math.round(e.hostBlockHeightLeeway.toNumber()),minPriceTableValidity:Math.round((0,n.ort)(e.minPriceTableValidity.toNumber())),minAccountExpiry:Math.round((0,n.k9c)(e.minAccountExpiry.toNumber())),minMaxEphemeralAccountBalance:(0,a.qN)(e.minMaxEphemeralAccountBalance).toString()}}function s(e,i){return{...i,minShards:e.minShards.toNumber(),totalShards:e.totalShards.toNumber()}}function u(e,i){return{...i,includeRedundancyMaxStoragePrice:e.includeRedundancyMaxStoragePrice,includeRedundancyMaxUploadPrice:e.includeRedundancyMaxUploadPrice}}function m(e,i,t,r){let d=r?{includeRedundancyMaxStoragePrice:r.includeRedundancyMaxStoragePrice,includeRedundancyMaxUploadPrice:r.includeRedundancyMaxUploadPrice}:c.Uy,l={minShards:new(o())(t.minShards),totalShards:new(o())(t.totalShards)};return{...e?{contractSet:e.default}:c.jG,maxStoragePrice:(0,a.ll)(new(o())(i.maxStoragePrice).times((0,n.S5V)(1)).times((0,n.xf5)(1)).times(h(l.minShards,l.totalShards,d.includeRedundancyMaxStoragePrice)),c.Lo),maxUploadPrice:(0,a.ll)(new(o())(i.maxUploadPrice).times(h(l.minShards,l.totalShards,d.includeRedundancyMaxUploadPrice)),c.Lo),maxDownloadPrice:(0,a.ll)(i.maxDownloadPrice,c.Lo),maxContractPrice:(0,a.ll)(i.maxContractPrice,c.Lo),maxRpcPrice:(0,a.ll)(i.maxRPCPrice,c.Lo).times(1e6),minMaxCollateral:(0,a.ll)(i.minMaxCollateral,c.Lo),hostBlockHeightLeeway:new(o())(i.hostBlockHeightLeeway),minPriceTableValidity:new(o())((0,n.AEA)(i.minPriceTableValidity)),minAccountExpiry:new(o())((0,n.okB)(i.minAccountExpiry)),minMaxEphemeralAccountBalance:(0,a.ll)(i.minMaxEphemeralAccountBalance,c.Lo),...l,...d}}function x(e,i){let t=new(o())(1),n=e&&i&&!e.isZero()&&!i.isZero()&&i.gte(e);return n&&(t=i.div(e)),t}function h(e,i,t){let n=x(e,i);return t?n:new(o())(1)}},67465:function(e,i,t){t.d(i,{J:function(){return x}});var n=t(52322),a=t(39140),r=t(73621),o=t(6391),c=t.n(o),d=t(74881),l=t(41491),s=t(99484);function u(){var e,i,t;let{openDialog:o}=(0,s.Rh)(),c=(0,r.gM)({config:{swr:{revalidateOnFocus:!1}}}),d=(0,r.Tu)({config:{swr:{revalidateOnFocus:!1}}}),u=(0,r.cQ)(),m=(0,l.n)();return(0,n.jsxs)(a.HfT,{name:"renterd",peerCount:null===(e=u.data)||void 0===e?void 0:e.length,connectPeer:()=>o("connectPeer"),isSynced:m.isSynced,syncPercent:m.syncPercent,nodeBlockHeight:m.nodeBlockHeight,estimatedBlockHeight:m.estimatedBlockHeight,firstTimeSyncing:m.firstTimeSyncing,moreThan100BlocksToSync:m.moreThan100BlocksToSync,children:[(0,n.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,n.jsx)(a.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Wallet address"}),(0,n.jsx)(a.XxW,{className:"overflow-hidden",size:"14",maxLength:50,value:null===(i=d.data)||void 0===i?void 0:i.address,type:"address"})]}),(0,n.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,n.jsx)(a.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Network"}),(0,n.jsx)(a.xvT,{size:"14",children:null===(t=c.data)||void 0===t?void 0:t.Name})]})]})}function m(){let e=(0,r.gM)({config:{swr:{revalidateOnFocus:!1}}});if(!e.data||"mainnet"===e.data.Name)return null;let i="zen"===e.data.Name?"Zen Testnet":e.data.Name;return(0,n.jsx)(a.t6k,{testnetName:i})}function x(e){let i=(0,r.Tu)(),{isSynced:t}=(0,l.n)();return(0,n.jsx)(a.tU3,{appName:"renterd",profile:(0,n.jsx)(u,{}),banner:(0,n.jsx)(m,{}),connectivityRoute:d.h,isSynced:t,walletBalance:i.data?new(c())(i.data.confirmed):void 0,...e})}},15755:function(e,i,t){t.d(i,{e:function(){return s}});var n=t(52322),a=t(39140),r=t(73621),o=t(44905),c=t(74881),d=t(36091),l=t(99484);function s(){var e,i;let{autopilot:t}=(0,d.q)(),s=(0,r.Z7)(),{openDialog:u}=(0,l.Rh)(),m=!(null===(e=s.data)||void 0===e?void 0:e.find(e=>"info"!==e.severity)),x=(null===(i=s.data)||void 0===i?void 0:i.length)||0;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.KJW,{title:"Files",route:c._.files.index,children:(0,n.jsx)(a.ROc,{})}),"on"===t.state&&(0,n.jsx)(a.KJW,{title:"Autopilot",route:c._.autopilot.index,children:(0,n.jsx)(a.aFQ,{})}),(0,n.jsx)(a.KJW,{title:"Configuration",route:c._.config.index,children:(0,n.jsx)(a.wWN,{})}),(0,n.jsx)(a.KJW,{title:"Contracts",route:c._.contracts.index,children:(0,n.jsx)(a.VBo,{})}),(0,n.jsx)(a.KJW,{title:"Hosts",route:c._.hosts.index,children:(0,n.jsx)(a.VHe,{})}),(0,n.jsxs)("div",{className:"relative",children:[!!x&&m&&(0,n.jsx)("div",{className:(0,o.cx)("absolute -right-[2px] top-px w-1 h-1","rounded-full","bg-gray-1000 dark:bg-white","pointer-events-none")}),!!x&&!m&&(0,n.jsx)(a.xvT,{size:"10",className:(0,o.cx)("absolute -right-[9px] -top-1 py-px px-[5px]","text-white","bg-red-500 dark:bg-red-500 rounded","pointer-events-none"),color:"none",children:x.toLocaleString()}),(0,n.jsx)(a.KJW,{title:"Alerts",onClick:()=>u("alerts"),children:(0,n.jsx)(a.Dkj,{})})]})]})}},40121:function(e,i,t){t.d(i,{a:function(){return a}});var n=t(73621);function a(e){return(0,n.yu)({...e,params:{key:"contractset"}})}},41491:function(e,i,t){t.d(i,{n:function(){return r}});var n=t(48240),a=t(73621);function r(){var e,i,t,r;let{isUnlocked:o}=(0,n.Hv)(),c=(0,a.DQ)({config:{swr:{refreshInterval:e=>(null==e?void 0:e.synced)?6e4:1e4}}}),d=(0,a.nH)(),l=c.data?null===(e=c.data)||void 0===e?void 0:e.blockHeight:0,s=(0,a.Tu)({config:{swr:{refreshInterval:e=>(null==e?void 0:e.scanHeight)>=l?6e4:1e4}}}),u=o&&l&&d?Number((100*Math.min(l/d,1)).toFixed(1)):0,m=o&&l&&s.data?Number((100*Math.min(s.data.scanHeight/d,1)).toFixed(1)):0;return{isSynced:null===(i=c.data)||void 0===i?void 0:i.synced,isWalletSynced:(null===(t=c.data)||void 0===t?void 0:t.synced)&&(null===(r=s.data)||void 0===r?void 0:r.scanHeight)>=l-1,nodeBlockHeight:l,estimatedBlockHeight:d,syncPercent:u,walletScanPercent:m,moreThan100BlocksToSync:!!l&&!!d&&d-l>100,firstTimeSyncing:!!l&&!!d&&d-l>5e4}}}}]);