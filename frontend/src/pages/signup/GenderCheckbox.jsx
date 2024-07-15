import React from 'react'

export const GenderCheckbox = () => {
  return (
    <div className='flex'>
        <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
                <span className='label-text'>Male</span>
                <input type='checkbox' className='checkbox border-slate-900'/>
            </label>
        </div>
        <div>
        <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
                <span className='label-text'>FeMale</span>
                <input type='checkbox' className='checkbox border-slate-900'/>
            </label>
        </div>
        </div>
    </div>
  )
}

export default GenderCheckbox
