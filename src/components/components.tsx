import React from 'react'

function components() {
  return (
    <>
    <div>components ping
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
    </div>
    <button type="button" className="bg-indigo-500 ..." disabled>
  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">

  </svg>
  Processing...
</button>

<div> pulse
<div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
</div>

<div> bounce
<svg className="animate-bounce w-6 h-6 ...">
</svg>

</div>
    </>
    
  )
}

export default components