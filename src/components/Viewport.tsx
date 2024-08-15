import React from 'react';
import { useState } from 'react';
const test_url = "https://web.evanchen.cc/exams/sols-OTIS-Mock-AIME-2024.pdf";

const apiUrl = process.env.REACT_APP_API_URL
const api_query = apiUrl + "articles/pdf/"

interface ViewportProps {
    filename: string;
}

const Viewport: React.FC<ViewportProps> = ({ filename }) => {

    const [index, setIndex] = useState(-1)
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    function incrementPages() {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    }

    function decrementPages() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    return (
        <div className="bg-slate-200 rounded-lg p-8">
            {/* <p className='text-black text-center'>Article Viewport</p> */}
            {/* <button onClick={() => decrementPages()} className="text-black">Left</button>
            <button onClick={() => incrementPages()} className="text-black">Right</button> */}
            <div className='overflow-y-scroll bg-black'>
                <iframe src={filename} width="100%" height="600px" title="PDF Viewer" />
            </div>
        </div >
    );
}



export default Viewport;