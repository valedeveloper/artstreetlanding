import React from 'react';
import { FcLike } from "react-icons/fc";
import { CiStreamOn } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { LuStore } from "react-icons/lu";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-center w-12 h-12 mb-4  rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className=" p-24">
      <div className="container mx-auto">
        <h2 className="title text-center pb-5">Descubre el verdadero Arte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center  place-items-center lg:place-items-start ">
          <FeatureCard
            icon={<CiStreamOn className="text-6xl text-purple-600" />}
            title="Transmisiones en Vivo"
            description="Observa actuaciones en vivo de tus artistas favoritos en tiempo real."
          />
          <FeatureCard
            icon={<BiWorld className="text-6xl text-blue-600" />}
            title="Apoya a Nuevos Artistas"
            description="Explora talentos de todo el mundo y apóyalos en su trayectoria."
          />
          <FeatureCard
            icon={<FcLike className="text-6xl text-red-600" />}
            title="Donar, Seguir y Crear una Comunidad"
            description="Donar a artistas, seguir su trabajo y construir una comunidad en torno a intereses compartidos."
          />
          <FeatureCard
            icon={<LuStore className="text-6xl text-green-600" />}
            title="Obtener Merchandising de los Artistas"
            description="Compra mercancía única directamente de tus artistas favoritos."
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

