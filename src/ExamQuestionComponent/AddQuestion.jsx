import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;

function AddQuestion() {

  let navigate = useNavigate();
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [year, setYear] = useState('');
  const [testNo, setTestNo] = useState('');
  const [qno, setQno] = useState('');
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('year', year);
    formData.append('testNo', testNo);
    formData.append('qno', qno);
    formData.append('image', image);
    formData.append('answer', answer);
    formData.append('description', description);

    try {
      const response = await fetch(url +'/exam/question/addQuestion', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data' should not be set here as the browser will set the correct boundary automatically
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Question added successfully');
    } catch (error) {
      console.error('There was an error adding the question!', error);
    }
  };

  return (
    <div>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Year:</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label>Test No:</label>
          <input type="text" value={testNo} onChange={(e) => setTestNo(e.target.value)} required />
        </div>
        <div>
          <label>Question No:</label>
          <input type="number" value={qno} onChange={(e) => setQno(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <div>
          <label>Answer:</label>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddQuestion;
