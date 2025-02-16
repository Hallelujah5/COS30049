import "./aboutUs.css";
import phuc from '../../../assets/images/aboutus/phuc.png'
import phale from '../../../assets/images/aboutus/phale.png'
import thinh from '../../../assets/images/aboutus/thinh.png'


const testimonies = [
    {name: "Tran Bao Phuc", img: phuc, text: "Bao Phuc is one of our talented front-end developers. With a strong background in software development, Phuc specializes in building the user interface of Xyora using React JS. His expertise in crafting intuitive, user-friendly designs ensures that our platform offers an exceptional experience for all users."}, 
    {name: "Nguyen Pha Le", img: phale, text: "Pha Le is also a key player on the front-end team. Like Phuc, Le focuses on developing the sleek and responsive interface of Xyora, leveraging her skills in React JS. With a deep understanding of software development, Le ensures the platform is visually engaging and easy to navigate for all NFT traders."}, 
    {name: "Nguyen Trung Thinh", img: thinh, text: "As the team leader,Trung Thinh holds a pivotal role in both backend development and overseeing the project’s progress. Specializing in Artificial Intelligence, Thinh is responsible for the backend of Xyora, including smart contracts and database configuration. In addition to his technical expertise, he leads the team, ensuring effective collaboration and managing the testing process to maintain high standards throughout the project."}
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
