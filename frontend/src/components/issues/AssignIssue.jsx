import React, { useState } from "react";
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import SelectInput from "./SelectInput";
import FileUpload from "./FileUpload";

const AssignIssue = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentAcademic_year: "";
    title: "",
    description: "",
    priority: "Medium",
    category: "",
    department: "",
    course: "",
    instructor: "",
    attachments: null,
    status: "Open", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle your form submission (API call)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-xl mx-auto p-8 bg-white shadow-lg rounded-xl space-y-6 sm:space-y-8"
    >
      <h2 className="text-4xl font-semibold text-center mb-6">Assign An Issue</h2>

      {/* Section 1: Student Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          label="Student Name"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Student Academic_year"
          name="studentAcademic_year"
          value={formData.studentAcademic_yeaar}
          onchange={handleChange}
          required
          />

        <TextInput
          label="Student Email"
          name="studentEmail"
          value={formData.studentEmail}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Issue Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Section 2: Issue Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          label="Assigned To (Lecturer Name)"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          required
        />
        
        <TextInput
          label="Assigned Issue"
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          required
        />
        <SelectInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={["Assignment", "Exam Results", "Course Materials", "Technical Issue"]}
        />


        
      </div>

      {/* Section 3: Category and Course/Instructor Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       <SelectInput
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={["Low", "Medium", "High"]}
        />
        <TextInput
          label="Department/Faculty"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <SelectInput
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={["Open", "In Progress", "Resolved"]}
        />
      
        
      </div>


     
        <button
          type="submit"
          className="py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mx-auto block"
        >
          Assign Issue
        </button>
    </form>
  );
};

export default AssignIssue;

