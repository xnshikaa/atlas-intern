import Sidebar from "@/components/layout/Sidebar";
import CinematicTransition from "@/components/ui/CinematicTransition";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <CinematicTransition>
      <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
        <Sidebar />
        <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
           <main className="flex-1 overflow-y-auto relative h-full">
              {children}
           </main>
        </div>
      </div>
    </CinematicTransition>
  );
}
