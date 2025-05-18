import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Footer from './components/Footer';
import CafeImg from './components/CafeImg';
import Star from './assets/Star.svg';
import StarFilled from './assets/star_fill.svg';

function App() {
  const [products, setProducts] = useState('all');
  const productsAll = useRef(null);
  const productsAvailable = useRef(null);

  const {
    data: coffeeList,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ['coffeeList'], queryFn: fetchCoffeeList, refetchOnWindowFocus: false });

  function fetchCoffeeList() {
    return fetch(
      'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json'
    )
      .then(res => res.json())
      .catch(err => err.message);
  }

  function filter(coffeeList) {
    if (products === 'all') return coffeeList;
    if (products === 'available') {
      return coffeeList.filter(coffee => coffee.available);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col mb-[11%] items-center">
        <CafeImg />

        <section className="flex flex-col items-center bg-[#1B1D1F] text-[#FEF7EE] text-center p-10 rounded-xl -mt-[11%] mx-6 md:w-[85%] xl:w-[1095px]">
          {' '}
          <div className="bg-[url('../resources/vector.svg')] bg-no-repeat bg-auto bg-right">
            <h1 className="text-[2rem] font-bold mt-4">Our Collection</h1>

            <p className="mt-3 text-[#6F757C] sm:w-[500px]">
              Introducing our Coffee Collection, a selection of unique coffees
              from different roast types and origins, expertly roasted in small
              batches and shipped fresh weekly.
            </p>
          </div>
          {/* introductions */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              ref={productsAll}
              className={`py-2 px-4 rounded-lg dm-sans-medium cursor-pointer product-cta hover:text-[#6F757C] ${
                products === 'all' ? 'bg-[#4D5562]' : ''
              }`}
              onClick={() => setProducts('all')}
            >
              All Products
            </button>

            <button
              ref={productsAvailable}
              className={`py-2 px-4 rounded-lg dm-sans-medium cursor-pointer product-cta hover:text-[#6F757C] ${
                products === 'available' ? 'bg-[#4D5562]' : ''
              }`}
              onClick={() => setProducts('available')}
            >
              Available Now
            </button>
          </div>
          {/* buttons */}
          <div className="mt-8 grid sm:grid-cols-2 customMdLg:grid-cols-3 justify-items-center gap-8">
            {isLoading && <div>Loading...</div>}
            {isSuccess &&
              filter(coffeeList).map(coffee => (
                <div className="card" key={coffee.id}>
                  <div className="relative">
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      className="rounded-xl"
                    />

                    {coffee.popular && (
                      <p className="absolute left-2 top-2 rounded-xl bg-[#F6C768] text-[10px] text-[#302522] dm-sans-semibold p-0.5 px-2.5">
                        Popular
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline my-3">
                    <h2 className="dm-sans-medium">{coffee.name}</h2>
                    <p className="flex justify-center items-center p-0.5 px-2 text-xs text-[#1B1D1F] bg-[#BEE3CC] rounded dm-sans-semibold">
                      {coffee.price}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex gap-1.5">
                      {!coffee.rating && (
                        <>
                          <img src={Star} alt="Gray Star" />
                          <p className="text-sm flex items-center">
                            <span className="text-[#6F757C] dm-sans-semibold">
                              No ratings
                            </span>
                          </p>
                        </>
                      )}

                      {coffee.rating && (
                        <>
                          <img src={StarFilled} alt="Gold Star" />
                          <p className="text-sm flex items-center gap-1 dm-sans-medium">
                            <span>{coffee.rating}</span>
                            <span className="text-[#6F757C] dm-sans-semibold">
                              ({coffee.votes} votes)
                            </span>
                          </p>
                        </>
                      )}
                    </div>

                    {!coffee.available && (
                      <p className="text-[#ED735D] text-sm dm-sans-semibold">
                        Sold out
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
