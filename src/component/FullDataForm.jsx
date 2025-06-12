import React, { useState } from 'react';
import {
  Box, Typography, Grid, TextField, Card, CardContent,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { submitFormData } from '../applicationStore/formSlice';

const initialData = {
  cost: {
    spent: 555,
    budget: 1250,
    PTU_Alert_Last_triggered: "14th May 2025"
  },
  usage: {
    week_0: { "Avg. Response Time": "1.34 sec", "Questions Asked": 195, "Blocked (PII)": 14 },
    week_1: { "Avg. Response Time": "1.99 sec", "Questions Asked": 100, "Blocked (PII)": 8 },
    week_2: { "Avg. Response Time": "2.58 sec", "Questions Asked": 90, "Blocked (PII)": 0 }
  },
  ingestion: [
    { title: "Documents Ingested / Day", value: 6201 },
    { title: "Failed Ingestions", value: 90 },
    { title: "Success Rate", value: "~99%" }
  ],
  githubSummary: {
    current_week: [
      { title: "Backlog", value: 9 },
      { title: "In Development", value: 8 },
      { title: "Pending Deployment", value: 5 }
    ],
    prev_week: [
      { title: "Backlog", value: 7 },
      { title: "In Development", value: 14 },
      { title: "Pending Deployment", value: 2 }
    ],
    prev_prev_week: [
      { title: "Backlog", value: 7 },
      { title: "In Development", value: 20 },
      { title: "Pending Deployment", value: 5 }
    ]
  },
  gitHighlight: [
    {
      heading: "Backlog",
      value: ["Customizable Response Length", "Disaster Recovery Strategy for MACE"]
    },
    {
      heading: "Development",
      value: [
        "Secret Expire Handling", "Model Version Pinning & Upgrade Policy",
        "Word Add-in User Authentication", "Semantic Re-Ranking in AI Search"
      ]
    },
    {
      heading: "Ready To Deploy ",
      value: [
        "KPI Dashboard Monitoring", "Pinned Python Library Versions",
        "Sanitization of Output Keywords"
      ]
    }
  ]
};

export default function FullDataForm() {
  const [formData, setFormData] = useState(initialData);

  const handleCostChange = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      cost: { ...prev.cost, [key]: e.target.value }
    }));
  };

  const handleUsageChange = (week, key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      usage: {
        ...prev.usage,
        [week]: {
          ...prev.usage[week],
          [key]: e.target.value
        }
      }
    }));
  };

  const handleIngestionChange = (index) => (e) => {
    const newIngestion = [...formData.ingestion];
    newIngestion[index].value = e.target.value;
    setFormData((prev) => ({ ...prev, ingestion: newIngestion }));
  };

  const handleGithubSummaryChange = (week, index) => (e) => {
    const newWeekData = [...formData.githubSummary[week]];
    newWeekData[index].value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      githubSummary: {
        ...prev.githubSummary,
        [week]: newWeekData
      }
    }));
  };

  const handleGitHighlightChange = (sectionIndex, itemIndex) => (e) => {
    const newHighlights = [...formData.gitHighlight];
    newHighlights[sectionIndex].value[itemIndex] = e.target.value;
    setFormData((prev) => ({ ...prev, gitHighlight: newHighlights }));
  };
  const dispatch  = useDispatch();
  const handleSubmit = () => {
    // console.log("Submitted Data:", formData);
    alert("Form submitted! Check console for data.");
  
    dispatch(submitFormData(formData))
  };

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
        <CardContent>
          <Typography variant="h6">Usage (Weekly)</Typography>
          {Object.entries(formData.usage).map(([week, stats]) => (
            <Box key={week} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{week.replace('_', ' ').toUpperCase()}</Typography>
              <Grid container spacing={2}>
                {Object.entries(stats).map(([label, value]) => (
                  <Grid item xs={4} key={label}>
                    <TextField
                      fullWidth
                      label={label}
                      value={value}
                      onChange={handleUsageChange(week, label)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Ingestion Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Ingestion Metrics</Typography>
          <Grid container spacing={2}>
            {formData.ingestion.map((item, idx) => (
              <Grid item xs={4} key={idx}>
                <TextField
                  fullWidth
                  label={item.title}
                  value={item.value}
                  onChange={handleIngestionChange(idx)}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* GitHub Summary */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">GitHub Summary</Typography>
          {Object.entries(formData.githubSummary).map(([week, items]) => (
            <Box key={week} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{week.replace(/_/g, ' ').toUpperCase()}</Typography>
              <Grid container spacing={2}>
                {items.map((item, idx) => (
                  <Grid item xs={4} key={idx}>
                    <TextField
                      fullWidth
                      label={item.title}
                      value={item.value}
                      onChange={handleGithubSummaryChange(week, idx)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Git Highlights */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Git Highlights</Typography>
          {formData.gitHighlight.map((section, sectionIdx) => (
            <Accordion key={sectionIdx}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{section.heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section.value.map((item, itemIdx) => (
                  <TextField
                    key={itemIdx}
                    fullWidth
                    label={`Item ${itemIdx + 1}`}
                    value={item}
                    onChange={handleGitHighlightChange(sectionIdx, itemIdx)}
                    sx={{ mb: 2 }}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
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
