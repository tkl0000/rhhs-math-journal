import React from 'react';
import { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const test_url = "public/articles/example1/example.pdf";

const Viewport: React.FC = () => {

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
        <div className="bg-slate-200 rounded-lg p-8 h-dvh">
            {/* <p className='text-black text-center'>Article Viewport</p> */}
            <button onClick={() => decrementPages()} className="text-black">Left</button>
            <button onClick={() => incrementPages()} className="text-black">Right</button>
            <div className='overflow-y-scroll bg-black'>
                <Document className="" file={test_url} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page className="" width={1000} pageNumber={pageNumber} renderMode="canvas" renderTextLayer={false} renderAnnotationLayer={false}></Page>
                </Document>
            </div>
            {/* <embed src={test_url} width="600" height="500" type="application/pdf"></embed> */}
        </div >
    );
}



export default Viewport;