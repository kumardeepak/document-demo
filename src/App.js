import React from 'react';
import SentenceCard from './SentenceCard';
import PageCard from './PageCard';
import sampleData from './fetch_content_002.json'
import {Paper, Grid, GridList, Container, Typography, Divider} from "@material-ui/core";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const PAGE_OPS      = require("./page.operations");
const BLOCK_OPS     = require("./block.operations");
const { v4 }        = require('uuid');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

    /**
     * render Document pages
     */
    renderDocumentPages = () => {
      let pages = PAGE_OPS.get_pages_children_information(sampleData.data);
      if (pages.length < 1) {
        return(
            <div></div>
        )
      }
      return(
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Paper style={{overflow:'scroll', height:window.innerHeight}}>
            {pages.map(page => <PageCard key={v4()} page={page} />)}
          </Paper>
        </Grid>
      )
    }

    /***
     * render sentences
     */
    renderSentences = () => {
      let pages = PAGE_OPS.get_pages_children_information(sampleData.data);
      if (pages.length < 1) {
        return(
            <div></div>
        )
      }
      return (
          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <Paper style={{overflow:'scroll', height:window.innerHeight}}>
              {pages.map(page => page['translated_texts'].map(sentence => <SentenceCard key={v4()} sentence={sentence}/>) )}
            </Paper>
          </Grid>
        
      )
    }

    /**
     * render functions ends here
     */

    render() {
        return (
        <div>
            <Grid container spacing={2} style={{ padding: "50px 24px 0px 24px" }}>
              
                {this.renderDocumentPages()}
                {this.renderSentences()}

            </Grid>
        </div>
        )
    }
    
}
export default App;
