import { faFacebookSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FacebookIcon = () => {
  return <FontAwesomeIcon icon={faFacebookSquare} size="lg" color="#4267B2" />;
};

export const LinkedInIcon = () => {
  return <FontAwesomeIcon icon={faLinkedin} size="lg" color="#0077B7" />;
};

export const TwitterIcon = () => {
  return <FontAwesomeIcon icon={faTwitterSquare} size="lg" color="#50ABF1" />;
};
