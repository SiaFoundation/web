(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[490],{57344:function(a,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/config",function(){return e(5391)}])},95572:function(a,t,e){"use strict";e.d(t,{w:function(){return n}});var r=e(73621);function n(a){return(0,r.yu)({...a,params:{key:"redundancy"}})}},5391:function(a,t,e){"use strict";e.r(t),e.d(t,{default:function(){return v}});var r=e(52322),n=e(24928),i=e(2784),s=e(15755),o=e(74881),c=e(14404),d=e(67465),l=e(73621),u=e(20508),g=e(85246),f=e(63955),p=e(41755),m=e(2288),y=e(40121),w=e(95572);let h="v0-config-display-options";function x(){let{openDialog:a}=(0,c.Rh)(),t=(0,y.a)({config:{swr:{revalidateOnFocus:!1,errorRetryCount:0}}}),e=(0,l.yu)({config:{swr:{revalidateOnFocus:!1,errorRetryCount:0}},params:{key:h}}),x=(0,l.yu)({config:{swr:{revalidateOnFocus:!1}},params:{key:"gouging"}}),v=(0,w.w)({config:{swr:{revalidateOnFocus:!1}}}),k=(0,l.yu)({config:{swr:{revalidateOnFocus:!1}},params:{key:"uploadpacking"}}),O=(0,l.KJ)(),_=(0,p.BF)({config:{swr:{revalidateOnFocus:!1}}}),j=(0,f.cI)({mode:"all",defaultValues:u.Pg}),S=(0,i.useCallback)((a,t,e,r,n)=>{j.reset((0,g.IP)(a,t,e,r,n))},[j]),[E,b]=(0,i.useState)(!1);(0,i.useEffect)(()=>{x.data&&v.data&&k.data&&(t.data||t.error)&&(e.data||e.error)&&!E&&(S(t.data,k.data,x.data,v.data,e.data),b(!0))},[t.data,t.error,k.data,x.data,v.data,e.data,e.error]);let C=(0,i.useCallback)(async()=>{let a=await t.mutate(),r=await x.mutate(),i=await v.mutate(),s=await k.mutate(),o=await e.mutate();r&&i?S(a,s,r,i,o):(0,n.OHV)("Error fetching settings.")},[t,x,k,v,e,S]),R=j.watch("minShards"),N=j.watch("totalShards"),F=j.watch("includeRedundancyMaxStoragePrice"),P=j.watch("includeRedundancyMaxUploadPrice"),V=(0,i.useMemo)(()=>{let a=(0,g.aU)(R,N);return _.data?(0,u.VN)({redundancyMultiplier:a,includeRedundancyMaxStoragePrice:F,includeRedundancyMaxUploadPrice:P,storageAverage:(0,m.ll)(_.data.settings.storage_price).times((0,n.S5V)(1)).times((0,n.xf5)(1)).times((0,g.Si)(R,N,F)),uploadAverage:(0,m.ll)(_.data.settings.upload_price).times((0,n.xf5)(1)).times((0,g.Si)(R,N,P)),downloadAverage:(0,m.ll)(_.data.settings.download_price).times((0,n.xf5)(1)),contractAverage:(0,m.ll)(_.data.settings.contract_price)}):(0,u.VN)({redundancyMultiplier:a,includeRedundancyMaxStoragePrice:F,includeRedundancyMaxUploadPrice:P})},[_.data,R,N,F,P]),M=(0,i.useCallback)(async a=>{if(x.data&&v.data)try{let r=await O.put({params:{key:"contractset"},payload:(0,g.y4)(a,t.data)}),i=await O.put({params:{key:"uploadpacking"},payload:(0,g.Il)(a,k.data)}),s=await O.put({params:{key:"gouging"},payload:(0,g.MN)(a,x.data)}),o=await O.put({params:{key:"redundancy"},payload:(0,g.Y$)(a,v.data)}),c=await O.put({params:{key:h},payload:(0,g.yz)(a,e.data)});if(r.error)throw Error(r.error);if(i.error)throw Error(i.error);if(s.error)throw Error(s.error);if(o.error)throw Error(o.error);if(c.error)throw Error(c.error);(0,n.OPV)("Configuration has been saved."),C()}catch(d){(0,n.OHV)(d.message),console.log(d)}},[O,t,k,v,x,e,C]),z=(0,n.WsO)(V),A=(0,i.useMemo)(()=>j.handleSubmit(M,z),[j,M,z]),I=Object.entries(j.formState.dirtyFields).filter(a=>{let[t,e]=a;return!!e}).length;return(0,r.jsx)(d.J,{title:"Configuration",routes:o._,sidenav:(0,r.jsx)(s.e,{}),actions:(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[!!I&&(0,r.jsx)(n.xvT,{size:"12",color:"subtle",children:1===I?"1 change":"".concat(I," changes")}),(0,r.jsx)(n.zxk,{tip:"Reset all changes",icon:"contrast",disabled:!I,onClick:C,children:(0,r.jsx)(n.Wet,{})}),(0,r.jsxs)(n.zxk,{tip:"Save all changes",variant:"accent",disabled:!j.formState.isDirty||j.formState.isSubmitting,onClick:A,children:[(0,r.jsx)(n.ZEk,{}),"Save changes"]})]}),openSettings:()=>a("settings"),children:(0,r.jsxs)("div",{className:"p-6 flex flex-col gap-16 max-w-screen-xl",children:[(0,r.jsx)(n.vRO,{title:"Contracts",category:"contractset",fields:V,form:j}),(0,r.jsx)(n.vRO,{title:"Uploads",category:"uploadpacking",fields:V,form:j}),(0,r.jsx)(n.vRO,{title:"Gouging",category:"gouging",fields:V,form:j}),(0,r.jsx)(n.vRO,{title:"Redundancy",category:"redundancy",fields:V,form:j})]})})}function v(){return(0,r.jsx)(x,{})}}},function(a){a.O(0,[189,774,888,179],function(){return a(a.s=57344)}),_N_E=a.O()}]);