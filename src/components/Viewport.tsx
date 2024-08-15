import React from 'react';

interface ViewportProps {
    filename: string;
}

const Viewport: React.FC<ViewportProps> = ({ filename }) => {
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