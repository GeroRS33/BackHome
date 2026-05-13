import "./Palette.css";

function PaletteDisplay({ colors = [] }) {
  return (
    <div className="palette-display">
      <span>Paleta inspiracional</span>

      <div className="palette-display-colors">
        {colors.map((color) => (
          <i key={color} style={{ backgroundColor: color }}></i>
        ))}
      </div>
    </div>
  );
}

export default PaletteDisplay;