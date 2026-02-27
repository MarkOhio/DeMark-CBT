
import jsPDF from "jspdf";
import "jspdf-autotable";
import type { Result } from "../types/Result";

export function exportResultsToPDF(results: Result[], examTitle: string) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Results: ${examTitle}`, 14, 20);

  const tableData = results.map((r) => [
    r.name,
    r.studentNumber,
    r.score,
    `${r.percentage}%`,
    r.submittedAt ? new Date(r.submittedAt).toLocaleString() : "Pending",
  ]);

  (doc as any).autoTable({
    head: [["Name", "Student Number", "Score", "Percentage", "Submitted At"]],
    body: tableData,
    startY: 30,
  });

  doc.save(`${examTitle.replace(/\s+/g, "_")}_results.pdf`);
}
