const FooterMessage = ({ levels }) => {
  if (levels.length === 0) return null;

  return (
    <div className="text-center mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
        "Kaarya. Karma. Siddhi." - Every step forward is progress toward
        mastery.
      </p>
    </div>
  );
};

export default FooterMessage;
