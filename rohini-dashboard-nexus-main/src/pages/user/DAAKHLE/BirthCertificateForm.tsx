import React, { useState } from 'react';

const BirthCertificateForm = () => {
  // State for form values
  const [formData, setFormData] = useState({
    financialYear: '',
    childFirstName: '',
    childMiddleName: '',
    childLastName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    hospitalNameAddress: '',
    applicantFirstNameEng: '',
    applicantMiddleNameEng: '',
    applicantLastNameEng: '',
    applicantFirstNameDev: '',
    applicantMiddleNameDev: '',
    applicantLastNameDev: '',
    applicantMobileNo: '',
    noOfCopies: '',
    paymentMethod: '',
    utrNumber: ''
  });

  // State for file upload
  const [fileUpload, setFileUpload] = useState(null);
  const [fileName, setFileName] = useState('');
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle name fields auto-capitalization
    const nameFields = [
      'childFirstName', 'childMiddleName', 'childLastName',
      'fatherFirstName', 'fatherMiddleName', 'fatherLastName',
      'motherFirstName', 'motherMiddleName', 'motherLastName',
      'applicantFirstNameEng', 'applicantMiddleNameEng', 'applicantLastNameEng',
      'applicantFirstNameDev', 'applicantMiddleNameDev', 'applicantLastNameDev',
    ];
    
    if (nameFields.includes(name) && value) {
      // Capitalize first letter, rest lowercase
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Handle mobile number input to only allow integers
  const handleMobileInput = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, ''); // Remove all non-digit characters
    
    setFormData(prevState => ({
      ...prevState,
      applicantMobileNo: numericValue
    }));
  };

  // Handle radio button changes
  const handleRadioChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileUpload(file);
      setFileName(file.name);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset submission states
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    
    try {
      // Create FormData object for multipart/form-data (for file upload)
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Append the file
      if (fileUpload) {
        formDataToSend.append('paymentProof', fileUpload);
      }
      
      // Send the request
      const response = await fetch('http://localhost:5000/api/certificates', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          financialYear: '',
          childFirstName: '',
          childMiddleName: '',
          childLastName: '',
          dateOfBirth: '',
          timeOfBirth: '',
          fatherFirstName: '',
          fatherMiddleName: '',
          fatherLastName: '',
          motherFirstName: '',
          motherMiddleName: '',
          motherLastName: '',
          hospitalNameAddress: '',
          applicantFirstNameEng: '',
          applicantMiddleNameEng: '',
          applicantLastNameEng: '',
          applicantFirstNameDev: '',
          applicantMiddleNameDev: '',
          applicantLastNameDev: '',
          applicantMobileNo: '',
          noOfCopies: '',
          paymentMethod: '',
          utrNumber: ''
        });
        setFileUpload(null);
        setFileName('');
        alert('Birth certificate application submitted successfully!');
      } else {
        setSubmitError(data.error || 'Form submission failed. Please try again.');
        alert('Error: ' + (data.error || 'Form submission failed. Please try again.'));
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-10 h-10 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo */}
          <img src="/api/placeholder/40/40" alt="Ashok Stambh" />
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">BIRTH CERTIFICATE APPLICATION</h1>
      </div>

      {/* Success message */}
      {submitSuccess && (
        <div className="m-4 p-3 bg-green-100 text-green-700 rounded-md">
          Birth certificate application submitted successfully!
        </div>
      )}
      
      {/* Error message */}
      {submitError && (
        <div className="m-4 p-3 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      <form className="p-6" onSubmit={handleSubmit}>
        {/* CHILD DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">CHILD DETAILS</h2>
          
          <div className="mb-4 w-1/2 pr-2">
            <label htmlFor="financialYear" className="block text-sm font-medium text-gray-700 mb-1">Financial Year*</label>
            <select 
              id="financialYear"
              name="financialYear"
              value={formData.financialYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            >
              <option value="">Select Financial Year</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
              <option value="2028-2029">2028-2029</option>
            </select>
          </div>
          
          {/* Child's Name */}
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="childFirstName" className="block text-sm font-medium text-gray-700 mb-1">Child's First Name*</label>
              <input
                id="childFirstName"
                type="text"
                name="childFirstName"
                value={formData.childFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="childMiddleName" className="block text-sm font-medium text-gray-700 mb-1">Child's Middle Name</label>
              <input
                id="childMiddleName"
                type="text"
                name="childMiddleName"
                value={formData.childMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700 mb-1">Child's Last Name*</label>
              <input
                id="childLastName"
                type="text"
                name="childLastName"
                value={formData.childLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>
          </div>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="timeOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Time of Birth*</label>
              <input
                id="timeOfBirth"
                type="time"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>
          </div>
        </div>

        {/* PARENTS DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PARENTS DETAILS</h2>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Father's Information</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="fatherFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                id="fatherFirstName"
                type="text"
                name="fatherFirstName"
                value={formData.fatherFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="fatherMiddleName" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                id="fatherMiddleName"
                type="text"
                name="fatherMiddleName"
                value={formData.fatherMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="fatherLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                id="fatherLastName"
                type="text"
                name="fatherLastName"
                value={formData.fatherLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Mother's Information</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="motherFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                id="motherFirstName"
                type="text"
                name="motherFirstName"
                value={formData.motherFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="motherMiddleName" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                id="motherMiddleName"
                type="text"
                name="motherMiddleName"
                value={formData.motherMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="motherLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                id="motherLastName"
                type="text"
                name="motherLastName"
                value={formData.motherLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="hospitalNameAddress" className="block text-sm font-medium text-gray-700 mb-1">Hospital Name / Address*</label>
            <textarea
              id="hospitalNameAddress"
              name="hospitalNameAddress"
              value={formData.hospitalNameAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
              placeholder="Enter hospital name and address details"
              required
            ></textarea>
          </div>
        </div>

        {/* APPLICANT DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">APPLICANT DETAILS</h2>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Name in English</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="applicantFirstNameEng" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                id="applicantFirstNameEng"
                type="text"
                name="applicantFirstNameEng"
                value={formData.applicantFirstNameEng}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="applicantMiddleNameEng" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                id="applicantMiddleNameEng"
                type="text"
                name="applicantMiddleNameEng"
                value={formData.applicantMiddleNameEng}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="applicantLastNameEng" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                id="applicantLastNameEng"
                type="text"
                name="applicantLastNameEng"
                value={formData.applicantLastNameEng}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Name in Devnagari</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="applicantFirstNameDev" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                id="applicantFirstNameDev"
                type="text"
                name="applicantFirstNameDev"
                value={formData.applicantFirstNameDev}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="applicantMiddleNameDev" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                id="applicantMiddleNameDev"
                type="text"
                name="applicantMiddleNameDev"
                value={formData.applicantMiddleNameDev}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="applicantLastNameDev" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                id="applicantLastNameDev"
                type="text"
                name="applicantLastNameDev"
                value={formData.applicantLastNameDev}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 pr-2">
              <label htmlFor="applicantMobileNo" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
              <input
                id="applicantMobileNo"
                type="text"
                name="applicantMobileNo"
                value={formData.applicantMobileNo}
                onChange={handleMobileInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter mobile number"
                required
                maxLength={10}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="noOfCopies" className="block text-sm font-medium text-gray-700 mb-1">Number of Copies*</label>
              <select 
                id="noOfCopies"
                name="noOfCopies"
                value={formData.noOfCopies}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="">Select number of copies</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PAYMENT SECTION</h2>
          <p className="text-sm text-gray-600 mb-4">
            A fee of Rs 20/- is required and the receipt of payment of fees should be uploaded and the UTR no should be entered in the column given below.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method*</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="upi"
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={() => handleRadioChange('paymentMethod', 'upi')}
                  className="mr-2 focus:ring-blue-400"
                  required
                />
                <label htmlFor="upi">UPI</label>
              </div>
              <div className="flex items-center">
                <input
                  id="netbanking"
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === 'netbanking'}
                  onChange={() => handleRadioChange('paymentMethod', 'netbanking')}
                  className="mr-2 focus:ring-blue-400"
                />
                <label htmlFor="netbanking">Netbanking</label>
              </div>
              <div className="flex items-center">
                <input
                  id="card"
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => handleRadioChange('paymentMethod', 'card')}
                  className="mr-2 focus:ring-blue-400"
                />
                <label htmlFor="card">Card</label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scan QR Code</label>
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-2">
                <span className="text-gray-400 text-xs">QR Code</span>
              </div>
              <button
                id="markAsScanned"
                type="button"
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Mark as Scanned
              </button>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="utrNumber" className="block text-sm font-medium text-gray-700 mb-1">UTR Number*</label>
                <input
                  id="utrNumber"
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter UTR Number"
                  required
                />
              </div>
              <div>
                <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700 mb-1">Payment Proof*</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="paymentProof"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input 
                          id="paymentProof" 
                          name="paymentProof" 
                          type="file" 
                          className="sr-only"
                          onChange={handleFileUpload}
                          accept="image/jpeg,image/png,application/pdf"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, PDF. Max 10 MB.
                    </p>
                    {fileName && (
                      <p className="text-xs text-blue-500">Selected file: {fileName}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6">
          <button
            id="submitButton"
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthCertificateForm;