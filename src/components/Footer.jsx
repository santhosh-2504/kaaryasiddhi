const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">© {new Date().getFullYear()} KaaryaSiddhi. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
