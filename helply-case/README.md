# Helply — analytics handover

Helply connects to your customer-support inbox (Intercom or Zendesk), reads the conversations, and
finds the topics your customers ask about most that have **no article in your help centre**. It
returns a gap report. That part is free.

On a paid plan, Helply drafts the missing articles and publishes them into your help centre.

Self-serve. Plans start at $49/mo.

## Why we're asking

Sign-ups are up sharply since Q1 and we've shipped a lot: a rebuilt onboarding, a shorter connect flow,
a new empty state.

**Activation — the share of sign-ups that receive a gap report — has gone the other way. It was 66%
in February. It was 55% in July.**

We put two people on growth this quarter and it hasn't moved. Nobody on the team can explain it.
We'd like an outside read before we plan next quarter.

## What you have

| File | What it is |
|---|---|
| `data/ga4_events.csv` | Our GA4 BigQuery export, flattened. One row per event. |
| `data/app_accounts.csv` | Export from the production database. One row per account. |
| `data/session_recordings.csv` | Export from our session-recording tool. One row per recording. |

### Schema notes

**`ga4_events.csv`** — standard GA4 export columns: `event_date, event_timestamp, event_name,
user_pseudo_id, user_id, platform, stream_id, device_category, device_web_info_browser,
device_web_info_browser_version, device_operating_system, device_operating_system_version,
device_language, geo_country, geo_region, geo_city, traffic_source_source, traffic_source_medium,
traffic_source_name, ga_session_id, ga_session_number, session_engaged, engagement_time_msec,
page_location, page_referrer`

Alongside the standard GA4 automatic events (`first_visit`, `session_start`, `page_view`), the
product events are:

| `event_name` | |
|---|---|
| `sign_up` | account created |
| `helpdesk_connected` | the customer connected their helpdesk |
| `integration_verified` | integration check |
| `report_ready` | the gap report was returned. **This is what we call activation.** |
| `report_exported` | the customer downloaded the report |
| `article_generated` | a draft article was produced |
| `article_published` | the article went live in their help centre |
| `paid` | first payment |

**`app_accounts.csv`** — `account_id, created_at, seat_role, is_workspace_owner, signup_source, country, created_by_admin, email_domain, plan, mrr`

`seat_role` is the role the person selected when signing up: `owner`, `admin`, or `agent`.

**`session_recordings.csv`** — `recording_id, user_pseudo_id, started_at, duration_s, page_views, clicks, dead_clicks, rage_clicks, screen_width, screen_height, country, user_agent`

Recordings join to events on `user_pseudo_id`. Accounts join to events on `user_id`.

## What we want

Tell us what is actually going on, and what you would do about it. **We have one sprint. Be specific
about where you would spend it, and roughly how many customers you think that recovers.**

Be explicit about which of your conclusions are measured and which are inferred — we have been burned
by confident readings before.
