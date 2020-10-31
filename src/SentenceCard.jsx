import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { highlightBlock, clearHighlighBlock } from './redux/actions';
import blockReducer from './redux/reducers/blockReducer';

import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";


const styles = {
    card_active: {
        background: 'rgb(211,211,211)',
        borderRadius: 10,
        border: 0,
        color: 'green',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    card_inactive: {
        color: 'grey',
    },
    expand: {
        transform: 'rotate(0deg)',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
}

const filterOptions = (options, { inputValue }) => options;

class SentenceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showSuggestions: false,
            suggestions: [],
            cardInFocus: false,
        };
        this.textInput = React.createRef();
        this.handleUserInputText = this.handleUserInputText.bind(this);
        this.processFormSubmitPressed = this.processFormSubmitPressed.bind(this);
    }

    /**
     * api calls
     */

    async makeAPICallInteractiveTranslation() {
        const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
        await sleep(1e3); // For demo purposes.
        const countries = await response.json();
        console.log(countries)
        this.setState({
            suggestions: Object.keys(countries).map((key) => countries[key].item[0])
        })

    }

    processFormSubmitPressed(event) {
        console.log('form button pressed', event, event.target.name)
        this.setState({
            value: event.target.value,
            showSuggestions: false
        });
        event.preventDefault();
    }

    handleUserInputText(event) {
        console.log(event.target.value, event.target.name)
        this.setState({ value: event.target.value });
    }

    handleKeyDown = (event) => {
        let charCode = String.fromCharCode(event.which).toLowerCase();
        /**
         * Ctrl+s
         */
        if ((event.ctrlKey || event.metaKey) && charCode === 's') {
            event.preventDefault();
            this.setState({ value: this.props.s0_tgt });
            return false
        }

        /**
         * user requesting for suggestions
         */
        var TABKEY = 9;
        if (event.keyCode === TABKEY) {
            event.preventDefault();
            this.setState({ showSuggestions: true })
            this.makeAPICallInteractiveTranslation()
            return false
        }
    }

    handleClickAway = () => {
        this.setState({
            cardInFocus: false,
        })
        this.props.clearHighlighBlock()
    };

    renderSourceSentence = () => {
        return (
            <div>
                <Typography color="textSecondary" gutterBottom>
                    Source sentence
                    <br />
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    {this.props.sentence.s0_src}
                    <br />
                </Typography>
            </div>
        )
    }

    renderMTTargetSentence = () => {
        return (
            <div>
                <Divider />
                <Typography color="textSecondary" gutterBottom>
                    Matchine translated
                    <br />
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    {this.props.sentence.s0_tgt}
                    <br />
                </Typography>
                <Divider />
            </div>
        )
    }

    renderUserInputArea = () => {
        return (
            <form onSubmit={this.processFormSubmitPressed} name={this.props.sentence.s_id}>
                <div>
                    <Autocomplete
                        filterOptions={filterOptions}

                        getOptionLabel={(option) => {
                            return option.name
                        }}

                        renderOption={(option, index) => {
                            return (<Typography noWrap>{option.name}</Typography>)
                        }}

                        options={this.state.suggestions}
                        inputValue={this.state.value}
                        fullWidth
                        open={this.state.showSuggestions}
                        loading={true}
                        loadingText={'Loading ...'}
                        onChange={(event, newValue) => {
                            console.log('onChange of autocomplete is fired: ', newValue)
                            this.setState({
                                value: this.state.value + ' ' + newValue.name,
                                showSuggestions: false
                            });
                            // filterOptions(event, newValue);
                        }}
                        onClose={(event, newValue) => {
                            this.setState({
                                showSuggestions: false
                            });
                        }}
                        renderInput={params => (
                            <TextField {...params} label="Enter translated sentence"
                                helperText="Ctrl+s to save, TAB key to get suggestions of your choice"
                                type="text"
                                name={this.props.sentence.s_id}
                                value={this.state.value}
                                onChange={this.handleUserInputText}
                                fullWidth
                                multiline
                                variant="outlined"
                                onKeyDown={this.handleKeyDown}
                                inputRef={this.textInput}
                                onFocus={event => {
                                    console.log(event.target.name, this.props.sentence.src)
                                    this.props.highlightBlock(this.props.sentence)
                                }}
                            />
                        )} />
                </div>
                <br />
                <Button type="submit" variant="outlined" color="primary" value={'SUBMIT'}>
                    SAVE
                </Button>
                <Button type="submit" variant="outlined" color="primary">
                    MERGE
                </Button>
            </form>
        )
    }

    renderSentenceSaveStatus = () => {
        if (this.props.sentence.save) {
            return (
                <Chip size="medium" label={"sentence saved"} style={{ 'margin': 4 }} color="primary" />
            )
        }
        return (
            <Chip size="medium" label={"sentence saved"} style={{ 'margin': 4 }} color="primary" />
        )
    }

    handleCardExpandClick = () => {
        this.setState({ cardInFocus: !this.state.cardInFocus })
        
        this.textInput && this.textInput.current && this.textInput.current.focus();
    }

    render() {
        return (
            <ClickAwayListener mouseEvent="onMouseDown" onClickAway={this.handleClickAway}>
                <div key={12} style={{ padding: "1%" }}>
                    <Card style={this.state.cardInFocus ? styles.card_active : styles.card_inactive}
                    // onClick={(event) => {
                    //     this.setState({ cardInFocus: true })
                    //     // this.textInput.current.focus();
                    // }}
                    >
                        <CardContent style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "90%" }}>
                                {this.renderSourceSentence()}
                            </div>
                            <div style={{ width: "10%", textAlign: "right" }}>
                                <IconButton aria-label="settings"
                                    style={this.state.cardInFocus ? styles.expandOpen : styles.expand}
                                     onClick={this.handleCardExpandClick}>
                                    <ExpandMoreIcon />
                                </IconButton>
                            </div>
                        </CardContent>

                        <Collapse in={this.state.cardInFocus} timeout="auto" unmountOnExit>
                            <CardContent>
                                {this.props.sentence.save ? <div></div> : this.renderMTTargetSentence()}
                                <br />
                                {this.renderUserInputArea()}
                                <br />
                                {this.renderSentenceSaveStatus()}
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            </ClickAwayListener>
        )
    }
}

const mapStateToProps = state => ({
    sentence_highlight: state.sentence_highlight
    
    // document_contents: state.document_contents
});
  
const mapDispatchToProps = dispatch =>bindActionCreators(
    {
        highlightBlock,
        clearHighlighBlock
    },
    dispatch
);
  
export default connect(mapStateToProps, mapDispatchToProps)(SentenceCard);
