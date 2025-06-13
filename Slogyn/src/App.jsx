import { useState } from 'react';
import axios from 'axios';
import './App.css';
import RandomFacts from '../components/randomFacts';
import { SloganOutput } from '../components/sloganOutput';
import SloganGeneratorForm from '../components/sloganGeneratorForm';
import RANDOM_FACTS from '../data/randomFacts';
// import { InferenceClient } from "@huggingface/inference";

const API_URL = "https://slogan-generator-3-452522242685.us-central1.run.app";


function App() {
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("playful");
  const [slogans, setSlogans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ showFacts, setShowFacts] = useState(false);

  const num = 7;   //number of output from one prompt, as there are two prompts


  const generateSlogans = async (likedSlogan = null) => {
    setLoading(true);
    setError("");
    setShowFacts(false); //initially hidden

    const factTimer = setTimeout(() => {setShowFacts(true)}, 3000);  //loaded after delay of 3 sec

    try {
      const response = await axios.post(`${API_URL}/`, {
        brand,
        description,
        industry,
        tone,
        num: 7,
        liked_slogan: likedSlogan
      });
      
      setSlogans(response.data.slogans);

    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to generate slogans');
      console.error('API Error:', error);
    }
    clearTimeout(factTimer);
    setShowFacts(false);
    setLoading(false);
  };



      // const [res1, res2] = await Promise.all([
      //   client.textGeneration({
      //     model: "Ujjwal20/slogan-generator-medium",
      //     inputs: prompt1,
      //     parameters: {
      //       ...tonePresets[tone],
      //       max_new_tokens: 20
      //     }
      //   }),
      //   client.textGeneration({
      //     model: "Ujjwal20/slogan-generator-medium",
      //     inputs: prompt2,
      //     parameters: {
      //       ...tonePresets[tone],
      //       max_new_tokens: 20
      //     }
      //   })
      // ]);

      // const processResponse = (response)=>{
      //   if (response.data?.error) {
      //     throw response.data.error
      //   };
        
      //   return response.data.map(
      //     item=>{
      //       const text = item.generated_text;   // || ''
      //       return text.split('Slogan:').pop().split('\n')[0].trim().replace(/["()]/g, '');
      //     }
      //   );
      // };

      // // const slogan1 = processResponse(res1);
      // // const slogan2 = processResponse(res2);
      // // const totalSlogans = [...slogan1, ...slogan2];
      // const slogans1 = res1.generated_text.split('Slogan:').pop().split('\n')[0].trim().replace(/["()]/g, '');
      // const slogans2 = res2.generated_text.split('Slogan:').pop().split('\n')[0].trim().replace(/["()]/g, '');
      // const allSlogans = [slogans1, slogans2];
      // const uniqueSlogans = [...new Set(totalSlogans)].filter(s => s.length > 4).slice(0, num*2);

      // setSlogans(uniqueSlogans);
      // }
      
      // catch (err) {
      //     setError(err.message || 'Failed to generate slogans');
      //     console.error('API Error:', err);
      // }

      // setLoading(false);
      // };

      // //generate similar slogans
      // const generateMoreLikeThis = (slogan)=>{
      //   generateSlogans(slogan);
      // };

      // //form submission
      // const handleSubmit = (e) =>{
      //   e.preventDefault();
      //   generateSlogans();
      // };

      
      // const handleFormChange = (newState) =>{
      //   setBrand(newState.brand);
      //   setIndustry(newState.industry);
      //   setDescription(newState.description);
      //   setTone(newState.tone);
      // };

    const generateMoreLikeThis = (slogan) => {
      generateSlogans(slogan);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      generateSlogans();
    };

    const handleFormChange = (newState) => {
      setBrand(newState.brand);
      setIndustry(newState.industry);
      setDescription(newState.description);
      setTone(newState.tone);
    };



  return (
    <>
    <header className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-6 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-4">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Slogyn
        </h1>
        <p className="mt-2 text-lg font-medium text-white/80">
          Make your mark. One slogan at a time.
        </p>
      </div>
    </header>
      <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-200 p-8">
          <div className="max-w-4xl mx-auto mb-8 p-8 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <SloganGeneratorForm 
              brand= {brand}
              description= {description}
              industry= {industry}
              tone= {tone}
              onFormChange= {handleFormChange}
              onSubmit= {handleSubmit}
              loading= {loading}
              num = {num}
            />
          </div>

          {/* displaying random facts, while loading the slogans */}
          <div className="max-w-4xl mx-auto animate-fadeIn">
            {loading && showFacts && (
              <RandomFacts facts={RANDOM_FACTS} intervalDuration={5000} />
            )}
          </div>
          <div className="hidden random-fact bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 backdrop-blur-sm flex flex-row items-center justify-between p-4 m-2 min-h-[60px] rounded-xl shadow-lg ring-orange-600">
              {/* <span className='text-lg text-gray-800 font-medium break-words flex-1'>
                  {currentFact}
              </span> */}
          </div>

          {error && <div className="max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>}


          {/* idk why, but after putting this same css from the sloganGeneratorForm here and hiding it, the css is correctly working, else it is breaking */}
          <button
          type="button"
          className="hidden font-sans mt-4 flex items-center justify-center px-8 py-4 text-white rounded-xl bg-purple-600 hover:scale-105 hover:shadow-lg transition duration-150"
        >
          Generate Slogans
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



          
          <div className="max-w-4xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 animate-fadeIn">
            {slogans.map((slogan, index) => (
              <SloganOutput 
                key={index} 
                slogan={slogan} 
                onGenerateMoreLikeThis = {
                  ()=> generateMoreLikeThis(slogan)
                }
              />
            ))}
          </div>


        {/* same problem here */}
        <div className="hidden bg-white/60 backdrop-blur-sm flex flex-row items-center justify-between p-4 m-2 min-h-[60px] rounded-xl shadow-lg">
        <button
          title="Copy"
          className="hidden flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow hover:scale-105 transition duration-150"
        >
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
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          </svg>
        </button>
        <button
          title="Generate more like this"
          className="hidden flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow hover:scale-105 transition duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>

        </button>
        </div>
      </div>
    </>
  );
}

export default App;
