import React from 'react';
import SentenceCard from './SentenceCard';
import PageCard from './PageCard';
import sampleData from './fetch_content_002.json'
import {Paper, Grid, CircularProgress} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

const PAGE_OPS = require("./page.operations");
const BLOCK_OPS = require("./block.operations");
const { v4 } = require('uuid');

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  fetchDocumentPages = () => {
    console.log('fetching more pages')
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
        <InfiniteScroll height={1200}
          next={this.fetchDocumentPages}
          hasMore={(sampleData.count > sampleData.data.length) ? true : false }
          dataLength={pages.length}
          loader={<div style={{ textAlign: "center" }}> <CircularProgress size={20} style={{zIndex: 1000}}/></div>}
          endMessage={ <div style={{ textAlign: "center" }}><b>You have seen it all</b></div> }
        >
          {pages.map(page => <PageCard key={v4()} page={page} />)}
        </InfiniteScroll>
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
          <InfiniteScroll height={1200}
              next={this.fetchDocumentPages}
              hasMore={(sampleData.count > sampleData.data.length) ? true : false }
              dataLength={pages.length}
              loader={<div style={{ textAlign: "center" }}> <CircularProgress size={20} style={{zIndex: 1000}}/></div>}
              endMessage={ <div style={{ textAlign: "center" }}><b>You have seen it all</b></div> }
          >
            {pages.map(page => page['translated_texts'].map(sentence => <SentenceCard key={v4()} sentence={sentence}/>) )}
          </InfiniteScroll>
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
