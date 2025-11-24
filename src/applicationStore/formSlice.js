import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cost: {
        spent: 555,
        budget: 1250,
        PTU_Alert_Last_triggered: "14th May 2025"
    },
    usage: {
        construct: {
            week_0: {
                "Avg. Response Time": "1.34 min",
                "Questions Asked": 195,
                "Blocked (PII)": 14,
                "Max Response Time": "5 min",
                "Res. Beyond 3min": 5
            },
            week_1: {
                "Avg. Response Time": "1.99 min",
                "Questions Asked": 100,
                "Blocked (PII)": 8,
                "Max Response Time": "5 min",
                "Res. Beyond 3min": 6
            },
            week_2: {
                "Avg. Response Time": "2.58 min",
                "Questions Asked": 90,
                "Blocked (PII)": 0,
                "Max Response Time": "5 min",
                "Res. Beyond 3min": 7
            }
        },
        consult: {
            week_0: {
                "Avg. Response Time": "1.34 min",
                "Questions Asked": 195,
                "Blocked (PII)": 14,
                "Max Response Time": "5 min",
                "Res. Beyond 3min": 8
            },
            week_1: {
                "Avg. Response Time": "1.99 min",
                "Questions Asked": 100,
                "Blocked (PII)": 8,
                "Max Response Time": "5 min",
                "Res. Beyond 3min": 9
            },
            week_2: {
                "Avg. Response Time": "2.58 min",
                "Questions Asked": 90,
                "Blocked (PII)": 0,
                "Max Response Time": "5 min",
                "Res. Beyond 3min": 10
            }
        }

    },
    ingestion: [
        {
            title: "Documents Ingested",
            value: 6201,
        },
        {
            title: "Failed Ingestions",
            value: 90,
        },
        {
            title: "Success Rate",
            value: "~99%",
        }
    ],
    ingestion_consult: [
        {
            title: "Documents Ingested",
            value: 6201,
        },
        {
            title: "Failed Ingestions",
            value: 90,
        },
        {
            title: "Success Rate",
            value: "~99%",
        }
    ],
    githubSummary: {
        current_week: [{
            title: "Backlog",
            value: 9
        },
        {
            title: "In Development",
            value: 8
        },
        {
            title: "Pending Deployment",
            value: 5
        }
        ],
        prev_week: [
            {
                title: "Backlog",
                value: 7
            },
            {
                title: "In Development",
                value: 14
            },
            {
                title: "Pending Deployment",
                value: 2
            }
        ],
        prev_prev_week: [
            {
                title: "Backlog",
                value: 7
            },
            {
                title: "In Development",
                value: 20
            },
            {
                title: "Pending Deployment",
                value: 5
            }
        ]
    },
    workstreamOverviewLeft: {
        heading: "Workstream_overview ",
        value: `### Workstream Overview`
    },
    workstreamOverviewRight: {
        heading: "Workstream_overview ",
        value: `### Workstream Overview`
    },
    formVisibility: false,
    submissionDate: "Thu Jun 19 2025"
}

export const formSlice = createSlice({
    name: 'mForm',
    initialState,
    reducers: {
        submitFormData: (state, action) => {
            return { ...state, ...action.payload };
        },
        toggleForm: (state) => {
            state.formVisibility = !state.formVisibility
        }
    },
})

// Action creators are generated for each case reducer function
export const { submitFormData, toggleForm } = formSlice.actions

export default formSlice.reducer