
const SeatLegend = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-muted p-3 rounded-lg text-sm flex gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-background border border-border rounded-sm"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-sm"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted text-muted-foreground rounded-sm opacity-70"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLegend;
