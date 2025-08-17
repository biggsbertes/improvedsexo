import { useEffect, useState } from "react";

const clientLogos = [
  {
    name: "Amazon",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0b058f417399cb1cd1_amazon-logo-transparent-p-500.png"
  },
  {
    name: "eBay",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0b058f417399cb1d42_pngimg.com%2520-%2520ebay_PNG22-p-500.png"
  },
  {
    name: "Alibaba",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0b058f417399cb1d69_pngwing.com-p-500.png"
  },
  {
    name: "Sinotrans",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0b058f417399cb1d4f_SINOTRANS%20Logo.png"
  },
  {
    name: "APC Postal Logistics",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0b058f417399cb1d28_apc%20logo.png"
  },
  {
    name: "Asendia",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0c058f417399cb1d9f_asendia-logo-circular.png"
  },
  {
    name: "Anjun",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0b058f417399cb1d01_anjun-logo.png"
  },
  {
    name: "AIT Worldwide Logistics",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0c058f417399cb1d91_AIT%20logo.png"
  },
  {
    name: "OnTrac",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0c058f417399cb1dbd_on-track-transparent-p-500.png"
  },
  {
    name: "Landmark Global",
    logo: "https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a3f0c058f417399cb1e0f_landmark_logo-p-500.png"
  }
];

export const ClientLogos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Aguarda a transição de fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clientLogos.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calcula os índices das logos laterais
  const leftIndex = (currentIndex - 1 + clientLogos.length) % clientLogos.length;
  const rightIndex = (currentIndex + 1) % clientLogos.length;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 md:mt-12 px-4">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-700 mb-2">
          Nossos Clientes
        </h3>
        <p className="text-xs md:text-base text-gray-600 px-2">
          Empresas que confiam na SkyPostal para suas operações logísticas
        </p>
      </div>
      
      <div className="relative">
        {/* Container principal do carrossel */}
        <div className="flex justify-center items-center h-24 md:h-32">
          <div className="flex items-center space-x-3 md:space-x-8">
            {/* Logo esquerda */}
            <div className={`w-16 h-12 md:w-20 md:h-16 flex items-center justify-center opacity-30 md:opacity-40 transition-all duration-700 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-30 md:opacity-40 scale-100'
            }`}>
              <img
                src={clientLogos[leftIndex].logo}
                alt={`Logo ${clientLogos[leftIndex].name}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/64x48/6B7280/FFFFFF?text=" + clientLogos[leftIndex].name;
                }}
              />
            </div>

            {/* Logo central (foco principal) */}
            <div className={`w-20 h-16 md:w-28 md:h-20 flex items-center justify-center transition-all duration-700 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              <img
                src={clientLogos[currentIndex].logo}
                alt={`Logo ${clientLogos[currentIndex].name}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/80x64/6B7280/FFFFFF?text=" + clientLogos[currentIndex].name;
                }}
              />
            </div>

            {/* Logo direita */}
            <div className={`w-16 h-12 md:w-20 md:h-16 flex items-center justify-center opacity-30 md:opacity-40 transition-all duration-700 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-30 md:opacity-40 scale-100'
            }`}>
              <img
                src={clientLogos[rightIndex].logo}
                alt={`Logo ${clientLogos[rightIndex].name}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/64x48/6B7280/FFFFFF?text=" + clientLogos[rightIndex].name;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
