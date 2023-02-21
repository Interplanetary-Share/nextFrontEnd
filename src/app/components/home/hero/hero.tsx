import UploadFile from '../uploadFile/uploadFile';

const Hero = () => {
  return (
    <>
      <div
        className="hero min-h-12"
        style={{
          backgroundImage: `url("/home/space.gif")`,
        }}
      >
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-full">
            <h1 className="my-12 text-6xl font-bold">Share made simple</h1>
            <UploadFile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
