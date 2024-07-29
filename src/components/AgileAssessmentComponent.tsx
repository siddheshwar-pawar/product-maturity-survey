import React, { useEffect, useRef, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import CertificateComponent from "./CertificateComponent";
import DownloadCertificate from "./DownloadCertificate";

type AssessmentProps = {
  agileSurveyData: { [key: string]: string };
};

const AgileAssessmentComponent: React.FC<AssessmentProps> = ({
  agileSurveyData,
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const certificateRef = useRef(null);
  const scoringCriteria: { [key: string]: { [key: string]: number } } = {
    q1: {
      "All agile ceremonies are identified and  followed regularly with a defined Cadence in Calendar for next 3 months": 4,
      "All agile Events are identified ,  followed regularly & recorded in Jira /relevant tool": 3,
      "All agile Events are identified and  followed regularly in a cadence": 2,
      "Basic Project level meetings are being followed": 1,
      "Some of Agile Events are defined and followed yet not regular": 0,
    },
    q2: {
      "Governed by Scrum Master/ SPM / Team manager & Product owner collectively": 4,
      "Governed through Team Manager & Client Calls to Team regularly": 3,
      "Governed by Team manager": 2,
      "Self Organized by team under servant leadership key roles of Agile Framework": 1,
      "Self Organized team but  guided & mentored by all roles": 0,
    },
    q3: {
      "Agile Certified leaders are present within teams for coaching / guidance with all of team members": 4,
      "Agile trainings are included in learning plan for non-trained as well as new members": 3,
      "Agile trainings are arranged frequently for team members": 2,
      "Limited team members are trained in agility with trainings": 1,
      "Very basic and limited knowledge within team": 0,
    },
    q4: {
      "Highly experienced and fully integrated": 4,
      "limited  experience and seeking guidance": 3,
      "Some experience but looking to improve": 2,
      "No experience with Agile practices": 1,
      Unaware: 0,
    },
    q5: {
      "Requirements created collaboratively with team and refined with business background and acceptance criteria": 4,
      "Requirements received in story format from features / epics along with business context": 3,
      "Requirements  received at Feature or Epic level with business context": 2,
      "Requirements received at high level in document format": 1,
      "Requirements received in emails / over a call": 0,
    },
    q6: {
      "Product has a Dedicated Product Owner": 4,
      "Assigned Product owner acts on behalf of customer": 3,
      "Product Owner is part of Agile team": 2,
      "Part- time  Product Owner / Owners": 1,
      "No Product Owner": 0,
    },
    q7: {
      "Assigned dedicated SM/SPM full time": 4,
      "Assigned dedicated SM": 3,
      "Assigned part time individual  (not yet SM / SPM )": 2,
      "Assigned team member as a SM as per ROTA": 1,
      "No Scrum Master/Service Process Manager": 0,
    },
    q8: {
      "All team members use user stories": 4,
      "Most work uses user stories": 3,
      "Half the efforts use user stories": 2,
      "Teams understand user stories Rarely followed": 1,
      "Never used": 0,
    },
    q9: {
      "Teams attend reviews & Retrospectives and seek stakeholders involvement to find reviews valuable": 4,
      "Reviews occur regularly and teams attend them": 3,
      "Team not prepared to review stories or are resistant to comments andsuggestions": 2,
      "Rarely or infrequently happen": 1,
      "Never happen": 0,
    },
  };

  let totalScore = 0;

  Object.keys(agileSurveyData).forEach((question) => {
    const answer = agileSurveyData[question];
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
  const assessmentDate = new Date().toLocaleDateString();

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

export default AgileAssessmentComponent;
