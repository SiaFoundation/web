(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[490],{57344:function(a,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/config",function(){return e(35582)}])},35582:function(a,t,e){"use strict";e.r(t),e.d(t,{default:function(){return x}});var r=e(52322),i=e(39140),s=e(2784),n=e(15755),o=e(74881),c=e(99484),d=e(67465),l=e(73621),u=e(20508),g=e(85246),f=e(63955),p=e(48240),m=e(2288),y=e(40121);let w="v0-config-display-options";function h(){let{openDialog:a}=(0,c.Rh)(),t=(0,y.a)({config:{swr:{revalidateOnFocus:!1,errorRetryCount:0}}}),e=(0,l.yu)({config:{swr:{revalidateOnFocus:!1,errorRetryCount:0}},params:{key:w}}),h=(0,l.yu)({config:{swr:{revalidateOnFocus:!1}},params:{key:"gouging"}}),x=(0,l.yu)({config:{swr:{revalidateOnFocus:!1}},params:{key:"redundancy"}}),k=(0,l.yu)({config:{swr:{revalidateOnFocus:!1}},params:{key:"uploadpacking"}}),v=(0,l.KJ)(),O=(0,p.BF)({config:{swr:{revalidateOnFocus:!1}}}),_=(0,f.cI)({mode:"all",defaultValues:u.Pg}),j=(0,s.useCallback)((a,t,e,r,i)=>{_.reset((0,g.IP)(a,t,e,r,i))},[_]),[S,E]=(0,s.useState)(!1);(0,s.useEffect)(()=>{h.data&&x.data&&k.data&&(t.data||t.error)&&(e.data||e.error)&&!S&&(j(t.data,k.data,h.data,x.data,e.data),E(!0))},[t.data,t.error,k.data,h.data,x.data,e.data,e.error]);let b=(0,s.useCallback)(async()=>{let a=await t.mutate(),r=await h.mutate(),s=await x.mutate(),n=await k.mutate(),o=await e.mutate();r&&s?j(a,n,r,s,o):(0,i.OHV)("Error fetching settings.")},[t,h,k,x,e,j]),C=_.watch("minShards"),R=_.watch("totalShards"),N=_.watch("includeRedundancyMaxStoragePrice"),F=_.watch("includeRedundancyMaxUploadPrice"),P=(0,s.useMemo)(()=>{let a=(0,g.aU)(C,R);return O.data?(0,u.VN)({redundancyMultiplier:a,includeRedundancyMaxStoragePrice:N,includeRedundancyMaxUploadPrice:F,storageAverage:(0,m.ll)(O.data.settings.storage_price).times((0,i.S5V)(1)).times((0,i.xf5)(1)).times((0,g.Si)(C,R,N)),uploadAverage:(0,m.ll)(O.data.settings.upload_price).times((0,i.xf5)(1)).times((0,g.Si)(C,R,F)),downloadAverage:(0,m.ll)(O.data.settings.download_price).times((0,i.xf5)(1)),contractAverage:(0,m.ll)(O.data.settings.contract_price)}):(0,u.VN)({redundancyMultiplier:a,includeRedundancyMaxStoragePrice:N,includeRedundancyMaxUploadPrice:F})},[O.data,C,R,N,F]),V=(0,s.useCallback)(async a=>{if(h.data&&x.data)try{let r=await v.put({params:{key:"contractset"},payload:(0,g.y4)(a,t.data)}),s=await v.put({params:{key:"uploadpacking"},payload:(0,g.Il)(a,k.data)}),n=await v.put({params:{key:"gouging"},payload:(0,g.MN)(a,h.data)}),o=await v.put({params:{key:"redundancy"},payload:(0,g.Y$)(a,x.data)}),c=await v.put({params:{key:w},payload:(0,g.yz)(a,e.data)});if(r.error)throw Error(r.error);if(s.error)throw Error(s.error);if(n.error)throw Error(n.error);if(o.error)throw Error(o.error);if(c.error)throw Error(c.error);(0,i.OPV)("Configuration has been saved."),b()}catch(d){(0,i.OHV)(d.message),console.log(d)}},[v,t,k,x,h,e,b]),M=(0,i.WsO)(P),z=(0,s.useMemo)(()=>_.handleSubmit(V,M),[_,V,M]),A=Object.entries(_.formState.dirtyFields).filter(a=>{let[t,e]=a;return!!e}).length;return(0,r.jsx)(d.J,{title:"Configuration",routes:o._,sidenav:(0,r.jsx)(n.e,{}),actions:(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[!!A&&(0,r.jsx)(i.xvT,{size:"12",color:"subtle",children:1===A?"1 change":"".concat(A," changes")}),(0,r.jsx)(i.zxk,{tip:"Reset all changes",icon:"contrast",disabled:!A,onClick:b,children:(0,r.jsx)(i.Wet,{})}),(0,r.jsxs)(i.zxk,{tip:"Save all changes",variant:"accent",disabled:!_.formState.isDirty||_.formState.isSubmitting,onClick:z,children:[(0,r.jsx)(i.ZEk,{}),"Save changes"]})]}),openSettings:()=>a("settings"),children:(0,r.jsxs)("div",{className:"p-6 flex flex-col gap-16 max-w-screen-xl",children:[(0,r.jsx)(i.vRO,{title:"Contracts",category:"contractset",fields:P,form:_}),(0,r.jsx)(i.vRO,{title:"Uploads",category:"uploadpacking",fields:P,form:_}),(0,r.jsx)(i.vRO,{title:"Gouging",category:"gouging",fields:P,form:_}),(0,r.jsx)(i.vRO,{title:"Redundancy",category:"redundancy",fields:P,form:_})]})})}function x(){return(0,r.jsx)(h,{})}}},function(a){a.O(0,[189,774,888,179],function(){return a(a.s=57344)}),_N_E=a.O()}]);