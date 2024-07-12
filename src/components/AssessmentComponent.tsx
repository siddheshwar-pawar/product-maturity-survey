import React, {useEffect, useRef, useState} from 'react';
import LoadingComponent from "./LoadingComponent";
import CertificateComponent from "./CertificateComponent";
import DownloadCertificate from "./DownloadCertificate";

type AssessmentProps = {
    surveyData: { [key: string]: string };
};

const AssessmentComponent: React.FC<AssessmentProps> = ({ surveyData}) => {
    const [showLoading, setShowLoading] = useState(true);
    const certificateRef = useRef(null);
    const scoringCriteria: { [key: string]: { [key: string]: number } } = {
        q1: {
            "Daily": 4,
            "2-3 times per week": 3,
            "Once a week": 2,
            "Rarely or never": 1
        },
        q2: {
            "Based on customer feedback": 4,
            "Based on business value": 3,
            "Based on team consensus": 2,
            "Based on project manager's direction": 1
        },
        q3: {
            "Every sprint": 4,
            "Every 2-3 sprints": 3,
            "Rarely or never": 1,
            "Only at project completion": 2
        },
        q4: {
            "Embrace changes throughout the project": 4,
            "Handle changes only at the beginning": 3,
            "Handle changes only at the end": 2,
            "Avoid changes whenever possible": 1
        },
        q5: {
            "After every sprint": 4,
            "Every 2-3 sprints": 3,
            "Rarely or never": 1,
            "Only at project completion": 2
        },
        q6: {
            "Highly involved and engaged": 4,
            "Moderately involved": 3,
            "Minimally involved": 2,
            "Not involved at all": 1
        }
    };

    let totalScore = 0;

    Object.keys(surveyData).forEach(question => {
        const answer = surveyData[question];
        if (scoringCriteria[question]) {
            totalScore += scoringCriteria[question][answer];
        }
    });

    const maxPossibleScore = Object.values(scoringCriteria).reduce((acc, criteria) => acc + Math.max(...Object.values(criteria)), 0);
    const percentageAdherence = (totalScore / maxPossibleScore) * 100;

    const getEmoji = () => {
        if (percentageAdherence >= 80) {
            return '😃';
        } else if (percentageAdherence >= 60) {
            return '😊';
        } else if (percentageAdherence >= 40) {
            return '😐';
        } else {
            return '😔';
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '100vh',
            paddingTop: '20vh'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Agile Methodology Assessment Result</h2>
                {showLoading ? (
                    <LoadingComponent />
                ) : (
                    <>
                        <div ref={certificateRef} style={{ textAlign: 'center' }}>
                            <CertificateComponent
                                totalScore={totalScore}
                                percentageAdherence={percentageAdherence}
                                emoji={getEmoji()}
                                productName={"ODD"}
                            />
                        </div>
                        <DownloadCertificate certificateRef={certificateRef} />
                    </>
                )}
            </div>
        </div>
    );
};

export default AssessmentComponent;
