import React, { useState } from "react";
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import SelectInput from "./SelectInput";
import FileUpload from "./FileUpload";

const IssueForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "",
    course: "",
    instructor: "",
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachments: e.target.files });
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
      <h2 className="text-4xl font-semibold text-center mb-6">Submit a New Issue</h2>

      {/* Section 1: Issue Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          label="Issue Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextareaInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <SelectInput
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={["Low", "Medium", "High"]}
        />
      </div>

      {/* Section 2: Category and Course Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SelectInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={["Assignment", "Exam Results", "Course Materials", "Technical Issue"]}
        />
        <TextInput
          label="Course/Department"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Lecturer/Professor Name"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
      </div>

      {/* Section 3: Attachments */}
      <div className="mt-6">
        <FileUpload onFileChange={handleFileChange} />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Submit Issue
        </button>
      </div>
    </form>
  );
};

export default IssueForm;
