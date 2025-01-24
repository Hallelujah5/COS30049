import React from "react";
import "./testimonials.css";
import oliviaImg from "../../../images/testimonial/m1.png";
import evanImg from "../../../images/testimonial/m2.png";
import jessicaImg from "../../../images/testimonial/m3.png";




const testimonies = [
    {name: "Olivia Cole", img: oliviaImg, text: "Radipisicing elit. Reiciendis quibusdam fugiat accusantium laboriosam architecto deleniti eos facilis exercitationem dolores nisi commodi, et adipisci, similique voluptas distinctio velit asperiores expedita officia."}, 
    {name: "Evan White", img: evanImg, text: "Lorem ipsum, dolor sit amet consectetur adip elit. Reiciendis quibusdam fugiat accusantium laboriosam architecto deleniti eos facilis exercitationem dolores nisi commodi, et adipisci, similique voluptas distinctio velit asperiores expedita officia."}, 
    {name: "Jessica Page", img: jessicaImg, text: "Lorem ipsum, dolor sit amet consectetur adipism laboriosam architecto deleniti eos facilis exercitationem dolores nisi commodi, et adipisci, similique voluptas distinctio velit asperiores expedita officia."}
] 



const Testimonials = () => {

    
  return (
    <div className="container py-5 text-white">
      <div className="text-center mb-5">
        <p className="outfit subheading-text">TESTIMONIALS</p>
        <h2 className="display-5 fw-bold lh-1 mb-3 outfit-bold">Read What Others Have To Say</h2>
      </div>
      <div className="row justify-content-center">

    {testimonies.map((testimony, index) => (
        <div className="col-md-3 d-flex justify-content-center mb-1" key={index}>
        <div className="testimonial-cards p-3 text-center shadow-lg ">
          <img
            src={testimony.img}
            alt={testimony.name}
            className="rounded-circle mb-3"
            style={{ width: "7.5em", height: "7.5em", objectFit: "cover" }}
          />
          <h5 className="outfit subheading-text">{testimony.name.toUpperCase()}</h5>
          <p className="bodytext">
            {testimony.text}
          </p>
        </div>
      </div>

    ))}


      </div>
    </div>
  );
};

export default Testimonials;
