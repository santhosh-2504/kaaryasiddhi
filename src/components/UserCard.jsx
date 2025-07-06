"use client";

const UserCard = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    currentLevel: "Level 3",
    linkedinId: "johndoe123",
    githubId: "johndoe-dev",
    badges: ["Beginner", "100 Days Streak", "MERN Stack Pro"],
  };

  return (
    <div className="max-w-md mx-auto p-6 my-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-white">
          {user.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
        <p><strong>Current Level:</strong> {user.currentLevel}</p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={`https://linkedin.com/in/${user.linkedinId}`}
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            @{user.linkedinId}
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href={`https://github.com/${user.githubId}`}
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            @{user.githubId}
          </a>
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Badges:</h3>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
