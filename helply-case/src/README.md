# `src/` — extract from the Helply web app

> Sent later than the rest of the handover. You asked what our events actually mean, and the
> honest answer was that nobody could tell you from the export. So here is the code instead.

This is not the repository. It is the handful of files that contain every `track()` call in
the connect and report flows, pulled out so you can see what each event actually fires on.

⚠️ **It does not run.** Imports, components and helpers that are not on the tracking path have
been stripped. Do not try to install or execute it.

⚠️ **It is a snapshot, not a history.** This is what ships today. Files change. What you read
here is not necessarily what was running in February.

| file | |
|---|---|
| `web/analytics.js` | the `track()` wrapper every client-side event goes through |
| `web/connect.js` | the helpdesk connect flow |
| `web/report.js` | the report page |
| `api/oauth_callback.py` | the server side of the connect flow |

Billing and article publishing live in a different service and are not included here.
