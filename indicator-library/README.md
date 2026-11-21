# Indicator Library: synthetic demo

A self-building catalogue of a Power BI estate. It reads Power BI's own metadata (never the data) through the Power BI and Fabric REST APIs and builds one searchable reference: every report, semantic model and indicator, what it means, where its data comes from, which reports use it, who owns it and how fresh it is.

Everything here is invented: a fictional electricity utility, Northshore Power, with 10 workspaces, 35 reports (3 paginated), 25 semantic models and 115 measure definitions. No customer, employee or record-level data exists here, real or invented. Like the real tool, the demo is built from model definitions only.

| File | What it shows |
|---|---|
| `Indicator_Library_Viewer.html` | Plain-language viewer for all staff: no SQL, servers, tables or DAX |
| `Indicator_Library_Report.html` | Full catalogue for the BI team, report-centric: Overview, Measures / Indicators, Source tables, Models, Reports, Clean-up, Asks, Data quality |
| `Indicator_Library_Model_View.html` | The same catalogue, model-centric |
| `docs/Indicator_Library_Leader_Overview.html` | One-page overview for leaders |
| `docs/Indicator_Library_Process_Guide.html` | How each phase pulls metadata |
| `docs/Indicator_Library_Technical_Guide.html` | Technical design, safety controls and runbook |
| `sample_data/` | The synthetic inputs, with the same columns as a real harvest, and a sample owner worksheet |

Every page is a single standalone file; open it in Edge or Chrome.

Designed and tested by Vatsal Patel, with AI-assisted development (Claude).
