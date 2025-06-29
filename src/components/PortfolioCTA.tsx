export default function PortfolioCTA() {
  return (
    <div className="mt-10 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl mb-8">
      <div className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Explore Our Investment Process
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base sm:text-lg lg:text-xl leading-relaxed text-green-100">
            Gain insights into our comprehensive sourcing methodology and investment framework. Access detailed documentation that outlines our rigorous evaluation process and strategic approach to identifying high-potential opportunities.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <a
              href="https://www.dropbox.com/scl/fi/fgv8ecqj39g38wen9vn9o/Investment-Process.pdf?rlkey=xgk3mzqqc9w2u2dyr79kitcbo&st=g0msv4j5&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              View Investment Process
            </a>
            <a 
              href="https://www.dropbox.com/scl/fi/lrj044sl9ov3u0nsumhsg/Sourcing-Strategy.pdf?rlkey=5vjqd8sln0vb0pk9nlilfntcz&st=1nhjuhxp&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white hover:text-green-100 transition-colors"
            >
              Sourcing Documentation
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 