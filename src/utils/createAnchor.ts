export default function createAnchor({
  url,
  fileName,
  wrapper = document.querySelector('.link-wrapper'),
}: {
  url: string;
  fileName: string;
  wrapper?: Element | null;
}) {
  const anchor = document.createElement('a');

  anchor.classList.add('anchor');

  anchor.href = url;

  anchor.download = fileName || 'download';

  anchor.innerText = `Download ${fileName}`;

  wrapper?.appendChild(anchor);
}
