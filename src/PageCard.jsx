import React from "react";
import {Paper, Divider} from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
const { v4 }        = require('uuid');

class PageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
                        value: ''
                    };
        this.handleTextChange        = this.handleTextChange.bind(this);
       
    }


    /**
     * render Sentences
     */
    renderText = (text) => {
        let style = {
            position: "relative",
            top: text.text_top     + 'px',
            left: text.text_left   + 'px',
            width: text.text_width + 'px',
            height: text.text_height + 'px',
            fontSize: text.font_size,
            fontFamily: text.font_family,
            fontWeight: text.font_family.includes("Bold") && 'bold',
            textAlign: "justify",
            lineHeight: text.avg_line_height + 'px',
            zIndex: text.block_id === this.state.selectedSentenceID ?100000 :2
            // textDecorationLine: this.props.sentence.underline ? "underline" : ""
        };
        return (
           
            <div style={style} key ={text.block_id} ref ={text.block_id}>
                {text.block_id === this.state.selectedSentenceID ?
                    this.renderTextField(text)
                :
                    this.renderTextSpan(text)
                }
            </div>
        )
    }

    /**
     * render Sentences span
     */
    renderTextSpan = (text) =>{
        return(
            <span 
                style           = {{zIndex:1}}
                id              = {text.block_id} 
                onDoubleClick   = {() => {this.handleSelectedSentenceId(text.block_id, text.text)}}
            >
                {text.text}
            </span>
        )
    }

    /**
     * sentence change
     */
    handleTextChange(event){
        this.setState({text: event.target.value});
    }
    
    /**
     * render sentence edit
     */
    renderTextField = () => {
        return( 
            <TextField
                style       = {{width:"100%", background:"white"}}
                type        = "text" className="form-control"
                value       = {this.state.text}
                variant     = "outlined"
                id          = "mui-theme-provider-outlined-input"
                onChange    = {this.handleTextChange}
                onBlur      = {() => {this.handleClickAway()}}
                autoFocus   = {true}
            />               
        )
    }

    handleSourceScroll(s_id) {

        this.refs["3d23363e36a049d2908fc6302a2d6a50"] && this.refs["3d23363e36a049d2908fc6302a2d6a50"].scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "center"
          });
    }
    
    /**
     * render sentence edit
     */
    handleSelectedSentenceId = (selectedSentenceID, text) =>{
        this.setState({selectedSentenceID , text})
    }
    /**
     * click away listner
     */
    handleClickAway =() =>{
        console.log(this.state.text)
        this.setState({selectedSentenceID:''})
    }

    renderImage = (image) => {
        let style  = { 
            position: "relative", 
            top: image.text_top + 'px', 
            left: image.text_left + 'px', 
            width: image.text_width + 'px',
            height: image.text_height + 'px',
            overflow: "hidden",
            zIndex: 2
        }
        
        return (
            <div style={style} key={image.block_identifier}>
                <img src={image.base64} alt="" />
            </div>
        )
    }

    renderPage = (page) => {
        if (page['texts'] || (page['texts'] && page['images'])) {
            return (
                <div>
                    <Paper elevation={2}>
                        {page['texts'].map(text => this.renderText(text))}
                        {page['images'].map(image => this.renderImage(image))} 
                    </Paper>
                    <Divider />
                </div>
                
            )
        }
        return(
            <div></div>
        )
    }

    render() {
        return (
            <div>
                {this.renderPage(this.props.page)}
            </div>
        )
    }

}

export default PageCard;