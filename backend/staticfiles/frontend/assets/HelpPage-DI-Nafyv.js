import{j as e,a as t}from"./index-CKQpsmit.js";const c=()=>e.jsx("header",{className:"text-center py-6 bg-blue-500 text-white rounded-lg shadow-xl",children:e.jsx("h1",{className:"text-3xl font-bold",children:"Find answers to your questions or contact support."})}),u=()=>e.jsxs("section",{className:"p-6 my-5 bg-white shadow-md rounded-lg hover:shadow-2xl transition-all duration-500",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"User Guide"}),e.jsxs("ul",{className:"list-disc pl-6 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Creating an Issue:"}),' Click "Create New Issue" to report a problem.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tracking Issues:"}),' View submitted issues in "Reports".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Issue Status:"})," Follow issue progress through different stages."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Editing or Closing an Issue:"})," Mark issues as closed when resolved."]})]})]}),h=()=>e.jsxs("section",{className:"p-6 my-6 bg-white shadow-md rounded-lg hover:shadow-2xl transition-all duration-500",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Frequently Asked Questions"}),e.jsxs("dl",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("dt",{className:"font-bold",children:"How do I create a new issue?"}),e.jsx("dd",{className:"text-gray-700",children:'Click "Create New Issue" or "+" icon in the main navigation.'})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"font-bold",children:"Can I track multiple issues?"}),e.jsx("dd",{className:"text-gray-700",children:'Yes, all reported issues appear under "Reports".'})]})]})]}),x=()=>{const[a,l]=t.useState(""),[r,n]=t.useState(""),[o,d]=t.useState(""),i=s=>{s.preventDefault(),alert("Support message sent!")};return e.jsxs("section",{className:"p-6 bg-white shadow-md rounded-lg hover:shadow-2xl transition-all duration-500",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Contact Support"}),e.jsxs("form",{onSubmit:i,className:"space-y-4",children:[e.jsx("input",{type:"text",placeholder:"Your Name",value:a,onChange:s=>l(s.target.value),required:!0,className:"w-full p-2 border rounded"}),e.jsx("input",{type:"email",placeholder:"Your Email",value:r,onChange:s=>n(s.target.value),required:!0,className:"w-full p-2 border rounded"}),e.jsx("textarea",{placeholder:"Your Message",value:o,onChange:s=>d(s.target.value),required:!0,className:"w-full p-2 border rounded"}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",children:"Send"})]})]})},p=()=>e.jsxs("div",{className:"p-10 w-full bg-blue-100 h-screen",children:[e.jsx(c,{}),e.jsx(u,{}),e.jsx(h,{}),e.jsx(x,{})]});export{p as default};
