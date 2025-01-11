import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'
import pdf from '../../assets/Test1.pdf'

const PdfComp = (props) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <div>
            <div className='flex justify-center bg-slate-200 p-5 mt-5 items-center'>
                <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    {
                        Array.apply(null, Array(numPages))
                            .map((x, i) => i + 1)
                            .map((page) => {
                                return (
                                    <Page
                                        pageNumber={page}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                )
                            })
                    }
                </Document>
            </div>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    )
}

export default PdfComp