import { useState, useEffect } from "react";

const SloganGeneratorForm = ({
  brand = "",
  description = "",
  industry = "",
  tone = "playful",
  num,
  // liked_slogan = null,
  onFormChange,
  onSubmit,
  loading
}) => {
  // const [selectedTone, setSelectedTone] = useState(tone);

  const [formState, setFormState] = useState({
    brand: brand,
    description: description,
    industry: industry,
    tone: tone,
  });

  // const handleChange = (e) => {
  //   setFormState({
  //     ...formState,
  //     // [e.target.id]: e.target.value
  //   })
  // };

  const handleChange = (e)=>{
    const {id,value} = e.target;
    setFormState(prev =>({
      ...prev,
      [id]:value
    }))
  }

  useEffect(() => {
    onFormChange(formState);
  },
  [formState, onFormChange]);

  return (
    <div className="">
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label 
          htmlFor="brand" 
          className="font-sans block text-gray-800 font-bold text-xl"
        >
          Brand Name
        </label>
        <input
          id="brand"
          type="text"
          placeholder="Enter brand name"
          defaultValue={formState.brand}
          onChange={handleChange}
          className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 bg-white"
        />
      </div>


      <div className="mb-6">
        <label 
          htmlFor="description" 
          className="font-sans block text-gray-800 font-bold text-xl"
        >
          Brand Description
        </label>
        <textarea
          id="description"
          placeholder="Describe your brand"
          defaultValue={formState.description}
          onChange={handleChange}
          className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-none bg-white"
        ></textarea>
      </div>



      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2">

        <div className="flex-1 mb-4 md:mb-0">
          <label 
            htmlFor="industry" 
            className="font-sans block text-gray-800 font-bold text-xl"
          >
            Industry
          </label>
          <input
            id="industry"
            type="text"
            placeholder="e.g. Fashion, Tech, Food"
            defaultValue={formState.industry}
            onChange={handleChange}
            className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 bg-white"
          />
        </div>


        <div className="w-full md:w-1/3">
          <label 
            htmlFor="tone" 
            className="font-sans block text-gray-800 font-bold text-xl"
          >
            Tone
          </label>
          <select
            id="tone"
            value={formState.tone}
            onChange={handleChange}
            className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 bg-white"
          >
            <option value="playful">Playful</option>
            <option value="bold">Bold</option>
            <option value="minimalist">Minimalist</option>
            <option value="luxury">Luxury</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>


      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className="font-sans mt-4 flex items-center justify-center px-8 py-4 text-white rounded-xl bg-purple-600 hover:scale-105 hover:shadow-lg transition duration-150"
        >
          {loading ? 'Generating...' : 'Generate Slogans'}
          {/* Generate Slogans */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"
            />
          </svg>
        </button>
      </div>
    </form>
    </div>
  );
};

export default SloganGeneratorForm;
