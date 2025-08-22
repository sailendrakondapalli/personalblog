import React from "react";
class Foot extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="footer">
                <div className="colone">
                <h3>PersonalBlog</h3>
                <p>...</p>
                </div>
                <div className="coltwo">
                <h3>Information</h3>

                <a href="#contact">
                    <p>Contact Us</p>
                </a>
                </div>
                <div className="colthree">
                <h3>Social Links</h3>
                <p>Instagram</p>
                <p>X</p>
                <p>FaceBook</p>
                <p>GitHUb</p>
                <p>LinkedIn</p>
                <p>WhatsApp</p>
                </div>
            </div>
        )
    }
}
export default Foot;