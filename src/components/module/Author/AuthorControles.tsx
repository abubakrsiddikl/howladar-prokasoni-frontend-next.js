
import { Search } from 'lucide-react'; // ধরে নিলাম আপনি Lucide Icons ব্যবহার করছেন

export const AuthorControls = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
      
      {/* সার্চ ইনপুট (তালিকার মধ্যে সার্চ করুন) */}
      <div className="md:col-span-3 relative">
        <input
          type="text"
          placeholder="তালিকার মধ্যে সার্চ করুন..."
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* সার্চ বাটন */}
      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-150">
        সার্চ করুন
      </button>

      {/* ফিল্টার বাটন */}
      <button className="border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition duration-150">
        ফিল্টার করুন
      </button>

      {/* যুক্ত করুন বাটন */}
      <button className="border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition duration-150">
        + যুক্ত করুন
      </button>
    </div>
  </div>
);