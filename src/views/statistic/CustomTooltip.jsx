const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { temp, feels_like, icon, description } = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}
      >
        <p>
          <strong>{label}</strong>
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          width="50"
        />
        <p>Температура: {temp}°C</p>
        <p>Відчувається як: {feels_like}°C</p>
        <p style={{ textTransform: 'capitalize' }}>{description}</p>
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
