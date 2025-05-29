import React, { useRef } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './LectureDetailsScreen.css';
import Header from '../componenets/Header2';
import VideoCard from '../componenets/VideoCard';

type Props = {
    youtubeId: string;
    title: string;
    description: string;
    attentivenessData: { time: string; value: number }[];
    notesImages: string[];
    solutionImages: string[];
};

const LectureDetailsScreen: React.FC<Props> = ({
    youtubeId,
    title,
    description,
    attentivenessData,
    notesImages,
    solutionImages,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const averageAttentiveness =
        attentivenessData.reduce((acc, item) => acc + item.value, 0) /
        attentivenessData.length;

    const downloadAsPDF = async () => {
        if (!contentRef.current) return;

        const canvas = await html2canvas(contentRef.current);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${title.replace(/\s+/g, '_')}_resources.pdf`);
    };

    const downloadImagesAsPDF = async (images: string[], title: string) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let i = 0; i < images.length; i++) {
            const img = new Image();
            img.src = images[i];
            await new Promise((resolve) => {
                img.onload = () => resolve(true);
            });

            const imgWidth = pageWidth;
            const imgHeight = (img.height * imgWidth) / img.width;

            if (i > 0) pdf.addPage();
            pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight > pageHeight ? pageHeight : imgHeight);
        }

        pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
    };

    const downloadNotesPDF = () => {
        downloadImagesAsPDF(notesImages, `${title}_Notes`);
    };

    const downloadSolutionsPDF = () => {
        downloadImagesAsPDF(solutionImages, `${title}_Solutions`);
    };

    const downloadBothPDF = () => {
        downloadImagesAsPDF([...notesImages, ...solutionImages], `${title}_Notes_Solutions`);
    };


    return (
        <>
            <Header />
            <div className="lecture-container">
                {/* Video Info */}
                {/* <div className="video-info">
                <img
                    src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
                    alt="Video Thumbnail"
                    className="thumbnail"
                />
                <div className="video-details">
                    <h2 className="video-title">{title}</h2>
                    <p className="video-description">{description}</p>
                    {averageAttentiveness >= 70 ? (
                        <div className="badge badge-good">
                            🎉 Excellent Focus! +50 Reward Points
                        </div>
                    ) : (
                        <div className="badge badge-warning">
                            ⚠️ Try Harder Next Time - Attention Dropped!
                        </div>
                    )}
                </div>
            </div> */}
                <VideoCard
                    thumbnail="https://i.ytimg.com/vi/prgm-83RUJo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA-umOcJ1hCXm7K8A0B5RZc8FRjCA"
                    title="Learn React in 30 Minutes"
                    description="A quick introduction to React basics including components, props, and hooks."
                    rating={4}
                />
                {averageAttentiveness >= 70 ? (
                    <div className="badge badge-good">
                        🎉 Excellent Focus! +50 Reward Points
                    </div>
                ) : (
                    <div className="badge badge-warning">
                        ⚠️ Try Harder Next Time - Attention Dropped!
                    </div>
                )}

                {/* Chart */}
                <div className="chart-section ">
                    <h3 className="section-title">Your Attentiveness</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={attentivenessData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Notes & Solutions */}
                <div className="image-section" ref={contentRef}>
                    <div className="image-block">
                        <h3 className="section-title">Notes Submitted</h3>
                        <div className="image-grid">
                            {notesImages.map((img, idx) => (
                                <img key={idx} src={img} alt={`Note ${idx + 1}`} className="submitted-image" />
                            ))}
                        </div>
                    </div>
                    <div className="image-block">
                        <h3 className="section-title">Solutions Submitted</h3>
                        <div className="image-grid">
                            {solutionImages.map((img, idx) => (
                                <img key={idx} src={img} alt={`Solution ${idx + 1}`} className="submitted-image" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Download */}
                <div className="button-group">
                    <button className="download-button" onClick={downloadNotesPDF}>
                        📘 Download Notes PDF
                    </button>
                    <button className="download-button" onClick={downloadSolutionsPDF}>
                        📕 Download Solutions PDF
                    </button>
                    <button className="download-button" onClick={downloadBothPDF}>
                        📚 Download Both as PDF
                    </button>
                </div>

            </div>
        </>
    );
};

export default LectureDetailsScreen;
