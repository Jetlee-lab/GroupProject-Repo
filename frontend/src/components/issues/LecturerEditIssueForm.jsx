import React, { useState, useEffect } from "react"; 
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import SelectInput from "./SelectInput";

const LecturerEditIssueForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "Medium",
    category: "",
    course: "",
    instructor: "",
    studentContact: "",
    resolved: false,
    resolutionDate: "",
    issueType: "Administrative",
    status: "Open", 
    lecturerComments: "",
    attachments: null,
    relatedIssues: "",
  });

  // Use effect to pre-fill data if it's available (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        resolved: initialData.resolved || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-xl mx-auto p-8 bg-white shadow-lg rounded-xl space-y-6 sm:space-y-8"
    >
      <h2 className="text-4xl font-semibold text-center mb-6">Edit An Issue</h2>

      {/* Section 1: Issue Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          label="Issue Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        {/* Display Previous Issue Details in an Area next to Student Name */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Previous Issue Details</h3>
          <div className="text-sm mt-2">
            <strong>Previous Title:</strong> {initialData?.title || "N/A"}
          </div>
          <div className="text-sm">
            <strong>Previous Status:</strong> {initialData?.status || "N/A"}
          </div>
        </div>

        <TextInput
          label="Student Name / Registration Number"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Section 2: Category and Course Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          label="Course/Department"
          name="course"
          value={formData.course}
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
        <TextInput
          label="Lecturer/Professor Name"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
      </div>

      {/* Section 3: Issue Resolution and Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          label="Student Contact Info (Email/Phone)"
          name="studentContact"
          value={formData.studentContact}
          onChange={handleChange}
        />
        <SelectInput
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={["Low", "Medium", "High"]}
        />
        <TextInput
          label="Expected Resolution Date"
          name="resolutionDate"
          type="date"
          value={formData.resolutionDate}
          onChange={handleChange}
        />
      </div>

      {/* Section 4: Issue Type and Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SelectInput
          label="Issue Type"
          name="issueType"
          value={formData.issueType}
          onChange={handleChange}
          options={["Administrative", "Technical", "Course Content", "Other"]}
        />
        <SelectInput
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={["Open", "In Progress", "Closed"]}
        />
        <TextareaInput
          label="Lecturer's Resolution Comments"
          name="lecturerComments"
          value={formData.lecturerComments}
          onChange={handleChange}
        />
      </div>

      {/* Section 6: Resolution Checkbox */}
      <div className="mt-6 flex items-center space-x-4">
        <input
          type="checkbox"
          id="resolved"
          name="resolved"
          checked={formData.resolved}
          onChange={() =>
            setFormData({ ...formData, resolved: !formData.resolved })
          }
          className="h-5 w-5 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="resolved" className="text-sm text-gray-700">
          Mark as Resolved
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Submit Edited Issue
        </button>
      </div>
    </form>
  );
};

export default LecturerEditIssueForm;
