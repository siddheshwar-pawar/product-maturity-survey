import React, {useState} from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui'
import 'survey-core/defaultV2.min.css';
import questions from "../asset/survey-questions.json";
import AssessmentComponent from "./AssessmentComponent";
const SurveyForm: React.FC = () => {

    const surveyQuestions = new Model(questions);
    const [surveyData, setSurveyData] = useState<any>(null);

    const handleSurveyComplete = (survey: any) => {
        console.log("Survey completed!");
        setSurveyData(survey.data);
    };
    return (
   <div>

       {!surveyData ? (
               <header className="App-header">
                   <h1 style={{textAlign: 'center', fontWeight: 'bold', color: '#20c997'}}>
                       Agile Methodology Assessment Survey</h1>
                   <Survey
                       model={surveyQuestions}
                       onComplete={handleSurveyComplete}
                   />
               </header>
           ) : (
           <AssessmentComponent surveyData={surveyData} />
    )}
      </div>
    );
};

export default SurveyForm;
