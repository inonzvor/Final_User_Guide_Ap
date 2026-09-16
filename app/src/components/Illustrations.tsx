import { cn } from '../lib/utils';
import { Power, ArrowDown, Wifi } from 'lucide-react';

export function StepIllustration({ stepId, className }: { stepId: string, className?: string }) {
  const IllustrationWrapper = ({ children, bg = "bg-surface" }: { children: React.ReactNode, bg?: string }) => (
    <div className={cn("w-full max-w-sm mx-auto h-48 flex items-center justify-center p-6 border border-line relative overflow-hidden", bg, className)}>
      {children}
    </div>
  );

  switch (stepId) {
    case 'step2': // Ports
      return (
        <IllustrationWrapper>
          <div className="flex gap-8 items-center bg-bg px-6 py-4 border border-line">
            {/* LAN/PoE Port */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-12 bg-surface border border-line flex flex-col justify-end p-1 relative">
                {/* 8 pins */}
                <div className="flex justify-between w-full px-1.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-[2px] h-3.5 bg-accent opacity-60" />
                  ))}
                </div>
                {/* Connector notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-line" />
              </div>
              <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">LAN / PoE</span>
            </div>

            <div className="w-px h-12 bg-line" />

            {/* DC Power */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-[3px] border-line flex items-center justify-center bg-surface relative">
                 <div className="w-3.5 h-3.5 bg-ink" />
              </div>
              <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">12V DC</span>
            </div>
          </div>
        </IllustrationWrapper>
      );

    case 'step3': // Reset Button
      return (
        <IllustrationWrapper>
          <div className="relative mt-8">
             <div className="w-32 h-16 bg-bg border border-line flex items-center justify-center relative">
               <div className="w-5 h-5 rounded-full bg-surface border-2 border-line flex items-center justify-center">
                 <div className="w-1 h-1 rounded-full bg-warn opacity-70" />
               </div>
               <span className="absolute -bottom-7 text-[10px] font-bold text-ink-soft tracking-wider">RESET</span>
             </div>

             {/* Pin pressing the reset button */}
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
               <div className="w-1 h-12 bg-line" />
               <ArrowDown className="w-5 h-5 text-line -mt-2" strokeWidth={3} />
             </div>
          </div>
        </IllustrationWrapper>
      );

    case 'step4': // Ethernet cable
    case 'step5':
    case 'step6':
      return (
        <IllustrationWrapper bg="bg-accent/5">
          <div className="flex items-center">
            {/* Cable line */}
            <div className="w-24 h-5 bg-accent" />

            {/* Connector */}
            <div className="relative flex items-center">
              {/* Boot */}
              <div className="w-6 h-9 bg-surface border-y border-l border-line z-0" />
              {/* Plastic Head */}
              <div className="w-16 h-7 bg-bg border border-accent flex flex-col justify-between py-0.5 relative z-10">
                <div className="absolute -top-2.5 left-2 w-6 h-2.5 bg-bg border-x border-t border-accent" />
                <div className="flex justify-between px-1.5 w-full mt-auto">
                   {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-[2px] h-3.5 bg-accent" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </IllustrationWrapper>
      );

    case 'step7': // Power adapter
      return (
        <IllustrationWrapper bg="bg-secondary/5">
          <div className="flex items-center gap-1">
             {/* Wall Plug */}
             <div className="w-16 h-20 bg-bg border-[3px] border-secondary relative flex flex-col items-center justify-center">
                <div className="absolute -left-3 top-4 w-3 h-2.5 bg-secondary" />
                <div className="absolute -left-3 bottom-4 w-3 h-2.5 bg-secondary" />
                <Power className="w-6 h-6 text-secondary opacity-70" strokeWidth={2.5} />
             </div>
             {/* Cable */}
             <div className="w-20 h-2 bg-line" />
             {/* Barrel Jack */}
             <div className="w-6 h-5 bg-line" />
             <div className="w-8 h-3.5 bg-bg border-[2px] border-line" />
          </div>
        </IllustrationWrapper>
      );

    case 'step8': // Light
      return (
        <IllustrationWrapper>
          <div className="w-36 h-36 rounded-full bg-bg border border-line flex items-center justify-center relative">
             {/* The glowing LED */}
             <div className="w-5 h-5 rounded-full bg-success shadow-[0_0_20px_var(--color-success)] relative z-10">
               <div className="absolute inset-0 bg-white rounded-full opacity-60 blur-[2px]" />
             </div>

             {/* Expanding rings */}
             <div className="absolute inset-0 rounded-full border-[3px] border-success opacity-20 animate-ping duration-[3000ms]" />
             <div className="absolute inset-6 rounded-full border-2 border-success opacity-10 animate-ping duration-[3000ms] delay-700" />
          </div>
        </IllustrationWrapper>
      );

    case 'step19': // Mount
      return (
        <IllustrationWrapper>
          <div className="flex flex-col items-center gap-3 relative mt-6">
             {/* Ceiling / Bracket */}
             <div className="w-48 h-2.5 bg-line" />
             <div className="w-28 h-5 bg-bg border-x-2 border-b-2 border-line" />

             {/* Arrow */}
             <ArrowDown className="w-6 h-6 text-accent animate-bounce my-2" strokeWidth={3} />

             {/* Device */}
             <div className="w-36 h-12 bg-surface border-2 border-accent rounded-full flex items-center justify-center">
               <Wifi className="w-6 h-6 text-accent opacity-70" />
             </div>
          </div>
        </IllustrationWrapper>
      );

    default:
      return null;
  }
}
