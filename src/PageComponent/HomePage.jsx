import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { Link } from "react-router-dom";
import exam_1 from "../images/exam_1.png";
import exam_2 from "../images/exam_2.png";

const HomePage = () => {
  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 text-color">
            <h1>Welcome to Online Exam Portal</h1>
            <p>
              Step into the future of academic excellence with our cutting-edge
              Online Exam Portal, where educational empowerment meets
              technological innovation. Effortlessly traverse your academic
              journey with ease as you embark on secure assessments,
              conveniently submit your exams, and effortlessly access your
              results.
            </p>
            <p>
              Our user-friendly interface guarantees a seamless and intuitive
              experience, providing you complete control over your academic
              endeavors from the convenience of your own device. With robust
              measures in place, rest assured that your personal information is
              secure throughout every interaction. Join us on this digital
              academic expedition and unlock a new era of examination
              convenience and confidence. Welcome to a portal that redefines the
              way you experience online exams, making learning and assessment
              smarter, safer, and more accessible than ever before.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text">
              Get Started
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src={exam_1}
              alt="Logo"
              width="400"
              height="auto"
              className="home-image"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <img
              src={exam_2}
              alt="Logo"
              width="350"
              height="auto"
              className="home-image"
            />
          </div>
          <div className="col-md-8 text-color">
            <h1 className="ms-5">Simplify Your Exam Experience</h1>
            <p className="ms-5">
              Welcome to a hassle-free academic journey with our Online Exam
              Portal, where navigating assessments is a breeze. Say goodbye to
              complexities as you effortlessly manage your exams in a
              user-friendly environment. With a straightforward interface,
              submitting exams and accessing results becomes a seamless process,
              all from the comfort of your device.
            </p>
            <p className="ms-5">
              Experience the convenience of streamlined academic assessments.
              Our platform is designed for simplicity, ensuring you can focus on
              your exams without unnecessary stress. From straightforward
              submissions to easy result retrieval, we've made online exams a
              straightforward and user-friendly experience, redefining how you
              approach assessments.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text ms-5">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
