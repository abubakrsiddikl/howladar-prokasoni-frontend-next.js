import { BookOpen, Users, Target, Award } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-900 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">আমাদের সম্পর্কে</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          মানসম্মত প্রকাশনা এবং জ্ঞানভিত্তিক সমাজ গড়ার প্রত্যয়ে হাওলাদার প্রকাশনী দীর্ঘ দিন ধরে কাজ করে যাচ্ছে।
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              হাওলাদার প্রকাশনী বাংলাদেশের প্রকাশনা জগতে একটি পরিচিত নাম। আমরা বিশ্বাস করি বই মানুষের চিন্তার জগৎকে প্রসারিত করে। তাই আমরা নবীন ও প্রবীণ লেখকদের সৃজনশীল কাজগুলোকে পাঠকদের দোরগোড়ায় পৌঁছে দিতে নিরলস কাজ করে যাচ্ছি।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আমাদের প্রতিটি বইয়ের গুণগত মান, নির্ভুল ছাপা এবং চমৎকার বাঁধাই নিশ্চিত করা আমাদের অন্যতম প্রধান লক্ষ্য। আমরা শুধু বই বিক্রি করি না, আমরা একটি পাঠক সমাজ গড়তে চাই।
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <BookOpen className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">৫০০+</h3>
              <p className="text-sm text-gray-500">প্রকাশিত বই</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <Users className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">১০০+</h3>
              <p className="text-sm text-gray-500">লেখক</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <Target className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">১০০%</h3>
              <p className="text-sm text-gray-500">মানসম্মত মান</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <Award className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">১৫+</h3>
              <p className="text-sm text-gray-500">বছরের অভিজ্ঞতা</p>
            </div>
          </div>
        </div>

        {/* Management Section (SSL Requirement) */}
        <div className="bg-gray-50 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">ব্যবস্থাপনা ও টিম</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-10">
            আমাদের টিমে রয়েছেন অভিজ্ঞ সম্পাদক, দক্ষ ডিজাইনার এবং নিবেদিতপ্রাণ বিপণন কর্মী। আমাদের প্রতিষ্ঠাতা এবং ব্যবস্থাপনা পরিচালক মহোদয়ের সরাসরি তত্ত্বাবধানে প্রতিটি প্রকাশনা অত্যন্ত গুরুত্বের সাথে সম্পন্ন করা হয়।
          </p>
          <div className="inline-block border-t-2 border-yellow-500 pt-4">
            <p className="text-xl font-bold text-gray-900">হাওলাদার প্রকাশনী টিম</p>
            <p className="text-gray-500">ঢাকা, বাংলাদেশ</p>
          </div>
        </div>
      </div>
    </div>
  );
}