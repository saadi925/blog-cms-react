import { useState } from "react";

const AdminSettingsPage = () => {
  // State variables for form inputs
  const [appName, setAppName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [surfaceColor, setSurfaceColor] = useState("");
  const [textColor, setTextColor] = useState("");

  // Function to handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform actions with form data (e.g., save to database)
    console.log("Form submitted:", {
      appName,
      primaryColor,
      secondaryColor,
      accentColor,
      surfaceColor,
      textColor,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="appName"
            className="block text-sm font-medium text-gray-700"
          >
            App Name
          </label>
          <input
            id="appName"
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="primaryColor"
            className="block text-sm font-medium text-gray-700"
          >
            Primary Color
          </label>
          <input
            id="primaryColor"
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            id="secondaryColor"
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            id="accentColor"
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            id="surfaceColor"
            type="color"
            value={surfaceColor}
            onChange={(e) => setSurfaceColor(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            id="textColor"
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
