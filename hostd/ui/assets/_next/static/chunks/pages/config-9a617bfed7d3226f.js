(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[490],{57344:function(e,i,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/config",function(){return t(69127)}])},92522:function(e,i,t){"use strict";t.d(i,{q:function(){return m}});var r=t(52322),n=t(2597),s=t(13369),a=t(6391),o=t.n(a),d=t(74881),c=t(41491),l=t(7534);function u(){var e,i,t,a,o,d,u;let{openDialog:m}=(0,l.Rh)(),v=(0,s.On)({config:{swr:{revalidateOnFocus:!1}}}),h=(0,s.rV)({config:{swr:{revalidateOnFocus:!1}}}),p=(0,c.n)(),g=(0,s.cQ)(),x=null===(e=v.data)||void 0===e?void 0:e.version,f=(null==x?void 0:x.match(/^v\d+\.\d+\.\d+/))?"https://github.com/SiaFoundation/hostd/releases/".concat(x):"https://github.com/SiaFoundation/hostd/tree/".concat(x);return(0,r.jsxs)(n.HfT,{name:"hostd",peerCount:null===(i=g.data)||void 0===i?void 0:i.length,connectPeer:()=>m("connectPeer"),isSynced:p.isSynced,percent:p.percent,nodeBlockHeight:p.nodeBlockHeight,estimatedBlockHeight:p.estimatedBlockHeight,firstTimeSyncing:p.firstTimeSyncing,moreThan100BlocksToSync:p.moreThan100BlocksToSync,children:[(0,r.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,r.jsx)(n.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Net address"}),(0,r.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden",children:(0,r.jsx)(n.xS1,{className:"overflow-hidden",size:"14",value:null===(t=h.data)||void 0===t?void 0:t.netAddress,maxLength:50,label:"network address"})})]}),(0,r.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,r.jsx)(n.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Public key"}),(0,r.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden",children:(0,r.jsx)(n.xS1,{className:"overflow-hidden",size:"14",value:null===(a=v.data)||void 0===a?void 0:a.publicKey,maxLength:50,label:"public key"})})]}),(0,r.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,r.jsx)(n.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Wallet address"}),(0,r.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden",children:(0,r.jsx)(n.xS1,{className:"overflow-hidden",size:"14",maxLength:50,value:null===(o=v.data)||void 0===o?void 0:o.walletAddress,type:"address"})})]}),(0,r.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,r.jsx)(n.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Network"}),(0,r.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden",children:(0,r.jsx)(n.xvT,{size:"14",children:null===(d=v.data)||void 0===d?void 0:d.network})})]}),(0,r.jsxs)("div",{className:"flex gap-4 justify-between items-center",children:[(0,r.jsx)(n.__J,{size:"14",color:"subtle",noWrap:!0,className:"w-[100px]",children:"Version"}),(0,r.jsx)("div",{className:"flex-1 flex justify-end overflow-hidden",children:(0,r.jsx)(n.rUS,{size:"14",href:f,target:"_blank",children:null===(u=v.data)||void 0===u?void 0:u.version})})]})]})}function m(e){let i=(0,s.Os)(),{isSynced:t}=(0,c.n)();return(0,r.jsx)(n.tU3,{appName:"hostd",connectivityRoute:d.h,profile:(0,r.jsx)(u,{}),isSynced:t,walletBalance:i.data?new(o())(i.data.spendable).plus(i.data.unconfirmed):void 0,...e})}},39031:function(e,i,t){"use strict";t.d(i,{N:function(){return a}});var r=t(52322),n=t(2597),s=t(74881);function a(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.KJW,{title:"Dashboard",route:s._.home,children:(0,r.jsx)(n.K2o,{})}),(0,r.jsx)(n.KJW,{title:"Volumes",route:s._.volumes.index,children:(0,r.jsx)(n.zvn,{})}),(0,r.jsx)(n.KJW,{title:"Contracts",route:s._.contracts.index,children:(0,r.jsx)(n.VBo,{})}),(0,r.jsx)(n.KJW,{title:"Configuration",route:s._.config.index,children:(0,r.jsx)(n.wWN,{})})]})}},41491:function(e,i,t){"use strict";t.d(i,{n:function(){return s}});var r=t(28031),n=t(13369);function s(){var e,i,t,s;let{isUnlocked:a}=(0,r.Hv)(),o=(0,n.d$)({config:{swr:{refreshInterval:e=>(null==e?void 0:e.synced)?6e4:1e4}}}),d=(0,n.Os)({config:{swr:{refreshInterval:e=>(null==e?void 0:e.scanHeight)>=l-5?6e4:1e4}}}),c=(0,n.nH)(),l=o.data?null===(e=o.data)||void 0===e?void 0:e.chainIndex.height:0,u=a&&l&&c?Number((100*Math.min(l/c,1)).toFixed(1)):0;return{isSynced:null===(i=o.data)||void 0===i?void 0:i.synced,isWalletSynced:(null===(t=o.data)||void 0===t?void 0:t.synced)&&(null===(s=d.data)||void 0===s?void 0:s.scanHeight)>=l-5,nodeBlockHeight:l,estimatedBlockHeight:c,percent:u,moreThan100BlocksToSync:!!l&&!!c&&c-l>100,firstTimeSyncing:!!l&&!!c&&c-l>5e4}}},69127:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return P}});var r=t(52322),n=t(2597),s=t(2784),a=t(39031),o=t(74881),d=t(7534),c=t(92522),l=t(13369),u=t(6391),m=t.n(u);let v=[{value:"",label:"Off"},{value:"route53",label:"Route 53"},{value:"noip",label:"No-IP"},{value:"duckdns",label:"Duck DNS"},{value:"cloudflare",label:"Cloudflare"}],h={acceptingContracts:!1,netAddress:"",maxContractDuration:void 0,contractPrice:void 0,baseRPCPrice:void 0,sectorAccessPrice:void 0,collateral:void 0,maxCollateral:void 0,storagePrice:void 0,egressPrice:void 0,ingressPrice:void 0,priceTableValidity:void 0,maxRegistryEntries:void 0,accountExpiry:void 0,maxAccountBalance:void 0,ingressLimit:void 0,egressLimit:void 0,dnsProvider:"",dnsIpv4:!1,dnsIpv6:!1,dnsDuckDnsToken:"",dnsNoIpEmail:"",dnsNoIpPassword:"",dnsAwsId:"",dnsAwsSecret:"",dnsAwsZoneId:"",dnsCloudflareToken:"",dnsCloudflareZoneId:""},p={acceptingContracts:{type:"boolean",category:"host",title:"Accepting contracts",description:(0,r.jsx)(r.Fragment,{children:"Whether or not the host is accepting contracts."}),validation:{required:"required"}},netAddress:{type:"text",category:"host",title:"Address",description:(0,r.jsx)(r.Fragment,{children:"The network address of the host."}),placeholder:"my.host.com:9882",validation:{required:"required"}},maxContractDuration:{type:"number",category:"host",title:"Maximum contract duration",units:"months",decimalsLimit:2,suggestion:new(m())(6),suggestionTip:"The default maximum duration is 6 months.",description:(0,r.jsx)(r.Fragment,{children:"The maximum contract duration that the host will accept."}),validation:{required:"required",validate:{min:e=>new(m())(e).gte((0,n.E6f)(4320))||"must be at least 1 month"}}},storagePrice:{title:"Storage price",type:"siacoin",category:"pricing",units:"SC/TB/month",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's storage price in siacoins per TB per month."}),validation:{required:"required"}},egressPrice:{title:"Egress price",type:"siacoin",category:"pricing",units:"SC/TB",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's egress price in siacoins per TB."}),validation:{required:"required"}},ingressPrice:{title:"Ingress price",type:"siacoin",category:"pricing",units:"SC/TB",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's ingress price in siacoins per TB."}),validation:{required:"required"}},collateral:{title:"Collateral",type:"siacoin",category:"pricing",units:"SC/month",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's target collateral in siacoins per month."}),validation:{required:"required"}},maxCollateral:{title:"Maximum collateral",type:"siacoin",category:"pricing",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's maximum collateral in siacoins."}),validation:{required:"required"}},contractPrice:{title:"Contract price",type:"siacoin",category:"pricing",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's contract price in siacoins."}),validation:{required:"required"}},baseRPCPrice:{title:"Base RPC price",type:"siacoin",category:"pricing",units:"SC/million",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's base RPC price in siacoins per million calls."}),validation:{required:"required"}},sectorAccessPrice:{title:"Sector access price",type:"siacoin",category:"pricing",units:"SC/million",decimalsLimitSc:6,description:(0,r.jsx)(r.Fragment,{children:"The host's sector access price in siacoins million sectors."}),validation:{required:"required"}},priceTableValidity:{title:"Price table validity",type:"number",category:"pricing",units:"minutes",description:(0,r.jsx)(r.Fragment,{children:"How long a renter's registered price table remains valid."}),validation:{required:"required"}},maxRegistryEntries:{title:"Maximum registry size",type:"number",category:"registry",units:"entries",decimalsLimit:0,description:(0,r.jsx)(r.Fragment,{children:"The maximum number of registry entries that the host will store. Each registry entry is up to 113 bytes."}),validation:{required:"required"}},accountExpiry:{title:"Expiry",type:"number",category:"RHP3",units:"days",description:(0,r.jsx)(r.Fragment,{children:"How long a renter's ephemeral accounts are inactive before the host prunes them and recovers the remaining funds."}),validation:{required:"required",validate:{min:e=>new(m())(e).gte(7)||"must be at least 1 week"}}},maxAccountBalance:{title:"Maximum balance",type:"siacoin",category:"RHP3",description:(0,r.jsx)(r.Fragment,{children:"Maximum balance a renter's ephemeral account can have. When the limit is reached, deposits are rejected until some of the funds have been spent."}),validation:{required:"required",validate:{min:e=>new(m())(e).gte(1)||"must be at least 1 SC"}}},ingressLimit:{title:"Ingress limit",type:"number",category:"bandwidth",units:"MB/second",description:(0,r.jsx)(r.Fragment,{children:"The maximum amount of ingress bandwidth traffic in MB per second."}),validation:{required:"required"}},egressLimit:{title:"Egress limit",type:"number",category:"bandwidth",units:"MB/second",description:(0,r.jsx)(r.Fragment,{children:"The maximum amount of egress bandwidth traffic in MB per second."}),validation:{required:"required"}},dnsProvider:{title:"Dynamic DNS Provider",type:"select",category:"DNS",options:v,description:(0,r.jsx)(r.Fragment,{children:"Enable dynamic DNS with one of the supported providers."}),validation:{validate:e=>!!v.find(i=>i.value===e)||"must be one of supported providers"}},dnsIpv4:{title:"IPv4",type:"boolean",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"Whether IPv4 is enabled."}),show:e=>!!e.dnsProvider,validation:{validate:(e,i)=>!i.dnsProvider||!!(e||i.dnsIpv6)||"at least one of IPv4 and IPv6 must be enabled"},trigger:["dnsIpv6"]},dnsIpv6:{type:"boolean",title:"IPv6",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"Whether IPv6 is enabled."}),show:e=>!!e.dnsProvider,validation:{validate:(e,i)=>!i.dnsProvider||!!(e||i.dnsIpv4)||"at least one of IPv4 and IPv6 must be enabled"},trigger:["dnsIpv4"]},dnsDuckDnsToken:{type:"text",title:"Token",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"DuckDNS token."}),show:e=>"duckdns"===e.dnsProvider,validation:{validate:(e,i)=>"duckdns"!==i.dnsProvider||!!e||"required"}},dnsNoIpEmail:{type:"text",title:"Email",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"No-IP email."}),show:e=>"noip"===e.dnsProvider,validation:{validate:(e,i)=>"noip"!==i.dnsProvider||!!e||"required"}},dnsNoIpPassword:{type:"text",title:"Password",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"No-IP password."}),show:e=>"noip"===e.dnsProvider,validation:{validate:(e,i)=>"noip"!==i.dnsProvider||!!e||"required"}},dnsAwsId:{type:"text",title:"ID",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"AWS Route53 ID."}),show:e=>"route53"===e.dnsProvider,validation:{validate:(e,i)=>"route53"!==i.dnsProvider||!!e||"required"}},dnsAwsSecret:{type:"secret",title:"Secret",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"AWS Route53 secret."}),show:e=>"route53"===e.dnsProvider,validation:{validate:(e,i)=>"route53"!==i.dnsProvider||!!e||"required"}},dnsAwsZoneId:{type:"text",title:"Zone ID",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"AWS Route53 zone ID."}),show:e=>"route53"===e.dnsProvider,validation:{validate:(e,i)=>"route53"!==i.dnsProvider||!!e||"required"}},dnsCloudflareToken:{type:"text",title:"Token",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"Cloudflare token."}),show:e=>"cloudflare"===e.dnsProvider,validation:{validate:(e,i)=>"cloudflare"!==i.dnsProvider||!!e||"required"}},dnsCloudflareZoneId:{type:"text",title:"Zone ID",category:"DNS",description:(0,r.jsx)(r.Fragment,{children:"Cloudflare zone ID."}),show:e=>"cloudflare"===e.dnsProvider,validation:{validate:(e,i)=>"cloudflare"!==i.dnsProvider||!!e||"required"}}};var g=t(2288),x=t(74476),f=t(63955);function y(){let{openConfirmDialog:e}=(0,d.Rh)(),i=(0,l.hV)(),t=(0,l.Az)(),a=(0,s.useCallback)(()=>e({title:"Announce",action:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.cfm,{}),"Announce"]}),variant:"accent",body:(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)(n.nvN,{size:"14",children:"Confirm to broadcast host announcement."}),i.data&&(0,r.jsxs)(n.nvN,{size:"14",children:["Announcing will cost ",(0,g.Vz)(i.data),"."]})]}),onConfirm:async()=>{let e=await t.post({});e.error&&(0,n.OHV)("Error announcing host."),(0,n.OPV)("Successfully broadcast host announcement.")}}),[e,t,i]);return(0,r.jsxs)(n.zxk,{variant:"accent",tip:"Announce host address",onClick:a,children:[(0,r.jsx)(n.cfm,{}),"Announce"]})}function j(){var e;let{openDialog:i}=(0,d.Rh)(),t=(0,l.rV)({config:{swr:{revalidateOnFocus:!1}}}),u=(0,l.Te)(),v=(0,l.uo)({disabled:!t.data||!t.data.ddns.provider,config:{swr:{revalidateOnFocus:!1,errorRetryCount:0}}}),j=(0,f.cI)({mode:"all",defaultValues:h}),P=(0,s.useCallback)(async e=>{if(t.data)try{var i;let r;let s=await u.patch({payload:(i=t.data,r=null,"duckdns"===e.dnsProvider&&(r={token:e.dnsDuckDnsToken}),"noip"===e.dnsProvider&&(r={email:e.dnsNoIpEmail,password:e.dnsNoIpPassword}),"route53"===e.dnsProvider&&(r={ID:e.dnsAwsId,secret:e.dnsAwsSecret,zoneID:e.dnsAwsZoneId}),"cloudflare"===e.dnsProvider&&(r={token:e.dnsCloudflareToken,zoneID:e.dnsCloudflareZoneId}),{...i,acceptingContracts:e.acceptingContracts,netAddress:e.netAddress,maxContractDuration:Number(e.maxContractDuration.times((0,n.S5V)(1)).toFixed(0)),contractPrice:(0,g.qN)(e.contractPrice).toString(),baseRPCPrice:e.baseRPCPrice.div((0,g.ll)((0,x.sS)(1))).toFixed(0),sectorAccessPrice:e.sectorAccessPrice.div((0,g.ll)((0,x.nS)(1))).toFixed(0),collateral:e.collateral.div((0,g.ll)((0,x.c5)(1))).toFixed(0),maxCollateral:(0,g.qN)(e.maxCollateral).toString(),storagePrice:e.storagePrice.div((0,g.ll)((0,x.SY)(1))).toFixed(0),egressPrice:e.egressPrice.div((0,g.ll)((0,x.B1)(1))).toFixed(0),ingressPrice:e.ingressPrice.div((0,g.ll)((0,x.dK)(1))).toFixed(0),priceTableValidity:Number(e.priceTableValidity.times(60).times(1e9).toFixed(0)),maxRegistryEntries:Number(e.maxRegistryEntries.toFixed(0)),accountExpiry:Number(e.accountExpiry.times(86400).times(1e9).toFixed(0)),maxAccountBalance:(0,g.qN)(e.maxAccountBalance).toString(),ingressLimit:Number((0,n.YaL)(e.ingressLimit).toFixed(0)),egressLimit:Number((0,n.YaL)(e.egressLimit).toFixed(0)),ddns:{...null==i?void 0:i.ddns,provider:e.dnsProvider,ipv4:e.dnsIpv4,ipv6:e.dnsIpv6,options:r}})});if(s.error)throw Error(s.error);j.formState.dirtyFields.netAddress?(0,n.OPV)("Settings have been saved. Address has changed, make sure to re-announce the host.",{duration:2e4}):(0,n.OPV)("Settings have been saved."),v.mutate()}catch(a){(0,n.OHV)(a.message),console.log(a)}},[j,t,u,v]),b=(0,n.WsO)(p),w=(0,s.useMemo)(()=>j.handleSubmit(P,b),[j,P,b]),S=Object.entries(j.formState.dirtyFields).filter(e=>{let[i,t]=e;return!!t}).length,N=(0,s.useCallback)(()=>{let e;if(!t.data)return;let i=t.data;j.reset((e=null,"duckdns"===i.ddns.provider&&(e={dnsDuckDnsToken:i.ddns.options.token}),"noip"===i.ddns.provider&&(e={dnsNoIpEmail:i.ddns.options.email,dnsNoIpPassword:i.ddns.options.password}),"route53"===i.ddns.provider&&(e={dnsAwsId:i.ddns.options.ID,dnsAwsSecret:i.ddns.options.secret,dnsAwsZoneId:i.ddns.options.zoneID}),"cloudflare"===i.ddns.provider&&(e={dnsCloudflareToken:i.ddns.options.token,dnsCloudflareZoneId:i.ddns.options.zoneID}),{acceptingContracts:i.acceptingContracts,netAddress:i.netAddress,maxContractDuration:new(m())(i.maxContractDuration).div((0,n.S5V)(1)),contractPrice:(0,g.ll)(i.contractPrice,6),baseRPCPrice:(0,g.ll)((0,x.sS)(i.baseRPCPrice),6),sectorAccessPrice:(0,g.ll)((0,x.nS)(i.sectorAccessPrice),6),collateral:(0,g.ll)((0,x.c5)(i.collateral),6),maxCollateral:(0,g.ll)(i.maxCollateral,6),storagePrice:(0,g.ll)((0,x.SY)(i.storagePrice),6),egressPrice:(0,g.ll)((0,x.B1)(i.egressPrice),6),ingressPrice:(0,g.ll)((0,x.dK)(i.ingressPrice),6),priceTableValidity:new(m())(i.priceTableValidity).div(1e9).div(60),maxRegistryEntries:new(m())(i.maxRegistryEntries),accountExpiry:new(m())(i.accountExpiry).div(1e9).div(86400),maxAccountBalance:(0,g.ll)(i.maxAccountBalance,6),ingressLimit:(0,n.BTR)(new(m())(i.ingressLimit)),egressLimit:(0,n.BTR)(new(m())(i.egressLimit)),dnsProvider:i.ddns.provider,dnsIpv4:i.ddns.ipv4,dnsIpv6:i.ddns.ipv6,...e}))},[j,t]),C=(0,s.useCallback)(async()=>{await t.mutate(),N(),await v.mutate()},[N,t,v]);return(0,s.useEffect)(()=>{N()},[t.data]),(0,r.jsx)(c.q,{title:"Configuration",routes:o._,sidenav:(0,r.jsx)(a.N,{}),stats:(null===(e=t.data)||void 0===e?void 0:e.ddns.provider)&&!v.isValidating?v.error?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.xvT,{color:"amber",children:(0,r.jsx)(n.qdM,{})}),(0,r.jsxs)(n.xvT,{size:"14",children:["Error with dynamic DNS configuration:"," ",v.error.message]})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.xvT,{color:"green",children:(0,r.jsx)(n.Y3p,{})}),(0,r.jsx)(n.xvT,{children:"Dynamic DNS enabled"})]}):null,actions:(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[!!S&&(0,r.jsx)(n.xvT,{size:"12",color:"subtle",children:1===S?"1 change":"".concat(S," changes")}),(0,r.jsx)(n.zxk,{tip:"Reset all changes",icon:"contrast",disabled:!S,onClick:C,children:(0,r.jsx)(n.Wet,{})}),(0,r.jsxs)(n.zxk,{tip:"Save all changes",variant:"accent",disabled:!j.formState.isDirty||j.formState.isSubmitting,onClick:w,children:[(0,r.jsx)(n.ZEk,{}),"Save changes"]}),(0,r.jsx)(y,{})]}),openSettings:()=>i("settings"),children:(0,r.jsxs)("div",{className:"p-6 flex flex-col gap-16 max-w-screen-xl",children:[(0,r.jsx)(n.vRO,{title:"Host",category:"host",fields:p,form:j}),(0,r.jsx)(n.vRO,{title:"Pricing",category:"pricing",fields:p,form:j}),(0,r.jsx)(n.vRO,{title:"DNS",category:"DNS",fields:p,form:j}),(0,r.jsx)(n.vRO,{title:"Bandwidth",category:"bandwidth",fields:p,form:j}),(0,r.jsx)(n.vRO,{title:"Registry",category:"registry",fields:p,form:j}),(0,r.jsx)(n.vRO,{title:"Accounts",category:"RHP3",fields:p,form:j})]})})}function P(){return(0,r.jsx)(j,{})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=57344)}),_N_E=e.O()}]);