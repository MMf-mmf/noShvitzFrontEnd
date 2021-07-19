import { Dimmer, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'

function Loading() {
    
    return(
        <Segment id="loader">
        <Dimmer active>
          <Loader />
        </Dimmer>
    
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
    )
}

export default Loading