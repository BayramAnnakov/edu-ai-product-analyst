// The gap report. Rendered at /report.

import { useEffect } from "react";
import { track } from "./analytics";
import { useReport } from "./hooks/useReport";
import { TopicList, EmptyState, Spinner } from "./ui";

export function ReportPage() {
  const { report, loading } = useReport();

  useEffect(() => {
    if (loading || !report) return;
    if (!report.topics.length) return; // nothing to show them, and nothing is recorded
    track("report_ready", { topics: report.topics.length });
  }, [loading, report]);

  if (loading) return <Spinner />;
  if (!report || !report.topics.length) return <EmptyState />;

  return (
    <main>
      <h1>Content gaps</h1>
      <TopicList topics={report.topics} />
      <button onClick={() => exportCsv(report)}>Export</button>
    </main>
  );
}

function exportCsv(report) {
  track("report_exported", { topics: report.topics.length });
  download(toCsv(report));
}
