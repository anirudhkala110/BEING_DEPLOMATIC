import React from 'react'
import FileUpload from './FileUpload'

const NewEntry = () => {
  return (
    <div>
        <div className="container fs-3 fw-bold">Create New Entry</div>
        <hr/>
        <div>
            <FileUpload/>
        </div>
    </div>
  )
}

export default NewEntry