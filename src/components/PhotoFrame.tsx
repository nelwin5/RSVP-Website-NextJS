interface PhotoFrameProps {
    style?: React.CSSProperties;
  }
  
  export default function PhotoFrame({ style }: PhotoFrameProps) {
    return (
      <div
        className="relative border border-gray-400 bg-white overflow-hidden"
        style={style}
      >
        {/* Placeholder content for the frame */}
        <div className="flex items-center justify-center w-full h-full text-gray-500">
          📷
        </div>
      </div>
    );
  }
  