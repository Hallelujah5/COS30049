import "./aboutUs.css";
import phuc from '../../../assets/images/aboutus/phuc.png'
import phale from '../../../assets/images/aboutus/phale.png'
import thinh from '../../../assets/images/aboutus/thinh.png'


const testimonies = [
    {name: "Tran Bao Phuc", img: phuc, text: "Radipisicing elit. Reiciendis quibusdam fugiat accusantium laboriosam architecto deleniti eos facilis exercitationem dolores nisi commodi, et adipisci, similique voluptas distinctio velit asperiores expedita officia."}, 
    {name: "Nguyen Pha Le", img: phale, text: "Lorem ipsum, dolor sit amet consectetur adip elit. Reiciendis quibusdam fugiat accusantium laboriosam architecto deleniti eos facilis exercitationem dolores nisi commodi, et adipisci, similique voluptas distinctio velit asperiores expedita officia."}, 
    {name: "Nguyen Trung Thinh", img: thinh, text: "Lorem ipsum, dolor sit amet consectetur adipism laboriosam architecto deleniti eos facilis exercitationem dolores nisi commodi, et adipisci, similique voluptas distinctio velit asperiores expedita officia."}
] 



const AboutUs = () => {

    
  return (
    <div className="container py-5 text-white mt-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold lh-1 outfit-bold about-us-title">ABOUT US</h1>
      </div>
      <div className="row justify-content-center">

    {testimonies.map((testimony, index) => (
        <div id="individual" className="col-md-4 d-flex justify-content-center mb-5" key={index}>
        <div className="testimonial-card p-3 text-center shadow-lg">
        <img
            src={testimony.img}
            alt={testimony.name}
            className="rounded-circle mb-3"
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

export default AboutUs;
