import veloLogoSrc from '../assets/velo_logo.png'

export default function VeloLogo({ className, style = {} }) {
  return (
    <img
      src={veloLogoSrc}
      alt="VELO MEDIA"
      className={className}
      style={{ objectFit: 'contain', ...style }}
    />
  )
}
