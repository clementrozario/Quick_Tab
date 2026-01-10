import { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Quick Tab</h1>
        <p className="text-lg text-gray-700 mb-4">welcome to the quick tab we will get invoice</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-duration-300"
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App;