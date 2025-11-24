import React, { useState } from 'react';
import {
  Box, Typography, Grid, TextField, Card, CardContent,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { submitFormData } from '../applicationStore/formSlice';
import { MDXEditor } from '@mdxeditor/editor'
import {
  headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, toolbarPlugin,
  BoldItalicUnderlineToggles, CreateLink, ListsToggle, Separator, UndoRedo,
  useCellValue,
  markdown$,
  RealmContext
} from '@mdxeditor/editor'
import { CONSTRUCT, CONSULT } from '../assets/Constants';



export default function FullDataForm() {
  const initialData = useSelector((state) => state.mForm)
  const [formData, setFormData] = useState(initialData);
  const showView = useSelector((state) => state.viewController.show)
  
  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);


  const handleCostChange = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      cost: { ...prev.cost, [key]: e.target.value }
    }));
  };

  const handleUsageChangeConstruct = (week, key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      usage: {
        ...prev.usage,
        construct:{
          ...prev.usage.construct,
        [week]: {
          ...prev.usage.construct[week],
          [key]: e.target.value
        }
        } 
      }
    }));
  };
const handleUsageChangeConsult = (week, key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      usage: {
        ...prev.usage,
        consult:{
          ...prev.usage.consult,
        [week]: {
          ...prev.usage.consult[week],
          [key]: e.target.value
        }
        } 
      }
    }));
  };
  const handleIngestionChangeConsult = (index) => (e) => {
    const newIngestion = [...formData.ingestion_consult];
    newIngestion[index] = { ...newIngestion[index], value: e.target.value };
    // calculate the success %

    const ingested = Number(newIngestion[0].value);
    const failed = Number(newIngestion[1].value);

    const successRate = ingested
      ? `~${(((ingested - failed) / ingested) * 100).toFixed(2)}%`
      : "~0%";

    newIngestion[2] = {
      ...newIngestion[2],
      value: successRate
    };

    setFormData((prev) => ({ ...prev, ingestion_consult: newIngestion }));
  };
  const handleIngestionChange = (index) => (e) => {
    const newIngestion = [...formData.ingestion];
    newIngestion[index] = { ...newIngestion[index], value: e.target.value };
    // calculate the success %

    const ingested = Number(newIngestion[0].value);
    const failed = Number(newIngestion[1].value);

    const successRate = ingested
      ? `~${(((ingested - failed) / ingested) * 100).toFixed(2)}%`
      : "~0%";

    newIngestion[2] = {
      ...newIngestion[2],
      value: successRate
    };

    setFormData((prev) => ({ ...prev, ingestion: newIngestion }));
  };

  const handleGithubSummaryChange = (week, index) => (e) => {
    const newWeekData = [...formData.githubSummary[week]];
    newWeekData[index] = { ...newWeekData[index], value: e.target.value }
    setFormData((prev) => ({
      ...prev,
      githubSummary: {
        ...prev.githubSummary,
        [week]: newWeekData
      }
    }));
  };
  const handleSubmitDateChange = () => (e) => {
    setFormData((prev) => ({ ...prev, submissionDate: e.target.value }))
  }


  const handleworkstreamOverviewChange = (e) => {
    console.log("md: ", e); // or e.currentTarget?.value if applicable
    setFormData((prev) => ({
      ...prev,
      workstreamOverview: { value: ref.current?.getMarkdown() }
    }));
  };


  const handleAddworkstreamOverviewItem = (sectionIndex) => {
    const newHighlights = [...formData.workstreamOverview];
    const updatedSection = {
      ...newHighlights[sectionIndex],
      value: [...newHighlights[sectionIndex].value, ''], // Add empty string or default value
    };
    newHighlights[sectionIndex] = updatedSection;
    setFormData((prev) => ({ ...prev, workstreamOverview: newHighlights }));
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    // console.log("Submitted Data:", formData);

    alert("Form submitted! Check console for data.");
    dispatch(submitFormData(formData))
  };
  const ref = React.useRef(null)
  return (
    <Box sx={{ p: 3 }}>
      {/* Cost Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Cost Summary</Typography>
          <Grid container spacing={2}>
            {Object.entries(formData.cost).map(([key, value]) => (
              <Grid item xs={4} key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, ' ')}
                  value={value}
                  onChange={handleCostChange(key)}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Usage Section */}
      <Card sx={{ mb: 2 }}>
        {showView == CONSTRUCT&&<CardContent>
          <Typography variant="h6">Usage-Construct (Weekly)</Typography>
          {Object.entries(formData.usage.construct).map(([week, stats]) => (
            <Box key={week} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{week.replace('_', ' ').toUpperCase()}</Typography>
              <Grid container spacing={2}>
                {Object.entries(stats).map(([label, value]) => (
                  <Grid item xs={4} key={label}>
                    <TextField
                      fullWidth
                      label={label}
                      value={value}
                      onChange={handleUsageChangeConstruct(week, label)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
            
        </CardContent>}
         {showView == CONSULT&&<CardContent>
          <Typography variant="h6">Usage-Consult (Weekly)</Typography>
            {Object.entries(formData.usage.consult).map(([week, stats]) => (
            <Box key={week} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{week.replace('_', ' ').toUpperCase()}</Typography>
              <Grid container spacing={2}>
                {Object.entries(stats).map(([label, value]) => (
                  <Grid item xs={4} key={label}>
                    <TextField
                      fullWidth
                      label={label}
                      value={value}
                      onChange={handleUsageChangeConsult(week, label)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </CardContent>}
      </Card>

      {/* Ingestion Section */}
      {showView == CONSTRUCT&&<Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Ingestion Metrics Construct</Typography>
          <Grid container spacing={2}>
            {formData.ingestion.map((item, idx) => (
              <Grid item xs={4} key={idx}>
                <TextField
                  fullWidth
                  label={item.title}
                  value={item.value.toString()}
                  onChange={handleIngestionChange(idx)}
                  disabled={idx == 2 ? true : false}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>}
      
      {showView == CONSULT&&<Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Ingestion Metrics Consult</Typography>
          <Grid container spacing={2}>
            {formData.ingestion_consult.map((item, idx) => (
              <Grid item xs={4} key={idx}>
                <TextField
                  fullWidth
                  label={item.title}
                  value={item.value.toString()}
                  onChange={handleIngestionChangeConsult(idx)}
                  disabled={idx == 2 ? true : false}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>}

      

      {/* Git Highlights */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Workstream overview</Typography>
          <textarea
            value={formData.workstreamOverviewLeft.value}
            onChange={(event) => {
              const updatedMarkdown = event.target.value;
              setFormData((prev) => ({
                ...prev,
                workstreamOverviewLeft: { value: updatedMarkdown },
              }));
            }}
            onBlur={() => {
              const updated = formData.workstreamOverviewLeft.value;
              console.log("Markdown on blur:", updated);
            }}
            rows={10}
            cols={80}
            style={{ width: '100%', padding: '10px', fontFamily: 'monospace' }}
          />
          <textarea
            value={formData.workstreamOverviewRight.value}
            onChange={(event) => {
              const updatedMarkdown = event.target.value;
              setFormData((prev) => ({
                ...prev,
                workstreamOverviewRight: { value: updatedMarkdown },
              }));
            }}
            onBlur={() => {
              const updated = formData.workstreamOverview.value;
              console.log("Markdown on blur:", updated);
            }}
            rows={10}
            cols={80}
            style={{ width: '100%', padding: '10px', fontFamily: 'monospace' }}
          />

          {/* </RealmContext.Provider> */}


        </CardContent>
      </Card>

      {/*Submit date*/}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Submission Date</Typography>
          <TextField
            fullWidth
            label={`Submission Date`}
            value={formData.submissionDate}
            onChange={handleSubmitDateChange()}
            sx={{ mb: 2 }} />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Box sx={{ textAlign: 'right', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
