const PageHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full">
          <span className="text-2xl">📈</span>
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
        Your Path to{" "}
        <span className="text-emerald-600 dark:text-emerald-400">Success</span>
      </h1>

      <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Progress through structured levels, each designed to build your skills
        step by step
      </p>
    </div>
  );
};

export default PageHeader;
