import React, { Component } from 'react';
import { CSVReader } from "react-papaparse"





function UploadCategorys() {

const buttonRef = React.createRef();

function handleOpenDialog(e) {
            // Note that the ref is set async, so it might be null at some point
            if (buttonRef.current) {
                buttonRef.current.open(e);
              }
}
 
    
function  handleOnFileLoad(data) {
        console.log('---------------------------');
        console.log(data);
        console.log('---------------------------');
      };
    
      function  handleOnError(err, file, inputElem, reason){
        console.log('---------------------------');
        console.log(err);
        console.log('---------------------------');
      };
    
      function handleOnRemoveFile (data) {
        console.log('---------------------------');
        console.log(data);
        console.log('---------------------------');
      };
    
      function handleRemoveFile (e) {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e);
        }
      };


    return(
        
        <CSVReader
       
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        // noClick
        // noDrag
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        >
        <span>Click to upload Category file.</span>
      </CSVReader>
    )
}

export default UploadCategorys
