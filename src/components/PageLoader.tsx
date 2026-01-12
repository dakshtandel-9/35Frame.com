const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo/spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-2 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-2 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        
        {/* Brand text */}
        <div className="text-center">
          <h2 className="font-display text-2xl text-primary tracking-luxury">
            35 Frames
          </h2>
          <p className="text-muted-foreground text-sm mt-1 tracking-wide">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
