import React, { useState, ChangeEvent, FormEvent } from 'react';

function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [year, setYear] = useState<number | ''>('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthor(event.target.value);
    };

    const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setYear(Number(event.target.value) || '');
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!file || !name || !author || !year) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('author', author);
        formData.append('year', year.toString());

        try {
            const response = await fetch('http://localhost:3000/articles/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                alert('File uploaded successfully!');
            } else {
                console.error('Error:', response.statusText);
                alert('File upload failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fileInput">Select PDF file:</label>
                <input
                    type="file"
                    id="fileInput"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <label htmlFor="nameInput">Name:</label>
                <input
                    type="text"
                    id="nameInput"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="authorInput">Author:</label>
                <input
                    type="text"
                    id="authorInput"
                    value={author}
                    onChange={handleAuthorChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="yearInput">Year:</label>
                <input
                    type="number"
                    id="yearInput"
                    value={year}
                    onChange={handleYearChange}
                    required
                />
            </div>
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadForm;
