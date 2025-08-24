import React, { Component } from "react";
import ReactQuill from "react-quill";
import axios from "axios";

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      value: "",
    };
    this.imageHandler = this.imageHandler.bind(this);
  }

  // Custom image handler
  imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post("http://localhost:5000/articles/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const imageUrl = res.data.url;

        const editor = this.quillRef.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", imageUrl);

        // Responsive image inside editor
        const img = editor.root.querySelector(`img[src="${imageUrl}"]`);
        if (img) {
          img.setAttribute(
            "style",
            "max-width:20%; height:auto; display:block; margin:10px auto;"
          );
        }
      } catch (err) {
        console.error("Upload failed", err);
        alert("Image upload failed");
      }
    };
  }

  handleChange = (value) => this.setState({ value });
  handleTitleChange = (e) => this.setState({ title: e.target.value });

  handlePublish = async () => {
    try {
      const { title, value } = this.state;
      await axios.post("http://localhost:5000/articles/add", {
        title,
        description: value,
        author: "Sailendra", // ideally from token
      });
      alert("Article published!");
      this.setState({ title: "", value: "" });
    } catch (err) {
      console.error(err);
      alert("Publish failed");
    }
  };

  render() {
    const modules = {
      toolbar: {
        container: [["bold", "italic", "underline"], ["image", "link"]],
        handlers: { image: this.imageHandler },
      },
    };

    return (
      <div className="editor-container">
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
          className="editor-title"
        />
        <ReactQuill
          ref={(el) => (this.quillRef = el)}
          theme="snow"
          value={this.state.value}
          onChange={this.handleChange}
          modules={modules}
          className="editor-quill"
        />
        <button onClick={this.handlePublish} className="editor-btn">
          Publish
        </button>
      </div>
    );
  }
}

export default RichEditor;
