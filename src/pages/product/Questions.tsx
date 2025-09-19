const Questions = () => {
  const questions = [
    "Does this product come with a warranty?",
    "Is the material safe for children?",
    "How long does the delivery take?",
    "Can I return this if it doesnt fit?",
  ];

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Customer Questions</h2>

      <ul className="space-y-3">
        {questions.map((q, i) => (
          <li key={i} className="border-b pb-2 text-gray-700">
            Q: {q}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
