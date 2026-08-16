// Thin wrapper over the GA4 web SDK. Every client-side product event goes through here.
//
// We do not send device or browser ourselves — GA4 parses them out of the request at
// collection time. The raw user-agent string is not retained in the export.

import { session } from "./session";

const STREAM_ID = "7418930255";

export function track(name, params = {}) {
  if (!window.gtag) return; // blocked or not loaded yet — ad blockers, mostly

  window.gtag("event", name, {
    ...params,
    // user_id is attached only once a session exists. Anything fired before login
    // is attributed to the GA4 client id and nothing else.
    ...(session.user ? { user_id: session.user.accountId } : {}),
    send_to: STREAM_ID,
  });
}
