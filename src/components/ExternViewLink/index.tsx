import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faEye, faBoxOpen, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
export default function ExternalViewLink({ eitherLink, IPFSLink, metadata }) {
  function clickHandler(url) {
    window.open(url, '_blank');
  }
  const links = [
    {
      label: 'View on BSC Scan',
      url: eitherLink,
      icon: faSignal,
    },
    {
      label: 'View on IPFS',
      url: IPFSLink,
      icon: faEye,
    },
    // {
    //   label: 'View on IPFS metadata',
    //   url: metadata,
    //   icon: faBoxOpen,
    // },
  ];
  return (
    <div className="external-link">
      {links.map(link => (
        <div className="external-link__item" onClick={() => clickHandler(link.url)}>
          <span>
            <FontAwesomeIcon icon={link.icon} />
            {link.label}
          </span>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </div>
      ))}
    </div>
  );
}
