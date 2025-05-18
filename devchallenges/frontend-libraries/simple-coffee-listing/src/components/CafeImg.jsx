import bgCafeSm from './../assets/bg-cafe-sm.jpg';
import bgCafe from './../assets/bg-cafe.jpg';
import bgCafeLg from './../assets/bg-cafe-lg.jpg';

function CafeImg() {
  return (
    <>
      <img
        src={bgCafeSm}
        alt="drawing of a coffee shop"
        className="w-full sm:hidden"
      />

      <img
        src={bgCafe}
        alt="drawing of a coffee shop"
        className="w-full hidden sm:block lg:hidden"
      />
      <img
        src={bgCafeLg}
        alt="drawing of a coffee shop"
        className="w-full hidden lg:block"
      />
    </>
  );
}

export default CafeImg;
