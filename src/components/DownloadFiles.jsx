import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'
import DownloadCategories from "./DownloadCategories";
import DownloadItems from "./DownloadItems";
import DownloadOrders from "./DownloadOrders";
import DownloadUsers from "./DownloadUsers";
import UploadCategorys from "./UploadCategorys";
import UploadItems from "./UploadItems";
import UploadUser from "./UploadUser";


function DownloadFiles({localFetchUrl, categoriesList, setTriggerRerender}) {


    return (
      <>

      <h1 id="csvDownload">Download files here</h1>
      <div id='scvButtons'>
      <DownloadCategories localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/>
      <DownloadItems localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/>
      <DownloadUsers  localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/>
      </div>
      {/* <div>
        <DownloadOrders localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/>
      </div> */}
      <div id='uploadFiles'>
        <div  className="uploadButton"> <UploadCategorys localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/></div>
        <div className="uploadButton"> <UploadItems localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/></div>
        <div className="uploadButton">      <UploadUser localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/></div>
     
     

      </div>
      </>
    )

}

export default DownloadFiles




