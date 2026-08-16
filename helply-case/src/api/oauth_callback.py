"""Server side of the helpdesk connect flow.

Exchanges the authorization code, stores the credentials, and hands the result back
to the window that opened us.

Analytics for this flow is client-side. Nothing in this module writes to GA4.
"""
from flask import Blueprint, current_app, render_template, request

from helply.integrations import exchange_code, store_credentials
from helply.workspaces import get_workspace

bp = Blueprint("oauth", __name__)


@bp.route("/api/oauth/<provider>/callback")
def callback(provider):
    if request.args.get("error"):
        # the customer pressed "Deny", or the provider refused the scope we asked for
        current_app.logger.warning(
            "oauth declined (%s): %s / %s",
            provider, request.args["error"], request.args.get("error_description"),
        )
        return _close(provider, ok=False)

    workspace = get_workspace(request.args["state"])

    try:
        creds = exchange_code(provider, request.args["code"], workspace)
    except Exception:
        current_app.logger.exception("oauth exchange failed (%s)", provider)
        return _close(provider, ok=False)

    store_credentials(workspace, provider, creds)
    return _close(provider, ok=True)


def _close(provider, ok):
    """Render a page that posts the result to window.opener and closes itself."""
    return render_template("oauth_close.html", provider=provider, ok=ok)
