// import React from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  reference? : any
}

export function Input({ label, placeholder, value, onChange, error, reference }:InputProps){
  return (
    <div className="flex flex-col w-full max-w-md pb-2">
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
        ref = {reference} 
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};


