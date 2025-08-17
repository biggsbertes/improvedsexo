import logoPng from '@/assets/skypostal-logo.png'
interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const imageSizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48", 
    lg: "w-96 h-96"
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={logoPng}
        alt="SkyPostal Logo"
        className={`${imageSizeClasses[size]} object-contain scale-[1.12] sm:scale-[1.18] md:scale-[1.22]`}
      />
    </div>
  );
};