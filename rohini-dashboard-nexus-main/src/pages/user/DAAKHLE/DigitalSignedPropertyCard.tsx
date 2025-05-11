import React, { useState, useEffect } from 'react';

const FormComponent: React.FC = () => {
  // Define the district-taluka mapping
  const districtTalukaMap: { [key: string]: string[] } = {
    "Ahmednagar": ["Akole", "Jamkhed", "Karjat", "Kopargaon", "Nagar", "Nevasa", "Parner", "Pathardi", "Rahata", "Rahuri", "Shevgaon", "Shrigonda", "Shrirampur"],
    "Akola": ["Akola", "Akot", "Balapur", "Barshitakli", "Murtijapur", "Patur", "Telhara"],
    "Amravati": ["Achalpur", "Amravati", "Anjangaon-Surji", "Bhatkuli", "Chandur", "Chandurbazar", "Chikhaldara", "Daryapur", "Dharni", "Morshi", "Nandgaon Khandeshwar", "Tiosa", "Warud"],
    "Aurangabad": ["Aurangabad", "Gangapur", "Kannad", "Khuldabad", "Paithan", "Phulambri", "Sillod", "Soegaon", "Vaijapur"],
    "Beed": ["Ambajogai", "Ashti", "Beed", "Georai", "Kaij", "Majalgaon", "Parli", "Patoda", "Shirur-Kasar", "Wadwani"],
    "Bhandara": ["Bhandara", "Lakhandur", "Mohadi", "Pauni", "Sakoli", "Tumsar"],
    "Buldhana": ["Buldhana", "Chikhli", "Deulgaon Raja", "Jalgaon Jamod", "Khamgaon", "Lonar", "Malkapur", "Mehkar", "Motala", "Nandura", "Sangrampur", "Shegaon", "Sindkhed Raja"],
    "Chandrapur": ["Ballarpur", "Bhadravati", "Brahmapuri", "Chandrapur", "Chimur", "Gondpipri", "Jiwati", "Korpana", "Mul", "Nagbhid", "Pombhurna", "Rajura", "Saoli", "Sindewahi", "Warora"],
    "Dhule": ["Dhule", "Sakri", "Shirpur", "Sindkheda"],
    "Gadchiroli": ["Aheri", "Armori", "Bhamragad", "Chamorshi", "Desaiganj", "Dhanora", "Etapalli", "Gadchiroli", "Korchi", "Kurkheda", "Mulchera", "Sironcha"],
    "Gondia": ["Amgaon", "Arjuni Morgaon", "Deori", "Gondia", "Goregaon", "Sadak-Arjuni", "Salekasa", "Tiroda"],
    "Hingoli": ["Aundha Nagnath", "Basmath", "Hingoli", "Kalamnuri", "Sengaon"],
    "Jalgaon": ["Amalner", "Bhadgaon", "Bhusawal", "Bodwad", "Chopda", "Dharangaon", "Erandol", "Jalgaon", "Jamner", "Muktainagar", "Pachora", "Parola", "Raver", "Yawal"],
    "Jalna": ["Ambad", "Badnapur", "Bhokardan", "Ghansawangi", "Jafferabad", "Jalna", "Mantha", "Partur"],
    "Kolhapur": ["Ajra", "Bhudargad", "Chandgad", "Gadhinglaj", "Gaganbawada", "Hatkanangale", "Kagal", "Karvir", "Panhala", "Radhanagari", "Shahuwadi", "Shirol"],
    "Latur": ["Ahmadpur", "Ausa", "Chakur", "Deoni", "Jalkot", "Latur", "Nilanga", "Renapur", "Shirur Anantpal", "Udgir"],
    "Mumbai City": ["Mumbai City"],
    "Mumbai Suburban": ["Andheri", "Borivali", "Kurla"],
    "Nagpur": ["Bhiwapur", "Hingna", "Kamptee", "Katol", "Kuhi", "Mauda", "Nagpur Rural", "Nagpur Urban", "Narkhed", "Parseoni", "Ramtek", "Savner", "Umred"],
    "Nanded": ["Ardhapur", "Bhokar", "Biloli", "Deglur", "Dharmabad", "Hadgaon", "Kandhar", "Kinwat", "Loha", "Mahur", "Mudkhed", "Mukhed", "Naigaon", "Nanded", "Umri"],
    "Nandurbar": ["Akkalkuwa", "Dhadgaon", "Nandurbar", "Navapur", "Shahada", "Talode"],
    "Nashik": ["Baglan", "Chandwad", "Deola", "Dindori", "Igatpuri", "Kalwan", "Malegaon", "Nandgaon", "Nashik", "Niphad", "Peth", "Sinnar", "Surgana", "Trimbakeshwar", "Yeola"],
    "Osmanabad": ["Bhum", "Kalamb", "Lohara", "Osmanabad", "Paranda", "Tuljapur", "Umarga", "Washi"],
    "Palghar": ["Dahanu", "Jawhar", "Mokhada", "Palghar", "Talasari", "Vasai", "Vikramgad"],
    "Parbhani": ["Gangakhed", "Jintur", "Manwath", "Palam", "Parbhani", "Pathri", "Purna", "Sailu", "Sonpeth"],
    "Pune": ["Ambegaon", "Baramati", "Bhor", "Daund", "Haveli", "Indapur", "Junnar", "Khed", "Maval", "Mulshi", "Pune City", "Purandhar", "Shirur", "Velhe"],
    "Raigad": ["Alibag", "Karjat", "Khalapur", "Mahad", "Mangaon", "Mhasala", "Murud", "Panvel", "Pen", "Poladpur", "Roha", "Shrivardhan", "Sudhagad-Pali", "Tala", "Uran"],
    "Ratnagiri": ["Chiplun", "Dapoli", "Guhagar", "Khed", "Lanja", "Mandangad", "Rajapur", "Ratnagiri", "Sangameshwar"],
    "Sangli": ["Atpadi", "Jat", "Kadegaon", "Kavathemahankal", "Khanapur (Vita)", "Miraj", "Palus", "Shirala", "Tasgaon", "Walwa"],
    "Satara": ["Jaoli", "Karad", "Khandala", "Khatav", "Koregaon", "Mahabaleshwar", "Maan", "Patan", "Phaltan", "Satara", "Wai"],
    "Sindhudurg": ["Devgad", "Dodamarg", "Kankavli", "Kudal", "Malwan", "Sawantwadi", "Vaibhavwadi", "Vengurla"],
    "Solapur": ["Akkalkot", "Barshi", "Karmala", "Madha", "Malshiras", "Mangalvedhe", "Mohol", "Pandharpur", "Sangole", "Solapur North", "Solapur South"],
    "Thane": ["Ambarnath", "Bhiwandi", "Kalyan", "Murbad", "Shahapur", "Thane", "Ulhasnagar"],
    "Wardha": ["Arvi", "Ashti", "Deoli", "Hinganghat", "Karanja", "Samudrapur", "Seloo", "Wardha"],
    "Washim": ["Karanja", "Malegaon", "Mangrulpir", "Manora", "Risod", "Washim"],
    "Yavatmal": ["Arni", "Babulgaon", "Darwha", "Digras", "Ghatanji", "Kalamb", "Kelapur", "Mahagaon", "Maregaon", "Ner", "Pusad", "Ralegaon", "Umarkhed", "Wani", "Yavatmal", "Zari Jamani"]
  };

  // State for form values
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    textArea1: '',
    textArea2: '',
    district: '',
    taluka: '',
    villageName: '',
    radioOption: '',
    paymentMethod: '',
    utrNumber: '',
    date: '',
    time: '',
    ctsNumber: '',
    ulpinNumber: ''
  });

  // State for available talukas based on selected district
  const [availableTalukas, setAvailableTalukas] = useState<string[]>([]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // If district is changed, update available talukas
    if (name === 'district') {
      const talukas = districtTalukaMap[value] || [];
      setAvailableTalukas(talukas);
      
      // Reset taluka selection when district changes
      setFormData(prevState => ({
        ...prevState,
        taluka: ''
      }));
    }
  };

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Initial districts list
  const districts = Object.keys(districtTalukaMap).sort();

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-20 h-20 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo - using image directly */}
          <img src="/images/logo.png" alt="Ashok Stambh" width="500" height="700" />
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">DIGITAL SIGNED PROPERTY CARD</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
    {/* SECTION 1 */}
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Owner's Details</h2>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner's First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                  setFormData({ ...formData, firstName: value });
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner's Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                  setFormData({ ...formData, middleName: value });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner's Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                  setFormData({ ...formData, lastName: value });
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
              />
            </div>
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
            </div>
          </div>
          </div>

         {/* Village Details */}
         <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Village Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <select 
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select a district</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taluka</label>
              <select 
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                disabled={!formData.district} // Disable until district is selected
              >
                <option value="">Select a taluka</option>
                {availableTalukas.map((taluka) => (
                  <option key={taluka} value={taluka}>{taluka}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Village Name</label>
              <input
                type="text"
                name="villageName"
                value={formData.villageName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Village Name"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Details</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">CTS Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="ctsNumber"
                value={formData.ctsNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter CTS Number"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">ULPIN Number</label>
              <input
                type="text"
                name="ulpinNumber"
                value={formData.ulpinNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter ULPIN Number"
              />
            </div>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PAYMENT SECTION</h2>
          <p className="text-sm text-gray-600 mb-4">
            A fee of Rs 15/- is required and the receipt of payment of fees should be uploaded and the UTR no should be entered in the column given below.
          </p>

          {/* Payment Method (MANDATORY) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              {['upi', 'netbanking', 'card'].map((method) => (
                <div key={method} className="flex items-center">
                  <input
                    type="radio"
                    id={method}
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={() => handleRadioChange('paymentMethod', method)}
                    required
                    className="mr-2 focus:ring-blue-400"
                  />
                  <label htmlFor={method}>{method.toUpperCase()}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scan QR Code</label>
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-2">
                <span className="text-gray-400 text-xs">QR Code</span>
              </div>
              <button
                type="button"
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Mark as Scanned
              </button>
            </div>

            <div>
              {/* UTR Number (MANDATORY) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UTR Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter UTR Number"
                />
              </div>

              {/* Payment Proof (MANDATORY) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Proof <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="paymentProof"
                          type="file"
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, PDF. Max 10 MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;