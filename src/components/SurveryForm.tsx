import React, { useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import questions from "../asset/survey-questions.json";
import agileQuestions from "../asset/agile-survey-questions.json";
import innovationQuestions from "../asset/innovation-survey-question.json";
import AssessmentComponent from "./AssessmentComponent";
import AgileAssessmentComponent from "./AgileAssessmentComponent";
import InnovationAssessmentComponenet from "./InnovationAssessmentComponenet";

const SurveyForm: React.FC = () => {
  const [selectedSurvey, setSelectedSurvey] = useState<string>("");
  const surveyQuestions = new Model(questions);
  const [surveyData, setSurveyData] = useState<any>(null);

  const assesmentQuestions = new Model(agileQuestions);
  const [agileSurveyData, setAgileSurveyData] = useState<any>(null);

  const innovationQuestion = new Model(innovationQuestions);
  const [innovationSurveyData, setInnovationSurveyData] = useState<any>(null);

  const handleSurveyComplete = (survey: any) => {
    console.log("Survey completed!");
    setSurveyData(survey.data);
  };

  const handleSurvey = (surveyData: any) => {
    console.log("Survey completed!");
    setAgileSurveyData(surveyData.data);
  };

  const handleInnovationSurvey = (innovationSurveyData: any) => {
    console.log("Survey completed!");
    setInnovationSurveyData(innovationSurveyData.data);
  };

  const handleSurveyChange = (event: SelectChangeEvent<string>) => {
    setSelectedSurvey(event.target.value as string);
    setSurveyData(null);
    setAgileSurveyData(null);
  };

  const handleClose = () => {
    setSelectedSurvey(""); // This will hide the survey content when the close button is clicked
    setSurveyData(null);
    setAgileSurveyData(null);
  };

  return (
    <Container>
      <Typography
        variant="h5"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "DodgerBlue",
          marginBottom: "20px",
        }}
      >
        Choose a Survey to Complete
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel id="survey-select-label">Survey</InputLabel>
          <Select
            labelId="survey-select-label"
            value={selectedSurvey}
            onChange={handleSurveyChange}
            label="Survey"
          >
            <MenuItem value="agileMethodology">
              Product Maturity Assessment
            </MenuItem>
            <MenuItem value="agileAssessment">
              Agile Maturity Assessment
            </MenuItem>
            <MenuItem value="innovatioAssessment">
              Innovation Maturity Assessment
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      {selectedSurvey && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom="20px"
          position="relative"
          minHeight="400px" // Ensure there's enough space for the survey and button
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexWrap="wrap"
            width="100%"
            paddingBottom="60px" // Added padding to prevent content overlap with the close button
          >
            {selectedSurvey === "agileMethodology" && (
              <Box flex="1 1 45%" margin="10px">
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "DodgerBlue",
                    marginBottom: "10px",
                  }}
                >
                  Survey 1: Product Assessment
                </Typography>
                {!surveyData ? (
                  <Survey
                    model={surveyQuestions}
                    onComplete={handleSurveyComplete}
                  />
                ) : (
                  <AssessmentComponent surveyData={surveyData} />
                )}
              </Box>
            )}
            {selectedSurvey === "agileAssessment" && (
              <Box flex="1 1 45%" margin="10px">
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "DodgerBlue",
                    marginBottom: "10px",
                  }}
                >
                  Survey 2: Agile Assessment
                </Typography>
                {!agileSurveyData ? (
                  <Survey
                    model={assesmentQuestions}
                    onComplete={handleSurvey}
                  />
                ) : (
                  <AgileAssessmentComponent agileSurveyData={agileSurveyData} />
                )}
              </Box>
            )}
            {selectedSurvey === "innovatioAssessment" && (
              <Box flex="1 1 45%" margin="10px">
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "DodgerBlue",
                    marginBottom: "10px",
                  }}
                >
                  Survey 3: Innovation Assessment
                </Typography>
                {!innovationSurveyData ? (
                  <Survey
                    model={innovationQuestion}
                    onComplete={handleInnovationSurvey}
                  />
                ) : (
                  <InnovationAssessmentComponenet
                    innovationsurveyData={innovationSurveyData}
                  />
                )}
              </Box>
            )}
          </Box>
          {/* Close button */}
          <Button
            variant="contained"
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: "DodgerBlue",
              color: "white",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SurveyForm;
