(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{99178:function(e,r,n){Promise.resolve().then(n.bind(n,99504))},99504:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return Home}});var t=n(757);n(91702);var o=n(27726),i=n(52116),l=n(99691),a=n(83978),s=n.n(a);n(7866);var d=n(55528),c=n(10126),u=n(29330),h=n(11180);function _getPrimaryKeyValue(e,r){let n={};for(let t of r)n[t]=e[t];return JSON.stringify(n)}function DataFrameColumnGroupHeader(e){let{name:r,primaryKeys:n,onPrimaryKeyChange:o}=e;return"index"===r?(0,t.jsx)(t.Fragment,{}):n.includes(r)?(0,t.jsxs)(d.k,{alignItems:"center",children:[(0,t.jsx)(c.xu,{flex:1,children:r}),(0,t.jsx)(u.J,{cursor:"pointer",as:h.ven,onClick:()=>{let e=n.filter(e=>e!==r);o&&o(e)}})]}):(0,t.jsxs)(d.k,{alignItems:"center",children:[(0,t.jsx)(c.xu,{flex:1,children:r}),(0,t.jsx)(u.J,{cursor:"pointer",as:h.MhP,onClick:()=>{let e=[...n.filter(e=>"index"!==e),r];o&&o(e)}})]})}function toDataGrid(e,r){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=arguments.length>3?arguments[3]:void 0,l={schema:{fields:[],primaryKey:[]},data:[]};if(!e&&r)e=l,0===n.length&&(n=r.schema.primaryKey);else if(!r&&e)r=l,0===n.length&&(n=e.schema.primaryKey);else{if(!e||!r)return{rows:[],columns:[]};if(!s().isEqual(e.schema.primaryKey,r.schema.primaryKey))throw Error("primary key mismatch! ".concat(e.schema.primaryKey," != ").concat(r.schema.primaryKey));0===n.length&&(n=e.schema.primaryKey)}let a=[],d=[],c={},u={};r.schema.fields.forEach(e=>{c[e.name]={},c[e.name].current=e}),e.schema.fields.forEach(e=>{c[e.name]||(c[e.name]={}),c[e.name].base=e}),Object.entries(c).forEach(e=>{let[r,{base:l,current:c}]=e;if(n.includes(r))d.push({key:"".concat(r),name:(0,t.jsx)(DataFrameColumnGroupHeader,{name:r,primaryKeys:n,onPrimaryKeyChange:o}),frozen:!0});else{if("index"===r)return;let cellClass=e=>{if(!s().isEqual(e["base__".concat(r)],e["current__".concat(r)]))return"diff-cell"};a.push({name:(0,t.jsx)(DataFrameColumnGroupHeader,{name:r,primaryKeys:n,onPrimaryKeyChange:o}),children:[{key:"base__".concat(r),name:"Base",renderEditCell:i.Ug,cellClass},{key:"current__".concat(r),name:"Current",renderEditCell:i.Ug,cellClass}]})}}),r.data.forEach(e=>{let r=_getPrimaryKeyValue(e,n);u[r]={},u[r].current=e}),e.data.forEach(e=>{let r=_getPrimaryKeyValue(e,n);u[r]||(u[r]={}),u[r].base=e});let h=Object.entries(u).map(e=>{let[r,{base:t,current:o}]=e,i=JSON.parse(r);return t&&Object.keys(t).forEach(e=>{n.includes(e)||(i["base__".concat(e)]=t[e])}),o&&Object.keys(o).forEach(e=>{n.includes(e)||(i["current__".concat(e)]=o[e])}),i});return{columns:[...d,...a],rows:h}}var m=n(76920),f=n(46543),g=n(93683),p=n(7873),x=n(62130),y=n(29357),query_SqlEditor=e=>{let{value:r,onChange:n,onRun:i,...l}=e;return(0,o.useRef)(null),(0,t.jsx)(y.ZP,{language:l.language||"sql",theme:l.theme||"vs",defaultValue:r,onChange:e=>{void 0!==e&&n(e)},onMount:(e,r)=>{e.addCommand(r.KeyMod.CtrlCmd|r.KeyCode.Enter,i)},options:{tabSize:2,fontSize:16,lineNumbers:"on",automaticLayout:!0,minimap:{enabled:!1},wordWrap:"on",wrappingIndent:"indent"}})},v=n(71790),b=n(10929),j=n(12218);let C=j.env.NEXT_PUBLIC_API_URL||"";var k=n(13164);let w=b.default.create({baseURL:C}),E=new k.S;async function runQuery(e){let r=await w.post("/api/query",e);return r.data}function useRunQuery(e){return(0,v.a)({queryKey:["query",e.base],queryFn:()=>runQuery(e),retry:!1,enabled:!1})}let QueryViewDataGrid=e=>{let{loading:r,baseError:n,currentError:o,columns:a,rows:s}=e,c=n&&!o||!n&&o,getErrorMessage=e=>{if(!(e instanceof l.d7))return null==e?void 0:e.message;{var r,n;let t=null==e?void 0:null===(n=e.response)||void 0===n?void 0:null===(r=n.data)||void 0===r?void 0:r.detail;return t||(null==e?void 0:e.message)}};return r?(0,t.jsxs)(m.M,{p:"16px",height:"100%",children:[(0,t.jsx)(f.$,{size:"sm",mr:"8px"}),"Loading..."]}):n&&o?(0,t.jsxs)(g.b,{status:"error",children:[(0,t.jsx)(p.z,{}),"Error: ",getErrorMessage(o)]}):0===a.length?(0,t.jsx)(m.M,{height:"100%",children:"No data"}):(0,t.jsxs)(d.k,{direction:"column",height:"100%",overflow:"auto",children:[c&&(0,t.jsxs)(g.b,{status:"error",children:[(0,t.jsx)(p.z,{}),n&&"Error[Base]: ".concat(getErrorMessage(n)),o&&"Error[Current]: ".concat(getErrorMessage(o))]}),(0,t.jsx)(i.ZP,{style:{height:"100%"},columns:a,rows:s,defaultColumnOptions:{resizable:!0,maxWidth:800,width:100},className:"rdg-light"})]})};var query_QueryView=()=>{let[e,r]=(0,o.useState)('select * from {{ ref("mymodel") }}'),{data:n,refetch:i,...l}=useRunQuery({sql_template:e,base:!0}),{data:a,refetch:s,...u}=useRunQuery({sql_template:e,base:!1}),[h,m]=(0,o.useState)([]),f=(0,o.useCallback)(()=>{m([]),i(),s()},[i,s]),g=l.isFetching||u.isFetching,p=(0,o.useMemo)(()=>g?{rows:[],columns:[]}:toDataGrid(n,a,h,e=>{m(e)}),[n,a,g,h]);return(0,t.jsxs)(d.k,{direction:"column",height:"calc(100vh - 42px)",children:[(0,t.jsx)(d.k,{justifyContent:"right",padding:"5px",children:(0,t.jsx)(x.z,{colorScheme:"blue",onClick:f,isDisabled:g,size:"sm",children:"Run"})}),(0,t.jsx)(c.xu,{flex:"1",border:"1px solid #CBD5E0",height:"200px",width:"100%",children:(0,t.jsx)(query_SqlEditor,{language:"sql",theme:"vs",value:e,onChange:e=>r(e),onRun:()=>f()})}),(0,t.jsx)(c.xu,{backgroundColor:"gray.100",height:"50vh",children:(0,t.jsx)(QueryViewDataGrid,{loading:g,baseError:l.error,currentError:u.error,rows:p.rows,columns:p.columns})})]})},_=n(14612);function getNeighborSet(e,r){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,t=new Set,o={},dfs=(e,n)=>{if(n<0||void 0!==o[e]&&o[e]>=n)return;o[e]=n;let i=r(e);for(let e of i)dfs(e,n-1);t.add(e)};for(let r of e)dfs(r,n);return t}function buildLineageGraph(e,r){let n={},t={},buildNode=(e,r)=>({id:e,name:e,data:{},from:r,parents:{},children:{}});for(let[r,t]of Object.entries(e.parent_map)){n[r]=buildNode(r,"base");let t=e.nodes&&e.nodes[r];t&&(n[r].data.base=t,n[r].name=null==t?void 0:t.name,n[r].resourceType=null==t?void 0:t.resource_type,n[r].packageName=null==t?void 0:t.package_name)}for(let[e,t]of Object.entries(r.parent_map)){n[e]?n[e].from="both":n[e]=buildNode(e,"current");let t=r.nodes&&r.nodes[e];t&&(n[e].data.current=r.nodes&&r.nodes[e],n[e].name=null==t?void 0:t.name,n[e].resourceType=null==t?void 0:t.resource_type,n[e].packageName=null==t?void 0:t.package_name)}for(let[r,o]of Object.entries(e.parent_map))for(let e of o){let o=n[r],i=n[e],l="".concat(e,"_").concat(r);t[l]={id:l,from:"base",parent:i,child:o};let a=t[l];o.parents[e]=a,i.children[r]=a}for(let[e,o]of Object.entries(r.parent_map))for(let r of o){let o=n[e],i=n[r],l="".concat(r,"_").concat(e);t[l]?t[l].from="both":t[l]={id:l,from:"current",parent:i,child:o};let a=t[l];o.parents[r]=a,i.children[e]=a}let o=[];for(let[e,r]of Object.entries(n))if("base"===r.from)r.changeStatus="removed",o.push(r.id);else if("current"===r.from)r.changeStatus="added",o.push(r.id);else{var i,l,a,s,d,c;let e=null==r?void 0:null===(a=r.data)||void 0===a?void 0:null===(l=a.base)||void 0===l?void 0:null===(i=l.checksum)||void 0===i?void 0:i.checksum,n=null==r?void 0:null===(c=r.data)||void 0===c?void 0:null===(d=c.current)||void 0===d?void 0:null===(s=d.checksum)||void 0===s?void 0:s.checksum;e&&n&&e!==n&&(r.changeStatus="modified",o.push(r.id))}for(let[e,r]of Object.entries(t))"base"===r.from?r.changeStatus="removed":"current"===r.from&&(r.changeStatus="added");return{nodes:n,edges:t,modifiedSet:o}}function toReactflow(e){let r=[],n=[];for(let[n,t]of Object.entries(e.nodes))r.push({id:t.id,position:{x:0,y:0},data:t,type:"customNode",targetPosition:_.Ly.Left,sourcePosition:_.Ly.Right});for(let[r,t]of Object.entries(e.edges))n.push({id:t.id,type:"customEdge",source:t.parent.id,target:t.child.id,data:t});return highlightPath(e,r,n,null)}function highlightPath(e,r,n,t){function union(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];let t=new Set;return r.forEach(e=>{e.forEach(e=>{t.add(e)})}),t}let o=null!==t?union(getNeighborSet([t],r=>Object.keys(e.nodes[r].parents)),getNeighborSet([t],r=>Object.keys(e.nodes[r].children))):getNeighborSet(e.modifiedSet,r=>Object.keys(e.nodes[r].children)),i=new Set(n.filter(e=>o.has(e.source)&&o.has(e.target)).map(e=>e.id)),l=r.map(e=>({...e,data:{...e.data,isHighlighted:o.has(e.id)}})),a=n.map(e=>({...e,data:{...e.data,isHighlighted:i.has(e.id)}}));return[l,a]}var S=n(81108),N=n(77968),O=n(49473),I=n(16524),L=n(93864),T=n.n(L);n(38247);var K=n(63240),P=n(54057);let R=h.Nbv,F=h.sFB,z=h.UGs;function getIconForChangeStatus(e){return"added"===e?{color:"#1dce00",icon:R}:"removed"===e?{color:"#ff4444",icon:F}:"modified"===e?{color:"#ffa502",icon:z}:{color:"inherit",icon:void 0}}function getIconForResourceType(e){return"model"===e?{color:"#c0eafd",icon:K.Fn3}:"metric"===e?{color:"#ffe6ee",icon:P._MV}:"source"===e?{color:"#a6dda6",icon:K.i1q}:"exposure"===e?{color:"#ffe6ee",icon:P.n8P}:"semantic_model"===e?{color:"#fb8caf",icon:P.R1C}:"seed"===e?{color:"#a6dda6",icon:K.tWi}:{color:"inherit",icon:void 0}}function GraphNode(e){var r,n;let o,{data:i}=e,{isHighlighted:l,resourceType:a,changeStatus:s}=i,h=(0,_.oR)(e=>e.transform[2]>.3),{icon:m}=getIconForResourceType(a),f="gray.400",g="solid";s&&(o=getIconForChangeStatus(s).icon,f=getIconForChangeStatus(s).color);let p=f,x=null==i?void 0:i.name;return(0,t.jsx)(S.u,{label:"model"===a?x:"".concat(x," (").concat(a,")"),placement:"top",children:(0,t.jsxs)(d.k,{width:"300px",_hover:{backgroundColor:h?"gray.100":f},borderColor:p,borderWidth:1,borderStyle:g,backgroundColor:h?"white":f,borderRadius:3,boxShadow:"unset",padding:0,className:!0===l?"node-highlight":!1===l?"node-unhighlight":void 0,children:[(0,t.jsx)(d.k,{backgroundColor:f,padding:2,borderRightWidth:1,borderColor:p,borderStyle:g,alignItems:"top",visibility:h?"inherit":"hidden",children:(0,t.jsx)(u.J,{as:m})}),(0,t.jsx)(d.k,{flex:"1 0 auto",mx:"1",width:"100px",direction:"column",children:(0,t.jsxs)(d.k,{width:"100%",textAlign:"left",flex:"1",p:1,alignItems:"center",visibility:h?"inherit":"hidden",children:[(0,t.jsx)(c.xu,{flex:"1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",children:x}),o&&(0,t.jsx)(d.k,{children:(0,t.jsx)(u.J,{color:f,as:o,flex:"0 0 20px"})})]})}),Object.keys(null!==(r=null==i?void 0:i.parents)&&void 0!==r?r:{}).length>0&&(0,t.jsx)(_.HH,{type:"target",position:_.Ly.Left,isConnectable:!1}),Object.keys(null!==(n=null==i?void 0:i.children)&&void 0!==n?n:{}).length>0&&(0,t.jsx)(_.HH,{type:"source",position:_.Ly.Right,isConnectable:!1})]})})}function GraphEdge(e){let{sourceX:r,sourceY:n,targetX:o,targetY:i,sourcePosition:l,targetPosition:a,style:s={},markerEnd:d,data:c}=e,u={...s};(null==c?void 0:c.changeStatus)&&(u.stroke=getIconForChangeStatus(null==c?void 0:c.changeStatus).color,u.strokeDasharray="5"),(null==c?void 0:c.isHighlighted)===!1&&(u.filter="opacity(0.2) grayscale(50%)");let[h]=(0,_.OQ)({sourceX:r,sourceY:n,sourcePosition:l,targetX:o,targetY:i,targetPosition:a});return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(_.u5,{path:h,markerEnd:d,style:{...u,...s}})})}n(88727);var V=n(74796),G=n(79315),M=n(55344),q=n(1726),D=n(83622),H=n(21801),W=n(29731);function mergeKeys(e,r){let n=[...e],t=[...r],o=[];for(;n.length>0&&t.length>0;)if(o.includes(n[0]))n.shift();else if(o.includes(t[0]))t.shift();else if(n[0]===t[0])o.push(n[0]),n.shift(),t.shift();else if(t.includes(n[0])){let e=t.indexOf(n[0]);for(let r=0;r<e;r++)o.includes(t[r])||o.push(t[r]);o.push(n[0]),n.shift(),t.splice(0,e+1)}else o.push(n[0]),n.shift();return n.forEach(e=>{o.includes(e)||o.push(e)}),t.forEach(e=>{o.includes(e)||o.push(e)}),o}function mergeKeysWithStatus(e,r){let n=mergeKeys(e,r),t={};for(let o of n)e.includes(o)?r.includes(o)?t[o]=void 0:t[o]="removed":t[o]="added";let o={};e.forEach((e,r)=>{o[e]=r});let i=-1;for(let e of n){let r=o[e];void 0!==r&&(r>i?i=r:t[e]="reordered")}return t}function mergeColumns(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={},t=mergeKeysWithStatus(Object.keys(e),Object.keys(r));return Object.entries(t).forEach(e=>{let[r,t]=e;n[r]={name:r,reordered:"reordered"===t}}),Object.entries(e).map((e,r)=>{let[t,o]=e;n[t].baseIndex=r+1,n[t].baseType=o.type}),Object.entries(r).map((e,r)=>{let[t,o]=e;n[t].currentIndex=r+1,n[t].currentType=o.type}),n}function schema_toDataGrid(e){function columnIndexCellClass(e){return void 0===e.baseIndex?"column-index-added":void 0===e.currentIndex?"column-index-removed":!0===e.reordered?"column-index-reordered":"column-index-normal"}function columnNameCellClass(e){return void 0===e.baseIndex?"column-body-added":void 0===e.currentIndex?"column-body-removed":!0===e.reordered?"column-body-reordered":"column-body-normal"}function columnTypeCellClass(e){return void 0===e.baseIndex?"column-body-added":void 0===e.currentIndex?"column-body-removed":e.baseType!==e.currentType?"column-body-type-changed":!0===e.reordered?"column-body-reordered":"column-body-normal"}let r=Object.values(e);return{columns:[{key:"baseIndex",name:"",resizable:!0,minWidth:35,cellClass:columnIndexCellClass},{key:"currentIndex",name:"",resizable:!0,minWidth:35,cellClass:columnIndexCellClass},{key:"name",name:"Name",resizable:!0,cellClass:columnNameCellClass},{key:"baseType",name:"Base Type",resizable:!0,cellClass:columnTypeCellClass},{key:"currentType",name:"Current Type",resizable:!0,cellClass:columnTypeCellClass}],rows:r}}function SchemaView(e){let r,{base:n,current:l}=e,{columns:a,rows:s}=(0,o.useMemo)(()=>schema_toDataGrid(mergeColumns(null==n?void 0:n.columns,null==l?void 0:l.columns)),[n,l]),c=n&&void 0===n.columns,u=l&&void 0===l.columns;return c&&u?r="catalog.json is missing on both current and base environments.":c?r="catalog.json is missing on base environment.":u&&(r="catalog.json is missing on current environment."),(0,t.jsxs)(d.k,{direction:"column",children:[r&&(0,t.jsxs)(g.b,{status:"warning",fontSize:"12px",p:"8px",children:[(0,t.jsx)(p.z,{}),r]}),(0,t.jsx)(i.ZP,{style:{height:"100%",fontSize:"10pt",borderWidth:1,overflowY:"auto"},columns:a,rows:s,className:"rdg-light"})]})}function NodeView(e){let{node:r}=e,n="model"===r.resourceType||"seed"===r.resourceType||"source"===r.resourceType;return(0,t.jsxs)(V.r,{height:"100%",templateRows:"auto 1fr",children:[(0,t.jsxs)(c.xu,{flex:"0 0",p:"16px",children:[(0,t.jsx)(G.X,{size:"sm",children:r.name}),(0,t.jsx)(c.xu,{color:"gray",children:r.resourceType})]}),n&&(0,t.jsxs)(M.m,{overflow:"auto",as:d.k,children:[(0,t.jsx)(q.t,{children:(0,t.jsx)(D.O,{children:"Columns"})}),(0,t.jsx)(H.n,{overflow:"auto",height:"calc(100% - 42px)",children:(0,t.jsx)(W.x,{p:0,overflowY:"auto",height:"100%",children:(0,t.jsx)(SchemaView,{base:r.data.base,current:r.data.current})})})]})]})}n(75165);let layout=function(e,r){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"LR",t=new(T()).graphlib.Graph;t.setDefaultEdgeLabel(()=>({})),t.setGraph({rankdir:n}),e.forEach(e=>{t.setNode(e.id,{width:300,height:36})}),r.forEach(e=>{t.setEdge(e.source,e.target)}),T().layout(t),e.forEach(e=>{let r=t.node(e.id);return e.position={x:r.x-150,y:r.y-18},e})},Q={customNode:GraphNode},A={customEdge:GraphEdge},nodeColor=e=>{var r;return(null==e?void 0:null===(r=e.style)||void 0===r?void 0:r.backgroundColor)||"lightgray"};function ChangeStatusLegend(){return(0,t.jsx)(c.xu,{bg:"white",padding:"12px",borderWidth:"1px",borderColor:"gray.200",fontSize:"sm",children:Object.entries({added:["Added","Added resource"],removed:["Removed","Removed resource"],modified:["Modified","Modified resource"]}).map(e=>{let[r,[n,o]]=e,{icon:i,color:l}=getIconForChangeStatus(r);return(0,t.jsx)(S.u,{label:o,children:(0,t.jsxs)(d.k,{alignItems:"center",gap:"6px",marginBottom:"2px",children:[(0,t.jsx)(u.J,{color:l,as:i})," ",n]})},r)})})}function _LineageView(){let[e,r,n]=(0,_.Rr)([]),[i,a,s]=(0,_.ll)([]),[u,h]=(0,o.useState)(),[m,f]=(0,o.useState)(!1),[g,p]=(0,o.useState)(),[x,y]=(0,o.useState)(),[v,j]=(0,o.useState)(),k=(0,o.useCallback)(async()=>{let e="current";try{f(!0);let n=await b.default.get("".concat(C,"/api/lineage?base=0"));if(200!==n.status)throw Error("error");e="base";let t=await b.default.get("".concat(C,"/api/lineage?base=1"));if(200!==t.status)throw Error("error");let o=buildLineageGraph(t.data,n.data),[i,l]=toReactflow(o);layout(i,l),h(o),r(i),a(l),p(void 0),y(void 0)}catch(r){if(r instanceof l.d7){var n,t;let e=null==r?void 0:null===(t=r.response)||void 0===t?void 0:null===(n=t.data)||void 0===n?void 0:n.detail;e?p(e):p(null==r?void 0:r.message)}else p(null==r?void 0:r.message);y(e)}finally{f(!1)}},[r,a]);return((0,o.useEffect)(()=>{k()},[k]),m)?(0,t.jsx)(t.Fragment,{children:"Loading lineage data"}):g?(0,t.jsxs)(t.Fragment,{children:["Fail to load lineage data: ",g]}):(0,t.jsxs)(d.k,{width:"100%",height:"calc(100vh - 42px)",children:[(0,t.jsx)(c.xu,{flex:"1 0 0px",children:(0,t.jsxs)(_.x$,{nodeTypes:Q,edgeTypes:A,nodes:e,edges:i,onNodesChange:n,onEdgesChange:s,onNodeClick:(e,r)=>{j(r.id)},onNodeMouseEnter:(n,t)=>{if(u){let[n,o]=highlightPath(u,e,i,t.id);r(n),a(o)}},onNodeMouseLeave:(n,t)=>{if(u){let[n,t]=highlightPath(u,e,i,null);r(n),a(t)}},minZoom:.1,fitView:!0,children:[(0,t.jsx)(N.A,{color:"#ccc"}),(0,t.jsx)(O.Z,{showInteractive:!1,position:"top-right"}),(0,t.jsx)(_.s_,{position:"bottom-left",children:(0,t.jsx)(ChangeStatusLegend,{})}),(0,t.jsx)(I.a,{nodeColor:nodeColor,nodeStrokeWidth:3})]})}),v&&(null==u?void 0:u.nodes[v])&&(0,t.jsx)(c.xu,{flex:"0 0 500px",borderLeft:"solid 1px lightgray",height:"100%",children:(0,t.jsx)(NodeView,{node:null==u?void 0:u.nodes[v]})})]})}function LineageView(){return(0,t.jsx)(_.tV,{children:(0,t.jsx)(_LineageView,{})})}var U=n(21780),B=n(63956),J=n(35537),Z=n(12218);function getCookie(e){var r=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)");return r?r.pop():""}function Home(){return(0,o.useLayoutEffect)(()=>{let e=getCookie("recce_user_id");if(e&&Z.env.AMPLITUDE_API_KEY)try{B.S1(Z.env.AMPLITUDE_API_KEY,e,{defaultTracking:!0})}catch(e){console.error(e)}},[]),(0,t.jsx)(U.x,{children:(0,t.jsx)(J.aH,{client:E,children:(0,t.jsxs)(M.m,{children:[(0,t.jsxs)(q.t,{children:[(0,t.jsx)(D.O,{children:"Lineage"}),(0,t.jsx)(D.O,{children:"Query"})]}),(0,t.jsxs)(H.n,{children:[(0,t.jsx)(W.x,{p:0,children:(0,t.jsx)(LineageView,{})}),(0,t.jsx)(W.x,{p:0,children:(0,t.jsx)(query_QueryView,{})})]})]})})})}},88727:function(){},7866:function(){},75165:function(){}},function(e){e.O(0,[759,170,182,710,495,138,297,62,744],function(){return e(e.s=99178)}),_N_E=e.O()}]);