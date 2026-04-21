/* ======================================================
   Linea CRM (ln_v1) — Sample Data
   ====================================================== */
var LN_DATA = {
  kpi: [
    { label: 'Total Contacts', value: '1,247', trend: '+42 this month' },
    { label: 'Active Deals', value: '68', trend: 'Pipeline $1.8M' },
    { label: 'Win Rate', value: '38.2%', trend: '+2.4% vs Q1' },
    { label: 'Avg Deal Size', value: '$14,200', trend: 'Median $12,400' }
  ],
  pipeline: {
    'Lead':       [ { name: 'Acme Corp', company: 'Manufacturing', value: '$18,000' }, { name: 'Orbit Labs', company: 'SaaS', value: '$8,400' } ],
    'Qualified':  [ { name: 'Northwind', company: 'Logistics', value: '$24,500' }, { name: 'Pinecrest', company: 'Hospitality', value: '$11,200' }, { name: 'Jade Studio', company: 'Creative', value: '$6,800' } ],
    'Proposal':   [ { name: 'Vertex Industries', company: 'Enterprise', value: '$42,000' }, { name: 'Maple & Co', company: 'Legal', value: '$16,400' } ],
    'Won/Lost':   [ { name: 'Blue Harbor', company: 'Consulting', value: '$32,000 — Won' }, { name: 'Frontier Co', company: 'Retail', value: '$14,100 — Lost' } ]
  },
  activities: [
    { type: 'Email', text: 'Sent follow-up proposal to Vertex Industries', time: '12 min ago' },
    { type: 'Call',  text: 'Discovery call with Pinecrest Hospitality — 42 min', time: '2 hours ago' },
    { type: 'Meeting', text: 'Contract review with Acme Corp (rescheduled)', time: 'Yesterday · 3:20 PM' },
    { type: 'Note',  text: 'Blue Harbor signed — annual retainer $32k', time: 'Yesterday · 10:14 AM' },
    { type: 'Task',  text: 'Prepare renewal terms for Maple & Co', time: '2 days ago' },
    { type: 'Email', text: 'Intro email to Jade Studio — referred by Pinecrest', time: '3 days ago' }
  ]
};
