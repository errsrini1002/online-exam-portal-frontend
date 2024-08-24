import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { Link } from "react-router-dom";
import exam_1 from "../images/exam_1.png";
import exam_2 from "../images/exam_2.png";
import React, { useState, useEffect } from "react";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;


<link href="path/to/tailwind.min.css" rel="stylesheet"></link>

const HomePage = () => {

  const [data, setData] = useState([]);

  /* const data = [
    { class: 'Year 4', time: '6 PM to 7 PM', days: 'MON,TUE' },
    { class: 'Year 5', time: '5 PM to 6 PM', days: 'MON,THUR' },
    { class: 'Year 6', time: '7 PM to 8 PM', days: 'MON,THUR,SAT' },
    { class: 'Year 7', time: '6 PM to 7 PM', days: 'WED,FRI' },
    { class: 'Year 8', time: '7 PM to 8 PM', days: 'WED,FRI' },
    { class: 'GCSE', time: '6 PM to 7 PM', days: 'THUR,FRI' },
  ]; */

  useEffect(() => {
    fetch(url +'/schedules')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);


  return (
    <div className="container-fluid mb-2">
      {/* <Carousel /> */}

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 text-color">
            <h1>Welcome to Base Tutorials </h1>
            <p>
              <br></br>

              <h3>
                Maximize your learning with our personalized sessions
              </h3>
            </p>
            <ul>

              <li>3 Weekly sessions, each lasting one hour.</li>
              <li>The syllabus is coverd topic by topic.</li>
              <li>Topic specific exams.</li>
              <li>Mock exams.</li>
              <li>Separate sessions for Year 4, Year 5, Year 6, Year 7, Year 8, Year 9, GCSE and A Level.</li>

            </ul>
            <br></br>

            <h3>We offer both individual and group sessions. </h3>

            <div className="overflow-x-auto">
  <table className="table-auto min-w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-blue-600 text-blue">
        <th className="px-4 py-2 border border-gray-300 text-left font-bold">Class</th>
        <th className="px-4 py-2 border border-gray-300 text-left font-bold">Time</th>
        <th className="px-4 py-2 border border-gray-300 text-left font-bold">Days</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-gray-100">
        <td className="px-4 py-2 border border-gray-300 font-bold">Year 4</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">6 PM to 7 PM</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">MON, TUE</td>
      </tr>
      <tr className="bg-white">
        <td className="px-4 py-2 border border-gray-300 font-bold">Year 5</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">5 PM to 6 PM</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">MON, THUR</td>
      </tr>
      <tr className="bg-gray-100">
        <td className="px-4 py-2 border border-gray-300 font-bold">Year 6</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">7 PM to 8 PM</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">MON, THUR, SAT</td>
      </tr>
      <tr className="bg-white">
        <td className="px-4 py-2 border border-gray-300 font-bold">Year 7</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">6 PM to 7 PM</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">WED, FRI</td>
      </tr>
      <tr className="bg-gray-100">
        <td className="px-4 py-2 border border-gray-300 font-bold">Year 8</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">7 PM to 8 PM</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">WED, FRI</td>
      </tr>
      <tr className="bg-white">
        <td className="px-4 py-2 border border-gray-300 font-bold">GCSE</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">6 PM to 7 PM</td>
        <td className="px-4 py-2 border border-gray-300 font-bold">THUR, FRI</td>
      </tr>
    </tbody>
  </table>
</div>


            <p>
              <p>
                <h3>
                  <br></br>

                  11 plus Mock Exams
                </h3>
              </p>
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
            <br></br>

            <h1 className="ms-5">Simplify and Upgrade Your skills</h1>
            {/* <p className="ms-5">
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
            </p> */}
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
