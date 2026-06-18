interface FeedbackLogProps {
  message: string;
}

function FeedbackLog({ message }: FeedbackLogProps) {
  return (
    <section className="mt-4 rounded-lg border border-[#decaa9] bg-[#2d2922] px-4 py-3 text-sm font-medium text-[#fff8e9] shadow-inner">
      {message}
    </section>
  );
}

export default FeedbackLog;
