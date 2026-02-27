import { useEffect, useState } from "react";
import { database } from "../../firebase/firebase";
import { ref, get, child } from "firebase/database";
import Modal from "../../components/Modal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Results.css";
import Navbar from "../../components/adminNavbar";

export default function Results() {
  const [results, setResults] = useState<any[]>([]);
  const [exams, setExams] = useState<any>({});
  const [search, setSearch] = useState("");

  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const [viewExamModal, setViewExamModal] = useState(false);
  const [viewResultsModal, setViewResultsModal] = useState(false);
  const [viewAnswersModal, setViewAnswersModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const dbRef = ref(database);

      const submissionsSnap = await get(child(dbRef, "submissions"));
      const examsSnap = await get(child(dbRef, "exams"));

      if (submissionsSnap.exists()) {
        const data = submissionsSnap.val();
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setResults(formatted);
      }

      if (examsSnap.exists()) {
        setExams(examsSnap.val());
      }
    };

    fetch();
  }, []);

  /* ================= GROUP BY EXAM ================= */

  const groupedExams = results.reduce((acc: any, curr) => {
    if (!acc[curr.examId]) {
      const examData = exams[curr.examId];

      // If metadata is missing (exam deleted after students took it),
      // fall back to information stored in the submission itself.
      acc[curr.examId] = {
        examTitle: examData?.title || curr.examTitle || "(unknown)",
        courseCode: examData?.courseCode || curr.courseCode || "",
        startTime: examData?.startTime || 0,
        questions: examData?.questions || {},
        submissions: [],
      };
    }

    acc[curr.examId].submissions.push(curr);
    return acc;
  }, {});

  const examList = Object.entries(groupedExams)
    .sort(
      (a: any, b: any) =>
        b[1].startTime - a[1].startTime
    );

  const filteredExams = examList.filter(([_, exam]: any) =>
    exam.examTitle?.toLowerCase().includes(search.toLowerCase())
  );
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  /* ================= PDF EXPORT ================= */

  const exportPDF = (exam: any) => {
    const doc = new jsPDF();

    doc.text(exam.examTitle, 14, 15);
    doc.text(`Course Code: ${exam.courseCode}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Matric", "Level", "Score"]],
      body: exam.submissions.map((s: any) => [
        s.studentName,
        s.studentNumber,
        s.level,
        `${s.score}/${s.total}`,
      ]),
    });

    doc.save(`${exam.examTitle}-results.pdf`);
  };

  return (
    <div className="results-page">
      <Navbar />
      <h2>Results</h2>

      <input
        placeholder="Search exam"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


    <div className="exams-con">
         {/* ================= EXAM CARDS ================= */}
      {filteredExams.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(([examId, exam]: any) => (
        <div className="exam-card"
          key={examId}
          
        >
          <h3>{exam.examTitle}</h3>
          <p>{exam.courseCode}</p>
          <p>
            {new Date(exam.startTime).toLocaleString()}
          </p>

          <div className="exam-card-btns">
            <button
            onClick={() => {
              setSelectedExam({ examId, ...exam });
              setViewExamModal(true);
            }}
          >
            View Exam
          </button>

          <button
            onClick={() => {
              setSelectedExam({ examId, ...exam });
              setViewResultsModal(true);
            }}
            style={{ marginLeft: 10 }}
          >
            View Results
          </button>
          </div>
          
        </div>
      ))}
    </div>
     

      {/* ================= VIEW EXAM MODAL ================= */}
      <Modal
        visible={viewExamModal}
        onClose={() => setViewExamModal(false)}
      >
        {selectedExam && (
          <div>
            <h2>{selectedExam.examTitle}</h2>
              {filteredExams.length > PAGE_SIZE && (
                <div style={{ marginTop: 16 }}>
                  <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                    Prev
                  </button>
                  <button
                    disabled={(page + 1) * PAGE_SIZE >= filteredExams.length}
                    onClick={() => setPage(page + 1)}
                    style={{ marginLeft: 8 }}
                  >
                    Next
                  </button>
                </div>
              )}

            {/* ================= VIEW EXAM MODAL ================= */}

            {Object.entries(selectedExam.questions).map(
              ([qid, q]: any, index: number) => (
                <div key={qid} style={{ marginBottom: 15 }}>
                  <strong>
                    {index + 1}. {q.text}
                  </strong>
                  <ul>
                    {q.options.map((opt: string, i: number) => (
                      <li
                        key={i}
                        style={{
                          fontWeight:
                            i === q.correctIndex
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </Modal>

      {/* ================= VIEW RESULTS MODAL ================= */}
      <Modal
        visible={viewResultsModal}
        onClose={() => setViewResultsModal(false)}
      >
        {selectedExam && (
          <div>
            <h2>{selectedExam.examTitle}</h2>
            <p>{selectedExam.courseCode}</p>

            <button
              onClick={() => exportPDF(selectedExam)}
              style={{ marginBottom: 10 }}
            >
              Export PDF
            </button>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Matric</th>
                  <th>Level</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedExam.submissions.map((s: any) => (
                  <tr key={s.id}>
                    <td>{s.studentName}</td>
                    <td>{s.studentNumber}</td>
                    <td>{s.level}</td>
                    <td>
                      {s.score}/{s.total}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedStudent(s);
                          setViewAnswersModal(true);
                        }}
                      >
                        View Answers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      {/* ================= STUDENT ANSWERS MODAL ================= */}
      <Modal
        visible={viewAnswersModal}
        onClose={() => setViewAnswersModal(false)}
      >
        {selectedStudent && selectedExam && (
          <div>
            <h3>{selectedStudent.studentName}</h3>

            {Object.entries(selectedExam.questions).map(
              ([qid, q]: any, index: number) => {
                const selected =
                  selectedStudent.answers?.[qid];

                return (
                  <div key={qid} style={{ marginBottom: 10 }}>
                    <strong>
                      {index + 1}. {q.text}
                    </strong>
                    <p>
                      Selected:{" "}
                      {selected !== undefined
                        ? String.fromCharCode(
                            65 + selected
                          )
                        : "N/A"}
                    </p>
                    <p>
                      Correct:{" "}
                      {String.fromCharCode(
                        65 + q.correctIndex
                      )}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}