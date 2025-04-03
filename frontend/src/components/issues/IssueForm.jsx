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
    console.log("Submitting form...");
  };

  return (
    // Center the form and remove extra spacing
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 sm:p-8 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Submit a New Issue</h2>

        {/* Issue Title & Description */}
        <div className="grid grid-cols-1 gap-4">
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
        </div>

        {/* Category & Course Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        {/* Lecturer Name */}
        <TextInput
          label="Lecturer/Professor Name"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
        />

        {/* File Upload */}
        <FileUpload onFileChange={handleFileChange} />

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
