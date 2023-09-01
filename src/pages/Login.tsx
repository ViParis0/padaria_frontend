import React, { useState } from "react";
import Header from "../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="md:w-1/2 m-auto min-h-screen bg-slate-200">
      <Header />
      <div className="bg-stone-200 min-h-screen flex items-center justify-center">
        <form className="bg-white p-20 rounded-2xl shadow-lg">
          <h1 className="text-5xl mb-10">Login</h1>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
            <input
              className="shadow appearance-none border rounded
              w-full py-2 px-3 text-gray-700 leading-tight
               focus:outline-none focus:shadow-outline"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
            <input
              className="shadow appearance-none border
              rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
               focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                        rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            entrar
          </button>
        </form>
      </div>
    </div>
  );
}
