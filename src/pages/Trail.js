import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const modules = {
      toolbar: [
        ["bold", "italic", "underline"],
        ["image", "link"],
      ],
    };

    return (
      <ReactQuill
        theme="snow"
        value={this.state.value}
        onChange={this.handleChange}
        modules={modules}
      />
    );
  }
}

export default RichEditor;
