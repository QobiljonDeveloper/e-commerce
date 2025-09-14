import img from "../../../assets/join0-us.png"

const JoinUs = () => {
  return (
    <section className="w-full border border-black relative">
      <img
        src={img}
        alt="Join Newsletter"
        className="h-[200px] sm:h-[280px] md:h-[360px] w-full object-cover"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 w-full max-w-[600px]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Join Our Newsletter
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Sign up for deals, new products and promotions
        </p>
        <div className="flex items-center mt-6 border-b border-gray-400">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 p-2 text-sm sm:text-base outline-none bg-transparent"
          />
          <p className="ml-4 px-4 py-2  text-gray-500 text-sm sm:text-base">
            Signup
          </p>
        </div>
      </div>
    </section>
  )
}

export default JoinUs
