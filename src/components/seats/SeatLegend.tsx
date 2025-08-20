
const SeatLegend = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-muted p-3 rounded-lg text-sm flex gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-sm"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLegend;
