import React from 'react'

export const Keyboard = () => {
  return (
    <div className="px-8">
      <div className="mt-4 mb-1 flex w-full justify-center gap-1">
        <kbd className="kbd">q</kbd>
        <kbd className="kbd">w</kbd>
        <kbd className="kbd">e</kbd>
        <kbd className="kbd">r</kbd>
        <kbd className="kbd">t</kbd>
        <kbd className="kbd">y</kbd>
        <kbd className="kbd">u</kbd>
       
      </div>
      <div className="my-1 flex w-full justify-center gap-1">
        <kbd className="kbd">a</kbd>
        <kbd className="kbd">s</kbd>
        <kbd className="kbd">d</kbd>
        <kbd className="kbd">f</kbd>
        <kbd className="kbd">g</kbd>
        <kbd className="kbd">h</kbd>
       
      </div>
      <div className="my-1 flex w-full justify-center gap-1">
        <kbd className="kbd">z</kbd>
        <kbd className="kbd">x</kbd>
        <kbd className="kbd">c</kbd>
        <kbd className="kbd">v</kbd>
        <kbd className="kbd">b</kbd>       
      </div>
    </div>
  )
}

export default Keyboard
