import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';

const apiUrl = import.meta.env.VITE_APP_API_URL;


interface UploadFormProps {
    token: string;
}

const UploadForm: React.FC<UploadFormProps> = ({ token }) => {
    const [link, setLink] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [year, setYear] = useState<number | ''>('');
    const [isJournal, setIsJournal] = useState<boolean>(false);

    const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
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

    const handleIsJournalChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsJournal(event.target.checked);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!link || !name || !author || !year) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('author', author);
        formData.append('year', year.toString());
        formData.append('isJournal', isJournal.toString());
        formData.append('link', link);

        try {
            // const response = await fetch(apiUrl + 'upload', {
            //     method: 'POST',
            //     body: formData,
            // });
            const response = await axios.post(apiUrl + 'articles', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            if (response.status == 200) {
                alert('Successfully uploaded article!')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
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
                <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
                    Enter article link:
                </label>
                <input
                    type="text"
                    id="linkInput"
                    accept="application/pdf"
                    onChange={handleLinkChange}
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"                />
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

            <div className="mb-4">
                <label htmlFor="isJournalInput" className="flex items-center">
                    <input
                        type="checkbox"
                        id="isJournalInput"
                        checked={isJournal}
                        onChange={handleIsJournalChange}
                        className="h-5 w-5 text-slate-600 border-gray-300 rounded focus:ring-slate-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Main Journal (will overwrite for specified year!)</span>
                </label>
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
