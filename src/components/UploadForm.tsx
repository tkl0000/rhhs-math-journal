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
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
                    Select PDF file:
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-800 hover:file:bg-slate-100"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700">
                    Name:
                </label>
                <input
                    type="text"
                    id="nameInput"
                    value={name}
                    onChange={handleNameChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="authorInput" className="block text-sm font-medium text-gray-700">
                    Author:
                </label>
                <input
                    type="text"
                    id="authorInput"
                    value={author}
                    onChange={handleAuthorChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="yearInput" className="block text-sm font-medium text-gray-700">
                    Year:
                </label>
                <input
                    type="number"
                    id="yearInput"
                    value={year}
                    onChange={handleYearChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-slate-600 text-white py-2 px-4 rounded-md shadow hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
                Upload
            </button>
        </form>
    );

}

export default UploadForm;
