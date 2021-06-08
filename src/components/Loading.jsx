import { Dropdown, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'

function Loading() {
    
    return(
        <div class="ui segment">
        <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
        </div>
        <p></p>
    </div>
    )
}

export default Loading