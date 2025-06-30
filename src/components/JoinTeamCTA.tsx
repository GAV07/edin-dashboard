export default function JoinTeamCTA() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-gray-50 px-6 py-16 ring-1 ring-gray-200 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
          <img
            alt="Forest landscape representing growth and sustainability"
            src="/images/forest.jpg"
            className="h-96 w-full flex-none rounded-2xl object-cover shadow-lg lg:aspect-square lg:h-auto lg:max-w-sm"
          />
          <div className="w-full flex-auto">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Redefining Venture Capital
            </h2>
            
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-base/7 text-gray-600">
                  We partner with exceptional founders to build profitable, sustainable businesses through our breakthrough Venture Bond instrument — providing patient capital, operational excellence, and aligned incentives that enable companies to thrive without the constraints of traditional venture capital&apos;s boom-or-bust model.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-base/7 text-gray-600">
                  To establish Integrated Capital as the defining investment category of the next generation — where financial innovation, technological excellence, and socioeconomic impact converge to create regenerative ecosystems that transcend traditional venture capital limitations and redefine what&apos;s possible in early-stage investing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 