const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const preview of document.querySelectorAll('.figure-preview')) {
  const image = preview.querySelector('img');
  const button = preview.querySelector('button');
  let animation;

  function replay() {
    if (reducedMotion.matches) return;
    animation?.cancel();
    animation = image.animate(
      [{clipPath: 'inset(0 93% 0 0)'}, {clipPath: 'inset(0)'}],
      {duration: 1000, easing: 'ease-out'}
    );
  }

  button.hidden = false;
  button.addEventListener('click', replay);
  preview.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') replay();
  });
  preview.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') animation?.cancel();
  });
  reducedMotion.addEventListener('change', () => animation?.cancel());
}
