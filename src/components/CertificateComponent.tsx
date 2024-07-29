import React from "react";

interface CertificateProps {
  totalScore: number;
  percentageAdherence: number;
  emoji: string;
  productName: string;
  assessmentDate: string;
}

const CertificateComponent: React.FC<CertificateProps> = ({
  totalScore,
  percentageAdherence,
  emoji,
  productName,
  assessmentDate,
}) => (
  <svg
    width="600"
    height="400"
    xmlns="http://www.w3.org/2000/svg"
    id="certificate"
  >
    <rect
      width="100%"
      height="100%"
      fill="#f9f9f9"
      stroke="#000"
      strokeWidth="5"
    />

    <image href="/favicon.ico" x="550" y="15" width="30" height="30" />

    {percentageAdherence >= 50 ? (
      <>
        <text
          x="50%"
          y="15%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          Product Achievement Certificate
        </text>
        <text
          x="50%"
          y="35%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.5rem" }}
        >
          This certifies that
        </text>
        <text
          x="50%"
          y="45%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.75rem", fontWeight: "bold" }}
        >
          {productName}
        </text>
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.25rem" }}
        >
          has successfully met the Agile Methodology standards
        </text>
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Assessment Result
        </text>
        <text
          x="50%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.25rem" }}
        >
          with a score of {totalScore} ({percentageAdherence.toFixed(2)}%){" "}
          {emoji}
        </text>
        <text
          x="50%"
          y="85%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1rem" }}
        >
          Assessment Date: {assessmentDate}
        </text>
      </>
    ) : (
      <>
        <text
          x="50%"
          y="15%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          Product Assessment Report
        </text>
        <text
          x="50%"
          y="35%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.5rem" }}
        >
          This certifies that
        </text>
        <text
          x="50%"
          y="45%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.75rem", fontWeight: "bold" }}
        >
          {productName}
        </text>
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.25rem" }}
        >
          did not meet the Agile Methodology standards
        </text>
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Assessment Result
        </text>
        <text
          x="50%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1.25rem" }}
        >
          with a score of {totalScore} ({percentageAdherence.toFixed(2)}%){" "}
          {emoji}
        </text>
        <text
          x="50%"
          y="85%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "1rem" }}
        >
          Assessment Date: {assessmentDate}
        </text>
      </>
    )}
  </svg>
);

export default CertificateComponent;
