import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Dimmer, Loader, Image,Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'
import DownloadCategories from "./DownloadCategories";
import DownloadItems from "./DownloadItems";
import DownloadOrders from "./DownloadOrders";
import DownloadUsers from "./DownloadUsers";
import UploadCategorys from "./UploadCategorys";
import UploadItems from "./UploadProducts";
import UploadUser from "./UploadUser";


function DownloadFiles({localFetchUrl, categoriesList, setTriggerRerender, setServerResponse}) {

  // let dataToUpload = useRef()
  const [dataToUpload, setDataToUpload] = useState()
  let uploadName = useRef()
  let [loading, setLoading] = useState(false)

  function uploadFiels(data) {
    console.log(dataToUpload.current,'was just cklicked')
    console.log(uploadName.current)

    if (dataToUpload) {
      setLoading(true)
      fetch(`${localFetchUrl}/${uploadName.current}`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpload),
    })
        .then((r) => r.json())
        .then((data) => {
        console.log(data);
        const { user } = data;
        setServerResponse(data.message)
        }).catch((err) => {
          console.log(err)
        });

    }
    setLoading(false)
  }




    return (
      <>
      { loading ? 
    <Segment>
    <Dimmer active inverted>
      <Loader size='large'>Loading</Loader>
    </Dimmer>

    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
  </Segment> :
      <>

      <h1 id="csvDownload">Download files here</h1>
      <div id='scvButtons'>
      <Button.Group>
      <DownloadCategories localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender} setServerResponse={setServerResponse}/>
      <DownloadItems localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender} setServerResponse={setServerResponse}/>
      <DownloadUsers  localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender} setServerResponse={setServerResponse}/>
      </Button.Group>
      </div>
     
      <Divider />

      <h1 id="csvDownload">Upload files</h1>
      <div id='uploadFiles'>
        <div  className="uploadButton"> <UploadCategorys localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender} setDataToUpload={setDataToUpload} uploadName={uploadName}/></div>
        <div className="uploadButton"> <UploadItems localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender} setDataToUpload={setDataToUpload} uploadName={uploadName}/></div>
        <div className="uploadButton">  <UploadUser localFetchUrl={localFetchUrl} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender} setDataToUpload={setDataToUpload} uploadName={uploadName}/></div>
        <Button id="uploadButton" content='Upload File' secondary onClick={uploadFiels} className={ !dataToUpload ? 'disabled': null}></Button>
        
      </div>
      </>
}
      </>
    )

}

export default DownloadFiles



