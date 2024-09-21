const bar = new ProgressBar.Line(container, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  trailColor: 'rgba(54,55,70, 0.65)',
  trailWidth: 20,
  svgStyle: { width: '100%', height: '100%' },
  from: { color: '#4ba7f8' },
  to: { color: '#4ba7f8' },
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
  }
});

const options = { method: 'GET' };
const key = "AIzaSyAuh99h6naCct66rk5IPau98JcgbvbUCXc";