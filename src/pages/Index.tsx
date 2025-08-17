import { TrackingApp } from "./TrackingApp";
import { Footer } from '@/components/Footer'
import { useParams } from 'react-router-dom';

const Index = () => {
  const { trackingCode } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <TrackingApp initialTrackingCode={trackingCode} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
