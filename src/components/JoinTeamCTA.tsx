export default function JoinTeamCTA() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl bg-gray-50 px-6 py-12 ring-1 ring-gray-200 sm:rounded-3xl sm:p-8">
          {/* Image and Title Side by Side */}
          <div className="flex items-center gap-4 mb-8">
            <img
              alt="Forest landscape representing growth and sustainability"
              src="/images/forest.jpg"
              className="h-16 w-16 rounded-xl object-cover shadow-lg flex-shrink-0"
            />
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Redefining Venture Capital
            </h2>
          </div>
          
          {/* Mission and Vision Stacked Below */}
          <div className="space-y-6">
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
  );
} 