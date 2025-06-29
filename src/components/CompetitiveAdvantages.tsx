import React from 'react';
import Image from 'next/image';

export default function CompetitiveAdvantages() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-center text-base/7 font-semibold text-emerald-600">Strategic positioning</h2> */}
        <p className="mt-2 max-w-xl text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Competitive Advantages
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          
          {/* First-Mover Technology - Large left card */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                             <div className="px-8 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 relative">
                     <Image
                       src="/images/leaning-tree.jpg"
                       alt="Investment Life Support"
                       fill
                       className="object-cover rounded-lg"
                     />
                   </div>
                   <p className="text-2xl font-semibold tracking-tight text-gray-950">
                     Investment Life Support
                   </p>
                 </div>
                 <p className="text-base/7 text-gray-600">
                   EdinOS continues to support companies from the moment they determine they would like to be an Edin portco to the moment they determine they are ready to exit.
                 </p>
               </div>
               <div className="flex flex-1 items-center justify-center px-8 pb-8 sm:px-10">
                 <div className="w-full max-w-sm h-80 relative rounded-2xl overflow-hidden">
                   <Image
                     src="/images/leaning-tree.jpg"
                     alt="Investment Life Support"
                     fill
                     className="object-cover"
                   />
                 </div>
               </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>

          {/* Network Effects - Top right card */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                             <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-6 h-6 relative">
                     <Image
                       src="/images/tree-roots.jpg"
                       alt="Tree Roots"
                       fill
                       className="object-cover rounded-lg"
                     />
                   </div>
                   <p className="text-lg font-semibold tracking-tight text-gray-950">Network Effects</p>
                 </div>
                 <p className="text-sm/6 text-gray-600">
                   Each portfolio company increases platform intelligence and value, creating compounding advantages that become more powerful over time.
                 </p>
               </div>
               <div className="flex flex-1 items-center justify-center px-8 pb-6 sm:px-10">
                 <div className="w-full h-24 relative rounded-xl overflow-hidden">
                   <Image
                     src="/images/tree-roots.jpg"
                     alt="Network Effects"
                     fill
                     className="object-cover"
                   />
                 </div>
               </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>

          {/* Operational Excellence - Bottom middle card */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                             <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-6 h-6 relative">
                     <Image
                       src="/images/white-flower.jpg"
                       alt="White Flower"
                       fill
                       className="object-cover rounded-lg"
                     />
                   </div>
                   <p className="text-lg font-semibold tracking-tight text-gray-950">Operational Excellence</p>
                 </div>
                 <p className="text-sm/6 text-gray-600">
                   AI-driven insights and automation that predict company needs and prescribe solutions before problems emerge.
                 </p>
               </div>
               <div className="flex flex-1 items-center justify-center px-8 pb-6 sm:px-10">
                 <div className="w-full h-20 relative rounded-xl overflow-hidden">
                   <Image
                     src="/images/white-flower.jpg"
                     alt="Operational Excellence"
                     fill
                     className="object-cover"
                   />
                 </div>
               </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* Market Leadership - Large right card */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                             <div className="px-8 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 relative">
                     <Image
                       src="/images/cliff-tree.jpg"
                       alt="Cliff Tree"
                       fill
                       className="object-cover rounded-lg"
                     />
                   </div>
                   <p className="text-2xl font-semibold tracking-tight text-gray-950">
                     Market Leadership
                   </p>
                 </div>
                 <p className="text-base/7 text-gray-600">
                   Systematic positioning as the default choice for exceptional companies seeking intelligent capital and operational support. We establish market dominance through consistent excellence.
                 </p>
               </div>
               <div className="flex flex-1 items-center justify-center px-8 pb-8 sm:px-10">
                 <div className="w-full max-w-sm h-80 relative rounded-2xl overflow-hidden">
                   <Image
                     src="/images/cliff-tree.jpg"
                     alt="Market Leadership"
                     fill
                     className="object-cover"
                   />
                 </div>
               </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
} 