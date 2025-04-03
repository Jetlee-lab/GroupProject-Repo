const FileUpload = ({ onFileChange }) => (
  <div>
    <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
      Attachments (Optional)
    </label>
    <input
      type="file"
      id="attachments"
      multiple
      onChange={onFileChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default FileUpload;
