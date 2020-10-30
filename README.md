class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    this.setState({value: "form submitted"});
    event.preventDefault();
  }

  render() {
    const {value, colour} = this.state;

    return (
        <form  onSubmit={this.handleSubmit}>
            <div >
                <TextField
                    name="title"
                    type="text"
                    value={value}
                    onChange={this.handleChange}
                    label="Title"
                    placeholder="Movie title..."
                />
            </div>

            <Button
                type="submit"
                variant="raised"
                color="primary"
            >
                ADD
            </Button>
        </form>
    );
}
}
export default App;