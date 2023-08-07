import React, { useState } from "react";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(prompt);
    try {
      const response = await fetch("/api/run-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motion_module: "mm_sd_v14",
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while running the model.");
      }

      const data = await response.json();
      setOutput(data); // Assuming the API returns the output in JSON format
    } catch (error) {
      console.error("Error running the model:", error);
      setOutput({ error: "An error occurred while running the model." });
    }
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-100">
              Enter your prompt
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-300"
                    type="text"
                  >
                    Enter your prompt
                  </label>
                  <textarea
                    id="message"
                    placeholder="eg. A cute little Panda"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-300 rounded text-lg"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font h-10">
        <div className="container px-5 py-24 mx-auto h-8">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-200">
                Your image will appear here
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              If you dont get satisfactory results try tweaking the prompt. How
              much good result you will get depends on the information available
              in the prompt.
            </p>
          </div>
        </div>
      </section>

      {output && (
        <div className="flex justify-center items-center h-screen">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-xl w-1/2 h-1/2">
        
            <video
              className="w-full h-full object-cover"
              src={output}
              alt="content"
              controls
            />
            <div className="absolute left-0 bottom-0 w-full h-1 bg-gray-600">
              <div className="h-full bg-blue-500"></div>
            </div>
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white px-2 py-1 text-sm rounded-bl-lg">
              00:00 / 05:30 
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Prompt;
