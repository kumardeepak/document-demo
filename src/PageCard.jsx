import React from "react";
import {Paper, Divider} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { highlightSentence } from './redux/actions';

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
    renderText = (text, block) => {
        
        let style = {
            position: "absolute",
            top:(text.block_id === this.state.selectedSentenceID ? text.text_top - block.text_top -20 : text.text_top - block.text_top )  + 'px',
            left: text.text_left -block.text_left + 'px',
            width: text.text_width + 'px',
            height: text.text_height + 'px',
            fontSize: text.font_size,
            fontFamily: text.font_family,
            fontWeight: text.font_family.includes("Bold")|| text.attrib && text.attrib.toLowerCase().includes("bold") && 'bold',
            textAlign: "justify",
            lineHeight: text.avg_line_height + 'px',
            // textAlignLast: "justify",
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
                onDoubleClick   = {() => {this.handleSelectedSentenceId( text)}}
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
                style       = {{width:"100%", background:"white" }}
                type        = "text" className="form-control"
                value       = {this.state.text}
                variant     = "outlined"
                id          = "mui-theme-provider-outlined-input"
                onChange    = {this.handleTextChange}
                onBlur      = {() => {this.handleClickAway()}}
                autoFocus   = {true}
                fullWidth
                multiline
            
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
    handleSelectedSentenceId = (text) =>{
        this.setState({selectedSentenceID : text.block_id, text: text.text})
        this.props.highlightSentence(text)
        
    }
    /**
     * click away listner
     */
    handleClickAway =() =>{

        this.setState({selectedSentenceID:''})
    }

    renderBlock = (block) =>{
        return(

            <div style= {{ position: "relative", top: block.text_top  + 'px',
            left: block.text_left   + 'px',
            width: block.text_width + 'px',
            height: block.text_height + 'px',
            
            border:this.props.block_highlight.block_identifier == block.block_identifier ?  "2px solid #1C9AB7":''}}
            id ={block.block_identifier}
            key = {block.block_identifier}>
            {block['texts'].map(text => this.renderText(text, block))}
            </div>
        )
    }

    renderImage = (image) => {
        let style  = { 
            position: "relative", 
            top: image.text_top + 'px', 
            left: image.text_left + 'px', 
            width: image.text_width + 'px',
            height: image.text_height + 'px',
            overflow: "hidden",
            zIndex: 1
        }
        
        return (
            <div style={style} key={image.block_identifier}>
                <img src={image.base64} alt="" />
            </div>
        )
    }

    renderPage = (page) => {
        if (page['blocks'] || (page['blocks'] && page['images'])) {
            return (
                <div>
                    <Paper elevation={2}>
                        {page['blocks'].map(block => this.renderBlock(block))}
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


const mapStateToProps = state => ({
    document_contents: state.document_contents,
    block_highlight: state.block_highlight
});
  
const mapDispatchToProps = dispatch =>bindActionCreators(
    {
        highlightSentence,
        
    },
    dispatch
);
  
export default connect(mapStateToProps, mapDispatchToProps)(PageCard);
