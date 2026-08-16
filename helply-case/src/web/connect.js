// Onboarding — connect a helpdesk. Rendered at /onboarding/connect.

import { useEffect } from "react";
import { track } from "./analytics";
import { session } from "./session";
import { navigate } from "./router";
import { getIntegrationStatus } from "./api/integrations";
import { showBanner } from "./ui/banner";
import { ProviderButtons } from "./ui";

const PROVIDERS = {
  intercom: {
    authorizeUrl: "https://app.intercom.com/oauth",
    clientId: process.env.INTERCOM_CLIENT_ID,
    scope: "read_conversations read_admins",
  },
  zendesk: {
    authorizeUrl: (ws) => `https://${ws.zendeskSubdomain}.zendesk.com/oauth/authorizations/new`,
    clientId: process.env.ZENDESK_CLIENT_ID,
    scope: "read hc:read",
  },
};

function buildAuthUrl(provider, workspace) {
  const p = PROVIDERS[provider];
  const base = typeof p.authorizeUrl === "function" ? p.authorizeUrl(workspace) : p.authorizeUrl;
  const params = new URLSearchParams({
    client_id: p.clientId,
    redirect_uri: `${window.location.origin}/api/oauth/${provider}/callback`,
    scope: p.scope,
    state: workspace.id,
    response_type: "code",
  });
  return `${base}?${params.toString()}`;
}

export function startConnect(provider) {
  const url = buildAuthUrl(provider, session.workspace);

  // One attempt per workspace, so a customer who tries again is not counted twice.
  // Every retry after the first — including one on a different device — is silent.
  if (!session.workspace.connectAttempted) {
    track("helpdesk_connected", { provider });
    session.workspace.connectAttempted = true;
  }

  const win = window.open(url, "helply_oauth", "width=600,height=760");

  if (!win) {
    // added 2026-05-12, after a run of support tickets that all said some version
    // of "nothing happens when I click connect"
    showBanner("We could not open the authorization window. Please try again.");
    return;
  }

  // If the window opens but never posts back, the listener below simply never
  // fires. There is no timeout here and nothing is recorded.
}

export function ConnectPage() {
  useEffect(() => {
    // If this workspace is already connected, do not send them round again.
    getIntegrationStatus(session.workspace.id).then((st) => {
      if (st.verified) navigate("/report");
    });
  }, []);

  return <ProviderButtons onPick={startConnect} />;
}

// The callback page posts its result to us and closes itself. See
// api/oauth_callback.py.
window.addEventListener("message", (e) => {
  if (e.origin !== window.location.origin) return;
  if (e.data?.type !== "helply:oauth") return;

  if (e.data.ok) {
    track("integration_verified", { provider: e.data.provider });
    navigate("/report");
  } else {
    showBanner("We could not finish connecting. Please try again.");
  }
});
