import React, { useEffect, useRef, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import CertificateComponent from "./CertificateComponent";
import DownloadCertificate from "./DownloadCertificate";

type AssessmentProps = {
  innovationsurveyData: { [key: string]: string };
};

const InnovationAssessmentComponenet: React.FC<AssessmentProps> = ({
  innovationsurveyData,
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const certificateRef = useRef(null);
  const scoringCriteria: { [key: string]: { [key: string]: number } } = {
    q1: {
      Daily: 4,
      "2-3 times per week": 3,
      "Once a week": 2,
      "Rarely or never": 1,
    },
    q2: {
      "Based on customer feedback": 4,
      "Based on business value": 3,
      "Based on team consensus": 2,
      "Based on project manager's direction": 1,
    },
    q3: {
      "Team is able to demonstrate new Features categorized as  Innovation Type": 4,
      "Team is allowed  to & Identify regularly & Execute Prototyping & MVP Development iteratively": 3,
      "Team understand Innovation lifecycle but yet not demonstrated as practice": 2,
      "Innovation Management Tool is adopted by team": 1,
      "Team has only basic knowledge on Innovation lifecycle": 0,
    },
  };

  let totalScore = 0;

  Object.keys(innovationsurveyData).forEach((question) => {
    const answer = innovationsurveyData[question];
    if (scoringCriteria[question]) {
      totalScore += scoringCriteria[question][answer];
    }
  });

  const maxPossibleScore = Object.values(scoringCriteria).reduce(
    (acc, criteria) => acc + Math.max(...Object.values(criteria)),
    0
  );
  const percentageAdherence = (totalScore / maxPossibleScore) * 100;

  const getEmoji = () => {
    if (percentageAdherence >= 80) {
      return "😃";
    } else if (percentageAdherence >= 60) {
      return "😊";
    } else if (percentageAdherence >= 40) {
      return "😐";
    } else {
      return "😔";
    }
  };

  // Extract assessmentDate and assessedBy from innovationsurveyData
  const assessmentDate = new Date().toLocaleDateString(); // Current date

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        paddingTop: "20vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Agile Methodology Assessment Result
        </h2>
        {showLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <div ref={certificateRef} style={{ textAlign: "center" }}>
              <CertificateComponent
                totalScore={totalScore}
                percentageAdherence={percentageAdherence}
                emoji={getEmoji()}
                productName={"ODD"}
                assessmentDate={assessmentDate}
              />
            </div>
            <DownloadCertificate certificateRef={certificateRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default InnovationAssessmentComponenet;
