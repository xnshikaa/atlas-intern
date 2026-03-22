import BlockEditor from "@/components/editor/BlockEditor";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LectureLogPage() {
  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col pt-4">
      <div className="mb-8 pl-4">
        <div className="flex items-center text-sm font-medium text-gray-400 mb-4 space-x-2">
          <Link href="/planner" className="hover:text-atlasPrimary flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1"/> Planner
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="flex items-center flex-shrink-0"><BookOpen className="w-4 h-4 mr-1.5 text-atlasCyan"/> Web Development</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-600 font-bold bg-white border border-gray-200 px-2.5 py-0.5 rounded-md shadow-sm">Module 2</span>
        </div>
      </div>
      
      <div className="flex-1 pb-12">
        <BlockEditor />
      </div>
    </div>
  );
}
