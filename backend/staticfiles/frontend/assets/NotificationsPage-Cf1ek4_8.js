import{a as i,j as s}from"./index-CKQpsmit.js";const y=()=>{const[r,o]=i.useState([]),[t,c]=i.useState(1),a=2;i.useEffect(()=>{o([{id:1,message:'Your issue "Missing course unit marks" has been resolved.',date:"17/03/2025",type:"Issue Update"},{id:2,message:'New comment added to your issue "Technical issue with AITS platform".',date:"16/03/2025",type:"Comment"},{id:3,message:'Your issue "Conflicting exam schedule" has been updated.',date:"15/03/2025",type:"Issue Upload"},{id:4,message:'Your issue "Library access issue" has been resolved.',date:"14/03/2025",type:"Issue Update"}])},[]);const u=e=>{o(h=>h.filter(b=>b.id!==e))},n=t*a,m=n-a,d=r.slice(m,n),l=Math.ceil(r.length/a),x=()=>{t<l&&c(e=>e+1)},g=()=>{t>1&&c(e=>e-1)};return s.jsxs("div",{className:"min-h-screen flex flex-col items-center bg-blue-100",children:[s.jsxs("div",{className:"max-w-4xl w-full p-6 bg-white rounded-lg shadow-md",children:[s.jsx("h1",{className:"text-2xl font-bold text-gray-800 text-center mb-6",children:"Notifications"}),d.length>0?s.jsx("main",{className:"space-y-4",children:d.map(e=>s.jsxs("div",{className:`p-4 border-l-4 rounded-lg ${e.type==="Issue Update"?"bg-blue-200 border-blue-500":e.type==="Comment"?"bg-yellow-100 border-yellow-500":e.type==="Issue Upload"?"bg-gray-200 border-green-500":""}`,children:[s.jsx("p",{className:"font-medium text-gray-700",children:e.type}),s.jsx("p",{className:"text-gray-800",children:e.message}),s.jsx("p",{className:"text-sm text-gray-500 mt-2",children:e.date}),s.jsx("button",{onClick:()=>u(e.id),className:"mt-2 text-blue-500 hover:underline text-sm",children:"Mark as Read"})]},e.id))}):s.jsx("p",{className:"text-gray-500 text-center",children:"No notifications available."}),r.length>a&&s.jsxs("div",{className:"flex justify-between items-center mt-6",children:[s.jsx("button",{onClick:g,disabled:t===1,className:`px-4 py-2 rounded-lg ${t===1?"bg-gray-300 text-gray-500 cursor-not-allowed":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Previous"}),s.jsxs("p",{className:"text-gray-700",children:["Page ",t," of ",l]}),s.jsx("button",{onClick:x,disabled:t===l,className:`px-4 py-2 rounded-lg ${t===l?"bg-gray-300 text-gray-500 cursor-not-allowed":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Next"})]})]}),s.jsx("footer",{className:"mt-auto py-4 w-full text-center text-sm text-gray-500",children:"Academic Issue Tracking System © 2025"})]})};export{y as default};
