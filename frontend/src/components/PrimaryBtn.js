import React from 'react'

export const PrimaryBtn = ({ handleClick, title, showplus }) => {
  return (
    <button
      onClick={() => handleClick()}
      type="submit"
      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {showplus && <svg
        className="me-1 -ms-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      }
      {title}
    </button>
  )
}
export const FloatingBtn = ({ handleClick, title, showplus }) => {
  return (
    <div className='fixed bottom-4 right-4'>
      <button
        onClick={() => handleClick()}
        type="submit"
        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        style={{ borderRadius: '999px' }}
      >
        {showplus && (
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {title}
      </button>
    </div>
  );
};


