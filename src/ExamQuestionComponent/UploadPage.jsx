import React, { useState } from "react";

const UploadPage = () => {
    const [examId, setExamId] = useState("");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleExamIdChange = (e) => {
        setExamId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !examId) {
            alert("Please enter exam ID and select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("examId", examId);

        try {
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("File uploaded successfully");
            } else {
                const errorText = await response.text();
                console.error("Error uploading file:", errorText);
                alert("Error uploading file");
            }
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            alert("Error uploading file");
        }
    };

    return (
        <div>
            <h2>Upload Exam Questions</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Exam ID:</label>
                    <input type="text" value={examId} onChange={handleExamIdChange} required />
                </div>
                <div>
                    <label>Upload Excel File:</label>
                    <input type="file" onChange={handleFileChange} accept=".xlsx" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UploadPage;
