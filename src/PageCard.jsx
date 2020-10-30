import React from "react";
import {Paper, Divider} from "@material-ui/core";

const { v4 }        = require('uuid');

class PageCard extends React.Component {
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
            zIndex: 1
            // textDecorationLine: this.props.sentence.underline ? "underline" : ""
        };
        return (
            <div style={style} key={v4()}>
                <span id={text.block_identifier}>{text.text}</span>
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